import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${props => props.theme.primaryColor};
`;

const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
  color: white;
`;

const Text = styled.p`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
`;

const Link = styled.a`
  font-size: 2rem;
  color: blue;
  text-decoration: underline;
  color: black;
  cursor: pointer;
`;

function Error404Page() {
  return (
    <Container>
      <Title>404</Title>
      <Text>Oops! Página não encontrada.</Text>
      <Link href="/">Voltar para a página inicial</Link>
    </Container>
  );
}

export default Error404Page;