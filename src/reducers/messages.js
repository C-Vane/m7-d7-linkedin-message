export default function (state = [], action) {
  switch (action.type) {
    case "ADD_MESSAGES":
      return [...state, action.payload];

    default:
      return state;
  }
}
