import { CheckCircle, Plus } from 'lucide-react'

interface EmptyStateProps {
  statusFilter: 'all' | 'pending' | 'in-progress' | 'completed'
  onAddTask: () => void
}

const EmptyState = ({ statusFilter, onAddTask }: EmptyStateProps) => {
  const getEmptyMessage = () => {
    switch (statusFilter) {
      case 'pending':
        return {
          title: 'No pending tasks',
          description: 'You have no pending tasks at the moment. Great job!'
        }
      case 'in-progress':
        return {
          title: 'No tasks in progress',
          description: 'You have no tasks currently in progress.'
        }
      case 'completed':
        return {
          title: 'No completed tasks',
          description: 'You haven\'t completed any tasks yet.'
        }
      default:
        return {
          title: 'No tasks yet',
          description: 'Get started by creating your first task.'
        }
    }
  }

  const { title, description } = getEmptyMessage()

  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <CheckCircle className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        {description}
      </p>

      {statusFilter === 'all' && (
        <div className="mt-6">
          <button
            onClick={onAddTask}
            className="btn btn-primary px-6 py-3 inline-flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create your first task
          </button>
        </div>
      )}
    </div>
  )
}

export default EmptyState
