import React from 'react';
import { Container, ImageProfile, MainText, SubText, UserData } from './styles';

const UserChatCard = ({ usuario, to, onClick }) => {
  return (
    <Container to={to} onClick={onClick}>
      <ImageProfile src={usuario?.urlFotoPerfil || ''} />
      <UserData>
        <MainText>{usuario.nome}</MainText>
      </UserData>
    </Container>
  );
};

export default UserChatCard;
