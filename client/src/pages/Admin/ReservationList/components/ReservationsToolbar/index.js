import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';

import { SearchInput, DisplayMode } from '../../../../../components';
import styles from './styles';

class ReservationsToolbar extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  render() {
    const {
      classes,
      className,
      search,
      mode,
      onChangeSearch,
      onChangeMode
    } = this.props;
    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search reservation by Phone"
            value={search}
            onChange={onChangeSearch}
          />
          <DisplayMode mode={mode} onChange={onChangeMode} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ReservationsToolbar);
