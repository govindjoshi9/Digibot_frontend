import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from '../guards/AuthGuard';
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Landing = Loadable(lazy(() => import('views/dashboard/landingPage')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

const ReferralBonus = Loadable(lazy(() => import('views/earning/ReferralBonus')));
const LevelBonus = Loadable(lazy(() => import('views/earning/LevelBonus')));
const Withdraw = Loadable(lazy(() => import('views/payout/Withdraw')));
const Withdrawhistory = Loadable(lazy(() => import('views/payout/Withdrawhistory')));
const Stacking = Loadable(lazy(() => import('views/stacking/Index')));
const Myreferrals = Loadable(lazy(() => import('views/team/Myreferrals')));
const Myteam = Loadable(lazy(() => import('views/team/Myteam')));
const StackingSummary = Loadable(lazy(() => import('views/stacking/StackingSummary')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const ChangePassword = Loadable(lazy(() => import('views/pages/authentication/authentication/ChangePassword')));
const Logout = Loadable(lazy(() => import('views/logout')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: 'dashboard',
      element: <DashboardDefault />
    },
    {
      path: '',
      element: <Landing />
    },
    {
      path: 'deposit',
      element: <Stacking />
    },
    {
      path: 'deposit-summary',
      element: <StackingSummary />
    },
    {
      path: 'team',
      children: [
        {
          path: 'my-referrals',
          element: <Myreferrals />
        },
        {
          path: 'my-team',
          element: <Myteam />
        }
      ]
    },
    {
      path: 'bonus',
      children: [
        {
          path: 'level',
          element: <LevelBonus />
        },
        {
          path: 'referral',
          element: <ReferralBonus />
        }
      ]
    },
    {
      path: 'withdraw',
      element: <Withdraw />
    },
    {
      path: 'withdraw',
      children: [
        {
          path: 'history',
          element: <Withdrawhistory />
        }
      ]
    },
    {
      path: 'util',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: '/logout',
      element: <Logout />
    },
    {
      path: '/change-password',
      element: <ChangePassword />
    }
  ]
};

export default MainRoutes;
