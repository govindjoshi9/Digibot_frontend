import dashboard from './dashboard';

import utilities from './utilities';

import investment from './investment';
import withdraw from './withdraw';
import rewards from './rewards.js';
import setting from './setting.js';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, utilities, rewards, setting, investment, withdraw]
};

export default menuItems;
