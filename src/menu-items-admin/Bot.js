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

const Bot = {
  id: 'utilities',
  type: 'group',
  title: 'Bot Typs',
  children: [
    {
      id: 'flexible-bot',
      title: 'Flexible Bot',
      type: 'item',
      url: 'admin/user/active',
      breadcrumbs: false
    },
    {
      id: 'flexible-pro-bot',
      title: 'Flexible Pro Bot',
      type: 'item',
      url: 'admin/user/active',
      breadcrumbs: false
    },
    {
      id: 'medium-bot',
      title: 'Medium Bot',
      type: 'item',
      url: 'admin/user/active',
      breadcrumbs: false
    },
    {
      id: 'premium-bot',
      title: 'Premium Bot',
      type: 'item',
      url: 'admin/user/active',
      breadcrumbs: false
    }
  ]
};

export default Bot;
