import { CustomError } from './custom_errors.js';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string, code?: number) {
    super(message);
    this.statusCode = code ? code : this.statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [
      {
        message: this.message,
      },
    ];
  }
}
