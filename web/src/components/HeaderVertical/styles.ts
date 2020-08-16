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

export const ClientContent = styled.div`
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

export const ContactContent = styled.div`
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

export const ContainerClient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
`;

export const Card = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 300px);
  grid-auto-rows: auto;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  background: #fff;

  button {
    border-radius: 50px;
    border: none;

    &:hover {
      transition: 0.8s;
      background: #4a2178;
    }
  }
`;

export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  border: 2px solid #e7e7e7;
  border-radius: 50px;


  padding: 5rem;

  h1 {
    color: #000;
  }
`;
