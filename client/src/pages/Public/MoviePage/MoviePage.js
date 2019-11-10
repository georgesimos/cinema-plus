// @ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import { getMovie, onSelectMovie } from '../../../store/actions';

class MoviePage extends Component {
  componentDidMount() {
    this.props.getMovie(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onSelectMovie(null);
  }

  render() {
    const { movie } = this.props;
    return <>{movie && <MovieBanner movie={movie} fullDescription />}</>;
  }
}

MoviePage.propTypes = {
  className: PropTypes.string,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState }) => ({
  movie: movieState.selectedMovie
});

const mapDispatchToProps = { getMovie, onSelectMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePage);
