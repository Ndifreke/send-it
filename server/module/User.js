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
    this.id = options.id;
    this.firstname = options.firstname;
    this.surname = options.surname;
    this.email = options.email;
    this.password = options.password;
    this.mobile = options.mobile;
    this.is_admin = options.is_admin;
  }

  async create(res) {
    try {
      util.validateCreateUser(this);
    } catch (e) {
      res.statusCode = 400;
      return Promise.resolve(util.response('error', e.message, 0));
    }
    let message;
    const createUser = `
    INSERT INTO users(firstname,surname,email,password,mobile,is_admin)
    VALUES(
      '${this.getFirstName()}',
      '${this.getSurname()}',
      '${this.getEmail()}',
      '${this.getPassword()}',
      '${this.getMobile()}',
      '${false}'
    )`;
    const user = await User.lookup(this.options.email);
    //prevent creating a user if a user by this email exist
    if (!user) {
      const result = await db.query(createUser);
      message = util.response('ok', 'User created succesfully', result.rowCount);
      return Promise.resolve(message);
    }
    //Another user with email exists
    res.statusCode = 401;
    message = util.response('error', 'Another User with this Email exist', 0);
    return Promise.resolve(message);
  }

  static async lookup(userId, cb) {
    let field = 'email';
    if (/^\d+$/.test(userId)) {
      field = 'id';
    }
    const query = `SELECT id, firstname, surname,email,password, mobile, is_admin FROM users
    WHERE ${field} = '${userId}'`;
    console.log(query)
    let userData = null;
    try {
      const result = await db.query(query);
      userData = result.rows[0];
      return Promise.resolve(new User(userData));
    } catch (e) {
      return Promise.resolve(userData);
    }
  }


  /* check by email or id if this user is an admin */
  static async is_admin(identity) {
    const query = await db.query(`SELECT is_admin from users where id='${identity}'`);
    return Promise.resolve(query.rows[0].is_admin);
  }

  getIsAdmin() {
    return this.is_admin;
  }

  getID() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  getSurname() {
    return this.surname;
  }

  getEmail() {
    return this.email;
  }

  getFirstName() {
    return this.firstname;
  }

  getMobile() {
    return this.mobile;
  }

  async changePassword(password) {
    const result = await User.update(this.getID(), 'password', password);
    return Promise.resolve(result.rowCount);
  }

  async changeEmail(email) {
    const result = await User.update(this.getID(), 'email', email);
    return Promise.resolve(result.rowCount);
  }

  async changePhone(phoneNumber) {
    if (util.isInteger(phoneNumber)) {
      const result = await User.update(this.getID(), 'mobile', phoneNumber);
      return Promise.resolve(result.rowCount);
    } else {
      return Promise.resolve(0);
    }
  }

  async changeMode(mode) {
    const result = await User.update(this.getID(), 'is_admin', mode);
    return Promise.resolve(result.rowCount);
  }

  async parse() {
    const processingQuery = `select count(status) from parcels where owner = ${this.getID()} AND (status != 'DELIVERED' OR status !='CANCELLED')`;
    const deliveredQuery = `select count(status) from parcels where (owner = ${this.getID()} AND status ='DELIVERED') `;
    const cancelledQuery = `select count(status) from parcels where (owner = ${this.getID()} AND status ='CANCELLED') `;
    const procesResult = await db.query(processingQuery);
    const deliveredResult = await db.query(deliveredQuery);
    const cancelledResult = await db.query(cancelledQuery);
    return Promise.resolve({
      id: this.getID(),
      firstname: this.getFirstName(),
      surname: this.getSurname(),
      password: this.getPassword(),
      email: this.getEmail(),
      mobile: this.getMobile(),
      isAdmin: this.getIsAdmin(),
      deliveredCount: deliveredResult.rows[0].count,
      processingCount: procesResult.rows[0].count,
      cancelledCount: cancelledResult.rows[0].count
    })
  }


  static update(id, field, value) {
    let updateQuery;
    switch (field) {
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

  static async authLogin(signInEmail, signInPassword) {
    let message;
    if (!util.isEmail(signInEmail)) {
      message = util.response('error', 'Invalid Email provided')
      return Promise.resolve(message);
    }
    const user = await User.lookup(signInEmail);
    if (user) {
      const pass = await user.getPassword();
      if (signInPassword === pass) {
        message = util.response('ok', 'login successfull')
        delete message.response;
        message.id = user.getID();
        message.isAdmin = user.getIsAdmin();
        return Promise.resolve(message);
      }
    }
    //User does not exist
    message = util.response('error', 'No such User with email ' + signInEmail)
    return Promise.resolve(message);
  }


}
//console.log(User.lookup(20).then(user => console.log(user)));
export default User;