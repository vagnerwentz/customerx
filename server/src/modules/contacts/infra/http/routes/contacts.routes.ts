import { Router } from 'express';

import ensureAuthenticated from '@modules/admins/infra/http/middlewares/ensureAuthenticated';
import CreateContactService from '@modules/contacts/services/CreateContactService';
import DeleteContactService from '@modules/contacts/services/DeleteContactService';
import ListContactsService from '@modules/contacts/services/ListContactsService';
import UpdateContactService from '@modules/contacts/services/UpdateContactService';

const contactsRouter = Router();

contactsRouter.use(ensureAuthenticated);

/* Get all contacts with the telephones and client */
contactsRouter.get('/', async (request, response) => {
  const listContact = new ListContactsService();

  const contacts = await listContact.execute();

  return response.json({ contacts });
});

contactsRouter.post('/', async (request, response) => {
  try {
    const { name, email, telephone, client_id } = request.body;

    const createContact = new CreateContactService();

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
});

/* Delete a contact */
contactsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteContact = new DeleteContactService();

  await deleteContact.execute({
    id,
  });

  return response.status(204).send();
});

contactsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { name, email, telephone } = request.body;

  const updateClient = new UpdateContactService();

  try {
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
});

export default contactsRouter;
