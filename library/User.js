let db = require( "./Database" ).db;
let utils = require( "./utils" );

class User {

   constructor( options ) {
      this.validateInput( options )
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
         config: this.config
      }
      let id = parseInt( User.getDB().lastId ) + 1;
      User.add( id, user );
   }

   static getId( email ) {
      let userDb = User.getDB();
      let userList = userDb.userList;
      for ( const userId in userList ) {
         if ( userList[ userId ].email === email )
            return userId;
      }
      return -1;
   }

   static login( email, password ) {
      const userId = User.getId( email );
      if ( userId !== -1 ) {
         const data = JSON.parse( User.fetchById( userId ) )
         if ( data.user.password === password ) {
            //successfull login
            return userId;
         }
      }
      return -1;
   }

   static add( id, user ) {
      let isSaved = true;
      try {
         let database = User.getDB();
         console.log( user )
         database.userList[ id ] = user;
         User.save( database );
      } catch ( e ) {
         //Something happened which prevented saving this parcel
         isSaved = false;
      } finally {
         if ( isSaved ) {
            let db = User.getDB();
            db.lastId = parseInt( db.lastId ) + 1;
            User.save( db );
            return true;
         }
         return false;
      }
   }
   static save( data ) {
      db.writeToDb( JSON.stringify( data, null, "\t" ), User.path );
   }

   static fetchById( userId ) {
      userId = userId.toString();
      const result = {
         status: "error",
         user: {}
      }
      let userDb = User.getDB();
      let userList = userDb.userList;
      if ( userId in userList ) {
         result.status = "ok";
         result.user = userList[ userId ];
         return JSON.stringify( result, null, "\t" );
      }
      /* No result was found*/
      return JSON.stringify( result, null, "\t" );

   }

   static getDB() {
      return db.readDb( User.path );
   }

   validateInput( inputOptions ) {
      let missingField;
      let fields = [ "firstname","surname", "email", "password", "phone" ];
      let hasRequiredField = fields.every( ( field ) => {
         missingField = field;
         return field in inputOptions;
      } )
      if ( !hasRequiredField )
         throw Error( missingField + " field is required to create a user" );
   }

   static changePassword( userid, newPassword ) {
      return User.update( userid, "password", newPassword );
   }

   static changeEmail( userid, newEmail ) {
      return User.update( userid, "email", newEmail );
   }
   static changePhone( userId, newPhone ) {
      return User.update( userId, "phone", newPhone );
   }

   static update( userId, field, value ) {
      let userObject = JSON.parse( User.fetchById( userId ) );
      if ( userObject.status !== "error" ) {
         let user = userObject.user;
         if ( field in user ) {
            user[ field ] = value;
            let database = User.getDB();
            database.userList[ userId ] = user;
            User.save( database );
            return true;
         }
         return false;
      }
      return false;
   }

}

User.ADMIN = "ADMIN";
User.CUSTOMER = "CUSTOMER";
User.path = __dirname + "/database/user.json";
const path = User.path;

module.exports.User = User;
module.exports.path = User.path;


export {
   User,
   path 
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

//console.log( User.login( "nm", "my password" ) )