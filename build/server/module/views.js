'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function renderHome(req, res) {
  res.render('index.ejs');
}

var view = {
  renderHome: renderHome
};

exports.default = view;