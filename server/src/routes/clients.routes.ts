import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CreateClientService from '../services/CreateClientService';
import DeleteClientService from '../services/DeleteClientService';

import ClientsRepository from '../repositories/ClientsRepository';

const clientsRouter = Router();

clientsRouter.use(ensureAuthenticated);

clientsRouter.get('/', async (request, response) => {
  const clientsRepository = getCustomRepository(ClientsRepository);
  const clients = await clientsRepository.find();

  return response.json(clients);
});

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

clientsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteClient = new DeleteClientService();

  await deleteClient.execute({
    id,
  });

  return response.status(204).send();
});

export default clientsRouter;
