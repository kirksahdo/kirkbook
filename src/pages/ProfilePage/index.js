import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  ButtonAdd,
  ButtonRemove,
  ButtonText,
  Container,
  MainText,
  SubText,
  User,
  UserBio,
  UserBioFriends,
  UserData,
  UserFriendPhoto,
  UserFriendsNumber,
  UserImageCape,
  UserImageProfile,
  UserName,
  UserProfile,
  UserPubInfo,
  UserPubs,
  UserSpecs,
} from './styles';
import defaultCape from '../../assets/asset_test.jpg';
import defaultProfile from '../../assets/user.jpeg';
import Post from '../../components/Post';
import { getPerfil } from '../../controllers/UserController';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import { auth } from '../../config/firebase';
import { enviarSolicitacao as eSolicitacao } from '../../controllers/SolicitacaoController';
import { AiFillEdit } from 'react-icons/ai';
import EditarPerfil from '../../components/EditarPerfil';

const ProfilePage = () => {
  const { id } = useParams();
  const [perfil, setPerfil] = useState(null);
  const [editarPerfilPopup, setEditarPerfilPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = () => {
    setLoading(true);
    getPerfil(id)
      .then((perfil) => {
        setPerfil(perfil);
        setLoading(false);
      })
      .catch((error) => {
        navigate('/');
      });
  };

  const enviarSolicitacao = (destinatario) => {
    eSolicitacao(auth.currentUser.uid, destinatario)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAddButton = () => {
    const currentUserId = auth.currentUser.uid;
    if (perfil.usuario.id === currentUserId) {
      return (
        <Button onClick={() => setEditarPerfilPopup(true)}>
          <AiFillEdit color="#fff" size={25} />
          <ButtonText>Editar Perfil</ButtonText>
        </Button>
      );
    }
    if (perfil.amigos.map((a) => a.id).includes(currentUserId)) {
      return (
        <Button onClick={() => {}}>
          <ButtonRemove size={25} />
          <ButtonText>Desfazer amizade</ButtonText>
        </Button>
      );
    }
    return (
      <Button onClick={() => enviarSolicitacao(perfil.usuario.id)}>
        <ButtonAdd size={25} />
        <ButtonText>Adicionar</ButtonText>
      </Button>
    );
  };

  return (
    <>
      {loading && <LoadingScreen />}
      {!loading && (
        <Container>
          {editarPerfilPopup && (
            <EditarPerfil
              id={id}
              isOpen={editarPerfilPopup}
              onClose={() => {
                setEditarPerfilPopup(false);
                carregarPerfil();
              }}
            />
          )}
          <UserProfile>
            <User>
              <UserImageCape
                src={
                  perfil.usuario.urlFotoCapa
                    ? perfil.usuario.urlFotoCapa
                    : defaultCape
                }
              />
              <UserSpecs>
                <UserImageProfile
                  src={
                    perfil.usuario.urlFotoPerfil
                      ? perfil.usuario.urlFotoPerfil
                      : defaultProfile
                  }
                />
                <UserData>
                  <UserName>{perfil.usuario.nome}</UserName>
                  <UserFriendsNumber>
                    {' '}
                    {perfil.usuario.cidade} - {perfil.usuario.estado}{' '}
                  </UserFriendsNumber>
                  {perfil.usuario.sexo && (
                    <UserFriendsNumber>
                      {' '}
                      {perfil.usuario.sexo}{' '}
                    </UserFriendsNumber>
                  )}
                </UserData>
                {getAddButton()}
              </UserSpecs>
            </User>
            <UserPubInfo>
              <UserBioFriends>
                <UserBio>
                  <MainText>Biografia</MainText>
                  <SubText>
                    {perfil.usuario.biografia.trim() !== ''
                      ? perfil.usuario.biografia
                      : 'Sem nada no momento.'}
                  </SubText>
                </UserBio>
                <UserBio>
                  <MainText>Amigos - {perfil.amigos.length}</MainText>
                  {perfil.amigos.length > 0 ? (
                    perfil.amigos.map((a, i) => (
                      <a key={i} title={a.nome} href={`/user/${a.id}`}>
                        <UserFriendPhoto
                          src={a.urlFotoPerfil || defaultProfile}
                        />
                      </a>
                    ))
                  ) : (
                    <SubText>{'Sem amigos no momento. =('}</SubText>
                  )}
                </UserBio>
              </UserBioFriends>
              <UserPubs>
                {perfil.publicacoes.map((publi) => (
                  <Post publicacao={publi} key={publi.id} />
                ))}
              </UserPubs>
            </UserPubInfo>
          </UserProfile>
        </Container>
      )}
    </>
  );
};

export default ProfilePage;
