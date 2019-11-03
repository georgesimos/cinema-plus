import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

class ReservationsCalendar extends Component {
  render() {
    // const { reservations } = this.props;

    return (
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
        events={[
          { title: 'Movie Title 1', date: '2019-10-31' },
          { title: 'Movie Title 1', date: '2019-10-31' },
          { title: 'Movie Title 1', date: '2019-11-01' },
          { title: 'Movie Title 1', date: '2019-11-01' }
        ]}
      />
    );
  }
}

export default ReservationsCalendar;
