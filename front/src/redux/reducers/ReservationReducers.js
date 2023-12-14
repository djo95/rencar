import {
  GET_MY_RESERVATIONS,
  GET_ONE_RESERVATION,
  GET_RESERVATIONS,
  GET_SEARCH_RESERVATIONS,
  IS_LOADING,
} from "../actionTypes/ReservationTypes";

const initialState = {
  reservations: [],
  oneCar: {
    _id: "",
    marque: "",
    modele: "",
    typeBoite: "",
    carburant: "",
    puissanceF: "",
    annee: 2010,
    serie: 0,
    orderV: 0,
    images: [],
    created_at: "",
  },
  myReservations: [],
  searchReservations: [],
  isLoading: false,
};

const ReservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESERVATIONS:
      return { ...state, reservations: action.payload };
    case GET_ONE_RESERVATION:
      return { ...state, oneReservation: action.payload };
    case GET_MY_RESERVATIONS:
      return { ...state, myReservations: action.payload };
    case GET_SEARCH_RESERVATIONS:
      return { ...state, searchReservations: action.payload };
    case IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default ReservationReducer;
