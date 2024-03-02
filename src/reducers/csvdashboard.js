function reducer(state, action) {
  switch (action.type) {
    case "USER_ACTION":
      return { ...state, action: action.payload };
    case "DISABLE_SUB_BTN":
      return { ...state, disableBtn: action.payload };
    case "CSV_VALIDATION":
      return { ...state, isValidCSV: action.payload };
    case "CSV_ERR":
      return { ...state, csvErrors: action.payload };
    default:
      return state;
  }
}

export default reducer;
