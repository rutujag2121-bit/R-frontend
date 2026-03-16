import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import LoginPage from '../pages/LoginPage'
import SearchPage from '../pages/SearchPage'

// Mock axios globally
vi.mock('axios', () => ({
  default: {
    post: vi.fn().mockResolvedValue({
      data: { success: true, message: 'Login successful', user: 'admin' }
    }),
    get: vi.fn().mockResolvedValue({
      data: { query: 'test', results: [], message: 'Search results for: test' }
    })
  }
}))

describe('App', () => {
  it('renders the navbar', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByText(/SecureApp/i)).toBeTruthy()
  })
})

describe('LoginPage', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    expect(screen.getByTestId('username-input')).toBeTruthy()
    expect(screen.getByTestId('password-input')).toBeTruthy()
    expect(screen.getByTestId('login-btn')).toBeTruthy()
  })

  it('updates username input', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    const input = screen.getByTestId('username-input')
    fireEvent.change(input, { target: { value: 'admin' } })
    expect(input.value).toBe('admin')
  })

  it('updates password input', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )
    const input = screen.getByTestId('password-input')
    fireEvent.change(input, { target: { value: 'secret' } })
    expect(input.value).toBe('secret')
  })
})

describe('SearchPage', () => {
  it('renders search form', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    expect(screen.getByTestId('search-input')).toBeTruthy()
    expect(screen.getByTestId('search-btn')).toBeTruthy()
  })

  it('updates search query input', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'hello' } })
    expect(input.value).toBe('hello')
  })
})
