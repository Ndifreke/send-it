/* eslint-disable no-undef */

import chai from 'chai';
import httpChai from 'chai-http';
import Parcel from '../server/module/Parcel';
import User from '../server/module/User';
import app from '../app';
import util from '../server/module/utils';

import {authenticate, tokenize } from '../server/module/authenticate';


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

describe( 'JWT', function () {
  it( 'Should issue a jwt token', function (done) {
 return new Promise(function(resole){
  tokenize(5,true).then(function(token){
    assert.isNotEmpty(token);
  })
  done();
})

  })
})

describe("utility", function(){
  it("should validate an a good email", function(){
    assert.isNotFalse(util.isEmail("user@email.com"));
  })
  it("should flag a bad email", function(){
    assert.isFalse(util.isEmail("bademailatsome.com"))
  })
  it("should Accept a valid phone number", function(){
    assert.isTrue(util.isInteger(5245785875));
  })
  it("should Accept a valid phone number", function(){
    assert.isFalse(util.isInteger("ABC524578L5875"));
  })
  it("Shouold validate a cordinate object",function(){
    assert.isTrue(util.isNumeric(0.255888));
  })
  it("Shouold flag an invalid cordinate object",function(){
    assert.isFalse(util.isNumeric(255888));
  })
})
 

describe( 'Parcel Model', () => {
  it( 'Valid status code from fetching a parcel', ( done ) => {
    const request = chai.request( app );
     request.get( '/api/v1/users/2/parcels' )
      .end( function ( err, res ) {
        assert.equal( res.statusCode, '200' ); 
        done();
      } )
      
  } )

} )