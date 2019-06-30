import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { withStyles, Button, Typography } from '@material-ui/core';
import history from '../../../../utils/history';
// Component styles
import styles from './styles';

class Navbar extends Component {
  state = { showMenu: false };
  render() {
    const { showMenu } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <nav className={classes.navbar}>
          <Link className={classes.logoLink} to="/dashboard">
            <Typography className={classes.logo} variant="h1">
              Movie App
            </Typography>
          </Link>
          <div className={classes.navLinks}>
            <Link className={classes.navLink} to="/admin/users">
              Users
            </Link>
            <Link className={classes.navLink} to="/admin/account">
              Account
            </Link>
            <Link className={classes.navLink} to="/admin/dashboard">
              Dashboard
            </Link>
          </div>

          <div
            className={classes.navBtn}
            onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
            <div className={classes.navIcon}>
              <div
                className={classnames(
                  classes.navIconLine,
                  classes.navIconLine__left
                )}
              />
              <div className={classes.navIconLine} />
              <div
                className={classnames(
                  classes.navIconLine,
                  classes.navIconLine__right
                )}
              />
            </div>
          </div>
        </nav>
        <div
          className={classnames({
            [classes.navActive]: showMenu,
            [classes.nav]: true
          })}>
          <div className={classes.navContent}>
            <ul className="nav__list" />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Navbar);
