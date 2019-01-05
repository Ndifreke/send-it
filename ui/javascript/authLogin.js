const loginPath = function (path) {
    return host + `/ui/${path}/packages.html`;
}

document.addEventListener('DOMContentLoaded', function () {
    option.locationOnSuccess = loginPath;
    option.renderOnError = true;
    option.renderOnFail = true;
    initPage(option);
    const form = document.forms.login;
    form.submitButton.addEventListener("click", login.bind(form));

    centerAlert(document.querySelector('#loginUI'));
})

async function login(event) {
    // this == <form name=login> 
    const data = `password=${this.password.value}&email=${this.email.value}`;
    showSpinner();
    try {
        const response = await SendIt.post(remote + '/api/v1/auth/login', data);
        console.log(response)
        const json = await response.json();
        console.log(response)
        if (response.status === 200) {
            alertMessage("success", "success");
            window.localStorage.setItem('token', json.token);
            console.log(json)
            window.location = (json.isAdmin) ? host + '/ui/admin/packages.html' :
                host + '/ui/user/packages.html';
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
