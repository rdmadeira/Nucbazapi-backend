import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import { router } from './routes/todo.js';
// import { connectToDB } from './config/connection.js';

dotenv.config();
// connectToDB();

const server: Express = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());

server.get('/', (req: Request, res: Response) => {
  res.send(
    'Hola estas en el server por Typescript. Para usar la api, ingresá la siguiente ruta: /api/v1/<entidad>'
  );
});
// server.use('/api/v1/', router);

server.listen(port, () =>
  console.log(`Server initializated on port ${port}...`)
);
