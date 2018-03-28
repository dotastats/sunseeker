export const createAction = actionType => payload => ({
  type: actionType,
  payload
});

const logoutStatuses = [401, 403];

export const catchHandler = (type, error, dispatch) => {
  if (error.response) {
    if (logoutStatuses.indexOf(error.response.status) > -1) {
      document.alert("Auth token expired");
    } else {
      dispatch(createAction(type)(error.response.status));
    }
  } else if (error.request) {
    dispatch(createAction(type)(error.request));
  } else {
    dispatch(createAction(type)(error.message));
  }
};

export const asyncActionCreator = (asyncTypes, createThunk) => (...args) => {
  const thunk = createThunk(...args);

  return dispatch => {
    dispatch({ type: asyncTypes.REQUEST });

    return dispatch(thunk)
      .then(payload =>
        dispatch({
          type: asyncTypes.SUCCESS,
          payload: payload.data
        })
      )
      .catch(error => catchHandler(asyncTypes.FAILURE, error, dispatch));
  };
};
