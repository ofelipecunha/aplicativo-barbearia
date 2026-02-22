import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import { useToast } from '../../hooks/toast';

import { Container, Content, Background, AnimationContainer } from './styles';

const ForgotPassword: React.FC = () => {
  const { addToast } = useToast();

  const handleInfo = () => {
    addToast({
      type: 'info',
      title: 'Recuperação de senha',
      description: 'Entre em contato com o administrador para redefinir sua senha.',
    });
  };

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Barbearia" />

          <h1>Recuperar senha</h1>
          <p style={{ color: '#999591', marginTop: 16, maxWidth: 340 }}>
            Para redefinir sua senha, entre em contato com o administrador do sistema.
          </p>
          <button
            type="button"
            onClick={handleInfo}
            style={{
              marginTop: 24,
              background: '#ff9000',
              border: 0,
              borderRadius: 10,
              padding: '16px 24px',
              color: '#312e38',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Mais informações
          </button>

          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
