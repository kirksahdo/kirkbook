import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Overlay,
  Content,
  CloseButton,
  Input,
  Button,
  Header,
  HeaderTitle,
} from './styles';
import { useToast } from '../../contexts/ToastContext';

const CompartilhamentoPopup = ({ isOpen, onClose, onSubmit }) => {
  const [text, setText] = useState('');

  const { addToast } = useToast();
  const contentRef = useRef(null);

  useEffect(() => {
    setText('');
  }, []);

  const handleClick = (event) => {
    if (contentRef.current && !contentRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (text.trim() === '') {
      return addToast(
        'Você deve preencher o campo de texto!',
        '#FF0000',
        '#fff'
      );
    }
    onSubmit({ text });
  };

  return (
    <>
      {isOpen && (
        <Overlay onClick={handleClick}>
          <Content ref={contentRef}>
            <Header>
              <HeaderTitle>Compartilhar Publicação</HeaderTitle>
              <CloseButton size={30} onClick={onClose} />
            </Header>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Digite o texto do compartilhamento"
                value={text}
                onChange={handleTextChange}
              />
              <Button type="submit">Compartilhar</Button>
            </form>
          </Content>
        </Overlay>
      )}
    </>
  );
};

CompartilhamentoPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default CompartilhamentoPopup;
