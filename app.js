let http = require( "http" );
let express = require( "express" );
let path = require( "path" );
let bcrypt = require( "bcrypt" );
let cookieParser = require( "cookie-parser" );
let bodyParser = require( "body-parser" );
let api = require( "./routes/api" );

let app = express();

app.set( "views", path.join( __dirname, "./views" ) );
app.set( "view engine", "ejs" );
app.set( "port", process.env.PORT );
app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( bodyParser() );


app.post( "/api/v1/parcels", api.createParcel );

app.get( "/api/v1/parcels", api.getAllParcels );

app.put( "/api/v1/parcels/", api.cancelParcel );


//handle for both get parcel and put parcel
app.use( "/api/v1/users", api.routeUsers );
app.use( "/api/v1/parcels/", api.parcelRoute );

app.use(function(req,resp){
 resp.statusCode = 500;
 let msg = {
  status :"error",
  message: "we dont quiit understand your request at this time. Project is WIP"
 }
 resp.end(JSON.stringify(msg), null, "\t");
})
http.createServer( app ).listen( app.get( "port" ) );