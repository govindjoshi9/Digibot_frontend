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

const investment = {
  id: 'investment',
  type: 'group',
  title: 'Investment',
  icon: icons.IconReportMoney,
  children: [
    {
      id: 'investmentSummary',
      title: 'Invesment Summary',
      type: 'item',
      url: 'admin/invesment/summary',
      breadcrumbs: false
    }
  ]
};

export default investment;
