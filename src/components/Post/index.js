import {
  Buttons,
  ButtonText,
  Container,
  Content,
  Footer,
  Header,
  MainText,
  PostImage,
  PostText,
  SubText,
  UserData,
  UserProfilePhoto,
  Button,
  LikeIcon,
  ComentIcon,
  PostComments,
  Comment,
  UsernameComment,
  CommentArea,
  CommentProfilePhoto,
  CommentInput,
  ShareIcon,
  SendIcon,
  LikesLabel,
  PostProfilePhoto,
  EditIcon,
  DeleteIcon,
} from './styles';
import defaultProfile from '../../assets/user.jpeg';
import { useEffect, useState } from 'react';
import { getUsuario } from '../../controllers/UserController';
import moment from 'moment/moment';
import {
  addComentario,
  addCurtida,
  removerCurtida,
  editarPublicacao as ePublicacao,
  excluirPublicacao,
} from '../../controllers/PublicacaoController';
import { auth } from '../../config/firebase';
import { useToast } from '../../contexts/ToastContext';
import LoadingScreen from '../LoadingScreen';
import EditPostPopup from '../EditPostPopup';
import Popup from '../Popup';

const Post = ({ publicacao, admin }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  const [publi, setPubli] = useState(publicacao);
  const [comentario, setComentario] = useState('');
  const { addToast } = useToast();
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    const userId = publi.userId;
    getUsuario(userId)
      .then((user) => {
        getUsuario(auth.currentUser.uid)
          .then((userLogged) => {
            setUsuario(user);
            setIsLoaded(true);
            setUserLogged(userLogged);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!isLoaded) {
    return;
  }

  const curtirPublicacao = () => {
    const userLoggedId = auth.currentUser.uid;
    setIsLoading(true);
    if (!publi.curtidas.includes(userLoggedId)) {
      addCurtida(publicacao.id, userLoggedId)
        .then((response) => {
          setPubli(response);
          addToast('Publicação Curtida com sucesso!', '#008000', '#fff');
        })
        .catch((error) => {
          addToast(error, '#FF0000', '#fff');
        })
        .finally((_) => setIsLoading(false));
    } else {
      removerCurtida(publicacao.id, userLoggedId)
        .then((response) => {
          setPubli(response);
          addToast('Publicação descurtida com sucesso!', '#008000', '#fff');
        })
        .catch((error) => {
          addToast(error, '#FF0000', '#fff');
        })
        .finally((_) => setIsLoading(false));
    }
  };

  const editarPublicacao = ({ text, image }) => {
    setIsLoading(true);
    ePublicacao(text, image, publicacao.id)
      .then((response) => {
        setPubli(response);
        addToast('Publicação editada com sucesso!', '#008000', '#fff');
      })
      .catch((error) => {
        console.error(error);
        addToast(error.message, '#FF0000', '#fff');
      })
      .finally((_) => {
        setIsLoading(false);
        setEditPopup(false);
      });
  };

  const deletarPublicacao = () => {
    setIsLoading(true);
    excluirPublicacao(publi.id)
      .then((_) => {
        addToast('Publicação excluida com sucesso!', '#008000', '#fff');
        setDeletePopup(false);
        setPubli(null);
      })
      .catch((_) => {
        addToast('Erro ao excluir publicação!', '#FF0000', '#fff');
      })
      .finally((_) => setIsLoading(false));
  };

  const comentarPublicacao = () => {
    if (comentario.trim() === '') return;
    setIsLoading(true);
    addComentario(publi.id, auth.currentUser.uid, comentario)
      .then((post) => {
        setPubli(post);
      })
      .catch((error) => addToast(error.message, '#FF0000', '#fff'))
      .finally((_) => {
        setComentario('');
        setIsLoading(false);
      });
  };

  if (!publi) {
    return;
  }

  return (
    <Container>
      {isLoading && <LoadingScreen />}
      <EditPostPopup
        id={publicacao.id}
        isOpen={editPopup}
        onClose={() => setEditPopup(false)}
        onSubmit={editarPublicacao}
      />
      <Popup
        question="Você tem certeza que quer deletar esta publicação?"
        isOpen={deletePopup}
        onCancel={() => setDeletePopup(false)}
        onConfirm={deletarPublicacao}
      />
      <Header>
        <UserProfilePhoto>
          <PostProfilePhoto src={usuario.urlFotoPerfil ?? defaultProfile} />
        </UserProfilePhoto>
        <UserData>
          <MainText href={`user/${usuario.id}`}>{usuario.administrador && (<span>[Admin] </span>)}{usuario.nome}</MainText>
          <SubText href="#">
            {' '}
            {moment(publi.timestamp).format('DD/MM/YYYY [às] HH:mm')}
          </SubText>
        </UserData>
        {(auth.currentUser.uid === usuario.id || userLogged.administrador) && (
          <EditIcon size={25} onClick={() => setEditPopup(true)} />
        )}
        {(auth.currentUser.uid === usuario.id || userLogged.administrador) && (
          <DeleteIcon size={25} onClick={() => setDeletePopup(true)} />
        )}
      </Header>
      <Content>
        <PostText>{publi.conteudo}</PostText>
        {publi.midiaUrl && <PostImage src={publi.midiaUrl} />}
        <LikesLabel>{`${publi.curtidas.length} curtida${
          publi.curtidas.length > 1 ? 's' : ''
        }`}</LikesLabel>
      </Content>
      <Footer>
        <Buttons>
          <Button onClick={curtirPublicacao}>
            <LikeIcon />
            <ButtonText>
              {publi.curtidas.includes(auth.currentUser.uid)
                ? 'Curtido'
                : 'Curtir'}
            </ButtonText>
          </Button>
          <Button onClick={() => setShowInput(!showInput)}>
            <ComentIcon />
            <ButtonText>Comentar</ButtonText>
          </Button>
          <Button>
            <ShareIcon />
            <ButtonText>Compartilhar</ButtonText>
          </Button>
        </Buttons>
        <PostComments>
          {publi.comentarios &&
            publi.comentarios.map((v) => (
              <Comment key={v.timestamp}>
                <UsernameComment href="#">{v.usuario.nome}:</UsernameComment>{' '}
                {v.conteudo}
              </Comment>
            ))}
        </PostComments>
        {showInput && (
          <CommentArea>
            <CommentProfilePhoto src={userLogged.urlFotoPerfil} />
            <CommentInput
              value={comentario}
              type="text"
              placeholder="Deixe seu comentário"
              onChange={({ target }) => setComentario(target.value)}
            />
            <Button onClick={() => comentarPublicacao()}>
              <SendIcon />
            </Button>
          </CommentArea>
        )}
      </Footer>
    </Container>
  );
};

export default Post;
