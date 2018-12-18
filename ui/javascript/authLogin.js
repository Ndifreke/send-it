const host = 'http://localhost:8080';
const redirectUrl = window.location.origin + '/ui/pages/packages.html';

document.addEventListener('DOMContentLoaded', function () {
    initPage(redirectUrl);
    const form = document.forms.login;
    form.submitButton.addEventListener("click", login.bind(form));
})


async function login(event) {
    // this == <form name=login> 
    const data = `password=${this.password.value}&email=${this.email.value}`;
    showSpinner();
    try {
        const response = await post('http://localhost:8080/api/v1/auth/login', data);
        const json = await response.json();
        if (json.status === 'ok') {
            window.localStorage.setItem('token', json.token)
            window.location = window.location.origin + '/ui/pages/packages.html';
            alertMessage("success", "success");
        }
    } catch (err) {} finally {
        hideSpinner();
        alertMessage("Login Fail", "fail");
    }
}