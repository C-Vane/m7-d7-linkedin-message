export default function (state = {}, action) {
  switch (action.type) {
    case "SET_ONLINE_USERS":
      return { ...state, online: action.payload };
    case "SET_OFFLINE_USERS":
      return { ...state, offline: action.payload };
    default:
      return state;
  }
}
