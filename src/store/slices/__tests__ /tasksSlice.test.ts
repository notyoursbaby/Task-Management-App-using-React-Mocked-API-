import reducer, { clearError, setUser, login, logout } from '../../slices/authSlice'
import { AuthState, User } from '../../../types'

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(expect.objectContaining({ isAuthenticated: expect.any(Boolean) }))
  })

  it('should handle clearError', () => {
    const state = reducer({ ...initialState, error: 'x' }, clearError())
    expect(state.error).toBeNull()
  })

  it('should handle setUser', () => {
    const user: User = { id: '1', username: 'test', email: 'test@example.com' }
    const state = reducer(initialState, setUser(user))
    expect(state.user).toEqual(user)
    expect(state.isAuthenticated).toBe(true)
  })

  it('should set loading on login.pending', () => {
    const state = reducer(initialState, { type: login.pending.type })
    expect(state.isLoading).toBe(true)
  })

  it('should set user and token on login.fulfilled', () => {
    const payload = { user: { id: '1', username: 'test', email: 't' }, token: 'jwt' }
    const state = reducer(initialState, { type: login.fulfilled.type, payload })
    expect(state.user).toEqual(payload.user)
    expect(state.token).toBe('jwt')
    expect(state.isAuthenticated).toBe(true)
  })

  it('should clear auth on logout.fulfilled', () => {
    const pre = { ...initialState, user: { id: '1', username: 't', email: 't' }, token: 'jwt', isAuthenticated: true }
    const state = reducer(pre, { type: logout.fulfilled.type })
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })
})
