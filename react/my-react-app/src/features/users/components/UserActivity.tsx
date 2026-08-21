import { Link } from 'react-router-dom'
import { useUserPosts } from '../../posts/queries/usePosts'
import { useUserTodos } from '../../todos/queries/useTodos'
import { getErrorMessage } from '../../../lib/getErrorMessage'

type UserActivityProps = {
  userId: number
}

export function UserActivity({ userId }: UserActivityProps) {
  const postsQuery = useUserPosts(userId)
  const todosQuery = useUserTodos(userId)

  const completedTodos = todosQuery.data?.filter((todo) => todo.completed).length ?? 0

  return (
    <div className="user-activity">
      <section className="activity-panel" aria-labelledby="user-posts-heading">
        <div className="activity-panel__heading">
          <h2 id="user-posts-heading">Recent posts</h2>
          {postsQuery.isSuccess && <span>{postsQuery.data.length} total</span>}
        </div>

        {postsQuery.isPending && <p role="status">Loading user posts…</p>}
        {postsQuery.isError && (
          <div className="activity-error" role="alert">
            <p>{getErrorMessage(postsQuery.error, 'user posts')}</p>
            <button type="button" onClick={() => void postsQuery.refetch()}>Try again</button>
          </div>
        )}
        {postsQuery.isSuccess && postsQuery.data.length === 0 && <p>No posts found.</p>}
        {postsQuery.isSuccess && postsQuery.data.length > 0 && (
          <ul className="activity-list">
            {postsQuery.data.slice(0, 5).map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="activity-panel" aria-labelledby="user-todos-heading">
        <div className="activity-panel__heading">
          <h2 id="user-todos-heading">Todos</h2>
          {todosQuery.isSuccess && (
            <span>{completedTodos}/{todosQuery.data.length} completed</span>
          )}
        </div>

        {todosQuery.isPending && <p role="status">Loading user todos…</p>}
        {todosQuery.isError && (
          <div className="activity-error" role="alert">
            <p>{getErrorMessage(todosQuery.error, 'user todos')}</p>
            <button type="button" onClick={() => void todosQuery.refetch()}>Try again</button>
          </div>
        )}
        {todosQuery.isSuccess && todosQuery.data.length === 0 && <p>No todos found.</p>}
        {todosQuery.isSuccess && todosQuery.data.length > 0 && (
          <ul className="activity-list activity-list--todos">
            {todosQuery.data.slice(0, 5).map((todo) => (
              <li key={todo.id}>
                <span className={todo.completed ? 'todo-mark todo-mark--complete' : 'todo-mark'} aria-hidden="true">
                  {todo.completed ? '✓' : '•'}
                </span>
                <span>{todo.title}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
