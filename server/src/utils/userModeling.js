const Reservation = require('../models/reservation');

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


const userModeling = {
    cinemaUserModeling
}

module.exports = userModeling;