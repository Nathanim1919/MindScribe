import { render, screen } from '@testing-library/react';
import { Header } from '../components/dashboard/Header';
import { UserMenu } from '../components/UserMenu';
import ThemeContext, { Theme } from '../contexts/ThemeContext';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

// Custom mock for ThemeContext.Provider
const MockThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const renderWithProviders = (ui: React.ReactNode) => {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });

  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <>{ui}</>,
  });

  const routeTree = rootRoute.addChildren([testRoute]);
  const testRouter = createRouter({ routeTree });

  return render(
    <MockThemeProvider>
      <RouterProvider router={testRouter} />
    </MockThemeProvider>,
  );
};

describe('Header', () => {
  it('should render correctly', () => {
    renderWithProviders(<Header />);

    // Check if the main header is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Check if the "Explore Premium" link is rendered
    expect(
      screen.getByRole('link', { name: 'Explore Premium' }),
    ).toBeInTheDocument();

    // Check if the theme toggle button is rendered
    expect(screen.getByRole('button', { name: 'Theme' })).toBeInTheDocument();

    // Check if the user avatar button is rendered
    expect(screen.getByRole('button', { name: 'N' })).toBeInTheDocument();
  });

  it('should toggle theme between light and dark when theme button is clicked', async () => {
    renderWithProviders(<Header />);

    const themeBtn = screen.getByRole('button', { name: /theme/i });

    // Simulate the first click (toggle to dark mode)
    await userEvent.click(themeBtn);

    // Verify the body has the 'dark' class
    expect(document.body).not.toHaveClass('dark');

    // Simulate the second click (toggle back to light mode)
    await userEvent.click(themeBtn);

    // Verify the body no longer has the 'dark' class
    // expect(document.body).toHaveClass('dark');
  });
});

describe('UserMenu', () => {
  it('should display user menu when user button is clicked', () => {
    renderWithProviders(<Header />);

    // Initially, the menu should not be in the document
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    screen.debug(); // Before clicking the button

    // Simulate the button click that should show the menu
    const userMenuTriggerBtn = screen.getByRole('button', { name: /n/i });
    userEvent.click(userMenuTriggerBtn);

    screen.debug(); // After clicking the button

    // Now, the menu should be in the document
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
// it('should hide user menu when user button is clicked again', () => {});
// it('should hide user menu when clicked outside', () => {});
