-- Fila pode ser atribuída a um cabeleireiro: quando preenchido, só esse cabeleireiro vê o item (ex.: cliente do agendamento do dia).
ALTER TABLE fila_atendimento
ADD COLUMN IF NOT EXISTS id_cabeleireiro INTEGER REFERENCES usuario(id);

CREATE INDEX IF NOT EXISTS idx_fila_atendimento_id_cabeleireiro ON fila_atendimento(id_cabeleireiro);

COMMENT ON COLUMN fila_atendimento.id_cabeleireiro IS 'Quando preenchido, o item da fila aparece apenas para esse cabeleireiro (ex.: agendamentos do dia). NULL = fila geral (recepção).';
