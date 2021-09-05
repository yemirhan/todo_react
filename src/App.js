import React, { useEffect, useState } from 'react';
import './App.css';
import { ListItem } from './components/ListItem';

function App() {
  const [checkedAll, setCheckedAll] = useState()
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState("All")
  const [item, setItem] = useState("")
  useEffect(() => {
    setTasks(tasks => [...tasks.map(task => ({ ...task, toggle: checkedAll }))])
  }, [checkedAll])
  useEffect(() => {
    setTasks([{ label: "İlk taskim", toggle: true }, { label: "İkinci taskim", toggle: false }])
    return () => {
      setTasks([])
    }
  }, [])
  const toggleTask = (index, state) => {
    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], toggle: state }
    setTasks([...newTasks])
  }
  const deleteTask = (index) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks([...newTasks])
  }
  const updateLabel = (index, label) => {
    const newTasks = [...tasks]
    newTasks[index] = { ...newTasks[index], label: label }
    setTasks([...newTasks])
  }
  return (<>
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          setTasks(tasks => [...tasks, { label: item, toggle: false }])
          setItem("")
        }}>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus onChange={({ target: { value } }) => setItem(value)} value={item}></input>
        </form>
      </header>

      <section className="main">
        <input className="toggle-all" id="toggle-all" type="checkbox" onChange={({ target: { checked } }) => { setCheckedAll(checked) }} checked={checkedAll}></input>
        <label htmlFor="toggle-all">
          Mark all as complete
        </label>

        <ul className="todo-list">
          {tasks.filter(e => {
            if (filter === "Completed") return e.toggle
            if (filter === "Active") return !e.toggle
            return e
          }).map((e, k) => <ListItem item={e} key={k} index={k} toggleTask={toggleTask} deleteTask={deleteTask} updateLabel={updateLabel} />)}
        </ul>
      </section>


      <footer className="footer">


        <span className="todo-count">
          <strong>{tasks.length}</strong>
          {" "}items left
        </span>

        <ul className="filters">
          <li onClick={() => setFilter("All")}>
            <a className={filter === "All" ? "selected" : ""}>All</a>
          </li>
          <li onClick={() => setFilter("Active")}>
            <a className={filter === "Active" ? "selected" : ""}>Active</a>
          </li>
          <li onClick={() => setFilter("Completed")}>
            <a className={filter === "Completed" ? "selected" : ""}>Completed</a>
          </li>
        </ul>


        <button className="clear-completed" onClick={() => setTasks(tasks => [...tasks.filter(task => !task.toggle)])}>
          Clear completed
        </button>
      </footer>
    </section>

    <footer className="info">
      <p>Click to edit a todo</p>
      <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  </>
  );
}

export default App;
