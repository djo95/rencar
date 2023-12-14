const { SHOWNOTIFICATION } = require("../../redux/actionTypes/NotificationTypes");
const initialState = { showNotification: false, message: "", error: false };
const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOWNOTIFICATION:
      console.log(action.payload);
      return {
        ...state,
        showNotification: action.payload.showNotification,
        message: action.payload.message,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export default NotificationReducer;
