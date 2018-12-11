document.addEventListener('DOMContentLoaded', function () {

  document.body.addEventListener('click', hideMenus, true);

  const parcelHeaders = document.getElementsByClassName('package-preview');
  highlightParcelHeader(parcelHeaders);
  promptEdit(document.querySelectorAll('.cancel, .edit'));
  const menuButton = document.getElementById('flow-btn');
  menuButton.onclick = function () {
    toggleDisplay('dashboard');
  };

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

/* Set the display of an html element identified by the id or class name passed in as
 * argument. if an arguments contains object. the id field should be the elements id or class
 * and the display property is the type of display. By default an id withoud display is set to
 * block display
 *  */
function getElement(identifier, attribute) {
  switch (attribute) {
    case 'class':
      return document.getElementsByClassName(identifier);
    case 'id':
      return document.getElementById(identifier);
    case 'tag':
      return document.getElementsByTagName(identifier);
  }
  return null;
}

function hideMenus(event) {
  document.querySelector("form[name='edit-prompt'").style.display = 'none';
  console.log(event.target)
}

function toggleDisplay(elm, display) {
  const element = (typeof elm === 'string') ? document.getElementById(elm) : elm;
  if (!display)
    element.style.display = (element.style.display !== 'block') ? 'block' : 'none';
  else
    element.style.display = display;
}

function promptEdit(actionButtons) {
  actionButtons.forEach(function (action) {
    action.addEventListener('click', editFormAck);
  })
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


function editFormAck() {
  const promptForm = document.forms['edit-prompt'];
  promptForm.querySelector('span').innerText = this.getAttribute('class');
  const parcelPosition = this.parentElement.parentElement.getBoundingClientRect();
  const parcelCenter = (parcelPosition.x + (parcelPosition.width / 2)) - 125 /* half of prompt */ ;
  promptForm.style.top = parcelPosition.y + window.pageYOffset + 55 + 'px';
  promptForm.style.left = parcelCenter + 'px';
  promptForm.style.display = 'block';
}