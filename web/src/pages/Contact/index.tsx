import React from 'react';
import { Link } from 'react-router-dom';

import { FiList } from 'react-icons/fi';

import { Container, ContainerContact, Card, Cards } from './styles';

import HeaderVertical from '../../components/HeaderVertical';

const Contact: React.FC = () => {

  return (
    <>
      <Container>
        <HeaderVertical />

         <ContainerContact>
          <Card>

            <Link to="list-all-contacts">
              <Cards>
                <FiList size={30} color="#000" />
                <h1> Listar contatos</h1>
              </Cards>
            </Link>


          </Card>
        </ContainerContact>
      </Container>
    </>
  );
};

export default Contact;
