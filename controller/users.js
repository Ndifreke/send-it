const user = require( "../library/User" ).User;

import {
 User
} from "../library/User";

function signup( req, res ) {

}

function login( req, res ) {
 res.setHeader("Content-Type","text/json");
 const email = req.body.email;
 const password = req.body.password;
 console.log(password+email)
 const id = user.login( email, password );
 console.log(id)
 if ( id !== -1 ) {
  res.statusCode = 200;
  res.end( JSON.stringify( {
   status: "ok",
   message: "logged in as " + id
  } ) )
 }
 res.statusCode = 401; //unauthorised
 res.end( JSON.stringify( {
  status: "error",
  message: "Not Loggin"
 } ) )
}


function createParcel( req, res ) {

}

function changeDestination( req, res ) {

}

function changeSettings( req, res ) {

}

function createParcelOrder( req, res ) {

}

function changeStatus( req, res ) {

}

function changeLocation( req, res ) {

}

export {
 signup,
 login,
 createParcelOrder,
 changeDestination,
 changeSettings,
 changeStatus,
 changeLocation
};

console.log(user.login("someone@email","password"));