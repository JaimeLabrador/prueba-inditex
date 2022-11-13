import { render, screen } from '@testing-library/react'
import { it, beforeEach, expect, describe } from 'jest'
import React from 'react'
import Home from './Home'

describe('Home page tests', () => {
  beforeEach(() => {
    render(<Home/>)
  })
  it('is rendering', () => {
    const element = screen.getByPlaceholderText(/Search/i)
    expect(element).toBeInDocument()
  })
})
