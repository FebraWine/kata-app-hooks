// import { Component } from 'react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import '../../ComponentsCss/task.css'

function TaskListItem(props) {
  const { todo, onDeleted, onToggleLeft, onTimerReset, onTimerPause } = props
  const { condition, edit, label, timeData, id, sec, min } = todo
  const [editing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(condition, edit)
  const [editingValue, setEditingValue] = useState('')
  const [timeTidi, settimeTidi] = useState('less than 20 seconds')

  // const clickEdit = () => {
  //   setIsEditing(true)
  // }

  // const onLabelChange = (e) => {
  //   if (e.keyCode === 13) {
  //     setIsEditing(false)
  //   }
  // }

  // const handelChange = (e) => {
  //   setEditingValue(e.target.value)
  // }

  const getTimeTodo = (time) => {
    settimeTidi(time)
  }

  setTimeout(() => {
    getTimeTodo(formatDistanceToNow(timeData, { includeSeconds: true }))
  }, 30000)

  return (
    <li className={condition ? 'completed' : editing ? 'editing' : 'active'}>
      <div className="view">
        <input
          onClick={onToggleLeft}
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked)
          }}
          className="toggle"
          type="checkbox"
        />
        <label htmlFor={id}>
          <span className="title">{editingValue || label}</span>
          <span className="description">
            <button type="button" className="icon icon-play" onClick={onTimerReset} />
            <button type="button" className="icon icon-pause" onClick={onTimerPause} />
            {`${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`}
          </span>
          <span className="description">{timeTidi}</span>
        </label>
        <button type="button" className="icon  icon-edit" onClick={() => setIsEditing(true)} />
        <button type="button" className="icon  icon-destroy" onClick={onDeleted} />
      </div>
      <input
        id={id}
        className="edit"
        type="text"
        onChange={(e) => setEditingValue(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && setIsEditing(false)}
        value={editingValue || label}
      />
    </li>
  )
}

// TaskListItem.defaultProps = {
//   condition: false,
//   label: 'Ошибка при создании задачи',
// }

export default TaskListItem
