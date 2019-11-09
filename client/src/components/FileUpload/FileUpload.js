import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Button } from '@material-ui/core';
import Paper from '../Paper';

// Component styles
const styles = theme => ({
  root: {
    padding: theme.spacing(2)
  },
  input: {
    display: 'none'
  },
  button: {
    minWidth: 100,
    marginRight: theme.spacing(2)
  }
});

const FileUpload = props => {
  const { classes, className, file, onUpload } = props;
  const rootClassName = classNames(
    {
      [classes.root]: true
    },
    className
  );

  return (
    <Paper className={rootClassName}>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={onUpload}
      />
      <label htmlFor="icon-button-file">
        <Button variant="outlined" className={classes.button} component="span">
          Upload
        </Button>
      </label>
      <span>{file ? file.name : 'No file selected'}</span>
    </Paper>
  );
};

FileUpload.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool
};

FileUpload.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 0
};

export default withStyles(styles)(FileUpload);
