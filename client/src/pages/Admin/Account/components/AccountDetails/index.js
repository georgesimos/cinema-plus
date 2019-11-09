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
    name: '',
    email: '',
    phone: '',
    password: '',
    city: 'Athens',
    country: 'Greece'
  };

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      const { name, email, phone } = this.props.user;
      this.setState({ name, email, phone });
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
      const { name, email, phone, password } = this.state;
      const token = localStorage.getItem('jwtToken');
      const body = { name, email, phone, password };
      const url = '/users/me';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        const user = await response.json();
        console.log(user, this.props);
        if (this.props.file) this.props.uploadImage(user._id, this.props.file);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes, className } = this.props;
    const { name, phone, state, country, email, password } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
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
                label="FUll Name"
                margin="dense"
                required
                value={name}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('name', event.target.value)
                }
              />
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
            </div>
            <div className={classes.field}>
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
              <TextField
                className={classes.textField}
                label="Password"
                margin="dense"
                type="password"
                value={password}
                variant="outlined"
                onChange={event =>
                  this.handleFieldChange('password', event.target.value)
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
