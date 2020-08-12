import { Router } from 'express';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';

import DeleteClientService from '@modules/clients/services/DeleteClientService';

import CreateTelephoneService from '@modules/telephones/services/CreateTelephoneService';

const telephonesRouter = Router();

telephonesRouter.use(ensureAuthenticated);

telephonesRouter.post('/', async (request, response) => {
  try {
    const { telephone_number, owner_id } = request.body;

    const telephoneService = new CreateTelephoneService();

    await telephoneService.execute({
      owner_id,
      telephone_number,
    });

    return response.status(204).send();
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

telephonesRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteClient = new DeleteClientService();

  await deleteClient.execute({
    id,
  });

  return response.status(204).send();
});

export default telephonesRouter;
