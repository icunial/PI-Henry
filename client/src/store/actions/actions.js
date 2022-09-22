import constants from "../constants";

export function getComments(id) {
  return function (dispatch) {
    fetch(`/comments/${id}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: constants.GET_COMMENTS, payload: data });
      });
  };
}

export function createComment(data) {
  return function (dispatch) {
    fetch(`/comments`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: constants.CREATE_COMMENT, payload: data });
      });
  };
}

export function addFavourite(payload) {
  return {
    type: constants.ADD_FAVOURITE,
    payload,
  };
}

export function removeFavourite(payload) {
  return {
    type: constants.REMOVE_FAVOURITE,
    payload,
  };
}

export function changeTheme(payload) {
  return {
    type: constants.CHANGE_THEME,
    payload,
  };
}

export function setCurrentPage(page) {
  return {
    type: constants.SET_CURRENT_PAGE,
    payload: page,
  };
}

export function getTemperaments() {
  return function (dispatch) {
    fetch("/temperaments")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: constants.GET_TEMPERAMENTS, payload: data });
        dispatch({ type: constants.LOADING, payload: false });
      });
  };
}

export function changeOptionFilter(payload) {
  return {
    type: constants.CHANGE_OPTION_FILTER,
    payload,
  };
}

export function changeValueFilter(payload) {
  return {
    type: constants.CHANGE_VALUE_FILTER,
    payload,
  };
}

export function loading(payload) {
  return {
    type: constants.LOADING,
    payload,
  };
}
