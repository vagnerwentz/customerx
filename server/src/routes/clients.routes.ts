import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';
import UpdateClientService from '../services/UpdateClientService';

import ClientsRepository from '../repositories/ClientsRepository';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

/* Get all clients with the telephones */
clientsRouter.get('/', async (request, response) => {
  const clientsRepository = getCustomRepository(ClientsRepository);

  const clients = await clientsRepository.find();

  return response.json({ clients });
});

/* Create a new client */
clientsRouter.post('/', async (request, response) => {
  try {
    const { name, email, telephone } = request.body;

    const createClient = new CreateClientService();

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

  const deleteClient = new DeleteClientService();

  await deleteClient.execute({
    id,
  });

  return response.status(204).send();
});

clientsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, telephone } = request.body;

  const updateClient = new UpdateClientService();

  try {
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
