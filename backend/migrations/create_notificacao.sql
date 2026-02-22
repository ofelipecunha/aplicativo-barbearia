-- Tabela de notificações por perfil (RECEPCAO | CABELEIREIRO).
-- RECEPCAO: RECEBIMENTO (atendimento no caixa), REABASTECER (estoque baixo).
-- CABELEIREIRO: AGUARDANDO (cliente na fila).

CREATE TABLE IF NOT EXISTS notificacao (
    id BIGSERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,           -- RECEBIMENTO | REABASTECER | AGUARDANDO
    titulo VARCHAR(100) NOT NULL,
    subtitulo VARCHAR(255),              -- Nome do cliente ou produto
    detalhe VARCHAR(255),
    valor DECIMAL(10,2),
    estoque INTEGER,
    id_atendimento INTEGER REFERENCES atendimento(id),
    id_produto INTEGER REFERENCES produto(id),
    perfil_destino VARCHAR(50) NOT NULL DEFAULT 'RECEPCAO',  -- RECEPCAO | CABELEIREIRO
    lido BOOLEAN NOT NULL DEFAULT FALSE,
    data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notificacao_lido ON notificacao(lido);
CREATE INDEX IF NOT EXISTS idx_notificacao_tipo ON notificacao(tipo);
CREATE INDEX IF NOT EXISTS idx_notificacao_data ON notificacao(data_criacao DESC);
CREATE INDEX IF NOT EXISTS idx_notificacao_perfil_destino ON notificacao(perfil_destino);
CREATE INDEX IF NOT EXISTS idx_notificacao_perfil_data ON notificacao(perfil_destino, data_criacao DESC);
