import styled from 'styled-components';
import { FaThumbsUp, FaComment, FaShare, FaEllipsisV } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

export const Container = styled.div`
  width: 100%;
  background-color: ${props => props.theme.secondaryBackgroundColor};
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 1px 10px rgb(0, 0, 0, 0.5);
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.backgroundColor};
  padding-bottom: 10px;
`; 

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  gap: 10px;
  border-bottom: 1px solid ${props => props.theme.backgroundColor};
`;

export const Footer = styled.div`
  width: 100%;
  padding: 10px 0;
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
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
  font-size: 0.9em;
  color: #fff;
`;

export const DotIcon = styled(FaEllipsisV)`
  color: ${props => props.theme.textColor};
  &:hover {
    cursor: pointer;
  }
`;
export const LikeIcon = styled(FaThumbsUp)`
  color: #fff;
`;


export const ComentIcon = styled(FaComment)`
  color: #fff;
`;

export const ShareIcon = styled(FaShare)`
  color: #fff;
`;


export const SendIcon = styled(IoMdSend)`
  color: #fff;
`;

export const UserProfilePhoto = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const UserData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px
`;

export const MainText = styled.a`
  font-size: 1.2em;
  color: ${props => props.theme.textColor};
  font-weight: bold;
  &:hover {
    color: ${props => props.theme.textColor};
  }
`;

export const SubText = styled.a`
  font-size: 0.8em;
  color: ${props => props.theme.textColor};
  &:hover {
    color: ${props => props.theme.textColor};
  }
`;

export const PostText = styled.p`
  font-size: 0.89em;
  color: ${props => props.theme.textColor};
`;

export const PostImage = styled.img`

`;

export const PostComments = styled.div`
  width: 100%;
  padding: 10px 0 0 0;
`;

export const Comment = styled.p`
  font-size: 0.89em;
  color: ${props => props.theme.textColor};
  margin: 4px 0;
`;

export const UsernameComment = styled.a`
  font-weight: bold;
  color: ${props => props.theme.textColor};
  &:hover {
    color: ${props => props.theme.secondaryColor};
  }
`;

export const CommentArea = styled.div`
  padding: 15px 0 0 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const CommentInput = styled.input`
  width: 100%;
  font-size: 0.89em;
  padding: 5px;
  color: ${props => props.theme.textColor};
  border: none;
  background: transparent;
  ::placeholder {
    color: ${props => props.theme.textColor};
  }
`;

export const CommentProfilePhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;


export const PostProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;


export const LikesLabel = styled.h2`
  color: ${props => props.theme.textColor};
  font-weight: bold;
  font-size: 0.89em;
  &:hover {
    cursor: pointer;
  }
`;