import { Router } from 'express';

import UsersController from '../controller/UsersController';

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post('/register', usersController.create);

usersRoutes.delete('/:id', usersController.delete);

usersRoutes.put('/:id', usersController.update);

usersRoutes.get('/:id', usersController.findUser);

export default usersRoutes;
