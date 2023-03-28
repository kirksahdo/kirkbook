import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  Content,
  CloseButton,
  ImageInput,
  ImagePreview,
  Button,
  Header,
  HeaderTitle,
} from './styles';
import { useToast } from '../../contexts/ToastContext';
import InputData from '../InputData';
import { editarPerfil, getUsuario } from '../../controllers/UserController';
import LoadingScreen from '../LoadingScreen';

const EditarPerfil = ({ id, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageCape, setImageCape] = useState(null);
  const [preview, setPreview] = useState('');
  const [capePreview, setCapePreview] = useState('');

  const imageRef = useRef(null);
  const capeRef = useRef(null);

  const { addToast } = useToast();
  const contentRef = useRef(null);

  const [nome, setNome] = useState('');
  //const [email, setEmail] = useState("");
  const [dataNasc, setDataNasc] = useState('');
  const [biografia, setBiografia] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [senha, setSenha] = useState('');
  const [sexo, setSexo] = useState('');

  useEffect(() => {
    limparCampos();
    lerUsuario();
  }, []);

  const lerUsuario = async () => {
    try {
      setIsLoading(true);
      const usuario = await getUsuario(id);
      setNome(usuario.nome);
      setDataNasc(usuario.dataDeNascimento);
      setCidade(usuario.cidade);
      setEstado(usuario.estado);
      setSenha('');
      setSexo(usuario.sexo || '');
      setBiografia(usuario.biografia || '');
      setPreview(usuario.urlFotoPerfil);
      setCapePreview(usuario.urlFotoCapa);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      onClose();
    }
  };

  const limparCampos = () => {
    setNome('');
    setDataNasc('');
    setCidade('');
    setEstado('');
    setSenha('');
    setSexo('');
    setImage(null);
    setPreview('');
    setImageCape(null);
    setCapePreview('');
    setSexo('');
    setBiografia('');
  };

  const handleClick = (event) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.includes('image')) {
      imageRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleImageCapeChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (!file.type.includes('image')) {
      capeRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCapePreview(event.target.result);
      setImageCape(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      nome.trim() === '' ||
      sexo.trim() === '' ||
      dataNasc.trim() === '' ||
      cidade.trim() === '' ||
      estado.trim() === ''
    ) {
      return addToast(
        'Você preencher deve preencher todos os campos, menos as imagens e a senha!',
        '#FF0000',
        '#fff'
      );
    }
    try {
      setIsLoading(true);
      await editarPerfil(id, {
        nome,
        dataDeNascimento: dataNasc,
        biografia,
        sexo,
        cidade,
        estado,
        senha,
        fotoPerfil: image,
        fotoCapa: imageCape,
      });
      addToast('Dados atualizados com sucesso!', '#00FF00', '#fff');
      onClose();
    } catch (error) {
      addToast('Erro ao atualizar dados ' + error.message, '#FF0000', '#fff');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <Overlay onClick={handleClick}>
          {isLoading && <LoadingScreen />}
          <Content ref={contentRef}>
            <Header>
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <CloseButton size={30} onClick={onClose} />
            </Header>
            <form onSubmit={handleSubmit}>
              <InputData
                type="Nome"
                value={nome}
                onChangeText={({ target }) => setNome(target.value)}
              />
              <InputData
                type="Biografia"
                value={biografia}
                onChangeText={({ target }) => setBiografia(target.value)}
              />
              {/* <InputData type="E-mail" value={email} onChangeText={({target}) => setEmail(target.value)}/> */}
              <InputData
                type="Data de nascimento"
                mask="99/99/9999"
                value={dataNasc}
                onChangeText={({ target }) => setDataNasc(target.value)}
              />
              <InputData
                type="Sexo"
                value={sexo}
                onChangeText={({ target }) => setSexo(target.value)}
              />
              <InputData
                type="Cidade"
                value={cidade}
                onChangeText={({ target }) => setCidade(target.value)}
              />
              <InputData
                type="Estado"
                value={estado}
                onChangeText={({ target }) => setEstado(target.value)}
              />
              <InputData
                type="Senha"
                value={senha}
                onChangeText={({ target }) => setSenha(target.value)}
              />
              <HeaderTitle>Foto de Perfil</HeaderTitle>
              <ImageInput
                ref={imageRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && <ImagePreview src={preview} />}
              <HeaderTitle>Foto de Capa</HeaderTitle>
              <ImageInput
                ref={capeRef}
                type="file"
                accept="image/*"
                onChange={handleImageCapeChange}
              />
              {capePreview && <ImagePreview src={capePreview} />}
              <Button type="submit">Salvar</Button>
            </form>
          </Content>
        </Overlay>
      )}
    </>
  );
};

EditarPerfil.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditarPerfil;
