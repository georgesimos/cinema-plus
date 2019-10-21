import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Typography } from '@material-ui/core';
import styles from './styles';
// import ShareIcon from '@material-ui/icons/Share';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import CaledarIcon from '@material-ui/icons/CalendarToday';
import { textTruncate } from '../../../../utils/utils';
import { Link } from 'react-router-dom';

const MovieCard = props => {
  const { classes, movie } = props;

  return (
    <Link to={`/movie/${movie._id}`} style={{ textDecoration: 'none' }}>
      <Paper className={classes.movieCard} elevation={20}>
        <div className={classes.infoSection}>
          <header className={classes.movieHeader}>
            <Typography
              className={classes.movieTitle}
              variant="h1"
              color="inherit">
              {movie.title}
            </Typography>
            <Typography
              className={classes.director}
              variant="h4"
              color="inherit">
              By: {movie.director}
            </Typography>
            <Typography
              className={classes.duration}
              variant="body1"
              color="inherit">
              {movie.duration} min
            </Typography>
            <Typography
              className={classes.genre}
              variant="body1"
              color="inherit">
              {movie.genre}
            </Typography>
          </header>

          <div className={classes.description}>
            <Typography
              className={classes.descriptionText}
              variant="body1"
              color="inherit">
              {textTruncate(movie.description, 250)}
            </Typography>
          </div>
          {/* <div className={classes.footer}>
            <div className={classes.icons}>
              <ShareIcon fontSize="small" />
            </div>
            <div className={classes.icons}>
              <FavoriteIcon fontSize="small" />
            </div>
            <div className={classes.icons}>
              <CaledarIcon fontSize="small" />
            </div>
          </div> */}
        </div>
        <div
          className={classes.blurBackground}
          style={{
            backgroundImage: `url(${movie.image})`
          }}
        />
      </Paper>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired
};
export default withStyles(styles)(MovieCard);
