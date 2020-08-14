import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactService from '@modules/contacts/services/CreateContactService';
import DeleteContactService from '@modules/contacts/services/DeleteContactService';
import ListContactsService from '@modules/contacts/services/ListContactsService';
import UpdateContactService from '@modules/contacts/services/UpdateContactService';

export default class ContactsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listContact = container.resolve(ListContactsService);

    const contacts = await listContact.execute();

    return response.json({ contacts });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, telephone, client_id } = request.body;

      const createContact = container.resolve(CreateContactService);

      const contact = await createContact.execute({
        name,
        email,
        telephone,
        client_id,
      });

      return response.json(contact);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, telephone } = request.body;

    try {
      const updateClient = container.resolve(UpdateContactService);

      await updateClient.execute({
        contact_id: id,
        name,
        email,
        telephone,
      });

      return response.status(200).json({ success: 'Contact updated' });
    } catch (err) {
      return response.json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteContact = container.resolve(DeleteContactService);

    await deleteContact.execute({
      id,
    });

    return response.status(204).send();
  }
}
