import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import UpdateTelephoneClientController from '../controllers/UpdateTelephoneClientController';

const updateTelephoneClientRouter = Router();

const updateTelephoneClientController = new UpdateTelephoneClientController();

updateTelephoneClientRouter.use(ensureAuthenticated);

updateTelephoneClientRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      telephone_id: Joi.string().required().uuid(),
      new_telephone: Joi.string().required(),
    },
  }),
  updateTelephoneClientController.update,
);

export default updateTelephoneClientRouter;
