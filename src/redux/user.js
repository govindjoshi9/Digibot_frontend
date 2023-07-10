import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';
// ----------------------------------------------------------------------

let stakingHistory = [];
let stakingPost = [];
let withDrawHistory = [];
let teams = [];
let refBonus = [];
let stackingBonus = [];
let myRefferal = [];
let levelBonus = [];
let Withdraw = [];
const initializer = {
  stakingHistorySucess: false,
  stakingSucess: false,
  stakingBonusSucess: false,
  refBonusSucess: false,
  withdrawHisSuccess: false,
  teamListSucess: false,
  RefBonusSucess: false,
  myRefferalSucess: false,
  levelBonusSucess: false,
  WithdrawSucess: false
};

const initialState = {
  isLoading: false,
  error: false,
  users: [],
  stakingHistory
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getStackingSuccess(state, action) {
      state.isLoading = false;
      state.stakingHistory = action.payload;
    },

    // GET MYTEAMS
    getTeamsSuccess(state, action) {
      state.isLoading = false;
      state.output = action.payload;
    }
  }
});

const baseUrl = process.env.PORT || 'https://backend.royalmagic.live/api';

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export async function getTeams() {
  if (!initializer.teamListSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Team/MyTeam`, {
        headers
      });
      initializer.teamListSucess = true;
      teams = response.data;
    } catch (error) {
      console.log(error);
      initializer.teamListSucess = false;
    }
  }
  return teams;
}
// ----------------------------------------------------------------------
export async function getMyRefferal() {
  if (!initializer.myRefferalSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Team/MyReferral`, {
        headers
      });
      myRefferal = response.data;
      initializer.myRefferalSucess = true;
    } catch (error) {
      console.log(error);
      initializer.myRefferalSucess = false;
    }
  }
  return myRefferal;
}
// ----------------------------------------------------------------------
export async function getStakingBonus() {
  if (!initializer.stakingBonusSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Earning/StakingBonus`, {
        headers
      });
      initializer.stakingBonusSucess = true;
      stackingBonus = response.data;
    } catch (error) {
      console.log(error);
      initializer.stakingBonusSucess = false;
    }
  }
  return stackingBonus;
}
// ----------------------------------------------------------------------
export async function getLevelBonus() {
  if (!initializer.levelBonusSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Earning/levelbonus`, {
        headers
      });
      initializer.levelBonusSucess = true;
      levelBonus = response.data;
    } catch (error) {
      console.log(error);
      initializer.levelBonusSucess = false;
    }
  }
  return levelBonus;
}
// ----------------------------------------------------------------------
export async function getRefBonus() {
  if (!initializer.RefBonusSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Earning/ReferralBonus`, {
        headers
      });
      initializer.RefBonusSucess = true;
      refBonus = response.data;
    } catch (error) {
      console.log(error);
      initializer.RefBonusSucess = false;
    }
  }
  return refBonus;
}
// ----------------------------------------------------------------------
export async function getWithdrawHistory() {
  if (!initializer.withdrawHisSuccess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Withdraw/Summary`, {
        headers
      });
      console.log(response.data);
      initializer.withdrawHisSuccess = true;
      withDrawHistory = response.data;
    } catch (error) {
      console.log(error);
      initializer.withdrawHisSuccess = false;
    }
  }
  return withDrawHistory;
}
// ----------------------------------------------------------------------

export async function getStacking() {
  if (!initializer.stakingHistorySucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Referrer-Policy': 'unsafe-url'
      };
      const response = await axios.get(`${baseUrl}/Staking/Summary`, {
        headers
      });
      initializer.stakingHistorySucess = true;
      stakingHistory = response.data;
    } catch (error) {
      console.log(error);
      initializer.stakingHistorySucess = false;
    }
  }
  return stakingHistory;
}

// ----------------------------------------------------------------------
export async function postDesposit(values) {
  if (!initializer.stakingSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/Staking/`,
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: { wallerAddress: values.wallet, amount: values.staking, transactionHash: values.transactionHash }
      });
      initializer.stakingSucess = true;
      stakingPost = response;
    } catch (error) {
      console.log(error);
      initializer.stakingSucess = false;
      stakingPost = error;
    }
  }
  return stakingPost;
}
// ----------------------------------------------------------------------
export async function postWithdraw(values, withdrawWallet) {
  if (!initializer.WithdrawSucess) {
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/Withdraw/Request`,
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: { amount: values, address: withdrawWallet }
      });
      console.log(response);
      initializer.WithdrawSucess = true;
      Withdraw = response.data;
    } catch (error) {
      console.log(error);
      initializer.WithdrawSucess = false;
      Withdraw = error;
    }
  }
  return Withdraw;
}

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/all');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
