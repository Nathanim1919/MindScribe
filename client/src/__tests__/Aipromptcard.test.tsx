import { render, screen } from '@testing-library/react';
import { Aipromptcard } from '../components/dashboard/Aipromptcard';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Aipromptcard Component', () => {
  it('renders the title and buttom correctly', () => {
    render(<Aipromptcard />);

    // Check if the title is rendered
    expect(screen.getByText('Daily Writing Prompt')).toBeInTheDocument();

    // Check if the buttons are rendered
    const NewEntryBtn = screen.getByRole('button', { name: 'Start Entry' });
    const RegenerateBtn = screen.getByRole('button', { name: 'Regenerate' });

    expect(NewEntryBtn).toBeInTheDocument();
    expect(RegenerateBtn).toBeInTheDocument();
  });

  it('calls the correct function when the buttons are clicked', async () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Aipromptcard/>);


    const startEntryBtn = screen.getByRole('button', {name:"Start Entry"});
    const regenerateBtn = screen.getByRole('button', {name:"Regenerate"});


    await userEvent.click(startEntryBtn);
    await userEvent.click(regenerateBtn);

    expect(consoleSpy).toHaveBeenCalledTimes(2);

    expect(consoleSpy).toHaveBeenCalledWith('Start Entry button clicked');
    expect(consoleSpy).toHaveBeenCalledWith('Regenerate button clicked');
  });
});
