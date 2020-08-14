import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

const clientsController = new ClientsController();

/* Get all clients with the telephones */
clientsRouter.get('/', clientsController.index);

/* Create a new client */
clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      telephone: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  clientsController.create,
);

/* Delete a client */
clientsRouter.delete('/:id', clientsController.delete);

/* Update */
clientsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string(),
    },
  }),
  clientsController.update,
);

export default clientsRouter;
