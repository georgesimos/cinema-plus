import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import Dashboard from '../../layouts/Dashboard/Dashboard'

const styles = theme => ({
    root: {
        textAlign: 'center',
        paddingTop: theme.spacing.unit * 20,
    },
});

class DashboardPage extends Component {

    render() {
        return (
            <Dashboard title="Admin Dashboard">
            </Dashboard>
        )
    }
}

export default withStyles(styles)(DashboardPage)