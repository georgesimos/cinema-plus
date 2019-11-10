import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './components/Navbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  }
}));

function PublicLayout(props) {
  const classes = useStyles(props);
  const { children } = props;

  return (
    <div className={classes.root}>
      <Navbar />
      {children}
    </div>
  );
}

export default PublicLayout;
