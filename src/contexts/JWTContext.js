import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';
import { setSession } from '../utils/jwt';
// ----------------------------------------------------------------------

const baseUrl = process.env.PORT || 'https://backend.royalmagic.live/api';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  LOGIN: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
  confirmOptPassword: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          setSession(accessToken);
          const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Referrer-Policy': 'unsafe-url'
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
          const { data } = response.data;
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: data
            }
          });
          console.log('initialized');
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }) => {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      email,
      password
    });
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

  const register = async ({ sponcerid, memberName, email, contactNumber, password, cpassword, member_name }) => {
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/Auth/register`,
      data: { sponcerid, memberName, email, contactNumber, password, cpassword, member_name }
    });
    console.log(response);
    return response.data;
  };

  const forgotPassword = async (values) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/auth/forgot-password`,
      headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      data: { email: values }
    });
    return response.data;
  };

  const changePassword = async (currentPassword, password, confimrPassword) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/Dashboard/changePassword`,
      headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      data: { oldPassword: currentPassword, newPassword: password, verifyPassword: confimrPassword }
    });
    return response.data;
  };
  const confirmOptPassword = async (otp, password, confirmPassword, email) => {
    console.log(otp, password, confirmPassword, email);
    const accessToken = window.localStorage.getItem('accessToken');
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/auth/confirm-otp`,
      headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      data: { token: otp, newPassword: password, verifyPassword: confirmPassword, email }
    });
    return response.data;
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  // const resetPassword = () => {};

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        changePassword,
        register,
        confirmOptPassword,
        forgotPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
