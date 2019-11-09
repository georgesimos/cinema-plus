import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../../../../store/actions';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

// Component styles
import styles from './styles';

class Topbar extends Component {
  static defaultProps = {
    title: 'Dashboard',
    isSidebarOpen: false
  };
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    isSidebarOpen: PropTypes.bool,
    title: PropTypes.string,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  handleSignOut = async () => {
    this.props.logout();
  };

  render() {
    const {
      classes,
      ToolbarClasses,
      children,
      isSidebarOpen,
      onToggleSidebar
    } = this.props;
    return (
      <div className={`${classes.root} , ${ToolbarClasses}`}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brandWrapper}>
            <div className={classes.logo}>Movie +</div>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={onToggleSidebar}>
              {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>

          <NavLink className={classes.title} to="/">
            Cinema App
          </NavLink>

          <IconButton
            className={classes.notificationsButton}
            onClick={() => console.log('Notification')}>
            <Badge badgeContent={4} color="primary" variant="dot">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            className={classes.signOutButton}
            onClick={this.handleSignOut}>
            <InputIcon />
          </IconButton>
        </Toolbar>
        {children}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.authState
});
export default connect(
  mapStateToProps,
  { logout }
)(withStyles(styles)(Topbar));
