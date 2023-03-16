import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  flex-direction: row;
`;

export const Banner = styled.div`
  width: calc(100% - 700px);
  height: 100%;
`

export const EmailInput = styled.input`
  width: 100%;
  font-size: 10pt;
  color: #fff;
`;

export const FormContainer = styled.div`
  width: 700px;
  height: 100%;
  background-color: ${props => props.theme.primaryColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;