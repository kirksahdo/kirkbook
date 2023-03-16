import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 300px;
  background-color: ${props => props.theme.primaryColor};
`;

export const LogoContainer = styled.div`
  width: 50%;
`

export const MenuContainer = styled.div`
  width: 50%;
  height: 100%;
  
  ul {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    * {
      color: #fff;
      text-decoration: none;
      height: 100%;
      display: flex;
      align-items: center;
    }
    li {
      padding: 0 20px;
    }
    li:hover {
      background-color: ${props => props.theme.secondaryColor};
      cursor: pointer;
    }
  }
`;
export const CustomLink = styled(Link)`

`;