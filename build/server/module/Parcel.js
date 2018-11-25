'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable default-case */
/* eslint-disable no-unsafe-finally */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */

var _Database = require('./Database');

var _Database2 = _interopRequireDefault(_Database);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var response = {};

/**
* @class Parcel is responsible for all operations related to a parcel object.
* @param {object}  object - The object to be use in creating the parcel order
* @constructor calling the constructor only create an object, to save the parcel object, @method @param save must be call.
* @returns {Promise} - json data about the operation success
*/

var Parcel = function () {
  function Parcel(option) {
    _classCallCheck(this, Parcel);

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
  /**
  * Save a parcel to the database
  * and return success Promise on the operation
  * @param {response} res - Request object
  * @returns {Promise} - json data about the operation success
  */


  _createClass(Parcel, [{
    key: 'create',
    value: async function create(res) {
      var insertQuery = '\n    INSERT INTO parcels (\n      shortname,\n      destination,\n      destination_lat,\n      destination_lng,\n      origin,origin_lat,\n      origin_lng, \n      description, \n      distance, \n      weight,\n      price,\n      owner \n      )\n      VALUES(\n        \'' + this.shortname + '\',\n        \'' + this.destination + '\',\n        \'' + this.destination_lat + '\',\n        \'' + this.destination_lng + '\',\n        \'' + this.origin + '\',\n        \'' + this.origin_lat + '\',\n        \'' + this.origin_lng + '\',\n        \'' + this.description + '\',\n        \'' + this.distance + '\',\n        \'' + this.weight + '\',\n        \'' + this.price + '\',\n        \'' + this.owner + '\'\n      )\n    ';

      try {
        _utils2.default.validateParcel(this.options);
        res.statusCode = 201;
        var query = await _Database2.default.query(insertQuery);
        return Promise.resolve(_utils2.default.response('ok', 'Parcel Created successfully', query.rowCount));
      } catch (e) {
        var message = void 0;
        if (e.message.search('update') > -1) {
          res.statusCode = 404;
          message = 'User does not exists';
        } else {
          res.statusCode = 400;
          message = e.message;
        }
        return Promise.resolve(_utils2.default.response('error', message));
      }
    }
    /**
    * Update the field @argument fieldName of a parcel item the database which matches @param {parcelId}
    * the @argument value is used as a replacement to the value that existed before
    * and return success Promise on the operation
    * @returns {Promise} - json data about the operation success
    */

  }], [{
    key: 'update',
    value: async function update(parcelId, fieldName, value) {
      var updateQuery = void 0;
      switch (fieldName) {
        case "location":
          updateQuery = 'UPDATE parcels SET location=\'' + value + '\' WHERE id=\'' + parcelId + '\'';
          break;
        case 'status':
          updateQuery = 'UPDATE parcels SET status=\'' + value + '\' WHERE id=\'' + parcelId + '\'';
          break;
        case "destination":
          updateQuery = 'UPDATE parcels SET destination=\'' + value + '\' WHERE id=\'' + parcelId + '\'';
          break;
        case "destination_lat":
          updateQuery = 'UPDATE parcels SET destination_lat=\'' + value + '\' WHERE id=\'' + parcelId + '\'';
          break;
        case "destination_lng":
          updateQuery = 'UPDATE parcels SET destination_lng=\'' + value + '\' WHERE id=\'' + parcelId + '\'';
          break;
        default:
          return undefined;
      }
      var result = await _Database2.default.query(updateQuery);
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

  }, {
    key: 'fetchById',
    value: async function fetchById(parcelId, res) {
      if (!_utils2.default.isInteger(parcelId)) {
        res.statusCode = 400;
        return Promise.resolve(_utils2.default.response('error', 'Invalid Id Provided', []));
      }
      var query = 'SELECT * FROM parcels WHERE id = ' + parcelId;
      var result = await _Database2.default.query(query);
      return Promise.resolve(_utils2.default.response('ok', 'success', result.rows));
    }

    /**
    * Fetch all Users data from the database which matches @param {userId}
    * and return it a Promise
    * @param {response} res - Request object
    * @param {response} res - Request object
    * @param {userId} int- The parcel Id to change status
    * @returns {Promise} @returns {Promise} - json data about the operation success or failure
    */

  }, {
    key: 'fetchUserParcels',
    value: async function fetchUserParcels(userId, res) {
      if (!_utils2.default.isInteger(userId)) {
        res.statusCode = 400;
        return Promise.resolve(_utils2.default.response("error", "Invalid Id provided"));
      }
      var query = 'SELECT * FROM parcels WHERE owner = ' + userId;
      var result = await _Database2.default.query(query);
      return Promise.resolve(_utils2.default.response('ok', 'suceess', result.rows));
    }

    /**
    * Update the status of a parcel from the database which matches @param {parcelId}
    * and return success Promise on the operation
    * @param {response} res - Request object
    * @param {response} res - Request object
    * @param {parcelId} int - The parcel Id to change status
    * @returns {Promise} - json data about the operation success
    */

  }, {
    key: 'changeStatus',
    value: async function changeStatus(parcelId, status, res) {
      if (!_utils2.default.isInteger(parcelId)) {
        res.statusCode = 400;
        return Promise.resolve(_utils2.default.response('error', 'invalid character found in id'));
      }
      var result = await Parcel.update(parcelId, 'status', status);
      if (!result) res.statusCode = 404;
      return Promise.resolve(_utils2.default.response('ok', result ? 'Parcel cancelled' : 'No Parcel Affected', result));
    }

    /**
    * Update the destination cordinate of a parcel from the database which matches @param {parcelId}
    * and return success Promise on the operation
    * @param {cordinate} object - the cordinate object with property @argument lat and @argument lng
    * @param {response} res - Request object
    * @param {parcelId} int - The parcel Id to change status
    * @returns {Promise} - json data about the operation success
    */

  }, {
    key: 'changeCords',
    value: async function changeCords(parcelId, cordinate, res) {
      var response = void 0;
      if (!_utils2.default.isInteger(parcelId)) {
        res.statusCode = 400;
        response = _utils2.default.response('error', 'Invalid character in Parcel ID');
        return Promise.resolve(response);
      }
      if (!_utils2.default.isNumeric(cordinate.lng) || !_utils2.default.isNumeric(cordinate.lat)) {
        res.statusCode = 400;
        console.log(cordinate.lat);
        response = _utils2.default.response('error', 'Invalid cordinate provided');
        return Promise.resolve(response);
      }
      var latChange = await Parcel.update(parcelId, 'destination_lat', cordinate.lat);
      var lngChange = await Parcel.update(parcelId, 'destination_lng', cordinate.lng);

      if (!(latChange && lngChange)) {
        res.statusCode = 404;
        var _response = _utils2.default.response('ok', 'No Parcel matching that ID');
        return Promise.resolve(_response);
      }
      response = _utils2.default.response('ok', 'cordinate changed succcessfully', latChange && lngChange);
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

  }, {
    key: 'changeLocation',
    value: async function changeLocation(parcelId, location, res) {
      //undefined in absence of input
      var response = void 0;
      if (!_utils2.default.isInteger(parcelId)) {
        res.statusCode = 400;
        response = _utils2.default.response("error", 'invalid ID provided');
        return Promise.resolve(response);
      }
      var result = await Parcel.update(parcelId, 'location', location);
      response = result ? _utils2.default.response("ok", 'Parcel changed successfully', result) : _utils2.default.response("ok", 'Parcel Id did not match any parcel');
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

  }, {
    key: 'fetchAllparcel',
    value: async function fetchAllparcel() {
      var result = await _Database2.default.query('SELECT * FROM parcels');
      return Promise.resolve(_utils2.default.response('ok', 'success', result.rows));
    }
  }]);

  return Parcel;
}();

Parcel.PENDING = 'PENDING';
Parcel.DELIVERED = 'DELIVERED';
Parcel.SHIPPED = 'SHIPPED';
Parcel.CANCELLED = 'CANCELLED';

exports.default = Parcel;