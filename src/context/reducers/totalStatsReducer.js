const totalStatsReducer = (state, action) => {
  switch (action.type) {
    case "Loading":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "getCase":
      return {
        ...state,
        total: action.total,
        timeSeries: action.timeSeries,
        countryName: action.countryName,
        loading: false,
        error: false,
      };
    case "Error":
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};

export default totalStatsReducer;
