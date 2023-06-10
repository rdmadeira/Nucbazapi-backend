import { CustomError } from './custom_errors.js';

export class NotAuthorized extends CustomError {
  statusCode: number = 401; // code de no autorizado

  constructor() {
    super('Not Authorized');
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'Not authorized!',
      },
    ];
  }
}
