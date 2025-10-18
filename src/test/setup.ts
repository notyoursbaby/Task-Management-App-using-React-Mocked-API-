import '@testing-library/jest-dom'

// Silence MSW console warnings during tests if any
const originalError = console.error
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = String(args[0] ?? '')
    if (message.includes('[MSW]')) return
    originalError(...args)
  }
})

afterAll(() => {
  console.error = originalError
})
