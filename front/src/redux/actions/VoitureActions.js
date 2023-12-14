import axios from "axios";
import {
  GET_MY_CARS,
  GET_ONE_CAR,
  GET_CARS,
  GET_SEARCH_CARS,
  IS_LOADING,
} from "../actionTypes/VoitureTypes";
import { ShowNotification } from "./NotificationActions";
const baseurl = process.env.REACT_APP_BASEURL;

export const getAllCars = () => async (dispatch) => {
  try {
    await axios.get(baseurl + "/api/cars/getAll/").then((res) => {
      if (res.data) {
        dispatch({
          type: GET_CARS,
          payload: res.data,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const addCar = (newCar, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    await axios
      .post(baseurl + "/api/cars/addCars", newCar)
      .then((res) => {
        console.log(res);
        dispatch(ShowNotification(true, "Votre voiture a été ajouter avec succees", false));
        dispatch(getAllCars());
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

export const getSearchCar = (data) => async (dispatch) => {
  try {
    const res = await axios.post(baseurl + "/api/cars/getSearchCars", data);

    dispatch({
      type: GET_SEARCH_CARS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneCar = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    await axios.get(baseurl + "/api/cars/getById/" + id).then((res) => {
      if (res.data) {
        dispatch({ type: GET_ONE_CAR, payload: res.data });
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

export const updateCar = (upPost, id, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: IS_LOADING,
      payload: true,
    });
    await axios
      .put(baseurl + "/api/cars/updateCar/" + id, upPost)
      .then((res) => {
        if (res.status === 200) {
          dispatch(ShowNotification(true, "Votre voiture a été modifier avec succees", false));
          dispatch(getAllCars());
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

export const deleteCar = (id, navigate, navigateTo) => async (dispatch) => {
  try {
    await axios.delete(baseurl + "/api/cars/deleteCar/" + id);

    dispatch(getAllCars());
    window.location.reload(false);
  } catch (error) {
    console.log(error);
  }
};

export const getMyCars = (id) => async (dispatch) => {
  console.log(id);
  try {
    const res = await axios.get(baseurl + "/api/cars/getMyCars/" + id);
    dispatch({ type: GET_MY_POSTS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateValid = (upPost, id, location, userID) => async (dispatch) => {
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
};
