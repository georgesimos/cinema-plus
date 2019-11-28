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

  const data = {
    labels: bestMovies.map(movie => movie.movie.title.toUpperCase()),
    datasets: [
      {
        label: 'This year',
        backgroundColor: palette.primary.main,
        data: bestMovies.map(movie => movie.count)
      },
      {
        label: 'Last year',
        backgroundColor: palette.neutral,
        data: [11, 20, 12, 29, 30]
      }
    ]
  };

  return (
    <Card className={classnames(classes.root, className)}>
      <CardHeader
        action={
          <Button size="small" variant="text">
            Best 5<ArrowDropDownIcon />
          </Button>
        }
        title="Best Movies"
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
          Overview <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

BestMovies.propTypes = {
  className: PropTypes.string
};

export default BestMovies;
