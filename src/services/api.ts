import axios from 'axios'
import { LoginCredentials, CreateTaskData, User, Task } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    const response = await api.post('/login', credentials)
    return response.data
  },
}

export const tasksAPI = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks')
    return response.data
  },
  
  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    const response = await api.post('/tasks', taskData)
    return response.data
  },
  
  updateTask: async (id: string, taskData: Partial<CreateTaskData>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, taskData)
    return response.data
  },
  
  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`)
  },
}

export default api
