import constants from "../constants";

export function createDog(data) {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch(`/dogs`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: constants.CREATE_DOG, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function deleteDog(id) {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch(`/dogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.DELETE_DOG, payload: id });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogs() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsFromApi() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs?from=api")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_API, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsFromDb() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs?from=db")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_DB, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsFromAtoZ() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs/filter/az")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_AZ, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsFromZtoA() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs/filter/za")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_ZA, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsMoreWeight() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs/filter/more")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_MORE, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsLessWeight() {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch("/dogs/filter/less")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_LESS, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function getDogsByName(name) {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch(`/dogs?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_NAME, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

/* export function getDogById(id) {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch(`/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOG_ID, payload: data[0] });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
} */

export const getDogById = (id) => {
  return (dispatch) => {
    dispatch({ type: constants.LOADING, payload: true });
    fetch(`/dogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOG_ID, payload: data[0] });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
};

export function getDogsByTemperament(temperament) {
  return function (dispatch) {
    dispatch({ type: constants.LOADING, payload: true });
    fetch(`/dogs?temperament=${temperament}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: constants.GET_DOGS_TEMPERAMENT, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}
