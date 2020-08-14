import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateTelephoneContactService from '@modules/telephones/services/UpdateTelephoneContactService';

export default class UpdateTelephoneContactController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { telephone_id, new_telephone } = request.body;

    try {
      const updateClientTelephone = container.resolve(
        UpdateTelephoneContactService,
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
