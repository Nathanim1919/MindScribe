import { Entriecard } from '../components/dashboard/Entriecard';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Entriecard Component', () => {
  it('renders the title and content correctly', () => {
    const entry = {
      id: 1,
      title: 'Title',
      content: 'Content',
      date: '2021-09-01',
      mood: 'Happy',
    };

    render(<Entriecard entries={entry} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('2021-09-01')).toBeInTheDocument();
    expect(screen.getByText('Happy')).toBeInTheDocument();
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

    // Get the buttons using their aria-label attributes
    const deleteBtn = screen.getByRole('button', { name: 'Delete' });
    const editBtn = screen.getByRole('button', { name: 'Edit' });
    const likeBtn = screen.getByRole('button', { name: 'Like' });

    // Click the buttons
    await userEvent.click(deleteBtn);
    await userEvent.click(editBtn);
    await userEvent.click(likeBtn);

    // Check if the console.log function was called with the correct arguments and number of times
    expect(consoleSpy).toHaveBeenCalledWith('Delete button clicked');
    expect(consoleSpy).toHaveBeenCalledWith('Edit button clicked');
    expect(consoleSpy).toHaveBeenCalledWith('Like button clicked');
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
