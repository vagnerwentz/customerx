import { container } from 'tsyringe';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ContactsRepository from '@modules/contacts/infra/typeorm/repositories/ContactsRepository';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import ITelephonesRepository from '@modules/telephones/repositories/ITelephonesRepository';
import TelephonesRepository from '@modules/telephones/infra/typeorm/repositories/TelephonesRepository';

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<ITelephonesRepository>(
  'TelephonesRepository',
  TelephonesRepository,
);
