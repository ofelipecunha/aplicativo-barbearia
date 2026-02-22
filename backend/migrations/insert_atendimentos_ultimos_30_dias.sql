-- =============================================================================
-- INSERTS DE ATENDIMENTOS — Últimos 30 dias
-- Cabeleireiros: João (id 3), José (id 4)
-- Serviços (ids 1-10): Corte Masculino 40, Barba 35, Corte+Barba 65, Infantil 30,
--   Sobrancelha 15, Pigmentação 50, Camuflagem 55, Hidratação 25, Luzes 120, Platinado 180
-- Produtos (ids 1-10): Óleo 35, Balm 38, Shampoo 42, Condicionador 45, Talco 20,
--   Pomada Seca 55, Pomada Molhada 50, Espuma 30, Creme Pós 28, Kit 120
-- =============================================================================
-- Pré-requisitos:
--   1) Pelo menos um cliente cadastrado na tabela cliente (o script usa só IDs que existem).
--   2) Caixa movimento: precisa existir id = 1. Se não tiver, execute antes:
--        INSERT INTO caixa_movimento (id, data_abertura, valor_abertura, status, observacao)
--        VALUES (1, CURRENT_DATE - 31, 0, 'FECHADO', 'Caixa para histórico 30 dias');
--   3) Cabeleireiros João (id 3) e José (id 4) — como na sua planilha.
-- =============================================================================

DO $$
DECLARE
  d             date;
  i             int;
  id_fila       int;
  id_atend      int;
  id_servico    int;
  id_produto    int;
  id_cli        int;
  id_cab        int;  -- 3 ou 4 (João ou José)
  v_servico     numeric[];
  v_produto     numeric[];
  arr_clientes  int[];  -- IDs de clientes que existem no banco
  n_clientes    int;
  total_atend   int;
  hora_ini      time;
  hora_fim      time;
  valor_serv    numeric;
  valor_prod    numeric;
  total_valor   numeric;
  tipopag       text;
  id_caixa_seq  int;
  id_ats_seq    int;
  id_atp_seq    int;
BEGIN
  v_servico := ARRAY[40, 35, 65, 30, 15, 50, 55, 25, 120, 180];  -- servico 1-10
  v_produto  := ARRAY[35, 38, 42, 45, 20, 55, 50, 30, 28, 120];  -- produto 1-10

  -- Usar apenas clientes que existem na tabela cliente (evita erro de foreign key)
  SELECT array_agg(id ORDER BY id), count(*) INTO arr_clientes, n_clientes FROM cliente;
  IF arr_clientes IS NULL OR n_clientes = 0 THEN
    RAISE EXCEPTION 'Nenhum cliente cadastrado. Cadastre pelo menos um cliente na tabela cliente antes de rodar este script.';
  END IF;

  -- Percorrer os últimos 30 dias (do mais antigo ao mais recente)
  FOR d IN SELECT generate_series(CURRENT_DATE - 30, CURRENT_DATE - 1, '1 day'::interval)::date
  LOOP
    -- Entre 8 e 16 atendimentos por dia (variável por dia)
    total_atend := 8 + (abs(hashtext(d::text)) % 9);

    FOR i IN 1 .. total_atend
    LOOP
      id_fila  := nextval(pg_get_serial_sequence('fila_atendimento', 'id'));
      id_atend := nextval(pg_get_serial_sequence('atendimento', 'id'));

      -- Escolher um cliente entre os que existem (índice 1-based no array)
      id_cli := arr_clientes[1 + (abs(hashtext(d::text || i::text)) % n_clientes)];
      id_cab := 3 + (i % 2);  -- alterna João (3) e José (4)

      hora_ini := (8 + (i % 10))::int * interval '1 hour' + (i * 7 % 60) * interval '1 minute';
      hora_fim := hora_ini + (30 + (i % 25)) * interval '1 minute';

      -- Fila (status CONCLUIDO pois já foi atendido)
      INSERT INTO fila_atendimento (id, id_cliente, id_agendamento, id_cabeleireiro, status, data_entrada)
      VALUES (id_fila, id_cli, NULL, id_cab, 'CONCLUIDO', d + hora_ini);

      -- Atendimento
      INSERT INTO atendimento (id, id_fila, id_cabeleireiro, inicio, fim, status)
      VALUES (id_atend, id_fila, id_cab, d + hora_ini, d + hora_fim, 'ENCERRADO');

      -- 1 ou 2 serviços por atendimento
      id_servico := 1 + (abs(hashtext(d::text || i::text || 's')) % 10);
      valor_serv := v_servico[id_servico];
      id_ats_seq := nextval(pg_get_serial_sequence('atendimento_servico', 'id'));
      INSERT INTO atendimento_servico (id, id_atendimento, id_servico, valor)
      VALUES (id_ats_seq, id_atend, id_servico, valor_serv);

      IF (i % 3) <> 0 THEN  -- 2º serviço em ~2/3 dos atendimentos
        id_servico := 1 + (abs(hashtext(d::text || i::text || 's2')) % 10);
        valor_serv := valor_serv + v_servico[id_servico];
        id_ats_seq := nextval(pg_get_serial_sequence('atendimento_servico', 'id'));
        INSERT INTO atendimento_servico (id, id_atendimento, id_servico, valor)
        VALUES (id_ats_seq, id_atend, id_servico, v_servico[id_servico]);
      END IF;

      -- 0 ou 1 produto em ~40% dos atendimentos
      IF (abs(hashtext(d::text || i::text || 'p')) % 5) < 2 THEN
        id_produto := 1 + (abs(hashtext(d::text || i::text || 'p')) % 10);
        valor_prod := v_produto[id_produto];
        id_atp_seq := nextval(pg_get_serial_sequence('atendimento_produto', 'id'));
        INSERT INTO atendimento_produto (id, id_atendimento, id_produto, quantidade, valor)
        VALUES (id_atp_seq, id_atend, id_produto, 1, valor_prod);
      END IF;

      -- Total aproximado (soma dos serviços + produto se houver)
      SELECT COALESCE(SUM(valor), 0) INTO total_valor FROM atendimento_servico WHERE id_atendimento = id_atend;
      SELECT total_valor + COALESCE(SUM(quantidade * valor), 0) INTO total_valor FROM atendimento_produto WHERE id_atendimento = id_atend;

      tipopag := (ARRAY['PIX', 'PIX', 'DINHEIRO', 'CARTAO'])[1 + (abs(hashtext(d::text || i::text)) % 4)];

      -- Caixa (recebimento do atendimento) — id_caixa_movimento = 1
      id_caixa_seq := nextval(pg_get_serial_sequence('caixa', 'id'));
      INSERT INTO caixa (id, id_caixa_movimento, id_atendimento, valor, tipo_pagamento, tipo_movimentacao, operacao, data_pagamento)
      VALUES (id_caixa_seq, 1, id_atend, total_valor, tipopag, 'RECEBIMENTO', 'E', d + hora_fim + interval '2 minutes');
    END LOOP;
  END LOOP;
END $$;

-- Ajustar sequences ao final
SELECT setval(pg_get_serial_sequence('fila_atendimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM fila_atendimento));
SELECT setval(pg_get_serial_sequence('atendimento', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento));
SELECT setval(pg_get_serial_sequence('atendimento_servico', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento_servico));
SELECT setval(pg_get_serial_sequence('atendimento_produto', 'id'), (SELECT COALESCE(MAX(id), 1) FROM atendimento_produto));
SELECT setval(pg_get_serial_sequence('caixa', 'id'), (SELECT COALESCE(MAX(id), 1) FROM caixa));
