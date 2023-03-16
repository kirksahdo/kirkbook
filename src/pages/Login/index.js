import React, { useState } from "react";
import { Container, Banner, FormContainer } from "./styles";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <Banner />
      <FormContainer>
        {isLogin ? <LoginForm onClickRegister={() => setIsLogin(false)}/> : <RegisterForm onBack={() => setIsLogin(true)}/>}
      </FormContainer>
    </Container>
  );
};

export default Login;