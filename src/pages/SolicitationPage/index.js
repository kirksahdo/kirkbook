import React, { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen";
import UserSolicitationCard from "../../components/UserSolicitationCard";
import { auth } from "../../config/firebase";
import { useToast } from "../../contexts/ToastContext";
import { getSolicitacoes, aceitarSolicitacao as aSolicitacao, negarSolicitacao as nSolicitacao } from "../../controllers/SolicitacaoController";
import { Container, Content, NoSolicitation } from "./styles";

const SolicitationPage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [solicitacoes, setSolicitacoes] = useState([]);
  const {addToast} = useToast();
  
  useEffect(() => {
    listarSolicitacoes();
  }, []);

  const listarSolicitacoes = () => {
    const userId = auth.currentUser.uid;
    getSolicitacoes(userId)
      .then((solicitacoes) => {
        setSolicitacoes(solicitacoes);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(_ => {
        setIsLoading(false)
      });
  }

  const aceitarSolicitacao = (remetente) => {
    const destinatario = auth.currentUser.uid;
    setIsLoading(true);
    aSolicitacao(remetente, destinatario)
      .then(_ => {
        addToast("Solicitação de amizade aceita com sucesso!", "#008000", "#fff");
        listarSolicitacoes();
      })
      .catch(error => {
        addToast("Erro ao aceitar solicitação de amizade!", "#FF0000", "#fff");
        console.error(error)
      });
  }

  const negarSolicitacao = (remetente) => {
    const destinatario = auth.currentUser.uid;
    setIsLoading(true);
    aSolicitacao(remetente, destinatario)
      .then(_ => {
        addToast("Solicitação de amizade negada com sucesso!", "#008000", "#fff");
        listarSolicitacoes();
      })
      .catch(error => {
        addToast("Erro ao negar solicitação de amizade!", "#FF0000", "#fff");
        console.error(error)
      });
  }

  return (
    <Container>
      {isLoading && <LoadingScreen /> }
      <Content>
        {solicitacoes.length > 0 ? (
          solicitacoes.map((s, i) => (
            <UserSolicitationCard 
              key={i}
              usuario={s.usuario}
              aceitarSolicitacao={aceitarSolicitacao}
              negarSolicitacao={negarSolicitacao}/>
          ))
        ) : (
          <NoSolicitation>Sem solicitações de amizade no momento. =(</NoSolicitation>
        )}
        
      </Content>
    </Container>
  );
};

export default SolicitationPage;
