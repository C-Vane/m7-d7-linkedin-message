export default function (state = [], action) {
  switch (action.type) {
    case "SET_MESSAGES":
      return action.payload;
    case "ADD_MESSAGE":
      return [...state, action.payload];
    default:
      return state;
  }
}
