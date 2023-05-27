# Nucba Zapi

## Proyecto de Curso On Demand - Nucba

## Images de pexels - https://www.pexels.com/pt-br/

## Styled Components - Componentes de UI y UX fueron creados a mano. Pero hay Frameworks de UI para styled components - Chakra-UI, Bootstrap React, y otros.

## Aprovechar el Frontend SPA del modulo de React y crear un backend para este producto, con mongoDB, mongoose, expressJS, nodeJS, typescript

Dejamos de lado la arquitetura de 3 capas (3-layer) que venia siendo el modelo de uso para el backend con node y express, y vamos adoptar una arquitectura hexagonal. Los 3 layers están detallados abajo:

Presentation Layer/Router Layer -> Serían los routers;

Business o Service Layer -> Serían los controlers o handlers de cadarouter;

Data Access Layer -> Serían los Models de mongoose por ejemplo, o las entitades, y que accede la base de datos;

![1685201713266]([image/README/1685201713266.png](https://res.cloudinary.com/practicaldev/image/fetch/s--8CyULLwt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cyfsq68u1mhy76ir9oq3.png))

Este tipo de arquitectura está muy acopladas las relaciones, y si cambiamos la base de datos, o el tipo de request (de http para rstp), y estas relaciones muy acopladas se hace dificil los cambios estructurales.

El tipo hexagonal (clean architecture, by Robert C. Martin o Uncle Bob), se desacopla las relaciones se hace más flexible para evolución del negocio y cambios necesarios en las estructuras.

La idea es centrada en las entidades, y todo al rededor gira con base en esto:

![1685202910251]([image/README/1685202910251.png](https://res.cloudinary.com/practicaldev/image/fetch/s--8CyULLwt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cyfsq68u1mhy76ir9oq3.png))

Por no estar muy acoplado, si cambias algo adentro del negocio, no hay que cambiar toda la estructura, solamente lo que afecta directamente.
