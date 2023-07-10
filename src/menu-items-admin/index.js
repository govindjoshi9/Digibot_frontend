import dashboard from './dashboard';

import utilities from './utilities';

import investment from './investment';
import withdraw from './withdraw';
import Bot from './Bot.js';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [dashboard, utilities, Bot, investment, withdraw]
};

export default menuItems;
