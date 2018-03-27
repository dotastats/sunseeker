/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import HomePage from "../containers/HomePage";
import NotFoundPage from "./NotFoundPage";
import Dota from "../containers/Dota";
import Csgo from "../containers/Csgo";
import MatchDetail from "../containers/MatchDetail";
import TeamDetail from "../containers/TeamDetail";
import Donate from "../containers/Donate";
import Admin from "../containers/Admin";
import AdminRegister from "../containers/AdminRegister";
import AdminDashboard from "../containers/AdminDashboard";

class App extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/dota" component={Dota} />
          <Route path="/csgo" component={Csgo} />
          <Route path="/match/:id" component={MatchDetail} />
          <Route path="/team/:name" component={TeamDetail} />
          <Route path="/donate" component={Donate} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/register" component={AdminRegister} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
