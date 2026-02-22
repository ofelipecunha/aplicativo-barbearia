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
  ɵɵtemplate,
  ɵɵtext
} from "./chunk-6OXXDOK5.js";

// src/app/pages/cadastro/cadastro.component.ts
function CadastroComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 9);
    \u0275\u0275text(1, "Nome obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function CadastroComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 9);
    \u0275\u0275text(1, "Login obrigat\xF3rio");
    \u0275\u0275elementEnd();
  }
}
function CadastroComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 9);
    \u0275\u0275text(1, "M\xEDnimo 6 caracteres");
    \u0275\u0275elementEnd();
  }
}
var CadastroComponent = class _CadastroComponent {
  constructor(fb, api, router, message) {
    this.fb = fb;
    this.api = api;
    this.router = router;
    this.message = message;
    this.loading = false;
    this.form = this.fb.group({
      nome: ["", Validators.required],
      login: ["", Validators.required],
      senha: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
      this.loading = true;
      try {
        const { nome, login, senha } = this.form.value;
        yield firstValueFrom(this.api.post("/usuarios", { nome, login: login.trim(), senha }));
        this.message.add({ severity: "success", summary: "Cadastro realizado!", detail: "Voc\xEA j\xE1 pode fazer seu login." });
        this.router.navigate(["/login"]);
      } catch (e) {
        const msg = e && typeof e === "object" && "error" in e ? e.error?.error : "Erro ao fazer cadastro. Tente novamente.";
        this.message.add({ severity: "error", summary: "Erro", detail: msg });
      } finally {
        this.loading = false;
      }
    });
  }
  static {
    this.\u0275fac = function CadastroComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CadastroComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MessageService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CadastroComponent, selectors: [["app-cadastro"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 27, vars: 7, consts: [[1, "layout"], [1, "background"], [1, "content"], [1, "box"], ["src", "assets/logo.svg", "alt", "Barbearia", 1, "logo"], [3, "ngSubmit", "formGroup"], [1, "field"], ["for", "nome"], ["id", "nome", "type", "text", "pInputText", "", "formControlName", "nome", "placeholder", "Nome", 1, "full"], [1, "error"], ["for", "login"], ["id", "login", "type", "text", "pInputText", "", "formControlName", "login", "placeholder", "Login", 1, "full"], ["for", "senha"], ["id", "senha", "formControlName", "senha", "placeholder", "Senha", "styleClass", "full-width", "inputStyleClass", "full", 3, "feedback", "toggleMask"], ["type", "submit", "label", "Cadastrar", "styleClass", "full btn", 3, "loading"], ["routerLink", "/login", 1, "link", "primary"], [1, "pi", "pi-arrow-left"]], template: function CadastroComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "div", 1);
        \u0275\u0275elementStart(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "img", 4);
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "Fa\xE7a seu cadastro");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "form", 5);
        \u0275\u0275listener("ngSubmit", function CadastroComponent_Template_form_ngSubmit_7_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(8, "div", 6)(9, "label", 7);
        \u0275\u0275text(10, "Nome");
        \u0275\u0275elementEnd();
        \u0275\u0275element(11, "input", 8);
        \u0275\u0275template(12, CadastroComponent_Conditional_12_Template, 2, 0, "small", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "div", 6)(14, "label", 10);
        \u0275\u0275text(15, "Login");
        \u0275\u0275elementEnd();
        \u0275\u0275element(16, "input", 11);
        \u0275\u0275template(17, CadastroComponent_Conditional_17_Template, 2, 0, "small", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "div", 6)(19, "label", 12);
        \u0275\u0275text(20, "Senha");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "p-password", 13);
        \u0275\u0275template(22, CadastroComponent_Conditional_22_Template, 2, 0, "small", 9);
        \u0275\u0275elementEnd();
        \u0275\u0275element(23, "p-button", 14);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 15);
        \u0275\u0275element(25, "i", 16);
        \u0275\u0275text(26, " Voltar para login");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_5_0;
        \u0275\u0275advance(7);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_1_0 = ctx.form.get("nome")) == null ? null : tmp_1_0.invalid) && ((tmp_1_0 = ctx.form.get("nome")) == null ? null : tmp_1_0.touched) ? 12 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("login")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx.form.get("login")) == null ? null : tmp_2_0.touched) ? 17 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("feedback", true)("toggleMask", true);
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_5_0 = ctx.form.get("senha")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx.form.get("senha")) == null ? null : tmp_5_0.touched) ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("loading", ctx.loading);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, ButtonModule, Button, InputTextModule, InputText, PasswordModule, Password], styles: ["\n\n.layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: stretch;\n}\n.background[_ngcontent-%COMP%] {\n  flex: 1;\n  background:\n    linear-gradient(\n      225deg,\n      #232129 0%,\n      #312e38 50%,\n      #1a191e 100%);\n}\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  max-width: 700px;\n}\n.box[_ngcontent-%COMP%] {\n  width: 340px;\n  text-align: center;\n}\n.box[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  max-width: 200px;\n  margin-bottom: 24px;\n}\n.box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  font-size: 1.5rem;\n}\n.box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  text-align: left;\n}\n.box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n  color: #ccc;\n}\n.box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .full[_ngcontent-%COMP%], \n.box   form   .field   [_nghost-%COMP%]     .full-width .p-inputtext {\n  width: 100%;\n}\n.box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]   .error[_ngcontent-%COMP%] {\n  color: #f88;\n  font-size: 0.85rem;\n}\n.box[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 1rem;\n}\n.box[_ngcontent-%COMP%]    > .link.primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 1.5rem;\n  color: #ff9000;\n}\n/*# sourceMappingURL=cadastro.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CadastroComponent, { className: "CadastroComponent", filePath: "src\\app\\pages\\cadastro\\cadastro.component.ts", lineNumber: 19 });
})();
export {
  CadastroComponent
};
//# sourceMappingURL=chunk-5D6JH34N.js.map
