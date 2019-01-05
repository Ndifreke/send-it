document.addEventListener('DOMContentLoaded', function () {
  authorizeUpdate();
  window.onclose = function () {
    sessionStorage.removeItem('update');
    sessionStorage.removeItem('path');
  }

  document.querySelector('.refresh-icon').onclick = refreshSummary;
  option.locationOnFail = host + '/ui/login.html';
  option.locationOnError = host + "/ui/login.html";
  option.renderOnSuccess = true;
  initPage(option);
  centerAlert(document.querySelector('#create-summary'));

  fillInputs(JSON.parse(sessionStorage.getItem('update')));
  document.forms['createParcel'].create.addEventListener('click', updateParcel);
})

/** Authorize that the update request was originated from a click 
 * else assume the user does not have the right to update and send her back to login
 */
function authorizeUpdate() {
  if (!sessionStorage.getItem('update'))
    window.location = '/ui/login.html';
}

async function updateParcel() {
  refreshSummary();
  const data = validateFormData();
  if (data) {
    showSpinner();
    const id = JSON.parse(sessionStorage.getItem('update')).id;
    const response = await SendIt.put(remote + `/api/v1/parcels/${id}/update`, data);
    response.json().then(function (json) {
      const alerts = [];
      for (const field in json.message) {
        if (field.indexOf("lat") == -1 && field.indexOf("lng") == -1)
          alerts.push(field + " " + json.message[field]);
      }

      let nextPrint = function (index) {
        if (index < alerts.length) {
          printMessage(alerts[index]);
        } else {
          sessionStorage.removeItem('update');
          window.location = `${host}/ui/${sessionStorage.getItem('path')}/packages.html`;

        }
      }
      let count = 0;
      nextPrint(0);

      function printMessage(message) {
        setTimeout(function () {
          alertMessage(message, (response.status == 200) ? "success" : 'fail');
          nextPrint(++count);
        }, 2000)
      }
    });
  }
}

function saveCordinate(targetInputElement, inputName, cordinate) {
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
      case "location":
        document.querySelector("input[name='location-lat'").value = cordinate.lat;
        document.querySelector("input[name='location-lng'").value = cordinate.lng;
        break;
    }
  }
}

function validateFormData() {
  form = document.forms['createParcel'];
  const location = form['location'].value;
  const locationLat = form['location-lat'].value;
  const locationLng = form['location-lng'].value;
  const status = form.status.options[form.status.options.selectedIndex].value;

  if (location.search(/.+/) === -1 || location.length < 5) {
    alertMessage('Please provide a valid location', 'inform');
    return false;
  }
  return `location=${location}&location_lat=${locationLat}&location_lng=${locationLng}&status=${status}`;
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
  document.querySelector('#location-summary').textContent = form.location.value || 'Unkown';
}

function fillInputs(parcelData) {
  console.log(parcelData)
  const form = document.forms['createParcel'];

  form.shortname.value = parcelData.shortname;
  form.shortname.disabled = true;

  form.origin.value = parcelData.origin;
  form.origin.disabled = true;

  form.destination.value = parcelData.destination;
  form.destination.disabled = true;

  form.weight.value = parcelData.weight;
  form.weight.disabled = true;

  form['location'].value = parcelData.location;
  form['location-lat'] = parcelData.location_lat;
  form['location-lng'] = parcelData.location_lng;

  form.description.value = parcelData.description;
  form.description.disabled = true;
  form['destination-lat'].value = parcelData.destination_lat;
  form['destination-lng'].value = parcelData.destination_lng;

  form['origin-lat'].value = parcelData.origin_lat;
  form['origin-lng'].value = parcelData.origin_lng;

  //find option in form status that matches parcel status and mark it as selected */
  Array.prototype.some.call(form.status.options, function (option, index) {
    if (new RegExp(parcelData.status, 'gi').test(option.value)) {
      form.status.options.selectedIndex = index;
    }
  })

  document.querySelector('#distance-summary').textContent = parcelData.distance;
  document.querySelector('#price-summary').textContent = parcelData.price;
  refreshSummary();
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