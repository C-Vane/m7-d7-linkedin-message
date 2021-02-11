export default function (state = [], action) {
  switch (action.type) {
    case "SET_MESSAGES_NOTIFICATION":
      return action.payload;

    default:
      return state;
  }
}
