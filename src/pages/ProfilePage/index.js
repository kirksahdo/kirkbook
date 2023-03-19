import { useParams } from "react-router-dom";
import { Button, ButtonAdd, ButtonText, Container, MainText, SubText, User, UserBio, UserBioFriends, UserData, UserFriendPhoto, UserFriendsNumber, UserImageCape, UserImageProfile, UserName, UserProfile, UserPubInfo, UserPubs, UserSpecs } from "./styles";
import defaultCape from "../../assets/asset_test.jpg";
import defaultProfile from "../../assets/user.jpeg";
import Post from "../../components/Post";

const ProfilePage = () => {

  const { id } = useParams();

  return(
    <Container>
      <UserProfile>
        <User>
          <UserImageCape src={defaultCape}/>
          <UserSpecs>
            <UserImageProfile src={defaultProfile}/>
            <UserData>
              <UserName>Kirk Sahdo</UserName>
              <UserFriendsNumber>18 amigos</UserFriendsNumber>
            </UserData>
            <Button>
              <ButtonAdd size={25}/>
              <ButtonText>Adicionar</ButtonText>
            </Button>
          </UserSpecs>
        </User>
        <UserPubInfo>
          <UserBioFriends>
            <UserBio>
              <MainText>Biografia</MainText>
              <SubText>Vivamus metus dolor, bibendum at convallis a, placerat at ipsum. In hac habitasse platea dictumst. Donec pulvinar at nulla at molestie. Proin consectetur vitae eros nec eleifend. Sed blandit quis tellus sit amet volutpat. Maecenas volutpat convallis tincidunt. Etiam vestibulum pretium urna, dictum porta lorem pellentesque sit amet. Proin non sem varius libero dapibus tincidunt.</SubText>
            </UserBio>
            <UserBio>
              <MainText>Amigos</MainText>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
              <a href="/" ><UserFriendPhoto src={defaultProfile} /></a>
            </UserBio>
          </UserBioFriends>
          <UserPubs>
            <Post />
            <Post />
            <Post />
          </UserPubs>
        </UserPubInfo>
      </UserProfile>
    </Container>
  );
};

export default ProfilePage;
