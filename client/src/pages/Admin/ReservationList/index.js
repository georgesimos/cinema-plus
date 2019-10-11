import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import styles from './styles';
import { ReservationsToolbar, ReservationsTable } from './components';

class ReservationList extends Component {
  signal = true;
  state = {
    isLoading: false,
    limit: 10,
    reservations: [],
    error: null
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.signal = true;
    this.getReservations();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  getReservations = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/reservations';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok && this.signal) {
        const reservations = await response.json();
        this.setState({ isLoading: false, reservations });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  };

  renderReservations() {
    const { classes } = this.props;
    const { isLoading, reservations, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (reservations.length === 0) {
      return <Typography variant="h6">There are no reservations</Typography>;
    }

    return <ReservationsTable reservations={reservations} />;
  }
  render() {
    const { classes } = this.props;
    const { reservations } = this.state;

    return (
      <Dashboard title="Users">
        <div className={classes.root}>
          <ReservationsToolbar reservations={reservations} />
          <div className={classes.content}>{this.renderReservations()}</div>
        </div>
      </Dashboard>
    );
  }
}
export default withStyles(styles)(ReservationList);
