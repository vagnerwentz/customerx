import React, { useCallback, useRef }  from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useLocation, useHistory } from 'react-router-dom';

/* Icons */
import { FiPhone } from 'react-icons/fi';

/* Styles */
import {
  Container,
  Content
} from './styles';

/* Utils */
import getValidationErrors from '../../utils/getValidationError';

/* Toast */
import { useToast } from '../../hooks/toast';

/* Components */
import HeaderVertical from '../../components/HeaderVertical';
import Input from '../../components/Input';
import Button from '../../components/Button';

/* Api */
import api from '../../services/api';

interface CreateNewNumberFormData {
  telephone_number: string;
}

const AddTelephone: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { state: id } = useLocation();
  const history = useHistory();

  const handleAddNumber = useCallback(async (data: CreateNewNumberFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        telephone_number: Yup.string().required('Telefone obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { telephone_number } = data;

      await api.post('/telephones', {
        owner_id: id,
        telephone_number
      });

      addToast({
        type: 'success',
        title: 'Telefone cadastrado com sucesso.',
        description: 'Eba! Temos mais números'
      })

      history.goBack();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
      addToast({
        type: 'error',
        title: 'Erro ao tentar cadastrar um novo número',
        description: 'Ocorreu um erro ao tentar cadastrar um novo número, pode ser que ele já existe.'
      });
    }
  }, [addToast]);

  return (
    <>
    <Container>
      <HeaderVertical />
        <Content>
          <Form ref={formRef} onSubmit={handleAddNumber}>

          <Input
            name="telephone_number"
            type="text"
            icon={FiPhone}
            placeholder="Telefone"
          />

          <Button type="submit">
            Cadastrar Novo Número
          </Button>

          </Form>
        </Content>
      </Container>
    </>
  );
};

export default AddTelephone;
