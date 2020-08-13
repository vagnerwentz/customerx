import { Router } from 'express';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import CreateTelephoneService from '@modules/telephones/services/CreateTelephoneService';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';
import TelephonesRepository from '../../typeorm/repositories/TelephonesRepository';

const telephonesRouter = Router();

telephonesRouter.use(ensureAuthenticated);

const telephonesRepository = new TelephonesRepository();
const clientsRepository = new ClientsRepository();
const contactsRepository = new ContactsRepository();

telephonesRouter.post('/', async (request, response) => {
  try {
    const { telephone_number, owner_id } = request.body;

    const telephoneService = new CreateTelephoneService(
      telephonesRepository,
      clientsRepository,
      contactsRepository,
    );

    await telephoneService.execute({
      owner_id,
      telephone_number,
    });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default telephonesRouter;
