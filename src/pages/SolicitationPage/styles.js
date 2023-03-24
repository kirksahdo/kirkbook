import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 120px;
  background-color: ${props => props.theme.backgroundColor};
`;

export const Content = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NoSolicitation = styled.h1`
  font-size: 1.5rem;
  color: ${props => props.theme.textColor};
  display: flex;
  text-align: center;
`;