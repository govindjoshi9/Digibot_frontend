// assets
import { IconKey, IconZoomMoney, IconReportMoney } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconReportMoney,
  IconZoomMoney
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const earning = {
  id: 'earning',
  title: 'Earning',
  type: 'group',
  children: [
    {
      id: 'levelBonus',
      title: 'Level Bonus',
      type: 'item',
      url: '/bonus/level',
      icon: icons.IconReportMoney,
      breadcrumbs: false
    },
    {
      id: 'ref-bonus',
      title: 'Referral Bonus',
      type: 'item',
      url: '/bonus/referral',
      icon: icons.IconZoomMoney,
      breadcrumbs: false
    }
  ]
};

export default earning;
