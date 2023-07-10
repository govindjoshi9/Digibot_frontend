import { API_ROUTES } from './constant';
import axios from 'axios';

// get method Api function ----------

// userlist fucntion calling  --------------*******#########

export async function getActiveUsers() {
  try {
    const URL = API_ROUTES.GET_ACTIVE_USER;

    const accessToken = window.localStorage.getItem('adminAccessToken');
     const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
    const response = await axios.get(URL, {
      headers
    });
    return [response.data, 'success'];
  } catch (e) {
    return [null, e];
  }
}

export async function getInactiveUsers() {
  try {
    const URL = API_ROUTES.BLOCKER_USER;
    const data = await axios.get(URL);
    console.log('hello backend getInactiveusers value:', data);
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

// investment api function -----

export async function summary() {
  try {
    const URL = API_ROUTES.SUMMARY;
    const data = await axios.get(URL);
    console.log('backend summaryinvestment data:', data);
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}

// withdrawRoutes api intergation -----********#########

export async function withdrawRequest() {
  try {
    const URL = API_ROUTES.WITHDRAW_REQUEST;
    const data = await axios.get(URL);
    console.log('data getforwithdraw request:', data);

    return [data, null];
  } catch (error) {
    return [null, e];
  }
}

// withdrawSummary api intergation ----######*******

export async function withdrawSummary() {
  try {
    const URL = API_ROUTES.WITHDRAW_SUMMARY;
    const data = await axios.get(URL);
    console.log('backend data to :', data);
    return [data, null];
  } catch (e) {
    return [null, e];
  }
}
