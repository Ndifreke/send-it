'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable default-case */

var cachedDisplayStyle = {};

function verifySignIn() {
  var loginForm = document.forms.loginForm;
  var loginEmail = loginForm['login-email'].value;
  var loginPassword = loginForm['login-password'].value;
  console.log('' + (loginPassword + loginEmail));
}

function signupUser() {
  var signupForm = document.forms.signupForm;
  var signupFirstName = signupForm.signupName.value;
  var signupLastName = signupForm.signupLastName.value;
  var signupEmail = signupForm.signupEmail.value;
  var signupNumber = signupForm.signupNumber.value;
  var signupPassword = signupForm.signupPassword.value;
  var signupComfirmPassword = signupForm.signupComfirmpassword.value;

  console.log('' + (signupFirstName + signupEmail + signupLastName + signupNumber + signupPassword + signupComfirmPassword));
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

function showDashContent(viewID) {
  setDisplay(viewID);
}

function toggle(ui) {
  var element = document.getElementById(ui);
  element.style.display = element.style.display !== 'block' ? 'block' : 'none';
  console.log(element.style.display);
}