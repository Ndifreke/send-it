document.addEventListener('DOMContentLoaded', function () {

  document.body.addEventListener('click', hideMenus, true);

  const parcelHeaders = document.getElementsByClassName('package-preview');
  highlightParcelHeader(parcelHeaders);
  promptEdit(document.querySelectorAll('.steer-cancel-icon, .steer-icon'));
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

function setAttributes(element, attributeOption) {
  for (const attribute in attributeOption)
    element.setAttribute(attribute, attributeOption[attribute]);
  return element;
}

function alertMessage(msg, type) {
  let msgElement = document.getElementById("message-alert");
  const msgClone = msgElement.cloneNode(true);
  switch (type) {
    case "fail":
      msgClone.textContent = (msg || "Operation Failed");
      msgClone.className = 'message-failure';
      msgElement.replaceWith(msgClone);
      break;
    case "success":
      msgClone.textContent = (msg || "Successfull");
      msgClone.className = 'message-success';
      msgElement.replaceWith(msgClone);
      break;
  }

}

function showViewport() {
  const waitAnimation = document.getElementById('wait-animation');
  waitAnimation.parentElement.removeChild(waitAnimation);
  document.querySelector('div.viewport').style.visibility = 'visible';
}

async function initPage(redirectSuccess = null, redirectFailure = null) {
  console.log(document.readyState)
  /* Attempt to log the user in with available token */
  const token = window.localStorage.getItem("token");
  try {
    if (token) {
      //host + '/api/v1/oauth'
      const response = await get('http://facebook.com');
      if (response.status === 200 && redirectSuccess)
        window.location = redirectSuccess;
      if (response.status !== 200 && redirectFailure)
        window.location = redirectFailure;
    }
  } catch (e) {
    alertMessage('Network Error Occured', 'fail');
  } finally {
    showViewport();
  }
}

function showSpinner() {
  document.getElementById('loader').style.visibility = 'visible';
}

function hideSpinner() {
  document.getElementById('loader').style.visibility = 'hidden';
}