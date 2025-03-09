import { render, screen } from '@testing-library/react';
import { Aipromptcard } from '../components/dashboard/Aipromptcard';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('Aipromptcard Component', () => {
  async function findByText(text: string) {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
  }

  async function clickButton(name: string) {
    const element = await screen.findByRole('button', { name });
    expect(element).toBeInTheDocument();
    await userEvent.click(element);
  }

  it('renders the title and buttom correctly', async () => {
    render(<Aipromptcard />);

    // Check if the title is rendered
    await findByText('Daily Writing Prompt');
    await findByText(
      'Write about a challenge you overcame and how it shaped you.',
    );

    // Check if the buttons are rendered
    await clickButton('Start Entry');
    await clickButton('Regenerate');
  });

  it('calls the correct function when the buttons are clicked', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<Aipromptcard />);

    await clickButton('Start Entry');
    await clickButton('Regenerate');

    expect(consoleSpy).toHaveBeenCalledTimes(2);

    expect(consoleSpy).toHaveBeenCalledWith('Start Entry button clicked');
    expect(consoleSpy).toHaveBeenCalledWith('Regenerate button clicked');
  });
});
