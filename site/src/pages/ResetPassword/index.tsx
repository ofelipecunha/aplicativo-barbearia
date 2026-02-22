import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background, AnimationContainer } from './styles';

const ResetPassword: React.FC = () => (
  <Container>
    <Content>
      <AnimationContainer>
        <img src={logoImg} alt="Barbearia" />

        <h1>Resetar senha</h1>
        <p style={{ color: '#999591', marginTop: 16, maxWidth: 340 }}>
          A recuperação de senha não está disponível nesta versão. Entre em contato com o administrador.
        </p>

        <Link to="/">
          <FiLogIn />
          Voltar ao login
        </Link>
      </AnimationContainer>
    </Content>
    <Background />
  </Container>
);

export default ResetPassword;
