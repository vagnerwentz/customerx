import { Router } from 'express';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import CreateClientService from '@modules/clients/services/CreateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';

import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import TelephonesRepository from '@modules/telephones/infra/typeorm/repositories/TelephonesRepository';
import ListClientService from '@modules/clients/services/ListClientService';
import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

/* Get all clients with the telephones */
clientsRouter.get('/', async (request, response) => {
  const clientsRepository = new ClientsRepository();

  const listClients = new ListClientService(clientsRepository);

  const clients = await listClients.execute();

  return response.json({ clients });
});

/* Create a new client */
clientsRouter.post('/', async (request, response) => {
  try {
    const { name, email, telephone } = request.body;

    const clientsRepository = new ClientsRepository();
    const telephonesRepository = new TelephonesRepository();

    const createClient = new CreateClientService(
      clientsRepository,
      telephonesRepository,
    );

    const client = await createClient.execute({
      name,
      email,
      telephone,
    });

    return response.json(client);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

/* Delete a client */
clientsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const clientsRepository = new ClientsRepository();

  const deleteClient = new DeleteClientService(clientsRepository);

  await deleteClient.execute({
    id,
  });

  return response.status(204).send();
});

clientsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, telephone } = request.body;

  try {
    const contactsRepository = new ContactsRepository();
    const clientsRepository = new ClientsRepository();
    const telephonesRepository = new TelephonesRepository();

    const updateClient = new UpdateClientService(
      clientsRepository,
      telephonesRepository,
      contactsRepository,
    );
    await updateClient.execute({
      client_id: id,
      name,
      email,
      telephone,
    });

    return response.status(200).json({ success: 'Client updated' });
  } catch (err) {
    return response.json({ error: err.message });
  }
});

export default clientsRouter;
