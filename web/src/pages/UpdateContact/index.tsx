import React, { useCallback, useRef }  from 'react';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';


import { FiPhone, FiMail, FiUser} from 'react-icons/fi';
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
import { useParams, useLocation } from 'react-router-dom';

interface UpdateContactFormData {
  name: string;
  email: string;
  telephone: string;
  new_telephone: string;
}


const UpdateContact: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { id } = useParams();
  const { state } = useLocation();

  const { addToast } = useToast();

  const handleUpdateContact = useCallback(async (data: UpdateContactFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Formato de e-mail inválido'),
        new_telephone: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { name, email, new_telephone } = data;

      console.log(new_telephone);

      const telephone_id = state[0];

      await api.put(`/update-telephone-contact`, {
        telephone_id,
        new_telephone
      });

      await api.put(`/contacts/${id}`, {
        name,
        email,
        telephone: new_telephone,
      });

      addToast({
        type: 'success',
        title: 'Atualização do contato realizado com sucesso',
        description: 'Inforamações do contato atualizadas.',
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro na atualização',
        description: 'Ocorreu um erro ao tentar editar um contato.'
      });
    }
  }, [addToast]);

  return (
    <>
    <Container>
      <HeaderVertical />
        <Content>
          <Form ref={formRef} onSubmit={handleUpdateContact} initialData={{
            name: state[1].name,
            email: state[1].email,
            new_telephone: state[1].telephone
          }}>

          <Input
            name="name"
            icon={FiUser}
            placeholder="Nome completo"
          />

          <Input
            name="email"
            type="text"
            icon={FiMail}
            placeholder="E-mail"
          />

          <Input
            name="new_telephone"
            type="text"
            icon={FiPhone}
            placeholder="Telefone"
          />

          <Button type="submit">
            Editar Contato
          </Button>

          </Form>
        </Content>
      </Container>
    </>
  );
};

export default UpdateContact;
