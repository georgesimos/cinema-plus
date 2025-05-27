import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import palette from '../../../../../theme/palette';
import { options } from './chart';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    height: 400,
    position: 'relative'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const BestMovies = props => {
  const { className, bestMovies } = props;
  const classes = useStyles();

  // Фильтруем элементы, чтобы избежать ошибки с undefined
  const validMovies = bestMovies.filter(item => item.movie);

  const data = {
    labels: validMovies.map(movie => movie.movie?.title?.toUpperCase() || 'Неизвестный'),
    datasets: [
      {
        label: 'Текущий год',
        backgroundColor: palette.primary.main,
        data: validMovies.map(movie => movie.count)
      },
      {
        label: 'Прошлый год',
        backgroundColor: palette.neutral,
        data: validMovies.map(() => Math.floor(Math.random() * 30) + 10) // Генерируем случайные данные для примера
      }
    ]
  };

  return (
    <Card className={classnames(classes.root, className)}>
      <CardHeader
        action={
          <Button size="small" variant="text">
            Лучшие 5<ArrowDropDownIcon />
          </Button>
        }
        title="Лучшие фильмы"
      />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Bar data={data} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color="primary" size="small" variant="text">
          Обзор <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

BestMovies.propTypes = {
  className: PropTypes.string
};

export default BestMovies;
