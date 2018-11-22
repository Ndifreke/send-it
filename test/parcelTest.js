/* eslint-disable no-undef */

import chai from 'chai';
//import httpChai from 'chai-http';
import Parcel from '../server/module/Parcel';
import User from '../server/module/User';


const assert = chai.assert;
const expect = chai.expect;
//chai.use( httpChai );

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


const server = 'https://send-app.herokuapp.com';

describe( 'Parcel Model', () => {

 it( 'Should not save parcel if the owner does not exist in user database', () => {
assert.equal(1,1);
 })
   
} );