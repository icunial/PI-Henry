import constants from "./constants.js";

const initialState = {
  dogs: [],
  dog: {},
  option: "item_all",
  valueFilter: "",
  loading: false,
  newDog: [],
  temperaments: [],
  currentPage: 1,
  theme: true,
  favourites: [],
  comments: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.GET_DOGS:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_API:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_DB:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_AZ:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_ZA:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_NAME:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_MORE:
      return { ...state, dogs: action.payload };
    case constants.GET_DOGS_LESS:
      return { ...state, dogs: action.payload };
    case constants.GET_DOG_ID:
      return { ...state, dog: action.payload };
    case constants.CHANGE_OPTION_FILTER:
      return { ...state, option: action.payload };
    case constants.CHANGE_VALUE_FILTER:
      return { ...state, valueFilter: action.payload };
    case constants.LOADING:
      return { ...state, loading: action.payload };
    case constants.CREATE_DOG:
      return { ...state, newDog: action.payload };
    case constants.GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };
    case constants.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case constants.DELETE_DOG:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.id !== action.payload),
      };
    case constants.GET_DOGS_TEMPERAMENT:
      return { ...state, dogs: action.payload };
    case constants.CHANGE_THEME:
      return { ...state, theme: action.payload };
    case constants.ADD_FAVOURITE:
      return { ...state, favourites: [...state.favourites, action.payload] };
    case constants.REMOVE_FAVOURITE:
      return {
        ...state,
        favourites: state.favourites.filter((dog) => dog.id !== action.payload),
      };
    case constants.CREATE_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments] };
    case constants.GET_COMMENTS:
      return { ...state, comments: action.payload };
    default:
      return { ...state };
  }
}
