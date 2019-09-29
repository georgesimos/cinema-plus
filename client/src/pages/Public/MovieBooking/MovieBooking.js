// @ts-nocheck
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Box, Typography } from '@material-ui/core';
import Navbar from '../../../layouts/Public/components/Navbar/Navbar';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100vh'
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(120, 205, 4)'
    }
  },
  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(0.8), margin: theme.spacing(0.5) }
  }
});

class MovieBooking extends Component {
  state = {
    movie: null,
    cinemaSeats: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0]
    ]
  };
  componentDidMount() {
    this.addPageCursors();
    this.getMovie();
  }

  onSelectSeat = (row, seat) => {
    const { cinemaSeats } = this.state;
    if (cinemaSeats[row][seat] === 1) return;
    const newSeats = [...cinemaSeats];
    cinemaSeats[row][seat] === 2
      ? (newSeats[row][seat] = 0)
      : (newSeats[row][seat] = 2);
    this.setState({ cinemaSeats: newSeats });
  };

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
    const { cinemaSeats } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <div className={classes.root}>
          <Navbar />
          <Box width={1} pt={15}>
            {cinemaSeats.map((seatRows, indexRow) => (
              <div key={indexRow} className={classes.row}>
                {seatRows.map((seat, index) => (
                  <Box
                    key={`seat-${index}`}
                    onClick={() => this.onSelectSeat(indexRow, index)}
                    className={classes.seat}
                    bgcolor={
                      seat === 1
                        ? 'rgb(65, 66, 70)'
                        : seat === 2
                        ? 'rgb(120, 205, 4)'
                        : 'rgb(96, 93, 169)'
                    }>
                    {index + 1}
                  </Box>
                ))}
              </div>
            ))}
          </Box>
          <Box width={1} mt={10}>
            <Box
              width="50%"
              margin="auto"
              display="flex"
              alignItems="center"
              textAlign="center"
              color="#eee">
              <Typography color="inherit">
                <Box
                  mr={1}
                  display="inline-block"
                  width={10}
                  height={10}
                  bgcolor="rgb(96, 93, 169)"
                />
                Seat Available
              </Typography>
              <Typography color="inherit">
                <Box
                  mr={1}
                  ml={2}
                  display="inline-block"
                  width={10}
                  height={10}
                  bgcolor="rgb(65, 66, 70)"
                />
                Reserved Seat
              </Typography>
              <Typography color="inherit">
                <Box
                  mr={1}
                  ml={2}
                  display="inline-block"
                  width={10}
                  height={10}
                  bgcolor="rgb(120, 205, 4)"
                />
                Your Seat
              </Typography>
            </Box>
          </Box>
        </div>
        <div className="cursor" id="cursor" />
        <div className="cursor2" id="cursor2" />
        <div className="cursor3" id="cursor3" />
      </Fragment>
    );
  }
}

MovieBooking.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieBooking);
