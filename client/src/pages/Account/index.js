import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Dashboard from '../../layouts/Dashboard/Dashboard';
import { AccountProfile, AccountDetails } from './components';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 4
  }
});

class Account extends Component {
  signal = true;
  state = { user: {} };
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.signal = true;
    this.getUserProfile();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  getUserProfile = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = 'http://localhost:3001/users/me';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok && this.signal) {
        const user = await response.json();
        this.setState({ user });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          error
        });
      }
    }
  };

  render() {
    const { user } = this.state;
    const { classes } = this.props;

    return (
      <Dashboard title="My Account">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} md={6} xl={4} xs={12}>
              <AccountProfile user={user} />
            </Grid>
            <Grid item lg={8} md={6} xl={8} xs={12}>
              <AccountDetails user={user} />
            </Grid>
          </Grid>
        </div>
      </Dashboard>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
