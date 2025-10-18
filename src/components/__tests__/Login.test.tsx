import { renderWithProviders, screen, fireEvent, waitFor } from '../../test/test-utils'
import Login from '../Login'

describe('Login', () => {
  it('renders and allows typing credentials', () => {
    renderWithProviders(<Login />)
    const userInput = screen.getByLabelText(/username/i)
    const passInput = screen.getByLabelText(/password/i)
    fireEvent.change(userInput, { target: { value: 'test' } })
    fireEvent.change(passInput, { target: { value: 'test123' } })
    expect(userInput).toHaveValue('test')
    expect(passInput).toHaveValue('test123')
  })
})
