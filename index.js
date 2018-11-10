let http = require( "http" );
let radis = require( "radis" );
let express = require( "express" );
let path = require( "path" );
let bcrypt = require( "bcrypt" );
let cookieParser = require( "cookie-parser" );
let bodyParser = require( "body-parser" );


let app = express();
radis.createClient();

app.set( "views", path.join( __dirname, "./views" ) );
app.set( "view engine", "ejs" );
app.use( express.static( path.join( __dirname, "public" ) ) );
app.use( bodyParser() );