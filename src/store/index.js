import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import currentReciver from "../reducers/currentReciver";
import messageNotification from "../reducers/messageNotification";
import messages from "../reducers/messages";
import socket from "../reducers/socket";
import user from "../reducers/user";
const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {
  users: {
    online: [],
    offline: [],
  },
  socket: () => {},
  messages: [],
  messageNotification: [],
  currentReciver: "",
};

const rootReducer = combineReducers({ users: user, socket: socket, messages: messages, messageNotification: messageNotification, currentReciver: currentReciver });
export default function configureStore() {
  return createStore(rootReducer, initialState, composedEnhancer(applyMiddleware(thunk)));
}
