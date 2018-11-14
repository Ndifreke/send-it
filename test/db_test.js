let chai = require( "chai" );
let assert = chai.assert;
let db = require( "../lib/Database" ).db;
let fs = require( "fs" );
let filesystem = require( "../lib/FileSystem" ).fileSystem;
const db_path = __dirname + "/testDb.json";

describe( "Persistent database operations", function () {

 describe( "read and write operations", function () {

  it( "Should read and write file from the disk", function () {
   filesystem.remove( db_path );
   db.readDb( db_path );
   assert.isTrue( fs.existsSync( db_path ) );
  } )


 } )


} )