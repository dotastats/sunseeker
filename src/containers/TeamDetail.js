import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import qs from "query-string";
import { fetchTeam, fetchHistory, fetchTeamInfo } from "../actions";
import { Card, CardHeader, CardText } from "material-ui/Card";
import { grey600, grey50 } from "material-ui/styles/colors";
import F10KHistory from "../components/F10KHistory";
import TeamTwitter from "../components/TeamTwitter";
import ResultList from "../components/ResultList";
import Footer from "../components/Footer";
import slugify from "../helper/slugify";

class TeamDetail extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ id: PropTypes.string })
    }),
    location: PropTypes.object.isRequired,
    teamDetail: PropTypes.object,
    teamHistory: PropTypes.object,
    teamInfo: PropTypes.object,
    dispatch: PropTypes.func
  };

  componentDidMount() {
    const query = qs.parse(this.props.location.search);
    if (query.game === "dota") {
      this.props.dispatch(fetchTeam(this.props.match.params.name));
    }
    this.props.dispatch(
      fetchTeamInfo(slugify(this.props.match.params.name), query.game)
    );
  }

  componentWillReceiveProps(nextProps) {
    const query = qs.parse(this.props.location.search);
    const { teamDetail, teamInfo } = nextProps;
    if (
      this.props.teamDetail === {} &&
      teamInfo.message === "not found" &&
      teamDetail &&
      teamDetail.name !== ""
    ) {
      this.props.dispatch(fetchTeamInfo(slugify(teamDetail.name), query.game));
    }
  }

  getRecentMatches = () => {
    this.props.dispatch(fetchHistory(this.props.match.params.name));
  };

  render() {
    const { teamHistory, teamInfo, teamDetail } = this.props;
    let teamSlug = "";
    if (teamInfo && teamInfo.slug) {
      teamSlug = teamInfo.game + "-" + teamInfo.slug;
    }
    const teamName =
      teamDetail && teamDetail.name
        ? teamDetail.name
        : this.props.match.params.name.toLowerCase();

    return (
      <div className="TeamDetail">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-12">
              <Card style={{ marginTop: "10px" }}>
                <CardHeader
                  title={teamName}
                  subtitle={teamInfo.game}
                  avatar={teamInfo.logo}
                />
                <CardText>
                  {teamDetail &&
                  Array.isArray(teamDetail.matches) &&
                  teamInfo.game === "dota" ? (
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
                            <li>Average kill: {teamDetail.avgkill}</li>
                            <li>Average death: {teamDetail.avgdeath}</li>
                            <li>Ratio kill: {teamDetail.ratiokill}</li>
                            <li>Total kill: {teamDetail.totalkill}</li>
                            <li>Total death: {teamDetail.totaldeath}</li>
                            <li>Winrate: {teamDetail.winrate}</li>
                            <li>Average odds: {teamDetail.avgodds}</li>
                          </ul>
                        </CardText>
                      </Card>
                      <F10KHistory
                        teamName={teamName}
                        f10kHistory={teamDetail.matches}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                  <ResultList
                    teamName={teamName}
                    title="Matches History"
                    resultList={teamHistory}
                    getData={this.getRecentMatches}
                  />
                </CardText>
              </Card>
            </div>
            <div className="col-sm-6 col-12">
              <TeamTwitter slug={teamSlug} />
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
    teamDetail: state.team.teamDetail,
    teamHistory: state.team.teamHistory,
    teamInfo: state.team.teamInfo
  };
};

export default connect(mapStateToProps)(TeamDetail);
