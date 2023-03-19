import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 300px;
  background-color: ${props => props.theme.primaryColor};
  box-shadow: 0px 1px 10px rgb(0, 0, 0, 0.5);
  z-index: 100;
  position: relative;
`;

export const LogoContainer = styled.div`
  width: 50%;
  height: 100%;
`

export const MenuContainer = styled.div`
  width: 50%;
  height: calc(100%);
  
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
      height: 100%;
    }
    li:hover {
      background-color: ${props => props.theme.secondaryColor};
      cursor: pointer;
    }
  }
`;