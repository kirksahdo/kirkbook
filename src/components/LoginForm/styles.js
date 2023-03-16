import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 80px 0;
  border: 1px solid white;
  border-radius: 20px;
`;

export const TitleForm = styled.h1`
  color: #fff;
  font-size: 30pt;
  margin-bottom: 50px;
`;

export const EnterButton = styled.button`
  width: 60%;
  background-color: ${props => props.theme.accentColor};
  padding: 20px;
  border: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  &:hover {
    background-color: ${props => props.theme.disabledColor};
  }
`;

export const ALink = styled.a`
  color: ${props => props.theme.accentColor};
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.disabledColor};
  }
`;  