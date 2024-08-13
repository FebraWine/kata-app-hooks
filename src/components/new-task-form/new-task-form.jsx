import React from 'react'

import '../../ComponentsCss/new-task-form.css'

export default class SearchTodo extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      label: '',
      sec: 0,
      min: 0,
    }

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onSubmit = (e) => {
      console.log('жмяк')
      e.preventDefault()
      this.props.addItem(this.state.label, this.state.sec, this.state.min)
      this.setState({
        label: '',
        sec: 0,
        min: 0,
      })
    }

    this.onSecondChange = (e) => {
      const secondsInput = parseInt(e.target.value, 10)
      if (secondsInput >= 60) {
        this.setState({
          // eslint-disable-next-line react/no-access-state-in-setstate
          min: parseInt(this.state.min, 10) + Math.floor(secondsInput / 60),
          sec: e.target.value % 60,
        })
      } else {
        this.setState({
          sec: secondsInput,
        })
      }
    }

    this.onMinuteChange = (e) => {
      this.setState({
        min: e.target.value,
      })
    }

    this.onEnterPress = (e) => {
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
          onKeyDown={this.onEnterPress}
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
          onKeyDown={this.onEnterPress}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={sec}
          onChange={this.onSecondChange}
          onKeyDown={this.onEnterPress}
        />
      </form>
    )
  }
}
