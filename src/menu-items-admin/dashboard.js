// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: '/bonus',
      title: 'Daily Bonus',
      type: 'item',
      url: '/admin/set-daily-bonus',
      breadcrumbs: false
    }
  ]
};

export default dashboard;
