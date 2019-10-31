import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, CircularProgress, Typography } from '@material-ui/core';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import styles from './styles';
import { ShowTimesToolbar, ShowTimesTable } from './components';

class ShowTimes extends Component {
  state = {
    showtimes: [],
    selectedShowtimes: []
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.getShowtimes();
  }

  getShowtimes = async () => {
    try {
      const url = '/showtimes/';
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const showtimes = await response.json();
      console.log(showtimes);
      if (response.ok) {
        this.setState({
          showtimes
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteShowtime = async id => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/showtimes/' + id;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        this.setState({
          showtimes: this.state.showtimes.filter(
            showtime => showtime._id !== id
          ),
          selectedShowtimes: []
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSelect = selectedShowtimes => {
    this.setState({ selectedShowtimes });
  };

  renderShowtimes() {
    const { showtimes } = this.state;

    if (showtimes.length === 0) {
      return <Typography variant="h6">There are no showtimes</Typography>;
    }

    return (
      <ShowTimesTable onSelect={this.handleSelect} showtimes={showtimes} />
    );
  }
  render() {
    const { classes } = this.props;
    const { showtimes, selectedShowtimes } = this.state;

    return (
      <Dashboard title="showtimes">
        <div className={classes.root}>
          <ShowTimesToolbar
            showtimes={showtimes}
            selectedShowtimes={selectedShowtimes}
            deleteShowtime={this.handleDeleteShowtime}
          />
          <div className={classes.content}>{this.renderShowtimes()}</div>
        </div>
      </Dashboard>
    );
  }
}
export default withStyles(styles)(ShowTimes);
