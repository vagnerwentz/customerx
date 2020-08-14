import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTelephoneClientService from '@modules/telephones/services/UpdateTelephoneClientService';

export default class UpdateTelephoneClientController {
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
}
