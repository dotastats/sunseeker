export const loadStateReducer = asyncStates => {
  return (state = { loading: false, data: null, error: null }, action) => {
    switch (action.type) {
      case asyncStates.REQUEST:
        return {
          loading: true,
          data: state.data
        };
      case asyncStates.FAILURE:
        return {
          loading: false,
          error: action.payload,
          data: state.data
        };
      case asyncStates.SUCCESS:
        return {
          loading: false,
          data: action.payload
        };
      default:
        return state;
    }
  };
};
