export const GET_DOGS = "GET DOGS";
export const GET_DOGS_API = "GET DOGS API";
export const GET_DOGS_DB = "GET DOGS DB";
export const GET_DOGS_AZ = "GET DOGS AZ";
export const GET_DOGS_ZA = "GET DOGS ZA";
export const GET_DOGS_NAME = "GET DOGS NAME";
export const GET_DOG_ID = "GET DOGS ID";
export const GET_DOGS_MORE = "GET DOGS MORE";
export const GET_DOGS_LESS = "GET DOGS LESS";
export const CHANGE_OPTION_FILTER = "CHANGE_OPTION_FILTER";
export const LOADING = "LOADING";
export const CREATE_DOG = "CREATE DOG";
export const GET_TEMPERAMENTS = "GET TEMPERAMENTS";

export const SET_CURRENT_PAGE = "SET CURRENT PAGE";
export const SET_MIN_PAGE = "SET MIN PAGE";
export const SET_MAX_PAGE = "SET MAX PAGE";

export const DELETE_DOG = "DELETE DOG";

export function setCurrentPage(page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
}

export function setMaxPageNumberLimit(page) {
  return {
    type: SET_MAX_PAGE,
    payload: page,
  };
}

export function setMinPageNumberLimit(page) {
  return {
    type: SET_MIN_PAGE,
    payload: page,
  };
}

export function getTemperaments() {
  return function (dispatch) {
    fetch("/temperaments")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function deleteDog(id) {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch(`/dogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: DELETE_DOG, payload: id });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogs() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsFromApi() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs?from=api")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_API, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsFromDb() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs?from=db")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_DB, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsFromAtoZ() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs/filter/az")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_AZ, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsFromZtoA() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs/filter/za")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_ZA, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsMoreWeight() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs/filter/more")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_MORE, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsLessWeight() {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch("/dogs/filter/less")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_LESS, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogsByName(name) {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch(`/dogs?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOGS_NAME, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function getDogById(id) {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch(`/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: GET_DOG_ID, payload: data[0] });
        dispatch({ type: LOADING, payload: false });
      });
  };
}

export function changeOptionFilter(payload) {
  return {
    type: CHANGE_OPTION_FILTER,
    payload,
  };
}

export function loading(payload) {
  return {
    type: LOADING,
    payload,
  };
}

export function createDog(data) {
  return function (dispatch) {
    dispatch({ type: LOADING, payload: true });
    fetch(`/dogs`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: CREATE_DOG, payload: data });
        dispatch({ type: LOADING, payload: false });
      });
  };
}
