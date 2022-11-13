import { render, screen } from '@testing-library/react'
import App from './App'
import { test, expect } from 'jest'
import React from 'react'

test('renders app', () => {
  render(<App />)
  const linkElement = screen.getByText(/Jaime Labrador TEST/i)
  expect(linkElement).toBeInTheDocument()
})
