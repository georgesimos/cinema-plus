// @ts-nocheck
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import AllMovieList from '../MoviePage/components/AllMovieList/AllMovieList';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  }
}));

function LatestMovie(props) {
  const classes = useStyles(props);
  return (
    <div className={classes.root}>
      <Navbar />
      <AllMovieList />
    </div>
  );
}

export default LatestMovie;
