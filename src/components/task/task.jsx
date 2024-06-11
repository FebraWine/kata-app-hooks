// import { Component } from 'react'
import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

import '../../ComponentsCss/task.css'

function TaskListItem(props) {
  const { todo, onDeleted, onToggleLeft } = props
  const { condition, edit, label, timeData, id } = todo
  const [editing, setIsEditing] = useState(false)
  const [isChecked, setIsChecked] = useState(condition, edit)
  const [editingValue, setEditingValue] = useState('')

  const clickEdit = () => {
    setIsEditing(true)
  }

  const onLabelChange = (e) => {
    if (e.keyCode === 13) {
      setIsEditing(false)
    }
  }

  const handelChange = (e) => {
    setEditingValue(e.target.value)
  }

  return (
    <li className={condition ? 'completed' : editing ? 'editing' : 'active'}>
      <div className="view">
        <input
          onClick={onToggleLeft}
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          className="toggle"
          type="checkbox"
        />
        <label htmlFor={id}>
          <span className="description">{editingValue || label}</span>
          <span className="created">{formatDistanceToNow(timeData, { includeSeconds: true })}</span>
        </label>
        <button type="button" id={id} className="icon  icon-edit" onClick={clickEdit} />
        <button type="button" id={id} className="icon  icon-destroy" onClick={onDeleted} />
      </div>
      <input
        id={id}
        className="edit"
        type="text"
        onChange={handelChange}
        onKeyDown={onLabelChange}
        value={editingValue || label}
      />
    </li>
  )
}

export default TaskListItem
