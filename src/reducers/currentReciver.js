export default function (state = [], action) {
  switch (action.type) {
    case "SET_CURRENT_RECIVER":
      return action.payload;
    default:
      return state;
  }
}
