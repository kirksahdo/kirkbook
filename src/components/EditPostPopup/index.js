import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Content, CloseButton, Input, ImageInput, ImagePreview, Button, Header, HeaderTitle } from './styles';
import { useToast } from '../../contexts/ToastContext';
import { getPublicacao } from '../../controllers/PublicacaoController';
import LoadingScreen from '../LoadingScreen';

const EditPostPopup = ({ id, isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [publicacao, setPublicacao] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageRef = useRef(null);
  const {addToast} = useToast();
  const contentRef = useRef(null);

  useEffect(() => {
    setText('');
    setImage(null);
    setPreview('');
    lerPublicacao();
  }, []);

  useEffect(() => {
    if (publicacao) {
      setText(publicacao.conteudo);
      setPreview(publicacao.midiaUrl || "");
    }
  }, [publicacao]);

  const handleClick = (event) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if( !file.type.includes("image") ) {
      imageRef.current.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setImage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(text.trim() === "") {
      return addToast("Você deve preencher o campo de texto!", "#FF0000", "#fff");
      
    }
    onSubmit({ text, image });
  };

  const lerPublicacao = () => {
    setIsLoading(true);
    getPublicacao(id)
    .then(publicacao => {
      setPublicacao(publicacao);
    })
    .catch(error => {
      onClose();
    })
    .finally(_ => setIsLoading(false));
  }

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isOpen && (
        <Overlay onClick={handleClick}>
          <Content ref={contentRef}>
            <Header>
              <HeaderTitle>Editar Publicação</HeaderTitle>
              <CloseButton size={30} onClick={onClose} />
            </Header>
            <form onSubmit={handleSubmit}>
              <Input type="text" placeholder="Digite o texto da publicação" value={text} onChange={handleTextChange} />
              <ImageInput ref={imageRef} type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <ImagePreview src={preview} />}
              <Button type="submit">Salvar</Button>
            </form>
          </Content>
        </Overlay>
      )}
    </>
  );
};

EditPostPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditPostPopup;
