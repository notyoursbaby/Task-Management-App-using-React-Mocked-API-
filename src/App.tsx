import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store/store'
import { setUser } from './store/slices/authSlice'
import { fetchTasks } from './store/slices/tasksSlice'
import Login from './components/Login.tsx'
import Dashboard from './components/Dashboard.tsx'
import Layout from './components/Layout.tsx'
import LoadingSpinner from './components/LoadingSpinner.tsx'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, isLoading, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Ensure initial theme is applied globally (also for unauthenticated routes)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const stored = localStorage.getItem('darkMode')
    const shouldDark = stored ? stored === 'true' : prefersDark
    if (shouldDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Load user from localStorage on app start
    if (isAuthenticated && !user) {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData)
          dispatch(setUser(parsedUser))
        } catch (error) {
          console.error('Failed to parse user data from localStorage')
        }
      }
    }

    // Fetch tasks if authenticated
    if (isAuthenticated) {
      dispatch(fetchTasks())
    }
  }, [dispatch, isAuthenticated, user])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Layout>
                <Dashboard />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />
          }
        />
      </Routes>
    </div>
  )
}

export default App
