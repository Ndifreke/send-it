'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable radix */

var _Database = require('./Database');

var _Database2 = _interopRequireDefault(_Database);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(options) {
    _classCallCheck(this, User);

    // validate user input before inserting into the database
    this.options = options;
    this.firstname = options.firstname;
    this.surname = options.surname;
    this.email = options.email;
    this.password = options.password;
    this.mobile = options.mobile;
    this.is_admin = 0;
  }

  _createClass(User, [{
    key: 'create',
    value: async function create(res) {
      var message = void 0;
      var createUser = '\n    INSERT INTO users(firstname,surname,email,password,mobile,is_admin)\n    VALUES(\n      \'' + this.firstname + '\',\n      \'' + this.surname + '\',\n      \'' + this.email + '\',\n      \'' + this.password + '\',\n      \'' + this.mobile + '\',\n      \'' + this.is_admin + '\'\n    )';
      try {
        _utils2.default.validateCreateUser(this.options);
      } catch (e) {
        res.statusCode = 400;
        return Promise.resolve(_utils2.default.response('error', e.message, 0));
      }
      var exist = await User.exists(this.options.email);
      console.log(!exist);
      //prevent creating a user if a user by this email exist
      if (!exist) {
        var result = await _Database2.default.query(createUser);
        message = _utils2.default.response('ok', 'User created succesfully', result.rowCount);
        return Promise.resolve(message);
      }
      //Another user with email exists
      res.statusCode = 401;
      message = _utils2.default.response('error', 'Another User with this Email exist', 0);
      return Promise.resolve(message);
    }

    /* check by email or id if this user is an admin */

  }], [{
    key: 'is_admin',
    value: async function is_admin(identity) {
      var query = await _Database2.default.query('SELECT is_admin from users where id=\'' + identity + '\'');
      return Promise.resolve(query.rows[0].is_admin);
    }

    /* Check if the admin status of user identified by id is true */

  }, {
    key: 'checkAdminById',
    value: async function checkAdminById(id) {
      var query = 'SELECT is_admin FROM users where id=\'' + id + '\'';
      var result = await _Database2.default.query(query);
      if (result.rows[0].is_admin === true) return Promise.resolve(true);else return Promise.resolve(false);
    }

    /* Check if the admin status of user identified by email is true */

  }, {
    key: 'checkAdminByEmail',
    value: async function checkAdminByEmail(email) {
      var query = 'SELECT is_admin FROM users where email=\'' + email + '\'';
      var result = await _Database2.default.query(query);
      if (result.rows[0].is_admin === true) return Promise.resolve(true);else return Promise.resolve(false);
    }

    /* Takes an email and promise corresponding id or take an Id and promise email*/

  }, {
    key: 'exists',
    value: async function exists(identifier) {
      var result = void 0;
      try {
        if (_utils2.default.isInteger(identifier)) {
          result = await User.promiseEmail(identifier);
          return Promise.resolve(result.rowCount);
        } else if (_utils2.default.isEmail(identifier)) {
          result = await User.promiseId(identifier);
          return Promise.resolve(result[0] ? result[0].id : 0);
        }
      } catch (error) {
        console.log("Something wrong happend at Exist " + error);
        return Promise.resolve(0);
      }
      return Promise.resolve([]);
    }
  }, {
    key: 'promiseId',
    value: async function promiseId(email) {
      var query = 'SELECT id from users where email=\'' + email + '\'';
      var result = await _Database2.default.query(query);
      return Promise.resolve(result.rows);
    }
  }, {
    key: 'promiseEmail',
    value: async function promiseEmail(identifier) {
      var query = 'SELECT email from users where id =\'' + identifier + '\'';
      var result = await _Database2.default.query(query);
      return Promise.resolve(result.rows);
    }
  }, {
    key: 'changePassword',
    value: async function changePassword(userid, newPassword) {
      if (_utils2.default.isText(password)) {
        var result = await User.update(userid, 'password', newPassword);
        return Promise.resolve(result.rowCount);
      } else {
        return Promise.resolve(0);
      }
    }
  }, {
    key: 'changeEmail',
    value: async function changeEmail(userid, newEmail) {
      if (_utils2.default.isEmail(newEmail)) {
        var result = await User.update(userid, 'email', newEmail);
        return Promise.resolve(result.rowCount);
      } else {
        return Promise.resolve(0);
      }
    }
  }, {
    key: 'authLogin',
    value: async function authLogin(signInEmail, signInPassword) {
      var message = void 0;
      if (!_utils2.default.isEmail(signInEmail)) {
        message = _utils2.default.response('error', 'Invalid Email provided');
        return Promise.resolve(message);
      }
      var result = await User.exists(signInEmail);
      if (result > 0) {
        var pass = await User.getPassword(result);
        if (signInPassword === pass) {
          message = _utils2.default.response('ok', 'login successfull', result);
          return Promise.resolve(message);
        }
        //user exist but entered wrong password
        message = _utils2.default.response('error', 'Email or Password is wrong');
        return Promise.resolve(message);
      }
      //User does not exist
      message = _utils2.default.response('error', 'No such User with email ' + signInEmail);
      return Promise.resolve(message);
    }
  }, {
    key: 'getPassword',
    value: async function getPassword(id) {
      var query = 'SELECT password from users WHERE id=\'' + id + '\'';
      var result = await _Database2.default.query(query);
      return Promise.resolve(result.rows[0]['password']);
    }
  }, {
    key: 'changePhone',
    value: async function changePhone(userId, newPhone) {
      if (_utils2.default.isInteger(newPhone)) {
        var result = await User.update(userId, 'mobile', newPhone);
        return Promise.resolve(result.rowCount);
      } else {
        return Promise.resolve(0);
      }
    }
  }, {
    key: 'update',
    value: function update(id, fieldName, value) {
      var updateQuery = void 0;
      switch (fieldName) {
        case 'password':
          updateQuery = 'UPDATE users SET password=\'' + value + '\' WHERE id=\'' + id + '\'';
          break;
        case 'email':
          updateQuery = 'UPDATE users SET email=\'' + value + '\' WHERE id=\'' + id + '\'';
          break;
        case 'mobile':
          updateQuery = 'UPDATE users SET mobile=\'' + value + '\' WHERE id=\'' + id + '\'';
          break;
        case 'is_admin':
          updateQuery = 'UPDATE users SET is_admin=\'' + value + '\' WHERE id=\'' + id + '\'';
          break;
        default:
          break;
      }
      return _Database2.default.query(updateQuery);
    }
  }]);

  return User;
}();

// User.changePhone( 2, '1000000000l' ).then( ( y ) => {
//   console.log( y )
// } );


exports.default = User;