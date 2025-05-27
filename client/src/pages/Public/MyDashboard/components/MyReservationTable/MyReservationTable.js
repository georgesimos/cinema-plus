import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Button, Typography, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteReservation } from '../../../../../actions/reservationActions'; // Импорт по необходимости
import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class MyReservationTable extends Component {
  state = {
    deleteDialogOpen: false,
    selectedReservation: null
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    reservations: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    cinemas: PropTypes.array.isRequired,
    deleteReservation: PropTypes.func.isRequired
  };

  handleDeleteClick = (reservation) => {
    this.setState({
      deleteDialogOpen: true,
      selectedReservation: reservation
    });
  };

  handleDeleteConfirm = () => {
    const { selectedReservation } = this.state;
    if (selectedReservation) {
      this.props.deleteReservation(selectedReservation._id);
    }
    this.handleDeleteClose();
  };

  handleDeleteClose = () => {
    this.setState({
      deleteDialogOpen: false,
      selectedReservation: null
    });
  };

  handleCancelReservation = async (reservationId) => {
    try {
      await this.props.deleteReservation(reservationId);
    } catch (error) {
      console.error('Ошибка при отмене бронирования:', error);
    }
  };

  onFindAttr = (id, arr, attr) => {
    const found = arr.find(el => el._id === id);
    return found ? found[attr] : 'Неизвестно';
  };

  render() {
    const { classes, reservations, movies, cinemas } = this.props;
    const { deleteDialogOpen } = this.state;

    return (
      <Portlet className={classes.root}>
        <PortletContent noPadding>
          <div className={classes.cardsContainer}>
            {reservations.map(reservation => {
              const movie = movies.find(m => m._id === reservation.movieId) || {};
              const cinema = cinemas.find(c => c._id === reservation.cinemaId) || {};

              return (
                <Card key={reservation._id} className={classes.card}>
                  <CardContent>
                    <div className={classes.cardHeader}>
                      <Typography variant="h6">Заказ {reservation._id}</Typography>
                      <Typography variant="h6" className={classes.total}>
                        Итого: {reservation.total} руб.
                      </Typography>
                    </div>П
                    <div className={classes.cardContent}>
                      <div className={classes.posterContainer}>
                        {movie.image && (
                          <img src={movie.image} alt={movie.title} className={classes.poster} />
                        )}
                      </div>
                      <div className={classes.infoContainer}>
                        <Typography variant="h6">{movie.title}</Typography>
                        <Typography>Кинотеатр: {cinema.name}</Typography>
                        <Typography>Дата: {new Date(reservation.date).toLocaleDateString()}</Typography>
                        <Typography>Начало: {reservation.startAt}</Typography>
                        <Typography>
                          Места: {reservation.seats.map((seat, index) => {
                            const seatRow = (seat.row || seat[0]) + 1;
                            const seatNumber = (seat.number || seat[1]) + 1;
                            return `Ряд ${seatRow}, Место ${seatNumber}${index < reservation.seats.length - 1 ? '; ' : ''}`;
                          })}
                        </Typography>
                      </div>
                      <div className={classes.qrContainer}>
                        {reservation.qrCode && (
                          <img src={reservation.qrCode} alt="QR код" className={classes.qrCode} />
                        )}
                        {!reservation.checkin && (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => this.handleDeleteClick(reservation)}
                            className={classes.deleteButton}
                          >
                            Отменить бронь
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </PortletContent>

        <Dialog
          open={deleteDialogOpen}
          onClose={this.handleDeleteClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
          disablePortal
          keepMounted
        >
          <DialogTitle id="delete-dialog-title">Подтверждение отмены</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Действительно ли вы хотите отменить бронь?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDeleteClose} color="primary">Отмена</Button>
            <Button onClick={this.handleDeleteConfirm} color="secondary" variant="contained">Удалить</Button>
          </DialogActions>
        </Dialog>
      </Portlet>
    );
  }
}

const mapDispatchToProps = { deleteReservation };

export default connect(null, mapDispatchToProps)(withStyles(styles)(MyReservationTable));
