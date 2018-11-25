'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _Parcel = require('../server/module/Parcel');

var _Parcel2 = _interopRequireDefault(_Parcel);

var _User = require('../server/module/User');

var _User2 = _interopRequireDefault(_User);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _utils = require('../server/module/utils');

var _utils2 = _interopRequireDefault(_utils);

var _authenticate = require('../server/module/authenticate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = _chai2.default.assert; /* eslint-disable no-undef */

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

var parcels = {
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
  owner: parseInt(Math.random(), 10)
};

var server = 'https://send-app.herokuapp.com';
var localhost = 'http://localhost:8080';
function toJSON(text) {
  return JSON.stringify(text);
}

describe('JWT', function () {
  it('Should issue a jwt token', function (done) {
    return new Promise(function (resole) {
      (0, _authenticate.tokenize)(5, true).then(function (token) {
        assert.isNotEmpty(token);
      });
      done();
    });
  });
});

describe("utility", function () {
  it("should validate an a good email", function () {
    assert.isNotFalse(_utils2.default.isEmail("user@email.com"));
  });
  it("should flag a bad email", function () {
    assert.isFalse(_utils2.default.isEmail("bademailatsome.com"));
  });
  it("should Accept a valid phone number", function () {
    assert.isTrue(_utils2.default.isInteger(5245785875));
  });
  it("should Accept a valid phone number", function () {
    assert.isFalse(_utils2.default.isInteger("ABC524578L5875"));
  });
  it("Shouold validate a cordinate object", function () {
    assert.isTrue(_utils2.default.isNumeric(0.255888));
  });
  it("Shouold flag an invalid cordinate object", function () {
    assert.isFalse(_utils2.default.isNumeric(255888));
  });
});

describe('Parcel Model', function () {
  it('Valid status code from fetching a parcel', function (done) {
    var request = _chai2.default.request(_app2.default);
    request.get('/api/v1/users/2/parcels').end(function (err, res) {
      assert.equal(res.statusCode, '200');
      done();
    });
  });
});