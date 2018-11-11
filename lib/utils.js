function validateHasRequiredFields( required, inputOptions ) {
 let missingField;
 let hasRequiredField = required.every( ( field ) => {
  missingField = field;
  return field in inputOptions;
 } );
 if ( !hasRequiredField )
  throw Error( missingField + " field is required to create a user" );
}

function formatJson( json ) {
 return JSON.stringify( json, null, "\t" );
}

module.exports.validateHasRequiredFields = validateHasRequiredFields;
module.exports.formatJson = formatJson;