document.addEventListener('DOMContentLoaded', function () {

 option.renderOnSuccess = true;
 option.locationOnError = host + "/ui/pages/login.html";
 option.locationOnFail = host + "/ui/pages/login.html";
 initPage(option);

 const parcelHeaders = document.getElementsByClassName('package-preview');
 highlightParcelHeader(parcelHeaders);
 promptEdit(document.querySelectorAll('.steer-cancel-icon, .steer-icon'));
});

function highlightParcelHeader(parcelHeaders) {
 for (const parcelHeader of parcelHeaders) {
  parcelHeader.onclick = function () {
   // reset other headers colors to dark blue
   for (const otherParcelHeader of parcelHeaders) {
    if (parcelHeader !== otherParcelHeader) {
     otherParcelHeader.style['background-color'] = '#323544';
    }
   }
   const parcelContainerId = parcelHeader.dataset.parcelId;
   toggleDisplay(parcelContainerId);
   const parcelContainer = document.getElementById(parcelContainerId);
   (parcelContainer.style.display === 'block') ?
   this.style['background-color'] = '#FF5722': this.style['background-color'] = '#323544';
  };
 }
}

function promptEdit(actionButtons) {
 actionButtons.forEach(function (action) {
  action.addEventListener('click', editFormAck);
 })
}


function editFormAck() {
 const promptForm = document.forms['edit-prompt'];
 promptForm.querySelector('span').innerText = this.getAttribute('class');
 const parcelPosition = this.parentElement.parentElement.getBoundingClientRect();
 const parcelCenter = (parcelPosition.x + (parcelPosition.width / 2)) - 125 /* half of prompt */ ;
 promptForm.style.top = parcelPosition.y + window.pageYOffset + 55 + 'px';
 promptForm.style.left = parcelCenter + 'px';
 promptForm.style.display = 'block';
}