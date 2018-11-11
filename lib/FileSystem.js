let fs = require( "fs" );
let join = require( "path" ).join;

class FileSystem {

   writeFile( path, data ) {
      fs.writeFileSync( path, data );
   }

   readFile( path ) {
         return fs.readFileSync( path );
}
}

exports.fileSystem = new FileSystem();