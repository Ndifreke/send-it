window.onload = function () {
  highlightParcelHeader();

  const menuButton = document.getElementById('flow-btn');
  menuButton.onclick = function () {
    toggle('dashboard');
  };
};


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
      const parcelContainerId = parcelHeader.dataset.parcelId;
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

function toggle(eltId) {
  console.log(this);
  const element = document.getElementById(eltId);
  element.style.display = (element.style.display !== 'block') ? 'block' : 'none';
}

function parcelEditPrompt() {
  console.log(this)
}