import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../config/auth';

import Admin from '../models/Admin';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  admin: Admin;
  token: string;
}

class AuthenticateAdminService {
  public async execute({ email, password }: Request): Promise<Response> {
    const adminsRepository = getRepository(Admin);

    const admin = await adminsRepository.findOne({
      where: { email },
    });

    if (!admin) {
      throw new AppError('Incorrect email/password combination.', 200);
    }

    const passwordMatched = await compare(password, admin.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 200);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: admin.id,
      expiresIn,
    });

    return {
      admin,
      token,
    };
  }
}

export default AuthenticateAdminService;
