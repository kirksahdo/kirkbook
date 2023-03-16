import { TitleForm, EnterButton, Container, ALink } from "./styles";
import InputLogin from "../../components/InputLogin";
import { useState } from "react";

const LoginForm = ({onClickRegister, onClickForgetPassword}) => {

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <Container>
      <TitleForm> Login </TitleForm>
      <InputLogin type="E-mail" value={login} onChangeText = {({text}) => setLogin(text)}/>
      <InputLogin type="Senha" value={senha} onChangeText = {({text}) => setSenha(text)} password/>
      <ALink>Esqueceu sua senha?</ALink>
      <ALink onClick={onClickRegister}>Cadastre-se aqui!</ALink>
      <EnterButton>Entrar</EnterButton>
    </Container>
  );  
}

export default LoginForm;