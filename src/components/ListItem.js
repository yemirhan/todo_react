import React, { useState } from 'react'

export const ListItem = ({ item, index, toggleTask, deleteTask, updateLabel }) => {
    const [changing, setChanging] = useState(false)
    const [newitem, setnewitem] = useState(item?.label)
    return (
        <li className="completed">
            <div className="view">
                <input className="toggle" type="checkbox" checked={item?.toggle || false} onChange={({ target: { checked } }) => {
                    toggleTask(index, checked)
                }}></input>
                {!changing && <label className={item?.toggle ? "done" : ""} onClick={() => setChanging(true)}>{item?.label || "test"}</label>}
                {changing && <input autoFocus className="mv-editor" name="sdlfaslşdf" value={newitem} onChange={({ target: { value } }) => setnewitem(value)} onKeyDown={(event) => {
                    if (event.key === "Enter") { updateLabel(index, newitem); setChanging(false) }
                }}></input>}
                <button className={changing ? "" : "destroy"} onClick={() => deleteTask(index)}></button>
            </div>
        </li>
    )
}
