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
    <div className="container p-4">
      <h3 className="h4">Todo List</h3>
      <ul className="list-group">
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
    </div>
    )
}