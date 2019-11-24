import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../../store/actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Button,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles';
import FileUpload from '../../../components/FileUpload/FileUpload';

class Register extends Component {
  state = {
    values: {
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      image: null,
      policy: false
    }
  };

  componentDidUpdate(prevProps) {
    const { isAuthenticated, history } = this.props;
    if (prevProps.isAuthenticated !== isAuthenticated || isAuthenticated)
      history.push('/');
  }

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState.values[field] = value;
    this.setState(newState);
  };

  handleRegister = () => {
    const newUser = this.state.values;
    this.props.register(newUser);
  };

  render() {
    const { classes } = this.props;
    const { values } = this.state;

    const isValid = values.policy;

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
                    Use your email to create new account... it's free.
                  </Typography>
                  <div className={classes.fields}>
                    <TextField
                      className={classes.textField}
                      label="Full name"
                      name="name"
                      value={values.name}
                      onChange={event =>
                        this.handleFieldChange('name', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="User name"
                      name="username"
                      value={values.username}
                      onChange={event =>
                        this.handleFieldChange('username', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Email address"
                      name="email"
                      value={values.email}
                      onChange={event =>
                        this.handleFieldChange('email', event.target.value)
                      }
                      variant="outlined"
                    />
                    <TextField
                      className={classes.textField}
                      label="Mobile Phone"
                      name="phone"
                      value={values.phone}
                      variant="outlined"
                      onChange={event =>
                        this.handleFieldChange('phone', event.target.value)
                      }
                    />
                    <TextField
                      className={classes.textField}
                      label="Password"
                      type="password"
                      value={values.password}
                      variant="outlined"
                      onChange={event =>
                        this.handleFieldChange('password', event.target.value)
                      }
                    />
                    <FileUpload
                      className={classes.upload}
                      file={values.image}
                      onUpload={event => {
                        const file = event.target.files[0];
                        this.handleFieldChange('image', file);
                      }}
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
                  </div>

                  <Button
                    className={classes.registerButton}
                    color="primary"
                    disabled={!isValid}
                    onClick={this.handleRegister}
                    size="large"
                    variant="contained">
                    Register now
                  </Button>

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

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated
});

export default withStyles(styles)(
  connect(mapStateToProps, { register })(Register)
);
