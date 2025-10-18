import { Filter } from 'lucide-react'

interface TaskFiltersProps {
  statusFilter: 'all' | 'pending' | 'in-progress' | 'completed'
  onStatusFilterChange: (status: 'all' | 'pending' | 'in-progress' | 'completed') => void
  taskCount: number
}

const TaskFilters = ({ statusFilter, onStatusFilterChange, taskCount }: TaskFiltersProps) => {
  const filters = [
    { value: 'all', label: 'All Tasks', count: null },
    { value: 'pending', label: 'Pending', count: null },
    { value: 'in-progress', label: 'In Progress', count: null },
    { value: 'completed', label: 'Completed', count: null },
  ] as const

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Filter by status:
          </span>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onStatusFilterChange(filter.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              statusFilter === filter.value
                ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TaskFilters
