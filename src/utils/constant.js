const BASE_URL = 'http://15.206.66.148:8080/api';

export const API_ROUTES = {
  GET_ACTIVE_USER: BASE_URL + '/admin/activeUser',
  BLOCKER_USER: BASE_URL + '/admin/blockedUser',
  SUMMARY: BASE_URL + '/investment/summary',

  WITHDRAW_REQUEST: BASE_URL + '/withdraw/withdrawRequest',
  WITHDRAW_SUMMARY: BASE_URL + '/withdraw/withdrawSummary'
};
