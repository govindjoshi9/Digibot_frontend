import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import AdminGuestGuard from '../guards/AdminGuestGuard';
// login option 3 routing
const AdminLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/AdminLogin')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/admin/login',
      element: (
        <AdminGuestGuard>
          <AdminLogin />
        </AdminGuestGuard>
      )
    }
  ]
};

export default AuthenticationRoutes;
