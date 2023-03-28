import styled from "styled-components";
import ReactInputMask from "react-input-mask";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 60%;
  border: 2px solid #fff;
  border-radius: 20px;
  margin: 10px 0;

`;

export const Input = styled(ReactInputMask)`
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

export const SelectInput = styled.select`
  border: none;
  width: 100%;
  margin-left: 20px;
  padding: 10px;
  background-color: transparent;
  color: #fff;
  ::placeholder {
    color: #fff;
  }
  &:hover {
    cursor: pointer;
  }
  option {
    background-color: black;
  }
  option:hover {
    cursor: pointer;
  }
`;

export const Icon = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #fff;
`