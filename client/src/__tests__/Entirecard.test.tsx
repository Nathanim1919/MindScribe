import { Entriecard } from '../components/dashboard/Entriecard';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Entriecard Component', () => {
  async function clickButton(name: string) {
    const element = await screen.findByRole('button', { name });
    expect(element).toBeInTheDocument();
    await userEvent.click(element);
  }

  async function findByText(text: string) {
    const element = await screen.findByText(text);
    expect(element).toBeInTheDocument();
  }

  it('renders the title and content correctly', async () => {
    const entry = {
      id: 1,
      title: 'Title',
      content: 'Content',
      date: '2021-09-01',
      mood: 'Happy',
    };

    render(<Entriecard entries={entry} />);

    // Check if the title and content are rendered
    await findByText('Title');
    await findByText('Content');
    await findByText('2021-09-01');
    await findByText('Happy');
  });

  it('calls the correct function when the buttons are clicked', async () => {
    // Spy on the console.log function
    const consoleSpy = vi.spyOn(console, 'log');

    // Mock the entry data
    const entry = {
      id: 1,
      title: 'Title',
      content: 'Content',
      date: '2021-09-01',
      mood: 'Happy',
    };

    // Render the Entriecard component
    render(<Entriecard entries={entry} />);

    await clickButton('Delete');
    await clickButton('Edit');
    await clickButton('Like');

    // Check if the console.log function was called with the correct arguments and number of times
    expect(consoleSpy).toHaveBeenCalledWith('Delete button clicked');
    expect(consoleSpy).toHaveBeenCalledWith('Edit button clicked');
    expect(consoleSpy).toHaveBeenCalledWith('Like button clicked');
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
