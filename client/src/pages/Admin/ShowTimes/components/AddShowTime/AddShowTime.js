import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import styles from './styles';
import { addShowtime, updateShowtime } from '../../../../../store/actions';

class AddShowTime extends Component {
  state = {
    startAt: '',
    startDate: null,
    endDate: null,
    movieId: '',
    cinemaId: ''
  };

  componentDidMount() {
    if (this.props.selectedShowtime) {
      const {
        startAt,
        startDate,
        endDate,
        movieId,
        cinemaId
      } = this.props.selectedShowtime;
      this.setState({
        startAt,
        startDate,
        endDate,
        movieId,
        cinemaId
      });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddShowtime = () => {
    const { startAt, startDate, endDate, movieId, cinemaId } = this.state;
    const showtime = {
      startAt,
      startDate,
      endDate,
      movieId,
      cinemaId
    };
    this.props.addShowtime(showtime);
  };

  onUpdateShowtime = () => {
    const { startAt, startDate, endDate, movieId, cinemaId } = this.state;
    const showtime = {
      startAt,
      startDate,
      endDate,
      movieId,
      cinemaId
    };
    this.props.updateShowtime(showtime, this.props.selectedShowtime._id);
  };

  render() {
    const {
      showtime,
      selectedShowtime,
      movies,
      cinemas,
      classes,
      className,
      ...rest
    } = this.props;
    const { startAt, startDate, endDate, movieId, cinemaId } = this.state;

    const rootClassName = classNames(classes.root, className);
    const title = this.props.selectedShowtime
      ? 'Edit Showtime'
      : 'Add Showtime';
    const submitButton = this.props.selectedShowtime
      ? 'Update Showtime'
      : 'Save Details';
    const submitAction = this.props.selectedShowtime
      ? () => this.onUpdateShowtime()
      : () => this.onAddShowtime();

    return (
      <div className={rootClassName} {...rest}>
        <Typography variant="h4" className={classes.title}>
          {title}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              fullWidth
              select
              className={classes.textField}
              helperText="Please specify the Time"
              label="Time"
              margin="dense"
              required
              value={startAt}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('startAt', event.target.value)
              }>
              {['18:00', '19:00', '20:00', '21:00', ' 22:00', '23:00'].map(
                time => (
                  <MenuItem key={`time-${time}`} value={time}>
                    {time}
                  </MenuItem>
                )
              )}
            </TextField>
          </div>
          <div className={classes.field}>
            <TextField
              fullWidth
              select
              className={classes.textField}
              label="Movie"
              margin="dense"
              required
              value={movieId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('movieId', event.target.value)
              }>
              {movies.map(movie => (
                <MenuItem key={movie._id} value={movie._id}>
                  {movie.title}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              className={classes.textField}
              label="Cinema"
              margin="dense"
              required
              value={cinemaId}
              variant="outlined"
              onChange={event =>
                this.handleFieldChange('cinemaId', event.target.value)
              }>
              {cinemas.map(cinema => (
                <MenuItem key={cinema._id} value={cinema._id}>
                  {cinema.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div className={classes.field}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="start-date"
                label="Start Date"
                value={startDate}
                onChange={date => this.handleFieldChange('startDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />

              <KeyboardDatePicker
                className={classes.textField}
                inputVariant="outlined"
                margin="normal"
                id="end-date"
                label="End Date"
                value={endDate}
                onChange={date => this.handleFieldChange('endDate', date._d)}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}>
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddShowTime.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ movieState, cinemasState }) => ({
  movies: movieState.movies,
  cinemas: cinemasState.cinemas
});

const mapDispatchToProps = { addShowtime, updateShowtime };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(AddShowTime));
