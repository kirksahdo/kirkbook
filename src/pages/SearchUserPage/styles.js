import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
  padding-top: 120px;
`;

export const Content = styled.div`
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 50px;
`;
