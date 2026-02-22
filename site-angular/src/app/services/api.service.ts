import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment?.apiUrl ?? 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: Record<string, string>) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((k) => {
        if (params[k] != null) httpParams = httpParams.set(k, params[k]);
      });
    }
    return this.http.get<T>(`${this.baseUrl}${path}`, { params: httpParams });
  }

  post<T>(path: string, body: unknown) {
    return this.http.post<T>(`${this.baseUrl}${path}`, body);
  }

  patch<T>(path: string, body: unknown) {
    return this.http.patch<T>(`${this.baseUrl}${path}`, body);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(`${this.baseUrl}${path}`);
  }

  /** Upload de arquivo (ex.: imagem produto/serviço). Retorna { imagem: "uploads/..." } */
  upload(path: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ imagem?: string }>(`${this.baseUrl}${path}`, formData);
  }

  /** Usuário logado: GET /usuarios/:id (dados incluindo avatar) */
  getUsuario(id: number) {
    return this.http.get<{ id: number; nome: string; login: string; perfil: string; ativo?: boolean; avatar?: string | null }>(
      `${this.baseUrl}/usuarios/${id}`
    );
  }

  /** Atualizar nome/perfil/ativo: PATCH /usuarios/:id */
  updateUsuario(id: number, body: { nome?: string; perfil?: string; ativo?: boolean }) {
    return this.http.patch<unknown>(`${this.baseUrl}/usuarios/${id}`, body);
  }

  /** Alterar senha: POST /usuarios/:id/senha */
  alterarSenha(id: number, senhaAtual: string, novaSenha: string) {
    return this.http.post<unknown>(`${this.baseUrl}/usuarios/${id}/senha`, {
      senha_atual: senhaAtual,
      nova_senha: novaSenha,
    });
  }

  /** Upload avatar: POST /usuarios/:id/avatar (multipart file). Retorna { avatar: "api/usuarios/:id/avatar" } */
  uploadAvatar(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ avatar?: string }>(`${this.baseUrl}/usuarios/${id}/avatar`, formData);
  }
}
