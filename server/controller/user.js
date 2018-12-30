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
import {
  stat
} from 'fs';

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

async function update(req, resp) {
  async function updateCallback(token) {
    let hasUpdate = false;
    let partialUpdate = false;
    let responseBody = '';
    for (let data in req.body) {
      switch (data) {
        //send partial update status
        case 'password':
          User.changePassword(token.id, req.body[data]);
          responseBody += 'Password Updated\n';
          hasUpdate = true;
          break;
        case 'email':
          if (util.isEmail(req.body[data])) {
            User.changeEmail(token.id, req.body[data]);
            responseBody += 'Email Updated\n';
            hasUpdate = true;
          } else {
            partialUpdate = true;
            responseBody += 'Invalid Email\n';
          }
          break;
        case 'phoneNumber':
          if (util.isInteger(req.body[data])) {
            User.changePhone(token.id, req.body[data]);
            responseBody += 'PhoneNumber Updated\n';
            hasUpdate = true;
          } else {
            partialUpdate = true;
            responseBody += 'Invalid PhoneNumber';
          }
          break;
        case 'changeMode':
          const isAdmin = await User.is_admin(token.id);
          if (isAdmin) {
            User.changeUserMod(token.id, req.body[data]);
            responseBody += 'Mode Updated\n';
            hasUpdate = true;
          } else {
            partialUpdate = true;
            responseBody += 'You dont have permission to change admin';
          }
      }
    }
    let message = '', status ='';
    if (hasUpdate && partialUpdate) {
      responseBody += 'Some Update were not applied';
      message = 'Partial Update';
      status = 'ok';
    } else if (hasUpdate) {
      status = 'ok';
      message += 'Update Successfully';
    } else {
      status = 'error';
      message += 'No Update Applied';
    }
    resp.json(util.response(status, message, responseBody.split('\n')));
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
  console.log(req.body)
  const data = await User.authLogin(req.body.email, req.body.password, res);
  res.setHeader('content-type', "Application/json");
  const userId = data.response[0];
  if (userId) {
    delete data.response;
    const token = await issueAccessToken(userId);
    data.token = token;
    data.isAdmin = await User.is_admin(userId);
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
  update as upate,
  getUserData
};