// This test is only here to make sure that the page is rendered without crashing.
import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';
import '@testing-library/jest-dom';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);

    const textInHomeComponent = screen.getByText(/Hello/i);

    expect(textInHomeComponent).toBeInTheDocument();
  });
});
