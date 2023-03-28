import { TitleForm, EnterButton, Container, ArrowBack } from './styles';
import InputLogin from '../InputLogin';
import { useState } from 'react';
import Usuario from '../../models/Usuario';
import { realizarCadastro as rCadastro } from '../../controllers/UserController';
import { useToast } from '../../contexts/ToastContext';
import LoadingScreen from '../LoadingScreen';

const RegisterForm = ({ onBack, onClickForgetPassword }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useState('');
  const [cSenha, setCSenha] = useState('');
  const [sexo, setSexo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();

  const realizarCadastro = async () => {
    if (!validarFormulario()) {
      return addToast(
        'Erro, verifique se os campos estão certos!',
        '#FF0000',
        '#fff'
      );
    }
    const usuario = new Usuario(email, nome, dataNasc, cidade, estado, sexo);
    usuario.urlFotoPerfil =
      'https://cdn-icons-png.flaticon.com/512/2354/2354573.png';
    setIsLoading(true);
    try {
      await rCadastro(usuario, senha);
      addToast('Você se cadastrou com sucesso!', '#008800', '#fff');
      limparCampos();
    } catch (error) {
      addToast('Erro! ' + error, '#FF0000', '#fff');
    } finally {
      setIsLoading(false);
    }
  };

  const validarFormulario = () => {
    if (
      nome === '' ||
      email === '' ||
      dataNasc === '' ||
      cidade === '' ||
      estado === '' ||
      senha === '' ||
      cSenha === ''
    ) {
      return false;
    }
    if (senha !== cSenha) {
      return false;
    }
    const regexDataNascimento =
      /^(0[1-9]|[1-2]\d|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regexDataNascimento.test(dataNasc)) {
      addToast('Data de nascimento inválida!', '#FF0000', '#fff');
      return false;
    }
    return true;
  };

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setDataNasc('');
    setCidade('');
    setEstado('');
    setSenha('');
    setCSenha('');
    setSexo('Masculino');
  };

  return (
    <Container>
      {isLoading && <LoadingScreen />}
      <ArrowBack size={40} onClick={onBack} />
      <TitleForm> Cadastro </TitleForm>
      <InputLogin
        type="Nome"
        value={nome}
        onChangeText={({ target }) => setNome(target.value)}
      />
      <InputLogin
        type="E-mail"
        value={email}
        onChangeText={({ target }) => setEmail(target.value)}
      />
      <InputLogin
        type="Data de nascimento"
        mask="99/99/9999"
        value={dataNasc}
        onChangeText={({ target }) => setDataNasc(target.value)}
      />
      <InputLogin
        type="Sexo"
        value={sexo}
        onChangeText={({ target }) => setSexo(target.value)}
      />
      <InputLogin
        type="Cidade"
        value={cidade}
        onChangeText={({ target }) => setCidade(target.value)}
      />
      <InputLogin
        type="Estado"
        value={estado}
        onChangeText={({ target }) => setEstado(target.value)}
      />
      <InputLogin
        type="Senha"
        value={senha}
        onChangeText={({ target }) => setSenha(target.value)}
      />
      <InputLogin
        type="Confirme sua senha"
        value={cSenha}
        onChangeText={({ target }) => setCSenha(target.value)}
      />
      <EnterButton onClick={realizarCadastro}>Cadastrar</EnterButton>
    </Container>
  );
};

export default RegisterForm;
