import { Request, Response } from 'express';
import { container } from 'tsyringe';

/* Service */
import AuthenticateUserService from '@modules/admins/services/AuthenticateAdminService';
import { classToClass } from 'class-transformer';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { admin, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(200).json({ admin: classToClass(admin), token });
  }
}
