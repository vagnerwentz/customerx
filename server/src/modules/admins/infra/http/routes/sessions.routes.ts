import { Router } from 'express';

/* Service */
import { celebrate, Segments } from 'celebrate';
import Joi from '@hapi/joi';
import SessionController from '../controllers/SessionsController';

const sessionsController = new SessionController();

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
