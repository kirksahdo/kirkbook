import { getDatabase, off } from 'firebase/database';
import moment from 'moment';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { auth, database } from '../../config/firebase';
import {
  lerMensagens,
  lerNovasMensagens,
} from '../../controllers/ConversaController';
import {
  MessageAvatar,
  MessageBubble,
  MessageButton,
  MessageContainer,
  MessageForm,
  MessageInput,
  MessageList,
  MessageName,
  MessageSenderContainer,
  MessageText,
  MessageTime,
} from './styles';

const Conversa = ({
  id,
  remetente,
  destinatario,
  handleFormSubmit,
  handleInputChange,
  mensagem,
  setIsLoading,
}) => {
  const [messages, setMessages] = useState([]);
  const listenerRef = useRef(null);
  const messageListRef = useRef(null);

  useEffect(() => {
    getMensagens();
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const getMensagens = () => {
    lerMensagens(id)
      .then((mensagens) => {
        setMessages(mensagens);
        getNovasMensagens();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getNovasMensagens = () => {
    if (!listenerRef.current) {
      const listener = lerNovasMensagens(id, (mensagem) => {
        setMessages((messages) => [...messages, mensagem]);
      });
      listenerRef.current = listener;
    }
  };

  const getProfileImage = (id) => {
    if (remetente.id === id) {
      return remetente.urlFotoPerfil;
    }
    return destinatario.urlFotoPerfil;
  };

  return (
    <>
      <MessageList ref={messageListRef}>
        {messages &&
          messages.map((message, index) =>
            message.autor !== auth.currentUser.uid ? (
              <MessageContainer key={index}>
                <MessageAvatar src={getProfileImage(message.autor)} />
                <MessageBubble>
                  <MessageText>{message.mensagem}</MessageText>
                  <MessageTime>
                    {moment(message.timestamp).format('DD/MM/YYYY HH:mm')}
                  </MessageTime>
                </MessageBubble>
              </MessageContainer>
            ) : (
              <MessageSenderContainer key={index}>
                <MessageAvatar src={getProfileImage(message.autor)} />
                <MessageBubble>
                  <MessageText>{message.mensagem}</MessageText>
                  <MessageTime>
                    {moment(message.timestamp).format('DD/MM/YYYY HH:mm')}
                  </MessageTime>
                </MessageBubble>
              </MessageSenderContainer>
            )
          )}
      </MessageList>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageInput
          type="text"
          placeholder="Escreva sua mensagem.."
          value={mensagem}
          onChange={handleInputChange}
        />
        <MessageButton type="submit">Enviar</MessageButton>
      </MessageForm>
    </>
  );
};

export default Conversa;
