import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { createTask, updateTask } from '../store/slices/tasksSlice'
import { CreateTaskData } from '../types'
import { Save } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

interface TaskFormProps {
  taskId?: string | null
  onClose: () => void
}

const TaskForm = ({ taskId, onClose }: TaskFormProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const { tasks, isLoading, error } = useSelector((state: RootState) => state.tasks)
  
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    status: 'pending'
  })

  const isEditing = !!taskId
  const task = isEditing ? tasks.find(t => t.id === taskId) : null

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status
      })
    }
  }, [task])

  // useEffect(() => {
  //   // Clear errors when component mounts
  //   dispatch(clearError())
  // }, [dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isEditing && taskId) {
      await dispatch(updateTask({
        id: taskId,
        ...formData
      }))
    } else {
      await dispatch(createTask(formData))
    }
    
    // Close form if no errors
    if (!error) {
      onClose()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details for this task.' : 'Fill out the form below to create a new task.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="input w-full"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="input w-full resize-none"
              placeholder="Enter task description"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-3">
              <div className="text-sm text-red-700 dark:text-red-400">
                {error}
              </div>
            </div>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary px-4 py-2"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !formData.title.trim()}
              className="btn btn-primary px-4 py-2 flex items-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TaskForm
