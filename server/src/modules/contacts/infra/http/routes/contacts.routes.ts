import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import ContactsController from '../controllers/ContactsController';

const contactsRouter = Router();

contactsRouter.use(ensureAuthenticated);

const contactsController = new ContactsController();

/* Get all contacts with the telephones and client */
contactsRouter.get('/', contactsController.index);

contactsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      telephone: Joi.string().required(),
      email: Joi.string().email().required(),
      client_id: Joi.string().uuid().required(),
    },
  }),
  contactsController.create,
);

/* Delete a contact */
contactsRouter.delete('/:id', contactsController.delete);

contactsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      telephone: Joi.string(),
    },
  }),
  contactsController.update,
);

export default contactsRouter;
