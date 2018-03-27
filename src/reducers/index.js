import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import matches from "./matches";
import match from "./match";
import team from "./team";
import admin from "./admin";

const rootReducer = combineReducers({
  routing: routerReducer,
  matches,
  match,
  team,
  admin
});

export default rootReducer;
