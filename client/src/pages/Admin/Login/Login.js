import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { login, facebookLogin } from '../../../store/actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
  Button,
  IconButton,
  CircularProgress,
  TextField,
  Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import config from '../../../config.json';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  },

  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },

  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  socialLogin: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4, 0)
  },
  facebookButton: {
    marginTop: theme.spacing(3),
    width: '100%'
  },

  googleButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    width: '100%'
  },
  form: {
    paddingLeft: '100px',
    paddingRight: '100px',
    paddingBottom: '125px',
    flexBasis: '700px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5)
  },
  fields: {
    marginTop: theme.spacing(2)
  },
  textField: {
    width: '100%',
    '& + & ': {
      marginTop: theme.spacing(2)
    }
  },
  progress: {
    display: 'block',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loginButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  register: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  registerUrl: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  fieldError: {
    color: theme.palette.danger.main,
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1)
  },
  submitError: {
    color: theme.palette.danger.main,
    alignText: 'center',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});

class Login extends Component {
  state = {
    values: {
      username: '',
      password: ''
    },
    touched: {
      username: false,
      password: false
    },
    errors: {
      username: null,
      password: null
    },
    isValid: true,
    isLoading: false,
    submitError: null,
    isLogin: false
  };

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.isAuthenticated !== this.props.isAuthenticated &&
      this.props.isAuthenticated
    ) {
      const { history, user } = this.props;
      if (user && user.role === 'superadmin')
        return history.push('/admin/dashboard');
      return history.push('/');
    }
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState);
  };

  handleLogin = async () => {
    const { values } = this.state;
    this.props.login(values.username, values.password);
  };

  googleResponse = async e => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: e.accessToken }, null, 2)],
      { type: 'applocation/json' }
    );
    const options = {
      method: 'POST',
      body: tokenBlob
    };
    const url = '/users/login/google';
    const response = await fetch(url, options);
    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
    }
  };

  onFailure = error => {
    alert(error);
  };

  render() {
    const { classes, facebookLogin } = this.props;
    const { values, isValid, submitError, isLoading } = this.state;

    return (
      <div className={classes.root}>
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
                Sign in
              </Typography>

              <div className={classes.socialLogin}>
                <FacebookLogin
                  buttonStyle={{ width: '100%' }}
                  appId={config.FACEBOOK_APP_ID} //APP ID NOT CREATED YET
                  fields="name,email,picture"
                  callback={facebookLogin}
                />
                <GoogleLogin
                  className={classes.googleButton}
                  clientId={config.GOOGLE_CLIENT_ID} //CLIENTID NOT CREATED YET
                  buttonText="LOGIN WITH GOOGLE"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                />
              </div>

              <div className={classes.fields}>
                <TextField
                  className={classes.textField}
                  label="username"
                  name="username"
                  onChange={event =>
                    this.handleFieldChange('username', event.target.value)
                  }
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  label="Password"
                  name="password"
                  onChange={event =>
                    this.handleFieldChange('password', event.target.value)
                  }
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
              </div>
              {submitError && (
                <Typography className={classes.submitError} variant="body2">
                  {submitError.message}
                </Typography>
              )}
              {isLoading ? (
                <CircularProgress className={classes.progress} />
              ) : (
                <Button
                  className={classes.loginButton}
                  color="primary"
                  disabled={!isValid}
                  onClick={this.handleLogin}
                  size="large"
                  variant="contained">
                  Login now
                </Button>
              )}
              <Typography className={classes.register} variant="body1">
                Don't have an account?{' '}
                <Link className={classes.registerUrl} to="/register">
                  register
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});
export default connect(
  mapStateToProps,
  { login, facebookLogin }
)(withStyles(styles)(Login));
