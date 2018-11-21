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
  async create() {
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
    try{
    util.validateParcel( this.options );
    }catch(e){
      console.log(e)
      return 0;
    }
    const query = await db.query( insertQuery )
    return Promise.resolve(query.rowCount);
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
            updateQuery =`UPDATE parcels SET destination='${value}' WHERE id='${id}'`;
            break;
            case "destination_lat": 
            updateQuery =`UPDATE parcels SET destination_lat='${value}' WHERE id='${id}'`;
            break;
            case "destination_lng": 
            updateQuery =`UPDATE parcels SET destination_lng='${value}' WHERE id='${id}'`;
            break;
          default:
            return undefined;
        }
        const result = await db.query( updateQuery );
        return Promise.resolve(result.rowCount);
      }

  
    /*  fetch parcels by it id */
    static async fetchById( parcelId ) {
      const query = `SELECT * FROM parcels WHERE id = ${parcelId}`;
      const result = await db.query( query );
      return Promise.resolve(result.rows);
    }

    /* fetch parcels owned by user Identified by userId */
    static async fetchUserParcels( userId ) {
      const query = `SELECT * FROM parcels WHERE owner = ${userId}`;
      const result = await db.query( query );
      return Promise.resolve(result.rows);
    }

    static async changeStatus( parcelId, status ) {
      console.log(status)
      if ( util.isInteger( parcelId ) ) {
        const result = await Parcel.update( parcelId, 'status', status );
        return Promise.resolve( result);
      } else {
        return Promise.resolve( 0 );
      }
    }

    //done
    static async changeCords( parcelId, cordinate ) {
      if ( util.isNumeric( cordinate.lng ) && util.isNumeric( cordinate.lat ) ) {
        const latChange = await Parcel.update( parcelId, 'destination_lat', cordinate.lat );
        const lngChange = await Parcel.update( parcelId, 'destination_lng', cordinate.lng );
        return Promise.resolve(  ( latChange &&  lngChange));
      } else {
        return Promise.resolve( 0 );
      }
    }

    static async changeLocation( parcelId, location ) {
      //undefined in absence of input
      if ( util.isText( location) && util.isInteger(parcelId)) {
        console.log(location)
        const result = await Parcel.update( parcelId, 'location', location );
        return Promise.resolve( result);
      } else {
        return Promise.resolve( 0 );
      }
    }

    /* get all parcels from the databas done */ 
    static async fetchAllparcel() {
      const result = await db.query( 'SELECT * FROM parcels' );
     return Promise.resolve(result.rows);
    }

  }


  Parcel.PENDING = 'PENDING';
  Parcel.DELIVERED = 'DELIVERED';
  Parcel.SHIPPED = 'SHIPPED';
  Parcel.CANCELLED = 'CANCELLED';

  export default Parcel;