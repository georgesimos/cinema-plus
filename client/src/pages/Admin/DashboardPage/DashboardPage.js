import React, { Component } from 'react';
import { withStyles, Grid } from '@material-ui/core';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import {
  TotalUsers,
  TotalCinemas,
  TotalMovies,
  TotalReservations,
  LatestSales,
  UsersByDevice
} from './components';

const styles = theme => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(4)
  }
});

class DashboardPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Dashboard title="Admin Dashboard">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalUsers users={'20'} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCinemas cinemas={'10'} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalMovies movies={'100'} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalReservations reservations={'10'} />
            </Grid>
            <Grid item lg={8} md={12} xl={9} xs={12}>
              <LatestSales />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <UsersByDevice />
            </Grid>
          </Grid>
        </div>
      </Dashboard>
    );
  }
}

export default withStyles(styles)(DashboardPage);
