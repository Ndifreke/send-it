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
  heighlight();
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

function heighlight() {
  const previewHandles = document.getElementsByClassName('package-preview');

  for (const handle of previewHandles) {
    handle.onclick = function () {
      // reset other handle colors to dark blue
      for (const otherHandlers of previewHandles) {
        if (handle !== otherHandlers) {
          otherHandlers.style['background-color'] = '#323544';
        }
      }
      const handleId = handle.getAttribute('id');
      console.log(handleId);
      const containderId = handleId.substring(handleId.search('=') + 1);
      const parcelContainer = document.getElementById(containderId);
      toggle(containderId);
      (parcelContainer.style.display === 'block')
        ? this.style['background-color'] = '#FF5722' : this.style['background-color'] = '#323544';
    };
  }
}
