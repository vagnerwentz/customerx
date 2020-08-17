import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const VerticalHeader = styled.header`
  width: 250px;
  height: 976px;
  max-height: 100vh;

  background: var(--color-additional);
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
`;

export const FooterHeader = styled.footer`
  position: absolute;

  button {
    position: relative;
    background: transparent;
    border: none;
    top: 900px;
    left: 100px;

    svg {
      color: #cc3030;
    }
  }
`;

export const HeaderContent = styled.div`
  position: absolute;
`;

export const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  top: 100px;
  left: 100px;

  button {
    background: none;
    border: 0;

    svg {
      &:hover {
        color: #77ff95;
        transition: 0.2s;
      }
    }
  }
`;

export const ClientContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  top: 200px;
  left: 100px;

  button {
    background: none;
    border: 0;

    svg {
      &:hover {
        color: #77ff95;
        transition: 0.2s;
      }
    }
  }
`;

export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  top: 300px;
  left: 100px;

  button {
    background: none;
    border: 0;

    svg {
      &:hover {
        color: #77ff95;
        transition: 0.2s;
      }
    }
  }
`;
