import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { LoginPage } from './pages/LoginPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { PublicLayout } from './layout/PublicLayout';
import { AuthenticatedLayout } from './layout/PrivateLayout';
import { DashboardPage } from './components/dashboard/dashboardPage';

// Create a root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Public routes
const publicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PublicLayout,
});

const loginRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => publicRoute,
  path: '/register',
  component: RegistrationPage,
});

// const dashboardRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/dashboard',
//   component: DashboardPage,
//   beforeLoad: () => {
//     if (!isAuthenticated()) {
//       throw redirect({ to: '/login' });
//     }
//   },
// });

// Authenticated routes
const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/in',
  component: AuthenticatedLayout,
  beforeLoad: () => {
    // if (!isAuthenticated()) {
    //   throw redirect({ to: '/login' }); // Redirect to login if not authenticated
    // }
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/',
  component: DashboardPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  publicRoute.addChildren([loginRoute, registerRoute]),
  authenticatedRoute.addChildren([dashboardRoute]),
]);

// Create the router
export const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
