import {
  HttpClient,
  HttpParams
} from "./chunk-ZLFHMEWZ.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6OXXDOK5.js";

// src/environments/environment.ts
var environment = {
  production: false,
  apiUrl: "http://localhost:8080/api"
};

// src/app/services/api.service.ts
var ApiService = class _ApiService {
  constructor(http) {
    this.http = http;
    this.baseUrl = environment?.apiUrl ?? "http://localhost:8080/api";
  }
  get(path, params) {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((k) => {
        if (params[k] != null)
          httpParams = httpParams.set(k, params[k]);
      });
    }
    return this.http.get(`${this.baseUrl}${path}`, { params: httpParams });
  }
  post(path, body) {
    return this.http.post(`${this.baseUrl}${path}`, body);
  }
  patch(path, body) {
    return this.http.patch(`${this.baseUrl}${path}`, body);
  }
  delete(path) {
    return this.http.delete(`${this.baseUrl}${path}`);
  }
  /** Upload de arquivo (ex.: imagem produto/serviço). Retorna { imagem: "uploads/..." } */
  upload(path, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.baseUrl}${path}`, formData);
  }
  /** Usuário logado: GET /usuarios/:id (dados incluindo avatar) */
  getUsuario(id) {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }
  /** Atualizar nome/perfil/ativo: PATCH /usuarios/:id */
  updateUsuario(id, body) {
    return this.http.patch(`${this.baseUrl}/usuarios/${id}`, body);
  }
  /** Alterar senha: POST /usuarios/:id/senha */
  alterarSenha(id, senhaAtual, novaSenha) {
    return this.http.post(`${this.baseUrl}/usuarios/${id}/senha`, {
      senha_atual: senhaAtual,
      nova_senha: novaSenha
    });
  }
  /** Upload avatar: POST /usuarios/:id/avatar (multipart file). Retorna { avatar: "api/usuarios/:id/avatar" } */
  uploadAvatar(id, file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.baseUrl}/usuarios/${id}/avatar`, formData);
  }
  static {
    this.\u0275fac = function ApiService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ApiService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiService, factory: _ApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  environment,
  ApiService
};
//# sourceMappingURL=chunk-Y5F4OO7J.js.map
