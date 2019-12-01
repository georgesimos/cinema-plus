const Reservation = require('../models/reservation');
const Movie = require('../models/movie');

// Cinema User modeling (GET ALL CINEMAS)
// Get all cinemas based on the user's past reservations
// @return a sorted cinema list
const cinemaUserModeling = async (cinemas,username) => {
    const userReservations = await Reservation.find({username:username});

    if(userReservations.length){
        let cinemaResult ={};
        userReservations.map(userReservation=>{
            const id = userReservation.cinemaId;
            cinemaResult.hasOwnProperty(id)? ++cinemaResult[id] : cinemaResult[id] = 1
        });
        const sortedCinemaResult = [];
        for (let cinema in cinemaResult) {
            sortedCinemaResult.push([cinema, cinemaResult[cinema]]);
        }
       
        sortedCinemaResult.sort((a, b)=> {
            return b[1] - a[1];
        });
        console.log(sortedCinemaResult)

        const newCinemas = JSON.parse(JSON.stringify(cinemas));
        let i=0;
        let extractedObj;
        for(let sortedCinema of sortedCinemaResult){
            newCinemas.forEach((cinema,index) => {
                if(cinema._id == sortedCinema[0]){
                    console.log("FOUND")
                    extractedObj = newCinemas.splice(index,1);
                }
            });
            newCinemas.splice(i,0,extractedObj[0]);
            i++;
        }

        console.log(newCinemas)

        return newCinemas;
    } else{
        return cinemas;
    }
}

const moviesUserModeling = async (username) => {
    userPreference = {
        genre:{},
        director:{},
        cast:{}
    };

    const userReservations = JSON.parse(JSON.stringify(await Reservation.find({username:username})));
    const Allmovies = JSON.parse(JSON.stringify(await Movie.find({})));
   
    const moviesWatched = userReservations.map( reservation=>{
        for(let movie of Allmovies){
            if (movie._id == reservation.movieId){
                return movie;
            }
        }
    });

    //  console.log(moviesWatched);

    moviesWatched.map(movie=>{
        let genres = movie.genre.replace(/\s*,\s*/g, ",").split(',');;
        let directors = movie.director.replace(/\s*,\s*/g, ",").split(',');;
        let casts = movie.cast.replace(/\s*,\s*/g, ",").split(',');
        for(let genre of genres){
            userPreference.genre[genre]? ++userPreference.genre[genre] : userPreference.genre[genre] =1;
        }
        for(let director of directors){
            userPreference.director[director]? ++userPreference.director[director] : userPreference.director[director] =1;
        }
        for(let cast of casts){
            userPreference.cast[cast]? ++userPreference.cast[cast] : userPreference.cast[cast] =1; 
        }
    });

   //console.log(userPreference)

    //find movies that are available for booking
    const availableMovies = availableMoviesFilter(Allmovies);
    //console.log(availableMovies)
    const moviesNotWatched = moviesNotWatchedFilter(availableMovies,userReservations);
     //console.log(moviesNotWatched)

    const moviesRated = findRates(moviesNotWatched,userPreference);

    moviesRated.sort((a, b)=> {
        return b[1] - a[1];
    });
     //console.log(moviesRated)

    const moviesToObject = moviesRated.map(array=>{
        return array[0]
    })
    return moviesToObject;

}

const findRates = (moviesNotWatched,userPreference)=>{
    const result=[];
    let rate;
    for(let movie of moviesNotWatched){
        for(let pref in userPreference){
            rate = getRateOfProperty(pref,userPreference,movie);
            //TODO we can use weights here
        }
        if(rate !== 0) result.push([movie,rate]);
    }
    // console.log(result)
    return result;
}

const getRateOfProperty = (pref,userPreference,movie)=>{
    let rate = 0;
    const values = Object.keys(userPreference[pref]).map((key)=>{
        return [key, userPreference[pref][key]];
      });
      let movieValues = movie[pref].replace(/\s*,\s*/g, ",").split(',');
      for(value of values){
          if(movieValues.length){
              for(movieValue of movieValues){
                  if(movieValue == value[0]){
                    rate += value[1];
                  }
              }
          }
      }

      return rate;
}

const availableMoviesFilter = (Allmovies)=>{
    const today = new Date();
    const returnMovies = [];
    Allmovies.map(movie=>{
        let releaseDate = new Date(movie.releaseDate);
        let endDate = new Date(movie.endDate);
       if(today >= releaseDate && today <= endDate){
        returnMovies.push(movie);
       }
    });
    return returnMovies;
};

const moviesNotWatchedFilter = (availableMovies,userReservations)=>{
    const returnMovies = [];
    availableMovies.map(movie=>{
        let isFirst = [];
        for(let reservation of userReservations){
            if(reservation.movieId == movie._id){
                isFirst.push(false);
            }else {
                isFirst.push(true);
            }
        }

        if(isFirst.every(Boolean)){
            returnMovies.push(movie);
        }
    });
    return returnMovies;
};


const userModeling = {
    cinemaUserModeling,
    moviesUserModeling
}

module.exports = userModeling;