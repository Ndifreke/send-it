// const user = require( "../library/User" ).User;
import util from '../module/utils';
import User from '../module/User';
import {
  issueAccessToken,
  verifyAccessToken
} from '../module/authenticate';
import {
  utils
} from 'mocha';

/**
 * Signup A User to Send-It, given the users signup information
 * 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
async function signup(req, res) {
  const created = await new User(req.body).create(res);
  res.json(created);
}

async function upate(req, resp) {
  async function updateCallback(token) {
    console.log(token.id)
    resp.statusCode = 200;
    let result = {
      status: 'ok',
      message: 'updated'
    }
    console.log(req.body)
    for (let data in req.body) {
      switch (data) {
        case 'password':
          User.changePassword(token.id, req.body[data]);
          break;
        case 'email':
          if (util.isEmail(req.body[data])) {
            User.changeEmail(token.id, req.body[data]);
          } else {
            resp.statusCode = 400;
            result = util.response('error', 'Invalid Email');
          }
          break;
        case 'phoneNumber':
          if (util.isInteger(req.body[data])) {
            User.changePhone(token.id, req.body[data]);
          } else {
            resp.statusCode = 400;
            result = util.response('error', 'Invalid PhoneNumber');
          }
          break;
        case 'changeMode':
          const isAdmin = await User.is_admin(token.id);
          if (isAdmin) {
            User.changeUserMod(token.id, req.body[data]);
          } else {
            result = util.response('error', 'You dont have permission to change admin');
            resp.statusCode = 400;
          }
      }
    }
    resp.json(result);
  }
  verifyAccessToken(req, resp, updateCallback);
}

async function getUserData() {

}

/**
 * Login a user in and generate a login token for the user
 * 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
async function login(req, res) {
  const {
    email,
    password
  } = req.body;
  console.log(req.body)
  const data = await User.authLogin(email, password, res);
  res.setHeader('content-type', "Application/json");
  const userId = data.response[0];
  if (userId) {
    delete data.response;
    const token = await issueAccessToken(userId);
    data.token = token;
    res.setHeader("Authorization", token);
    res.statusCode = 200;
    res.json(data);
  } else {
    res.statusCode = 403;
    res.json(data);
  }
}

export {
  signup,
  login,
  upate,
  getUserData
};