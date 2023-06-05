// La diferencia de abstract class en relación a interface, es que esta sí compila a javascript como una class comun, que sirve como prototypo
// No se puede instanciar una class abstracta! Es como una interface, que son para tipificar.
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[]; // devuelve array de objetos con esta estructura.
}
