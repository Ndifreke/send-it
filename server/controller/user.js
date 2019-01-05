// const user = require( "../library/User" ).User;
import util from '../module/utils';
import {
  issueAccessToken,
  verifyAccessToken
} from '../module/authenticate';
import User from '../module/User';

/**
 * Signup A User to Send-It, given the users signup information
 * 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
async function signup(req, res) {
  console.log(req.body)
  const created = await new User(req.body).create(res);
  res.json(created);
}

async function update(req, resp) {
  async function updateCallback(token) {
    const id = req.params.userID || token.id;
    let hasUpdate = false;
    let partialUpdate = false;
    let responseBody = '';
    const user = await User.lookup(id);

    if (user) {
      for (let data in req.body) {
        switch (data) {
          //send partial update status
          case 'password':
            user.changePassword(req.body.password);
            responseBody += 'Password Updated\n';
            hasUpdate = true;
            break;
          case 'email':
            if (util.isEmail(req.body[data])) {
              user.changeEmail(req.body.email);
              responseBody += 'Email Updated\n';
              hasUpdate = true;
            } else {
              partialUpdate = true;
              responseBody += 'Invalid Email\n';
            }
            break;
          case 'phoneNumber':
            if (util.isInteger(req.body[data])) {
              user.changePhone(req.body.phoneNumber);
              responseBody += 'PhoneNumber Updated\n';
              hasUpdate = true;
            } else {
              partialUpdate = true;
              responseBody += 'Invalid PhoneNumber';
            }
            break;
          case 'admin':
            const isAdmin = await User.is_admin(token.id);
            if (isAdmin) {
              user.changeMode(req.body[data]);
              responseBody += 'Mode Updated\n';
              hasUpdate = true;
            } else {
              partialUpdate = true;
              responseBody += 'You dont have permission to change admin';
            }
        }
      }
    }
    let message = '',
      status = '';
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

function getUserData(req, resp) {
  async function sendUserData(token) {
    const user = await User.lookup(token.id);
    const data = await user.parse();
    delete data.password;
    console.log(data)
    resp.json({
      status: "ok",
      data: data
    });
  }
  verifyAccessToken(req, resp, sendUserData);
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
  if (data.id) {
    console.log(data)
    const token = await issueAccessToken(data.id);
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
  update as upate,
  getUserData
};