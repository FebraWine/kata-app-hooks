import React from 'react'
import '../../ComponentsCss/task-filter.css'

class TaskFilter extends React.PureComponent {
  render() {
    return (
      <ul className="filters">
        <li>
          <button
            onClick={() => this.props.onhandleClickTodo('All')}
            type="button"
            className={this.props.tabSel === 'All' ? 'selected' : null}
          >
            All
          </button>
        </li>
        <li>
          <button
            onClick={() => this.props.onhandleClickTodo('Active')}
            type="button"
            className={this.props.tabSel === 'Active' ? 'selected' : null}
          >
            Active
          </button>
        </li>
        <li>
          <button
            onClick={() => this.props.onhandleClickTodo('Completed')}
            type="button"
            className={this.props.tabSel === 'Completed' ? 'selected' : null}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

export default TaskFilter
