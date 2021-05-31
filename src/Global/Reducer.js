const Reducer = (state, action) => {
  switch (action.type) {
    case "setDark":
      return {
        ...state,
        darkMode: action.payload,
      };
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
