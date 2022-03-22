import { render, screen } from '@testing-library/react';
import App from './App';

test('renders call to action text', () => {
    render(<App />);
    const callToAction = screen.getByText(/what was the day of the week for this date\?/i);
    expect(callToAction).toBeInTheDocument();
});

test('renders random date', () => {
    render(<App />);
    const guessDateElement = screen.getByTestId('date-to-guess');
    expect(guessDateElement).toBeInTheDocument();

    const date = guessDateElement.textContent;
    expect(date).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
});