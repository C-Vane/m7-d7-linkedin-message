export default function (state = () => {}, action) {
  switch (action.type) {
    case "SET_SOCKET":
      return action.payload;
    default:
      return state;
  }
}
