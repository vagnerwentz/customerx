import React from 'react';

import { FiPower, FiUser, FiList, FiSlack } from 'react-icons/fi';
import {
  Container,
  VerticalHeader,
  FooterHeader,
  DashboardContent,
  AnimationContainer,
  HeaderContent,
  ClientContent,
  ContactContent,
} from './styles';

import { useAuth } from '../../hooks/auth';
import { useHistory } from 'react-router-dom';

const HeaderVertical: React.FC = () => {

  const history = useHistory();

  function handleToGoToDashboard() {
    history.push('/dashboard');
  }

  function handleToGoClients() {
    history.push('/clients-dashboard');
  }

  function handleToGoContacts() {
    history.push('/contacts-dashboard');
  }

  const { signOut } = useAuth();

  return (
    <Container>
      <AnimationContainer>
        <VerticalHeader>
          <HeaderContent>
            <DashboardContent>
              <button
                type="button"
                onClick={handleToGoToDashboard}>
              <FiSlack size={45} />
              </button>
              <span>Dashboard</span>
            </DashboardContent>

            <ClientContent>
              <button
                type="button"
                onClick={handleToGoClients}>
              <FiUser size={45} />
              </button>
              <span>Clientes</span>
            </ClientContent>

            <ContactContent>
              <button
                type="button"
                onClick={handleToGoContacts}
              >
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
    </Container>
  );
};

export default HeaderVertical;
