/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable radix */
import { db } from './Database';

import {
  Utils,
} from './utils';

class User {
  constructor(options) {
    const fields = ['firstname', 'surname', 'email', 'password', 'phone'];
    Utils.validateHasRequiredFields(fields, options);
    this.firstname = options.firstname;
    this.surname = options.surname;
    this.email = options.email;
    this.password = options.password;
    this.config = {
      acceptsEmails: true,
      acceptsAdverts: true,
    };
    this.phone = options.phone;
  }

  create() {
    const user = {
      surname: this.surname,
      firstname: this.firstname,
      email: this.email,
      phone: this.phone,
      password: this.password,
      config: this.config,
    };
   
  }

  static getId(email) {
  }

  static login(email, password) {

  }

  static add(id, user) {
   
  }

  
  static searchById(userId) {
    userId = userId.toString();
    const result = {
      status: 'error',
      user: {},
    };
    const userDb = User.getDB();
    const userList = userDb.userList;
    if (userId in userList) {
      result.status = 'ok';
      result.user = userList[userId];
      return JSON.stringify(result, null, '\t');
    }
    /* No result was found */
    return JSON.stringify(result, null, '\t');
  }

  static changePassword(userid, newPassword) {
    return User.update(userid, 'password', newPassword);
  }

  static changeEmail(userid, newEmail) {
    return User.update(userid, 'email', newEmail);
  }

  static changePhone(userId, newPhone) {
    return User.update(userId, 'phone', newPhone);
  }

  static update(userId, field, value) {
}

User.ADMIN = 'ADMIN';
User.CUSTOMER = 'CUSTOMER';
User.path = `${__dirname}/database/user.json`;
const userPath = User.path;

module.exports.User = User;
module.exports.path = User.path;


export {
  User,
  userPath,
};
