-- Notificações de AGENDA para CABELEIREIRO: apenas o destinatário vê (id_usuario_destino = id do cabeleireiro).
ALTER TABLE notificacao
ADD COLUMN IF NOT EXISTS id_usuario_destino INTEGER REFERENCES usuario(id);

CREATE INDEX IF NOT EXISTS idx_notificacao_id_usuario_destino ON notificacao(id_usuario_destino);

COMMENT ON COLUMN notificacao.id_usuario_destino IS 'Quando preenchido, a notificação é exibida apenas para esse usuário (ex.: CABELEIREIRO vê só suas agendas).';
