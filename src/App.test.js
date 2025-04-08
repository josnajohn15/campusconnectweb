import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Campus Connect homepage', () => {
  render(<App />);
  const heading = screen.getByText(/Campus Connect/i);
  expect(heading).toBeInTheDocument();
});



