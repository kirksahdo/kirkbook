import { Buttons, ButtonText, Container, Content, Footer, Header, MainText, PostImage, PostText, SubText, UserData, UserProfilePhoto, Button, LikeIcon, ComentIcon, PostComments, Comment, UsernameComment, CommentArea, CommentProfilePhoto, CommentInput, ShareIcon, SendIcon, DotIcon, LikesLabel, PostProfilePhoto } from "./styles";
import defaultProfile from "../../assets/user.jpeg";
import { useEffect, useState } from "react";
import { getUsuario } from "../../controllers/UserController";
import moment from "moment/moment";
import { addComentario, addCurtida, removerCurtida } from "../../controllers/PublicacaoController";
import { auth } from "../../config/firebase";
import { useToast } from "../../contexts/ToastContext";
import LoadingScreen from "../LoadingScreen";

const Post = ({publicacao}) => {
  
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ usuario, setUsuario ] = useState(null);
  const { addToast } = useToast();
  const [ userLogged, setUserLogged ] = useState(null);
  const [ publi, setPubli ] = useState(publicacao);
  const [comentario, setComentario] = useState("");
  

  useEffect(() => {
    const userId = publi.userId;
    getUsuario(userId).then(user => {
      getUsuario(auth.currentUser.uid).then(userLogged => {
        setUsuario(user);
        setIsLoaded(true);
        setUserLogged(userLogged)
      }).catch(error => {
        console.error(error);
      })
    }).catch(error => {
      console.error(error);
    })
  }, []);

  if(!isLoaded) {
    return;
  }

  const curtirPublicacao = () => {
    const userLoggedId = auth.currentUser.uid;
    setIsLoading(true);
    if(!publi.curtidas.includes(userLoggedId)){
      addCurtida(publicacao.id, userLoggedId)
        .then(response => {
          setPubli(response)
          addToast("Publicação Curtida com sucesso!", "#008000", "#fff");
        })
        .catch(error => {
          addToast(error, "#FF0000", "#fff");
        })
        .finally(_ => setIsLoading(false))
    } else {
      removerCurtida(publicacao.id, userLoggedId)
        .then(response => {
          setPubli(response)
          addToast("Publicação descurtida com sucesso!", "#008000", "#fff");
        })
        .catch(error => {
          addToast(error, "#FF0000", "#fff");
        })
        .finally(_ => setIsLoading(false))
    }
  }

  const comentarPublicacao = () => {
    if(comentario.trim() === "") return;
    setIsLoading(true);
    addComentario(publi.id, auth.currentUser.uid, comentario)
      .then(post => {
        console.log(post)
        setPubli(post);
      })
      .catch(error => addToast(error.message, "#FF0000", "#fff"))
      .finally(_ => setIsLoading(false))
  }

  return (
    <Container>
      {isLoading && <LoadingScreen />}
      <Header>
        <UserProfilePhoto>
          <PostProfilePhoto src={usuario.urlFotoPerfil ?? defaultProfile} />
        </UserProfilePhoto>
        <UserData>
          <MainText href={`user/${usuario.id}`}>{usuario.nome}</MainText>
          <SubText href="#"> {moment(publi.timestamp).format("DD/MM/YYYY [às] HH:mm")}</SubText>
        </UserData>
        <DotIcon />
      </Header>
      <Content>
        <PostText>{publi.conteudo}</PostText>
        {publi.midiaUrl && <PostImage src={publi.midiaUrl}/>}
        <LikesLabel>{`${publi.curtidas.length} curtida${publi.curtidas.length > 1 ? "s" : ""}`}</LikesLabel>
      </Content>
      <Footer >
        <Buttons>
          <Button onClick={curtirPublicacao} >
            <LikeIcon />
            <ButtonText>
              {publi.curtidas.includes(auth.currentUser.uid) ? "Curtido" : "Curtir"}
            </ButtonText>
          </Button>
          <Button>
            <ComentIcon />
            <ButtonText>Comentar</ButtonText>
          </Button>
          <Button>
            <ShareIcon />
            <ButtonText>Compartilhar</ButtonText>
          </Button>
        </Buttons>
        <PostComments>
          {publi.comentarios && publi.comentarios.map(v => (
            <Comment key={v.timestamp}><UsernameComment href="#">{v.usuario.nome}:</UsernameComment> {v.conteudo}</Comment>
          ))}
        </PostComments>
        <CommentArea>
          <CommentProfilePhoto src={userLogged.urlFotoPerfil} />
          <CommentInput 
            value={comentario} 
            type="text" 
            placeholder="Deixe seu comentário"
            onChange={({target}) => setComentario(target.value)}/>
          <Button onClick={() => comentarPublicacao()}>
            <SendIcon />
          </Button>
        </CommentArea>
      </Footer>
    </Container>
  );
};

export default Post;
