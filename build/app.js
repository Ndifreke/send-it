'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _views = require('./server/module/views');

var _views2 = _interopRequireDefault(_views);

var _parcel = require('./server/controller/parcel');

var _user = require('./server/controller/user');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.set('views', _path2.default.join(__dirname, 'ui/pages'));
app.set('view engine', 'ejs');
app.use(_express2.default.static(_path2.default.join(__dirname, 'ui')));
app.use((0, _bodyParser2.default)());

app.use('/api/v1/users/:id/parcels', _parcel.getUserParcels);

app.post('/api/v1/parcels', _parcel.createParcel);
app.get('/api/v1/parcels', _parcel.getAllParcels);
app.get('/api/v1/parcels/:id', _parcel.getOneParcel);
app.put('/api/v1/parcels/:id', _parcel.cancelParcel);
app.use('/api/v1/users/:id/parcels', _parcel.getUserParcels);

app.use('/api/v1/users/:id/parcels', _parcel.getUserParcels);

app.get('/', _views2.default.renderHome);

app.post('/api/v1/auth/signup', _user.signup);
app.post('/api/v1/auth/login', _user.login);
app.put('/api/v1/parcels/:id/status', _parcel.updateStatus);
app.put('/api/v1/parcels/:id/destination', _parcel.changeCordinate);
app.put('/api/v1/parcels/:id/presentLocation', _parcel.changePresentLocation);

app.use(function (req, res) {
  console.log(req.url);
  res.statusCode = 500;
  var msg = {
    status: 'error',
    message: 'we dont quiit understand your request at this time. Project is WIP'
  };
  res.end(JSON.stringify(msg), null, '\t');
});

app.listen(process.env.PORT);
exports.default = app;