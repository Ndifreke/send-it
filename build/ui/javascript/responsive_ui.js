'use strict';

/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */

var log = console.log;

var initialWidth = void 0;
window.onload = function () {
  initialWidth = document.body.clientWidth < 768 ? 'mobile' : 'desktop';

  if (initialWidth === 'mobile') {
    useMobileWidth();
  } else {
    useDesktopWidth();
  }

  window.onresize = function () {
    makeResponsive();
  };
  heighlight();
};

function useMobileWidth() {
  var flowBotton = document.getElementById('flow-btn');
  var dashbord = document.getElementById('dashboard');

  flowBotton.onclick = function () {
    toggle('dashboard');
  };
  initialWidth = 'mobile';
}

function useDesktopWidth() {
  initialWidth = 'desktop';
}

function makeResponsive() {
  var currentWidth = document.body.clientWidth;
  if (initialWidth === 'desktop' && currentWidth < 768) {
    useMobileWidth();
  } else if (initialWidth === 'mobile' && currentWidth > 768) {
    useDesktopWidth();
  }
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach(function (key) {
    return el.setAttribute(key, attrs[key]);
  });
  return el;
}

function heighlight() {
  var previewHandles = document.getElementsByClassName('package-preview');

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    var _loop = function _loop() {
      var handle = _step.value;

      handle.onclick = function () {
        // reset other handle colors to dark blue
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = previewHandles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var otherHandlers = _step2.value;

            if (handle !== otherHandlers) {
              otherHandlers.style['background-color'] = '#323544';
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        var handleId = handle.getAttribute('id');
        console.log(handleId);
        var containderId = handleId.substring(handleId.search('=') + 1);
        var parcelContainer = document.getElementById(containderId);
        toggle(containderId);
        parcelContainer.style.display === 'block' ? this.style['background-color'] = '#FF5722' : this.style['background-color'] = '#323544';
      };
    };

    for (var _iterator = previewHandles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      _loop();
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}