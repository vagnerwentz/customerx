import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ListClientService from '@modules/clients/services/ListClientService';

export default class ClientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClients = container.resolve(ListClientService);

    const clients = await listClients.execute();

    return response.json({ clients });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, telephone } = request.body;

      const createClient = container.resolve(CreateClientService);

      const client = await createClient.execute({
        name,
        email,
        telephone,
      });

      return response.json(client);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    try {
      const updateClient = container.resolve(UpdateClientService);
      await updateClient.execute({
        client_id: id,
        name,
        email,
      });

      return response.status(200).json({ success: 'Client updated' });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClient = container.resolve(DeleteClientService);

    await deleteClient.execute({
      id,
    });

    return response.status(204).send();
  }
}
