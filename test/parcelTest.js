/* eslint-disable no-undef */

import chai from 'chai';
import httpChai from 'chai-http';
import Parcel from '../server/module/Parcel';
import User from '../server/module/User';


const assert = chai.assert;
const expect = chai.expect;
chai.use( httpChai );

const parcels = {
  shortname: 'Bag of Rice',
  destination: 'Abuja',
  destination_lat: Math.random(),
  destination_lng: Math.random(),
  description: '50kg bag of Rice',
  origin: 'Ikorodu',
  origin_lat: Math.random(),
  origin_lng: Math.random(),
  weight: '90',
  price: '1500',
  distance: '350',
  owner: parseInt( Math.random(), 10 ),
};
const server =  'https://send-app.herokuapp.com';
const localhost = 'http://localhost:8080';
function toJSON( text ) {
  return JSON.stringify( text );
}

describe( 'Parcels', function () {
  it( 'Should fetch all users parcel', function () {} )
} )


describe( 'Parcel Model', () => {

  it( 'should add two numbers', ( done ) => {

    const request = chai.request( server );
     request.get( '/api/v1/users/2/parcels' )
      .end( function ( err, res ) {
        console.log( res);
        done();
        assert.equal( res.status, 200 ); 
      } )
      
  } )

} )