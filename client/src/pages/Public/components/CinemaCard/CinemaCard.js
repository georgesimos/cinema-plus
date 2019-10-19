import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Paper } from '../../../../components';
import { EventSeat } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    paddingBottom: theme.spacing(2)
  },
  imageWrapper: {
    height: '200px',
    margin: '0 auto',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%',
    'object-fit': 'cover'
  },
  details: { padding: theme.spacing(3) },
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    marginTop: theme.spacing(2),
    textTransform: 'capitalize'
  },
  city: {
    lineHeight: '16px',
    height: theme.spacing(4),
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  eventIcon: {
    color: theme.palette.text.secondary
  },
  eventText: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

function CinemaCard(props) {
  const classes = useStyles(props);
  const { className, cinema } = props;

  const rootClassName = classNames(classes.root, className);
  return (
    <Paper className={rootClassName}>
      <div className={classes.imageWrapper}>
        <img
          alt="cinema"
          className={classes.image}
          src="https://picsum.photos/600"
        />
      </div>
      <div className={classes.details}>
        <Typography className={classes.name} variant="h4">
          {cinema.name}
        </Typography>
        <Typography className={classes.city} variant="body1">
          {cinema.city}
        </Typography>
      </div>
      <div className={classes.stats}>
        <EventSeat className={classes.eventIcon} />
        <Typography className={classes.eventText} variant="body2">
          {cinema.seatsAvailable} seats Available
        </Typography>
      </div>
    </Paper>
  );
}

CinemaCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default CinemaCard;
