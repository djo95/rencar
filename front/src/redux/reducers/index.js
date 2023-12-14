import { combineReducers } from "redux";
import AuthReducer from "./AuthReducers";
import VoitureReducer from "./VoitureReducers";
import NotificationReducer from "./NotificationReducers";
import ReservationReducer from "./ReservationReducers";

const rootReducer = combineReducers({
  AuthReducer,
  VoitureReducer,
  NotificationReducer,
  ReservationReducer,
});

export default rootReducer;
