function viewParcels(req, res) {
 res.render("parkages.html")
}

function viewSettings(req, res) {
 res.render("settings.html")
}

function viewProfile(req, res) {
 res.render("profile.html")
}

function viewCreateParcel(req, res) {
 res.render("create.html")

}

function viewHome(req, res) {
 res.sendFile("/index.html")
}

function viewLogin(req, res) {
 res.render("login.html")
}

function viewSignUp(req, res) {
 res.render("signup.html")
}

function view(app, dir) {
 app.set('views', dir);
 app.set('view engine', 'ejs');

 app.get("/signup", viewSignUp);
 app.get("/login", viewLogin);
 app.get("settings", viewSettings);
 app.get("/", viewHome);
 app.get("parcel", viewParcels);
 app.get("profile", viewProfile);
}

export default view;