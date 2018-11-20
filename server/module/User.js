/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-finally */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable radix */

import db from './Database';
import util from './utils';

class User {
  constructor( options ) {
    // validate user input before inserting into the database
    util.validateCreateUser( options );
    this.firstname = options.firstname;
    this.surname = options.surname;
    this.email = options.email;
    this.password = options.password;
    this.mobile = options.mobile;
    this.is_admin = 0;
  }

  create() {
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
    return db.query( createUser );
  }

   static is_admin( id ) {
    return this.getId(id);    
  }

  static getId( identifier) {
    try {
      if ( util.isEmail( identifier ) ) {
        const query = `SELECT id from users where email = ${identifier}`;
        return db.query( query );
      }
      if ( util.isInteger( identifier ) ) {
        const query = `SELECT id from users where id = ${identifier}`;
        return db.query( query );
      }
    } catch ( e ) {
      throw Error( "Something happend in User.getId " + e.message )
    }
    return null;
  }

  static login( email, password ) {

  }

  static add( id, user ) {

  }


  static searchById( userId ) {

  }

  static changePassword( userid, newPassword ) {
    return User.update( userid, 'password', newPassword );
  }

  static changeEmail( userid, newEmail ) {
    return User.update( userid, 'email', newEmail );
  }

  static changePhone( userId, newPhone ) {
    return User.update( userId, 'phone', newPhone );
  }

  static update( userId, field, value ) {}
}


export default User;