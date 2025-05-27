const Reservation = require('../models/reservation');
const Movie = require('../models/movie');
const Cinema = require('../models/cinema');

// Cinema User modeling (GET ALL CINEMAS)
// Get all cinemas based on the user's past reservations
// @return a sorted cinema list
const cinemaUserModeling = async (cinemas, username) => {
  const userReservations = await Reservation.find({ username: username });

  if (userReservations.length) {
    let cinemaResult = {};
    userReservations.map(userReservation => {
      const id = userReservation.cinemaId;
      cinemaResult.hasOwnProperty(id) ? ++cinemaResult[id] : (cinemaResult[id] = 1);
    });
    const sortedCinemaResult = [];
    for (let cinema in cinemaResult) {
      sortedCinemaResult.push([cinema, cinemaResult[cinema]]);
    }

    sortedCinemaResult.sort((a, b) => {
      return b[1] - a[1];
    });
    console.log('Sorted cinema result:', sortedCinemaResult);

    const newCinemas = JSON.parse(JSON.stringify(cinemas));
    let i = 0;
    let extractedObj;
    
    for (let sortedCinema of sortedCinemaResult) {
      for (let index = 0; index < newCinemas.length; index++) {
        if (newCinemas[index]._id.toString() === sortedCinema[0]) {
          extractedObj = newCinemas.splice(index, 1);
          if (extractedObj && extractedObj.length > 0) {
            newCinemas.splice(i, 0, extractedObj[0]);
            i++;
          }
          break;
        }
      }
    }

    console.log('New cinemas order:', newCinemas);
    return newCinemas;
  } else {
    return cinemas;
  }
};

const moviesUserModeling = async username => {
  const userPreference = {
    genre: {},
    director: {},
    cast: {},
  };

  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ username: username }))
  );
  const Allmovies = JSON.parse(JSON.stringify(await Movie.find({})));

  const moviesWatched = userReservations.map(reservation => {
    for (let movie of Allmovies) {
      if (movie._id == reservation.movieId) {
        return movie;
      }
    }
  }).filter(Boolean);

  moviesWatched.forEach(movie => {
    let genres = movie.genre.replace(/\s*,\s*/g, ',').split(',');
    let directors = movie.director.replace(/\s*,\s*/g, ',').split(',');
    let casts = movie.cast.replace(/\s*,\s*/g, ',').split(',');
    
    genres.forEach(genre => {
      userPreference.genre[genre]
        ? ++userPreference.genre[genre]
        : (userPreference.genre[genre] = 1);
    });
    
    directors.forEach(director => {
      userPreference.director[director]
        ? ++userPreference.director[director]
        : (userPreference.director[director] = 1);
    });
    
    casts.forEach(cast => {
      userPreference.cast[cast] 
        ? ++userPreference.cast[cast] 
        : (userPreference.cast[cast] = 1);
    });
  });

  const availableMovies = availableMoviesFilter(Allmovies);
  const moviesNotWatched = moviesNotWatchedFilter(availableMovies, userReservations);
  const moviesRated = findRates(moviesNotWatched, userPreference);

  moviesRated.sort((a, b) => b[1] - a[1]);

  return moviesRated.map(array => array[0]);
};

const findRates = (moviesNotWatched, userPreference) => {
  const result = [];
  
  for (let movie of moviesNotWatched) {
    let rate = 0;
    for (let pref in userPreference) {
      rate += getRateOfProperty(pref, userPreference, movie);
    }
    if (rate !== 0) result.push([movie, rate]);
  }
  
  return result;
};

const getRateOfProperty = (pref, userPreference, movie) => {
  let rate = 0;
  const values = Object.keys(userPreference[pref]).map(key => [key, userPreference[pref][key]]);
  const movieValues = movie[pref].replace(/\s*,\s*/g, ',').split(',');
  
  for (const [key, value] of values) {
    for (const movieValue of movieValues) {
      if (movieValue === key) {
        rate += value;
      }
    }
  }

  return rate;
};

const availableMoviesFilter = Allmovies => {
  const today = new Date();
  const returnMovies = [];
  Allmovies.map(movie => {
    let releaseDate = new Date(movie.releaseDate);
    let endDate = new Date(movie.endDate);
    if (today >= releaseDate && today <= endDate) {
      returnMovies.push(movie);
    }
  });
  return returnMovies;
};

const moviesNotWatchedFilter = (availableMovies, userReservations) => {
  const returnMovies = [];
  availableMovies.map(movie => {
    let isFirst = [];
    for (let reservation of userReservations) {
      if (reservation.movieId == movie._id) {
        isFirst.push(false);
      } else {
        isFirst.push(true);
      }
    }

    if (isFirst.every(Boolean)) {
      returnMovies.push(movie);
    }
  });
  return returnMovies;
};

const reservationSeatsUserModeling = async (username, newSeats) => {
  let numberOfTicketsArray = [];
  let numberOfTickets = 1;
  const positions = {
    front: 0,
    center: 0,
    back: 0,
  };
  const cinemas = JSON.parse(JSON.stringify(await Cinema.find({})));
  const userReservations = JSON.parse(
    JSON.stringify(await Reservation.find({ username: username }))
  );

  userReservations.map(reservation => {
    for (let cinema of cinemas) {
      if (cinema._id == reservation.cinemaId) {
        //find how many rows the cinema has
        const position = getPosition(cinema.seats.length, reservation.seats);
        ++positions[position];
        numberOfTicketsArray.push(reservation.seats.length);
      }
    }
  });
  numberOfTickets = Math.round(
    numberOfTicketsArray.reduce((a, b) => a + b, 0) / numberOfTicketsArray.length
  );

  return {
    numberOfTickets,
    positions,
  };
};

const getPosition = (cinemaRows, seats) => {
  const rowNum = seats[0][0];
  const step = cinemaRows / 3;
  let pos = 1;
  for (let i = step; i <= cinemaRows; i += step) {
    if (rowNum < i) {
      switch (pos) {
        case 1:
          return 'front';
        case 2:
          return 'center';
        case 3:
          return 'back';
      }
    }
    pos++;
  }
};

const userModeling = {
  cinemaUserModeling,
  moviesUserModeling,
  reservationSeatsUserModeling,
};

module.exports = userModeling;
