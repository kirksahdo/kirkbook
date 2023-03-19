import Post from "../../components/Post";
import { Container, Posts } from "./styles";

const FeedPage = () => {
  return (
    <Container>
      <Posts>
        <Post />
        <Post />
      </Posts>
    </Container>
  );
};

export default FeedPage;
