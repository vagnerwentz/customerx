import { Router } from 'express';

/* Service */
import AuthenticateAdminService from '../../../services/AuthenticateAdminService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateAdmin = new AuthenticateAdminService();

    const { admin, token } = await authenticateAdmin.execute({
      email,
      password,
    });

    delete admin.password;

    return response.json({ admin, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
