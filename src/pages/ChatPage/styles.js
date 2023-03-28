import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const LeftContainer = styled.div`
  flex: 1;
  background-color: ${(props) => props.theme.secondaryBackgroundColor};
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.secondaryBackgroundColor};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
`;

export const RightContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundColor};
`;

export const Header = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  color: white;
  padding: 20px;
  padding-top: 120px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const LeftHeader = styled.div`
  padding: 20px;
  padding-top: 120px;
  color: ${(props) => props.theme.textColor};
  border-bottom: 1px solid ${(props) => props.theme.textColor};
`;

export const MessageTime = styled.span`
  font-size: 12px;
  color: #aaa;
`;

export const NoChat = styled.div`
  padding-top: 120px;
  font-size: 2rem;
  color: ${(props) => props.theme.textColor};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
