// This test is only here to make sure that the page is rendered without crashing.
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '@/app/_components/Footer/Footer';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Footer />);

    const textInHeaderComponent = screen.getByText(
      /politique de confidentialité/i
    );

    expect(textInHeaderComponent).toBeInTheDocument();
  });
});
