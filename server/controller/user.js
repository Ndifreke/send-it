// const user = require( "../library/User" ).User;
import util from '../module/utils';
import User from '../module/User';
import {
  issueAccessToken
} from '../module/authenticate';

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

/**
 * Login a user in and generate a login token for the user
 * 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
async function login(req, res) {
  const {email, password } = req.body;
  const data = await User.authLogin(email, password, res);
  if (data.response[0]) {
    const id = data.response[0];
    delete data.response;
    const token = await issueAccessToken(id);
    res.setHeader("Authorization", token);
  }
  res.json(data);
}

export {
  signup,
  login,
};