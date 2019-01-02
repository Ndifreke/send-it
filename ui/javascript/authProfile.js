window.onload = function () {

 centerAlert(document.querySelector('#about'));

 option.renderOnSuccess = true;
 option.locationOnError = host + "/ui/login.html";
 option.locationOnFail = host + "/ui/login.html";
 initPage(option);
 buildProfile();
}

function showProfile(element) {
 const profile = document.querySelector("#profile-sumary");
 const stats = document.querySelector("#statistics");
 if ('profile' in element.dataset) {
  toggleDisplay(stats, 'none');
  toggleDisplay(profile, 'block');
 } else if ('stats' in element.dataset) {
  toggleDisplay(profile, 'none');
  toggleDisplay(stats, 'block');
 }
}

async function buildProfile() {
 const response = await SendIt.get(remote + "/api/v1/users/data");
 response.json().then(function (json) {
   parseProfileHTML(json.data)
  }
 )}

function parseProfileHTML(data) {
 console.log(data)
 document.getElementById('name').textContent = `${data.firstname} ${data.surname} `;
 document.getElementById("mobile").textContent = data.mobile;
 document.getElementById('email').textContent = data.email;
 document.getElementById('delivered').textContent = data.deliveredCount;
 document.getElementById('processing').textContent = data.processingCount;
 document.getElementById('cancelled').textContent = data.cancelledCount;

}