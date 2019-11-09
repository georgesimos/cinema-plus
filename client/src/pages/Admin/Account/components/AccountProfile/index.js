import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core';
import { Avatar, Typography, Button } from '@material-ui/core';
import {
  Portlet,
  PortletContent,
  PortletFooter
} from '../../../../../components';

// Component styles
import styles from './styles';

class AccountProfile extends Component {
  render() {
    const { user, classes, className, file, onUpload } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent>
          <div className={classes.details}>
            <div className={classes.info}>
              <Typography variant="h2">{user.name}</Typography>
              <Typography className={classes.emailText} variant="body1">
                {user.email}
              </Typography>
              <Typography className={classes.dateText} variant="body1">
                Join at: {moment(user.createdAt).format('DD/MM/YYYY')}
              </Typography>
            </div>
            <Avatar
              className={classes.avatar}
              src={user.imageurl ? user.imageurl : '/images/avatars/avatar.png'}
            />
          </div>
        </PortletContent>
        <PortletFooter>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={onUpload}
          />
          <label htmlFor="icon-button-file">
            <Button
              className={classes.uploadButton}
              component="span"
              color="primary"
              variant="text">
              Upload picture
            </Button>
          </label>
          <span>{file && file.name}</span>
        </PortletFooter>
      </Portlet>
    );
  }
}

AccountProfile.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);
