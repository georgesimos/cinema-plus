// @ts-nocheck
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import MovieBanner from '../components/MovieBanner/MovieBanner';
import { getMovie, onSelectMovie } from '../../../store/actions';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  }
});

class MoviePage extends Component {
  componentDidMount() {
    this.props.getMovie(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.onSelectMovie(null);
  }

  render() {
    const { classes, movie } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        {movie && <MovieBanner movie={movie} fullDescription />}
      </div>
    );
  }
}

MoviePage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState }) => ({
  movie: movieState.selectedMovie
});

const mapDispatchToProps = { getMovie, onSelectMovie };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MoviePage));
