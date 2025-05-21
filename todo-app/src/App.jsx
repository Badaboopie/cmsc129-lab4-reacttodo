import { useEffect, useState } from "react"
import "./styles.css"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function App() {
  // States are immutable
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return [] 

    return JSON.parse(localValue)
  }) 

  // Hook
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title, date, time){
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id: crypto.randomUUID(), title, completed: false , date , time},
      ]
    })
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id == id) {
          return {
            ...todo, completed
          }
        }

        return todo 
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
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

  function saveEditTodo(id, newTitle, newDate, newTime) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id
          ? { ...todo, title: newTitle, date: newDate, time: newTime, isEditing: false }
          : todo
      )
    )
  }

  return (
    <>
    <NewTodoForm onSubmit={addTodo} />
    <h1>Todo List</h1>
    <TodoList 
      todos={todos} 
      toggleTodo={toggleTodo} 
      deleteTodo={deleteTodo}
      startEditTodo={startEditTodo}
      cancelEditTodo={cancelEditTodo}
      saveEditTodo={saveEditTodo}
      />
    </>
  )
}