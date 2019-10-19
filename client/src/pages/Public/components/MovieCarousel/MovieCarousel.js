import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles, Typography, Button } from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import MovieCardSimple from '../MovieCardSimple/MovieCardSimple';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    alignItems: 'baseline'
  },
  h2: {
    fontSize: '2rem',
    color: theme.palette.common.white,
    margin: theme.spacing(3),
    textTransform: 'capitalize'
  },
  button: {},
  carousel: {
    width: '85%',
    height: '100%',
    margin: 'auto'
  },
  arrow: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 60,
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(0,0,0,.5)',
    color: theme.palette.common.white,
    zIndex: 1,
    '&.prevArrow': {
      left: 0,
      justifyContent: 'flex-start',
      background:
        ' linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,37,0) 100%)',
      opacity: ({ currentSlide }) => (currentSlide ? 1 : 0)
    },
    '&.nextArrow': {
      right: 0,
      justifyContent: 'flex-end',
      background:
        ' linear-gradient(90deg, rgba(0,0,37,0) 0%, rgba(0,0,0,1) 100%)',
      opacity: ({ currentSlide, slideCount }) =>
        currentSlide === slideCount ? 0 : 1
    }
  },

  slider: { '& .slick-slide': { padding: theme.spacing(1) } }
}));

function NextArrow(props) {
  const { currentSlide, slideCount, onClick } = props;
  const classes = useStyles({ currentSlide, slideCount });
  return (
    <div className={classnames(classes.arrow, 'nextArrow')} onClick={onClick}>
      <ArrowForwardIos color="inherit" fontSize="large" />
    </div>
  );
}

function PrevArrow(props) {
  const { currentSlide, onClick } = props;
  const classes = useStyles({ currentSlide });
  return (
    <div className={classnames(classes.arrow, 'prevArrow')} onClick={onClick}>
      <ArrowBackIos color="inherit" fontSize="large" />
    </div>
  );
}

function MovieCarousel({ carouselClass, movies = [], title, to = '/' }) {
  const classes = useStyles();
  const settings = {
    centerMode: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  if (!movies.length) return null;
  return (
    <div className={carouselClass}>
      <div className={classes.container}>
        <Typography className={classes.h2} variant="h2" color="inherit">
          {title}
        </Typography>
        <Link to={to} style={{ textDecoration: 'none' }}>
          <Button className={classes.button} color="primary">
            Explore All
          </Button>
        </Link>
      </div>
      <Slider {...settings} className={classes.slider}>
        {movies.map(movie => (
          <MovieCardSimple key={movie._id} movie={movie} />
        ))}
      </Slider>
    </div>
  );
}
export default MovieCarousel;
