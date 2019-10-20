import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionController';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

routes.post('/students', StudentsController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);

routes.put('/students', SessionController.store);

export default routes;
