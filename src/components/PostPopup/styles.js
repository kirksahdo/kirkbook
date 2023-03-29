import styled from 'styled-components';
import { FaWindowClose } from 'react-icons/fa';

export const Overlay = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
  border-radius: 8px;
  padding: 70px;
  max-width: 600px;
  width: 100%;
  z-index: 1000;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 1rem;
  width: 100%;
`;

export const CloseButton = styled(FaWindowClose)`
  color: ${(props) => props.theme.textColor};
  &:hover {
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const ImageInput = styled.input`
  display: block;
  margin-bottom: 16px;
  color: ${(props) => props.theme.textColor};
`;

export const ImagePreview = styled.img`
  display: block;
  max-width: 100%;
  margin-bottom: 16px;
`;

export const Button = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: white;
  padding: 8px;
  border-radius: 4px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.secondaryColor};
  }
`;
