import { Router } from 'express';

import sessionsRouter from '@modules/admins/infra/http/routes/sessions.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import contactsRouter from '@modules/contacts/infra/http/routes/contacts.routes';
import telephonesRouter from '@modules/telephones/infra/http/routes/telephones.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/contacts', contactsRouter);
routes.use('/telephones', telephonesRouter);

export default routes;
