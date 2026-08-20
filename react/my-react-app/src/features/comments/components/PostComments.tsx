import { usePostComments } from '../queries/usePostComments'
import { getErrorMessage } from '../../../lib/getErrorMessage'

type PostCommentsProps = {
  postId: number
}

export function PostComments({ postId }: PostCommentsProps) {
  const { data: comments = [], error, isError, isPending, refetch } =
    usePostComments(postId)

  return (
    <section className="comments" aria-labelledby="comments-heading">
      <div className="comments__heading">
        <div>
          <p className="eyebrow">Discussion</p>
          <h2 id="comments-heading">Comments</h2>
        </div>
        {!isPending && !isError && (
          <span className="result-count">{comments.length} comments</span>
        )}
      </div>

      {isPending && (
        <div className="comments__state" role="status">
          <span className="spinner" aria-hidden="true" />
          <p>Loading comments…</p>
        </div>
      )}

      {isError && (
        <div className="comments__state comments__state--error" role="alert">
          <p>{getErrorMessage(error, 'comments')}</p>
          <button type="button" onClick={() => void refetch()}>Try again</button>
        </div>
      )}

      {!isPending && !isError && comments.length === 0 && (
        <div className="comments__state">
          <p>No comments have been added to this post.</p>
        </div>
      )}

      {!isPending && !isError && comments.length > 0 && (
        <ul className="comments__list">
          {comments.map((comment) => (
            <li key={comment.id} className="comment">
              <div className="comment__avatar" aria-hidden="true">
                {comment.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3>{comment.name}</h3>
                <p className="comment__email">{comment.email}</p>
                <p>{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
