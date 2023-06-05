import { CustomError } from './custom_errors.js';
import { ValidationError } from 'express-validator';

export class RequestValidatorError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super('Validation Errors');

    //Esto es porque es extends de una clase nativa:
    Object.setPrototypeOf(this, RequestValidatorError.prototype);
  }

  public serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      field: err.type === 'field' ? err.path : undefined,
    }));
  }
}
