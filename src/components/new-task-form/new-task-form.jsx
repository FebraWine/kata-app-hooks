import { useState } from 'react'

import '../../ComponentsCss/new-task-form.css'

export default function SearchTodo(props) {
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')
  const [label, setLabel] = useState('')

  const onLabelChange = (e) => {
    setLabel(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    props.addItem(label, sec, min)
    setLabel('')
    setSec('')
    setMin('')
  }

  const onSecondChange = (e) => {
    if (e.target.value === '00') {
      e.target.value = 0
    }
    if (e.target.value.split('')[0] === '.' || e.target.value.split('')[0] === ',') {
      e.target.value = ''
    }
    const secondsInput = parseInt(e.target.value, 10)
    if (e.target.value === '') {
      e.target.value = ''

      setSec(e.target.value)
    } else if (Number.isNaN(secondsInput)) {
      e.target.value = ''
    } else if (secondsInput >= 60) {
      setMin(min + Math.floor(secondsInput / 60))
      setSec(secondsInput % 60)
    } else {
      setSec(e.target.value)
    }
  }

  const onMinuteChange = (e) => {
    if (e.target.value.split('')[0] === '.' || e.target.value.split('')[0] === ',') {
      e.target.value = ''
    }
    if (e.target.value === '00') {
      e.target.value = 0
    }

    setMin(e.target.value)
  }

  const onEnterPressNumber = (e) => {
    e.target.value = e.target.value.replace(/[^[0-9]]/g, '')
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }
  const onEnterPressString = (e) => {
    if (e.key === 'Enter') {
      onSubmit(e)
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        onChange={onLabelChange}
        onKeyDown={onEnterPressString}
        value={label}
        className="new-todo"
        placeholder="What needs to be done!?"
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={min}
        onChange={onMinuteChange}
        onKeyUp={onEnterPressNumber}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={sec}
        onChange={onSecondChange}
        onKeyUp={onEnterPressNumber}
      />
    </form>
  )
}
