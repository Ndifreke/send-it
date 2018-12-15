const host = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', initialize)


async function login(event) {
    const data = `password=${this.password.value}&email=${this.email.value}`;

    post('http://localhost:8080/api/v1/auth/login', data);
    const response = await post('http://localhost:8080/api/v1/auth/login', data);
    const json = await response.json();
    if (json.status === 'ok') {
        window.localStorage.setItem('token', json.token)
        window.location = window.location.origin + '/ui/pages/packages.html'
    }
}

async function initialize() {
    /* Attempt to log the user in with available token */
    const token = window.localStorage.getItem("token");

    if (token) {
        const response = await get(host + '/api/v1/oauth');
        if (response.status === 200)
            window.location = window.location.origin + '/ui/pages/packages.html'
    }

    const loginForm = document.forms.login;
    loginForm.submit.addEventListener("click", login.bind(loginForm));
}