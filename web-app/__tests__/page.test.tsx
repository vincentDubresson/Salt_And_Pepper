// This test is only here to make sure that the page is rendered without crashing.
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/components/Header/Header';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Header />);

    const textInHeaderComponent = screen.getByText(/Recettes/i);

    expect(textInHeaderComponent).toBeInTheDocument();
  });
});
