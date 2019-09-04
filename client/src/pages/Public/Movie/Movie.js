import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Container, Typography, Button } from '@material-ui/core';
import classnames from 'classnames';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';

const backgroundImage =
  'https://image.tmdb.org/t/p/original/dKxkwAJfGuznW8Hu0mhaDJtna0n.jpg';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100vh'
  },
  grid: {
    height: '100%'
  },
  heroSection: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '90vh',
      minHeight: 500,
      maxHeight: 1300
    },
    zIndex: 0
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2
  }
});

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
      const url = 'http://localhost:3001/movies/' + this.props.match.params.id;
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
            <section className={classes.heroSection}>
              <Container className={classes.container}>
                <div className={classes.backdrop} />
                <div className={classes.background} />
                <img style={{ display: 'none' }} src={backgroundImage} alt="" />
                <Typography
                  color="inherit"
                  align="center"
                  variant="h2"
                  marked="center">
                  {movie.title}
                </Typography>
                <Typography
                  color="inherit"
                  align="center"
                  variant="h5"
                  className={classes.h5}>
                  {movie.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="inherit"
                  className={classes.more}>
                  Discover the experience
                </Typography>
              </Container>
            </section>
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
