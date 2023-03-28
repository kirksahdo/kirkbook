import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 30px;
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
  padding: 20px;
  border-radius: 10px;
  transform: scale(1);
  transition: transform 0.2s ease-in-out;
  &:hover {
    text-decoration: none;
    transform: scale(1.1);
  }
`;

export const ImageProfile = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const UserData = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const MainText = styled.h1`
  font-size: 1em;
  font-weight: bolder;
  color: ${(props) => props.theme.textColor};
`;

export const SubText = styled.h2`
  font-size: 0.9em;
  color: ${(props) => props.theme.textColor};
`;

export const Buttons = styled.h1`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

export const ButtonAccept = styled.button`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #00ff00;
  border: none;
  gap: 10px;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  &:hover {
    background-color: #158a1f;
  }
  &:focus {
    outline: none;
  }
  h4 {
    font-size: 0.9em;
    color: ${(props) => props.theme.textColor};
  }
`;

export const ButtonReject = styled.button`
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #ff0000;
  border: none;
  gap: 10px;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  &:hover {
    background-color: #ab1414;
  }
  &:focus {
    outline: none;
  }
  h4 {
    font-size: 0.9em;
    ${(props) => props.theme.textColor};
  }
`;
