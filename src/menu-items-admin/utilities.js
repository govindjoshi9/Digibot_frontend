// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconUser, IconReportMoney } from '@tabler/icons';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconUser,
  IconReportMoney
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  type: 'group',
  title: 'User List',
  children: [
    {
      id: 'tabler-icons',
      title: 'Active User List',
      type: 'item',
      url: 'admin/user/active',
      icon: icons.IconCash
    },
    {
      id: 'blocked-user',
      title: 'Blocked User List',
      type: 'item',
      url: 'admin/user/blocked',
      icon: icons.IconCash
    },
    {
      id: 'inactive-user',
      title: 'Inative User',
      type: 'item',
      url: 'admin/user/inactive',
      icon: icons.IconCash
    },
    {
      id: 'search-user',
      title: 'Search User',
      type: 'item',
      url: 'admin/user/search-user',
      breadcrumbs: false
    }
  ]
};

export default utilities;
