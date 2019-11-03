import React from 'react';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  Box,
  Typography,
  Button,
  makeStyles,
  withStyles
} from '@material-ui/core';
import { textTruncate } from '../../../../utils/utils';
import { Link } from 'react-router-dom';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles(theme => ({
  movieHero: {
    position: 'relative',
    height: props => (props.height ? props.height : '100%'),
    width: '100%',
    color: theme.palette.common.white,
    backgroundColor: theme.palette.background.dark
  },
  blurBackground: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    height: '100%',
    right: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%'
  },
  infoSection: {
    position: 'relative',
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundBlendMode: 'multiply',
    background:
      'linear-gradient(to right, rgba(0,0,0,.9) 50%, transparent 100%)',
    zIndex: 2
  },
  movieHeader: {
    position: 'relative',
    padding: theme.spacing(3)
  },
  tag: {
    padding: theme.spacing(0.3, 3),
    marginRight: theme.spacing(1),
    border: '1px solid rgba(255,255,255,0.9)',
    borderRadius: 25
  },
  movieTitle: {
    maxWidth: '60%',
    fontSize: '32px',
    lineHeight: 1.2,
    fontWeight: 400,
    textTransform: 'capitalize'
  },
  director: {
    color: '#9ac7fa',
    fontWeight: '500',
    fontSize: '16px',
    marginTop: theme.spacing(1)
  },

  duration: {
    display: 'inline-block',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    border: '1px solid rgba(255,255,255,0.13)'
  },
  genre: {
    display: 'inline-block',
    color: '#cee4fd',
    marginLeft: theme.spacing(2)
  },
  descriptionText: {
    color: '#cfd6e1',
    padding: theme.spacing(2, 0),
    maxWidth: '60%'
  },
  footer: {
    position: 'absolute',
    left: theme.spacing(4),
    bottom: theme.spacing(2),
    zIndex: 2
  },
  icons: {
    display: 'inline-block',
    cursor: 'pointer',
    color: 'rgba(255, 255, 255, 0.4)',
    margin: theme.spacing(0, 1),
    transition: 'all 0.3s',
    '&:hover': {
      color: 'rgba(255, 255, 255, 0.8)',
      transform: 'scale(1.25)',
      transition: 'all 0.3s',
      transitionDelay: '0.15s'
    }
  },
  movieActions: { position: 'absolute', bottom: 0, right: 0 },
  button: {
    width: 200,
    height: 70,
    borderRadius: 0,
    zIndex: 2
  },
  learnMore: { color: theme.palette.common.white },
  buttonIcon: { marginLeft: theme.spacing(2) },
  [theme.breakpoints.down('sm')]: {
    movieTitle: {
      maxWidth: '100%',
      fontSize: '16px'
    },
    descriptionText: {
      maxWidth: '100%',
      fontSize: '12px'
    },
    tag: { padding: theme.spacing(0.3, 1), margin: theme.spacing(1, 1, 1, 0) },
    movieActions: { display: 'flex', width: '100%' },
    button: {
      flex: 1,
      fontSize: 13,
      height: 'auto',
      padding: theme.spacing(2)
    },
    footer: {
      left: theme.spacing(1),
      bottom: theme.spacing(12)
    }
  }
}));

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

function MovieBanner(props) {
  const { movie, fullDescription } = props;
  const classes = useStyles(props);
  if (!movie) return null;

  return (
    <div className={classes.movieHero}>
      <div className={classes.infoSection}>
        <header className={classes.movieHeader}>
          {fullDescription && (
            <Box mb={3} display="flex" alignItems="center" flexWrap="wrap">
              <Typography
                className={classes.tag}
                variant="body1"
                color="inherit">
                {movie.genre}
              </Typography>
              <Typography
                className={classes.tag}
                variant="body1"
                color="inherit">
                {movie.genre}
              </Typography>
              <Typography
                className={classes.tag}
                variant="body1"
                color="inherit">
                {movie.genre}
              </Typography>
              <StyledRating
                value={4}
                readOnly
                size="small"
                emptyIcon={<StarBorderIcon fontSize="inherit" />}
              />
            </Box>
          )}
          <Typography
            className={classes.movieTitle}
            variant="h1"
            color="inherit">
            {movie.title}
          </Typography>
          <Typography
            className={classes.descriptionText}
            variant="body1"
            color="inherit">
            {textTruncate(movie.description, 450)}
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
      </div>
      <div
        className={classes.blurBackground}
        style={{
          backgroundImage: `url(${movie.image})`
        }}
      />
      <div className={classes.movieActions}>
        {fullDescription ? (
          <Link to={`booking/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" className={classes.button}>
              Buy Tickets
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        ) : (
          <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
            <Button className={classnames(classes.button, classes.learnMore)}>
              Learn More
              <ArrowRightAlt className={classes.buttonIcon} />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MovieBanner;
