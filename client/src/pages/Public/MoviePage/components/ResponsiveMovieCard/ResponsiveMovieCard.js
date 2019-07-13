import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import styles from './styles';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CaledarIcon from '@material-ui/icons/CalendarToday';
import { textTruncate } from '../../../../../utils/utils';

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <Paper className={classes.movieCard} elevation={20}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          <img
            className={classes.imageHeader}
            src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg"
          />
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit">
            {movie.title}
          </Typography>
          <Typography className={classes.director} variant="h4" color="inherit">
            By: {movie.director}
          </Typography>
          <Typography
            className={classes.duration}
            variant="body1"
            color="inherit">
            {movie.duration} min
          </Typography>
          <Typography className={classes.genre} variant="body1" color="inherit">
            {movie.genre}
          </Typography>
        </header>

        <div className={classes.description}>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit"
            nowrap>
            {textTruncate(movie.description, 250)}
          </Typography>
        </div>
        <div className={classes.footer}>
          <div className={classes.icons}>
            <ShareIcon fontSize="small" />
          </div>
          <div className={classes.icons}>
            <FavoriteIcon fontSize="small" />
          </div>
          <div className={classes.icons}>
            <CaledarIcon fontSize="small" />
          </div>
        </div>
      </div>
      <div
        className={classes.blurBackground}
        style={{
          background: `url("https://occ-0-2433-448.1.nflxso.net/art/cd5c9/3e192edf2027c536e25bb5d3b6ac93ced77cd5c9.jpg")`
        }}
      />
    </Paper>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(MovieCard);
