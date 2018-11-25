'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.login = exports.signup = undefined;

var _utils = require('../module/utils');

var _utils2 = _interopRequireDefault(_utils);

var _User = require('../module/User');

var _User2 = _interopRequireDefault(_User);

var _authenticate = require('../module/authenticate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Signup A User to Send-It, given the users signup information
 * 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
async function signup(req, res) {
  var created = await new _User2.default(req.body).create(res);
  res.json(created);
}

/**
 * Login a user in and generate a login token for the user
 * 
 * @param {response} res - Request object
 * @param {request} req - Response object.
 * @returns {void}
 */
// const user = require( "../library/User" ).User;
async function login(req, res) {
  var loginData = Object.assign({}, req.body);
  var data = await _User2.default.authLogin(loginData.email, loginData.password, res);
  if (data.response[0]) {
    var id = data.response[0];
    delete data.response;
    var token = await (0, _authenticate.issueAccessToken)(id);
    data.token = token;
  }
  res.json(data);
}

exports.signup = signup;
exports.login = login;