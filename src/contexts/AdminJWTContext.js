import { createContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';
import { setSession } from '../utils/adminjwt';
// ----------------------------------------------------------------------

const baseUrl = process.env.ADMINPORT || 'https://backend.royalmagic.live/api/admin';

const initialState = {
  isInitialized: false,
  isAdminAuthenticated: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAdminAuthenticated, user } = action.payload;
    return {
      ...state,
      isAdminAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAdminAuthenticated: true,
      user
    };
  },
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAdminAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAdminAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AdminAuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AdminAuthProvider.propTypes = {
  children: PropTypes.node
};

function AdminAuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('adminAccessToken');

        if (accessToken) {
          setSession(accessToken);
          const headers = {
            Authorization: `Bearer ${accessToken}`
          };
          const response = await axios.get(`${baseUrl}/dashboard`, {
            headers
          });
          // const response = {
          //   status: true,
          //   message: 'Dashboard data',
          //   data: {
          //     member_user_id: '4660264',
          //     member_name: 'JAYPATEL',
          //     sponcer_id: '5217560',
          //     sponcer_name: 'Jay',
          //     wallet_address: null,
          //     promoter_id: null,
          //     promoter_name: null,
          //     contact: '3456434565',
          //     email: 'user@royalmagic.com',
          //     status: 0,
          //     registration_date: '2023-05-25T05:22:20.000Z',
          //     member_status: 0,
          //     kyc_status: 0,
          //     topup_amount: 0,
          //     direct_member: 0,
          //     wallet_amount: 9800,
          //     checked: 0,
          //     withdrawal_amt: 200,
          //     block_status: 0,
          //     current_investment: 0,
          //     direct_business: 0,
          //     total_earning: 10000,
          //     isblock: 0,
          //     team_business: 0,
          //     expiry_date: null,
          //     team_member: 0,
          //     activation_date: null,
          //     profile_image: null,
          //     front_image: null,
          //     back_image: null,
          //     member_dob: null,
          //     address: null,
          //     pincod: 0,
          //     gender: null,
          //     country_code: 0,
          //     state: null,
          //     city: null,
          //     calTeamStatus: 0,
          //     updateWallet: 0
          //   }
          // };
          console.log(axios, baseUrl);
          const { user } = response.data;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAdminAuthenticated: true,
              user
            }
          });
          console.log('initialized');
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAdminAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAdminAuthenticated: false,
            user: null
          }
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }) => {
    const response = await axios.post(`${baseUrl}/login`, {
      username: email,
      password
    });
    console.log(response);
    // console.log(email, password);
    // const response = {
    //   status: true,
    //   message: 'Login successfully',
    //   token:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NjYwMjY0IiwiaWF0IjoxNjg3MjU3OTA2LCJleHAiOjE2ODcyNjE1MDZ9.V9BDDqR1CQlThRYKjZqxzvVue58Ua3L22tGV6Du5GSY',
    //   user: {
    //     member_user_id: '4660264',
    //     member_name: 'JAYPATEL',
    //     sponcer_id: '5217560',
    //     sponcer_name: 'Jay',
    //     wallet_address: null,
    //     promoter_id: null,
    //     promoter_name: null,
    //     contact: '3456434565',
    //     email: 'user@royalmagic.com',
    //     status: 0,
    //     registration_date: '2023-05-25T05:22:20.000Z',
    //     member_status: 0,
    //     kyc_status: 0,
    //     topup_amount: 0,
    //     direct_member: 0,
    //     wallet_amount: 9800,
    //     checked: 0,
    //     withdrawal_amt: 200,
    //     block_status: 0,
    //     current_investment: 0,
    //     direct_business: 0,
    //     total_earning: 10000,
    //     isblock: 0,
    //     team_business: 0,
    //     expiry_date: null,
    //     team_member: 0,
    //     activation_date: null,
    //     profile_image: null,
    //     front_image: null,
    //     back_image: null,
    //     member_dob: null,
    //     address: null,
    //     pincod: 0,
    //     gender: null,
    //     country_code: 0,
    //     state: null,
    //     city: null,
    //     calTeamStatus: 0,
    //     updateWallet: 0
    //   }
    // };
    const { token, user } = response.data;
    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  // const resetPassword = () => {};

  return (
    <AdminAuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        logout,
        login
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export { AdminAuthContext, AdminAuthProvider };
