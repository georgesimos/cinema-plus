import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Navbar from '../../layouts/Public/components/Navbar/Navbar';
import MovieList from './components/MovieList/MovieList';

class LandingPage extends Component {
  componentDidMount() {
    this.addPageCursors();
  }

  addPageCursors() {
    let cursor1, cursor2, cursor3;
    cursor1 = document.getElementById('cursor');
    cursor2 = document.getElementById('cursor2');
    cursor3 = document.getElementById('cursor3');
    //Page cursors
    document
      .getElementsByTagName('body')[0]
      .addEventListener('mousemove', function(event) {
        cursor1.style.left = event.clientX + 'px';
        cursor1.style.top = event.clientY + 'px';
        cursor2.style.left = event.clientX + 'px';
        cursor2.style.top = event.clientY + 'px';
        cursor3.style.left = event.clientX + 'px';
        cursor3.style.top = event.clientY + 'px';
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <MovieList />
        </div>

        <div className="cursor" id="cursor" />
        <div className="cursor2" id="cursor2" />
        <div className="cursor3" id="cursor3" />
      </Fragment>
    );
  }
}

LandingPage.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(LandingPage);
