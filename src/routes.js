import { Router } from 'express';
import Students from './app/models/Students';

const routes = new Router();

routes.get('/', async (req, res) => {
  const student = await Students.create({
    name: 'Carlos Oliveira',
    email: 'carlos@gym.com.br',
    idade: '28',
    peso: '60',
    altura: '1.75',
    password_hash: '123456'
  });
  return res.json(student);
});

export default routes;
