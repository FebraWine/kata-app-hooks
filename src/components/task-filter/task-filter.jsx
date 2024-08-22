import '../../ComponentsCss/task-filter.css'

export default function TaskFilter(props) {
  return (
    <ul className="filters">
      <li>
        <button
          onClick={() => props.onhandleClickTodo('All')}
          type="button"
          className={props.tabSel === 'All' ? 'selected' : null}
        >
          All
        </button>
      </li>
      <li>
        <button
          onClick={() => props.onhandleClickTodo('Active')}
          type="button"
          className={props.tabSel === 'Active' ? 'selected' : null}
        >
          Active
        </button>
      </li>
      <li>
        <button
          onClick={() => props.onhandleClickTodo('Completed')}
          type="button"
          className={props.tabSel === 'Completed' ? 'selected' : null}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}
