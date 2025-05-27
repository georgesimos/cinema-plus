import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  movieInfos: {
    background: 'rgba(57, 61, 67, 0.5)',
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
    borderRadius: theme.spacing(1)
  },
  background: {
    position: 'absolute',
    opacity: 0.4,
    top: 0,
    height: '70%',
    right: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    zIndex: 1
  },
  title: {
    position: 'absolute',
    top: '60%',
    right: 0,
    width: '100%',
    textAlign: 'center',
    color: theme.palette.common.white,
    fontSize: '24px',
    textTransform: 'capitalize',
    zIndex: 2,
    padding: theme.spacing(1),
    wordWrap: 'break-word'
  },
  info: {
    position: 'absolute',
    padding: theme.spacing(3),
    top: '70%',
    right: 0,
    width: '100%',
    maxHeight: '30%',
    overflowY: 'auto'
  },
  infoBox: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(2),
    '& .MuiTypography-subtitle1': {
      fontWeight: 'bold',
      marginBottom: theme.spacing(0.5)
    },
    '& .MuiTypography-caption': {
      display: 'block',
      wordWrap: 'break-word'
    }
  },
  [theme.breakpoints.down('md')]: {
    movieInfos: { 
      minHeight: '30vh',
      marginBottom: theme.spacing(3)
    },
    background: { height: '100%' },
    title: { 
      top: '80%',
      fontSize: '20px'
    },
    info: { 
      display: 'none'
    }
  }
}));

export default function MovieInfo(props) {
  const classes = useStyles(props);
  const { movie } = props;

  if (!movie) return <h1>Загрузка фильма...</h1>;

  return (
    <Grid item xs={12} md={12} lg={3}>
      <div className={classes.movieInfos}>
        <div
          className={classes.background}
          style={{
            backgroundImage: `url(${movie.image})`
          }}
        />
        <Typography className={classes.title}>{movie.title}</Typography>
        <div className={classes.info}>
          {movie.director && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                Режиссер
              </Typography>
              <Typography variant="caption" color="inherit">
                {movie.director}
              </Typography>
            </div>
          )}
          {movie.cast && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                В ролях
              </Typography>
              <Typography variant="caption" color="inherit">
                {movie.cast}
              </Typography>
            </div>
          )}
          {movie.genre && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                Жанр
              </Typography>
              <Typography variant="caption" color="inherit">
                {movie.genre}
              </Typography>
            </div>
          )}
          {movie.country && (
            <div className={classes.infoBox}>
              <Typography variant="subtitle1" color="inherit">
                Страна
              </Typography>
              <Typography variant="caption" color="inherit">
                {movie.country}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Grid>
  );
}
