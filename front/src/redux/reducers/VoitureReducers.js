import {
  GET_MY_CARS,
  GET_ONE_CAR,
  GET_CARS,
  GET_SEARCH_CARS,
  IS_LOADING,
} from "../actionTypes/VoitureTypes";

const initialState = {
  cars: [],
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
  myCars: [],
  searchCars: [],
  isLoading: false,
};

const VoitureReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARS:
      return { ...state, cars: action.payload };
    case GET_ONE_CAR:
      return { ...state, oneCar: action.payload };
    case GET_MY_CARS:
      return { ...state, myCars: action.payload };
    case GET_SEARCH_CARS:
      return { ...state, searchCars: action.payload };
    case IS_LOADING:
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default VoitureReducer;
