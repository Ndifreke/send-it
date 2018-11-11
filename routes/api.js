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


module.exports.createParcel = createOrder;