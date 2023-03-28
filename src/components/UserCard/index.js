import React from 'react';
import { Button, ButtonText } from './styles';
import { Container, ImageProfile, MainText, SubText, UserData } from './styles';


const UserCard = ({ usuario, admin, to, onClickEdit}) => {

  return (
    <>
      <Container to={to}>
        <ImageProfile src={usuario?.urlFotoPerfil || ''} />
        <UserData>
          <MainText>{usuario.nome}</MainText>
          <SubText>{`${usuario.cidade} - ${usuario.estado}`}</SubText>
          <SubText>{`${usuario.amigos.length} amigos`}</SubText>
        </UserData>
      </Container>
      {admin && <Button onClick={() => onClickEdit(usuario.id)}>
        <ButtonText>Editar</ButtonText>
      </Button>}
    </>
  );
};

export default UserCard;
