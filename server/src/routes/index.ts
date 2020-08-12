import { Router } from 'express';

import sessionsRouter from './sessions.routes';
import clientsRouter from './clients.routes';
import contactsRouter from './contacts.routes';
import telephonesRouter from './telephones.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/contacts', contactsRouter);
routes.use('/telephones', telephonesRouter);

export default routes;
