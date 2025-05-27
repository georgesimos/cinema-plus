import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, TextField, Grid, Button, Box } from '@material-ui/core';
import { Paper } from '../../../../../components';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3)
  },
  paper: { padding: theme.spacing(4) },
  gridContainer: {
    marginTop: theme.spacing(4)
  },
  successInfo: { margin: theme.spacing(3) },
  ignoreButton: {
    marginLeft: theme.spacing(3)
  },
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
    }
  }
}));

const convertToAlphabet = value => (value + 10).toString(36).toUpperCase();

export default function BookingInvitation(props) {
  const classes = useStyles(props);
  const {
    selectedSeats,
    sendInvitations,
    ignore,
    onSetInvitation,
    onDownloadPDF
  } = props;

  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Создаем объект с одним email для всех мест
    const invitations = {};
    selectedSeats.forEach(seat => {
      invitations[`${convertToAlphabet(seat[0])}-${seat[1]}`] = event.target.value;
    });
    onSetInvitation({ target: { value: event.target.value, invitations } });
  };

  const notValidEmail = !email || !email.includes('@');

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h4" align="center">
          Приглашение гостя
        </Typography>
        <Typography
          className={classes.successInfo}
          variant="body1"
          align="center">
          Вы успешно забронировали свои места. Пожалуйста, введите электронный адрес,
          чтобы отправить приглашение с билетами!
        </Typography>
        <Box width={1} textAlign="center">
          <Button
            color="primary"
            variant="outlined"
            onClick={() => onDownloadPDF()}>
            Скачать билет
          </Button>
        </Box>
        <Grid className={classes.gridContainer} container spacing={3}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
              name="email"
              helperText="Пожалуйста, введите Email для отправки билетов"
                margin="dense"
                required
              value={email}
                variant="outlined"
                className={classes.inputField}
              onChange={handleEmailChange}
              />
            </Grid>
          <Grid item xs={12} container>
            <Grid item>
              <Button
                disabled={notValidEmail}
                color="primary"
                variant="outlined"
                onClick={() => sendInvitations()}>
                Отправить приглашение
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={classes.ignoreButton}
                color="secondary"
                variant="outlined"
                onClick={() => ignore()}>
                Пропустить
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
