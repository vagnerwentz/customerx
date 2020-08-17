import React, { useState, useEffect, useRef }  from 'react';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { useHistory, useParams } from 'react-router-dom';

/* Utils */
import getValidationErrors from '../../utils/getValidationError';

import {
  Container,
  Content,
  Table
} from './styles';

import { FiTrash, FiPlusCircle } from 'react-icons/fi';
import { GrEdit } from 'react-icons/gr';

import HeaderVertical from '../../components/HeaderVertical';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface ITelephonesResponse {
  telephones: Array<{
    id: string;
    telephone_number: string;
    client_id: string;
    contact_id: string;
  }>
}

interface Telephones {
  id: string;
  telephone_number: string;
  client_id: string;
  contact_id: string;
}

const AddShowTelephones: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();
  const { id } = useParams();

  console.log(id);

  const [telephones, setTelephones] = useState<Telephones[]>([]);

  /* Load all telephones */
  useEffect(() => {
    api.get<ITelephonesResponse>(`telephones/${id}`).then(response => {
      console.log(response.data.telephones);
      setTelephones(response.data.telephones);
    })
  }, []);

  /* Delete a telephone number */
  async function handleDeleteTelephone(id: string, telephone_number: string): Promise<void> {
    try {
      formRef.current?.setErrors({});

      await api.delete(`telephones/${id}/${telephone_number}`);

      addToast({
        type: 'success',
        title: 'Telefone deletado com sucesso 📞.',
        description: 'Perdemos um contato, mayday!'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro ao tentar deletar o telefone',
        description: 'Ocorreu um erro ao tentar remover o telefone, verifique se temos linha 😀.'
      });
    }

    const filteredTelephones = telephones.filter(telephone => telephone.id !== id);
    setTelephones(filteredTelephones);
  }

  async function moveToAddANewNumber(id: string): Promise<void> {
    history.push({
      pathname: '/add-new-number',
      state: id,
    });
  }

  return (
    <>
    <Container>
      <HeaderVertical />
        <Content>
          <span>Adicionar novo telefone</span>
          <button
            type="button"
            onClick={() => moveToAddANewNumber(id)}
           >
            <FiPlusCircle size={30}/>
           </button>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
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
            {telephones && telephones.map(telephon => (
              <tr key={telephon.id}>
                <td>{telephon.id}</td>
                <td>{telephon.telephone_number}</td>
                <td>
                  <button
                    type="button"
                  >
                    <GrEdit size={30} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteTelephone(telephon.client_id || telephon.contact_id , telephon.telephone_number)}
                  >
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

export default AddShowTelephones;
