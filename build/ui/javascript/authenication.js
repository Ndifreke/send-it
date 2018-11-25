'use strict';

/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function validateEmail(id) {
  var element = document.getElementById(id);
  var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(element.value).toLowerCase());
}

function emailInput(id, infoLabel) {
  var element = document.getElementById(id);
  var label = document.getElementById(infoLabel);
  if (!validateEmail(id)) {
    label.style['font-size'] = '17px';
    element.style['border-color'] = 'red';
    label.style.color = 'red';
    label.style.color = 'red';
    label.textContent = 'You entered an invalid email';
    console.log('invalid');
  } else {
    label.textContent = '';
    element.style.border = 'none';
    console.log('valid');
  }
}

function onLoginSubmit(id, password) {
  if (validateEmail(id) && !/^\s+$/.test(document.getElementById(password).value)) {
    window.location = '../pages/admin.html';
  }
}

function verifySignIn() {
  var loginForm = document.forms.loginForm;
  var loginEmail = loginForm['login-email'].value;
  var loginPassword = loginForm['login-password'].value;
  console.log('' + (loginPassword + loginEmail));
}