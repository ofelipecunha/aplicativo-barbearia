-- =============================================================================
-- SEED PARA DEMONSTRAÇÃO DO APP — Usuários por perfil + dados para as telas
-- Execute no banco (ex.: psql -U postgres -d barbearia -f migrations/seed_demo_usuarios_e_dados.sql)
-- Login/senha para acessar: dono/1234 | recepcao/1234 | cabeleireiro/1234
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. USUÁRIOS (um por perfil)
-- Se já existir algum login, altere o login abaixo ou apague o usuário antes.
-- -----------------------------------------------------------------------------

-- DONO (Administrador) — Dashboard completo, filtros, ranking, caixa
INSERT INTO usuario (id, nome, login, senha, perfil, ativo, avatar)
VALUES (1, 'Admin', 'dono', '1234', 'DONO', true, NULL)
ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome, login = EXCLUDED.login, senha = EXCLUDED.senha, perfil = EXCLUDED.perfil, ativo = EXCLUDED.ativo;

-- RECEPCIONISTA — Fila, caixa, encerrados, agenda, produtos/serviços
INSERT INTO usuario (id, nome, login, senha, perfil, ativo, avatar)
VALUES (2, 'Recepção', 'recepcao', '1234', 'RECEPCIONISTA', true, NULL)
ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome, login = EXCLUDED.login, senha = EXCLUDED.senha, perfil = EXCLUDED.perfil, ativo = EXCLUDED.ativo;

-- CABELEIREIRO — Fila, atendimentos, produtos
INSERT INTO usuario (id, nome, login, senha, perfil, ativo, avatar)
VALUES (3, 'Cabeleireiro', 'cabeleireiro', '1234', 'CABELEIREIRO', true, NULL)
ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome, login = EXCLUDED.login, senha = EXCLUDED.senha, perfil = EXCLUDED.perfil, ativo = EXCLUDED.ativo;

-- Ajusta a sequência de id (PostgreSQL) para não conflitar em novos cadastros
SELECT setval(pg_get_serial_sequence('usuario', 'id'), (SELECT COALESCE(MAX(id), 1) FROM usuario));

-- -----------------------------------------------------------------------------
-- 2. DADOS PARA AS TELAS (clientes, serviços, produtos, caixa, fila, atendimentos)
-- Assim o dashboard e a recepção exibem dados ao logar.
-- -----------------------------------------------------------------------------

-- Clientes (1–3 na fila aguardando; 4–5 usados nos atendimentos encerrados)
INSERT INTO cliente (id, nome, telefone, data_cadastro)
VALUES
  (1, 'João Silva', '(11) 99999-1111', NOW() - INTERVAL '2 days'),
  (2, 'Maria Santos', '(11) 99999-2222', NOW() - INTERVAL '1 day'),
  (3, 'Pedro Oliveira', '(11) 99999-3333', NOW()),
  (4, 'Carlos Souza', '(11) 99999-4444', NOW() - INTERVAL '3 days'),
  (5, 'Ana Costa', '(11) 99999-5555', NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('cliente', 'id'), (SELECT COALESCE(MAX(id), 1) FROM cliente));

-- Serviços
INSERT INTO servico (id, descricao, valor, icone, imagem, ativo)
VALUES
  (1, 'Corte masculino', 35.00, '', '', true),
  (2, 'Barba', 25.00, '', '', true),
  (3, 'Corte + Barba', 55.00, '', '', true)
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('servico', 'id'), (SELECT COALESCE(MAX(id), 1) FROM servico));

-- Produtos
INSERT INTO produto (id, descricao, valor_venda, valor_custo, estoque, icone, imagem, ativo, data_cadastro)
VALUES
  (1, 'Pomada', 30.00, 15.00, 20, '', '', true, NOW()),
  (2, 'Shampoo', 25.00, 10.00, 15, '', '', true, NOW())
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('produto', 'id'), (SELECT COALESCE(MAX(id), 1) FROM produto));

-- Caixa aberto (necessário para receber pagamentos na recepção)
INSERT INTO caixa_movimento (id, data_abertura, valor_abertura, status, observacao)
VALUES (1, NOW(), 0.00, 'ABERTO', 'Abertura para demo')
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('caixa_movimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM caixa_movimento));

-- Fila: 1–3 = clientes AGUARDANDO (telas "Clientes aguardando" / recepção); 4–5 = já usados em atendimentos encerrados
INSERT INTO fila_atendimento (id, id_cliente, id_agendamento, status, data_entrada)
VALUES
  (1, 1, NULL, 'AGUARDANDO', NOW() - INTERVAL '30 minutes'),
  (2, 2, NULL, 'AGUARDANDO', NOW() - INTERVAL '15 minutes'),
  (3, 3, NULL, 'AGUARDANDO', NOW()),
  (4, 4, NULL, 'CONCLUIDO', NOW() - INTERVAL '1 day'),
  (5, 5, NULL, 'CONCLUIDO', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('fila_atendimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM fila_atendimento));

-- Atendimentos encerrados (cabeleireiro id 3) — para dashboard ter faturamento, gráfico e ranking
INSERT INTO atendimento (id, id_fila, id_cabeleireiro, inicio, fim, status)
VALUES
  (1, 4, 3, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day' + INTERVAL '45 minutes', 'ENCERRADO'),
  (2, 5, 3, NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days' + INTERVAL '30 minutes', 'ENCERRADO')
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('atendimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento));

-- Serviços e produtos dos atendimentos
INSERT INTO atendimento_servico (id, id_atendimento, id_servico, valor)
VALUES (1, 1, 1, 35.00), (2, 1, 2, 25.00), (3, 2, 3, 55.00)
ON CONFLICT (id) DO NOTHING;
INSERT INTO atendimento_produto (id, id_atendimento, id_produto, quantidade, valor)
VALUES (1, 1, 1, 1, 30.00)
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('atendimento_servico', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento_servico));
SELECT setval(pg_get_serial_sequence('atendimento_produto', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento_produto));

-- Pagamentos no caixa (dashboard: tipo PIX/DINHEIRO e valores no gráfico)
INSERT INTO caixa (id, id_caixa_movimento, id_atendimento, valor, tipo_pagamento, observacao, data_pagamento)
VALUES
  (1, 1, 1, 90.00, 'PIX', 'Demo', NOW() - INTERVAL '1 day' + INTERVAL '46 minutes'),
  (2, 1, 2, 55.00, 'DINHEIRO', 'Demo', NOW() - INTERVAL '2 days' + INTERVAL '31 minutes')
ON CONFLICT (id) DO NOTHING;
SELECT setval(pg_get_serial_sequence('caixa', 'id'), (SELECT COALESCE(MAX(id), 1) FROM caixa));

-- =============================================================================
-- RESUMO DE ACESSO
-- =============================================================================
-- DONO:          login = dono       senha = 1234  (Dashboard admin, gráficos, ranking, clientes aguardando)
-- RECEPCIONISTA: login = recepcao  senha = 1234  (Fila, caixa, encerrados, agenda)
-- CABELEIREIRO:  login = cabeleireiro  senha = 1234  (Fila, atendimentos, produtos)
-- =============================================================================
