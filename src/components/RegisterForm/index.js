import { TitleForm, EnterButton, Container, ArrowBack} from "./styles";
import InputLogin from "../InputLogin";
import { useState } from "react";

const RegisterForm = ({onBack, onClickForgetPassword}) => {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");
  const [cSenha, setCSenha] = useState("");

  return (
    <Container>
      <ArrowBack size={40} onClick={onBack}/>
      <TitleForm> Cadastro </TitleForm>
      <InputLogin type="Nome" value={nome} onChangeText={({text}) => setNome(text)}/>
      <InputLogin type="E-mail" onChangeText={({text}) => setEmail(text)}/>
      <InputLogin type="Data de nascimento" onChangeText={({text}) => setDataNasc(text)}/>
      <InputLogin type="Cidade" onChangeText={({text}) => setCidade(text)}/>
      <InputLogin type="Estado" onChangeText={({text}) => setEstado(text)}/>
      <InputLogin type="Senha" onChangeText={({text}) => setSenha(text)}/>
      <InputLogin type="Confirme sua senha" onChangeText={({text}) => setCSenha(text)} />
      <EnterButton>Cadastrar</EnterButton>
    </Container>
  );  
}

export default RegisterForm;