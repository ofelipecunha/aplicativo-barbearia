-- Evoluir tabela CAIXA para centralizar todas as movimentações (RECEBIMENTO, LANCAMENTO_MANUAL, SANGRIA, AJUSTE)
-- Execute: psql -U postgres -d barbearia -f backend/migrations/evoluir_caixa_movimentacao.sql

-- 0. Remover tabela movimentacao_caixa se existir (foi substituída pela evolução da caixa)
DROP TABLE IF EXISTS movimentacao_caixa;

-- 1. Tornar id_atendimento opcional (lançamento manual não tem atendimento)
ALTER TABLE caixa
ALTER COLUMN id_atendimento DROP NOT NULL;

-- 2. Adicionar tipo de movimentação
ALTER TABLE caixa
ADD COLUMN IF NOT EXISTS tipo_movimentacao VARCHAR(30) NOT NULL DEFAULT 'RECEBIMENTO';

-- 3. Adicionar operação (E=Entrada, S=Saída)
ALTER TABLE caixa
ADD COLUMN IF NOT EXISTS operacao CHAR(1) NOT NULL DEFAULT 'E';

-- 4. Vincular usuário que fez a ação
ALTER TABLE caixa
ADD COLUMN IF NOT EXISTS id_usuario INTEGER REFERENCES usuario(id);

-- 5. Campo descrição para lançamentos manuais
ALTER TABLE caixa
ADD COLUMN IF NOT EXISTS descricao VARCHAR(255);

-- 6. Garantir que registros antigos (sem as colunas novas) tenham os valores corretos
-- (ADD COLUMN com DEFAULT já preenche em PG 11+; este UPDATE cobre cenários edge)
UPDATE caixa
SET tipo_movimentacao = 'RECEBIMENTO', operacao = 'E'
WHERE tipo_movimentacao IS NULL OR operacao IS NULL OR (tipo_movimentacao = '' AND id_atendimento IS NOT NULL);

-- 7. Índices para performance
CREATE INDEX IF NOT EXISTS idx_caixa_tipo_operacao ON caixa(tipo_movimentacao, operacao);
