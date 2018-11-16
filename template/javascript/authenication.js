/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */


function validateEmail(id) {
  const element = document.getElementById(id);
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(element.value).toLowerCase());
}

function emailInput(id, infoLabel) {
  const element = document.getElementById(id);
  const label = document.getElementById(infoLabel);
  if (!validateEmail(id)) {
    label.style['font-size'] = '17px';
    element.style['border-color'] = 'red';
    label.style.color = 'red';
    label.style.color = 'red';
    label.textContent = 'You entered an invalid email';
    console.log('invalid');
  } else {
    label.textContent = '';
    element.style['border-color'] = 'block';
    console.log('valid');
  }
}

function onLoginSubmit(id, label) {
  if (validateEmail(id)) {
    window.location = '../ui/admin.html';
  }
}

function verifySignIn() {
  const loginForm = document.forms.loginForm;
  const loginEmail = loginForm['login-email'].value;
  const loginPassword = loginForm['login-password'].value;
  console.log(`${loginPassword + loginEmail}`);
}
