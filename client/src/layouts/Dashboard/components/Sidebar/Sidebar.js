import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  withStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBoxOutlined';
// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <section className={classes.root}>
        <div className={classes.logoWrapper}>
          <Link className={classes.logoLink} to="/dashboard">
            <img
              alt="Logo"
              className={classes.logoImage}
              src="/images/logos/logo.png"
            />
          </Link>
        </div>
        <Divider className={classes.logoDivider} />
        <List component="div" disablePadding>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/dashboard">
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Dashboard"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/movies">
            <ListItemIcon className={classes.listItemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Movies"
            />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/users">
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Users"
            />
          </ListItem>

          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/account">
            <ListItemIcon className={classes.listItemIcon}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Account"
            />
          </ListItem>
          {/* <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/settings">
            <ListItemIcon className={classes.listItemIcon}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Settings"
            />
          </ListItem> */}
        </List>
        <Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={
            <ListSubheader className={classes.listSubheader}>
              Support
            </ListSubheader>
          }>
          <ListItem
            className={classes.listItem}
            component="a"
            href="http://georgesimos.com"
            target="_blank">
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText
              classes={{ primary: classes.listItemText }}
              primary="Customer support"
            />
          </ListItem>
        </List>
      </section>
    );
  }
}

export default withStyles(styles)(Sidebar);
