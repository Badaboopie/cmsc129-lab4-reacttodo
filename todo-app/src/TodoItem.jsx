import { useState, useEffect  } from "react"

export function TodoItem({
    completed, 
    id, 
    title, 
    toggleTodo, 
    deleteTodo, 
    date, 
    time,
    isEditing,
    startEditTodo,
    cancelEditTodo,
    saveEditTodo
}){
    const [editTitle, setEditTitle] = useState(title)
    const [editDate, setEditDate] = useState(date)
    const [editTime, setEditTime] = useState(time)
    
    useEffect(() => {
        if (isEditing) {
            setEditTitle(title)
            setEditDate(date)
            setEditTime(time)
        }
    }, [isEditing, title, date, time])
    
    if (isEditing) {
        return (
            <li>
            <input 
                type="text" 
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                />
            <input 
                type="date" 
                value={editDate}
                onChange={e => setEditDate(e.target.value)}
                />
            <input 
                type="time" 
                value={editTime}
                onChange={e => setEditTime(e.target.value)}
                />
            <button
                onClick={() => saveEditTodo(id, editTitle, editDate, editTime)}>
                Save
            </button>
            <button 
              onClick={() => cancelEditTodo(id)}>
              Cancel
            </button>
        </li>
        )
    }

    return (
        <li>
            <label htmlFor="">
                <input 
                type="checkbox" 
                checked={completed}
                onChange={e => toggleTodo(id, e.target.checked)}
                />
                {title}
            </label>
            <p>{date} at {time}</p>
            <button
                onClick={() => startEditTodo(id)}>
                Edit
            </button>
            <button 
              onClick={() => deleteTodo(id)}>
              Delete
            </button>
        </li>
    )
}