/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import util from '../module/utils';
import Parcel from '../module/Parcel';
import User from '../module/User';
import view from '../module/views';
import {
   authenticate
} from '../module/authenticate';

/**
 * Create A parcel order from options supplied in req.body
 * options needed include.
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
<<<<<<< HEAD
function createParcel(req, res) {
=======
async function createParcel(req, res) {
>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
   async function createCallback(accessToken) {
      const created = await new Parcel(req.body).create(res);
      res.json(created);
   }
   authenticate(req, res, createCallback);
}

/**
 * Get a One parcel Order Identified by @param {id} 
 * contained in Request object
 * @constructor
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function getOneParcel(req, res) {
   // res.setHeader( 'Content-Type', 'text/json' );
   async function getOneCallback(accessToken) {
      const id = req.params.id;
      const result = await Parcel.fetchById(id, res);
      res.json(result)
   }
   authenticate(req, res, getOneCallback);
<<<<<<< HEAD
=======

>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
}

/**
 * Get all parcels contain in the database
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function getAllParcels(req, res) {
   async function getAllCallback(accessToken) {
      const result = await Parcel.fetchAllparcel(res);
      res.json(result);
   }
   authenticate(req, res, getAllCallback);
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
      const {
         id
      } = req.params;
      const result = await Parcel.fetchUserParcels(id, res);
      res.json(result);
   }
   authenticate(req, res, getUsersCallback);
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
         const id = req.params.id;
         res.statusCode = 201;
         const result = await Parcel.changeStatus(id, Parcel.CANCELLED, res);
         res.json(result);
      } else {
         res.json(util.response("error", 'Admin cannot cancel parcel', 0))
      }
   }
   authenticate(req, res, cancelCallback);
<<<<<<< HEAD
=======

>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
}

/**
 * Change the destination of parcel order
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
<<<<<<< HEAD
function changeCordinate(req, res) {
=======
async function changeCordinate(req, res) {
>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
   async function changeCordCallback(accessToken) {
      const id = req.params.id;
      const {
         lat,
         lng
      } = req.body;
      const confirm = await Parcel.changeCords(req.params.id, {
         lat,
         lng
      }, res);
      res.json(confirm);
   }
   authenticate(req, res, changeCordCallback)
}

/**
 * Change the current location of a parcel order
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
<<<<<<< HEAD
function changePresentLocation(req, res) {
=======
async function changePresentLocation(req, res) {
>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
   async function changePresentLocationCallback(accessToken) {
      const changed = await Parcel.changeLocation(req.params.id, req.body.presentLocation, res)
      res.json(changed);
   }
   authenticate(req, res, changePresentLocationCallback);
}

/**
 * Change the status of parcel order. identified by an Id
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
<<<<<<< HEAD
function updateStatus(req, res) {
=======
async function updateStatus(req, res) {

>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
   async function updateStatusCallback(accessToken) {
      const result = await Parcel.changeStatus(req.params.id, req.body.status, res);
      res.json(result);
   }
<<<<<<< HEAD
=======

>>>>>>> 65d86b50d8248bd4dff6f3612ec119bc05d067a7
   const id = authenticate(req, res, updateStatusCallback);
}

export {
   changePresentLocation,
   changeCordinate,
   getOneParcel,
   cancelParcel,
   getAllParcels,
   getUserParcels,
   updateStatus,
   createParcel,
};