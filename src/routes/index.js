import { useRoutes } from 'react-router-dom';

// routes
import AdminAthenticationRoutes from './AdminAthenticationRoutes';
import AdminRoutes from './AdminRoutes';
import MainRoutes from './MainRoutes';
import LandingPageRoutes from './LandingPageRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([LandingPageRoutes, MainRoutes, AuthenticationRoutes, AdminRoutes, AdminAthenticationRoutes]);
}
