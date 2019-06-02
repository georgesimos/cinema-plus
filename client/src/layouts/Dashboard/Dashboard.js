import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Drawer } from '@material-ui/core';
import Topbar from './components/Topbar/Topbar';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

// Component styles
import styles from './styles';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }
    static defaultProps = {
        isSidebarOpen: false
    };
    static propTypes = {
        children: PropTypes.node,
        isSidebarOpen: PropTypes.bool,
        title: PropTypes.string,
    };

    handleToggleOpen = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }

    handleClose = () => {
        this.setState({ isOpen: false })
    }

    render() {
        const { isOpen } = this.state;
        const { title, children, classes } = this.props;
        return (
            <Fragment>
                <Topbar
                    title={title}
                    ToolbarClasses={`${classes.topbar}, ${isOpen && classes.topbarShift}`}
                    isSidebarOpen={isOpen}
                    onToggleSidebar={this.handleToggleOpen} />
                <Drawer
                    anchor="left"
                    classes={{ paper: classes.drawerPaper }}
                    open={isOpen}
                    onClose={this.handleClose}
                    variant='persistent'
                >
                    <Sidebar className={classes.sidebar} />
                </Drawer>
                <main className={`${classes.root}, ${isOpen && classes.contentShift}`}>
                    {children}
                    <Footer />
                </main>
            </Fragment>
        )
    }
}

export default withStyles(styles)(Dashboard);