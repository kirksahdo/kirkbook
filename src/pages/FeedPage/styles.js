import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.backgroundColor};
  padding-top: 120px;
`;

export const Posts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 35px;
  width: 600px;
  margin: 0 auto;
`;