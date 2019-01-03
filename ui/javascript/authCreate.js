document.addEventListener('DOMContentLoaded', function () {

  document.querySelector('.refresh-icon').onclick = refreshSummary;
  option.locationOnFail = host + '/ui/user/login.html';
  option.locationOnError = host + "/ui/user/login.html";
  option.renderOnSuccess = true;
  initPage(option);
  centerAlert(document.querySelector('#parcel-inputs'));
  writeSummaryEvent();
  document.forms['createParcel'].create.addEventListener('click', createParcel);
})

async function createParcel() {
  refreshSummary().then(async function () {
    const data = validateFormData();
    if (data) {
      const response = await SendIt.post(remote + '/api/v1/parcels', data);
      response.json().then(function (json) {
        if (response.status === 201) {
          alertMessage(json.message, 'success')
          setTimeout(function () {
            window.location = `${host}/ui/${sessionStorage.getItem('path')}/packages.html`;
          }, 2500);
        } else{
          alertMessage(json.message, 'fail');
        }
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
  const shortname = form.shortname.value;
  const origin = form.origin.value;
  const originLat = form['origin-lat'].value;
  const originLng = form['origin-lng'].value;
  const destination = form.destination.value;
  const destinationLat = form['destination-lat'].value;
  const destinationLng = form['destination-lng'].value;
  // const price = document.querySelector('#price-summary').textContent;
  const description = form.description.value;
  const weight = form.weight.value;
  const distanceText = document.querySelector('#distance-summary').textContent;
  //const distance = distanceText.slice(0, distanceText.search(/\w/gi))
  if (shortname.search(/.+/) === -1 || shortname.length < 5) {
    alertMessage('A valid title must be provided for Parcel', 'inform');
    return false;
  }
  if (origin.search(/.+/) === -1 || origin.length < 5) {
    alertMessage('A Origin must be provided for Parcel', 'inform');
    return false;
  }
  if (destination.search(/.+/) === -1 || destination.length < 5) {
    alertMessage('You must provide the parcel destination', 'inform');
    return false;
  }
  if (description.search(/.+/) === -1 || description.length < 10) {
    alertMessage('Provide a short not less than 10 words that describes this parcel', 'inform');
    return false;
  }
  return `shortname=${shortname}&destination=${destination}&destination_lat=${destinationLat}\
&destination_lng=${destinationLng}&description=${description}&origin=${origin}\
&origin_lat=${originLat}&origin_lng=${originLng}&weight=${weight}&price=${price}&distance=${distance}`;
}

/**
 * Refresh All Form fields and display them on the summary Label
 * @returns Promise resolved once distance value is returned from google
 */
function refreshSummary() {
  const form = document.forms['createParcel'];
  document.querySelector('#origin-summary').textContent = form.origin.value || 'Unkown!';
  document.querySelector('#destination-summary').textContent = form.destination.value || 'Unkown!';
  document.querySelector('#weight-summary').textContent = form.weight.value || '0 kg';
  return updateDistanceAndPrice();
}

function writeSummaryEvent() {
  const form = document.forms['createParcel'];

  form.shortname.onchange = function () {
    document.querySelector('#shortname-summary').textContent = this.value || 'No title!';
  }

  form.origin.onchange = function () {
    document.querySelector('#origin-summary').textContent = this.value;
    updateDistanceAndPrice();
  }

  form.destination.onchange = function () {
    document.querySelector('#destination-summary').textContent = this.value;
    updateDistanceAndPrice();
  }

  form.weight.onchange = function () {
    document.querySelector('#weight-summary').textContent = this.value;
  }
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