import React, { useCallback, useRef }  from 'react';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


import { FiPhone, FiMail} from 'react-icons/fi';
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

interface CreateClientFormData {
  name: string;
  email: string;
  telephone: string;
}

const CreateClient: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleCreateClient = useCallback(async (data: CreateClientFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Campo precisa estar preenchido'),
        email: Yup.string().required('Campo precisa estar preenchido').email('Formato de e-mail inválido'),
        telephone: Yup.string().required('Telefone obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('clients', data);

      addToast({
        type: 'success',
        title: 'Cadastro do cliente realizado com sucesso',
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
      });
    }
  }, [addToast]);

  return (
    <>
    <Container>
      <HeaderVertical />
        <Content>
          <Form ref={formRef} onSubmit={handleCreateClient}>

          <Input
            name="name"
            placeholder="Nome completo"
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
            Cadastrar Cliente
          </Button>

          </Form>
        </Content>
      </Container>
    </>
  );
};

export default CreateClient;
