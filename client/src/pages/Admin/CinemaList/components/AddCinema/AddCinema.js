import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../../components';
import styles from './styles';
import { Add } from '@material-ui/icons';

class AddCinema extends Component {
  state = {
    name: '',
    image: '',
    ticketPrice: '',
    city: '',
    seatsAvailable: '',
    seats: [],
    status: ''
  };

  componentDidMount() {
    if (this.props.edit) {
      this.setState(this.props.edit);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cinema !== this.props.cinema) {
      const { name, city, seatsAvailable, ticketPrice } = this.props.cinema;
      this.setState({ name, city, seatsAvailable, ticketPrice });
    }
  }
  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddCinema = async () => {
    try {
      const {
        name,
        image,
        ticketPrice,
        city,
        seatsAvailable,
        seats
      } = this.state;
      const token = localStorage.getItem('jwtToken');
      const body = {
        name,
        image,
        ticketPrice,
        city,
        seatsAvailable,
        seats
      };
      const url = '/cinemas/';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        this.setState({
          status: 'success'
        });
      }
    } catch (error) {
      this.setState({
        error,
        status: 'fail'
      });
    }
  };

  onUpdateCinema = async () => {
    try {
      const {
        name,
        image,
        ticketPrice,
        city,
        seatsAvailable,
        seats
      } = this.state;
      const token = localStorage.getItem('jwtToken');
      const body = {
        name,
        image,
        ticketPrice,
        city,
        seatsAvailable,
        seats
      };
      const url = '/cinemas/' + this.state._id;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        this.setState({
          status: 'success'
        });
      }
    } catch (error) {
      this.setState({
        error,
        status: 'fail'
      });
    }
  };

  onRemoveCinema = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/cinemas/' + this.state._id;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        this.setState({
          status: 'success'
        });
      }
    } catch (error) {
      this.setState({
        error,
        status: 'fail'
      });
    }
  };

  handleSeatsChange = (index, value) => {
    if (value > 10) return;
    const { seats } = this.state;
    seats[index] = Array.from({ length: value }, () => 0);
    this.setState({
      seats
    });
  };

  onAddSeatRow = () => {
    this.setState(prevState => ({
      seats: [...prevState.seats, []]
    }));
  };

  renderSeatFields = () => {
    const { seats } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.field}>
          <Button onClick={() => this.onAddSeatRow()}>
            <Add /> add Seats
          </Button>
        </div>
        {seats.length > 0 &&
          seats.map((seat, index) => (
            <div className={classes.field}>
              <TextField
                key={`new-seat-${index}`}
                className={classes.textField}
                label={
                  'Add number of seats for row : ' +
                  (index + 10).toString(36).toUpperCase()
                }
                margin="dense"
                required
                value={seat.length}
                variant="outlined"
                type="number"
                inputProps={{
                  min: 0,
                  max: 10
                }}
                onChange={event =>
                  this.handleSeatsChange(index, event.target.value)
                }
              />
            </div>
          ))}
      </>
    );
  };

  render() {
    const { cinema, classes, className, ...rest } = this.props;
    const {
      name,
      image,
      ticketPrice,
      city,
      seatsAvailable,
      status
    } = this.state;

    console.log(this.state);
    const rootClassName = classNames(classes.root, className);
    const mainTitle = this.props.edit ? 'Edit Cinema' : 'Add Cinema';
    const submitButton = this.props.edit ? 'Update Cinema' : 'Save Details';
    const submitAction = this.props.edit
      ? () => this.onUpdateCinema()
      : () => this.onAddCinema();

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel title={mainTitle} />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the cinema name"
                label="Name"
                margin="dense"
                required
                value={name}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('name', event.target.value)
                }
              />

              <TextField
                fullWidth
                className={classes.textField}
                label="City"
                margin="dense"
                required
                variant="outlined"
                value={city}
                onChange={event =>
                  this.handleFieldChange('city', event.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Image Url"
                margin="dense"
                required
                value={image}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('image', event.target.value)
                }
              />
            </div>

            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Ticket Price"
                margin="dense"
                type="number"
                value={ticketPrice}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('ticketPrice', event.target.value)
                }
              />
              <TextField
                className={classes.textField}
                label="Seats Available"
                margin="dense"
                required
                value={seatsAvailable}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('seatsAvailable', event.target.value)
                }
              />
            </div>
            {this.renderSeatFields()}
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            className={classes.buttonFooter}
            color="primary"
            variant="contained"
            onClick={submitAction}>
            {submitButton}
          </Button>
          {this.props.edit && (
            <Button
              className={classes.buttonFooter}
              color="dafault"
              variant="contained"
              onClick={this.onRemoveCinema}>
              Delete Cinema
            </Button>
          )}

          {status ? (
            status === 'success' ? (
              <Typography
                className={classes.infoMessage}
                color="primary"
                variant="caption">
                Cinema have been saved!
              </Typography>
            ) : (
              <Typography
                className={classes.infoMessage}
                color="error"
                variant="caption">
                Cinema have not been saved, try again.
              </Typography>
            )
          ) : null}
        </PortletFooter>
      </Portlet>
    );
  }
}

AddCinema.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  cinema: PropTypes.object.isRequired
};

export default withStyles(styles)(AddCinema);
