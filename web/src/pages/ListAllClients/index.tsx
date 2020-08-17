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

import { FiTrash, FiPlusCircle } from 'react-icons/fi';
import { GrPhone, GrEdit, GrList } from 'react-icons/gr';

import HeaderVertical from '../../components/HeaderVertical';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';


interface Client {
  id: string;
  name: string;
  email: string;
  telephone: string;
  telephone_array: { id: string; telephone_number: string}[];
  created_at: string;
}


interface ClientsResponse {
  clients: Client[];
}

const ListAllClients: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const [clients, setClients] = useState<Client[]>([]);

  /* Load all clients */
  useEffect(() => {
    api.get<ClientsResponse>('clients').then(response => {
      const newClientsFormatted = response.data.clients.map(client => {
        const dateFormated = new Date(client.created_at);
        return {
          ...client,
          created_at: dateFormated.toLocaleDateString('pt-BR'),
        }
      })
      setClients(newClientsFormatted);
    })
  }, []);

  /* Delete a client */
  async function handleDeleteClient(id: string): Promise<void> {
    try {
      formRef.current?.setErrors({});

      await api.delete(`clients/${id}`);

      addToast({
        type: 'success',
        title: 'Cliente deletado com sucesso 😢.',
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro ao tentar deletar um cliente',
        description: 'Ocorreu um erro ao tentar remover um cliente, aguarde um pouco 😀.'
      });
    }

    const filteredClients = clients.filter(client => client.id !== id);
    setClients(filteredClients);
  }

  async function moveToEditClient(client: Client): Promise<void> {
    history.push({
      pathname: `/edit-client/${client.id}`,
      state: [client.telephone_array[0].id, client] }
    );
  }

  async function moveToAddAndShowTelephones(client: Client): Promise<void> {
    history.push({
      pathname: `/add-show-telephones/${client.id}`,
    });
  }

  async function moveToAddANewContact(id: string): Promise<void> {
    history.push({
      pathname: '/add-contact',
      state: id,
    })
  }

  async function moveToContactsList(id: string): Promise<void> {
    history.push({
      pathname: '/list-contacts-clients',
      state: id,
    })
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
                <th>REGISTRO</th>
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
            {clients && clients.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.telephone}</td>
                <td>{client.created_at}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => moveToEditClient(client)}
                  >
                    <GrEdit size={30} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveToContactsList(client.id)}
                  >
                    <GrList size={30} />
                  </button>

                  <button
                    type="button"
                    onClick={() => moveToAddANewContact(client.id)}
                  >
                    <FiPlusCircle size={30}/>
                  </button>

                  <button
                    onClick={() => moveToAddAndShowTelephones(client)}
                  >
                    <GrPhone size={30} />
                  </button>
                  <button onClick={() => handleDeleteClient(client.id)}>
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

export default ListAllClients;
