import React from "react";
import { Container, ImageProfile, MainText, SubText, UserData } from "./styles";;

const UserCard = ({usuario, to}) => {
  return (
    <Container to={to}>
      <ImageProfile src={usuario?.urlFotoPerfil || ""} />
      <UserData>
        <MainText>{usuario.nome}</MainText>
        <SubText>{`${usuario.cidade} - ${usuario.estado}`}</SubText>
        <SubText>{`${usuario.amigos.length} amigos`}</SubText>
      </UserData>
    </Container>
  )
};

export default UserCard;
