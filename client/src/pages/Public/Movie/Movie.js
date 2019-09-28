// @ts-nocheck
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Rating } from '@material-ui/lab';
import {
  Box,
  withStyles,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Button
} from '@material-ui/core';
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CaledarIcon from '@material-ui/icons/CalendarToday';
import { textTruncate } from '../../../utils/utils';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';
import MovieOverview from './components/MovieOverview';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white
  },
  grid: {
    height: '100%'
  },
  movieHero: {
    position: 'relative',
    height: '100vh',
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
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: 11,
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
    zIndex: 2,
    borderRadius: 10
  },
  movieHeader: {
    position: 'relative',
    padding: theme.spacing(3)
    // maxWidth: '50%'
  },
  tag: {
    padding: theme.spacing(0.3, 2),
    marginRight: theme.spacing(1),
    border: '1px solid rgba(255,255,255,0.9)',
    borderRadius: 25
  },
  movieTitle: {
    fontSize: theme.spacing(6),
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
  description: {
    padding: theme.spacing(3),
    height: '50%',
    width: '50%'
  },
  descriptionText: {
    color: '#cfd6e1'
  },
  movieActions: { position: 'absolute', bottom: 0, right: 0 },
  button: {
    width: 200,
    height: 70,
    borderRadius: 0,
    zIndex: 2
  },
  learnMore: { color: theme.palette.common.white },
  buttonIcon: { marginLeft: theme.spacing(2) }
});

const StyledRating = withStyles({
  iconFilled: {
    color: '#fff'
  },
  iconEmpty: {
    color: '#fff'
  }
})(Rating);

class Movie extends Component {
  state = {
    movie: null
  };
  componentDidMount() {
    this.addPageCursors();
    this.getMovie();
  }

  async getMovie() {
    try {
      const url = '/movies/' + this.props.match.params.id;
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const movie = await response.json();
      if (response.ok) {
        this.setState({
          movie
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  addPageCursors() {
    let cursor1, cursor2, cursor3;
    cursor1 = document.getElementById('cursor');
    cursor2 = document.getElementById('cursor2');
    cursor3 = document.getElementById('cursor3');
    //Page cursors
    document
      .getElementsByTagName('body')[0]
      .addEventListener('mousemove', function(event) {
        cursor1.style.left = event.clientX + 'px';
        cursor1.style.top = event.clientY + 'px';
        cursor2.style.left = event.clientX + 'px';
        cursor2.style.top = event.clientY + 'px';
        cursor3.style.left = event.clientX + 'px';
        cursor3.style.top = event.clientY + 'px';
      });
  }

  render() {
    const { movie } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          {movie && (
            <Paper className={classes.movieHero} elevation={20}>
              <div className={classes.infoSection}>
                <header className={classes.movieHeader}>
                  <Box mb={3} display="flex" alignItems="center">
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
                {/* <div className={classes.description}>
                  <Typography
                    className={classes.descriptionText}
                    variant="body1"
                    color="inherit">
                    {textTruncate(movie.description, 250)}
                  </Typography>
                </div> */}
              </div>
              <div
                className={classes.blurBackground}
                style={{
                  backgroundImage: `url(${movie.image})`
                }}
              />

              <div className={classes.movieActions}>
                <Button
                  className={classnames(classes.button, classes.learnMore)}>
                  Learn More
                  <ArrowRightAlt className={classes.buttonIcon} />
                </Button>
                <Button variant="contained" className={classes.button}>
                  Buy Tickets
                  <ArrowRightAlt className={classes.buttonIcon} />
                </Button>
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
            </Paper>
          )}

          {false && (
            <>
              <Tabs indicatorColor="primary" textColor="primary" centered>
                <Tab label="Overview" />
                <Tab label="Videos" />
                <Tab label="Booking" />
              </Tabs>
              <Container>
                <MovieOverview
                  title={movie.title}
                  movie={movie.description}
                  image={movie.image}
                />
              </Container>
            </>
          )}
        </div>
        <div className="cursor" id="cursor" />
        <div className="cursor2" id="cursor2" />
        <div className="cursor3" id="cursor3" />
      </Fragment>
    );
  }
}

Movie.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Movie);
