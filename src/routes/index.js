import { useRoutes } from 'react-router-dom';

// routes
import AdminAthenticationRoutes from './AdminAthenticationRoutes';
import AdminRoutes from './AdminRoutes';


// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([ AdminRoutes, AdminAthenticationRoutes]);
}
