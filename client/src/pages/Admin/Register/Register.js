import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../store/actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles';

class Register extends Component {
  state = {
    values: {
      name: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      policy: false
    },
    touched: {
      name: false,
      userName: false,
      email: false,
      password: false,
      policy: null
    },
    errors: {
      name: null,
      userName: null,
      email: null,
      password: null,
      policy: null
    },
    isValid: true,
    isLoading: false,
    submitError: null
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isAuthenticated !== this.props.isAuthenticated &&
      this.props.isAuthenticated
    ) {
      const { history } = this.props;
      history.push('/login');
    }
  }

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState);
  };

  handleRegister = async () => {
    const { values } = this.state;
    const body = {
      name: values.name,
      username: values.userName,
      email: values.email,
      password: values.password
    };
    console.log(body);
    this.props.register(body);
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      errors,
      touched,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showPolicyError =
      touched.policy && errors.policy ? errors.policy[0] : false;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.content}>
              <div className={classes.contentHeader}>
                <IconButton
                  className={classes.backButton}
                  onClick={this.handleBack}>
                  <ArrowBackIcon />
                </IconButton>
              </div>
              <div className={classes.contentBody}>
                <form className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    Create new account
                  </Typography>
                  <Typography className={classes.subtitle} variant="body1">
                    Use your work email to create new account... it's free.
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Full name"
                      name="name"
                      onChange={event =>
                        this.handleFieldChange('name', event.target.value)
                      }
                      value={values.name}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="User name"
                      name="userName"
                      onChange={event =>
                        this.handleFieldChange('userName', event.target.value)
                      }
                      value={values.userName}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      value={values.email}
                      variant="outlined"
                    />

                    <TextField
                      className={classes.textField}
                      label="Password"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />

                    <div className={classes.policy}>
                      <Checkbox
                        checked={values.policy}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={() =>
                          this.handleFieldChange('policy', !values.policy)
                        }
                      />
                      <Typography
                        className={classes.policyText}
                        variant="body1">
                        I have read the &nbsp;
                        <Link className={classes.policyUrl} to="#">
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                    </div>
                    {showPolicyError && (
                      <Typography
                        className={classes.fieldError}
                        variant="body2">
                        {errors.policy[0]}
                      </Typography>
                    )}
                  </div>
                  {submitError && (
                    <Typography className={classes.submitError} variant="body2">
                      {submitError}
                    </Typography>
                  )}
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.registerButton}
                      color="primary"
                      disabled={!isValid}
                      onClick={this.handleRegister}
                      size="large"
                      variant="contained">
                      Register now
                    </Button>
                  )}
                  <Typography className={classes.login} variant="body1">
                    Have an account?{' '}
                    <Link className={classes.loginUrl} to="/login">
                      Login
                    </Link>
                  </Typography>
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    { register }
  )(Register)
);
