import React from 'react'

import '../../ComponentsCss/new-task-form.css'

export default class SearchTodo extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      label: '',
      sec: '',
      min: '',
    }

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onSubmit = (e) => {
      e.preventDefault()
      this.props.addItem(this.state.label, this.state.sec, this.state.min)
      this.setState({
        label: '',
        sec: '',
        min: '',
      })
    }

    this.onSecondChange = (e) => {
      if (e.target.value === '00') {
        e.target.value = 0
      }
      if (e.target.value.split('')[0] === '.' || e.target.value.split('')[0] === ',') {
        e.target.value = ''
      }
      const secondsInput = parseInt(e.target.value, 10)
      console.log(secondsInput)
      if (e.target.value === '') {
        e.target.value = ''
        this.setState({
          sec: e.target.value,
        })
      } else if (Number.isNaN(secondsInput)) {
        e.target.value = ''
      } else if (secondsInput >= 60) {
        this.setState({
          sec: secondsInput % 60,
          min: this.state.min + Math.floor(secondsInput / 60),
        })
      } else {
        this.setState({
          sec: e.target.value,
        })
      }
    }

    this.onMinuteChange = (e) => {
      if (e.target.value.split('')[0] === '.' || e.target.value.split('')[0] === ',') {
        e.target.value = ''
      }
      if (e.target.value === '00') {
        e.target.value = 0
      }
      this.setState({
        min: e.target.value,
      })
    }

    this.onEnterPressNumber = (e) => {
      e.target.value = e.target.value.replace(/[^[0-9]]/g, '')
      if (e.key === 'Enter') {
        this.onSubmit(e)
      }
    }
    this.onEnterPressString = (e) => {
      if (e.key === 'Enter') {
        this.onSubmit(e)
      }
    }
  }

  render() {
    const { label, sec, min } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          onChange={this.onLabelChange}
          onKeyDown={this.onEnterPressString}
          value={label}
          className="new-todo"
          placeholder="What needs to be done!?"
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={min}
          onChange={this.onMinuteChange}
          onKeyUp={this.onEnterPressNumber}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.onSecondChange}
          onKeyUp={this.onEnterPressNumber}
        />
      </form>
    )
  }
}
