import { useReducer } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import userReducer from './UserReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const apiUrl = process.env.API_URL || 'http://localhost:3000';

const UserState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null,
    errors: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  // Load User
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['authorization'];
    }

    try {
      const res = await axios.get(`${apiUrl}/api/user`);
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR, payload: err.errors });
    }
  };

  // Register User
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post(`${apiUrl}/auth/signup`, formData, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.token,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.errors
          ? err.response.data.errors
          : [err.response.data],
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(`${apiUrl}/auth/signin`, formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.token,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.errors
          ? err.response.data.errors
          : [err.response.data],
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <UserContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        errors: state.errors,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
