import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";
import { Card, CardHeader, CardText } from "material-ui/Card";
import {
  lightGreenA700,
  red700,
  grey600,
  grey50,
  transparent
} from "material-ui/styles/colors";
import Divider from "material-ui/Divider";
import { List, ListItem } from "material-ui/List";
import Moment from "react-moment";
import heroList from "../mock/heroes";

class F10KHistory extends Component {
  static propTypes = {
    f10kHistory: PropTypes.array,
    teamName: PropTypes.string.isRequired
  };

  matchScore = match => {
    if (typeof match.scorea !== "undefined" && match.scoreb !== "undefined")
      return `${match.scorea} - ${match.scoreb}`;
    else {
      return "No Info";
    }
  };

  winOrLose = (match, teamName) => {
    if (match.scorea > match.scoreb) {
      return (
        match.teama.toLowerCase() === teamName ||
        match.teama_short.toLowerCase() === teamName
      );
    }
    return (
      match.teamb.toLowerCase() === teamName ||
      match.teamb_short.toLowerCase() === teamName
    );
  };

  render() {
    const { teamName, f10kHistory } = this.props;

    return (
      <Card style={{ marginTop: "10px" }}>
        <CardHeader
          title="F10K history"
          actAsExpander
          style={{ backgroundColor: grey600 }}
          titleColor={grey50}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <List>
            {f10kHistory
              ? f10kHistory.map(match => (
                  <div
                    key={f10kHistory.indexOf(match)}
                    style={{ borderBottom: "1px solid gray" }}
                  >
                    <ListItem
                      primaryText={match.matchname}
                      leftAvatar={
                        <Avatar
                          color={
                            this.winOrLose(match, teamName)
                              ? lightGreenA700
                              : red700
                          }
                          backgroundColor={transparent}
                          style={{ left: 8 }}
                        >
                          {this.winOrLose(match, teamName) ? "W" : "L"}
                        </Avatar>
                      }
                      rightAvatar={<p>{this.matchScore(match)}</p>}
                      secondaryText={
                        <div>
                          <Moment fromNow>{match.time}</Moment>
                        </div>
                      }
                    />
                    {match.picks_bans && match.picks_bans.length ? (
                      <div className="u-padding--12 row">
                        <p className="u-padding-horizontal--24 u-margin-bottom--12">
                          <b>Lineup</b>
                        </p>
                        <div className="u-margin-bottom--6 col-sm-12">
                          <div className="col-sm-3">{match.teama}: </div>
                          <div className="col-sm-9">
                            {match.picks_bans
                              .filter(item => item.is_pick && item.team == 0)
                              .map(item => (
                                <img
                                  key={item.match_id + item.ord}
                                  src={`http://cdn.steamstatic.com/apps/dota2/images/heroes/${heroList[
                                    heroList.findIndex(
                                      hero => hero.id == item.hero_id
                                    )
                                  ].name.replace("npc_dota_hero_", "")}_sb.png`}
                                />
                              ))}
                          </div>
                        </div>
                        <div className="u-margin-bottom--6 col-sm-12">
                          <div className="col-sm-3">{match.teamb}: </div>
                          <div className="col-sm-9">
                            {match.picks_bans
                              .filter(item => item.is_pick && item.team == 1)
                              .map(item => (
                                <img
                                  key={item.match_id + item.ord}
                                  src={`http://cdn.steamstatic.com/apps/dota2/images/heroes/${heroList[
                                    heroList.findIndex(
                                      hero => hero.id == item.hero_id
                                    )
                                  ].name.replace("npc_dota_hero_", "")}_sb.png`}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <Divider inset={true} />
                  </div>
                ))
              : ""}
          </List>
        </CardText>
      </Card>
    );
  }
}

export default F10KHistory;
