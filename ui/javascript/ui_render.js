/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable prefer-destructuring */
/* eslint-disable default-case */

const cachedDisplayStyle = {};


function verifySignIn() {
  const loginForm = document.forms.loginForm;
  const loginEmail = loginForm['login-email'].value;
  const loginPassword = loginForm['login-password'].value;
  console.log(`${loginPassword + loginEmail}`);
}

function signupUser() {
  const signupForm = document.forms.signupForm;
  const signupFirstName = signupForm.signupName.value;
  const signupLastName = signupForm.signupLastName.value;
  const signupEmail = signupForm.signupEmail.value;
  const signupNumber = signupForm.signupNumber.value;
  const signupPassword = signupForm.signupPassword.value;
  const signupComfirmPassword = signupForm.signupComfirmpassword.value;

  console.log(`${signupFirstName + signupEmail + signupLastName + signupNumber
        + signupPassword + signupComfirmPassword}`);
}



