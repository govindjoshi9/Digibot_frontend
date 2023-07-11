// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/xPicUApp';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/Signup'),
  registerUnprotected: path(ROOTS_AUTH, '/Signup'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    mystone: path(ROOTS_DASHBOARD, '/mystone'),
    events: path(ROOTS_DASHBOARD, '/events')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  personal: {
    root: path(ROOTS_DASHBOARD, '/personal/payouts'),
    transactions: path(ROOTS_DASHBOARD, '/personal/transactions'),
    activation: path(ROOTS_DASHBOARD, '/personal/activation'),
    support: path(ROOTS_DASHBOARD, '/personal/support')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    minting: path(ROOTS_DASHBOARD, '/user/minting'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  bonus: {
    root: path(ROOTS_DASHBOARD, '/bonus'),
    minting: path(ROOTS_DASHBOARD, '/bonus/minting'),
    referral: path(ROOTS_DASHBOARD, '/bonus/referral'),
    level: path(ROOTS_DASHBOARD, '/bonus/level'),
    capital: path(ROOTS_DASHBOARD, '/bonus/capital'),
    stone: path(ROOTS_DASHBOARD, '/bonus/stone'),
    reward: path(ROOTS_DASHBOARD, '/bonus/reward'),
    annum: path(ROOTS_DASHBOARD, '/bonus/annum'),
    monthlypayroll: path(ROOTS_DASHBOARD, '/bonus/monthlypayroll')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  nftMarket: {
    root: path(ROOTS_DASHBOARD, '/nft-marketplace'),
    shop: path(ROOTS_DASHBOARD, '/nft-marketplace/shop'),
    product: path(ROOTS_DASHBOARD, '/nft-marketplace/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/nft-marketplace/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/nft-marketplace/list'),
    newProduct: path(ROOTS_DASHBOARD, '/nft-marketplace/product/new'),
    editById: path(ROOTS_DASHBOARD, '/nft-marketplace/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/nft-marketplace/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/nft-marketplace/invoice')
  },
  marketplace: {
    root: path(ROOTS_DASHBOARD, '/maketplace'),
    shop: path(ROOTS_DASHBOARD, '/maketplace/shop'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  payout: {
    root: path(ROOTS_DASHBOARD, '/payout/shop'),
    minting: path(ROOTS_DASHBOARD, '/payout/minting'),
    referral: path(ROOTS_DASHBOARD, '/payout/referral'),
    capital: path(ROOTS_DASHBOARD, '/payout/capital'),
    month_pay: path(ROOTS_DASHBOARD, '/payout/month_pay'),
    stone: path(ROOTS_DASHBOARD, '/payout/stone'),
    reload: path(ROOTS_DASHBOARD, '/payout/reload'),
    reward: path(ROOTS_DASHBOARD, '/payout/reward'),
    summary: path(ROOTS_DASHBOARD, '/payout/summary')
  },
  promoMaterials: {
    root: path(ROOTS_DASHBOARD, '/promo-materials')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  events: { root: path(ROOTS_DASHBOARD, '/events') }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
