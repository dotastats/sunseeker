import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { grey600, grey50 } from "material-ui/styles/colors";
import F10KHistory from "../components/F10KHistory";
import Footer from "../components/Footer";
import ResultList from "../components/ResultList";
import { fetchMatch } from "../actions";
import Tick from "../components/images/Tick.png";

class MatchDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ id: PropTypes.string })
    }),
    matchDetail: PropTypes.object,
    matchHistoryA: PropTypes.array,
    matchHistoryB: PropTypes.array,
    mutualHistory: PropTypes.array,
    f10kHistoryA: PropTypes.object,
    f10kHistoryB: PropTypes.object,
    isLoadingHistoryA: PropTypes.bool.isRequired,
    isLoadingHistoryB: PropTypes.bool.isRequired,
    isLoadingMutualHistory: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(fetchMatch(this.props.match.params.id));
  }

  render() {
    const {
      matchDetail,
      matchHistoryA,
      matchHistoryB,
      mutualHistory,
      f10kHistoryA,
      f10kHistoryB,
      isLoadingHistoryA,
      isLoadingHistoryB,
      isLoadingMutualHistory
    } = this.props;

    return (
      <div className="MatchDetail">
        <div className="container">
          <div className="Match col-md-12">
            <div className="Match-title row">
              <div className="col-md-6">
                {matchDetail.game
                  ? `${matchDetail.game.toUpperCase()}  - ${
                      matchDetail.tournament
                    } - ${matchDetail.mode_name}`
                  : `Game - ${matchDetail.tournament} - ${
                      matchDetail.mode_name
                    }`}
              </div>
              <div className="col-md-6 text-right">
                {matchDetail.status === "Live" ? (
                  <span>Live</span>
                ) : (
                  <div className="TableRow-time">
                    <Moment fromNow>{matchDetail.time}</Moment>
                  </div>
                )}
              </div>
            </div>

            <hr />

            <div className="row">
              <div className="col-md-4">
                <div className="row text-center u-position--relative">
                  <Link
                    to={`/team/${matchDetail.teama}?game=${matchDetail.game}`}
                  >
                    <img
                      className="Match-team-logo"
                      src={matchDetail.logo_a}
                      alt={matchDetail.teama}
                    />
                    {matchDetail.winner === matchDetail.teama ? (
                      <img src={Tick} alt="winner" className="Match-tick" />
                    ) : (
                      ""
                    )}
                  </Link>
                </div>
                <div className="row text-center">
                  <Link
                    to={`/team/${matchDetail.teama}?game=${matchDetail.game}`}
                    className="Match-team-title"
                  >
                    {matchDetail.teama}
                  </Link>
                </div>
                <div className="Match-ratio row text-center">
                  {matchDetail.ratioa}
                </div>
              </div>
              <div className="col-md-4 text-center">
                <div className="Match-score">
                  {matchDetail.status === "Settled"
                    ? matchDetail.scorea + " - " + matchDetail.scoreb
                    : " - "}
                </div>
              </div>
              <div className="col-md-4">
                <div className="row text-center u-position--relative">
                  <Link
                    to={`/team/${matchDetail.teamb}?game=${matchDetail.game}`}
                  >
                    {matchDetail.winner === matchDetail.teamb ? (
                      <img
                        src={Tick}
                        alt="winner"
                        className="Match-tick Match-tick--right"
                      />
                    ) : (
                      ""
                    )}
                    <img
                      className="Match-team-logo"
                      src={matchDetail.logo_b}
                      alt={matchDetail.teamb}
                    />
                  </Link>
                </div>
                <div className="row text-center">
                  <Link
                    to={`/team/${matchDetail.teamb}?game=${matchDetail.game}`}
                    className="Match-team-title"
                  >
                    {matchDetail.teamb}
                  </Link>
                </div>
                <div className="Match-ratio row text-center">
                  {matchDetail.ratiob}
                </div>
              </div>
            </div>
            <div className="ScoreGroup">
              <div className="col-sm-12">
                <h4>Versus history</h4>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Games</th>
                      <th>Match name</th>
                      <th>Winner</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(mutualHistory) && mutualHistory.length ? (
                      mutualHistory.slice(0, 10).map(game => (
                        <tr key={game.id}>
                          <td>{game.tournament}</td>
                          <td>{game.matchname}</td>
                          <td>{game.winner}</td>
                          <td>
                            <Moment fromNow>{game.time}</Moment>
                          </td>
                        </tr>
                      ))
                    ) : isLoadingMutualHistory ? (
                      <p>Loading</p>
                    ) : (
                      <p>No mutual match</p>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="ScoreGroup">
              <div className="Score col-sm-6">
                {Array.isArray(matchHistoryA) && matchHistoryA.length ? (
                  <ResultList
                    teamName={matchDetail.teama.toLowerCase()}
                    title={`${matchDetail.teama} matches history`}
                    resultList={matchHistoryA}
                  />
                ) : isLoadingHistoryA ? (
                  <p>Loading</p>
                ) : (
                  <p>No {matchDetail.teama} match</p>
                )}
              </div>
              <div className="Score col-sm-6">
                {Array.isArray(matchHistoryB) && matchHistoryB.length ? (
                  <ResultList
                    teamName={matchDetail.teamb.toLowerCase()}
                    title={`${matchDetail.teamb} matches history`}
                    resultList={matchHistoryB}
                  />
                ) : isLoadingHistoryB ? (
                  <p>Loading</p>
                ) : (
                  <p>No match</p>
                )}
              </div>
            </div>
            <div className="ScoreGroup">
              <div className="Score col-sm-6">
                {f10kHistoryA && Array.isArray(f10kHistoryA.matches) ? (
                  <div className="F10kInfo">
                    <Card initiallyExpanded>
                      <CardHeader
                        title="Statistics"
                        actAsExpander
                        style={{ backgroundColor: grey600 }}
                        titleColor={grey50}
                        showExpandableButton={true}
                      />
                      <CardText expandable={true}>
                        <ul>
                          <li>Average kill: {f10kHistoryA.avgkill}</li>
                          <li>Average death: {f10kHistoryA.avgdeath}</li>
                          <li>Total kill: {f10kHistoryA.totalkill}</li>
                          <li>Total death: {f10kHistoryA.totaldeath}</li>
                          <li>Winrate: {f10kHistoryA.winrate}</li>
                          <li>Average odds: {f10kHistoryA.avgodds}</li>
                        </ul>
                      </CardText>
                    </Card>
                    <F10KHistory
                      teamName={matchDetail.teama.toLowerCase()}
                      f10kHistory={f10kHistoryA.matches}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="Score col-sm-6">
                {f10kHistoryB && Array.isArray(f10kHistoryB.matches) ? (
                  <div className="F10kInfo">
                    <Card initiallyExpanded>
                      <CardHeader
                        title="Statistics"
                        actAsExpander
                        style={{ backgroundColor: grey600 }}
                        titleColor={grey50}
                        showExpandableButton={true}
                      />
                      <CardText expandable={true}>
                        <ul>
                          <li>Average kill: {f10kHistoryB.avgkill}</li>
                          <li>Average death: {f10kHistoryB.avgdeath}</li>
                          <li>Total kill: {f10kHistoryB.totalkill}</li>
                          <li>Total death: {f10kHistoryB.totaldeath}</li>
                          <li>Winrate: {f10kHistoryB.winrate}</li>
                          <li>Average odds: {f10kHistoryB.avgodds}</li>
                        </ul>
                      </CardText>
                    </Card>
                    <F10KHistory
                      teamName={matchDetail.teamb.toLowerCase()}
                      f10kHistory={f10kHistoryB.matches}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matchDetail: state.match.matchDetail,
    mutualHistory: state.match.mutualHistory,
    matchHistoryA: state.match.teamMatchHistoryA,
    f10kHistoryA: state.match.f10kHistoryA,
    f10kHistoryB: state.match.f10kHistoryB,
    matchHistoryB: state.match.teamMatchHistoryB,
    isLoadingHistoryA: state.match.isLoadingHistoryA,
    isLoadingHistoryB: state.match.isLoadingHistoryB,
    isLoadingF10kA: state.match.isLoadingF10kA,
    isLoadingF10kB: state.match.isLoadingF10kB,
    isLoadingMutualHistory: state.match.isLoadingMutualHistory
  };
};

export default connect(mapStateToProps)(MatchDetail);
