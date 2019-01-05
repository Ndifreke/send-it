const loginPath = function (path) {
 return host + `/ui/${path}/packages.html`;
}
document.addEventListener('DOMContentLoaded', function () {
 centerAlert(document.querySelector('#signupUI'));
 option.locationOnSuccess = loginPath;
 option.renderOnError = true;
 option.renderOnFail = true;
 initPage(option);
 const form = document.forms.signup;
 form.register.addEventListener("click", signup.bind(form));
})

function signup(event) {
 const data = getSignUpdata();
 if (data) {
  console.log(data)
  showSpinner();
  SendIt.post(remote + '/api/v1/auth/signup', data).then(async function (response) {
   const json = await response.json();
   if (response.status === 201) {
    alertMessage(json.message, "success");
    setTimeout(function () {
     window.location = host + '/ui/login.html';
    }, 1000)
   } else {
    alertMessage(json.message, "inform");
    hideSpinner();
   }
  }).catch(function (err) {
   console.log(err);
   alertMessage("Network Error", "fail");
   hideSpinner();
  });
 }
}

function getSignUpdata() {
 form = document.forms['signup'];
 const firstname = form.firstname.value;
 const surname = form.surname.value;
 const email = form.email.value
 const mobile = form.mobile.value;
 const passwords = form.password;
 const accountOption = form.account.options[form.account.options.selectedIndex].value;

 if (firstname.search(/.+/) === -1) {
  alertMessage('Invalid First Name', 'inform');
  return false;
 }
 if (surname.search(/.+/) === -1) {
  alertMessage('Invalid Last Name', 'inform');
  return false;
 }
 if (mobile.search(/.+/g) === -1 || !/\d{11,13}/.test(mobile)) {
  alertMessage('Invalid Phone Number', 'inform');
  return false;
 }
 if (passwords[0].value.search(/.+/g) === -1 || passwords[0].value !== passwords[1].value) {
  alertMessage('Password do not match', 'inform');
  return false;
 }
 if (email.search(/.+/g) !== -1 && !validEmail(email)) {
  alertMessage('Invalid Email provided', 'inform');
  return false;
 }
 return `firstname=${firstname}&surname=${surname}\&mobile=${mobile}&email=${email}&password=${passwords[0].value}&admin=${(accountOption === 'user')? false : true}`;
}