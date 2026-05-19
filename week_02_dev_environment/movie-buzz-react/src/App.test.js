import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Movie Buzz heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Movie Buzz/i);
  expect(headingElement).toBeInTheDocument();
});
