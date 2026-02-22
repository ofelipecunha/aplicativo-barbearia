import {
  InputText,
  InputTextModule,
  Password,
  PasswordModule
} from "./chunk-FGRNKVKW.js";
import "./chunk-67WNYDCO.js";
import "./chunk-3B76MB2V.js";
import {
  Button,
  ButtonModule
} from "./chunk-Z3XIRSN6.js";
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
import {
  ApiService
} from "./chunk-Y5F4OO7J.js";
import {
  Router,
  RouterLink
} from "./chunk-ZLFHMEWZ.js";
import {
  __async,
  __spreadProps,
  __spreadValues,
  firstValueFrom,
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
  ɵɵproperty,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-6OXXDOK5.js";

// src/app/pages/perfil/perfil.component.ts
function PerfilComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1, "Nome obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function PerfilComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 12);
    \u0275\u0275text(1, "Senhas n\xE3o conferem");
    \u0275\u0275elementEnd();
  }
}
var PerfilComponent = class _PerfilComponent {
  constructor(fb, auth, api, router, message) {
    this.fb = fb;
    this.auth = auth;
    this.api = api;
    this.router = router;
    this.message = message;
    this.loading = false;
    this.user = null;
    this.form = this.fb.group({
      nome: ["", Validators.required],
      senha_atual: [""],
      nova_senha: [""],
      nova_senha_confirmation: [""]
    });
  }
  ngOnInit() {
    this.user = this.auth.user() ?? null;
    this.form.patchValue({ nome: this.user?.nome ?? "" });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.form.invalid || !this.user) {
        this.form.markAllAsTouched();
        return;
      }
      const { nome, senha_atual, nova_senha } = this.form.value;
      this.loading = true;
      try {
        if (nome?.trim()) {
          yield firstValueFrom(this.api.patch(`/usuarios/${this.user.id}`, { nome: nome.trim() }));
          this.auth.updateUser(__spreadProps(__spreadValues({}, this.user), { nome: nome.trim() }));
        }
        if (senha_atual?.length && nova_senha?.length) {
          yield firstValueFrom(this.api.post(`/usuarios/${this.user.id}/senha`, {
            senha_atual,
            nova_senha
          }));
        }
        this.message.add({ severity: "success", summary: "Perfil atualizado!" });
        this.router.navigate(["/dashboard"]);
      } catch (e) {
        const err = e;
        const msg = err?.error?.error ?? "Erro ao atualizar perfil. Tente novamente.";
        this.message.add({ severity: "error", summary: "Erro", detail: msg });
      } finally {
        this.loading = false;
      }
    });
  }
  avatarUrl() {
    const u = this.user;
    if (u?.avatar)
      return u.avatar;
    const nome = u?.nome ?? "U";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=ff9000&color=312e38`;
  }
  static {
    this.\u0275fac = function PerfilComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PerfilComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MessageService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PerfilComponent, selectors: [["app-perfil"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 12, consts: [[1, "perfil"], [1, "header"], [1, "header-content"], ["routerLink", "/dashboard"], [1, "pi", "pi-arrow-left"], [1, "content"], [3, "ngSubmit", "formGroup"], [1, "avatar-wrap"], [3, "src", "alt"], [1, "field"], ["for", "nome"], ["id", "nome", "type", "text", "pInputText", "", "formControlName", "nome", 1, "full"], [1, "error"], ["for", "senha_atual"], ["id", "senha_atual", "formControlName", "senha_atual", "placeholder", "Senha atual", "styleClass", "full-width", "inputStyleClass", "full", 3, "feedback", "toggleMask"], ["for", "nova_senha"], ["id", "nova_senha", "formControlName", "nova_senha", "placeholder", "Nova senha", "styleClass", "full-width", "inputStyleClass", "full", 3, "feedback", "toggleMask"], ["for", "nova_senha_confirmation"], ["id", "nova_senha_confirmation", "formControlName", "nova_senha_confirmation", "placeholder", "Confirmar nova senha", "styleClass", "full-width", "inputStyleClass", "full", 3, "feedback", "toggleMask"], ["type", "submit", "label", "Salvar altera\xE7\xF5es", "styleClass", "btn", 3, "loading"]], template: function PerfilComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "a", 3);
        \u0275\u0275element(4, "i", 4);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(5, "div", 5)(6, "form", 6);
        \u0275\u0275listener("ngSubmit", function PerfilComponent_Template_form_ngSubmit_6_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(7, "div", 7);
        \u0275\u0275element(8, "img", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "h1");
        \u0275\u0275text(10, "Meu perfil");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 9)(12, "label", 10);
        \u0275\u0275text(13, "Nome");
        \u0275\u0275elementEnd();
        \u0275\u0275element(14, "input", 11);
        \u0275\u0275template(15, PerfilComponent_Conditional_15_Template, 2, 0, "small", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 9)(17, "label", 13);
        \u0275\u0275text(18, "Senha atual");
        \u0275\u0275elementEnd();
        \u0275\u0275element(19, "p-password", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "div", 9)(21, "label", 15);
        \u0275\u0275text(22, "Nova senha");
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "p-password", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "div", 9)(25, "label", 17);
        \u0275\u0275text(26, "Confirmar nova senha");
        \u0275\u0275elementEnd();
        \u0275\u0275element(27, "p-password", 18);
        \u0275\u0275template(28, PerfilComponent_Conditional_28_Template, 2, 0, "small", 12);
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "p-button", 19);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        let tmp_2_0;
        let tmp_3_0;
        let tmp_10_0;
        \u0275\u0275advance(6);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(2);
        \u0275\u0275property("src", ctx.avatarUrl(), \u0275\u0275sanitizeUrl)("alt", (tmp_2_0 = ctx.user == null ? null : ctx.user.nome) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "");
        \u0275\u0275advance(7);
        \u0275\u0275conditional(((tmp_3_0 = ctx.form.get("nome")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx.form.get("nome")) == null ? null : tmp_3_0.touched) ? 15 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("feedback", false)("toggleMask", true);
        \u0275\u0275advance(4);
        \u0275\u0275property("feedback", true)("toggleMask", true);
        \u0275\u0275advance(4);
        \u0275\u0275property("feedback", false)("toggleMask", true);
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_10_0 = ctx.form.get("nova_senha_confirmation")) == null ? null : tmp_10_0.value) && ((tmp_10_0 = ctx.form.get("nova_senha")) == null ? null : tmp_10_0.value) !== ((tmp_10_0 = ctx.form.get("nova_senha_confirmation")) == null ? null : tmp_10_0.value) ? 28 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("loading", ctx.loading);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, ButtonModule, Button, InputTextModule, InputText, PasswordModule, Password], styles: ["\n\n.perfil[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  background: #312e38;\n}\n.header[_ngcontent-%COMP%] {\n  height: 144px;\n  background: #28262e;\n  display: flex;\n  align-items: center;\n}\n.header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  max-width: 1120px;\n  margin: 0 auto;\n  width: 100%;\n}\n.header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 1.5rem;\n}\n.content[_ngcontent-%COMP%] {\n  max-width: 340px;\n  margin: -176px auto 0;\n  padding: 80px 0;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .avatar-wrap[_ngcontent-%COMP%] {\n  width: 186px;\n  height: 186px;\n  margin: 0 auto 32px;\n  border-radius: 50%;\n  overflow: hidden;\n  background: #3e3b47;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .avatar-wrap[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  margin-bottom: 24px;\n  text-align: left;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  text-align: left;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n  color: #ccc;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%], \n.content   form   .field   [_nghost-%COMP%]     .full-width .p-inputtext {\n  width: 100%;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #f88;\n  font-size: 0.85rem;\n}\n.content[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 24px;\n}\n/*# sourceMappingURL=perfil.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PerfilComponent, { className: "PerfilComponent", filePath: "src\\app\\pages\\perfil\\perfil.component.ts", lineNumber: 21 });
})();
export {
  PerfilComponent
};
//# sourceMappingURL=chunk-3YAUHC2S.js.map
