/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable import/prefer-default-export */

class Utils {
  static validateParcel( options ) {
    const requireFields = [
      'shortname',
      'destination',
      'destination_lat',
      'destination_lng',
      'origin',
      'origin_lat',
      'origin_lng',
      'description',
      'distance',
      'weight',
      'price',
    ];
    let testField;
    const validated = requireFields.every( ( field ) => {
      testField = field;
      return Utils.filterParcelInput( field, options[ field ] );
    } );
    if ( !validated ) {
      throw Error( `${testField} field is required to create a Parcel` );
    }
  }

  static filterParcelInput( field, value ) {
    switch ( field ) {
      case 'description':
      case 'origin':
      case 'shortname':
      case 'destination':
        return Utils.isText( value );
      case 'destination_lat':
      case 'destination_lng':
      case 'origin_lat':
      case 'origin_lng':
        return Utils.isNumeric( value );
      case 'distance':
      case 'weight':
      case 'price':
        return ( Utils.isNumeric( value ) || Utils.isInteger( value ) );
    }
    // any other field is not our concern ignore it
    return true;
  }

  static validateCreateUser( options ) {
    const requireFields = [ 'firstname', 'email', 'password', 'surname', 'mobile' ];
    let testField;
    let testValue;

    const valid = requireFields.every( ( field ) => {
      testField = field;
      testValue = options[ field ];
      switch ( field ) {
        case 'email':
          return Utils.isEmail( testValue );
        case 'firstname':
          return Utils.isName(testValue);
        case 'password':
          return Utils.isName(testValue); 
        case 'surname':
          return Utils.isName( testValue );
        case 'mobile':
          return Utils.isInteger( testValue );
        default:
          return Utils.isText( testValue );
      }
    } );
    if ( !valid ) {
      throw Error( `Field ${testField} does not meet requirement value: ${testValue}` );
    }
  }

  static isInteger( value ) {
    return ( /^\d+$/.test( value ) );
  }

  static isEmail( email ) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test( String( email ).toLowerCase() );
  }

  static isNumeric( cord ) {
    return /^[0-9]+\.[\d]+$/.test( cord );
  }

  static isText( text ) {
    return ( /^[a-zA-Z0-9\s\.,\+\-\(\)_\w]+$/.test( text ) );
  }

  static isName( name ) {
    return ( /^[a-zA-Z0-9-_]+$/.test( name ) );
  }
  static response( status, message, body ) {
    return {
      status: status,
      message: message,
      response:  (body instanceof Array) ?  body : [ body ] 
    }
  }
}


const util = Utils;
//module.exports.util = util;
export default util;
