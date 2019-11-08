import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid, Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import LoginForm from './components/LoginForm';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100vh'
  },
  grid: {
    height: '100%'
  },
  bgWrapper: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  bg: {
    backgroundColor: theme.palette.common.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(https://source.unsplash.com/featured/?cinema)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    opacity: 0.5
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
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
  }
});

class Login extends Component {
  state = { file: null };
  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  onChangeHandler = event => {
    const file = event.target.files[0];
    this.setState({ file });
  };

  sendFile = async () => {
    const { file } = this.state;
    console.log(file);
    const data = new FormData();
    data.append('file', file);
    console.log(data);
    const url = '/profile/';
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    if (response.ok) {
      console.log('uploaded');
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.contentHeader}>
              <IconButton
                className={classes.backButton}
                onClick={this.handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <input type="file" name="file" onChange={this.onChangeHandler} />
              <Button onClick={this.sendFile}>Send</Button>
              <LoginForm redirect />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
