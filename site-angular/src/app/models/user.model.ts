export interface User {
  id: number;
  nome: string;
  login: string;
  perfil: string;
  ativo?: boolean;
  avatar?: string | null;
}
