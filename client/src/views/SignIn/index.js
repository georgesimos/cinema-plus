import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import {
    Grid,
    Button,
    IconButton,
    CircularProgress,
    TextField,
    Typography
} from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles';

class SignIn extends Component {
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
        submitError: null
    };

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

    handleSignIn = async () => {
        try {
            const { history } = this.props;
            const { values } = this.state;

            this.setState({ isLoading: true });

            const body = { username: values.username, password: values.password }
            const url = 'http://localhost:3001/users/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            if (response.ok) {
                console.log(response)
                const responseData = await response.json()
                // Save to localStorage
                const { token } = responseData;
                // Set token to localStorage
                localStorage.setItem("jwtToken", token);
                history.push('/dashboard');
            } else {
                const responseData = await response.json()
                // Save to state
                const { error } = responseData;
                this.setState({
                    isLoading: false,
                    submitError: error
                });
            }
        } catch (error) {
            this.setState({
                isLoading: false,
                serviceError: error
            });
        }

    };

    render() {
        const { classes } = this.props;
        const {
            values,
            isValid,
            submitError,
            isLoading
        } = this.state;


        return (
            <div className={classes.root}>
                <Grid
                    className={classes.grid}
                    container
                >
                    <Grid
                        className={classes.quoteWrapper}
                        item
                        lg={5}
                    >
                        <div className={classes.quote}>
                            <div className={classes.quoteInner}>
                                <Typography
                                    className={classes.quoteText}
                                    variant="h1"
                                >
                                    Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                                    they sold out High Life.
                </Typography>
                                <div className={classes.person}>
                                    <Typography
                                        className={classes.name}
                                        variant="body1"
                                    >
                                        Takamaru Ayako
                  </Typography>
                                    <Typography
                                        className={classes.bio}
                                        variant="body2"
                                    >
                                        Manager at inVision
                  </Typography>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid
                        className={classes.content}
                        item
                        lg={7}
                        xs={12}
                    >
                        <div className={classes.content}>
                            <div className={classes.contentHeader}>
                                <IconButton
                                    className={classes.backButton}
                                    onClick={this.handleBack}
                                >
                                    <ArrowBackIcon />
                                </IconButton>
                            </div>
                            <div className={classes.contentBody}>
                                <form className={classes.form}>
                                    <Typography
                                        className={classes.title}
                                        variant="h2"
                                    >
                                        Sign in
                  </Typography>

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
                                        <Typography
                                            className={classes.submitError}
                                            variant="body2"
                                        >
                                            {submitError.message}
                                        </Typography>
                                    )}
                                    {isLoading ? (
                                        <CircularProgress className={classes.progress} />
                                    ) : (
                                            <Button
                                                className={classes.signInButton}
                                                color="primary"
                                                disabled={!isValid}
                                                onClick={this.handleSignIn}
                                                size="large"
                                                variant="contained"
                                            >
                                                Sign in now
                    </Button>
                                        )}
                                    <Typography
                                        className={classes.signUp}
                                        variant="body1"
                                    >
                                        Don't have an account?{' '}
                                        <Link
                                            className={classes.signUpUrl}
                                            to="/sign-up"
                                        >
                                            Sign up
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

SignIn.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withStyles(styles)(SignIn);
