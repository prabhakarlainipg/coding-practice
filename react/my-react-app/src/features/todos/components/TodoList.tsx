import { memo } from 'react'
import type { Todo } from '../types/todo'

type TodoListProps = {
  todos: Todo[]
}

export const TodoList = memo(function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="todos-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            className={todo.completed ? 'todo-check todo-check--complete' : 'todo-check'}
            aria-hidden="true"
          >
            {todo.completed ? '✓' : ''}
          </span>
          <div>
            <span className="todo-title">{todo.title}</span>
            <small>User {todo.userId} · Todo #{todo.id}</small>
          </div>
          <span className={todo.completed ? 'todo-status todo-status--complete' : 'todo-status'}>
            {todo.completed ? 'Completed' : 'Active'}
          </span>
        </li>
      ))}
    </ul>
  )
})
