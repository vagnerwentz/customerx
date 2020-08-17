import React from 'react';
import { Link } from 'react-router-dom';

import { FiUserPlus, FiList  } from 'react-icons/fi';

import { Container, ContainerClient, Card, Cards } from './styles';

import HeaderVertical from '../../components/HeaderVertical';

const Client: React.FC = () => {

  return (
    <>
      <Container>
        <HeaderVertical />

         <ContainerClient>
          <Card>
            <Link to="create-client">
              <Cards>
                <FiUserPlus size={30} color="#000"/>
                <h1> Criar cliente</h1>
              </Cards>
            </Link>

            <Link to="list-all-clients">
              <Cards>
                <FiList size={30} color="#000" />
                <h1> Listar cliente</h1>
              </Cards>
            </Link>


          </Card>
        </ContainerClient>
      </Container>
    </>
  );
};

export default Client;
