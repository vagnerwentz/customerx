import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateContactService from '../services/CreateContactService';

const contactsRouter = Router();

contactsRouter.use(ensureAuthenticated);

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

export default contactsRouter;
