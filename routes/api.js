let Parcel = require( "./../lib/Parcel" ).Parcel;
let utils = require( "../lib/utils" );

function createOrder( req, resp, next ) {
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


module.exports.createParcel = createOrder;
module.exports.getParcel = getParcel;
module.exports.cancelParcel = cancelParcel;
module.exports.parcelRoute = parcelRoute;
module.exports.getAllParcels = getAllParcels;
module.exports.routeUsers = routeUsers;