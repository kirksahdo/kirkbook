import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

const ToastContext = createContext();

const ToastContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 9999;
`;

const ToastWrapper = styled.div`
  background-color: ${props => props.bgColor || '#212529'};
  color: ${props => props.color || '#fff'};
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;

const Toast = ({ message, bgColor, color }) => (
  <ToastWrapper bgColor={bgColor} color={color}>
    {message}
  </ToastWrapper>
);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, bgColor, color) => {
    const toast = { message, bgColor, color };
    setToasts(prevToasts => [...prevToasts, toast]);
    setTimeout(() => setToasts(prevToasts => prevToasts.filter((v, _) => v !== toast)), 3000);
  };


  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast, index) => (
          <Toast
            key={`toast-${index}`}
            message={toast.message}
            bgColor={toast.bgColor}
            color={toast.color}
          />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };