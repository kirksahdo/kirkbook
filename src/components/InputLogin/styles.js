import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  border: 2px solid #fff;
  border-radius: 20px;
  margin: 10px 0;

`;

export const Input = styled.input`
  border: none;
  width: 100%;
  margin-left: 20px;
  padding: 10px;
  background-color: transparent;
  color: #fff;
  ::placeholder {
    color: #fff;
  }
`;

export const Icon = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #fff;
`