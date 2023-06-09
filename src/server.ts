import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler } from './middlewares/errors_handlers.js';
import { invalidPathHandle } from './middlewares/invalidpath.js';

dotenv.config();

const server: Express = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());

server.get('/', (req: Request, res: Response) => {
  res.send(
    'Hola estas en el server por Typescript. Para usar la api, ingresá la siguiente ruta: /api/v1/<entidad>'
  );
});

// Routes:
server.use('/api/v1/', routes);

// handle errors:
// These error-handling middleware functions are attached to the app instance after the route handler functions have been defined.
server.use(errorHandler);
server.use(invalidPathHandle);

server.listen(port, () =>
  console.log(`Server initializated on port ${port}...`)
);
