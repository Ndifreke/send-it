let Parcel = require( "./../library/Parcel" ).Parcel;
let utils = require( "../library/utils" );

function createParcel( req, res, next ) {
   res.setHeader( "Content-Type", "text/json" );
   let requiredParam = [
      "name",
      "destination",
      "destinationLatitude", "destinationLongitude",
      "origin",
      "originLatitude",
      "originLongitude",
      "user"
   ];
   let reply = {
      status: "ok",
      message: "success"
   };
   try {
      utils.validateHasRequiredFields( requiredParam, req.body );
      let args = {};
      requiredParam.forEach( ( param ) => {
         args[ param ] = req.body[ param ];
      } );
      if ( new Parcel( args ).create() ) {
         res.statusCode = 201;
         res.end( utils.formatJson( reply ) );
      } else {
         res.statusCode = 500;
         reply.status = "error";
         reply.message = "Unkown Error Occured";
         res.end( utils.formatJson( reply ) );
      }
   } catch ( e ) {
      res.statusCode = 400;
      reply.status = "error";
      reply.message = e.message;
      res.end( utils.formatJson( reply ) );
   }
   // next();
}

function getOneParcel( req, res, next ) {
   res.setHeader( "Content-Type", "text/json" );
   let id = req.params.id;
   if ( utils.isInteger( id ) ) {
      let json = Parcel.fetchById( id );
      switch ( JSON.parse( json ).status ) {
         case "ok":
            res.statusCode = 200;
            res.end( json );
            break;
         case "error":
            res.statusCode = 404;
            let obj = JSON.parse( json );
            obj.status = "Not Found";
            res.end( utils.formatJson( obj ) );
      }
   }
   let reply = {};
   res.statusCode = 400;
   reply.status = "error";
   reply.message = "Invalid request format or Argument";
   res.end( utils.formatJson( reply ) );
   //next();
}

function getAllParcels( req, res, next ) {
   res.setHeader( "Content-Type", "text/json" );
   res.statusCode = 200;
   res.end( utils.formatJson( Parcel.getDB() ) );
   //next();
}

function cancelParcel( req, res, next ) {
   const id = req.params.id;
   res.setHeader( "Content-Type", "text/json" );
   let reply = {
      status: "ok",
      message: "success"
   };
   if ( utils.isInteger( id ) ) {
      if ( Parcel.changeStatus( id, Parcel.CANCELLED ) ) {
         res.statusCode = 201;
         res.end( utils.formatJson( reply ) );
      }
      //parcel does not exist
      res.statusCode = 404;
      reply.status = "error";
      reply.message = "Parcel with id " + id + " does not exist";
      res.end( utils.formatJson( reply ) );
   } else {
      res.statusCode = 400;
      reply.status = "error";
      reply.message = "Invalid request format or Argument";
      res.end( utils.formatJson( reply ) );
   }
}

function getUserParcel( req, res ) {
   res.setHeader( "Content-Type", "text/json" );
   const id = req.params.id;

   if ( utils.isInteger( id ) ) {
      let parcels = Parcel.fetchByUserId( id );
      let json = JSON.parse( parcels );
      switch ( json.status ) {
         case "error":
            json.status = "Not Found"
            res.statusCode = 404;
            res.end( utils.formatJson( json ) );
         default:
            res.end( parcels );
      }
   }
   let reply = {};
   res.statusCode = 400;
   reply.status = "error";
   reply.message = "Invalid character found in request";
   res.end(utils.formatJson(reply));
}

module.exports.getOneParcel = getOneParcel;
module.exports.cancelParcel = cancelParcel;
module.exports.getAllParcels = getAllParcels;
module.exports.getUserParcel = getUserParcel;
module.exports.createParcel = createParcel;