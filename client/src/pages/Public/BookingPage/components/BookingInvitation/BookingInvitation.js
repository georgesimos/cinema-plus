import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, TextField, Grid, Button } from '@material-ui/core';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  paper: { padding: theme.spacing(4) },
  gridContainer: {
    margin: theme.spacing(3, 0)
  }
}));

const convertToAlphabet = value => (value + 10).toString(36).toUpperCase();

export default function BookingInvitation(props) {
  const classes = useStyles(props);
  const {
    selectedSeats,
    sendInvitations,
    ignore,
    invitations,
    onSetInvitation
  } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Guest Invitation
        </Typography>
        <Grid className={classes.gridContainer} container spacing={3}>
          {selectedSeats.map((seat, index) => (
            <Grid item xs={12} md={6} lg={4} key={'seat-' + index}>
              <TextField
                fullWidth
                label="email"
                name={`${convertToAlphabet(seat[0])}-${seat[1]}`}
                helperText={`Please select an Email for Row : ${convertToAlphabet(
                  seat[0]
                )} - Seat Number : ${seat[1]}`}
                margin="dense"
                required
                value={
                  invitations[`${convertToAlphabet(seat[0])}-${seat[1]}`] || ''
                }
                variant="outlined"
                onChange={event => onSetInvitation(event)}
              />
            </Grid>
          ))}
          <Grid item xs={12} container>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={() =>
                  sendInvitations({
                    to: 'geosimos91@gmail.com',
                    host: 'George Simos',
                    movieName: 'Movie Name',
                    movieTime: '20:00',
                    cinemaName: 'Palini Cinema'
                  })
                }>
                Send Invitations
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => ignore()}>
                Ignore
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
