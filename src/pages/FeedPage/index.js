import { useState } from "react";
import Post from "../../components/Post";
import PostPopup from "../../components/PostPopup";
import { Button, Container, Posts } from "./styles";
import { criarPublicacao as cPublicacao } from "../../controllers/PublicacaoController";
import { useToast } from "../../contexts/ToastContext";
import LoadingScreen from "../../components/LoadingScreen";

const FeedPage = () => {
  const [criarPubli, setCriarPublic] = useState(false);
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const criarPublicacao = async ({text, image}) => {
    try{
      setIsLoading(true);
      await cPublicacao(text, image);
      addToast("Publicação criada com sucesso!", "#008000", "#fff");
    } catch(error) {
      addToast("Erro ao criar publicação", "#FF0000", "#fff");
    } finally {
      setCriarPublic(false);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <PostPopup isOpen={criarPubli} onClose={() => setCriarPublic(false)} onSubmit={criarPublicacao}/>
      {isLoading && <LoadingScreen />}
      <Posts>
        <Button onClick={() => setCriarPublic(true)}>Criar nova publicação</Button>
        <Post />
        <Post />
      </Posts>
    </Container>
  );
};

export default FeedPage;
