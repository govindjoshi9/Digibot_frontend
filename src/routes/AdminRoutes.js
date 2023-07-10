import { lazy } from 'react';

// project imports
import AdminMainLayout from 'layout/AdminMainLayout';
import Loadable from 'ui-component/Loadable';
import AdminAuthGuard from '../guards/AdminAuthGuard';
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const Investment = Loadable(lazy(() => import('views/investment/index')));
const InvestmentSummary = Loadable(lazy(() => import('views/investment/InvestmentSummary')));
const ActiveUser = Loadable(lazy(() => import('views/user/ActiveUser')));
const InactiveUser = Loadable(lazy(() => import('views/user/InactiveUser')));
const BlockUser = Loadable(lazy(() => import('views/user/BlockUser')));
const SearchUser = Loadable(lazy(() => import('views/user/SearchUser')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const DailyBonus = Loadable(lazy(() => import('views/dashboard/DailyIncomeSet')));
const WithdrawRequest = Loadable(lazy(() => import('views/withdraw/withdrawRequest')));
const ConfirmWithdrawRequest = Loadable(lazy(() => import('views/withdraw/ConfirmWithRequest')));
const Withdraw = Loadable(lazy(() => import('views/withdraw/WithdrawHistory')));
// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default/AdminDashboard')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const Logout = Loadable(lazy(() => import('views/logout/adminLogout')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AdminAuthGuard>
      <AdminMainLayout />
    </AdminAuthGuard>
  ),
  children: [
    {
      path: '/admin',
      element: <DashboardDefault />
    },
    {
      path: '/admin/dashboard',
      element: <DashboardDefault />
    },
    {
      path: '/admin/set-daily-bonus',
      element: <DailyBonus />
    },
    {
      path: 'admin/user',
      children: [
        {
          path: 'active',
          element: <ActiveUser />
        },
        {
          path: 'blocked',
          element: <BlockUser />
        },
        {
          path: 'inactive',
          element: <InactiveUser />
        },
        {
          path: 'search-user',
          element: <SearchUser />
        }
      ]
    },
    {
      path: 'admin/invesment',
      children: [
        {
          path: '/admin/invesment',
          element: <Investment />
        },
        {
          path: 'summary',
          element: <InvestmentSummary />
        }
      ]
    },
    {
      path: 'admin/withdraw',
      children: [
        {
          path: 'list',
          element: <Withdraw />
        },
        {
          path: 'request',
          element: <WithdrawRequest />
        },
        {
          path: 'confirm',
          element: <ConfirmWithdrawRequest />
        }
      ]
    },
    {
      path: 'admin/util',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'admin/utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'admin/utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'admin/icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'admin/icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'admin/sample-page',
      element: <SamplePage />
    },
    {
      path: 'admin/logout',
      element: <Logout />
    }
  ]
};

export default MainRoutes;
