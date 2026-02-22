-- Permite associar notificação de lembrete ao agendamento (evitar duplicatas).
ALTER TABLE notificacao
ADD COLUMN IF NOT EXISTS id_agendamento INTEGER REFERENCES agendamento(id);

CREATE INDEX IF NOT EXISTS idx_notificacao_id_agendamento ON notificacao(id_agendamento);
