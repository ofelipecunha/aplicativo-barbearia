import {
  ApiService
} from "./chunk-Y5F4OO7J.js";
import {
  Router
} from "./chunk-ZLFHMEWZ.js";
import {
  __async,
  computed,
  firstValueFrom,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-6OXXDOK5.js";

// src/app/services/auth.service.ts
var STORAGE_KEY = "@Barbearia:user";
var AuthService = class _AuthService {
  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.userSignal = signal(this.loadStoredUser());
    this.user = computed(() => this.userSignal());
    this.isLoggedIn = computed(() => !!this.userSignal());
  }
  loadStoredUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  login(login, senha) {
    return __async(this, null, function* () {
      const user = yield firstValueFrom(this.api.post("/auth/login", { login: login.trim(), senha }));
      if (!user)
        throw new Error("Resposta inv\xE1lida");
      this.userSignal.set(user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    });
  }
  logout() {
    this.userSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(["/login"]);
  }
  updateUser(user) {
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(ApiService), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-7RHHINVH.js.map
