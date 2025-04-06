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
import { Editor } from './components/EditorSpace/Editor';
import { Board } from './components/dashboard/board';
import { RecentEntries } from './components/dashboard/RecentEntries';
import { EmptyCollectionBoard } from './components/dashboard/EmptyCollection';
import { Profile } from './components/dashboard/Profile';
import { ProfileSkeleton } from './components/LoadingSkeletons/UserProfilePageSkeleton';
import { PreferenceSetupFlow } from './components/PreferenceSetupFlow';

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


const walkThrough = createRoute({
  getParentRoute: () => rootRoute,
  path: '/walkthrough',
  component:PreferenceSetupFlow
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
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
  path: '/home',
  component: DashboardPage,
});

const BoardRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: Board, // Board will be rendered at /in
});

const EditorRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/new',
  component: Editor,
  staticData: {
    hideHeader: true,
    hideSidebar: true,
  }
});


const AllEntriesPage = createRoute({
  getParentRoute: () => dashboardRoute,
  path:'/entries',
  component: RecentEntries
})


const ProfilePage = createRoute({
  getParentRoute: () => dashboardRoute,
  path:'/profile',
  component: Profile
  // component:ProfileSkeleton
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  registerRoute,
  loginRoute,
  walkThrough,
  publicRoute,
  authenticatedRoute.addChildren([
    EditorRoute,
    dashboardRoute.addChildren([BoardRoute, AllEntriesPage, ProfilePage]),
  ]),
]);

// Create the router
export const router = createRouter({ routeTree });


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
