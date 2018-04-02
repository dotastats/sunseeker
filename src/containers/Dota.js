import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchesFilter from "./MatchesFilter";
import ListMatch from "../components/ListMatch";
import { fetchMatches } from "../actions";
import dayBefore from "../helper/date";
import Loading from "../components/Loading";

class Dota extends Component {
  static propTypes = {
    listMatches: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    isFetching: PropTypes.bool
  };

  componentDidMount() {
    this.props.dispatch(
      fetchMatches({
        limit: 50,
        time_from: dayBefore(),
        game: "dota",
        status: "all"
      })
    );
  }

  render() {
    const { listMatches, isFetching } = this.props;
    return (
      <div>
        <div className="container">
          <div className="row">
            <MatchesFilter />
          </div>
          {isFetching ? (
            <Loading />
          ) : listMatches && listMatches.length ? (
            <ListMatch listMatches={listMatches} />
          ) : (
            <p>No data</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.matches
  };
};

export default connect(mapStateToProps)(Dota);
