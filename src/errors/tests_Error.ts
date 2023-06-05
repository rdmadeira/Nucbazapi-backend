import { RequestValidatorError } from './request_validation_error.js';
const error = new Error('Oops');
const requestErrors = new RequestValidatorError([
  {
    msg: 'Oops mail!',
    type: 'field',
    location: 'body',
    path: 'email',
    value: 'notemail@nor.com',
  },
  {
    msg: 'Oops password!',
    type: 'field',
    location: 'body',
    path: 'password',
    value: 'gg',
  },
]);

console.log('errors', requestErrors);
