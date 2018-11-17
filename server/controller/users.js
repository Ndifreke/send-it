// const user = require( "../library/User" ).User;
import {
  Utils,
} from '../module/utils';

import {
  User,
} from '../module/User';

function signup(req, res) {
  res.setHeader('Content-Type', 'text/json');
  console.log(req.body);
  const {
    firstname,
    email,
    password,
    phone,
    surname,
  } = req.body;
  // validate here

  // then
  const option = {
    firstname,
    email,
    password,
    phone,
    surname,
  };
  if (!User.getId(email)) {
    // create and confirm user is created
    if (new User(option).create() && User.getId(email)) {
      const message = Utils.respondWith('created', 'Successfully created a user');
      res.statusCode = 201;
      res.end(message);
    } else {
      res.statusCode = 500;
      const message = Utils.respondWith('error', 'A server Error occured');
      res.end(message);
    }
  }
  const message = Utils.respondWith('forbidden', 'A user by this email exist already');
  res.end(message);
}

/* Log a user in using his email and password */
function login(req, res) {
  res.setHeader('Content-Type', 'text/json');
  const {
    email,
    password,
  } = req.body;
  console.log(password + email);
  const id = User.login(email, password);
  console.log(id);
  if (id) {
    res.statusCode = 200;
    const message = Utils.respondWith('ok', `logged In as ${id}`);
    res.end(message);
  }
  res.statusCode = 401; // unauthorised
  const message = Utils.respondWith('error', `Could not log in ${id}`);
  res.end(message);
}


function createParcel(req, res) {

}

function changeDestination(req, res) {

}

function changeSettings(req, res) {

}

function createParcelOrder(req, res) {

}

function changeStatus(req, res) {

}

function changeLocation(req, res) {

}

export {
  signup,
  login,
  createParcelOrder,
  changeDestination,
  changeSettings,
  changeStatus,
  changeLocation,
};
