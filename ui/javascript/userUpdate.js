document.addEventListener('DOMContentLoaded', function () {
  authorizeUpdate();
  window.onclose = function(){
    sessionStorage.removeItem('update');
    sessionStorage.removeItem('path');
  }

  document.querySelector('.refresh-icon').onclick = refreshSummary;
  option.locationOnFail = host + '/ui/login.html';
  option.locationOnError = host + "/ui/login.html";
  option.renderOnSuccess = true;
  initPage(option);
  centerAlert(document.querySelector('#parcel-inputs'));

  fillInputs(JSON.parse(sessionStorage.getItem('update')));
  document.forms['createParcel'].create.addEventListener('click', createParcel);
})

/** Authorize that the update request was originated from a click 
 * else assume the user does not have the right to update and send her back to login
 */
function authorizeUpdate() {
  if (!sessionStorage.getItem('update'))
    window.location = '/ui/login.html';
}

async function createParcel() {
  refreshSummary().then(async function () {
    const data = validateFormData();
    console.log(data)
    if (data) {
      const response = await SendIt.post(remote + '/api/v1/parcels', data);
      response.json().then(function (json) {
        alertMessage(json.message, (response.status == 201) ? "success" : 'fail')
      })
    }
  });
}

function storeHiddenCordinate(targetInputElement, inputName, cordinate) {
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

function validateFormData() {
  form = document.forms['createParcel'];

  const destination = form.destination.value;
  const destinationLat = form['destination-lat'].value;
  const destinationLng = form['destination-lng'].value;
  const description = form.description;
  const shortname = form.shortname;
  const price = document.querySelector('#price-summary').textContent;

  if (destination.search(/.+/) === -1 || destination.length < 5) {
    alertMessage('You must provide the parcel destination', 'inform');
    return false;
  }
  if (description.search(/.+/) === -1 || description.length < 10) {
    alertMessage('Provide a short not less than 10 words that describes this parcel', 'inform');
    return false;
  }
  return `shortname=${shortname}&destination=${destination}&destination_lat=${destinationLat}\
&destination_lng=${destinationLng}&description=${description}&price=${price}&distance=${distance}`;
}

/**
 * Refresh All Form fields and display them on the summary Label
 * @returns Promise resolved once distance value is returned from google
 */
function refreshSummary(parcelData) {
  const form = document.forms['createParcel'];

  document.querySelector('#shortname-summary').textContent = form.shortname.value;

  const distance = document.querySelector('#distance-summary').textContent;
  document.querySelector('#distance-summary').textContent = distance || (parcelData.distance + " km");

  const price = document.querySelector('#price-summary').textContent;
  document.querySelector('#price-summary').textContent = price ?  price :("$" + parcelData.price);

  document.querySelector('#origin-summary').textContent = form.origin.value || 'Unkown!';
  document.querySelector('#destination-summary').textContent = form.destination.value || 'Unkown!';
  document.querySelector('#weight-summary').textContent = form.weight.value || '0 kg';
  document.querySelector('#location-summary').textContent = form.location.value || 'Unkown';
  return updateDistanceAndPrice();;
}

function fillInputs(parcelData) {
  console.log(parcelData)
  const form = document.forms['createParcel'];

  form.shortname.value = parcelData.shortname;

  form.origin.value = parcelData.origin;
  form.origin.disabled = true;

  form.destination.value = parcelData.destination;
  form.weight.value = parcelData.weight;
  form.weight.disabled = true;

  form['location'].value = parcelData.location;
  form['location'].disabled = true;
  form['location-lat'] = parcelData.location_lat;
  form['location-lng'] = parcelData.location_lng;

  form.status.value = parcelData.status ;
  form.status.disabled = true;

  form.description.value = parcelData.description;

  form['destination-lat'].value = parcelData.destination_lat;
  form['destination-lng'].value = parcelData.destination_lng;

  form['origin-lat'].value = parcelData.origin_lat;
  form['origin-lng'].value = parcelData.origin_lng;
  refreshSummary(parcelData);
}

let distance = '';
let price = '';
/** Update the distance and price of this parcel, then return a promise of the resolved distance 
 * *@returns Promise that resolves th the distance
 * **/
function updateDistanceAndPrice() {
  const form = document.forms['createParcel'];
  const origin = form['origin-lat'].value + ',' + form['origin-lng'].value;
  const destination = form['destination-lat'].value + ',' + form['destination-lng'].value;
  const weight = form.weight.value;

  function setDistanceAndPrice(distanceText) {
    document.querySelector('#distance-summary').textContent = distanceText;
    if (/km/gi.test(distanceText)) {
      distance = distanceText.slice(0, -3);
      price = parseFloat(distance * weight); //distance in kilometers
    } else if (/m/.test(distanceText)) {
      distance = distanceText.slice(0, -2);
      price = parseFloat(distance * weight); //distance in meters
    }
    document.querySelector('#price-summary').textContent = '$' + price;
  }
  return LocationFinder.requestDistance(origin, destination, setDistanceAndPrice);
}

function loadMap() {
  document.querySelector('#position-container').style.display = 'block';
  initMap(google.maps);
}

function removeTips() {
  const mapTips = document.querySelector('#map-tip');
  if (mapTips)
    mapTips.remove();
}