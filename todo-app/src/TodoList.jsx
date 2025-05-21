import { TodoItem } from "./TodoItem"

export function TodoList({
    todos, 
    toggleTodo, 
    deleteTodo,
    startEditTodo,
    cancelEditTodo,
    saveEditTodo
}){
    return (
    <ul>
      {todos.length === 0 && "No todos"} 
      {todos.map(todo => {
        return (
            <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            startEditTodo={startEditTodo}
            cancelEditTodo={cancelEditTodo}
            saveEditTodo={saveEditTodo}
            />
        )
      })}
    </ul>
    )
}