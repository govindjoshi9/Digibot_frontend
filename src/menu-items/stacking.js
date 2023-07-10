// assets
import { IconKey, IconList, IconStack } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconList,
  IconStack
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const stacking = {
  id: 'stacking',
  title: 'Deposit',
  type: 'group',
  children: [
    {
      id: 'stackinglist',
      title: 'Deposit',
      type: 'item',
      url: '/deposit',
      icon: icons.IconStack,
      breadcrumbs: false
    },
    {
      id: 'stacking-summary',
      title: 'Deposit Summary',
      type: 'item',
      url: '/deposit-summary',
      icon: icons.IconList,
      breadcrumbs: false
    }
  ]
};

export default stacking;
