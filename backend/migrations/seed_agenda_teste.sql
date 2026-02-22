-- =============================================================================
-- Seed para testar a AGENDA: cria clientes, 1 cabeleireiro, serviços e 5 agendamentos
-- Execute no PostgreSQL: psql -U postgres -d barbearia -f migrations/seed_agenda_teste.sql
-- (ou rode o conteúdo no DBeaver/pgAdmin)
-- =============================================================================

-- 1. Clientes (ids 1 a 5) — se já existir o id, ignora
INSERT INTO cliente (id, nome, telefone, data_cadastro)
VALUES
  (1, 'João Silva', '(11) 99999-1111', NOW() - INTERVAL '2 days'),
  (2, 'Maria Santos', '(11) 99999-2222', NOW() - INTERVAL '1 day'),
  (3, 'Pedro Oliveira', '(11) 99999-3333', NOW()),
  (4, 'Carlos Souza', '(11) 99999-4444', NOW() - INTERVAL '3 days'),
  (5, 'Ana Costa', '(11) 99999-5555', NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('cliente', 'id'), (SELECT COALESCE(MAX(id), 1) FROM cliente));

-- 2. Usuário cabeleireiro (id 3) — necessário para id_cabeleireiro nos agendamentos
INSERT INTO usuario (id, nome, login, senha, perfil, status, ativo, avatar)
VALUES (3, 'Barbeiro', 'barbeiro', '1234', 'CABELEIREIRO', 'V', true, NULL)
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('usuario', 'id'), (SELECT COALESCE(MAX(id), 1) FROM usuario));

-- 3. Serviços (ids 1 a 3) — necessário para id_servico nos agendamentos
INSERT INTO servico (id, descricao, valor, icone, imagem, ativo)
VALUES
  (1, 'Corte masculino', 35.00, '', '', true),
  (2, 'Barba', 25.00, '', '', true),
  (3, 'Corte + Barba', 55.00, '', '', true)
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('servico', 'id'), (SELECT COALESCE(MAX(id), 1) FROM servico));

-- 4. Cinco agendamentos no mês atual (para aparecer na agenda)
INSERT INTO agendamento (id_cliente, id_servico, id_cabeleireiro, data_hora, status, observacao, data_cadastro)
VALUES
  (1, 1, 3, DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 day' + TIME '09:00', 'AGENDADO', '', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 day'),
  (2, 2, 3, DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '2 days' + TIME '10:30', 'CONFIRMADO', '', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '2 days'),
  (3, 3, 3, DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '3 days' + TIME '14:00', 'AGENDADO', '', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '3 days'),
  (4, 1, 3, DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '5 days' + TIME '11:00', 'CONFIRMADO', 'Cliente preferencial', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '5 days'),
  (5, 2, 3, DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '7 days' + TIME '16:00', 'AGENDADO', '', DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '7 days');

SELECT setval(pg_get_serial_sequence('agendamento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM agendamento));

-- 5. Fila de atendimento (uma entrada por cliente para os atendimentos que os cabeleireiros fizeram)
-- IDs 100-104 para evitar conflito com filas já existentes
INSERT INTO fila_atendimento (id, id_cliente, id_agendamento, status, data_entrada)
VALUES
  (100, 1, NULL, 'FINALIZADO', NOW() - INTERVAL '5 days'),
  (101, 2, NULL, 'FINALIZADO', NOW() - INTERVAL '4 days'),
  (102, 3, NULL, 'FINALIZADO', NOW() - INTERVAL '3 days'),
  (103, 4, NULL, 'FINALIZADO', NOW() - INTERVAL '2 days'),
  (104, 5, NULL, 'FINALIZADO', NOW() - INTERVAL '1 day')
ON CONFLICT (id) DO NOTHING;

SELECT setval(pg_get_serial_sequence('fila_atendimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM fila_atendimento));

-- 6. Atendimentos que os cabeleireiros fizeram (id_cabeleireiro = 3, Barbeiro)
-- Se você tiver mais cabeleireiros (ex.: id 11, 12), altere id_cabeleireiro em algumas linhas
INSERT INTO atendimento (id_fila, id_cabeleireiro, inicio, fim, status)
VALUES
  (100, 3, NOW() - INTERVAL '5 days' + TIME '09:00', NOW() - INTERVAL '5 days' + TIME '09:45', 'ENCERRADO'),
  (101, 3, NOW() - INTERVAL '4 days' + TIME '10:30', NOW() - INTERVAL '4 days' + TIME '11:00', 'ENCERRADO'),
  (102, 3, NOW() - INTERVAL '3 days' + TIME '14:00', NOW() - INTERVAL '3 days' + TIME '14:40', 'ENCERRADO'),
  (103, 3, NOW() - INTERVAL '2 days' + TIME '11:00', NOW() - INTERVAL '2 days' + TIME '11:35', 'ENCERRADO'),
  (104, 3, NOW() - INTERVAL '1 day'  + TIME '16:00', NOW() - INTERVAL '1 day'  + TIME '16:30', 'ENCERRADO');

SELECT setval(pg_get_serial_sequence('atendimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento));
