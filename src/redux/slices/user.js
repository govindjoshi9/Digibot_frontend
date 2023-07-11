import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';
import axios1 from '../../utils/axios';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  posts: [],
  users: [],
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  cards: null,
  addressBook: [],
  invoices: [],
  minting: [],
  notifications: null
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
      state.userList = deleteUser;
    },

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },

    // GET FRIENDS
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload;
    },

    // GET GALLERY
    getGallerySuccess(state, action) {
      state.isLoading = false;
      state.gallery = action.payload;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET CARDS
    getCardsSuccess(state, action) {
      state.isLoading = false;
      state.cards = action.payload;
    },

    // GET ADDRESS BOOK
    getAddressBookSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = action.payload;
    },

    // GET INVOICES
    getInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },
    // GET MYTEAMS
    getTeamsSuccess(state, action) {
      state.isLoading = false;
      state.output = action.payload;
    },
    // GET minting bonus
    getMintingBonusSucess(state, action) {
      state.isLoading = false;
      state.minting = action.payload;
    },
    getLevelBonusSucess(state, action) {
      state.isLoading = false;
      state.levelBonus = action.payload;
    },
    getCapitalBonusSucess(state, action) {
      state.isLoading = false;
      state.capitalBonus = action.payload;
    },
    getStoneBonusSucess(state, action) {
      state.isLoading = false;
      state.stoneBonus = action.payload;
    },
    getRewardBonusSucess(state, action) {
      state.isLoading = false;
      state.rewardBonus = action.payload;
    },
    getAnnumBonusSucess(state, action) {
      state.isLoading = false;
      state.annumBonus = action.payload;
    },
    getMonthlyPayrollBonusSucess(state, action) {
      state.isLoading = false;
      state.monthlyPayrollBonus = action.payload;
    },
    // GET minting bonus
    getRefBonusSucess(state, action) {
      state.isLoading = false;
      state.refbonus = action.payload;
    },
    getChangePassword(state, action) {
      state.isLoading = false;
      state.changePassStatus = action.payload;
    },
    getTopPerformersSuccess(state, action) {
      state.isLoading = false;
      state.topPerformance = action.payload;
    },
    getMintingSummarySucess(state, action) {
      state.isLoading = false;
      state.mintingSummary = action.payload;
    },
    getNextrankSuccess(state, action) {
      state.isLoading = false;
      state.nextrank = action.payload;
    },
    postDepositeSuccess(state, action) {
      state.isLoading = false;
      state.deposite = action.payload;
    },
    getTopAchiverSuccess(state, action) {
      state.isLoading = false;
      state.topAchivers = action.payload;
    }
  }
});

const baseUrl = process.env.PORT || 'https://xpic.live/api/v1/api';

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getTeams() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Team/MyTeam`, {
        headers
      });
      dispatch(slice.actions.getTeamsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function changePassword(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');

      const response = await axios({
        method: 'put',
        url: `${baseUrl}/Account/changePassword`,
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: values
      });
      dispatch(slice.actions.getChangePassword(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getProfile() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/DashBoard/Home`, {
        headers
      });
      localStorage.setItem('member_user_id', response.data.row.member_user_id);
      dispatch(slice.actions.getProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getNextRank() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/DashBoard/nextrank`, {
        headers
      });

      dispatch(slice.actions.getNextrankSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/posts');
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollowers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/social/followers');
      dispatch(slice.actions.getFollowersSuccess(response.data.followers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFriends() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/social/friends');
      dispatch(slice.actions.getFriendsSuccess(response.data.friends));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

// export function getGallery() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios1.get('/api/user/social/gallery');
//       console.log(response);
//       dispatch(slice.actions.getGallerySuccess(response.data.gallery));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

export function getGallery() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response2 = await axios1.get('/api/user/social/gallery');
      console.log(response2.data);
      const response = await axios.get(`${baseUrl}/Account/userNft`, {
        headers
      });
      console.log(response.data.image);
      // dispatch(slice.actions.getGallerySuccess(response.data.gallery));
      dispatch(slice.actions.getGallerySuccess(response.data.image));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Team/MyTeam`, {
        headers
      });
      console.log(response.data);
      dispatch(slice.actions.getUserListSuccess(response.data.output));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMintingBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/MintingBonus`, {
        headers
      });
      dispatch(slice.actions.getMintingBonusSucess(response.data.output));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getRefBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/ReferralBonus`, {
        headers
      });
      dispatch(slice.actions.getRefBonusSucess(response.data.output));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function mintingSummaryapi() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Minting/MintingSummary`, {
        headers
      });
      dispatch(slice.actions.getMintingSummarySucess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLevelBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/LevelBonus`, {
        headers
      });
      dispatch(slice.actions.getLevelBonusSucess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCapitalBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/CapitalBonus`, {
        headers
      });
      dispatch(slice.actions.getCapitalBonusSucess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getStoneBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/StoneBonus`, {
        headers
      });

      dispatch(slice.actions.getStoneBonusSucess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getRewardBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/RewardBonus`, {
        headers
      });
      dispatch(slice.actions.getRewardBonusSucess(response.data.output));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAnnumBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/AnnumBonus`, {
        headers
      });
      dispatch(slice.actions.getAnnumBonusSucess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getMonthlyPayrollBonus() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/Earning/MonthlyBonus`, {
        headers
      });
      dispatch(slice.actions.getMonthlyPayrollBonusSucess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCards() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/account/cards');
      dispatch(slice.actions.getCardsSuccess(response.data.cards));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAddressBook() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/account/address-book');
      dispatch(slice.actions.getAddressBookSuccess(response.data.addressBook));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInvoices() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/account/invoices');
      dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNotifications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios1.get('/api/user/account/notifications-settings');
      dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
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

export function getTopPerformers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/DashBoard/topPerformers`, {
        headers
      });

      dispatch(slice.actions.getTopPerformersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
///--------------------------------------------------------------------------

export function getTopAchivers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(`${baseUrl}/DashBoard/topAchivers`, {
        headers
      });
      dispatch(slice.actions.getTopAchiverSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function postDeposite(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/Marketplace/deposite`,
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: values
      });
      dispatch(slice.actions.postDepositeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function refer(values) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/Dashboard/refer`,
        headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: values
      });
      dispatch(slice.actions.postDepositeSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
