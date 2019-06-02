import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import {
    ArrowDownward as ArrowDownwardIcon,
    ArrowUpward as ArrowUpwardIcon,
    Delete as DeleteIcon
} from '@material-ui/icons';

import { DisplayMode, SearchInput } from '../../../../components';
import styles from './styles';

class UsersToolbar extends Component {
    static propTypes = {
        className: PropTypes.string,
        classes: PropTypes.object.isRequired,
        selectedUsers: PropTypes.array
    };

    static defaultProps = {
        selectedUsers: []
    };
    render() {
        const { classes, className, selectedUsers } = this.props;

        const rootClassName = classNames(classes.root, className);


        return (
            <div className={rootClassName}>
                <div className={classes.row}>
                    <span className={classes.spacer} />
                    {selectedUsers.length > 0 && (
                        <IconButton
                            className={classes.deleteButton}
                            onClick={this.handleDeleteUsers}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                    <Button
                        className={classes.importButton}
                        size="small"
                        variant="outlined"
                    >
                        <ArrowDownwardIcon className={classes.importIcon} /> Import
            </Button>
                    <Button
                        className={classes.exportButton}
                        size="small"
                        variant="outlined"
                    >
                        <ArrowUpwardIcon className={classes.exportIcon} />
                        Export
            </Button>
                    <Button
                        color="primary"
                        size="small"
                        variant="outlined"
                    >
                        Add
            </Button>
                </div>
                <div className={classes.row}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder="Search user"
                    />
                    <span className={classes.spacer} />
                    <DisplayMode mode="list" />
                </div>
            </div>
        );
    }
}


export default withStyles(styles)(UsersToolbar);
