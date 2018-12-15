document.addEventListener('DOMContentLoaded', function () {

  document.forms.createParcel.addEventListener('submit', submitParcel);
})

function submitParcel() {
  fetch("http:localhost:8080/")
  console.log(this.origin.value);
}

function storeLocationData(targetElement, name, cordinate) {
  /* set the value of this active input field and store its location in the class attribute */
  if (targetElement !== undefined) {
    targetElement.value = name;
    switch (targetElement.name) {
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