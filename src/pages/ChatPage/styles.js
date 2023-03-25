import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const LeftContainer = styled.div`
  flex: 1;
  background-color: ${props => props.theme.secondaryBackgroundColor};
  overflow-y: auto;

`;

export const RightContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};
  
`;

export const Header = styled.div`
  background-color: ${props => props.theme.secondaryColor};
  color: white;
  padding: 20px;
  padding-top: 120px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const LeftHeader = styled.div`
  background-color: ${props => props.theme.accentColor};
  padding: 20px;
  padding-top: 120px;
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
`;

export const MessageInput = styled.input`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const MessageButton = styled.button`
  background-color: #3f51b5;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
`;

export const MessageForm = styled.form`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2;
`;

export const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const MessageAvatar = styled.div`
  background-color: #ccc;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const MessageBubble = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  max-width: 50%;
`;

export const MessageText = styled.p`
  margin: 0;
  font-size: 16px;
`;

export const MessageTime = styled.span`
  font-size: 12px;
  color: #aaa;
`;

