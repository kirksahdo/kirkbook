import { useState } from 'react';
import {
  Container,
  LeftContainer,
  RightContainer,
  Header,
  Title,
  LeftHeader,
  NoChat,
} from './styles';

import UserChatCard from '../../components/UserChatCard';
import { useEffect } from 'react';
import { getAmigos } from '../../controllers/AmigosController';
import { auth } from '../../config/firebase';
import LoadingScreen from '../../components/LoadingScreen';
import {
  addMensagem,
  criarConversa,
  getConversaId,
} from '../../controllers/ConversaController';
import { getUsuario } from '../../controllers/UserController';
import Conversa from '../../components/Conversa';
import Popup from '../../components/Popup';

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const [amigos, setAmigos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [destinatario, setDestinatario] = useState(null);
  const [conversa, setConversa] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    listarAmigos();
  }, []);

  useEffect(() => {
    if (!destinatario) return;
    setConversa('');
    setIsLoading(true);
    getConversa();
  }, [destinatario]);

  const listarAmigos = async () => {
    let currentUser;
    try {
      currentUser = await getUsuario(auth.currentUser.uid);
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      return;
    }
    getAmigos(currentUser.id)
      .then((amigos) => {
        setAmigos(amigos);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally((_) => {
        setIsLoading(false);
      });
  };

  const getConversa = async () => {
    try {
      let conversaId = await getConversaId(
        auth.currentUser.uid,
        destinatario.id
      );
      if (conversaId === '') {
        conversaId = await criarConversa(auth.currentUser.uid, destinatario.id);
      }
      setConversa(conversaId);
    } catch (error) {
      console.error(error);
    }
  };

  const enviarMensagem = async () => {
    try {
      setIsLoading(true);
      await addMensagem(conversa, newMessage, auth.currentUser.uid);
      setNewMessage('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    enviarMensagem();
  };

  return (
    <Container>
      {isLoading && <LoadingScreen />}
      <LeftContainer>
        <LeftHeader>
          <Title>Amigos</Title>
        </LeftHeader>
        <ul>
          {amigos.length > 0 ? (
            amigos.map((a, i) => (
              <li key={i}>
                <UserChatCard
                  usuario={a}
                  onClick={() => {
                    setDestinatario(a);
                  }}
                />
              </li>
            ))
          ) : (
            <li>{'Você não possui amigos =('}</li>
          )}
        </ul>
      </LeftContainer>
      <RightContainer>
        {destinatario ? (
          <>
            <Header>
              <Title>Conversa com {destinatario.nome}</Title>
            </Header>
            {conversa !== '' && (
              <Conversa
                remetente={user}
                destinatario={destinatario}
                id={conversa}
                handleFormSubmit={handleFormSubmit}
                handleInputChange={handleInputChange}
                mensagem={newMessage}
                setIsLoading={() => setIsLoading(false)}
              />
            )}
          </>
        ) : (
          <NoChat>
            <h1>Você deve selecionar uma conversa.</h1>
          </NoChat>
        )}
      </RightContainer>
    </Container>
  );
};

export default ChatPage;
