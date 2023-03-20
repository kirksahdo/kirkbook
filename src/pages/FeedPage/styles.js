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

export const Button = styled.button`
  background-color: ${props => props.theme.primaryColor};
  color: white;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;