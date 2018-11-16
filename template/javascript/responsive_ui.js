/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
const log = console.log;

let initialWidth;
window.onload = function () {
  initialWidth = (document.body.clientWidth < 768) ? 'mobile' : 'desktop';
 
  if (initialWidth === 'mobile') { useMobileWidth(); } else { useDesktopWidth(); }

  window.onresize = function () {
    makeResponsive();
  };
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
  if (initialWidth === 'desktop' && currentWidth < 768) { useMobileWidth(); } else if (initialWidth === 'mobile' && currentWidth > 768) { useDesktopWidth(); }
}

function setAttributes(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
  return el;
}
