/* eslint-disable default-case */
/* eslint-disable no-unsafe-finally */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */

import db from './Database';
import util from "./utils";
import User from './User';

class Parcel {
  constructor( option ) {
    util.validateParcel( option );
    this.shortname = option.shortname;
    this.destination = option.destination;
    this.destination_lat = option.destination_lat;
    this.destination_lng = option.destination_lng;
    this.description = option.description;
    this.origin = option.origin;
    this.origin_lat = option.origin_lat;
    this.origin_lng = option.origin_lng;
    this.distance = option.distance;
    this.weight = option.weight;
    this.price = option.price;
    this.owner = option.owner;
  }

  /* Create a new Parcel and save it to the database */
  create() {
    const insertQuery = `
    INSERT INTO parcels (
      shortname,
      destination,
      destination_lat,
      destination_lng,
      origin,origin_lat,
      origin_lng, 
      description, 
      distance, 
      weight,
      price,
      owner 
      )
      VALUES(
        '${this.shortname}',
        '${this.destination}',
        '${this.destination_lat}',
        '${this.destination_lng}',
        '${this.origin}',
        '${this.origin_lat}',
        '${this.origin_lng}',
        '${this.description}',
        '${this.distance}',
        '${this.weight}',
        '${this.price}',
        '${this.owner}'
      )
    `;
    return db.query( insertQuery );
  }

  static update( id, table, fieldName, value ) {
    let updateQuery;
    switch ( table ) {

      case 'parcels':
        switch ( fieldName ) {
          case "location":
            updateQuery = `UPDATE parcels SET location='${value}' WHERE id='${id}'`;
            break;
          case 'status':
            updateQuery = `UPDATE parcels SET status='${value}' WHERE id='${id}'`;
            break;
            default:return undefined;
        }

      case 'users':
        switch ( fieldName ) {
          case 'password':
            updateQuery = `UPDATE users SET password='${value}' WHERE id='${id}'`
            break;
          case 'email':
            updateQuery = `UPDATE users SET email='${value}' WHERE id='${id}'`
            break;
          case 'mobile':
            updateQuery = `UPDATE users SET mobile='${value}' WHERE id='${id}'`
            break;
          case 'is_admin':
            updateQuery = `UPDATE users SET is_admin='${value}' WHERE id='${id}'`
            break;
            default:break;
        }
        default: break;
    }
    return db.query(updateQuery);
  }

  /*  fetch parcels by it id */
  static fetchById( parcelId ) {
    const query = `SELECT * FROM parcels WHERE id = ${parcelId}`;
    return db.query( query ); 
  }


  /* fetch parcels owned by user Identified by userId */
  static fetchByUserId( userId ) {

  }

  static changeStatus( parcelId, status ) {

  }

  static changeDestination( parcelId, options ) {

  }

  /* get all parcels from the databas */
  static fetchAllparcel() {
    const result = db.query( 'SELECT * FROM parcels' );
    return result;
  }
}

Parcel.PENDING = 1;
Parcel.DELIVERED = 3;
Parcel.SHIPPED = 2;
Parcel.CANCELLED = 0;

export default Parcel;