module.exports.validateHasRequiredFields = function ( required, inputOptions ) {
 let missingField;
 let hasRequiredField = required.every( ( field ) => {
  missingField = field;
  return field in inputOptions;
 } );
 if ( !hasRequiredField )
  throw Error( missingField + " field is required to create a user" );
}