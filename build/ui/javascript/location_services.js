'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-fallthrough */
/* eslint-disable no-restricted-globals */
/* eslint-disable default-case */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

var activeInputElement = void 0;
var locationMap = void 0;
var label = void 0;

var LocationFinder = function () {
  function LocationFinder(maps) {
    var lat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9.30769;
    var lng = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2.315834;

    _classCallCheck(this, LocationFinder);

    this.maps = maps;
    this.latitude = lat;
    this.longitude = lng;
    this.geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    this.reversecodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    this.key = '&key=AIzaSyCVG4POFIVEKqFALXWDJKSF1o1HPaUI8zk';
    this.map = this.initMap(this.maps.Map, this.latitude, this.longitude);
    // new maps.Marker( { map: this.map, position: location,label:"thanks" } );
  }

  /* initialize a new map centered at longitude and latitude */


  _createClass(LocationFinder, [{
    key: 'initMap',
    value: function initMap(Map, latitude, longitude) {
      var location = {
        lat: latitude,
        lng: longitude
      };
      this.map = new Map(getElement('map-ui', 'id'), {
        center: location,
        zoom: 8
      });

      return this.map;
    }
  }, {
    key: 'getLatandLong',
    value: function getLatandLong() {
      if (this.map === undefined) {
        this.initMa();
      }
    }
  }, {
    key: 'setLatandLong',
    value: function setLatandLong(lat, lng) {
      this.latitude = lat;
      this.latitude = lng;
    }
  }, {
    key: 'parseResults',
    value: function parseResults(json) {
      var result = [];
      // console.log( json );

      JSON.parse(json).results.forEach(function (address) {
        if (address.formatted_address.indexOf('Unnamed') === -1) {
          result.push(_defineProperty({}, address.formatted_address, address.geometry.location));
        }
      });
      return result;
    }
  }, {
    key: 'placeMarker',
    value: function placeMarker(location) {
      var map = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.map;

      // center map and place marker in result position
      map.setCenter(location);
      if (this.marker) {
        this.marker.setMap(null);
      }
      /* remove old marker before adding a new one can later
              which marker to use or not use choosen marker to determine */
      this.marker = new this.maps.Marker({
        map: map,
        position: location,
        label: 'P'
      });
    }
  }, {
    key: 'useGeocode',
    value: function useGeocode(addressName, cb) {

      var geocoder = new this.maps.Geocoder();
      return new Promise(function (resolve) {
        geocoder.geocode({
          address: addressName
        }, function (results, status) {
          if (status === 'OK') {
            var result = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lat()
            };
            resolve(result);
            // set the cordinate on this callback function
            if (cb) {
              cb(result);
            }
          }
        });
      });
    }
  }, {
    key: 'positionsOnclick',
    value: function positionsOnclick(cb) {
      var self = this;
      return new Promise(function (resolve) {
        self.map.addListener('click', function (event) {
          var latitude = event.latLng.lat();
          var longitude = event.latLng.lng();
          var location = {
            lat: latitude,
            lng: longitude
          };
          self.placeMarker(location, self.map);
          self.positionFromCordinate(location).then(function (locations) {
            cb(locations);
            resolve(location);
          });
        });
      });
    }
  }, {
    key: 'positionFromCordinate',
    value: function positionFromCordinate(location, cb) {
      var latlng = 'latlng=' + location.lat + ',' + location.lng;

      var url = this.reversecodingUrl + latlng + this.key;
      var req = new XMLHttpRequest();
      console.log(url);
      req.open('GET', url);
      var self = this;
      return new Promise(function (resolve) {
        req.onreadystatechange = function () {
          if (req.status === 200 && req.readyState === 4) {
            var result = self.parseResults(req.responseText);
            if (cb) {
              cb(result);
            }
            resolve(result);
          }
        };
        req.send();
      });
    }
  }, {
    key: 'promiseAddress',
    value: function promiseAddress(input, cb) {
      switch (typeof input === 'undefined' ? 'undefined' : _typeof(input)) {
        case 'string':
          self = this;
          this.useGeocode(input).then(function (location) {
            cb(location);
            self.placeOnMap(location, sefl.map);
          });
        case 'object':
          this.positionFromCordinate(input).then(function (positions) {
            cb(positions);
          });
      }
    }
  }]);

  return LocationFinder;
}();

/** Label does the job of showing clicked posiition on map */


var Label = function () {
  function Label(map) {
    _classCallCheck(this, Label);

    Label.map = map;
  }

  _createClass(Label, [{
    key: 'showOnMap',
    value: function showOnMap(cordinate) {
      if (cordinate instanceof Array) {
        // It came from click event
        Label.displayLabelOnclick(cordinate);
      } else if ((typeof cordinate === 'undefined' ? 'undefined' : _typeof(cordinate)) === 'object') {
        Label.displayLabalFromCordinate(cordinate);
      }
    }
  }], [{
    key: 'displayLabelOnclick',
    value: function displayLabelOnclick(clickedCordinates) {
      var labelContainer = document.getElementById('position-container');
      labelContainer.innerHTML = '';
      clickedCordinates.forEach(function (cordinate) {
        labelContainer.appendChild(Label.labelViewFrom(cordinate));
      });
    }
  }, {
    key: 'displayLabalFromCordinate',
    value: function displayLabalFromCordinate(cordinate) {
      var labelContainer = document.getElementById('position-container');
      labelContainer.innerHTML = '';
      console.log(cordinate);
      labelContainer.appendChild(Label.labelViewFrom(cordinate));
      Label.map.placeMarker(cordinate);
    }
  }, {
    key: 'labelViewFrom',
    value: function labelViewFrom(cordinate) {
      var brk = document.createElement('br');
      var cord = '';
      var placeName = '';
      if ('lat' in cordinate) {
        placeName = activeInputElement.value;
        cord = cordinate;
      } else {
        placeName = Object.keys(cordinate);
        cord = {
          lat: cordinate[placeName].lat,
          lng: cordinate[placeName].lng
        };
      }
      var positionLabel = setAttributes(document.createElement('div'), {
        id: cord,
        class: 'position-label'
      });
      var anch = document.createElement('a');
      anch.textContent = placeName;
      var span = document.createElement('span');
      span.style.display = 'inline-block';
      anch.style.display = 'inline-block';
      span.textContent = cord.lat + ' , ' + cord.lng;
      positionLabel.appendChild(anch);
      positionLabel.appendChild(brk);
      positionLabel.appendChild(span);

      positionLabel.onclick = function () {
        /* set the value of this active input field
                     and store its location in the class attribute */
        if (activeInputElement !== undefined) {
          activeInputElement.value = placeName;
          setAttributes(activeInputElement, {
            class: JSON.stringify(cord),
            name: placeName
          });
        }
        // place a marker on the map where the label points
        Label.map.placeMarker(cord);
      };
      return positionLabel;
    }
  }]);

  return Label;
}();

function initMap() {
  locationMap = new LocationFinder(google.maps); // .initMap()
  label = new Label(locationMap);
  locationMap.positionsOnclick(label.showOnMap);
}

function setActivePosition(inputBoxId) {
  activeInputElement = document.getElementById(inputBoxId);
  if (!(/^(\s)*$/.test(activeInputElement.value) || activeInputElement.value === undefined)) {
    locationMap.useGeocode(activeInputElement.value, label.showOnMap);
  }
}