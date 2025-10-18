import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../store/store'
import { fetchTasks } from '../store/slices/tasksSlice'
import TaskList from './TaskList.tsx'
import TaskForm from './TaskForm.tsx'
import TaskFilters from './TaskFilters.tsx'
import EmptyState from './EmptyState.tsx'
import LoadingSpinner from './LoadingSpinner.tsx'
import { Plus, RefreshCw } from 'lucide-react'

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')

  const handleRefresh = () => {
    dispatch(fetchTasks())
  }

  const handleEditTask = (taskId: string) => {
    setEditingTask(taskId)
    setShowTaskForm(true)
  }

  const handleCloseForm = () => {
    setShowTaskForm(false)
    setEditingTask(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (statusFilter === 'all') return true
    return task.status === statusFilter
  })

  if (isLoading && tasks.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Tasks
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage and track your tasks efficiently
          </p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="btn btn-secondary px-4 py-2"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            onClick={() => setShowTaskForm(true)}
            className="btn btn-primary px-4 py-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <div className="text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        </div>
      )}

      {/* Filters */}
      <TaskFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        taskCount={filteredTasks.length}
      />

      {/* Task Form Modal */}
      {showTaskForm && (
        <TaskForm
          taskId={editingTask}
          onClose={handleCloseForm}
        />
      )}

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          statusFilter={statusFilter}
          onAddTask={() => setShowTaskForm(true)}
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEditTask={handleEditTask}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default Dashboard
