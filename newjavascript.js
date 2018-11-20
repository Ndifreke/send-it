class User {
  constructor(name) {
    if (!name) {
      throw new Error('Name must be supplied');
    }
    this._name = name;
    this._loggedIn = false;
    this._lastLoggedInAt = null;
  }

  isLoggedIn() {
    return !!(this._loggedIn);
  }

  getLastLoggedInAt() {
    return this._lastLoggedInAt;
  }

  logIn() {
    if (!this.isLoggedIn()) {
      this.loggedIn = true;
      this._lastLoggedInAt = new Date();
    }
  }

  logOut() {
    this._loggedIn = false;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }

  // can only delete thier comment
  canEdit(comment) {
    return (comment instanceof Comment && comment.getAuthor() === this);
  }

  canDelete(comment) {
    return false;
  }
}


class Moderator extends User {
  constructor(name) {
    // chain to User constructor;
    this.super(name);
  }
  /*
	 * Moderator inherits from user, and can only edit their comment
	 */

  /** Overrides * */
  // moderator can delete any comment both admin and User
  canDelete(comment) {
    return (comment instanceof Comment);
  }
}


class Admin extends Moderator {
  constructor(name) {
    this.super(name);
  }

  /** Overrides * */
  // Admin can delete any comment
  canEdit(comment) {
    return (comment instanceof Comment);
  }

  canDelete(comment) {
    return this.canEdit(comment);
  }
}


class Comment {
  constructor(author, message, repliedT) {
    this._commentAuthor = undefined;
    this._commentMessage = undefined;
    this._repliedTo = null;
    this._createdAt = undefined;
    this.validateInput(author, message, repliedTo);
  }

  validateInput(author, message, repliedTo) {
    if (!(author instanceof User)) { throw new Error('Author must be a User'); }
    if (!message) { throw new Error('Invalid message supplied'); }
    if (repliedTo instanceof Comment) {
      _repliedTo = repliedTo; // optional
    }
    this._commentAuthor = author;
    this._commentMessage = message;
    this._createdAt = new Date();
  }

  getMessage() {
    return this._commentMessage;
  }

  setMessage(message) {
    this.validateInput(this._commentAuthor, message, this._repliedTo);
  }

  getCreatedAt() {
    return _createdAt;
  }

  getAuthor() {
    return _commentAuthor;
  }

  getRepliedTo() {
    return this._repliedTo;
  }

  toString() {
    if (!this._repliedTo) { return `${this._commentMessage } by ${this._commentAuthor.getName()}`; }
    return `${this._commentMessage} by ${this._commentAuthor.getName()
		 } (replied to ${this._repliedTo.getAuthor().getName()})`;
  }
}
