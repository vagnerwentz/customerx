import React, { useState, useEffect, useRef }  from 'react';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';

/* Utils */
import getValidationErrors from '../../utils/getValidationError';

import {
  Container,
  Content,
  Table
} from './styles';

import { FiTrash } from 'react-icons/fi';
import { GrPhone, GrEdit } from 'react-icons/gr';

import HeaderVertical from '../../components/HeaderVertical';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';


interface Contact {
  id: string;
  name: string;
  email: string;
  telephone: string;
  telephone_array: { id: string; telephone_number: string}[];
  client_id: string;
}

interface ContactsResponse {
  contacts: Contact[];
}

const ListAllContacts: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const [contacts, setContacts] = useState<Contact[]>([]);

  /* Load all clients */
  useEffect(() => {
    api.get<ContactsResponse>('contacts').then(response => {
      setContacts(response.data.contacts);
    })
  }, []);

  /* Delete a contact */
  async function handleDeleteContact(id: string): Promise<void> {
    try {
      formRef.current?.setErrors({});

      await api.delete(`contacts/${id}`);

      addToast({
        type: 'success',
        title: 'Contato deletado com sucesso 😢.',
        description: 'Que pena que o contato foi deletado.'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro ao tentar deletar um contato',
        description: 'Ocorreu um erro ao tentar remover um contato, aguarde um pouco 😀.'
      });
    }

    const filteredContacts = contacts.filter(contact => contact.id !== id);
    setContacts(filteredContacts);
  }

  async function moveToEditContact(contact: Contact): Promise<void> {
    history.push({
      pathname: `/edit-contact/${contact.id}`,
      state: [contact.telephone_array[0].id, contact] }
    );
  }

  async function moveToAddAndShowTelephones(contact: Contact): Promise<void> {
    history.push({
      pathname: `/add-show-telephones/${contact.id}`,
    });
  }

  return (
    <>
    <Container>
      <HeaderVertical />
        <Content>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>TELEFONE</th>
                <th>AÇÃO</th>
              </tr>
            </thead>
            <tfoot>
            <tr>
              <td >
                {/* <div><a href="#">&laquo;</a> <a href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div> */}
              </td>
            </tr>
            </tfoot>
            <tbody>
            {contacts && contacts.map(contact => (
              <tr key={contact.id}>
                <td>{contact.id}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.telephone}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => moveToEditContact(contact)}
                  >
                    <GrEdit size={30} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveToAddAndShowTelephones(contact)}
                  >
                    <GrPhone size={30} />
                  </button>
                  <button onClick={() => handleDeleteContact(contact.id)}>
                    <FiTrash size={30} color="red" />
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        </Content>
      </Container>
    </>
  );
};

export default ListAllContacts;
