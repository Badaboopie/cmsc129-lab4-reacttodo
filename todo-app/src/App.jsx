import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";

function priorityValue(priority) {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1; // Low or undefined
}

export default function App() {
  // States are immutable
  const [todos, setTodos] = useState([]);

  // Sort todos by date then by priority
  const sortedTodos = [...todos].sort((a, b) => {
    // Compare dates
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date);
    }
    // compare priority
    return priorityValue(b.priority) - priorityValue(a.priority);
  });

  // // Hook
  // useEffect(() => {
  //   localStorage.setItem("ITEMS", JSON.stringify(todos))
  // }, [todos])

  //Firestore

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "todos"), snapshot => {
      setTodos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  async function addTodo(title, date, time, priority) {
    await addDoc(collection(db, "todos"), {
      title,
      date,
      time,
      priority,
      completed: false
    });
  }

  async function toggleTodo(id, completed) {
  await updateDoc(doc(db, "todos", id), { completed });
  }

  async function deleteTodo(id) {
    alert("Deleting Task")
    await deleteDoc(doc(db, "todos", id));
  }

  async function saveEditTodo(id, newTitle, newDate, newTime, newPriority) {
    await updateDoc(doc(db, "todos", id), {
      title: newTitle,
      date: newDate,
      time: newTime,
      priority: newPriority,
      isEditing: false
    });
  }

  
  function startEditTodo(id){
    setTodos(currentTodos => {
      return currentTodos.map(todo => 
        todo.id === id ? {...todo, isEditing: true} : todo)
    })
  }

  function cancelEditTodo(id) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, isEditing: false } : todo
      )
    )
  }


  return (
    <>
    <div className="p-3 mb-2 bg-black text-white">
      <h3 className="h2">TaskTracker App</h3>
    </div>
    <NewTodoForm onSubmit={addTodo} />
    <TodoList 
      todos={sortedTodos} 
      toggleTodo={toggleTodo} 
      deleteTodo={deleteTodo}
      startEditTodo={startEditTodo}
      cancelEditTodo={cancelEditTodo}
      saveEditTodo={saveEditTodo}
      />
    </>
  )
}