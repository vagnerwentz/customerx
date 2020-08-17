import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTelephoneService from '@modules/telephones/services/CreateTelephoneService';
import DeleteTelephoneService from '@modules/telephones/services/DeleteTelephoneService';
import GetTelephoneService from '@modules/telephones/services/GetTelephoneService';
import UpdateTelephoneClientService from '@modules/telephones/services/UpdateTelephoneClientService';

export default class TelephonesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    console.log('ID no TelephonesController:', id);

    try {
      const telephoneService = container.resolve(GetTelephoneService);

      const telephones = await telephoneService.execute({ id });

      console.log('telephones no controller após o execute: ', telephones);

      return response.status(200).json({ telephones });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { telephone_number, owner_id } = request.body;

      const telephoneService = container.resolve(CreateTelephoneService);

      await telephoneService.execute({
        owner_id,
        telephone_number,
      });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { telephone_id, new_telephone } = request.body;

    try {
      const updateClientTelephone = container.resolve(
        UpdateTelephoneClientService,
      );

      await updateClientTelephone.execute({
        telephone_id,
        new_telephone,
      });

      return response.status(200).json({ success: 'Client updated' });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { owner_id, telephone_number } = request.params;

      const telephoneService = container.resolve(DeleteTelephoneService);

      await telephoneService.execute({ owner_id, telephone_number });

      return response.status(204).send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
