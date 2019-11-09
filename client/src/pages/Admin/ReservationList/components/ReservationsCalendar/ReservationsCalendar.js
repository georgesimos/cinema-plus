import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class ReservationsCalendar extends Component {
  onFindAttr = (id, list, attr) => {
    const item = list.find(item => item._id === id);
    return item ? item[attr] : `Not ${attr} Found`;
  };

  render() {
    const { reservations, cinemas, movies } = this.props;

    const events = reservations.map(reservation => ({
      title: `Movie: ${this.onFindAttr(
        reservation.movieId,
        movies,
        'title'
      )}-Cinema: ${this.onFindAttr(reservation.cinemaId, cinemas, 'name')}`,
      start: reservation.date,
      // startTime: reservation.startAt,
      // end: reservation.date,
      url: `/movie/${reservation.movieId}`
    }));

    return (
      <FullCalendar
        defaultView="dayGridMonth"
        header={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={events}
      />
    );
  }
}

export default ReservationsCalendar;
