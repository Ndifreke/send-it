
//console.log( Parcel.fetchByUserId( 5 ) )
//console.log( Parcel.fetchById( 16 ) )
//console.log( Parcel.changeDestination( 2, {
//    "destination-name": 245855
//} ) );
//console.log(Parcel.changeStatus(1, Parcel.CANCELLED));
//console.log( Parcel.fetchById(1))

new Parcel( {
 "user": 5,
 "name": "Whisky crates",
 "description": "Branded origin wisky",
 "destination": "Ikoyi",
 "destinationLatitude": 758,
 "destinationLongitude": 4758,
 "origin": "Ikeja",
 "originLatitude": null,
 "originLongitude": null,
} ).create();


//console.log( Parcel.fetchByUserId( 5 ) )
//console.log( Parcel.fetchById( 16 ) )
console.log( Parcel.changeDestination( 2, {
 "destination": 245855
} ) );

