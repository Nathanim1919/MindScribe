// sidebar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

// Import your components and sidebar element definitions
import { Sidebar } from '../components/Sidebar';
import { TopsidebarElements } from '../components/sideBar/sideBarElements';

// Import ThemeContext and its Theme type (assuming Theme is defined as 'light' | 'dark')
import ThemeContext, { Theme } from '../contexts/ThemeContext';

// Import router functions from @tanstack/react-router
import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';

// Helper: Create a test router that renders the passed component as the route element.
const renderWithProviders = (
  ui: React.ReactNode,
  { theme = 'light' as Theme, setTheme = vi.fn() } = {
    theme: 'light' as Theme,
    setTheme: vi.fn(),
  },
) => {
  // Create a minimal route tree for testing:
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });
  const testRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    // Render the UI passed to the helper.
    component: () => <>{ui}</>,
  });
  const routeTree = rootRoute.addChildren([testRoute]);
  const testRouter = createRouter({ routeTree });

  return render(
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* Note: RouterProvider does not accept children, so our route tree defines what is rendered */}
      <RouterProvider router={testRouter} />
    </ThemeContext.Provider>,
  );
};

describe('Sidebar Component', () => {
  it('renders the sidebar with the correct structure', () => {
    renderWithProviders(<Sidebar />);
    // Verify that the <nav> element (with role="navigation") exists.
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    // There should be two <ul> elements (one for top elements, one for bottom).
    expect(screen.getAllByRole('list')).toHaveLength(1);
  });

  it('renders the correct number of sidebar elements', () => {
    renderWithProviders(<Sidebar />);
    const expectedCount = TopsidebarElements.length;
    // SidebarElement renders as <li> items.
    expect(screen.getAllByRole('listitem')).toHaveLength(expectedCount);
  });

  it('renders sidebar links for elements with a redirect', () => {
    renderWithProviders(<Sidebar />);
    // Elements with a "redirectTo" should render as links. For example, check that a link with the Dashboard title exists.
    const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
  });
});
