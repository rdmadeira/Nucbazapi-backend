import { CustomError } from './custom_errors.js';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Route Not Found!');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: 'Not Found!',
      },
    ];
  }
}
