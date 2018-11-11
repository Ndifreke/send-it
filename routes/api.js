let Parcel = require( "./../lib/Parcel" ).Parcel;

function createOrder( req, resp, next ) {
 resp.end(JSON.stringify(req.body));
}



module.exports.createParcel = createOrder;