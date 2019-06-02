import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Divider, Typography } from '@material-ui/core';

// Component styles
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 4
    },
    company: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 0.5
    }
});

class Footer extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Divider />
                <Typography
                    className={classes.company}
                    variant="body1"
                >
                    &copy; George Simos. 2019
        </Typography>
                <Typography variant="caption">
                    Created with love for by George Simos...
        </Typography>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
