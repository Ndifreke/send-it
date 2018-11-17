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
    const id = parseInt(User.getDB().lastId) + 1;
    return User.add(id, user);
  }

  static getId(email) {
    const userDb = User.getDB();
    const userList = userDb.userList;
    for (const userId in userList) {
      if (userList[userId].email === email) { return userId; }
    }
    return 0;
  }

  static login(email, password) {
    const userId = User.getId(email);
    if (userId) {
      const data = JSON.parse(User.fetchById(userId));
      if (data.user.password === password) {
        // successfull login
        return userId;
      }
    }
    return 0;
  }

  static add(id, user) {
    let isSaved = true;
    try {
      const database = User.getDB();
      database.userList[id] = user;
    
      User.save(database);
    } catch (e) {
      // Something happened which prevented saving this parcel
      isSaved = false;
    } finally {
      if (isSaved) {
        const db = User.getDB();
        db.lastId = parseInt(db.lastId) + 1;
        User.save(db);
        return true;
      }
      return false;
    }
  }

  static save(data) {
    db.writeToDb(JSON.stringify(data, null, '\t'), User.path);
  }

  static fetchById(userId) {
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

  static getDB() {
    return db.readDb(User.path);
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
    const userObject = JSON.parse(User.fetchById(userId));
    if (userObject.status !== 'error') {
      const user = userObject.user;
      if (field in user) {
        user[field] = value;
        const database = User.getDB();
        database.userList[userId] = user;
        User.save(database);
        return true;
      }
      return false;
    }
    return false;
  }
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

/*
new User( {
   firstname: "Ndifeke",
   surname: "ekim",
   email: "some@email",
   password: "my password",
   phone: "00803574754"
} ).create()
*/

// console.log( User.login( "nm", "my password" ) )
