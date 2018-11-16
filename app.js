let http = require( "http" );
let express = require( "express" );
let path = require( "path" );
let bcrypt = require( "bcrypt" );
let cookieParser = require( "cookie-parser" );
let bodyParser = require( "body-parser" );
let parcel = require( "./controller/parcel" );

import {
 cancelParcel,
 createParcel,
 getOneParcel,
 getUserParcel,
 getAllParcels
}
from "./controller/parcel";

import {
 signup,
 login,
 changeDestination,
 createParcelOrder,
 changeSettings,
 changeStatus,
 changeLocation
} from "./controller/users";


let app = express();

app.set( "views", path.join( __dirname, "./views" ) );
app.set( "view engine", "ejs" );
app.set( "port", process.env.PORT );
app.use( express.static( path.join( __dirname, "template" ) ) );
app.use( bodyParser() );

/*Parcel Routes  */
app.post( "/api/v1/parcels", createParcel );
app.get( "/api/v1/parcels", getAllParcels );
app.get( "/api/v1/parcels/:id", getOneParcel );
app.put( "/api/v1/parcels/:id", cancelParcel );
app.use( "/api/v1/users/:id/parcels", getUserParcel );

/*  User Route */
app.post( "/api/v1/auth/signup", signup );
app.post( "/api/v1/auth/login", login );
app.put( "/api/v1/settings", changeSettings );
app.put( "/api/v1/parcels/:id/status", changeStatus);
app.put( "/api/v1/parcels/:id/destination", changeDestination );
app.put( "/api/v1/parcels/:id/presentLocation", changeLocation );

app.use( function ( req, res ) {
 res.statusCode = 500;
 let msg = {
  status: "error",
  message: "we dont quiit understand your request at this time. Project is WIP"
 }
 res.end( JSON.stringify( msg ), null, "\t" );
} )
http.createServer( app ).listen( app.get( "port" ) );