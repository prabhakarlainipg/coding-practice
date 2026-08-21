import { useCallback, useDeferredValue, useMemo, useReducer, useTransition } from 'react'
import { TodoFilters } from '../features/todos/components/TodoFilters'
import { TodoList } from '../features/todos/components/TodoList'
import { useTodos } from '../features/todos/queries/useTodos'
import type { TodoFilter } from '../features/todos/types/todo'
import { getErrorMessage } from '../lib/getErrorMessage'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

type TodoViewState = {
  filter: TodoFilter
  search: string
}

type TodoViewAction =
  | { type: 'filterChanged'; filter: TodoFilter }
  | { type: 'searchChanged'; search: string }
  | { type: 'filtersReset' }

const initialViewState: TodoViewState = {
  filter: 'all',
  search: '',
}

function assertNever(value: never): never {
  throw new Error(`Unhandled todo view action: ${JSON.stringify(value)}`)
}

function todoViewReducer(
  state: TodoViewState,
  action: TodoViewAction,
): TodoViewState {
  switch (action.type) {
    case 'filterChanged':
      return { ...state, filter: action.filter }
    case 'searchChanged':
      return { ...state, search: action.search }
    case 'filtersReset':
      return initialViewState
    default:
      return assertNever(action)
  }
}

export function TodosPage() {
  useDocumentTitle('Todos | ProjectHub')
  const [viewState, dispatch] = useReducer(todoViewReducer, initialViewState)
  //React treats it as non-urgent
  //We initiate the update
  // React treats it as non-urgent
  // isPending describes progress
  const [isFilterPending, startFilterTransition] = useTransition()
  const { data: todos = [], error, isError, isFetching, isPending, refetch } =
    useTodos()
/* Urgent render
├── Input displays "react"
└── Results can temporarily use ""

Deferred render
└── Results update using "react"*/
  const deferredSearch = useDeferredValue(viewState.search)

  const completedCount = todos.filter((todo) => todo.completed).length
  const activeCount = todos.length - completedCount

  const visibleTodos = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLocaleLowerCase()

    return todos.filter((todo) => {
      const matchesStatus =
        viewState.filter === 'all' ||
        (viewState.filter === 'completed' && todo.completed) ||
        (viewState.filter === 'active' && !todo.completed)
      const matchesSearch =
        !normalizedSearch || todo.title.toLocaleLowerCase().includes(normalizedSearch)

      return matchesStatus && matchesSearch
    })
  }, [todos, deferredSearch, viewState.filter])

  const hasActiveFilters = viewState.filter !== 'all' || viewState.search !== ''

/*  When useCallback is useful
  Useful when the function is:
  Passed to a memoized child
  Used as an effect dependency
  Used as another hook dependency
  Registered with an external subscription requiring stable identity*/

  const handleFilterChange = useCallback(
    (filter: TodoFilter) => {
      startFilterTransition(() => {
        dispatch({ type: 'filterChanged', filter })
      })
    },
    [startFilterTransition],
  )

  return (
    <section className="todos-page" aria-labelledby="todos-heading">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Reducer workspace</p>
          <h1 id="todos-heading">Todos</h1>
          <p>Server data viewed through typed reducer-managed filters.</p>
        </div>
        {!isPending && !isError && (
          <button className="secondary-button" disabled={isFetching} type="button" onClick={() => void refetch()}>
            {isFetching ? 'Refreshing…' : 'Refresh'}
          </button>
        )}
      </div>

      {!isPending && !isError && (
        <>
          <div className="todo-stats" aria-label="Todo summary">
            <div><strong>{todos.length}</strong><span>Total</span></div>
            <div><strong>{activeCount}</strong><span>Active</span></div>
            <div><strong>{completedCount}</strong><span>Completed</span></div>
          </div>

          <div className="todo-toolbar">
            <div className="todo-search" role="search">
              <label htmlFor="todo-search">Search todos</label>
              <input
                id="todo-search"
                type="search"
                value={viewState.search}
                placeholder="Search by title"
                onChange={(event) =>
                  dispatch({ type: 'searchChanged', search: event.target.value })
                }
              />
              {viewState.search !== deferredSearch && (
                <p className="search-pending" role="status">Updating results…</p>
              )}
            </div>
            <TodoFilters
              activeFilter={viewState.filter}
              isPending={isFilterPending}
              onFilterChange={handleFilterChange}
            />
            <button
              className="secondary-button"
              disabled={!hasActiveFilters}
              type="button"
              onClick={() => dispatch({ type: 'filtersReset' })}
            >
              Reset filters
            </button>
          </div>
        </>
      )}

      {isPending && (
        <div className="state-panel" role="status">
          <span className="spinner" aria-hidden="true" />
          <p>Loading todos…</p>
        </div>
      )}

      {isError && (
        <div className="state-panel state-panel--error" role="alert">
          <h2>We couldn’t load the todos</h2>
          <p>{getErrorMessage(error, 'todos')}</p>
          <button type="button" onClick={() => void refetch()}>Try again</button>
        </div>
      )}

      {!isPending && !isError && visibleTodos.length === 0 && (
        <div className="state-panel">
          <h2>No matching todos</h2>
          <p>Change the search or status filter to see more results.</p>
          {hasActiveFilters && (
            <button type="button" onClick={() => dispatch({ type: 'filtersReset' })}>Reset filters</button>
          )}
        </div>
      )}

      {!isPending && !isError && visibleTodos.length > 0 && (
        <div className="todo-results">
          <p aria-live="polite">Showing {visibleTodos.length} of {todos.length} todos</p>
          <TodoList todos={visibleTodos} />
        </div>
      )}
    </section>
  )
}
