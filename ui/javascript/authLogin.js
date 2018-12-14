document.addEventListener("DOMContenLoaded", function () {
 document.forms.login.addEventListener("submit", login);
})

async function login() {
 const {
  password,
  email
 } = this;
 const response = await fetch('', {
  method: "POST",
  credentials: "omit",
  body: {
   email,
   password
  }
 })

}