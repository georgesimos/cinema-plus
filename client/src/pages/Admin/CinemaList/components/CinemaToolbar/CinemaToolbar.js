import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { SearchInput } from '../../../../../components';
import styles from './styles';

class CinemaToolbar extends Component {
  render() {
    const { classes, className, search, onChangeSearch, onAddClick } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
        <div className={rootClassName}>
          <div className={classes.row}>
            <SearchInput
              className={classes.searchInput}
              placeholder="Поиск зала"
              value={search}
              onChange={onChangeSearch}
            />
            <Button
            onClick={onAddClick}
              color="primary"
              size="small"
              variant="outlined">
              Добавить
            </Button>
          </div>
        </div>
    );
  }
}

CinemaToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onAddClick: PropTypes.func.isRequired
};

export default withStyles(styles)(CinemaToolbar);
