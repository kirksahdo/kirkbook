import { TitleForm, EnterButton, Container, ArrowBack} from "./styles";
import InputLogin from "../InputLogin";
import { useState } from "react";
import Usuario from "../../models/Usuario";
import { realizarCadastro as rCadastro } from "../../controllers/UserController";

const RegisterForm = ({onBack, onClickForgetPassword}) => {

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [senha, setSenha] = useState("");
  const [cSenha, setCSenha] = useState("");
  const [sexo, setSexo] = useState("");

  const realizarCadastro = async() => {
    const usuario = new Usuario(email, nome, dataNasc, cidade, estado, sexo);
    console.log(usuario);
    try{
      const user = await rCadastro(usuario, senha);
      console.log("Usuário cadastrado com sucesso!" + user);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <ArrowBack size={40} onClick={onBack}/>
      <TitleForm> Cadastro </TitleForm>
      <InputLogin type="Nome" value={nome} onChangeText={({target}) => setNome(target.value)}/>
      <InputLogin type="E-mail" value={email} onChangeText={({target}) => setEmail(target.value)}/>
      <InputLogin type="Data de nascimento" value={dataNasc} onChangeText={({target}) => setDataNasc(target.value)}/>
      <InputLogin type="Sexo" value={sexo} onChangeText={({target}) => setSexo(target.value)}/>
      <InputLogin type="Cidade" value={cidade}onChangeText={({target}) => setCidade(target.value)}/>
      <InputLogin type="Estado" value={estado}onChangeText={({target}) => setEstado(target.value)}/>
      <InputLogin type="Senha" value={senha} onChangeText={({target}) => setSenha(target.value)}/>
      <InputLogin type="Confirme sua senha" value={cSenha} onChangeText={({target}) => setCSenha(target.value)} />
      <EnterButton onClick={realizarCadastro}>Cadastrar</EnterButton>
    </Container>
  );  
}

export default RegisterForm;