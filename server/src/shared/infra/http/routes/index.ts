import { Router } from 'express';

import sessionsRouter from '@modules/admins/infra/http/routes/sessions.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import contactsRouter from '@modules/contacts/infra/http/routes/contacts.routes';
import telephonesRouter from '@modules/telephones/infra/http/routes/telephones.routes';
import updateTelephoneClientRouter from '@modules/telephones/infra/http/routes/update.telephone.client.routes';
import updateTelephoneContactRouter from '@modules/telephones/infra/http/routes/update.telephone.contact.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/clients', clientsRouter);
routes.use('/contacts', contactsRouter);
routes.use('/telephones', telephonesRouter);
routes.use('/update-telephone-client', updateTelephoneClientRouter);
routes.use('/update-telephone-contact', updateTelephoneContactRouter);

export default routes;
