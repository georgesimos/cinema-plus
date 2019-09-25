import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../../components';

// Component styles
import styles from './styles';

const states = [
  {
    value: 'athens',
    label: 'Athens'
  },
  {
    value: 'pallini',
    label: 'Pallini'
  },
  {
    value: 'chalandri',
    label: 'Chalandri'
  }
];

class Account extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: 'Athens',
    country: 'Greece'
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const { firstname, lastname, email } = this.props.user;
      this.setState({ firstname, lastname, email });
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

  onUpdateUser = async () => {
    try {
      const { firstname, lastname, email } = this.state;
      const token = localStorage.getItem('jwtToken');
      const body = { firstname, lastname, email };
      const url = '/users/me';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok && this.signal) {
        const user = await response.json();
        console.log(user);
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
    const { user, classes, className, ...rest } = this.props;
    const { firstname, lastname, phone, state, country, email } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet {...rest} className={rootClassName}>
        <PortletHeader>
          <PortletLabel
            subtitle="The information can be edited"
            title="Profile"
          />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the first name"
                label="First name"
                margin="dense"
                required
                value={firstname}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('firstname', event.target.value)
                }
              />
              <TextField
                className={classes.textField}
                label="Last name"
                margin="dense"
                required
                value={lastname}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('lastname', event.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                required
                value={email}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('email', event.target.value)
                }
              />
              <TextField
                className={classes.textField}
                label="Phone Number"
                margin="dense"
                type="number"
                value={phone}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('phone', event.target.value)
                }
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="Select State"
                margin="dense"
                onChange={this.handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={state}
                variant="outlined">
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                className={classes.textField}
                label="Country"
                margin="dense"
                required
                value={country}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('country', event.target.value)
                }
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button
            color="primary"
            variant="contained"
            onClick={this.onUpdateUser}>
            Save details
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
