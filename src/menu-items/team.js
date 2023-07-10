// assets
import { IconKey, IconUsers } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const team = {
  id: 'team',
  title: 'Referrals',
  type: 'group',
  children: [
    {
      id: 'myref',
      title: 'My Referrals',
      type: 'item',
      url: '/team/my-referrals',
      icon: icons.IconReportMoney,
      breadcrumbs: false
    }
  ]
};

export default team;
