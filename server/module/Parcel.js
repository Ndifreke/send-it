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

const response = {};


class Parcel {

  constructor( option ) {
    this.options = option;
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
  async create( res ) {
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
    
    try {
      util.validateParcel( this.options );
      res.statusCode = 201;
      const query = await db.query( insertQuery )
      return Promise.resolve( util.response( 'ok', 'Parcel Created successfully', query.rowCount ) );
    } catch ( e ) {
      let message;
      if ( e.message.search( 'update' ) > -1 ) {
        res.statusCode = 404;
        message = 'User does not exists';
      } else {
        res.statusCode = 400;
        message = e.message;
      }
      return Promise.resolve( util.response( 'error', message ) );
    }

  }

  static async update( id, fieldName, value ) {
    let updateQuery;
    switch ( fieldName ) {
      case "location":
        updateQuery = `UPDATE parcels SET location='${value}' WHERE id='${id}'`;
        break;
      case 'status':
        updateQuery = `UPDATE parcels SET status='${value}' WHERE id='${id}'`;
        break;
      case "destination":
        updateQuery = `UPDATE parcels SET destination='${value}' WHERE id='${id}'`;
        break;
      case "destination_lat":
        updateQuery = `UPDATE parcels SET destination_lat='${value}' WHERE id='${id}'`;
        break;
      case "destination_lng":
        updateQuery = `UPDATE parcels SET destination_lng='${value}' WHERE id='${id}'`;
        break;
      default:
        return undefined;
    }
    const result = await db.query( updateQuery );
    return Promise.resolve( result.rowCount );
  }


  /*  fetch parcels by it id */
  static async fetchById( parcelId, res ) {
    if ( !util.isInteger( parcelId ) ) {
      res.statusCode = 400;
      return Promise.resolve( util.response( 'error', 'Invalid Id Provided', [] ) );
    }
    const query = `SELECT * FROM parcels WHERE id = ${parcelId}`;
    const result = await db.query( query );
    return Promise.resolve( util.response( 'ok', 'success', result.rows ) );
  }

  /* fetch parcels owned by user Identified by userId */
  static async fetchUserParcels( userId, res ) {
    if ( !util.isInteger( userId ) ) {
      res.statusCode = 400;
      return Promise.resolve( util.response( "error", "Invalid Id provided" ) );
    }
    const query = `SELECT * FROM parcels WHERE owner = ${userId}`;
    const result = await db.query( query );
    return Promise.resolve( util.response( 'ok', 'suceess', result.rows ) );
  }


  static async changeStatus( parcelId, status, res ) {
    if ( !util.isInteger( parcelId ) ) {
      res.statusCode = 400;
      return Promise.resolve( util.response( 'error', 'invalid character found in id' ) );
    }
    const result = await Parcel.update( parcelId, 'status', status );
    if ( !result )
      res.statusCode = 404;
    return Promise.resolve(
      util.response( 'ok', result ? 'Parcel cancelled' : 'No Parcel Affected', result ) );
  }


  //done
  static async changeCords( parcelId, cordinate, res ) {
    let response;
    if ( !util.isInteger( parcelId ) ) {
      res.statusCode = 400;
      response = util.response( 'error', 'Invalid character in Parcel ID' );
      return Promise.resolve( response );
    }
    if ( !util.isNumeric( cordinate.lng ) || !util.isNumeric( cordinate.lat ) ) {
      res.statusCode = 400;
      console.log( cordinate.lat )
      response = util.response( 'error', 'Invalid cordinate provided' );
      return Promise.resolve( response );
    }
    const latChange = await Parcel.update( parcelId, 'destination_lat', cordinate.lat );
    const lngChange = await Parcel.update( parcelId, 'destination_lng', cordinate.lng );

    if ( !( latChange && lngChange ) ) {
      res.statusCode = 404;
      const response = util.response( 'ok', 'No Parcel matching that ID' );
      return Promise.resolve( response );
    }
    response = util.response( 'ok', 'cordinate changed succcessfully', ( latChange && lngChange ) )
    return Promise.resolve( response );
  }

  static async changeLocation( parcelId, location,res ) {
    //undefined in absence of input
    let response;
    if ( !util.isInteger( parcelId ) ) {
      res.statusCode = 400;
      response = util.response( "error", 'invalid ID provided' );
      return Promise.resolve( response );
    }
    const result = await Parcel.update( parcelId, 'location', location );
    response = result ? util.response( "ok", 'Parcel changed successfully', result ) :
      util.response( "ok", 'Parcel Id did not match any parcel' )
    return Promise.resolve( response );
  }

  /* get all parcels from the databas done */
  static async fetchAllparcel() {
    const result = await db.query( 'SELECT * FROM parcels' );
    return Promise.resolve( util.response( 'ok', 'success', result.rows ) );
  }

}


Parcel.PENDING = 'PENDING';
Parcel.DELIVERED = 'DELIVERED';
Parcel.SHIPPED = 'SHIPPED';
Parcel.CANCELLED = 'CANCELLED';

export default Parcel;