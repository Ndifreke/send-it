/* eslint-disable no-undef */

import {
  assert,
} from 'chai';
import Parcel from '../server/module/Parcel';
import User from '../server/module/User';

describe('Parcel Model', () => {
  const parcelObject = {
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
    owner: parseInt(Math.random(), 10),
  };

  it('Should save a parcel to the database', () => {
    const ob = Object.assign({}, parcelObject);
    ob.owner = 1;
    return new Parcel(ob).create().then((result) => {
      assert.equal(result.rowCount, 1);
    }, (err) => {
      throw err;
    });
  });

  it('Should not save parcel if the owner does not exist in user database', () => {
    assert.throws(new Parcel(parcelObject).create);
  });
});

describe('User Model', () => {
  const email = `user${Math.random(100) * 1000}@domain.com`;
  const userObject = {
    firstname: email.slice(0, 6),
    surname: 'Ekim',
    email,
    password: 'password',
    mobile: Math.random().toString().slice(2),
  };

  it('Should Create a User with valid Credential', () => {
    return new User(userObject).create().then((result) => {
      assert.equal(result.rowCount, 1);
    });
  });
});
