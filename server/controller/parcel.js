/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import {
   Utils
} from '../module/utils';

import Parcel from '../module/Parcel';

function createParcel( req, res ) {
   res.setHeader( 'Content-Type', 'text/json' );
   const requiredParam = [
      'name',
      'destination',
      'destinationLatitude', 'destinationLongitude',
      'origin',
      'originLatitude',
      'originLongitude',
      'user',
   ];
   const reply = {
      status: 'ok',
      message: 'success',
   };
   try {
      Utils.validateHasRequiredFields( requiredParam, req.body );
      const args = {};
      requiredParam.forEach( ( param ) => {
         args[ param ] = req.body[ param ];
      } );
      if ( new Parcel( args ).create() ) {
         res.statusCode = 201;
         res.end( Utils.formatJson( reply ) );
      } else {
         res.statusCode = 500;
         reply.status = 'error';
         reply.message = 'Unkown Error Occured';
         res.end( Utils.formatJson( reply ) );
      }
   } catch ( e ) {
      res.statusCode = 400;
      reply.status = 'error';
      reply.message = e.message;
      res.end( Utils.formatJson( reply ) );
   }
   // next();
}

function getOneParcel( req, res ) {
   res.setHeader( 'Content-Type', 'text/json' );
   const id = req.params.id;
   if ( Utils.isInteger( id ) ) {
      const json = Parcel.fetchById( id );
      switch ( JSON.parse( json ).status ) {
         case 'ok':
            res.statusCode = 200;
            res.end( json );
            break;
         case 'error':
            res.statusCode = 404;
            const obj = JSON.parse( json );
            obj.status = 'Not Found';
            res.end( Utils.formatJson( obj ) );
      }
   }
   const reply = {};
   res.statusCode = 400;
   reply.status = 'error';
   reply.message = 'Invalid request format or Argument';
   res.end( Utils.formatJson( reply ) );
   // next();
}

//done
async function getAllParcels( req, res ) {
   const result = await Parcel.fetchAllparcel();
   res.json( result.rows );
}

async function getUserParcels( req, res ) {
   res.setHeader( 'Content-Type', 'text/json' );
   const id = req.params.id;
   if ( Utils.isInteger( id ) ) {
      const result = Parcel.fetchByUserId( id );

      const parcels = Parcel.fetchByUserId( id );
      const json = JSON.parse( parcels );
      switch ( json.status ) {
         case 'error':
            json.status = 'Not Found';
            res.statusCode = 404;
            res.end( Utils.formatJson( json ) );
         default:
            res.end( parcels );
      }
   }
}

async function cancelParcel( req, res ) {
   const id = req.params.id;
   if ( Utils.isInteger( id ) ) {
      const isAdmin = User.is_admin( id );
      if ( isAdmin ) {
         const result = Parcel.update( id, 'users', 'status', Parcel.CANCELLED );
         res.statusCode = 201;
         res.json( result );
      }
   } else {

   }
}

export {
   getOneParcel,
   cancelParcel,
   getAllParcels,
   getUserParcels,
   createParcel,
};