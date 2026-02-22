-- =============================================================================
-- Apaga TODOS os registros de todas as tabelas (ordem respeitando FKs).
-- Use para recomeçar do zero. Execute: psql -U postgres -d barbearia -f backend/migrations/truncar_todas_tabelas.sql
-- =============================================================================

-- Tabelas que referenciam atendimento
DELETE FROM notificacao;
DELETE FROM caixa;
DELETE FROM caixa_sangria;
DELETE FROM atendimento_servico;
DELETE FROM atendimento_produto;

-- Atendimento referencia fila e usuario
DELETE FROM atendimento;

-- Fila referencia cliente
DELETE FROM fila_atendimento;

-- Agendamento referencia cliente, servico e usuario → apagar antes deles
DELETE FROM agendamento;

-- Caixa_movimento é referenciado por caixa e caixa_sangria (já apagados)
DELETE FROM caixa_movimento;
DELETE FROM caixa_fechamento;

-- Entidades “raiz”
DELETE FROM cliente;
DELETE FROM servico;
DELETE FROM produto;
DELETE FROM usuario;

-- Opcional: resetar sequências (próximo id voltar a 1)
SELECT setval(pg_get_serial_sequence('notificacao', 'id'), 1);
SELECT setval(pg_get_serial_sequence('caixa', 'id'), 1);
SELECT setval(pg_get_serial_sequence('caixa_sangria', 'id'), 1);
SELECT setval(pg_get_serial_sequence('atendimento_servico', 'id'), 1);
SELECT setval(pg_get_serial_sequence('atendimento_produto', 'id'), 1);
SELECT setval(pg_get_serial_sequence('atendimento', 'id'), 1);
SELECT setval(pg_get_serial_sequence('fila_atendimento', 'id'), 1);
SELECT setval(pg_get_serial_sequence('agendamento', 'id'), 1);
SELECT setval(pg_get_serial_sequence('caixa_movimento', 'id'), 1);
SELECT setval(pg_get_serial_sequence('caixa_fechamento', 'id'), 1);
SELECT setval(pg_get_serial_sequence('cliente', 'id'), 1);
SELECT setval(pg_get_serial_sequence('servico', 'id'), 1);
SELECT setval(pg_get_serial_sequence('produto', 'id'), 1);
SELECT setval(pg_get_serial_sequence('usuario', 'id'), 1);
