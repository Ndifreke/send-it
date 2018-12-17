let viewPath;

function viewParcels(req, res, next) {
 res.sendFile(viewPath + "/packages.html")
}

function viewSettings(req, res, next) {
 res.sendFile(viewPath + "/settings.html")
}

function viewProfile(req, res, next) {
 res.sendFile(viewPath + "/profile.html")
}

function viewCreateParcel(req, res, next) {
 res.sendFile(viewPath + "/create.html")

}

function index(req, res, next) {
 console.log(viewPath)
 res.sendFile(viewPath + "/index.html")
}

function viewLogin(req, res, next) {
 res.sendFile(viewPath + "/login.html")
}

function viewSignUp(req, res, next) {
 res.sendFile(viewPath + "/signup.html")
}

function view(app, dir) {
 viewPath = dir + "/pages";
 app.use(function (req, res, next) {
  console.log(req.method, req.url)
  next();
 })

 app.get("/", index);
 app.get("/signup", viewSignUp);
 app.get("/create", viewCreateParcel);
 app.get("/login", viewLogin);
 app.get("/settings", viewSettings);
 app.get("/setting", viewSettings);
 app.get("/parcel", viewParcels);
 app.get("/profile", viewProfile);
}

export default view;