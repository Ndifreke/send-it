function setAttributes(element, option) {
 for (let attr in option) {
  element.setAttribute(attr, option[attr])
 }
 return element;
}