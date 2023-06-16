// La diferencia de abstract class en relación a interface, es que esta sí se compila a javascript como una class comun, que sirve como prototypo
// No se puede instanciar una class abstracta! Es como una interface, que son para tipificar.
/* 
Differencia entre Interface y abstract class, abstract props, metodos: Interfaces only describe what properties and methods should be implemented, and don’t describe how methods should work.
But abstract classes may describe how a method works, like in regular classes -
abstract class MyClass {
   abstract method_1() // a method with no implementation

   method_2() { // a method with implementation
      // do something
   }
}
*/
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message); // Se rompe la cadena de Prototypes

    //Esto es porque es extends de una clase nativa, al crear una instancia, se pierde la cadena de
    // prototypes, y una forma de evitar y restorar la cadena de prototypes, se usa la expresión abajo, según
    // documentación de TS - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html :
    Object.setPrototypeOf(
      this,
      new.target.prototype /* CustomError.prototype -> Se usó en el aula. Usando
        la opción new.target es la forma mas elegante*/
    );
  }
  /* The problem is that Javascript's built-in class Error breaks the prototype chain by
switching the object to be constructed (i.e. this) to a new, different object, when you call 
super and that new object doesn't have the expected prototype chain, i.e. it's an instance of
Error not of CustomError. -> StackOverFlow: https://stackoverflow.com/questions/41102060/typescript-extending-error-class*/

  abstract serializeErrors(): { message: string; field?: string }[]; // devuelve array de objetos con esta estructura.
}
