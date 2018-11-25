'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.createParcel = exports.updateStatus = exports.getUserParcels = exports.getAllParcels = exports.cancelParcel = exports.getOneParcel = exports.changeCordinate = exports.changePresentLocation = undefined;

var _utils = require('../module/utils');

var _utils2 = _interopRequireDefault(_utils);

var _Parcel = require('../module/Parcel');

var _Parcel2 = _interopRequireDefault(_Parcel);

var _authenticate = require('../module/authenticate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create A parcel order from options supplied in req.body
 * options needed include.
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function createParcel(req, res) {
   async function createCallback(accessToken) {
      var created = await new _Parcel2.default(req.body).create(res);
      res.json(created);
   }
   (0, _authenticate.verifyAccessToken)(req, res, createCallback);
}

/**
 * Get a One parcel Order Identified by @param {id} 
 * contained in Request object
 * @constructor
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
function getOneParcel(req, res) {
   // res.setHeader( 'Content-Type', 'text/json' );
   async function getOneCallback(accessToken) {
      var id = req.params.id;
      var result = await _Parcel2.default.fetchById(id, res);
      res.json(result);
   }
   (0, _authenticate.verifyAccessToken)(req, res, getOneCallback);
}

/**
 * Get all parcels contain in the database
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function getAllParcels(req, res) {
   async function getAllCallback(accessToken) {
      var result = await _Parcel2.default.fetchAllparcel(res);
      res.json(result);
   }
   (0, _authenticate.verifyAccessToken)(req, res, getAllCallback);
}

/**
 * Get all parcels owned by a User identified by id in res.body
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function getUserParcels(req, res) {
   async function getUsersCallback(accessToken) {
      res.setHeader('Content-Type', 'text/json');
      var id = req.params.id;

      var result = await _Parcel2.default.fetchUserParcels(id, res);
      res.json(result);
   }
   (0, _authenticate.verifyAccessToken)(req, res, getUsersCallback);
}

/**
 * Change the status of a parcel order 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function cancelParcel(req, res) {
   async function cancelCallback(accessToken) {
      if (!accessToken.is_admin) {
         var id = req.params.id;
         res.statusCode = 201;
         var result = await _Parcel2.default.changeStatus(id, _Parcel2.default.CANCELLED, res);
         res.json(result);
      } else {
         res.json(_utils2.default.response("error", 'Admin cannot cancel parcel', 0));
      }
   }
   (0, _authenticate.verifyAccessToken)(req, res, cancelCallback);
}

/**
 * Change the destination of parcel order
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function changeCordinate(req, res) {
   async function changeCordCallback(accessToken) {
      var id = req.params.id;
      var _req$body = req.body,
          lat = _req$body.lat,
          lng = _req$body.lng;

      var confirm = await _Parcel2.default.changeCords(req.params.id, {
         lat: lat,
         lng: lng
      }, res);
      res.json(confirm);
   }
   (0, _authenticate.verifyAccessToken)(req, res, changeCordCallback);
}

/**
 * Change the current location of a parcel order
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */

function changePresentLocation(req, res) {
   async function changePresentLocationCallback(accessToken) {
      var changed = await _Parcel2.default.changeLocation(req.params.id, req.body.presentLocation, res);
      res.json(changed);
   }
   (0, _authenticate.verifyAccessToken)(req, res, changePresentLocationCallback);
}

/**
 * Change the status of parcel order. identified by an Id
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */

function updateStatus(req, res) {

   async function updateStatusCallback(accessToken) {
      var result = await _Parcel2.default.changeStatus(req.params.id, req.body.status, res);
      res.json(result);
   }
   var id = (0, _authenticate.verifyAccessToken)(req, res, updateStatusCallback);
}

exports.changePresentLocation = changePresentLocation;
exports.changeCordinate = changeCordinate;
exports.getOneParcel = getOneParcel;
exports.cancelParcel = cancelParcel;
exports.getAllParcels = getAllParcels;
exports.getUserParcels = getUserParcels;
exports.updateStatus = updateStatus;
exports.createParcel = createParcel;