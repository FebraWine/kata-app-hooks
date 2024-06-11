import TaskFilter from '../task-filter/task-filter'

import '../../ComponentsCss/footer.css'

function Footer({ todo, tabSel, onhandleClickTodo, onClearComplited }) {
  const todoCondition = todo.filter((item) => item.condition === false)
  const itemLeft = todoCondition.length
  return (
    <footer className="footer">
      <span className="todo-count"> {itemLeft} items left</span>
      <TaskFilter tabSel={tabSel} todo={todo} onhandleClickTodo={onhandleClickTodo} />
      <button onClick={() => onClearComplited()} type="button" className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
