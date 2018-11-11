let Parcel = require( "./../lib/Parcel" ).Parcel;
let utils = require( "../lib/utils" );

function createParcel( req, resp, next ) {
    resp.setHeader( "Content-Type", "text/json" );
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
            resp.statusCode = 201;
            resp.end( utils.formatJson( reply ) );
        } else {
            resp.statusCode = 500;
            reply.status = "error";
            reply.message = "Unkown Error Occured";
            resp.end( utils.formatJson( reply ) );
        }
    } catch ( e ) {
        resp.statusCode = 400;
        reply.status = "error";
        reply.message = e.message;
        resp.end( utils.formatJson( reply ) );
    }

}

function getParcel( req, resp, next ) {
    resp.setHeader( "Content-Type", "text/json" );
    let id = req.url.slice( 1 );
    let json = Parcel.fetchById( id );

    if ( /^\d+$/.test( id ) ) {
        switch ( JSON.parse( json ).status ) {
            case "ok":
                resp.statusCode = 200;
                resp.end( json );
                break;
            case "error":
                resp.statusCode = 404;
                let obj = JSON.parse( json );
                obj.status = "Not Found";
                resp.end( utils.formatJson( obj ) );
        }
    }
    resp.statusCode = 400;
    reply.status = "error";
    reply.message = "Invalid request format or Argument";
    resp.end( json );
}

function getAllParcels( req, resp, next ) {
    resp.setHeader( "Content-Type", "text/json" );
    resp.statusCode = 200;
    resp.end( utils.formatJson( Parcel.getDB() ) );
}

function cancelParcel( req, resp, next ) {
    resp.setHeader( "Content-Type", "text/json" );
    let reply = {
        status: "ok",
        message: "success"
    };
    let id = req.url.slice( 1 );
    if ( /^\d+$/.test( id ) ) {
        if ( Parcel.changeStatus( id, Parcel.CANCELLED ) ) {
            resp.statusCode = 201;
            resp.end( utils.formatJson( reply ) );
        }
        //parcel does not exist
        resp.statusCode = 404;
        reply.status = "error";
        reply.message = "Parcel with id " + id + " does not exist";
        resp.end( utils.formatJson( reply ) );
    } else {
        resp.statusCode = 400;
        reply.status = "error";
        reply.message = "Invalid request format or Argument";
        resp.end( utils.formatJson( reply ) );
    }
}

module.exports.getParcel = getParcel;
module.exports.cancelParcel = cancelParcel;
module.exports.parcelRoute = parcelRoute;
module.exports.getAllParcels = getAllParcels;
module.exports.routeUsers = routeUsers;
module.exports.createParcel = createParcel;
