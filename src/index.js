/* eslint-disable import/default */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import configureStore, { history } from "./store/configureStore";
import Root from "./components/Root";
import "./assets/style/main.scss";
require("./assets/js/widgets");
require("pace-progress/pace.min.js");
require("./favicon.ico"); // Tell webpack to load favicon.ico
const store = configureStore();

import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

render(
  <AppContainer>
    <div>
      <Root store={store} history={history} />
    </div>
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept("./components/Root", () => {
    const NewRoot = require("./components/Root").default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}
