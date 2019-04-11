/* eslint-disable default-case */
/* eslint-disable no-unsafe-finally */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */

import db from './Database';
import util from "./utils";

const response = {};

/**
 * @class Parcel is responsible for all operations related to a parcel object.
 * @param {object}  object - The object to be use in creating the parcel order
 * @constructor calling the constructor only create an object, to save the parcel object, @method @param save must be call.
 * @returns {Promise} - json data about the operation success
 */
class Parcel {

  constructor(option, ownerId) {
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
    this.owner = ownerId;
  }
  /**
   * Save a parcel to the database
   * and return success Promise on the operation
   * @param {response} res - Request object
   * @returns {Promise} - json data about the operation success
   */
  async create(res) {
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
      util.validateParcel(this.options);
      res.statusCode = 201;
      const query = await db.query(insertQuery)
      return Promise.resolve(util.response('ok', 'Parcel Created successfully', query.rowCount));
    } catch (e) {
      let message;
      if (e.message.search('update') > -1) {
        res.statusCode = 404;
        message = 'User does not exists';
      } else {
        res.statusCode = 400;
        message = e.message;
      }
      return Promise.resolve(util.response('error', message));
    }

  }
  /**
   * Update the field @argument fieldName of a parcel item in the database which matches @param {parcelId}
   * the @argument value is used as a replacement to the value that existed before
   * and return success Promise on the operation
   * @returns {Promise} - json data about the operation success
   */
  static async updateParcel(parcelId, fieldName, value) {
    let updateQuery;
    switch (fieldName) {
      case "shortname":
      updateQuery = `UPDATE parcels SET shortname='${value}' WHERE id='${parcelId}'`;
      break;
      case "location":
        updateQuery = `UPDATE parcels SET location='${value}' WHERE id='${parcelId}'`;
        break;
      case "location_lat":
        updateQuery = `UPDATE parcels SET location_lat='${value}' WHERE id='${parcelId}'`;
        break;
      case "location_lng":
        updateQuery = `UPDATE parcels SET location_lng='${value}' WHERE id='${parcelId}'`;
        break;
      case "destination":
        updateQuery = `UPDATE parcels SET destination='${value}' WHERE id='${parcelId}'`;
        break;
      case "destination_lat":
        updateQuery = `UPDATE parcels SET destination_lat='${value}' WHERE id='${parcelId}'`;
        break;
      case "destination_lng":
        updateQuery = `UPDATE parcels SET destination_lng='${value}' WHERE id='${parcelId}'`;
        break;
      case "distance":
        updateQuery = `UPDATE parcels SET distance='${value}' WHERE id='${parcelId}'`;
        break;
      case "price":
        updateQuery = `UPDATE parcels SET price='${value.replace(/[a-z\W]/gi,"")}' WHERE id='${parcelId}'`;
        break;
      case 'status':
        updateQuery = `UPDATE parcels SET status='${value}' WHERE id='${parcelId}'`;
        break;
        case 'description':
        updateQuery = `UPDATE parcels SET description='${value}' WHERE id='${parcelId}'`;
        break; 
      default:  
        return undefined;
    }
    const result = await db.query(updateQuery);
    return Promise.resolve(result.rowCount);
  }


  /**
   * Fetch a single parcel from the database which matches @param {parcelId}
   * and return it a Promise
   * @param {response} res - Request object
   * @param {response} res - Request object
   * @param {parcelId} int - The parcel Id to change status
   * @returns {Promise} - json data about the operation success or failure
   */
  static async getParcel(parcelId) {
    if (!util.isInteger(parcelId)) {
      return Promise.resolve(util.response('error', 'Invalid Id Provided', []));
    }
    const query = `SELECT * FROM parcels WHERE id = ${parcelId}`;
    const result = await db.query(query);
    return Promise.resolve(
      result.rowCount === 0 ? util.response('error', 'Invalid Id Provided') :
      util.response('ok', 'success', result.rows[0]));
  }


  /**
   * Fetch all Users data from the database which matches @param {userId}
   * and return it a Promise
   * @param {response} res - Request object
   * @param {response} res - Request object
   * @param {userId} int- The parcel Id to change status
   * @returns {Promise} @returns {Promise} - json data about the operation success or failure
   */
  static async fetchUserParcels(userId, res) {
    if (!util.isInteger(userId)) {
      res.statusCode = 400;
      return Promise.resolve(util.response("error", "Invalid Id provided"));
    }
    const query = `SELECT * FROM parcels WHERE owner = ${userId}`;
    const result = await db.query(query);
    return Promise.resolve(util.response('ok', 'suceess', result.rows));
  }


  /**
   * Update the status of a parcel from the database which matches @param {parcelId}
   * and return success Promise on the operation
   * @param {response} res - Request object
   * @param {response} res - Request object
   * @param {parcelId} int - The parcel Id to change status
   * @returns {Promise} - json data about the operation success
   */
  static async changeStatus(parcelId, status, res) {
    if (!util.isInteger(parcelId)) {
      res.statusCode = 400;
      return Promise.resolve(util.response('error', 'invalid character found in id'));
    }
    const result = await Parcel.updateParcel(parcelId, 'status', status);
    if (!result)
      res.statusCode = 404;
    return Promise.resolve(
      util.response('ok', result ? 'status updated' : 'No Parcel Affected', result));
  }


  /**
   * Update the destination cordinate of a parcel from the database which matches @param {parcelId}
   * and return success Promise on the operation
   * @param {cordinate} object - the cordinate object with property @argument lat and @argument lng
   * @param {response} res - Request object
   * @param {parcelId} int - The parcel Id to change status
   * @returns {Promise} - json data about the operation success
   */
  static async changeCords(parcelId, cordinate, res) {
    let response;
    if (!util.isInteger(parcelId)) {
      res.statusCode = 400;
      response = util.response('error', 'Invalid character in Parcel ID');
      return Promise.resolve(response);
    }
    if (!util.isNumeric(cordinate.lng) || !util.isNumeric(cordinate.lat)) {
      res.statusCode = 400;
      console.log(cordinate.lat)
      response = util.response('error', 'Invalid cordinate provided');
      return Promise.resolve(response);
    }
    const latChange = await Parcel.updateParcel(parcelId, 'destination_lat', cordinate.lat);
    const lngChange = await Parcel.updateParcel(parcelId, 'destination_lng', cordinate.lng);

    if (!(latChange && lngChange)) {
      res.statusCode = 404;
      const response = util.response('ok', 'No Parcel matching that ID');
      return Promise.resolve(response);
    }
    response = util.response('ok', 'cordinate changed succcessfully', (latChange && lngChange))
    return Promise.resolve(response);
  }

  /**
   * Updat the location of a parcel from the database which matches @param {parcelId}
   * and return success Promise on the operation
   * @param {response} res - Request object
   * @param {response} location - The new Location where parcel will be sent to
   * @param {parcelId} int - The parcel Id to change status
   * @returns {Promise} - json data about the operation success
   */
  static async changeLocation(parcelId, location, res) {
    //undefined in absence of input
    let response;
    if (!util.isInteger(parcelId)) {
      res.statusCode = 400;
      response = util.response("error", 'invalid ID provided');
      return Promise.resolve(response);
    }
    const result = await Parcel.updateParcel(parcelId, 'location', location);
    response = result ? util.response("ok", 'Parcel changed successfully', result) :
      util.response("ok", 'Parcel Id did not match any parcel')
    return Promise.resolve(response);
  }

  /**
   * Fetch all a parcels from the database 
   * and return success Promise on the operation
   * @param {response} res - Request object
   * @param {response} res - Request object
   * @param {parcelId} int - The parcel Id to change status
   * @returns {Promise} - json data about the operation success
   */
  static async fetchAllparcel() {
    const result = await db.query('SELECT * FROM parcels');
    return Promise.resolve(util.response('ok', 'success', result.rows));
  }

}


Parcel.PENDING = 'PENDING';
Parcel.DELIVERED = 'DELIVERED';
Parcel.SHIPPED = 'SHIPPED';
Parcel.CANCELLED = 'CANCELLED';

export default Parcel;
