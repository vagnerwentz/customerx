import React, { useCallback, useRef }  from 'react';
import { useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { FiPhone, FiMail, FiUser, FiCommand} from 'react-icons/fi';

import {
  Container,
  Content
} from './styles';

/* Utils */
import getValidationErrors from '../../utils/getValidationError';

import { useToast } from '../../hooks/toast';

import HeaderVertical from '../../components/HeaderVertical';
import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface AddContactFormData {
  name: string;
  email: string;
  telephone: string;
}

const AddContact: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { state } = useLocation();

  console.log(state);

  const { addToast } = useToast();

  const handleAddContact = useCallback(async (data: AddContactFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome do contato obrigatório'),
        email: Yup.string().email('Formato de e-mail inválido.').required('E-mail obrigatório'),
        telephone: Yup.string().required('Telefone obrigatório.')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, telephone } = data;

      await api.post('/contacts', {
        name,
        email,
        telephone,
        client_id: state
      });

      addToast({
        type: 'success',
        title: 'Cadastro de contato realizado com sucesso',
        description: 'Cadastro realizado.',
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar contato, cheque os dados.',
        description: 'Ocorreu um erro ao tentar criar um contato.'
      });
    }
  }, [addToast]);

  return (
    <>
    <Container>
      <HeaderVertical />
        <Content>
          <Form ref={formRef} onSubmit={handleAddContact} initialData={{
            id: state,
          }}>

          <Input
            name="id"
            icon={FiCommand}
            placeholder="ID"
            readOnly
          />

          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome do contato"
          />

          <Input
            name="email"
            type="text"
            icon={FiMail}
            placeholder="E-mail"
          />

          <Input
            name="telephone"
            type="text"
            icon={FiPhone}
            placeholder="Telefone"
          />

          <Button type="submit">
            Cadastrar contato
          </Button>

          </Form>
        </Content>
      </Container>
    </>
  );
};

export default AddContact;
