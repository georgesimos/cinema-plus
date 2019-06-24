import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Navbar from '../../layouts/Public/components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';

class LandingPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <MovieList />
      </div>
    );
  }
}

LandingPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);
