import styled from 'styled-components';
import { FaArrowCircleLeft } from 'react-icons/fa';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  padding: 20px 0;
  border: 1px solid white;
  border-radius: 20px;
  position: relative;
  overflow: auto;
`;

export const TitleForm = styled.h1`
  color: #fff;
  font-size: 30pt;
  margin-bottom: 30px;
`;

export const EnterButton = styled.button`
  width: 60%;
  background-color: ${(props) => props.theme.accentColor};
  padding: 20px;
  border: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 20px;
  &:hover {
    background-color: ${(props) => props.theme.disabledColor};
  }
`;

export const ALink = styled.a`
  color: ${(props) => props.theme.accentColor};
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export const ArrowBack = styled(FaArrowCircleLeft)`
  color: ${(props) => props.theme.accentColor};
  position: absolute;
  top: 5%;
  left: 5%;
  &:hover {
    color: ${(props) => props.theme.disabledColor};
    cursor: pointer;
  }
`;
