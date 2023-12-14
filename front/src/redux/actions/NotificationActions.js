import { SHOWNOTIFICATION } from "../../redux/actionTypes/NotificationTypes";

export const ShowNotification = (showNotification, message, error) => async (dispatch) => {
  try {
    console.log(showNotification);
    dispatch({
      type: SHOWNOTIFICATION,
      payload: {
        showNotification: showNotification,
        message: message,
        error: error,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
