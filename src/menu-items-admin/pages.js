// assets
import { IconKey, IconLogout } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconLogout
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'pages',
  title: 'user',
  caption: 'User Authentication',
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Login',
          type: 'item',
          url: '/auth/login/',
          target: true
        },
        {
          id: 'register3',
          title: 'Register',
          type: 'item',
          url: '/auth/register',
          target: true
        }
      ]
    },
    {
      id: 'logout',
      title: 'Logout',
      type: 'item',
      url: '/logout',
      icon: icons.IconLogout
    }
  ]
};

export default pages;
