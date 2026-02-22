export interface AgendamentoApi {
  id: number;
  data_hora: string;
  status?: string;
  cliente: { nome: string };
  servico?: { descricao: string };
  cabeleireiro?: { nome: string };
}

export interface AgendamentoExibicao {
  id: number;
  data_hora: string;
  horaFormatada: string;
  clienteNome: string;
  servicoDescricao: string;
  cabeleireiroNome?: string;
}
