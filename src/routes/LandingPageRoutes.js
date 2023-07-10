import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';

const Landing = Loadable(lazy(() => import('views/dashboard/landingPage')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '',
      element: <Landing />
    }
  ]
};

export default MainRoutes;
