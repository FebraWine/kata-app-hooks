import { useState, useRef } from 'react'

import HeaderTodo from '../app-header/app-header'
import SearchTodo from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import TaskFooter from '../footer/footer'

import '../../ComponentsCss/app.css'

export default function NewApp() {
  const [todoData, setTodoData] = useState([])
  const [tabSel, setTabSel] = useState('All')
  const [idTodo, setIdTodo] = useState(0)
  const timerRef = useRef('')

  const maxId = () => {
    setIdTodo((i) => i + 1)
  }

  const addedItem = (text, sec, min) => {
    if (text.trim()) {
      maxId()
      const newItem = [
        {
          label: text,
          sec,
          min,
          timer: false,
          active: false,
          runTimer: false,
          condition: false,
          edit: false,
          id: idTodo,
          timeData: new Date(),
        },
      ]
      const newArr = [...todoData, ...newItem]

      setTodoData(newArr)
    }
  }

  const todoActive = (id) => {
    const idx = todoData.findIndex((item) => item.id === id)

    const oldItem = todoData[idx]
    const newItem = { ...oldItem, active: !oldItem.active }
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArray)
  }

  const onEditItem = (id) => {
    const idx = todoData.findIndex((item) => item.id === id)

    const oldItem = todoData[idx]
    const newItem = { ...oldItem, edit: !oldItem.edit }
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArray)
  }

  const delitItem = (id) => {
    const idx = todoData.findIndex((item) => item.id === id)
    const after = todoData.slice(0, idx)
    const before = todoData.slice(idx + 1)
    const newTodoData = [...after, ...before]
    const oldItem = todoData[idx]
    clearInterval(oldItem.timer)
    setTodoData(newTodoData)
  }

  const clearComplited = () => {
    const newArray = todoData.filter((item) => item.condition !== true)
    setTodoData(newArray)
  }

  const onToggleLeft = (id) => {
    const idx = todoData.findIndex((item) => item.id === id)
    const oldItem = todoData[idx]
    clearInterval(oldItem.timer)
    const newItem = { ...oldItem, condition: !oldItem.condition, sec: 0, min: 0, timer: null, runTimer: false }
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
    setTodoData(newArray)
  }

  const handleClickTodo = (tab) => {
    setTabSel(tab)
  }

  const showTodo = () => {
    return todoData.filter(({ condition }) => {
      const all = tabSel === 'All'
      const completed = tabSel === 'Completed'
      return all ? true : completed ? condition === true : condition === false
    })
  }

  const onTimerPause = (idx) => {
    if (todoData.find((el) => el.id === idx).timer) {
      setTodoData((arr) =>
        arr.map((el) => {
          const clearTimer = el.id === idx ? clearInterval(el.timer) : el.timer
          return {
            ...el,
            timer: clearTimer,
          }
        })
      )
    }
  }

  const onTimerClear = (el) => {
    clearInterval(el.timer)
    const newEl = {
      ...el,
      sec: 0,
      min: 0,
      runTimer: true,
    }
    return {
      ...newEl,
    }
  }

  const tick = (el) => {
    if (el.sec > 0) {
      return {
        ...el,
        sec: el.sec - 1,
      }
    } else if (el.min > 0) {
      return {
        ...el,
        min: el.min - 1,
        sec: 59,
      }
    }
    return onTimerClear(el)
  }

  const startTimer = (id) => {
    if (!timerRef.current.find((el) => el.id === id).timer) {
      const timerItem = setInterval(() => {
        setTodoData((arr) => arr.map((el) => (el.id === id ? tick(el) : el)))
      }, 1000)

      setTodoData((arr) => arr.map((el) => (el.id === id ? { ...el, timer: timerItem } : el)))
      timerRef.current = todoData
    }
  }

  const timerReset = (id) => {
    timerRef.current = todoData
    startTimer(id)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <HeaderTodo />
        <SearchTodo addItem={addedItem} />
      </header>
      <section className="main">
        <TaskList
          todo={showTodo()}
          onDeleted={delitItem}
          onToggleLeft={onToggleLeft}
          onEditItem={onEditItem}
          onTimerReset={timerReset}
          onTimerPause={onTimerPause}
        />
        <TaskFooter
          tabSel={tabSel}
          onClearComplited={clearComplited}
          todoActive={todoActive}
          todo={showTodo()}
          onhandleClickTodo={handleClickTodo}
        />
      </section>
    </section>
  )
}
