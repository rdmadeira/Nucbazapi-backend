// Este es un custom types definition, que servirá para express
import * as core from 'express-serve-static-core';
import { UserDto } from '../../core/dto/authUser.ts';
// https://blog.logrocket.com/extend-express-request-object-typescript/

/* Hay que configurar el tsconfig.json, como:
"typeRoots": [
      "src/@types",              // Esto permite definir la ruta a leer types
      "./node_modules/@types"
    ] 
*/

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}
