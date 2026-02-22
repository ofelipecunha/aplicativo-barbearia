-- Garante que a tabela caixa tenha a coluna observacao (ex.: "Crédito" / "Débito" no pagamento com cartão)
-- Execute: psql -U postgres -d barbearia -f backend/migrations/add_caixa_observacao.sql

ALTER TABLE caixa
ADD COLUMN IF NOT EXISTS observacao VARCHAR(500);

COMMENT ON COLUMN caixa.observacao IS 'Observação do lançamento (ex.: Crédito ou Débito para pagamentos com cartão)';
