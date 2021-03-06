import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import TelephonesController from '../controllers/TelephonesController';

const telephonesRouter = Router();

const telephonesController = new TelephonesController();

telephonesRouter.use(ensureAuthenticated);

telephonesRouter.get('/:id', telephonesController.index);

telephonesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      owner_id: Joi.string().required().uuid(),
      telephone_number: Joi.string().required(),
    },
  }),
  telephonesController.create,
);

telephonesRouter.delete('/:id/:telephone_number', telephonesController.delete);

export default telephonesRouter;
