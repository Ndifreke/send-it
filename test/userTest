/* eslint-disable no-undef */
import { assert } from 'chai';
import { User } from '../server/module/User';

const createOption = {
  firstname: 'Ndifreke',
  surname: 'Ekim',
  email: 'user@email.com',
  phone: '07035478978',
  password: 'johndoe',
};

describe('User Api End Points', () => {
  it('Should create a User successfully', () => {
    const created = new User(createOption);
    assert.isTrue(created.create());
  });

  it('User should be able to login', () => {
    const id = User.login(createOption.email, createOption.password);
    assert.isAbove(parseInt(id, 10), 0);
  });

  it('That creating the same user fails create a User successfully', () => {
    const created = new User(createOption);
    console.log(created);
    //assert.isNotTrue(created.create());
  });


});
