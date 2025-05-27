import React from 'react';
import { Grid, Box, TextField, MenuItem, Typography } from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  inputField: {
    backgroundColor: '#ffffff',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#bebebe',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#7d58ff',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#555555',
    },
    '& .MuiInputBase-input': {
      color: '#000000',
    },
    '& .MuiSelect-icon': {
      color: '#555555',
    },
    '& .MuiPickersDay-day': {
      color: '#ffffff',
    },
    '& .MuiPickersDay-daySelected': {
      backgroundColor: '#7d58ff',
      color: '#ffffff',
      '&:hover': {
        backgroundColor: '#6a4ad8',
      },
    },
    '& .MuiPickersDay-current': {
      color: '#7d58ff',
    },
    '& .MuiPickersDay-dayDisabled': {
      color: '#999999',
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      color: '#ffffff',
    },
    '& .MuiPickersCalendarHeader-switchHeader': {
      color: '#ffffff',
    },
    '& .MuiPickersCalendarHeader-iconButton': {
      color: '#ffffff',
    },
    '& .MuiPickersCalendarHeader-transitionContainer': {
      color: '#ffffff',
    }
  }
}));

export default function BookingForm(props) {
  const classes = useStyles();
  const {
    cinemas,
    showtimes,
    selectedCinema,
    onChangeCinema,
    selectedDate,
    onChangeDate,
    times,
    selectedTime,
    onChangeTime
  } = props;

  const showtime = showtimes.find(
    showtime => showtime.cinemaId === selectedCinema
  );

  if (!cinemas.length)
    return (
      <Box
        display="flex"
        width={1}
        height={1}
        alignItems="center"
        justifyContent="center">
        <Typography align="center" variant="h2" color="inherit">
          Нет доступных залов.
        </Typography>
      </Box>
    );

  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <TextField
          fullWidth
          select
          value={selectedCinema}
          label="Выбрать зал"
          variant="outlined"
          className={classes.inputField}
          onChange={onChangeCinema}>
          {cinemas.map(cinema => (
            <MenuItem key={cinema._id} value={cinema._id}>
              {cinema.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      {showtime && (
        <Grid item xs>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              inputVariant="outlined"
              margin="none"
              fullWidth
              id="start-date"
              label="Дата показа"
              minDate={new Date(showtime.startDate)}
              maxDate={new Date(showtime.endDate)}
              value={selectedDate}
              className={classes.inputField}
              onChange={date => onChangeDate(date._d)}
              KeyboardButtonProps={{
                'aria-label': 'изменить дату'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      )}
      {selectedDate && (
        <Grid item xs>
          <TextField
            fullWidth
            select
            value={selectedTime}
            label="Выбрать время"
            variant="outlined"
            className={classes.inputField}
            onChange={onChangeTime}>
            {times.map((time, index) => (
              <MenuItem key={time + '-' + index} value={time}>
                {time}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      )}
    </Grid>
  );
}
