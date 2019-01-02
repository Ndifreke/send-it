/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import util from '../module/utils';
import Parcel from '../module/Parcel';
import {
   verifyAccessToken
} from '../module/authenticate';
import User from '../module/User';

/**
 * Create A parcel order from options supplied in req.body
 * options needed include.
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function createParcel(req, res) {
   async function createCallback(accessToken) {
      const created = await new Parcel(req.body, accessToken.id).create(res);
      res.json(created);
   }
   verifyAccessToken(req, res, createCallback);
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
      const id = req.params.parcelID;
      const result = await Parcel.getParcel(id, res);
      res.json(result)
   }
   verifyAccessToken(req, res, getOneCallback);
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
   verifyAccessToken(req, res, getAllCallback);
}

/**
 * Get all parcels owned by a User identified by userID
 * if no userID exist, ID will be looked in accessToken field
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function getUserParcels(req, res) {
   async function getUsersCallback(accessToken) {
      res.setHeader('Content-Type', 'text/json');
      const userID = req.params.userID;
      const result = await Parcel.fetchUserParcels(util.isInteger(userID) || accessToken.id, res);
      res.json(result);
   }
   verifyAccessToken(req, res, getUsersCallback);
}

/**
 * Change the status of a parcel order 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function cancelParcel(req, res) {
   async function cancelCallback(accessToken) {
      const is_admin = await User.is_admin(accessToken.id);
      if (!is_admin) {
         const id = req.params.parcelID;
         res.statusCode = 201;
         const result = await Parcel.changeStatus(id, Parcel.CANCELLED, res);
         res.json(result);
      } else {
         res.json(util.response("error", 'Admin cannot cancel parcel', 0))
      }
   }
   verifyAccessToken(req, res, cancelCallback);
}

/**
 * Change the destination of parcel order
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
function changeCordinate(req, res) {
   async function changeCordCallback(accessToken) {
      const id = req.params.parcelID;
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
   verifyAccessToken(req, res, changeCordCallback)
}

/**
 * Change the current location of a parcel order this operation can
 * only be carried out by an admin
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */

function updateParcel(req, resp) {
   async function updateCallback(token) {

      let result = await Parcel.getParcel(req.params.parcelID);
      let message = {};
      let status = "ok";

      if (result.response[0] && result.response[0].status !== 'DELIVERED') {
         const user = await User.lookup(token.id);
         const isAdmin = user.getIsAdmin();

         for (let field in req.body) {
            const value = req.body[field];
            switch (field) {
               //this operations can only be done by admin
               case "location":
               case "location_lat":
               case "location_lng":
               case "status":
                  if (isAdmin) {
                     Parcel.updateParcel(req.params.parcelID, field, value);
                     message[field] = " updated";
                     break;
                  }
                  message[field] = "Permission Denied";
                  resp.statusCode = 202; //success
                  break;

                  //this operations can only be done by user
               case "shortname":
               case "destination":
               case "destination_lat":
               case "price":
               case "destination_lng":
               case "distance":
               case "description":
                  if (!isAdmin) {
                     Parcel.updateParcel(req.params.parcelID, field, value);
                     message[field] = " updated";
                     break;
                  }
                  message[field] = "Permission Denied";
                  resp.statusCode = 202; //success
                  break;
            }
         };
      } else {
         message.Error = (result.response[0]) ? "You cannot update a Delivered parcel" : "Parcel does not exist";
         resp.statusCode = 405;
         status = "error";
      }

      resp.json({
         status: status,
         message: message
      });
   }
   verifyAccessToken(req, resp, updateCallback);
}



/** Depreciated, should use upate instead */
function changePresentLocation(req, res) {
   async function changePresentLocationCallback(accessToken) {
      const changed = await Parcel.changeLocation(req.params.parcelID, req.body.presentLocation, res)
      res.json(changed);
   }
   verifyAccessToken(req, res, changePresentLocationCallback);
}

/**
 * Change the status of parcel order. identified by an Id
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */

/** Depreciated, should use upate instead */
function updateStatus(req, res) {
   async function updateStatusCallback(accessToken) {
      const result = await Parcel.changeStatus(req.params.parcelID, req.body.status, res);
      res.json(result);
   }
   const id = verifyAccessToken(req, res, updateStatusCallback);
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
   updateParcel
};