-- =============================================================================
-- ROLLBACK: Remove todos os dados de demonstração do seed_demo_usuarios_e_dados.sql
-- Ordem respeitando TODAS as FKs (incl. caixa_sangria e notificacao).
-- Execute: psql -U postgres -d barbearia -f backend/migrations/rollback_demo_dados.sql
-- =============================================================================

-- 1. Quem referencia caixa_movimento (para poder apagar caixa_movimento depois)
DELETE FROM caixa_sangria WHERE id_caixa_movimento = 1;

-- 2. Caixa referencia atendimento → apagar caixa dos atendimentos que usam fila 1–5
DELETE FROM caixa WHERE id_atendimento IN (SELECT id FROM atendimento WHERE id_fila IN (1, 2, 3, 4, 5));

-- 3. Tabelas que referenciam atendimento (todos que usam fila 1–5)
DELETE FROM atendimento_produto WHERE id_atendimento IN (SELECT id FROM atendimento WHERE id_fila IN (1, 2, 3, 4, 5));
DELETE FROM atendimento_servico WHERE id_atendimento IN (SELECT id FROM atendimento WHERE id_fila IN (1, 2, 3, 4, 5));

-- 4. Atendimento referencia fila → apagar TODOS os atendimentos que usam fila 1–5 (pode haver id 3, etc.)
DELETE FROM atendimento WHERE id_fila IN (1, 2, 3, 4, 5);

-- 5. Agora pode apagar a fila
DELETE FROM fila_atendimento WHERE id IN (1, 2, 3, 4, 5);

-- 6. Agora pode apagar caixa_movimento (caixa_sangria já foi)
DELETE FROM caixa_movimento WHERE id = 1;

-- 7. Notificacao pode referenciar produto
DELETE FROM notificacao WHERE id_produto IN (1, 2);

-- 8. Entidades “independentes” (sem FK para as que já apagamos)
DELETE FROM cliente WHERE id IN (1, 2, 3, 4, 5);
DELETE FROM servico WHERE id IN (1, 2, 3);
DELETE FROM produto WHERE id IN (1, 2);
DELETE FROM usuario WHERE id IN (1, 2, 3);

-- Ajusta sequências para o próximo insert usar id correto (opcional)
SELECT setval(pg_get_serial_sequence('caixa', 'id'), (SELECT COALESCE(MAX(id), 0) FROM caixa));
SELECT setval(pg_get_serial_sequence('atendimento_produto', 'id'), (SELECT COALESCE(MAX(id), 0) FROM atendimento_produto));
SELECT setval(pg_get_serial_sequence('atendimento_servico', 'id'), (SELECT COALESCE(MAX(id), 0) FROM atendimento_servico));
SELECT setval(pg_get_serial_sequence('atendimento', 'id'), (SELECT COALESCE(MAX(id), 0) FROM atendimento));
SELECT setval(pg_get_serial_sequence('fila_atendimento', 'id'), (SELECT COALESCE(MAX(id), 0) FROM fila_atendimento));
SELECT setval(pg_get_serial_sequence('caixa_movimento', 'id'), (SELECT COALESCE(MAX(id), 0) FROM caixa_movimento));
SELECT setval(pg_get_serial_sequence('cliente', 'id'), (SELECT COALESCE(MAX(id), 0) FROM cliente));
SELECT setval(pg_get_serial_sequence('servico', 'id'), (SELECT COALESCE(MAX(id), 0) FROM servico));
SELECT setval(pg_get_serial_sequence('produto', 'id'), (SELECT COALESCE(MAX(id), 0) FROM produto));
SELECT setval(pg_get_serial_sequence('usuario', 'id'), (SELECT COALESCE(MAX(id), 0) FROM usuario));
