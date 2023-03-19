import styled from 'styled-components';
import { IoMdPersonAdd } from "react-icons/io";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.backgroundColor};
  padding-top: 120px;
  padding-bottom: 50px;
`;

export const UserProfile = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};;
`;

export const User = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.secondaryBackgroundColor};
  border-radius: 20px;
  box-shadow: 0px 1px 10px rgb(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

export const UserImageCape = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 20px 20px 0 0;
`;

export const UserSpecs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-inline: 20px;
  gap: 30px;
  padding-bottom: 10px;
`;

export const UserImageProfile = styled.img`
  margin-top: -60px;
  width: 168px;
  height: 168px;
  border-radius: 84px;
`;

export const UserData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const UserName = styled.h1`
  font-size: 1.8rem;
  text-transform: capitalize;
  color: ${props => props.theme.textColor};
  font-weight: bold;
`;

export const UserFriendsNumber = styled.h2`
  font-size: 1.4rem;
  color: ${props => props.theme.textColor};
`;

export const ButtonAdd = styled(IoMdPersonAdd)`
  color: #fff;
`;

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primaryColor};
  border: none;
  gap: 10px;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }
  &:focus {
    outline: none;
  }
`;

export const ButtonText = styled.h4`
  font-size: 1.1em;
  color: #fff;
`;

export const UserPubInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const UserBioFriends = styled.div`
  width: 35%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const UserPubs = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

export const UserBio = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${props => props.theme.secondaryBackgroundColor};
  padding: 16px;
  border-radius: 20px;
  box-shadow: 0px 1px 10px rgb(0, 0, 0, 0.5);
  gap: 9px;
`;

export const MainText = styled.h1`
  font-size: 1.2em;
  width: 100%;
  color: ${props => props.theme.textColor};
  font-weight: bold;
  margin-bottom: 10px;
`;

export const SubText = styled.p`
  font-size: 0.8em;
  width: 100%;
  color: ${props => props.theme.textColor};
`;

export const UserFriendPhoto = styled.img`
  width: 50px;
  height: 50px;
  &:hover {
    cursor: pointer;
  }
`;  