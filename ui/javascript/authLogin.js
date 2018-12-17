const host = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', initLogin)


async function login(event) {
    /* this = <form name =login> */
    const data = `password=${this.password.value}&email=${this.email.value}`;
    try {
        post('http://localhost:8080/api/v1/auth/login', data);
        const response = await post('http://localhost:8080/api/v1/auth/login', data);
        const json = await response.json();
        if (json.status === 'ok') {
            window.localStorage.setItem('token', json.token)
            window.location = window.location.origin + '/ui/pages/packages.html';
            message("success", "success");
        }
        message("Login Fail", "fail");
    } catch (err) {
        console.log()
        message("Network Error", "fail");
    }
}

async function initLogin() {
    /* Attempt to log the user in with available token */
    const token = window.localStorage.getItem("token");
    if (token) {
        const response = await get(host + '/api/v1/oauth');
        if (response.status === 200)
            window.location = window.location.origin + '/ui/pages/packages.html';
    }
    const form = document.forms.login;
    form.submitButton.addEventListener("click", login.bind(form));
}