import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  input {
    width: 400px;
  }
`;

export const ContainerContact = styled.div`
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

  a {
    text-decoration: none;
  }

  a {
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
