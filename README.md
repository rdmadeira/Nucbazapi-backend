# Nucba Zapi

## Proyecto de Curso On Demand - Nucba

## Aprovechar el Frontend SPA del modulo de React y crear un backend para este producto, con mongoDB, mongoose, expressJS, nodeJS, typescript

Dejamos de lado la arquitetura de 3 capas (3-layer) que venia siendo el modelo de uso para el backend con node y express, y vamos adoptar una arquitectura hexagonal. Los 3 layers están detallados abajo:

Presentation Layer/Router Layer -> Serían los routers;

Business o Service Layer -> Serían los controlers o handlers de cadarouter;

Data Access Layer -> Serían los Models de mongoose por ejemplo, o las entitades, y que accede la base de datos;

![1685201713266](https://ctrly.blog/wp-content/uploads/2022/01/nodejs-layered-architecture-diagram.png)

Este tipo de arquitectura está muy acopladas las relaciones, y si cambiamos la base de datos, o el tipo de request (de http para rstp), y estas relaciones muy acopladas se hace dificil los cambios estructurales.

El tipo hexagonal (clean architecture, by Robert C. Martin o Uncle Bob), se desacopla las relaciones se hace más flexible para evolución del negocio y cambios necesarios en las estructuras.

La idea es centrada en las entidades, y todo al rededor gira con base en esto:

![1685202910251](https://res.cloudinary.com/practicaldev/image/fetch/s--8CyULLwt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cyfsq68u1mhy76ir9oq3.png)

Por no estar muy acoplado, si cambias algo adentro del negocio, no hay que cambiar toda la estructura, solamente lo que afecta directamente

## Dependencias instaladas:

- express y @types/express;
- typescript y @types/node;
- JsonWebTokens y @types/jsonwebtokens - token generator con validad temporal
- prisma y @prisma/client - ORM para SQL databases
- bcryptJs y types/bcryptjs - hash de passwords
- dotenv y @types/dotenv;
- ts-node;
- cors y @types/cors;
- express-validator; - manejo de errores
- nodemon
- mercadopago

## Insercion Mercado Pago:

### Ejemplo aplicacion en node y python: https://github.com/mercadopago/checkout-payment-sample

### Usuarios de prueba:

```javascript
Tener en cuenta que estes usuarios de prueba son momentaneos y si no usados por 60 dias corridos, seran eliminados.

// Vendedor:
{
    "id": 1402258368,
    "nickname": "TESTUSER1924106282",
    "password": "fcWa5qeig4",
    "email": "test_user_1443999428@testuser.com"
}

// Pagador:
{
"id": 1402258408,
    "nickname": "TESTUSER1390767732",
    "password": "fj3d3NblKz",
    "email": "test_user_1390767732@testuser.com"

}
```
