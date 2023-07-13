// assets
// import { IconTypography, IconPalette, IconShadow, IconWindmill, IconUser, IconReportMoney } from '@tabler/icons';

// constant
// const icons = {
//   IconTypography,
//   IconPalette,
//   IconShadow,
//   IconWindmill,
//   IconUser,
//   IconReportMoney
// };

// ==============================||BOT MENU ITEMS ||============================== //

const rewards = {
  id: 'utilities',
  type: 'group',
  title: 'Rewards',
  children: [
    {
      id: 'Monthly-rewards',
      title: 'Monthly Rewards',
      type: 'item',
      url: 'admin/rewards/Monthly',
      breadcrumbs: false
    },
    {
      id: 'Daily-rewards',
      title: 'Daily Rewards',
      type: 'item',
      url: 'admin/rewards/Dailyrewards',
      breadcrumbs: false
    }
  ]
};

export default rewards;
