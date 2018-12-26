document.addEventListener('DOMContentLoaded', function () {

  option.locationOnFail = host + '/ui/pages/login.html';
  option.locationOnError = host + "/ui/pages/login.html";
  option.renderOnSuccess = true;
  initPage(option);
  writeParcelSummary();
  document.forms.createParcel.addEventListener('submit', createParcel);
})

function createParcel() {
  fetch("http:localhost:8080/")
  console.log(this.origin.value);
}

function storeLocationData(targetInputElement, inputName, cordinate) {
  /* set the value of this active input field and store its location in the class attribute */
  if (targetInputElement !== undefined) {
    targetInputElement.value = inputName; //mark this as active element
    switch (targetInputElement.name) {
      case "origin":
        document.querySelector("input[name='origin-lat'").value = cordinate.lat;
        document.querySelector("input[name='origin-lng'").value = cordinate.lng;
        break;
      case "destination":
        document.querySelector("input[name='destination-lat'").value = cordinate.lat;
        document.querySelector("input[name='destination-lng'").value = cordinate.lng;
        break;
    }
  }
}

function writeParcelSummary() {
  const form = document.forms['createParcel'];

  form.shortname.onchange = function () {
    // document.querySelector('#origin-summary').textContent = this.value;
  }

  form.origin.onchange = function () {
    document.querySelector('#origin-summary').textContent = this.value;
    console.log("Origin changed")
    updateDistanceAndPrice();
  }

  form.destination.onchange = function () {
    document.querySelector('#destination-summary').textContent = this.value;
    console.log("destination changed")
    updateDistanceAndPrice();
  }

  form.weight.onchange = function () {
    document.querySelector('#weight-summary').textContent = this.value;
  }
}

/* Set the distance given longitude and latitude of the delivery location */
function updateDistanceAndPrice() {
  const form = document.forms['createParcel'];
  const origin = form['origin-lat'].value + ',' + form['origin-lng'].value;
  const destination = form['destination-lat'].value + ',' + form['destination-lng'].value;

  function setDistance(distance) {
    document.querySelector('#distance-summary').textContent = distance + 'km';
    document.querySelector('#price-summary').textContent = '$' + (distance + 10);
  }
  requestDistance(origin, destination, setDistance);
}

async function requestDistance(origin = '0.0', destination = '0.0', callback) {
  const services = new google.maps.DistanceMatrixService();
  services.getDistanceMatrix({
    origins: [origin],
    destinations: [destination],
    travelMode: 'DRIVING',
  }, callback)
}

function loadMap() {
  document.querySelector('#position-container').style.display = 'block';
  initMap(google.maps);
}