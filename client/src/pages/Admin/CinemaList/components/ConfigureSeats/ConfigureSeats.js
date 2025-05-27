import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Typography, Button, Paper } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { getCinema, updateCinemas } from '../../../../../store/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh'
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
    margin: theme.spacing(0.5),
    fontWeight: 600,
    '&:hover': {
      opacity: 0.8
    }
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#eee',
    marginTop: theme.spacing(4)
  },
  seatInfo: { 
    marginRight: theme.spacing(2) 
  },
  seatInfoLabel: {
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 10,
    height: 10
  },
  title: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    textAlign: 'center'
  },
  actions: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2)
  }
}));

function ConfigureSeats({ cinema, getCinema, updateCinema }) {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    if (id) {
      getCinema(id);
    }
  }, [id, getCinema]);

  useEffect(() => {
    if (cinema) {
      // Инициализируем места с учетом сохраненных коэффициентов
      const initialSeats = cinema.seats.map((row, rowIndex) => 
        row.map((seat, seatIndex) => ({
          number: seatIndex + 1,
          coefficient: seat.coefficient || 1.0
        }))
      );
      setSeats(initialSeats);
    }
  }, [cinema]);

  const handleSeatClick = (rowIndex, seatIndex) => {
    const newSeats = [...seats];
    // Переключаем коэффициент места: 1.0 (обычное) -> 2.0 (VIP) -> 1.0
    newSeats[rowIndex][seatIndex] = {
      ...newSeats[rowIndex][seatIndex],
      coefficient: newSeats[rowIndex][seatIndex].coefficient === 1.0 ? 2.0 : 1.0
    };
    setSeats(newSeats);
  };

  const handleSave = async () => {
    try {
      // Создаем объект только с разрешенными полями
      const updatedCinema = {
        name: cinema.name,
        ticketPrice: cinema.ticketPrice,
        seatsAvailable: cinema.seatsAvailable,
        seats: seats
      };

      console.log('Saving cinema configuration:', updatedCinema);
      const response = await updateCinema(null, updatedCinema, id);
      
      if (response && response.status === 'success') {
        history.push('/admin/cinemas');
      } else {
        console.error('Error saving configuration:', response);
      }
    } catch (error) {
      console.error('Error saving seat configuration:', error);
    }
  };

  const handleCancel = () => {
    history.push('/admin/cinemas');
  };

  if (!cinema) return null;

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Настройка схемы зала: {cinema.name}
      </Typography>

      <Box width={1} pt={15}>
        {seats.map((seatRows, indexRow) => (
          <div key={indexRow} className={classes.row}>
            {seatRows.map((seat, index) => (
              <Box
                key={`seat-${index}`}
                onClick={() => handleSeatClick(indexRow, index)}
                className={classes.seat}
                bgcolor={seat.coefficient === 2.0 ? 'rgb(25, 25, 112)' : 'rgb(96, 93, 169)'}>
                {seat.number}
              </Box>
            ))}
          </div>
        ))}
      </Box>

      <Box width={1} mt={10}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(96, 93, 169)' }}></div>
            Обычное место (x1.0)
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(25, 25, 112)' }}></div>
            VIP место (x2.0)
          </div>
        </div>
      </Box>

      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}>
          Сохранить
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}>
          Отмена
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  cinema: state.cinemaState.selectedCinema
});

const mapDispatchToProps = {
  getCinema,
  updateCinema: updateCinemas
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigureSeats); 