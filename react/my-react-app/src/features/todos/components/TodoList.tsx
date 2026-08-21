import { memo, useCallback, useMemo } from 'react'
import { List, type RowComponentProps } from 'react-window'
import type { Todo } from '../types/todo'

type TodoListProps = {
  todos: Todo[]
}

type TodoRowData = {
  todos: Todo[]
}

const ROW_HEIGHT = 82
const MAX_LIST_HEIGHT = 574

function TodoRow({
  ariaAttributes,
  index,
  style,
  todos,
}: RowComponentProps<TodoRowData>) {
  const todo = todos[index]

  return (
    <li className="virtual-todo-row" style={style} {...ariaAttributes}>
      <div className="todo-row-card">
        <span
          className={todo.completed ? 'todo-check todo-check--complete' : 'todo-check'}
          aria-hidden="true"
        >
          {todo.completed ? '✓' : ''}
        </span>
        <div className="todo-copy">
          <span className="todo-title">{todo.title}</span>
          <small>User {todo.userId} · Todo #{todo.id}</small>
        </div>
        <span className={todo.completed ? 'todo-status todo-status--complete' : 'todo-status'}>
          {todo.completed ? 'Completed' : 'Active'}
        </span>
      </div>
    </li>
  )
}

export const TodoList = memo(function TodoList({ todos }: TodoListProps) {
  // react-window compares rowProps by reference, so keep this object stable.
  const rowProps = useMemo<TodoRowData>(() => ({ todos }), [todos])
  const getRowKey = useCallback(
    (index: number, data: TodoRowData) => data.todos[index].id,
    [],
  )

  return (
    <List
      className="todos-list"
      overscanCount={5}
      rowComponent={TodoRow}
      rowCount={todos.length}
      rowHeight={ROW_HEIGHT}
      rowKey={getRowKey}
      rowProps={rowProps}
      style={{ height: Math.min(MAX_LIST_HEIGHT, todos.length * ROW_HEIGHT) }}
      tagName="ul"
    />
  )
})
