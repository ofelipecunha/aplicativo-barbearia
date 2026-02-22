import {
  MessageService
} from "./chunk-I6N6YKY2.js";
import {
  AuthService
} from "./chunk-7RHHINVH.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-BE4EWPG2.js";
import "./chunk-Y5F4OO7J.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-ZLFHMEWZ.js";
import {
  CommonModule,
  __async,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6OXXDOK5.js";

// src/app/pages/login/login.component.ts
function LoginComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 15);
    \u0275\u0275text(1, "Digite seu login");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 15);
    \u0275\u0275text(1, "Senha obrigat\xF3ria");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage());
  }
}
function LoginComponent_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
  }
}
function LoginComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Entrar");
    \u0275\u0275element(1, "i", 24);
  }
}
var MSG_PERFIL_WEB = "Seu perfil n\xE3o tem acesso ao sistema web. Utilize o aplicativo.";
var PERFIS_RECEPCAO = ["RECEPCAO", "RECEPCIONISTA"];
var PERFIS_DONO = ["DONO", "ADMIN"];
var PERFIS_WEB = [...PERFIS_RECEPCAO, ...PERFIS_DONO];
var LoginComponent = class _LoginComponent {
  constructor(fb, auth, router, route, message) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.route = route;
    this.message = message;
    this.loading = false;
    this.errorMessage = signal(null);
    this.form = this.fb.group({
      login: ["", Validators.required],
      senha: ["", Validators.required],
      lembrar: [false]
    });
  }
  ngOnInit() {
    if (this.route.snapshot.queryParams["motivo"] === "perfil") {
      this.message.add({
        severity: "warn",
        summary: "Acesso negado",
        detail: MSG_PERFIL_WEB,
        life: 6e3
      });
    }
  }
  onSubmit() {
    return __async(this, null, function* () {
      this.errorMessage.set(null);
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.loading = true;
      try {
        const { login, senha } = this.form.value;
        yield this.auth.login(login, senha);
        const user = this.auth.user();
        const perfil = (user?.perfil ?? "").toUpperCase();
        if (!PERFIS_WEB.includes(perfil)) {
          this.auth.logout();
          this.message.add({
            severity: "warn",
            summary: "Acesso negado",
            detail: MSG_PERFIL_WEB,
            life: 6e3
          });
          return;
        }
        const isRecepcao = PERFIS_RECEPCAO.includes(perfil);
        this.router.navigate([isRecepcao ? "/dashboard-recepcao" : "/dashboard"]);
      } catch (e) {
        const msg = e && typeof e === "object" && "error" in e ? e.error?.error : "Erro ao fazer login. Verifique e-mail e senha.";
        this.errorMessage.set(msg ?? "Erro ao fazer login.");
      } finally {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(MessageService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 38, vars: 6, consts: [[1, "login-page"], [1, "login-left"], [1, "login-promo-overlay"], [1, "login-promo-content"], [1, "login-right"], [1, "login-panel"], [1, "login-header"], ["src", "/assets/logoWl.png", "alt", "Logo", 1, "login-logo-img"], [1, "login-subtitle"], [3, "ngSubmit", "formGroup"], [1, "field"], ["for", "login"], [1, "input-wrap"], [1, "pi", "pi-envelope"], ["id", "login", "type", "text", "formControlName", "login", "placeholder", "Digite seu login", "autocomplete", "username"], [1, "error"], ["for", "senha"], [1, "pi", "pi-lock"], ["id", "senha", "type", "password", "formControlName", "senha", "placeholder", "********", "autocomplete", "current-password"], [1, "form-options"], ["routerLink", "/esqueci-senha", 1, "link-forgot"], [1, "error-msg"], ["type", "submit", 1, "btn-submit", 3, "disabled"], [1, "spinner"], [1, "pi", "pi-arrow-right"], [1, "login-register"], ["routerLink", "/cadastro"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1);
        \u0275\u0275element(2, "div", 2)(3, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "section", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275element(7, "img", 7);
        \u0275\u0275elementStart(8, "h1");
        \u0275\u0275text(9, "Wender Barbearia");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "p", 8);
        \u0275\u0275text(11, "Seu visual, nosso compromisso.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(12, "form", 9);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_12_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(13, "div", 10)(14, "label", 11);
        \u0275\u0275text(15, "Login");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 12);
        \u0275\u0275element(17, "i", 13)(18, "input", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275template(19, LoginComponent_Conditional_19_Template, 2, 0, "small", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 10)(21, "label", 16);
        \u0275\u0275text(22, "Senha");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 12);
        \u0275\u0275element(24, "i", 17)(25, "input", 18);
        \u0275\u0275elementEnd();
        \u0275\u0275template(26, LoginComponent_Conditional_26_Template, 2, 0, "small", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "div", 19)(28, "a", 20);
        \u0275\u0275text(29, "Esqueceu sua senha?");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(30, LoginComponent_Conditional_30_Template, 2, 1, "div", 21);
        \u0275\u0275elementStart(31, "button", 22);
        \u0275\u0275template(32, LoginComponent_Conditional_32_Template, 1, 0, "span", 23)(33, LoginComponent_Conditional_33_Template, 2, 0, "i", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(34, "p", 25);
        \u0275\u0275text(35, " N\xE3o possui uma conta? ");
        \u0275\u0275elementStart(36, "a", 26);
        \u0275\u0275text(37, "Criar conta");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        \u0275\u0275advance(12);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(((tmp_1_0 = ctx.form.get("login")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.form.get("login")) == null ? null : tmp_1_0.touched) ? 19 : -1);
        \u0275\u0275advance(7);
        \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("senha")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("senha")) == null ? null : tmp_2_0.touched) ? 26 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.errorMessage() ? 30 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 32 : 33);
      }
    }, dependencies: [CommonModule, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink], styles: ["\n\n.login-page[_ngcontent-%COMP%] {\n  display: flex;\n  min-height: 100vh;\n  width: 100%;\n}\n.login-left[_ngcontent-%COMP%] {\n  flex: 0 0 70%;\n  position: relative;\n  background:\n    linear-gradient(\n      135deg,\n      #8b7355 0%,\n      #6b5d4f 30%,\n      #4a4238 70%,\n      #3d3630 100%);\n  background-image: url(/assets/walpaper1.jpg);\n  background-size: cover;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n.login-promo-overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background:\n    linear-gradient(\n      105deg,\n      rgba(0, 0, 0, 0.08) 0%,\n      rgba(0, 0, 0, 0.35) 35%,\n      rgba(0, 0, 0, 0.7) 100%);\n  backdrop-filter: blur(1px);\n}\n.login-promo-content[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  padding: 48px 56px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  min-height: 100%;\n  color: #fff;\n}\n.login-promo-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1.25;\n  margin: 0 0 16px 0;\n  max-width: 420px;\n}\n.login-promo-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  line-height: 1.5;\n  margin: 0;\n  opacity: 0.95;\n  max-width: 380px;\n}\n.login-right[_ngcontent-%COMP%] {\n  flex: 0 0 30%;\n  min-width: 280px;\n  background: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 32px 40px;\n  position: relative;\n}\n.login-panel[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 360px;\n}\n.login-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n  text-align: center;\n}\n.login-header[_ngcontent-%COMP%]   .login-logo-img[_ngcontent-%COMP%] {\n  display: block;\n  max-width: 280px;\n  width: 100%;\n  height: auto;\n  margin: 0 auto 28px auto;\n}\n.login-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #fff;\n  margin: 0 0 8px 0;\n}\n.login-header[_ngcontent-%COMP%]   .login-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #a3a3a3;\n  margin: 0;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.9rem;\n  font-weight: 500;\n  color: #fff;\n  margin-bottom: 8px;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  transition: border-color 0.2s;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.95rem;\n  outline: none;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]:focus-within {\n  border-color: #ff9000;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .input-wrap[_ngcontent-%COMP%]:focus-within   i[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\nform[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  display: block;\n  margin-top: 6px;\n  font-size: 0.85rem;\n  color: #ef4444;\n}\nform[_ngcontent-%COMP%]   .form-options[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 24px;\n  flex-wrap: wrap;\n  gap: 12px;\n}\nform[_ngcontent-%COMP%]   .check-wrap[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  cursor: pointer;\n  font-size: 0.9rem;\n  color: #a3a3a3;\n}\nform[_ngcontent-%COMP%]   .check-wrap[_ngcontent-%COMP%]   input[type=checkbox][_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n  accent-color: #ff9000;\n  cursor: pointer;\n}\nform[_ngcontent-%COMP%]   .check-wrap[_ngcontent-%COMP%]   .check-label[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n  user-select: none;\n}\nform[_ngcontent-%COMP%]   .link-forgot[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #ff9000;\n  text-decoration: none;\n}\nform[_ngcontent-%COMP%]   .link-forgot[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\nform[_ngcontent-%COMP%]   .error-msg[_ngcontent-%COMP%] {\n  padding: 10px 14px;\n  background: rgba(239, 68, 68, 0.15);\n  border: 1px solid rgba(239, 68, 68, 0.4);\n  border-radius: 8px;\n  color: #fca5a5;\n  font-size: 0.9rem;\n  margin-bottom: 16px;\n}\nform[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 14px 24px;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  font-size: 1rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s;\n}\nform[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e68200;\n}\nform[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.8;\n  cursor: not-allowed;\n}\nform[_ngcontent-%COMP%]   .btn-submit[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\nform[_ngcontent-%COMP%]   .spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border: 2px solid rgba(26, 26, 26, 0.3);\n  border-top-color: #1a1a1a;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.login-register[_ngcontent-%COMP%] {\n  margin-top: 28px;\n  font-size: 0.9rem;\n  color: #a3a3a3;\n  text-align: center;\n}\n.login-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #ff9000;\n  text-decoration: none;\n  font-weight: 500;\n}\n.login-register[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n.theme-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 24px;\n  right: 24px;\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 50%;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.theme-toggle[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.theme-toggle[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n@media (max-width: 900px) {\n  .login-page[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .login-left[_ngcontent-%COMP%] {\n    flex: 0 0 auto;\n    min-height: 220px;\n  }\n  .login-promo-content[_ngcontent-%COMP%] {\n    justify-content: center;\n    padding: 32px 24px;\n  }\n  .login-promo-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .login-promo-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.95rem;\n  }\n  .login-right[_ngcontent-%COMP%] {\n    padding: 24px 16px;\n  }\n  .theme-toggle[_ngcontent-%COMP%] {\n    bottom: 16px;\n    right: 16px;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\pages\\login\\login.component.ts", lineNumber: 23 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-OKV7VHLW.js.map
