const host = 'http://127.0.0.1:5500';
const remote = 'http://127.0.0.1:8080';

const option = {
  defaultRender: false,
  renderOnFail: false,
  locationOnFail: null,
  renderOnError: false,
  locationOnError: null,
  renderOnSuccess: false,
  locationOnSuccess: null,
}


document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.getElementById('flow-btn');
  if (menuButton)
    menuButton.onclick = function () {
      toggleDisplay('dashboard');
    };

});


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



function toggleDisplay(elm, display) {
  const element = (typeof elm === 'string') ? document.getElementById(elm) : elm;
  if (!display)
    element.style.display = (element.style.display !== 'block') ? 'block' : 'none';
  else
    element.style.display = display;
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
    case "inform":
      msgClone.textContent = (msg || "Not Completed");
      msgClone.className = 'message-inform';
      msgElement.replaceWith(msgClone);
      break;
  }

}

function renderPage(message, type) {
  const waitAnimation = document.getElementById('wait-animation');
  waitAnimation.parentElement.removeChild(waitAnimation);
  document.querySelector('div.viewport').style.visibility = 'visible';
  if (message)
    alertMessage(message, type);
}

function showSpinner() {
  document.getElementById('loader').style.visibility = 'visible';
}

function hideSpinner() {
  document.getElementById('loader').style.visibility = 'hidden';
}

/* Initialize secure page after successfull verification a token */
async function initPage(option) {
  const token = window.localStorage.getItem("token");

  if (token) {
    SendIt.get(remote + '/api/v1/auth').
    then(function response(res) {
      if (res.status === 200) {
        option.locationOnSuccess ? window.location = option.locationOnSuccess : null;
        option.renderOnSuccess ? renderPage() : null;
      } else {
        option.locationOnFail ? window.location = option.locationOnFail : null;
        option.renderOnFail ? renderPage("Unauthorized", 'fail') : null;
      }
    }).
    catch(function error(err) {
      option.locationOnError ? window.location = option.locationOnError : null;
      option.renderOnError ? renderPage('Network Error Occured', 'fail') : null;
    })
  } else {
    option.renderOnFail ? renderPage("Sign in", 'fail') : null;
    option.locationOnFail ? window.location = option.locationOnFail : null;
  }
}

function xmlGet(url, callback) {
  const req = new XMLHttpRequest();
  req.open('GET', url);

  return new Promise((resolve) => {
    req.onreadystatechange = function () {
      if (req.status === 200 && req.readyState === 4) {
        if (callback) {
          callback(req.responseText);
        }
        resolve(req.responseText);
      }
    };
    req.send();
  });
}

class SendIt {
  static request(url, data, overrideHeader) {
    let payload = {
      method: "POST",
      //  mode: "no-cors",
      //   credentials: "include",
      body: data,
      headers: {
        authorization: window.localStorage.getItem('token'),
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
    //override default value in payload 
    let init = overrideHeader ? Object.assign(payload, overrideHeader) : payload;
    return fetch(url, init)
  }

  static get(url) {
    return SendIt.request(url, null, {
      method: "GET"
    });
  }

  static put(url, data) {
    return SendIt.request(url, data, {
      method: "PUT"
    })
  }

  static post(url, data) {
    return SendIt.request(url, data, {
      method: 'post'
    });
  }
}