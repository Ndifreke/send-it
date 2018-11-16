let fs = require( "fs" );
let join = require( "path" ).join;

class FileSystem {

      writeFile( path, data ) {
            fs.writeFileSync( path, data );
      }

      readFile( path ) {
            return fs.readFileSync( path );
      }
      
      remove( path ) {
            try {
                  fs.unlinkSync( path );
            } catch ( e ) {

            }
      }
}

exports.fileSystem = new FileSystem();