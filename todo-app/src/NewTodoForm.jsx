import { useState } from "react"

export function NewTodoForm({onSubmit}){
    const [newItem, setNewItem] = useState("") 
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    function handleSubmit(e){
    e.preventDefault()
    if (newItem === "") {
        return
    }
    
    onSubmit(newItem, date, time)

    setNewItem("")
    setDate("")
    setTime("")
    }

    return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="item">New item</label>
        <input 
          type="text" 
          id="item"
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
        />
        <br />
        <label htmlFor="date">Set Date</label>
        <input 
            type="date" 
            id="date"
            value={date} 
            onChange={e => setDate(e.target.value)} 
        />
        <br />
        <label htmlFor="time">Set Date</label>
        <input 
            type="time" 
            id="time"
            value={time} 
            onChange={e => setTime(e.target.value)} 
        />
      </div>
      <button className="btn">Add</button>
    </form>
    )
}