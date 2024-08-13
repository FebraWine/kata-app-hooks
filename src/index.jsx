import React from 'react'
import { createRoot } from 'react-dom/client'

import HeaderTodo from './components/app-header/app-header'
import SearchTodo from './components/new-task-form/new-task-form'
import TaskList from './components/task-list/task-list'
import TaskFooter from './components/footer/footer'

import './ComponentsCss/index.css'

const container = document.getElementById('root')
const wrapper = createRoot(container)

export default class App extends React.PureComponent {
  constructor() {
    super()

    this.idTodo = 0

    this.maxId = () => {
      this.idTodo += 1
      return this.idTodo
    }

    this.state = {
      TodoData: [],
      todoActive: false,
      tabSel: 'All',
    }

    this.addedItem = (text, sec, min) => {
      if (text.trim()) {
        const newItem = [
          {
            label: text,
            sec,
            min,
            timer: false,
            runTimer: false,
            condition: false,
            edit: false,
            id: this.maxId(this.idTodo),
            timeData: new Date(),
          },
        ]
        this.setState(({ TodoData }) => {
          const newArr = [...TodoData, ...newItem]

          return {
            TodoData: newArr,
          }
        })
      }
    }

    this.onEditItem = (id) => {
      this.setState(({ TodoData }) => {
        const idx = TodoData.findIndex((item) => item.id === id)

        const oldItem = TodoData[idx]
        const newItem = { ...oldItem, edit: !oldItem.edit }
        const newArray = [...TodoData.slice(0, idx), newItem, ...TodoData.slice(idx + 1)]

        return {
          TodoData: newArray,
        }
      })
    }

    this.delitItem = (id) => {
      this.setState(({ TodoData }) => {
        const idx = TodoData.findIndex((item) => item.id === id)
        const after = TodoData.slice(0, idx)
        const before = TodoData.slice(idx + 1)
        const newTodoData = [...after, ...before]
        const oldItem = TodoData[idx]
        clearInterval(oldItem.timer)
        return {
          TodoData: newTodoData,
        }
      })
    }

    this.clearComplited = () => {
      this.setState((TodoData) => {
        const newArray = TodoData.TodoData.filter((item) => item.condition !== true)

        return {
          TodoData: newArray,
        }
      })
    }

    this.onToggleLeft = (id) => {
      this.setState(({ TodoData }) => {
        const idx = TodoData.findIndex((item) => item.id === id)
        const oldItem = TodoData[idx]
        clearInterval(oldItem.timer)
        const newItem = { ...oldItem, condition: !oldItem.condition, sec: 0, min: 0, timer: null, runTimer: false }
        const newArray = [...TodoData.slice(0, idx), newItem, ...TodoData.slice(idx + 1)]

        return {
          TodoData: newArray,
        }
      })
    }

    this.handleClickTodo = (tab) => {
      this.setState({ tabSel: tab })
    }

    this.startTimer = (id, pause) => {
      const { TodoData } = this.state
      const idx = TodoData.findIndex((item) => item.id === id)
      const element = TodoData[idx]
      if (!element.timer) {
        if (element.sec || element.min) {
          if (!pause) {
            const newTimer = setInterval(() => {
              this.tick(id)
            }, 1000)

            const newItem = {
              ...element,
              timer: newTimer,
              runTimer: true,
            }
            const newArray = [...TodoData.slice(0, idx), newItem, ...TodoData.slice(idx + 1)]
            this.setState(() => {
              return { TodoData: newArray }
            })
          }
        }
      }

      if (pause) {
        clearInterval(element.timer)
        const newItem = {
          ...element,
          timer: null,
          runTimer: false,
        }
        const newArray = [...TodoData.slice(0, idx), newItem, ...TodoData.slice(idx + 1)]
        this.setState(() => {
          return { TodoData: newArray }
        })
      }
    }

    this.tick = (id) => {
      const { TodoData } = this.state
      const idx = TodoData.findIndex((item) => item.id === id)
      const element = TodoData[idx]
      if (!element.runTimer) {
        return null
      }
      if (element.min === 0 && element.sec === 0) {
        return null
        // eslint-disable-next-line no-else-return
      } else if (element.sec > 0) {
        const newItem = { ...element, sec: `${element.sec - 1}` }

        this.setState(() => {
          const newArray = [...TodoData.slice(0, idx), newItem, ...TodoData.slice(idx + 1)]
          return {
            TodoData: newArray,
          }
        })
      } else if (element.min > 0) {
        const newItem = { ...element, min: `${element.min - 1}`, sec: '59' }

        this.setState(() => {
          const newArray = [...TodoData.slice(0, idx), newItem, ...TodoData.slice(idx + 1)]
          return {
            TodoData: newArray,
          }
        })
      }
      return null
    }

    this.timerReset = (id) => {
      this.startTimer(id, false)
    }

    this.onTimerPause = (id) => {
      this.startTimer(id, true)
    }
  }

  showTodo = () => {
    const { TodoData, tabSel } = this.state
    return TodoData.filter(({ condition }) => {
      const all = tabSel === 'All'
      const completed = tabSel === 'Completed'
      return all ? true : completed ? condition === true : condition === false
    })
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <HeaderTodo />
          <SearchTodo addItem={this.addedItem} />
        </header>
        <section className="main">
          <TaskList
            todo={this.showTodo()}
            onDeleted={this.delitItem}
            onToggleLeft={this.onToggleLeft}
            onEditItem={this.onEditItem}
            onTimerReset={this.timerReset}
            onTimerPause={this.onTimerPause}
          />
          <TaskFooter
            tabSel={this.state.tabSel}
            onClearComplited={this.clearComplited}
            todoActive={this.state.todoActive}
            todo={this.showTodo()}
            onhandleClickTodo={this.handleClickTodo}
          />
        </section>
      </section>
    )
  }
}

wrapper.render(<App />)
