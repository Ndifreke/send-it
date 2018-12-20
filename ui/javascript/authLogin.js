const packageURL = origin + '/ui/pages/packages.html';

document.addEventListener('DOMContentLoaded', function () {
    option.locationOnSuccess = packageURL;
    option.renderOnError = true;
    option.renderOnFail = true;
    initPage(option);

    const form = document.forms.login;
    form.submitButton.addEventListener("click", login.bind(form));
})


async function login(event) {
    // this == <form name=login> 
    const data = `password=${this.password.value}&email=${this.email.value}`;
    showSpinner();
    try {
        const response = await SendIt.post('http://localhost:8080/api/v1/auth/login', data);
        console.log(response)
        const json = await response.json();
        console.log(response)
        if (response.status === 200) {
            alertMessage("success", "success");
            window.localStorage.setItem('token', json.token)
            window.location = window.location.origin + '/ui/pages/packages.html';

        } else {
            alertMessage("Login Fail", "fail");
            hideSpinner();
        }
    } catch (err) {
        console.log(err);
        alertMessage("Network Error", "fail");
        hideSpinner();
    }
}