/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-restricted-syntax */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */


const log = console.log;

let initialWidth;
window.onload = function () {
  initialWidth = (document.body.clientWidth < 768) ? 'mobile' : 'desktop';

  if (initialWidth === 'mobile') {
    useMobileWidth();
  } else {
    useDesktopWidth();
  }

  window.onresize = function () {
    makeResponsive();
  };
  highlightParcelHeader();
};

function useMobileWidth() {
  const flowBotton = document.getElementById('flow-btn');
  const dashbord = document.getElementById('dashboard');

  flowBotton.onclick = function () {
    toggle('dashboard');
  };
  initialWidth = 'mobile';
}

function useDesktopWidth() {
  initialWidth = 'desktop';
}

function makeResponsive() {
  const currentWidth = document.body.clientWidth;
  if (initialWidth === 'desktop' && currentWidth < 768) {
    useMobileWidth();
  } else if (initialWidth === 'mobile' && currentWidth > 768) {
    useDesktopWidth();
  }
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
  return el;
}

function highlightParcelHeader() {
  const parcelHeaders = document.getElementsByClassName('package-preview');

  for (const parcelHeader of parcelHeaders) {
    parcelHeader.onclick = function () {
      // reset other headers colors to dark blue
      for (const otherParcelHeader of parcelHeaders) {
        if (parcelHeader !== otherParcelHeader) {
          otherParcelHeader.style['background-color'] = '#323544';
        }
      }
      const parcelContainerId = parcelHeader.dataset['parcelId'];
      toggle(parcelContainerId);
      const parcelContainer = document.getElementById(parcelContainerId);
      (parcelContainer.style.display === 'block') ?
      this.style['background-color'] = '#FF5722': this.style['background-color'] = '#323544';
    };
  }
}

/* Set the display of an html element identified by the id or class name passed in as
 * argument. if an arguments contains object. the id field should be the elements id or class
 * and the display property is the type of display. By default an id withoud display is set to
 * block display
 *  */
function getElement(identifier, attribute) {
  switch (attribute) {
    case 'class':
      return document.getElementsByClassName(identifier);
    case 'id':
      return document.getElementById(identifier);
    case 'tag':
      return document.getElementsByTagName(identifier);
  }
  return null;
}

function showDashContent(viewID) {
  setDisplay(viewID);
}

function toggle(eltId) {
  console.log(this);
  const element = document.getElementById(eltId);
  element.style.display = (element.style.display !== 'block') ? 'block' : 'none';
}