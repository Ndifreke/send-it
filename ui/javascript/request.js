function post(url, data, overrides) {
 let payload = {
  method: "POST",
  mode: "cors",
  credentials: "include",
  body: data,
  headers: {
   'Content-type': 'application/x-www-form-urlencoded'
  }
 }
 //override default value in payload 
 let init = overrides ? Object.assign(payload, overrides) : payload;
 return fetch(url, init)
}

function get(url) {
 const override = {
  method: "GET"
 }
 return post(url, null, override);
}

function put(url, data) {
 const override = {
  method: "GET"
 }
 post(url, data, override)
}