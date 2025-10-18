export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  tasks: TasksState;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  id: string;
}
