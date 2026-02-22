import React, { useCallback, useRef } from 'react';
import { FiUser, FiLock, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AvatarInput } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  nome: string;
  senha_atual: string;
  nova_senha: string;
  nova_senha_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          nome: Yup.string().required('Nome obrigatório'),
          senha_atual: Yup.string(),
          nova_senha: Yup.string().when('senha_atual', {
            is: (val: string) => !!val?.length,
            then: (s) => s.min(4, 'Mínimo 4 caracteres').required('Nova senha obrigatória'),
            otherwise: (s) => s,
          }),
          nova_senha_confirmation: Yup.string()
            .when('senha_atual', {
              is: (val: string) => !!val?.length,
              then: (s) => s.required('Confirme a nova senha'),
              otherwise: (s) => s,
            })
            .oneOf([Yup.ref('nova_senha')], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const { nome, senha_atual, nova_senha } = data;

        if (nome?.trim()) {
          await api.patch(`/usuarios/${user?.id}`, { nome: nome.trim() });
          updateUser({ ...user!, nome: nome.trim() });
        }

        if (senha_atual?.length && nova_senha?.length) {
          await api.post(`/usuarios/${user?.id}/senha`, {
            senha_atual,
            nova_senha,
          });
        }

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
        });
      } catch (err: unknown) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        const msg = err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
          : null;
        addToast({
          type: 'error',
          title: 'Erro ao atualizar perfil',
          description: msg || 'Ocorreu um erro ao atualizar seu cadastro. Tente novamente.',
        });
      }
    },
    [addToast, history, updateUser, user?.id],
  );

  const avatarUrl = user?.avatar
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.nome || 'U')}&background=ff9000&color=312e38`;

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            nome: user?.nome || '',
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={avatarUrl} alt={user?.nome || ''} />
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="nome" icon={FiUser} placeholder="Nome" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="senha_atual"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />
          <Input
            name="nova_senha"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />
          <Input
            name="nova_senha_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar nova senha"
          />

          <Button type="submit">Salvar alterações</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
