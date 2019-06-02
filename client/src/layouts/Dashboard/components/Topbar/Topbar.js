import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Badge, Toolbar, IconButton, Typography } from '@material-ui/core';
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
    };
    render() {

        const { title, classes, ToolbarClasses, children, isSidebarOpen, onToggleSidebar } = this.props;
        return (
            <div className={`${classes.root} , ${ToolbarClasses}`}>
                <Toolbar className={classes.toolbar}>
                    <IconButton className={classes.menuButton} aria-label="Menu" onClick={onToggleSidebar}>
                        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
                        className={classes.notificationsButton}
                        onClick={() => console.log('Notification')}
                    >
                        <Badge
                            badgeContent={4}
                            color="primary"
                            variant="dot"
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <IconButton
                        className={classes.signOutButton}
                        onClick={() => console.log('Sign Out')}
                    >
                        <InputIcon />
                    </IconButton>
                </Toolbar>
                {children}
            </div >
        )
    }
}

export default withStyles(styles)(Topbar);