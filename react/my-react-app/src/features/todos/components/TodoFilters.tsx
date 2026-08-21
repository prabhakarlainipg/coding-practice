import { memo } from 'react'
import type { TodoFilter } from '../types/todo'

const filters: Array<{ value: TodoFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

type TodoFiltersProps = {
  activeFilter: TodoFilter
  isPending: boolean
  onFilterChange: (filter: TodoFilter) => void
}

export const TodoFilters = memo(function TodoFilters({
  activeFilter,
  isPending,
  onFilterChange,
}: TodoFiltersProps) {
  return (
    <div className="todo-filters" aria-label="Filter todos" aria-busy={isPending}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          aria-pressed={activeFilter === filter.value}
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
      {isPending && <span className="filter-pending" role="status">Updating…</span>}
    </div>
  )
})
