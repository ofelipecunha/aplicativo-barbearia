-- Notificações separadas por perfil: RECEPCAO (caixa/estoque) e CABELEIREIRO (fila/atendimento)
-- Execute no banco: cada notificação passa a ter perfil_destino; a listagem filtra por perfil do usuário.

ALTER TABLE notificacao
ADD COLUMN IF NOT EXISTS perfil_destino VARCHAR(50) NOT NULL DEFAULT 'RECEPCAO';

COMMENT ON COLUMN notificacao.perfil_destino IS 'RECEPCAO = recepção/caixa; CABELEIREIRO = cabeleireiro (ex.: cliente aguardando)';

-- Índice para filtrar listagem por perfil
CREATE INDEX IF NOT EXISTS idx_notificacao_perfil_destino ON notificacao(perfil_destino);
CREATE INDEX IF NOT EXISTS idx_notificacao_perfil_data ON notificacao(perfil_destino, data_criacao DESC);
