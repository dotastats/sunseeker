import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import MatchesFilter from "./MatchesFilter";
import Footer from "../components/Footer";
import ListMatch from "../components/ListMatch";
import Loading from "../components/Loading";
import { fetchMatches } from "../actions";
import dayBefore from "../helper/date";

class HomePage extends Component {
  static propTypes = {
    listMatches: PropTypes.array.isRequired,
    isFetching: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.dispatch(
      fetchMatches({
        limit: 100,
        time_from: dayBefore(),
        game: "all",
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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.matches
  };
};

export default connect(mapStateToProps)(HomePage);
