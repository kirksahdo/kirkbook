import React from "react";
import { ButtonAccept, ButtonReject, Buttons, Container, ImageProfile, MainText, SubText, UserData } from "./styles";;

const UserSolicitationCard = ({usuario, to, aceitarSolicitacao, negarSolicitacao}) => {
  return (
    <Container to={to}>
      <ImageProfile src={usuario?.urlFotoPerfil || ""} />
      <UserData>
        <MainText>{usuario.nome}</MainText>
        <SubText>{`${usuario.cidade} - ${usuario.estado}`}</SubText>
        <SubText>{`${usuario.amigos.length} amigos`}</SubText>
      </UserData>
      <Buttons>
        <ButtonAccept onClick={() => aceitarSolicitacao(usuario.id)}>
          <h4>Aceitar</h4>
        </ButtonAccept>
        <ButtonReject onClick={() => negarSolicitacao(usuario.id)}>
          <h4>Negar</h4>
        </ButtonReject>
      </Buttons>
    </Container>
  )
};

export default UserSolicitationCard;
