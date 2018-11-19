/* eslint-disable default-case */
/* eslint-disable no-unsafe-finally */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */

import { db } from './Database';

class Parcel {
  constructor(option) {
    this.name = option.name;
    this.destination = option.destination;
    this.destinatiionLatitude = option.destinationLatitude;
    this.destinationLongitude = option.destinationLongitude;
    this.description = option.description;
    this.origin = option.origin;
    this.originLatitude = option.originLatitude;
    this.originLongitude = option.originLongitude;
    this.user = option.user;
  }

  /* Create a new Parcel and save it to the database */
  create() {
    const parcel = {
      parcel: {
        userId: this.user,
        name: this.name,
        destination: this.destination,
        destinationLatitude: this.destinatiionLatitude,
        destinationLongitude: this.destinationLongitude,
        origin: this.origin,
        originLatitude: this.originLatitude,
        originLongitude: this.originLongitude,
        status: Parcel.PENDING,
        description: this.description,
      },
    };
    const id = parseInt(Parcel.getDB().lastId) + 1;
    return Parcel.add(id, parcel);
  }

  /* Add a new Parcel to parcel database */
  static add(id, parcel) {
   
  }

  /*  fetch parcels by it id */
  static fetchById(parcelId) {
  
  }


  /* fetch parcels owned by user Identified by userId */
  static fetchByUserId(userId) {
   
  }

  static changeStatus(parcelId, status) {
   
  }

  static changeDestination(parcelId, options) {
   
  }

Parcel.path = `${__dirname}/database/parcel.json`;
Parcel.PENDING = 1;
Parcel.DELIVERED = 3;
Parcel.SHIPPED = 2;
Parcel.CANCELLED = 0;
export { _Parcel as Parcel , parcelPath };

