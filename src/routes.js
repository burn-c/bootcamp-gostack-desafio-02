import { Router } from 'express';

import StudentsController from './app/controllers/StudentsController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/students', StudentsController.store);
routes.post('/sessions', SessionController.store);

export default routes;
