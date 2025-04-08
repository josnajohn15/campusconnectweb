import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';

// Needed for test environment
global.TextEncoder = require('util').TextEncoder;

jest.mock('axios');

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Clear any leftover tokens
  });

  test('renders input fields', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  test('shows error if fields are empty', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.click(screen.getByText('Login'));
    expect(screen.getByText(/please fill in both/i)).toBeInTheDocument();
  });

  test('successful login stores token', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fake-token' } });

    render(<MemoryRouter><Login /></MemoryRouter>);

    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'admin' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '1234' } });
    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake-token');
    });
  });
});
