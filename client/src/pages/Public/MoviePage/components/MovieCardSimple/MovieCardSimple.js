import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
    backgroundColor: 'transparent',
    borderRadius: 0,
    color: theme.palette.common.white
  },
  media: {
    height: 300
  }
}));

const MovieCardSimple = props => {
  const classes = useStyles();
  const { movie } = props;

  return (
    <Link to={`movie/${movie._id}`} style={{ textDecoration: 'none' }}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={movie.image}
            title={movie.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="inherit">
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

MovieCardSimple.propTypes = {
  movie: PropTypes.object.isRequired
};
export default MovieCardSimple;
