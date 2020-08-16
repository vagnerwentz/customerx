import React from 'react';

import { FiPower, FiUser, FiList } from 'react-icons/fi';
import {
  Container,
  VerticalHeader,
  FooterHeader,
  AnimationContainer,
  HeaderContent,
  ClientContent,
  ContactContent,
} from './styles';

import { useAuth } from '../../hooks/auth';

const HeaderVertical: React.FC = () => {

  const { signOut } = useAuth();

  return (
    <Container>
      <AnimationContainer>
        <VerticalHeader>
          <HeaderContent>
            <ClientContent>
              <button>
                <FiUser size={45} />
              </button>
              <span>Clientes</span>
            </ClientContent>

            <ContactContent>
              <button>
                <FiList size={45} />
              </button>
              <span>Contatos</span>
            </ContactContent>

          </HeaderContent>
          <FooterHeader>
            <button>
              <FiPower size={30} onClick={signOut}/>
            </button>
          </FooterHeader>
        </VerticalHeader>
      </AnimationContainer>
      {/* <ContainerClient>
        <Card>
          <button>
            <Cards>
              <FiUserPlus size={30} color="#000"/>
              <h1> Criar cliente</h1>
            </Cards>
          </button>

          <button>
            <Cards>
              <FiUserMinus size={30} color="#000" />
              <h1> Deletar cliente</h1>
            </Cards>
          </button>

          <button>
            <Cards>
              <FiEdit size={30} color="#000" />
              <h1> Atualizar cliente</h1>
            </Cards>
          </button>

          <button>
            <Cards>
              <FiList size={30} color="#000" />
              <h1> Listar clientes</h1>
            </Cards>
          </button>

          <button>
            <Cards>
              <h1> Listar cliente</h1>
            </Cards>
          </button>
        </Card>
      </ContainerClient> */}
    </Container>
  );
};

export default HeaderVertical;
