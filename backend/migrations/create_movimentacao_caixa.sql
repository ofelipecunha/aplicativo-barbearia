-- Tabela de movimentações genéricas de caixa (lançamento manual, sangria, recebimento, ajuste).
-- Usada para consumo interno (ex: refrigerante), sangria, etc.

CREATE TABLE IF NOT EXISTS movimentacao_caixa (
    id SERIAL PRIMARY KEY,
    id_caixa_movimento INTEGER NOT NULL REFERENCES caixa_movimento(id),
    id_usuario INTEGER NOT NULL REFERENCES usuario(id),

    tipo_movimentacao VARCHAR(30) NOT NULL,
    -- LANCAMENTO_MANUAL | SANGRIA | RECEBIMENTO | AJUSTE

    descricao VARCHAR(255),
    valor DECIMAL(10,2) NOT NULL,

    operacao CHAR(1) NOT NULL,
    -- 'E' = Entrada | 'S' = Saída

    data_movimentacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    observacao VARCHAR(500)
);

CREATE INDEX IF NOT EXISTS idx_movimentacao_caixa_id_caixa ON movimentacao_caixa(id_caixa_movimento);
CREATE INDEX IF NOT EXISTS idx_movimentacao_caixa_data ON movimentacao_caixa(data_movimentacao DESC);
