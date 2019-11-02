import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import Dashboard from '../../../layouts/Dashboard/Dashboard';
import styles from './styles';
import { ShowTimesToolbar, ShowTimesTable } from './components';
import {
  getShowtimes,
  toggleDialog,
  selectShowtime,
  selectAllShowtimes,
  deleteShowtime
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import AddShowTime from './components/AddShowTime/AddShowTime';

class ShowTimes extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getShowtimes();
  }

  handleDeleteShowtime = () => {
    const { selectedShowtimes, deleteShowtime } = this.props;
    selectedShowtimes.forEach(element => deleteShowtime(element));
  };

  render() {
    const {
      classes,
      showtimes,
      selectedShowtimes,
      openDialog,
      toggleDialog,
      selectShowtime,
      selectAllShowtimes
    } = this.props;

    return (
      <Dashboard title="showtimes">
        <div className={classes.root}>
          <ShowTimesToolbar
            showtimes={showtimes}
            toggleDialog={toggleDialog}
            selectedShowtimes={selectedShowtimes}
            deleteShowtime={this.handleDeleteShowtime}
          />
          <div className={classes.content}>
            {!showtimes.length ? (
              <Typography variant="h6">There are no showtimes</Typography>
            ) : (
              <ShowTimesTable
                onSelectShowtime={selectShowtime}
                selectedShowtimes={selectedShowtimes}
                selectAllShowtimes={selectAllShowtimes}
                showtimes={showtimes}
              />
            )}
          </div>
        </div>
        <ResponsiveDialog
          id="Add-showtime"
          open={openDialog}
          handleClose={() => toggleDialog()}>
          <AddShowTime
            selectedShowtime={showtimes.find(
              showtime => showtime._id === selectedShowtimes[0]
            )}
          />
        </ResponsiveDialog>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ showtimesState }) => ({
  openDialog: showtimesState.openDialog,
  showtimes: showtimesState.showtimes,
  selectedShowtimes: showtimesState.selectedShowtimes
});

const mapDispatchToProps = {
  getShowtimes,
  toggleDialog,
  selectShowtime,
  selectAllShowtimes,
  deleteShowtime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ShowTimes));
