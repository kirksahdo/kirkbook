import { Buttons, ButtonText, Container, Content, Footer, Header, MainText, PostImage, PostText, SubText, UserData, UserProfilePhoto, Button, LikeIcon, ComentIcon, PostComments, Comment, UsernameComment, CommentArea, CommentProfilePhoto, CommentInput, ShareIcon, SendIcon, DotIcon, LikesLabel, PostProfilePhoto } from "./styles";
import { FaUser } from "react-icons/fa";
import image_test from "./../../assets/asset_test.jpg";
import defaultProfile from "../../assets/user.jpeg";


const Post = (publicacao) => {
  return (
    <Container >
      <Header>
        <UserProfilePhoto>
          <PostProfilePhoto src={defaultProfile} />
        </UserProfilePhoto>
        <UserData>
          <MainText href="#" >Kirk Sahdo</MainText>
          <SubText href="#" >18/03/2023 às 13:24</SubText>
        </UserData>
        <DotIcon />
      </Header>
      <Content>
        <PostText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium velit risus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris aliquet molestie tincidunt. Pellentesque ornare, eros a ultricies molestie, tellus justo cursus turpis, sed hendrerit ex massa vitae lacus. Fusce condimentum eget arcu aliquam suscipit. Nunc dapibus, est sed vehicula varius, sapien massa fermentum ligula, in egestas augue ex sed ante.</PostText>
        <PostImage src={image_test}/>
        <LikesLabel> 100 curtida(s) </LikesLabel>
      </Content>
      <Footer >
        <Buttons>
          <Button>
            <LikeIcon />
            <ButtonText>Curtir</ButtonText>
          </Button>
          <Button>
            <ComentIcon />
            <ButtonText>Comentar</ButtonText>
          </Button>
          <Button>
            <ShareIcon />
            <ButtonText>Comapartilhar</ButtonText>
          </Button>
        </Buttons>
        <PostComments>
          <Comment><UsernameComment href="#">Kirk Sahdo:</UsernameComment> Morbi vehicula magna lacus, non aliquet neque scelerisque quis. Etiam commodo eget lectus vel gravida. Maecenas mauris odio, fermentum volutpat.</Comment>
          <Comment><UsernameComment href="#">Kirk Sahdo:</UsernameComment> Morbi vehicula magna lacus, non aliquet neque scelerisque quis. Etiam commodo eget lectus vel gravida. Maecenas mauris odio, fermentum volutpat.</Comment>
        </PostComments>
        <CommentArea>
          <CommentProfilePhoto src={defaultProfile} />
          <CommentInput type="text" placeholder="Deixe seu comentário"/>
          <Button>
            <SendIcon />
          </Button>
        </CommentArea>
      </Footer>
    </Container>
  );
};

export default Post;
