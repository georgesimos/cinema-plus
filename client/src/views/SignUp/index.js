import React, { Component } from 'react';
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
// Service methods
const signUp = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, 1500);
    });
};

class SignUp extends Component {
    state = {
        values: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            policy: false
        },
        touched: {
            firstName: false,
            lastName: false,
            userName: false,
            email: false,
            password: false,
            policy: null
        },
        errors: {
            firstName: null,
            lastName: null,
            userName: null,
            email: null,
            password: null,
            policy: null
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

    handleSignUp = async () => {
        try {
            const { history } = this.props;
            const { values } = this.state;

            this.setState({ isLoading: true });

            const body = {
                firstname: values.firstName,
                lastname: values.lastName,
                username: values.userName,
                email: values.email,
                password: values.password
            }
            const url = 'http://localhost:3001/users';
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
                history.push('/sign-in');
            } else {
                const responseData = await response.json()
                // Save to state
                const { message } = responseData;
                this.setState({
                    isLoading: false,
                    submitError: message
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
                                        Create new account
                  </Typography>
                                    <Typography
                                        className={classes.subtitle}
                                        variant="body1"
                                    >
                                        Use your work email to create new account... it's free.
                  </Typography>
                                    <div className={classes.fields}>
                                        <TextField
                                            className={classes.textField}
                                            label="First name"
                                            name="firstName"
                                            onChange={event =>
                                                this.handleFieldChange('firstName', event.target.value)
                                            }
                                            value={values.firstName}
                                            variant="outlined"
                                        />

                                        <TextField
                                            className={classes.textField}
                                            label="Last name"
                                            name="lastName"
                                            onChange={event =>
                                                this.handleFieldChange('lastName', event.target.value)
                                            }
                                            value={values.lastName}
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
                                                variant="body1"
                                            >
                                                I have read the &nbsp;
                        <Link
                                                    className={classes.policyUrl}
                                                    to="#"
                                                >
                                                    Terms and Conditions
                        </Link>
                                                .
                      </Typography>
                                        </div>
                                        {showPolicyError && (
                                            <Typography
                                                className={classes.fieldError}
                                                variant="body2"
                                            >
                                                {errors.policy[0]}
                                            </Typography>
                                        )}
                                    </div>
                                    {submitError && (
                                        <Typography
                                            className={classes.submitError}
                                            variant="body2"
                                        >
                                            {submitError}
                                        </Typography>
                                    )}
                                    {isLoading ? (
                                        <CircularProgress className={classes.progress} />
                                    ) : (
                                            <Button
                                                className={classes.signUpButton}
                                                color="primary"
                                                disabled={!isValid}
                                                onClick={this.handleSignUp}
                                                size="large"
                                                variant="contained"
                                            >
                                                Sign up now
                    </Button>
                                        )}
                                    <Typography
                                        className={classes.signIn}
                                        variant="body1"
                                    >
                                        Have an account?{' '}
                                        <Link
                                            className={classes.signInUrl}
                                            to="/sign-in"
                                        >
                                            Sign In
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

SignUp.propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
