import { useState, useEffect  } from "react"
import { format, parseISO } from 'date-fns';

export function TodoItem({
    completed, 
    id, 
    title, 
    toggleTodo, 
    deleteTodo, 
    date, 
    time,
    priority,
    isEditing,
    startEditTodo,
    cancelEditTodo,
    saveEditTodo
}){
    const [editTitle, setEditTitle] = useState(title)
    const [editDate, setEditDate] = useState(date)
    const [editTime, setEditTime] = useState(time)
    const [editPriority, setEditPriority] = useState(priority)
    
    useEffect(() => {
        if (isEditing) {
            setEditTitle(title)
            setEditDate(date)
            setEditTime(time)
            setEditPriority(priority)
        }
    }, [isEditing, title, date, time, priority])
    
    if (isEditing) {
        return (
            
            <div className="container-sm p-2 rounded">
                <li className="list-group-item p-3">
                <div className="row">

                    <div className="col-md-3 my-2"> 
                        <label htmlFor="item" className="form-label" >Edit Task</label>
                        <input 
                            className="form-control"
                            type="text" 
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            />
                    </div>
                    <div className="col-md-3 my-2">
                        <label htmlFor="item" className="form-label" >Edit Date</label>
                        <input
                            className="form-control" 
                            type="date" 
                            value={editDate}
                            onChange={e => setEditDate(e.target.value)}
                            />
                    </div>
                    <div className="col-md-3 my-2">
                        <label htmlFor="item" className="form-label" >Edit Time</label>
                        <input 
                            className="form-control"
                            type="time" 
                            value={editTime}
                            onChange={e => setEditTime(e.target.value)}
                            />    
                    </div>
                    <div className="col-md-3 my-2">
                        <label htmlFor="item" className="form-label" >Edit Priority</label>
                        <select 
                            className="form-control"
                            name="priority" 
                            id="priority"
                            value={editPriority}
                            onChange={e => setEditPriority(e.target.value)}
                            >
                            <option value={'Low'}>Low</option>
                            <option value={'Medium'}>Medium</option>
                            <option value={'High'}>High</option>
                        </select>
                    </div>
                </div>
                <button
                    className="btn btn-outline-primary mx-3 my-4"
                    onClick={() => saveEditTodo(id, editTitle, editDate, editTime, editPriority)}>
                    Save
                </button>
                <button 
                    className="btn btn-outline-primary mx-3 my-4"
                    onClick={() => cancelEditTodo(id)}>
                    Cancel
                </button>
            </li>
            </div>
        )
    }

    // Helper to get styles based on priority
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'Low':
                return { color: 'blue', fontWeight: 'bold' };
            case 'Medium':
                return { color: 'goldenrod', fontWeight: 'bold' };
            case 'High':
                return { color: 'red', fontWeight: 'bold' };
            default:
                return {};
        }
    };

    return (
        <div className="container-sm p-2 rounded">
            <li className="list-group-item p-3">
                <label htmlFor="" className="ms-2 me-auto" >
                    <input 
                    className="form-check-input mx-3"
                    type="checkbox" 
                    checked={completed}
                    onChange={e => toggleTodo(id, e.target.checked)}
                    />
                    <label htmlFor="" className="h4">{title}</label>
                </label >
                <label
                    htmlFor=""
                    className="rounded border border-info p-1 m-2"
                    style={getPriorityStyle(priority)}
                >
                    {priority}
                </label>
                <div className="container">
                    Due Date:  {date
                    ? time
                    ? `${format(parseISO(`${date}T${time}`), "EEEE, MMMM d, yyyy 'at' h:mm a")}`
                    : `${format(parseISO(date), "EEEE, MMMM d, yyyy")}`
                    : ""}
                </div>
                <button
                    className="btn btn-outline-primary mx-3 my-4"
                    onClick={() => startEditTodo(id)}>
                    Edit
                </button>
                <button 
                className="btn btn-outline-primary my-4"
                onClick={() => deleteTodo(id)}>
                Delete
                </button>
            </li>
        </div>
    )
}