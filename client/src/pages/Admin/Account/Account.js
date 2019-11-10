import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { AccountProfile, AccountDetails } from './components';
import { uploadImage } from '../../../store/actions';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(4)
  }
});

class Account extends Component {
  signal = true;
  state = { user: {}, image: null };
  static propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.signal = true;

    this.getUserProfile();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  getUserProfile = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const url = '/users/me';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok && this.signal) {
        const user = await response.json();
        this.setState({ user });
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
    const { user, image } = this.state;
    const { classes, uploadImage } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <AccountProfile
              file={image}
              user={user}
              onUpload={event => {
                const file = event.target.files[0];
                this.setState({ image: file });
              }}
            />
          </Grid>
          <Grid item lg={8} md={6} xl={8} xs={12}>
            <AccountDetails
              file={image}
              user={user}
              uploadImage={uploadImage}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { uploadImage }
)(withStyles(styles)(Account));
