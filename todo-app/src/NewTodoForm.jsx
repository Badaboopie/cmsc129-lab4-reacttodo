import { useState } from "react"
import "./styles.css"

export function NewTodoForm({onSubmit}){
    const [newItem, setNewItem] = useState("") 
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [priority, setPriority] = useState("")

    function handleSubmit(e){
    e.preventDefault()
    if (newItem == "") {
        return alert("Please Enter a Task Name")
    }
    
    onSubmit(newItem, date, time, priority)

    setNewItem("")
    setDate("")
    setTime("")
    setPriority("Low")
    }

    return (
    <div className="px-5 pt-4">
        <form onSubmit={handleSubmit} className="row g-5">
            <div className="col-md-6">
                <label htmlFor="item" className="form-label" >Add New Task</label>
                <input 
                className="form-control"
                type="text" 
                id="item"
                value={newItem} 
                onChange={e => setNewItem(e.target.value)} 
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="date" className="form-label">Set Due Date</label>
                <input 
                    className="form-control"
                    type="date" 
                    id="date"
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="time" className="form-label">Set Due Time</label>
                <input 
                    className="form-control"
                    type="time" 
                    id="time"
                    value={time} 
                    onChange={e => setTime(e.target.value)} 
                />
            </div>
            <div class="col-md-6">
                <label htmlFor="priority" className="form-label">Set Priority</label>
                <select 
                    className="form-control"
                    name="priority" 
                    id="priority"
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    >
                    <option value={'Low'}>Low</option>
                    <option value={'Medium'}>Medium</option>
                    <option value={'High'}>High</option>
                </select>
            </div>
            <div className="d-grid gap-2">
                <button className="btn btn-primary mx-5">Add</button>
            </div>
        </form>
    </div>
    )
}