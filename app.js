let http = require( "http" );
let express = require( "express" );
let path = require( "path" );
let bcrypt = require( "bcrypt" );
let cookieParser = require( "cookie-parser" );
let bodyParser = require( "body-parser" );
let apis = require("./routes/api");

let app = express();

app.set( "views", path.join( __dirname, "./views" ) );
app.set( "view engine", "ejs" );
app.set( "port", process.env.PORT );
app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( bodyParser() );

// for powering front end pages
/*
app.get("/") //home page
app.get("/user/:id/settings")
app.get("api/v1/parcels") //get all parcels
app.get("api/v1/parcels/:id") //get parel by id
app.get("/api/users/:id/parcels") //get parcel by user
app.put("/api/parcels/:id/cancel") //cancel parcel
app.post("/api/parcels") //create new parcel
app.get("api/v1/users/:id/")
*/
app.post("/parcels", apis.createParcel);
//app.put("/api/v1/parcels", )




http.createServer( app ).listen( app.get( "port" ) );