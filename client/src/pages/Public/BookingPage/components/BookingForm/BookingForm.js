import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';

export default function BookingForm(props) {
  const {
    cinemas,
    selectedCinema,
    onChangeCinema,
    times,
    selectedTime,
    onChangeTime
  } = props;

  if (!cinemas.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          No Cinema Available.
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          value={selectedCinema}
          label="Select Cinema"
          variant="outlined"
          onChange={onChangeCinema}>
          {cinemas.map(cinema => (
            <MenuItem key={cinema._id} value={cinema._id}>
              {cinema.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          select
          value={selectedTime}
          label="Select Time"
          variant="outlined"
          onChange={onChangeTime}>
          {times.map((time, index) => (
            <MenuItem key={time + '-' + index} value={time}>
              {time}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}
