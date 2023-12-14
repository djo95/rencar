import {
  CURRENT,
  FAIL,
  LOGIN,
  REGISTER,
  LOGOUT,
  GETALLUSERS,
  GETONEUSER,
  ADDUSER,
} from "../actionTypes/AuthTypes";

const intialState = {
  user: {},
  errors: [],
  users: [],
  oneUser: {},
  newUser: {},
};

const AuthReducer = (state = intialState, action) => {
  switch (action.type) {
    case FAIL:
      return { ...state, errors: action.payload, user: null };

    case REGISTER:
      localStorage.setItem("token", action.payload.token);
      return { ...state, user: action.payload.newUser, errors: null };

    case LOGIN:
      localStorage.setItem("token", action.payload.token);
      return { ...state, user: action.payload.found, errors: null };

    case CURRENT:
      return { ...state, user: action.payload, errors: null };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, user: null, errors: null };

    case GETALLUSERS:
      return { ...state, users: action.payload };

    case GETONEUSER:
      return { ...state, oneUser: action.payload };

    case ADDUSER:
      return { ...state, newUser: action.payload.newUser };
    default:
      return state;
  }
};

export default AuthReducer;
