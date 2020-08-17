import React, { useState, useEffect, useRef }  from 'react';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { useLocation } from 'react-router-dom';

/* Utils */
import getValidationErrors from '../../utils/getValidationError';

import {
  Container,
  Content,
  Table
} from './styles';

import { FiTrash } from 'react-icons/fi';

import HeaderVertical from '../../components/HeaderVertical';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface IResults {
  client: Array<{
    result: {
      contacts: Array<{
        contact_id: string;
        contact_name: string;
      }>;
      // Here we can put the clients data
    }
  }>
}

interface Results {
  contact_id: string;
  contact_name: string
}

const ListContactsClients: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { state: id } = useLocation();

  const { addToast } = useToast();

  const [contacts, setContacts] = useState<Results[]>([]);

  /* Load all contacts clients */
  useEffect(() => {
    api.get<IResults>(`clients/${id}`).then(response => {
      setContacts(response.data.client[0].result.contacts);
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

    const filteredContacts = contacts.filter(contact => contact.contact_id !== id);
    setContacts(filteredContacts);
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
              <tr key={contact.contact_id}>
                <td>{contact.contact_id}</td>
                <td>{contact.contact_name}</td>
                <td>

                  <button onClick={() => handleDeleteContact(contact.contact_id)}>
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

export default ListContactsClients;
