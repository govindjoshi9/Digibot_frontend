// assets
// import { IconDashboard } from '@tabler/icons';

// // constant
// const icons = { IconDashboard };

// ==============================|| Setting MENU ITEMS ||============================== //

const setting = {
  id: 'setting',
  title: 'Setting',
  type: 'group',
  children: [
    {
      id: '/bonus',
      title: 'Daily Bonus',
      type: 'item',
      url: '/admin/set-daily-bonus',
      breadcrumbs: false
    }
  ]
};

export default setting;
