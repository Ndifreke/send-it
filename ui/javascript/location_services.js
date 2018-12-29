/* eslint-disable no-fallthrough */
/* eslint-disable no-restricted-globals */
/* eslint-disable default-case */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */

let activeElement;
let locationMap;
let label;

class LocationFinder {
  constructor(maps, lat = 6.552723299999999, lng = 3.3664072) {
    LocationFinder.maps = maps;
    this.maps = maps;
    this.latitude = lat;
    this.longitude = lng;
    this.geocodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    this.reversecodingUrl = 'https://maps.googleapis.com/maps/api/geocode/json?';
    LocationFinder.apiLocation = 'https://maps.googleapis.com/maps/api';
    LocationFinder.key = 'AIzaSyCVG4POFIVEKqFALXWDJKSF1o1HPaUI8zk';
    this.map = this.initMap(this.maps.Map, this.latitude, this.longitude);
    // new maps.Marker( { map: this.map, position: location,label:"thanks" } );
  }

  /* initialize a new map centered at longitude and latitude */
  initMap(Map, latitude, longitude) {
    const location = {
      lat: latitude,
      lng: longitude
    };
    this.map = new Map(getElement('map-ui', 'id'), {
      center: location,
      zoom: 16
    });

    return this.map;
  }

  getLatandLong() {
    if (this.map === undefined) {
      this.initMa();
    }
  }

  static async requestDistance(origin = '0.0', destination = '0.0', callback) {
    const org = origin.split(',');
    const dest = destination.split(',');

    try {
      const start = new google.maps.LatLng(org[0], org[1]);
      const end = new google.maps.LatLng(dest[0], dest[1]);
      const services = new google.maps.DistanceMatrixService();
      services.getDistanceMatrix({
        origins: [start],
        destinations: [end],
        travelMode: 'DRIVING',
      }, function (result) {
        const status = result.rows[0].elements[0].status;
        const distance = (status === 'OK') ? result.rows[0].elements[0].distance.text : 'Distance Unavailable!';
        callback(distance);
      })
    } catch (e) {
      alertMessage('Unable to fetch distance information', 'fail')
    }
  }


  setLatandLong(lat, lng) {
    this.latitude = lat;
    this.latitude = lng;
  }

  parseResults(json) {
    const result = [];
    // console.log( json );

    JSON.parse(json).results.forEach((address) => {
      if (address.formatted_address.indexOf('Unnamed') === -1) {
        result.push({
          [address.formatted_address]: address.geometry.location
        });
      }
    });
    return result;
  }

  placeMarker(location, map = this.map) {
    // center map and place marker in result position
    map.setCenter(location);
    if (this.marker) {
      this.marker.setMap(null);
    }
    /* remove old marker before adding a new one can later
            which marker to use or not use choosen marker to determine */
    this.marker = new this.maps.Marker({
      map,
      position: location,
      label: 'P'
    });
  }

  useGeocode(addressName, cb) {
    const geocoder = new this.maps.Geocoder();
    return new Promise((resolve) => {
      geocoder.geocode({
        address: addressName
      }, (results, status) => {
        if (status === 'OK') {
          const result = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lat(),
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

  positionsOnclick(cb) {
    const self = this;
    return new Promise((resolve) => {
      self.map.addListener('click', (event) => {
        const latitude = event.latLng.lat();
        const longitude = event.latLng.lng();
        const location = {
          lat: latitude,
          lng: longitude
        };
        self.placeMarker(location, self.map);
        self.positionFromCordinate(location).then((locations) => {
          cb(locations);
          resolve(location);
        });
      });
    });
  }

  async positionFromCordinate(location, cb) {
    const latlng = `latlng=${location.lat},${location.lng}`;
    const url = this.reversecodingUrl + latlng + '&key=' + LocationFinder.key;
    const responseText = await xmlGet(url);
    const json = this.parseResults(responseText);
    if (cb)
      cb(json);
    return Promise.resolve(json);
  }

  promiseAddress(input, cb) {
    switch (typeof input) {
      case 'string':
        self = this;
        this.useGeocode(input).then((location) => {
          cb(location);
          self.placeOnMap(location, sefl.map);
        });
      case 'object':
        this.positionFromCordinate(input).then((positions) => {
          cb(positions);
        });
    }
  }
}

/** Label does the job of showing clicked posiition on map */
class Label {
  constructor(map) {
    Label.map = map;
  }

  static displayLabelOnclick(clickedCordinates) {
    const places = document.querySelector('.places');
    places.innerHTML = '';
    clickedCordinates.forEach((cordinate) => {
      places.appendChild(Label.positionOnTile(cordinate));
    });
  }

  static displayLabalFromCordinate(cordinate) {
    const places = document.querySelector('.places');
    places.appendChild(Label.positionOnTile(cordinate));
    Label.map.placeMarker(cordinate);
  }

  /* create mini label on map where clicked position will be displayed*/
  static positionOnTile(cordinate) {
    return createLabel(cordinate);
  }

  showOnMap(cordinate) {
    if (cordinate instanceof Array) { // It came from click event
      Label.displayLabelOnclick(cordinate);
    } else if (typeof cordinate === 'object') {
      Label.displayLabalFromCordinate(cordinate);
    }
  }
}

function initMap() {
  locationMap = new LocationFinder(google.maps);
  label = new Label(locationMap);
  locationMap.positionsOnclick(label.showOnMap);
}

function focusedInput(inputName) {
  activeElement = document.querySelector(`input[name="${inputName}"]`);
}

function createLabel(cordinate) {
  const positionLabel = setAttributes(document.createElement('div'), {
    'class': 'position-label'
  });
  let cord, locationName;
  if ('lat' in cordinate) {
    cord = cordinate;
  } else {
    //grab position names from google location search
    locationName = Object.keys(cordinate);
    cord = {
      lat: cordinate[locationName].lat,
      lng: cordinate[locationName].lng
    };
  }
  positionLabel.innerHTML = `<span> ${locationName}</span> <br/> 
    <span> ${cord.lat} , ${cord.lng} </span>`;

  positionLabel.onclick = function () {
    storeHiddenCordinate(activeElement, locationName, cord);
    Label.map.placeMarker(cord);
  };
  return positionLabel;
}