/* eslint-disable import/prefer-default-export */

class Utils {
  static validateHasRequiredFields(required, inputOptions) {
    let missingField;
    if (required.indexOf('email') !== -1) {
      Utils.validateEmail(inputOptions.email);
    }
    const hasRequiredField = required.every((field) => {
      missingField = field;
      return (field in inputOptions) && !Utils.isEmpty(inputOptions[field]);
    });
    if (!hasRequiredField) { throw Error(`${missingField} field is required to create a user`); }
  }

  static formatJson(json) {
    return JSON.stringify(json, null, '\t');
  }

  static isInteger(value) {
    return (/^\d+$/.test(value));
  }

  static respondWith(status, message) {
    return JSON.stringify({
      status,
      message,
    });
  }

  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      throw new Error('Invalid email Address');
    }
  }

  static validateName(name) {
    if (!/^[a-zA-Z]+$/.test(name)) {
      throw new Error('Invalid character found in input');
    }
  }

  static isEmpty(input) {
    if (/^(\s)*$/.test(input)) {
      throw Error('Empty Field found');
    }
  }
}

export {
  Utils,
};
