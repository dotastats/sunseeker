import React, { Component } from "react";
import PropTypes from "prop-types";
import TableRow from "./TableRow";

class GroupMatch extends Component {
  static propTypes = {
    groupMatch: PropTypes.object
  };

  state = {
    showAll: false
  };

  toggleShowAll = () => {
    this.setState({ showAll: !this.state.showAll });
  };

  renderTableRow() {
    const { groupMatch } = this.props;
    const { showAll } = this.state;
    var t = {};
    for (let match in groupMatch.matches) {
      if (groupMatch.matches[match].mode_name === "Match Winner") {
        t = groupMatch.matches[0];
        groupMatch.matches[0] = groupMatch.matches[match];
        groupMatch.matches[match] = t;
      }
    }
    if (!Object.keys(t).length) {
      groupMatch.matches[0].expand = true;
    }
    return showAll ? (
      groupMatch.matches.map(
        (item, index) =>
          index === 0 ? (
            <TableRow
              toggleShowAll={() => this.toggleShowAll()}
              showAll={showAll}
              match={item}
              key={item.id.toString()}
            />
          ) : (
            <TableRow match={item} key={item.id.toString()} />
          )
      )
    ) : (
      <TableRow
        toggleShowAll={() => this.toggleShowAll()}
        match={groupMatch.matches[0]}
      />
    );
  }

  render() {
    const tableRow = this.renderTableRow();
    return <div className="GroupMatch">{tableRow}</div>;
  }
}

export default GroupMatch;
