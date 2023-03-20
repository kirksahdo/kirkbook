import { TitleForm, EnterButton, Container, ALink } from "./styles";
import { useNavigate } from "react-router-dom";
import InputLogin from "../../components/InputLogin";
import { useState } from "react";
import { fazerLogin as fLogin } from "../../controllers/UserController";
import { useToast } from "../../contexts/ToastContext";

const LoginForm = ({onClickRegister, onClickForgetPassword}) => {

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();
  

  const {addToast, removeToast } = useToast();

  const fazerLogin = async (email, senha) => {
    try{
      await fLogin(email, senha);
      addToast("Login bem sucedido!", "#008000", "#fff");
      navigate("/");
    } catch(error) {
      addToast("Credenciais inválidas!", "#FF0000", "#fff");
    }
  }

  return (
    <Container>
      <TitleForm> Login </TitleForm>
      <InputLogin type="E-mail" value={login} onChangeText = {({target}) => setLogin(target.value)}/>
      <InputLogin type="Senha" value={senha} onChangeText = {({target}) => setSenha(target.value)} password/>
      <ALink>Esqueceu sua senha?</ALink>
      <ALink onClick={onClickRegister}>Cadastre-se aqui!</ALink>
      <EnterButton onClick={() => fazerLogin(login, senha)}>Entrar</EnterButton>
    </Container>
  );  
}

export default LoginForm;