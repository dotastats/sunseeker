import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Card } from "material-ui/Card";
import Tick from "./images/Tick.png";

class TableRow extends Component {
  static propTypes = {
    match: PropTypes.object
  };

  render() {
    const { match, toggleShowAll, showAll } = this.props;
    const RowHeader = (
      <Card className="TableRow row u-position--relative">
        <Link to={`/match/${match.id}`}>
          <div className="TableRow-head row">
            <div className="col-sm-8">
              {match.tournament} - {match.mode_name}
            </div>
            <div className="col-sm-4 text-right">
              {match.status === "Live" ? (
                <span>Live</span>
              ) : (
                <div className="TableRow-time">
                  <span>{match.status} </span>
                  <Moment fromNow>{match.time}</Moment>
                </div>
              )}
            </div>
          </div>
          <div className="TableRow-body container">
            <div className="row">
              <div className="col-sm-2">
                <div className="TableRow-body-name">
                  {match.teama}
                  <div>{match.ratioa}</div>
                </div>
              </div>
              <div className="col-sm-2 text-right">
                <div className="TableRow-body-image">
                  <img src={match.logo_a} alt={match.teama} />
                  {match.winner === match.teama ? (
                    <img src={Tick} alt="winner" className="winner-tick" />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-sm-2 text-center">
                {match.status === "Settled" ? (
                  <div className="TableRow-body-score">
                    <span>{match.scorea} </span>
                    <span> {match.scoreb}</span>
                  </div>
                ) : (
                  ""
                )}
                {match.bestof}
              </div>
              <div className="col-sm-2">
                <div className="TableRow-body-image text-center">
                  <img src={match.logo_b} alt={match.teamb} />
                  {match.winner === match.teamb ? (
                    <img
                      src={Tick}
                      alt="winner"
                      className="winner-tick winner-tick--right"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-sm-2">
                <div className="TableRow-body-name text-right">
                  {match.teamb}
                  <div>{match.ratiob}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="TableRow-background">
            <img src={match.tournament_logo} alt={match.tournament} />
          </div>
        </Link>
        <div className="col-sm-12" onClick={() => toggleShowAll()}>
          {showAll ? (
            <i className="glyphicon glyphicon-menu-up" />
          ) : (
            <i className="glyphicon glyphicon-menu-down" />
          )}
        </div>
      </Card>
    );
    const RowItem = (
      <Link to={`/match/${match.id}`}>
        <Card className="TableRow-footer row u-position--relative">
          <div className="row">
            <div className="col-sm-8">
              {match.winner
                ? `${match.tournament} - ${match.mode_name} - ${
                    match.winner
                  } won`
                : `${match.tournament} - ${match.mode_name}`}
            </div>
            <div className="col-sm-4 text-right">
              {match.status === "Live" ? (
                <span>Live</span>
              ) : (
                <div className="TableRow-time">
                  <span>{match.status} </span>
                  <Moment fromNow>{match.time}</Moment>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Link>
    );
    return match.mode_name === "Match Winner" || match.expand === true
      ? RowHeader
      : RowItem;
  }
}

export default TableRow;
