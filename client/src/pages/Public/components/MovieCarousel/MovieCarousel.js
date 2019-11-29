import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { makeStyles, Typography, Button } from '@material-ui/core';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import MovieCardSimple from '../MovieCardSimple/MovieCardSimple';
import styles from './styles';

const useStyles = makeStyles(styles);

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

function MovieCarousel({ carouselClass, movies = [], title, to = null }) {
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
        {to==null? null
           :
          <Link to={to} style={{ textDecoration: 'none' }}>
          <Button className={classes.button} color="primary">
            Explore All
          </Button>
        </Link>
      }
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
