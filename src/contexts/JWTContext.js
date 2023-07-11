import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// utils
import axios from 'axios';
import { isValidToken, setSession } from '../utils/jwt';
// ----------------------------------------------------------------------

const baseUrl = process.env.PORT || 'http://localhost:8080/api';

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
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  deposite: () => Promise.resolve(),
  refer: () => Promise.resolve(),
  register: () => Promise.resolve()
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

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const headers = { Authorization: `Bearer ${accessToken}` };
          const response = await axios.get(`${baseUrl}/Account/MyProfile`, {
            headers
          });
          const { user } = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          });
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

  const login = async (userId, password) => {
    // const response = await axios.post(`${baseUrl}/Auth/Signin`, {
    //   userId,
    //   password
    // });
    console.log(userId, password);
    const response = {
      data: {
        status: true,
        message: 'Login successfully',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Nzc0MjE0IiwiaWF0IjoxNjg5MDU4MDAyLCJleHAiOjE2ODkwNjE2MDJ9.uNGpQy-N9PmlVm-3JeKXn797oZ-xxy8c4UK4HByURj4',
        user: {
          member_user_id: '6774214',
          member_name: 'UYWR',
          sponcer_id: '6873419',
          sponcer_name: 'user1',
          wallet_address: null,
          promoter_id: null,
          promoter_name: null,
          contact: '3746534565',
          email: 'znmd19744@gmail.com',
          status: 0,
          registration_date: '2023-07-08T05:54:52.000Z',
          member_status: 0,
          kyc_status: 0,
          topup_amount: 0,
          direct_member: 0,
          wallet_amount: 0,
          checked: 0,
          withdrawal_amt: 0,
          block_status: 0,
          current_investment: 0,
          direct_business: 0,
          total_earning: 0,
          isblock: 0,
          team_business: 0,
          expiry_date: null,
          team_member: 0,
          activation_date: null,
          profile_image: null,
          front_image: null,
          back_image: null,
          member_dob: null,
          address: null,
          pincod: 0,
          gender: null,
          country_code: 0,
          state: null,
          city: null,
          calTeamStatus: 0,
          updateWallet: 0,
          royalPoolIncome: 0,
          magicPoolIncome: 0,
          net_income: 0,
          direct_income: 0
        }
      }
    };

    const { token, user } = response.data;

    setSession(token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const changePassword = async (values) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const response = await axios({
      method: 'put',
      url: `${baseUrl}/Account/changePassword`,
      headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      data: values
    });
    return response.data;
  };
  const deposite = async (values) => {
    const accessToken = window.localStorage.getItem('accessToken');
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/Account/changePassword`,
      headers: { authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      data: values
    });
    return response.data;
  };

  const register = async (sponsorId, memberName, email, contactNo, password, cpassword) => {
    const response = await axios({
      method: 'post',
      url: `${baseUrl}/Auth/Signup`,
      data: { sponsorId, memberName, email, contactNo, password, cpassword }
    });
    const { accessToken, user } = response.data;

    window.localStorage.setItem('accessToken', accessToken);
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    });
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const resetPassword = () => {};

  const updateProfile = async (values) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      const responseUpdateProfile = await axios({
        method: 'put',
        url: `${baseUrl}/Account/EditProfile`,
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: values
      });
      return responseUpdateProfile.data;
    } catch (error) {
      console.error(error.response.data); // Log the error response data to the console
      return error.response.data;
    }
  };

  const refer = async (values) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      const response = await axios({
        method: 'post',
        url: `${baseUrl}/Dashboard/refer`,
        headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
        data: values
      });
      return response.data;
    } catch (error) {
      console.error(error.response.data); // Log the error response data to the console
      return error.response.data;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        refer,
        register,
        resetPassword,
        changePassword,
        deposite,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
