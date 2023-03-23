import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonAdd, ButtonText, Container, MainText, SubText, User, UserBio, UserBioFriends, UserData, UserFriendPhoto, UserFriendsNumber, UserImageCape, UserImageProfile, UserName, UserProfile, UserPubInfo, UserPubs, UserSpecs } from "./styles";
import defaultCape from "../../assets/asset_test.jpg";
import defaultProfile from "../../assets/user.jpeg";
import Post from "../../components/Post";
import { getPerfil } from "../../controllers/UserController";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import { auth } from "../../config/firebase";
import { enviarSolicitacao as eSolicitacao } from "../../controllers/SolicitacaoController";

const ProfilePage = () => {

  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPerfil(id).then(perfil => {
      setPerfil(perfil);
      setLoading(false);
    }).catch(error => {
      navigate("/");
    })
  }, [])
  

  const enviarSolicitacao = (destinatario) => {
    eSolicitacao(auth.currentUser.uid, destinatario)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return(
    <>
      {loading && <LoadingScreen />}
      {!loading && <Container>
        <UserProfile>
          <User>
            <UserImageCape src={perfil.usuario.urlFotoCapa ? perfil.usuario.urlFotoCapa : defaultCape}/>
            <UserSpecs>
              <UserImageProfile src={perfil.usuario.urlFotoPerfil ? perfil.usuario.urlFotoPerfil : defaultProfile}/>
              <UserData>
                <UserName>{perfil.usuario.nome}</UserName>
                <UserFriendsNumber>18 amigos</UserFriendsNumber>
                <UserFriendsNumber> {perfil.usuario.cidade} - {perfil.usuario.estado} </UserFriendsNumber>
              </UserData>
              {!(perfil.usuario.id === auth.currentUser.uid) &&
                <Button onClick={() => enviarSolicitacao(perfil.usuario.id)}>
                  <ButtonAdd size={25}/>
                  <ButtonText>Adicionar</ButtonText>
                </Button>
              }
            </UserSpecs>
          </User>
          <UserPubInfo>
            <UserBioFriends>
              <UserBio>
                <MainText>Biografia</MainText>
                <SubText>{perfil.usuario.biografia.trim() !== "" ? perfil.usuario.biografia : "Sem nada no momento."}</SubText>
              </UserBio>
              <UserBio>
                <MainText>Amigos - 7</MainText>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
                <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              </UserBio>
            </UserBioFriends>
            <UserPubs>
              {perfil.publicacoes.map(publi => (
                <Post publicacao={publi} key={publi.id} />
              ))}
            </UserPubs>
          </UserPubInfo>
        </UserProfile>
      </Container>}
    </>
    
  );
};

export default ProfilePage;
