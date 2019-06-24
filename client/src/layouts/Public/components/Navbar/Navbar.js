import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles, Button } from '@material-ui/core';
import history from '../../../../utils/history';
// Component styles
import styles from './styles';

class Navbar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <nav className={classes.navbar}>
        <Link className={classes.logoLink} to="/dashboard">
          <img
            className={classes.logoImage}
            alt="Logo"
            src="/images/logos/brand.svg"
          />
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

        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push('/login')}>
          Login
        </Button>
      </nav>
    );
  }
}

export default withStyles(styles)(Navbar);
