import React, { useEffect, useState } from 'react';
import { Container, Banner, FormContainer } from './styles';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import logo from '../../assets/logo.png';


const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <FormContainer>
        {isLogin ? (
          <LoginForm onClickRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onBack={() => setIsLogin(true)} />
        )}
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
