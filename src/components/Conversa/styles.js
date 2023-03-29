import styled from 'styled-components';

export const MessageList = styled.div`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  height: 100%;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.backgroundColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export const MessageInput = styled.input`
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
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

export const MessageSenderContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  word-wrap: break-word;
  display: flex;
  justify-content: end;
`;

export const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  max-width: 1000px;
  word-wrap: break-word;
`;

export const MessageAvatar = styled.img`
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
  word-wrap: break-word;
`;

export const MessageText = styled.p`
  margin: 0;
  font-size: 16px;
`;

export const MessageTime = styled.span`
  font-size: 12px;
  color: #aaa;
`;
