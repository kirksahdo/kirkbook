import { useEffect, useState } from 'react';
import Post from '../../components/Post';
import PostPopup from '../../components/PostPopup';
import { Button, Container, Posts } from './styles';
import {
  criarPublicacao as cPublicacao,
  getPublicacoes,
} from '../../controllers/PublicacaoController';
import { useToast } from '../../contexts/ToastContext';
import LoadingScreen from '../../components/LoadingScreen';
import Compartilhamento from '../../components/Compartilhamento';

const FeedPage = () => {
  const [criarPubli, setCriarPublic] = useState(false);
  const [publicacoes, setPublicacoes] = useState(null);
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const criarPublicacao = async ({ text, image }) => {
    try {
      setIsLoading(true);
      await cPublicacao(text, image);
      addToast('Publicação criada com sucesso!', '#008000', '#fff');
    } catch (error) {
      addToast('Erro ao criar publicação', '#FF0000', '#fff');
    } finally {
      setCriarPublic(false);
      visualizarFeed();
    }
  };

  const visualizarFeed = () => {
    setIsLoading(true);
    getPublicacoes()
      .then((snapshot) => {
        setPublicacoes(snapshot.sort((a, b) => b.timestamp - a.timestamp));
        setIsLoading(false);
      })
      .catch((error) => {
        addToast('Erro ao carregar publicações', '#FF0000', '#fff');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    visualizarFeed();
  }, []);

  return (
    <Container>
      <PostPopup
        isOpen={criarPubli}
        onClose={() => setCriarPublic(false)}
        onSubmit={criarPublicacao}
      />
      {isLoading && <LoadingScreen />}
      <Posts>
        <Button onClick={() => setCriarPublic(true)}>
          Criar nova publicação
        </Button>
        {publicacoes &&
          publicacoes.map((publi, i) => (
            publi.compartilhamento ? (<Compartilhamento publicacao={publi} key={i} />) : <Post onClosePopup={() => {
              setPublicacoes(null);
              visualizarFeed();
            }} publicacao={publi} key={i} />
          ))}
      </Posts>
    </Container>
  );
};

export default FeedPage;
