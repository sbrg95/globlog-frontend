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

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      state = {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
      break;
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload);
      state = {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
      break;
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      state = {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        errors: action.payload,
      };
      break;
    case CLEAR_ERRORS:
      state = {
        ...state,
        errors: null,
      };
      break;
    default:
      break;
  }
  return state;
};

export default userReducer;
