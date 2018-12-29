/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable radix */

import db from './Database';
import util from './utils';



class User {
  constructor(options) {
    // validate user input before inserting into the database
    this.options = options;
    this.firstname = options.firstname;
    this.surname = options.surname;
    this.email = options.email;
    this.password = options.password;
    this.mobile = options.mobile;
    this.is_admin = 0;
  }

  async create(res) {
    let message;
    const createUser = `
    INSERT INTO users(firstname,surname,email,password,mobile,is_admin)
    VALUES(
      '${this.firstname}',
      '${this.surname}',
      '${this.email}',
      '${this.password}',
      '${this.mobile}',
      '${this.is_admin}'
    )`;
    try {
      util.validateCreateUser(this.options);
    } catch (e) {
      res.statusCode = 400;
      return Promise.resolve(util.response('error', e.message, 0));
    }
    const exist = await User.exists(this.options.email);
    console.log(!exist);
    //prevent creating a user if a user by this email exist
    if (!exist) {
      const result = await db.query(createUser);
      message = util.response('ok', 'User created succesfully', result.rowCount);
      return Promise.resolve(message);
    }
    //Another user with email exists
    res.statusCode = 401;
    message = util.response('error', 'Another User with this Email exist', 0);
    return Promise.resolve(message);
  }


  /* check by email or id if this user is an admin */
  static async is_admin(identity) {
    const query = await db.query(`SELECT is_admin from users where id='${identity}'`);
    return Promise.resolve(query.rows[0].is_admin);
  }

  /* Check if the admin status of user identified by id is true */
  static async checkAdminById(id) {
    const query = `SELECT is_admin FROM users where id='${id}'`
    const result = await db.query(query);
    if (result.rows[0].is_admin === true)
      return Promise.resolve(true);
    else
      return Promise.resolve(false);
  }

  /* Check if the admin status of user identified by email is true */
  static async checkAdminByEmail(email) {
    const query = `SELECT is_admin FROM users where email='${email}'`
    const result = await db.query(query);
    if (result.rows[0].is_admin === true)
      return Promise.resolve(true);
    else
      return Promise.resolve(false);
  }

  /* Takes an email and promise corresponding id or take an Id and promise email*/
  static async exists(identifier) {
    let result;
    try {
      if (util.isInteger(identifier)) {
        result = await User.promiseEmail(identifier);
        return Promise.resolve(result.rowCount);
      } else if (util.isEmail(identifier)) {
        result = await User.promiseId(identifier);
        return Promise.resolve(result[0] ? result[0].id : 0);
      }
    } catch (error) {
      console.log("Something wrong happend at Exist " + error);
      return Promise.resolve(0);
    }
    return Promise.resolve([]);
  }

  static async promiseId(email) {
    const query = `SELECT id from users where email='${email}'`;
    const result = await db.query(query);
    return Promise.resolve(result.rows);
  }

  static async promiseEmail(identifier) {
    const query = `SELECT email from users where id ='${identifier}'`;
    const result = await db.query(query);
    return Promise.resolve(result.rows);
  }

  static async changePassword(userid, newPassword) {
    if (util.isText(newPassword)) {
      const result = await User.update(userid, 'password', newPassword);
      return Promise.resolve(result.rowCount);
    } else {
      return Promise.resolve(0);
    }
  }

  static async changeEmail(userid, newEmail) {
    if (util.isEmail(newEmail)) {
      const result = await User.update(userid, 'email', newEmail);
      return Promise.resolve(result.rowCount);
    } else {
      return Promise.resolve(0);
    }
  }

  static async authLogin(signInEmail, signInPassword) {
    let message;
    if (!util.isEmail(signInEmail)) {
      message = util.response('error', 'Invalid Email provided')
      return Promise.resolve(message);
    }
    const result = await User.exists(signInEmail);
    if (result > 0) {
      const pass = await User.getPassword(result);
      if (signInPassword === pass) {
        message = util.response('ok', 'login successfull', result)
        return Promise.resolve(message);
      }
      //user exist but entered wrong password
      message = util.response('error', 'Email or Password is wrong')
      return Promise.resolve(message);
    }
    //User does not exist
    message = util.response('error', 'No such User with email ' + signInEmail)
    return Promise.resolve(message);
  }

  static async getPassword(id) {
    const query = `SELECT password from users WHERE id='${id}'`;
    const result = await db.query(query);
    return Promise.resolve(result.rows[0]['password']);
  }

  static async changePhone(userId, newPhone) {
    if (util.isInteger(newPhone)) {
      const result = await User.update(userId, 'mobile', newPhone);
      return Promise.resolve(result.rowCount);
    } else {
      return Promise.resolve(0);
    }
  }

  static async changeUserMod(id, mode) {
    const result = await User.update(id, 'is_admin', mode);
    return Promise.resolve(result.rowCount);
  }


  static update(id, fieldName, value) {
    let updateQuery;
    switch (fieldName) {
      case 'password':
        updateQuery = `UPDATE users SET password='${value}' WHERE id='${id}'`
        break;
      case 'email':
        updateQuery = `UPDATE users SET email='${value}' WHERE id='${id}'`
        break;
      case 'mobile':
        updateQuery = `UPDATE users SET mobile='${value}' WHERE id='${id}'`
        break;
      case 'is_admin':
        updateQuery = `UPDATE users SET is_admin='${value}' WHERE id='${id}'`
        break;
      default:
        break;
    }
    return db.query(updateQuery);
  }
}

// User.changePhone( 2, '1000000000l' ).then( ( y ) => {
//   console.log( y )
// } );
export default User;