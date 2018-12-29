document.addEventListener('DOMContentLoaded', function () {

 const alert = document.getElementById('message-alert')
 alert.style.left = (window.screen.width / 2) - (alert.getBoundingClientRect().x + 140) + 'px';

 option.locationOnFail = host + '/ui/pages/login.html';
 option.locationOnError = host + "/ui/pages/login.html";
 option.renderOnSuccess = true;

 document.forms['settingsUI'].update.addEventListener('click', changeSettings);
})

function changeSettings() {
 console.log('change settings')
}