import { useState } from "react";
import {
  Container,
  LeftContainer,
  RightContainer,
  Header,
  Title,
  MessageList,
  MessageInput,
  MessageButton,
  MessageForm,
  MessageContainer,
  MessageAvatar,
  MessageBubble,
  MessageText,
  MessageTime,
  LeftHeader,
} from "./styles";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newMessage.trim() !== "") {
      setMessages([
        ...messages,
        {
          text: newMessage,
          time: new Date(),
          user: {
            name: "John",
            avatarUrl:
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
          },
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <Container>
      <LeftContainer>
        <LeftHeader>
          <Title>Amigos</Title>
        </LeftHeader>
        <ul>
          <li>User 1</li>
          <li>User 2</li>
          <li>User 3</li>
          <li>User 4</li>
        </ul>
      </LeftContainer>
      <RightContainer>
        <Header>
          <Title>Chat with User 1</Title>
        </Header>
        <MessageList>
          {messages.map((message, index) => (
            <MessageContainer key={index}>
              <MessageAvatar
                style={{
                  backgroundImage: `url(${message.user.avatarUrl})`,
                }}
              />
              <MessageBubble>
                <MessageText>{message.text}</MessageText>
                <MessageTime>
                  {message.time.toLocaleTimeString()}
                </MessageTime>
              </MessageBubble>
            </MessageContainer>
          ))}
        </MessageList>
        <MessageForm onSubmit={handleFormSubmit}>
          <MessageInput
            type="text"
            placeholder="Type your message"
            value={newMessage}
            onChange={handleInputChange}
          />
          <MessageButton type="submit">Send</MessageButton>
        </MessageForm>
      </RightContainer>
    </Container>
  );
};

export default ChatPage;
