import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Content, CloseButton, Input, ImageInput, ImagePreview, Button, Header, HeaderTitle } from './styles';
import { useToast } from '../../contexts/ToastContext';

const Popup = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const imageRef = useRef(null);
  const {addToast} = useToast();
  const contentRef = useRef(null);

  useEffect(() => {
    setText('');
    setImage(null);
    setPreview('');
  }, []);

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

  return (
    <>
      {isOpen && (
        <Overlay onClick={handleClick}>
          <Content ref={contentRef}>
            <Header>
              <HeaderTitle>Criar Publicação</HeaderTitle>
              <CloseButton size={30} onClick={onClose} />
            </Header>
            <form onSubmit={handleSubmit}>
              <Input type="text" placeholder="Digite o texto da publicação" value={text} onChange={handleTextChange} />
              <ImageInput ref={imageRef} type="file" accept="image/*" onChange={handleImageChange} />
              {preview && <ImagePreview src={preview} />}
              <Button type="submit">Publicar</Button>
            </form>
          </Content>
        </Overlay>
      )}
    </>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Popup;
