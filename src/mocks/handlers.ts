import { http, HttpResponse } from 'msw'
import { Task, User } from '../types'

// Mock user data
const mockUser: User = {
  id: '1',
  username: 'test',
  email: 'test@example.com',
}

// Mock tasks data
let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the task management application',
    status: 'in-progress',
    createdAt: new Date('2024-01-15T10:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up login/logout functionality with JWT tokens',
    status: 'completed',
    createdAt: new Date('2024-01-14T09:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-14T15:30:00Z').toISOString(),
  },
  {
    id: '3',
    title: 'Design responsive UI',
    description: 'Create mobile-friendly interface using Tailwind CSS',
    status: 'pending',
    createdAt: new Date('2024-01-13T14:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-13T14:00:00Z').toISOString(),
  },
]

// Generate a simple JWT-like token
const generateToken = (): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = btoa(JSON.stringify({ 
    sub: mockUser.id, 
    username: mockUser.username,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }))
  const signature = btoa('mock-signature')
  return `${header}.${payload}.${signature}`
}

export const handlers = [
  // Auth endpoints
  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string }
    
    // Simulate authentication
    if (username === 'test' && password === 'test123') {
      const token = generateToken()
      return HttpResponse.json({
        user: mockUser,
        token,
      })
    }
    
    return HttpResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    )
  }),

  // Tasks endpoints
  http.get('/api/tasks', () => {
    return HttpResponse.json(mockTasks)
  }),

  http.post('/api/tasks', async ({ request }) => {
    const taskData = await request.json() as Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
    
    const newTask: Task = {
      ...taskData,
      id: (mockTasks.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    mockTasks.push(newTask)
    return HttpResponse.json(newTask, { status: 201 })
  }),

  http.put('/api/tasks/:id', async ({ request, params }) => {
    const { id } = params
    const updateData = await request.json() as Partial<Task>
    
    const taskIndex = mockTasks.findIndex(task => task.id === id)
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      )
    }
    
    const updatedTask: Task = {
      ...mockTasks[taskIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }
    
    mockTasks[taskIndex] = updatedTask
    return HttpResponse.json(updatedTask)
  }),

  http.delete('/api/tasks/:id', async ({ params }) => {
    const { id } = params
    
    const taskIndex = mockTasks.findIndex(task => task.id === id)
    
    if (taskIndex === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      )
    }
    
    mockTasks.splice(taskIndex, 1)
    return HttpResponse.json({ message: 'Task deleted successfully' })
  }),
]
