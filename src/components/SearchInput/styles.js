import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;
  margin-bottom: 40px;
  svg {
    color: ${(props) => props.theme.textColor};
  }
`;

export const SearchIcon = styled(FaSearch)`
  color: ${(props) => props.theme.textColor};
`;

export const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
  outline: none;
  &:focus {
    outline: none;
  }
  border: none;
`;
