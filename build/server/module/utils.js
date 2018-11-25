'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
/* eslint-disable import/prefer-default-export */

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'validateParcel',
    value: function validateParcel(options) {
      var requireFields = ['shortname', 'destination', 'destination_lat', 'destination_lng', 'origin', 'origin_lat', 'origin_lng', 'description', 'distance', 'weight', 'price'];
      var testField = void 0;
      var validated = requireFields.every(function (field) {
        testField = field;
        return Utils.filterParcelInput(field, options[field]);
      });
      if (!validated) {
        throw Error(testField + ' field is required to create a Parcel');
      }
    }
  }, {
    key: 'filterParcelInput',
    value: function filterParcelInput(field, value) {
      switch (field) {
        case 'description':
        case 'origin':
        case 'shortname':
        case 'destination':
          return Utils.isText(value);
        case 'destination_lat':
        case 'destination_lng':
        case 'origin_lat':
        case 'origin_lng':
          return Utils.isNumeric(value);
        case 'distance':
        case 'weight':
        case 'price':
          return Utils.isNumeric(value) || Utils.isInteger(value);
      }
      // any other field is not our concern ignore it
      return true;
    }
  }, {
    key: 'validateCreateUser',
    value: function validateCreateUser(options) {
      var requireFields = ['firstname', 'email', 'password', 'surname', 'mobile'];
      var testField = void 0;
      var testValue = void 0;

      var valid = requireFields.every(function (field) {
        testField = field;
        testValue = options[field];
        switch (field) {
          case 'email':
            return Utils.isEmail(testValue);
          case 'firstname':
          case 'surname':
            return Utils.isName(testValue);
          case 'mobile':
            return Utils.isInteger(testValue);
          default:
            return Utils.isText(testValue);
        }
      });
      if (!valid) {
        throw Error('Field ' + testField + ' does not meet requirement value: ' + testValue);
      }
    }
  }, {
    key: 'isInteger',
    value: function isInteger(value) {
      return (/^\d+$/.test(value)
      );
    }
  }, {
    key: 'isEmail',
    value: function isEmail(email) {
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    }
  }, {
    key: 'isNumeric',
    value: function isNumeric(cord) {
      return (/^[0-9]+\.[\d]+$/.test(cord)
      );
    }
  }, {
    key: 'isText',
    value: function isText(text) {
      return (/^[a-zA-Z0-9\s\.,\+\-\(\)_\w]+$/.test(text)
      );
    }
  }, {
    key: 'isName',
    value: function isName(name) {
      return (/^[a-zA-Z0-9-_]+$/.test(name)
      );
    }
  }, {
    key: 'response',
    value: function response(status, message, body) {
      return {
        status: status,
        message: message,
        response: body instanceof Array ? body : [body]
      };
    }
  }]);

  return Utils;
}();

var util = Utils;
//module.exports.util = util;
exports.default = util;