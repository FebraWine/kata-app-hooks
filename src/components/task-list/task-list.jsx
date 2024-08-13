import TaskComplited from '../task/task'

import '../../ComponentsCss/task-list.css'

function TaskList({ todo, onDeleted, onToggleLeft, onEditItem, onTodoFilter, onTimerReset, onTimerPause }) {
  const elements = todo.map((item) => {
    const { ...itemProps } = item
    return (
      <ul key={item.id} className="todo-list">
        <TaskComplited
          onTodoFilter={onTodoFilter}
          todo={itemProps}
          onEditItem={() => onEditItem(item.id)}
          onDeleted={() => onDeleted(item.id)}
          onToggleLeft={() => {
            onToggleLeft(item.id)
          }}
          onTimerReset={() => onTimerReset(item.id)}
          onTimerPause={() => onTimerPause(item.id)}
        />
      </ul>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
