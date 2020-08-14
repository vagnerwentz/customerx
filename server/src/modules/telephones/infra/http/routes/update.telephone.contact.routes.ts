import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import UpdateTelephoneContactController from '../controllers/UpdateTelephoneContactController';

const updateTelephoneContactRouter = Router();

const updateTelephoneContactController = new UpdateTelephoneContactController();

updateTelephoneContactRouter.use(ensureAuthenticated);

updateTelephoneContactRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      telephone_id: Joi.string().required().uuid(),
      new_telephone: Joi.string().required(),
    },
  }),
  updateTelephoneContactController.update,
);

export default updateTelephoneContactRouter;
