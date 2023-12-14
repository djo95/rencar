import axios from "axios";
import {
  GET_MY_RESERVATIONS,
  GET_ONE_RESERVATION,
  GET_RESERVATIONS,
  GET_SEARCH_RESERVATIONS,
  IS_LOADING,
} from "../actionTypes/ReservationTypes";
import { ShowNotification } from "./NotificationActions";
const baseurl = process.env.REACT_APP_BASEURL + "/api/reservation/";

export const getAllReservations = () => async (dispatch) => {
  try {
    await axios.get(baseurl + "getReservations").then((res) => {
      if (res.data) {
        dispatch({
          type: GET_RESERVATIONS,
          payload: res.data,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const addReservation = (newCar, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    await axios
      .post(baseurl + "addReservation", newCar)
      .then((res) => {
        console.log(res);
        dispatch(ShowNotification(true, "Votre voiture a été ajouter avec succees", false));
        dispatch(getAllReservations());
      })
      .then(() => {
        dispatch({
          type: IS_LOADING,
          payload: false,
        });
      })
      .finally(() => {
        setTimeout(() => {
          navigate("/voitures");
        }, 500);
      });
  } catch (error) {
    console.log(error);
  }
};

export const getSearchReservation = (data) => async (dispatch) => {
  try {
    const res = await axios.post(baseurl + "getSearchReservation", data);

    dispatch({
      type: GET_SEARCH_RESERVATIONS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneReservation = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    await axios.get(baseurl + "getById/" + id).then((res) => {
      if (res.data) {
        dispatch({ type: GET_ONE_RESERVATION, payload: res.data });
        dispatch({
          type: IS_LOADING,
          payload: false,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateReservation = (upPost, id, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    await axios
      .put(baseurl + "updateReservation/" + id, upPost)
      .then((res) => {
        if (res.status === 200) {
          dispatch(ShowNotification(true, "Votre voiture a été modifier avec succees", false));
          dispatch(getAllReservations());
        } else {
          dispatch(ShowNotification(true, "Probleme serveur", true));
        }
      })
      .finally(() => {
        dispatch(ShowNotification(false, "", false));

        setTimeout(() => {
          navigate("/voitures");
        }, 1000);
      });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReservation = (id, navigate, navigateTo) => async (dispatch) => {
  try {
    await axios.delete(baseurl + "deleteReservation/" + id);

    dispatch(getAllReservations());
    window.location.reload(false);
  } catch (error) {
    console.log(error);
  }
};

export const getMyReservations = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.get(baseurl + "getMyReservation/" + id);
    dispatch({ type: GET_MY_RESERVATIONS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

/*export const updateValid = (upPost, id, location, userID) => async (dispatch) => {
  try {
    await axios.put(baseurl + `/api/post/updatePost/${id}`, upPost);
    if (location.pathname === "/ListPost") {
      dispatch(getAllCars());
    } else {
      dispatch(getAllCars(userID));
    }
  } catch (error) {
    console.log(error);
  }
};*/
