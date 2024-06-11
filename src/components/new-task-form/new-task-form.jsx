import React from 'react'

import '../../ComponentsCss/new-task-form.css'

export default class SearchTodo extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      label: '',
    }

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      })
    }

    this.onSubmit = (e) => {
      e.preventDefault()
      this.props.addItem(this.state.label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          onChange={this.onLabelChange}
          value={this.state.label}
          className="new-todo"
          placeholder="What needs to be done!?"
        />
      </form>
    )
  }
}
