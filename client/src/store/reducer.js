import {
  GET_DOGS,
  GET_DOGS_API,
  GET_DOGS_DB,
  GET_DOGS_AZ,
  GET_DOGS_ZA,
  GET_DOGS_NAME,
  GET_DOGS_MORE,
  GET_DOGS_LESS,
  GET_DOG_ID,
  CHANGE_OPTION_FILTER,
  LOADING,
  CREATE_DOG,
  GET_TEMPERAMENTS,
  SET_CURRENT_PAGE,
  DELETE_DOG,
  GET_DOGS_TEMPERAMENT,
  CHANGE_VALUE_FILTER,
} from "./actions";

const initialState = {
  dogs: [],
  dog: {},
  option: "item_all",
  valueFilter: "",
  loading: false,
  newDog: [],
  temperaments: [],
  currentPage: 1,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return { ...state, dogs: action.payload };
    case GET_DOGS_API:
      return { ...state, dogs: action.payload };
    case GET_DOGS_DB:
      return { ...state, dogs: action.payload };
    case GET_DOGS_AZ:
      return { ...state, dogs: action.payload };
    case GET_DOGS_ZA:
      return { ...state, dogs: action.payload };
    case GET_DOGS_NAME:
      return { ...state, dogs: action.payload };
    case GET_DOGS_MORE:
      return { ...state, dogs: action.payload };
    case GET_DOGS_LESS:
      return { ...state, dogs: action.payload };
    case GET_DOG_ID:
      return { ...state, dog: action.payload };
    case CHANGE_OPTION_FILTER:
      return { ...state, option: action.payload };
    case CHANGE_VALUE_FILTER:
      return { ...state, valueFilter: action.payload };
    case LOADING:
      return { ...state, loading: action.payload };
    case CREATE_DOG:
      return { ...state, newDog: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case DELETE_DOG:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.id !== action.payload),
      };
    case GET_DOGS_TEMPERAMENT:
      return { ...state, dogs: action.payload };
    default:
      return state;
  }
}
