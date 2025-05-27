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
  },
  preview: {
    marginTop: theme.spacing(2),
    maxWidth: '100%',
    maxHeight: '200px',
    objectFit: 'contain'
  },
  previewContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center'
  }
});

const FileUpload = props => {
  const { classes, className, file, preview, onUpload } = props;
  const rootClassName = classNames(
    {
      [classes.root]: true
    },
    className
  );

  // Определяем, является ли превью полным URL или data URL
  const isFullUrl = preview && !preview.startsWith('data:');

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
          {file ? 'Изменить' : 'Загрузить'}
        </Button>
      </label>
      <span>{file ? file.name : (isFullUrl ? 'Изображение загружено' : 'Файл не выбран')}</span>
      {preview && (
        <div className={classes.previewContainer}>
          <img 
            src={preview} 
            alt="Preview" 
            className={classes.preview}
            onError={(e) => {
              console.error('Error loading image:', e);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </Paper>
  );
};

FileUpload.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  elevation: PropTypes.number,
  outlined: PropTypes.bool,
  squared: PropTypes.bool,
  file: PropTypes.object,
  preview: PropTypes.string,
  onUpload: PropTypes.func.isRequired
};

FileUpload.defaultProps = {
  squared: false,
  outlined: true,
  elevation: 0
};

export default withStyles(styles)(FileUpload);
