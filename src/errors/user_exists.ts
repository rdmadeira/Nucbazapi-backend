import { CustomError } from './custom_errors.js';

export class UserExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('User already exists!');
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'User already exists!',
      },
    ];
  }
}
