document.addEventListener('DOMContentLoaded', function () {
  const form = document.forms['settingsUI'];
  option.locationOnFail = host + '/ui/user/login.html';
  option.locationOnError = host + "/ui/user/login.html";
  option.renderOnSuccess = true;
  initPage(option)
  centerAlert(form);
  form.update.addEventListener('click', updateSettings);
})

 function updateSettings() {
  showSpinner();
  const data = validateSettings(this.parentElement);
  if (data) {
    SendIt.put(remote + '/api/v1/users/update', data).then( async function(response){
    const json = await response.json();
    const messageType = (response.status == 200) ? 'success' : 'inform';
    alertMessage(json.response, messageType);
    setTimeout(()=>window.location.reload(), 3000);
    });
  } else {
    alertMessage('Enter field data to update', 'inform');
    hideSpinner();
  }
}

function validateSettings(form) {
  const email = form.email.value;
  const phone = form.phone.value;
  const password = form.password[0].value;
  const confirmPass = form.password[1].value;
  let updateData = '';
  if (email.search(/.+/g) !== -1 && !validEmail(email)) {
    alertMessage('Invalid Email provided', 'inform');
  } else {
    updateData += email ? `email=${email}` : '';
  }

  if (phone.search(/.+/g) !== -1 && !/\d{11,13}/.test(phone)) {
    alertMessage('Invalid Phone Number', 'inform');
  } else {
    updateData += phone ? `&phoneNumber=${phone}` : '';
  }

  if ((password.search(/.+/g) !== -1 || confirmPass.search(/.+/g) !== -1) &&
    (password !== confirmPass)) {
    alertMessage('Password do not match', 'inform');
  } else {
    updateData += password ? `&password=${password}` : '';
  }
  return updateData;
}