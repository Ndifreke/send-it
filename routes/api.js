let Parcel = require( "./../lib/Parcel" ).Parcel;
let utils = require( "../lib/utils" );

function createOrder( req, resp, next ) {
    let requiredParam = [
        "name",
        "destination",
        "destinationLatitude", "destinationLongitude",
        "origin",
        "originLatitude",
        "originLongitude",
    ];
 
    let reply = {
        status: "ok",
        message: "success"
    };

    try {
        resp.setHeader( "Content-Type", "text/json" );
        utils.validateHasRequiredFields( requiredParam, req.body );
        let args = {};
        requiredParam.forEach( ( param ) => {
            args[ param ] = req.body[ param ];
        } );
        if ( new Parcel( args ).create() ) {
            resp.end( JSON.stringify( reply ) );
        } else {
            reply.status = "error";
            reply.message = "Unkown Error Occured";
            resp.end( JSON.stringify( reply ) );
        }
    } catch ( e ) {
        reply.status = "error";
        reply.message = e.message;
        resp.end( JSON.stringify( reply ) );
    }

}

module.exports.createParcel = createOrder;