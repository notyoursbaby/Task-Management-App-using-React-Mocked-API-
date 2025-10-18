import { renderWithProviders, screen, fireEvent } from '../../test/test-utils'
import TaskFilters from '../TaskFilters'

describe('TaskFilters', () => {
  it('renders and toggles active filter', () => {
    const onChange = vi.fn()
    renderWithProviders(
      <TaskFilters statusFilter="all" onStatusFilterChange={onChange} taskCount={0} />
    )
    fireEvent.click(screen.getByText(/Pending/i))
    expect(onChange).toHaveBeenCalledWith('pending')
  })
})
