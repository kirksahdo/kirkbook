import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 35px;
`;
