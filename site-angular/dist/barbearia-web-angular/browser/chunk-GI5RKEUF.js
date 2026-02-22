import {
  Button,
  ButtonModule
} from "./chunk-Z3XIRSN6.js";
import {
  MessageService
} from "./chunk-I6N6YKY2.js";
import {
  RouterLink
} from "./chunk-ZLFHMEWZ.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-6OXXDOK5.js";

// src/app/pages/esqueci-senha/esqueci-senha.component.ts
var EsqueciSenhaComponent = class _EsqueciSenhaComponent {
  constructor(message) {
    this.message = message;
  }
  info() {
    this.message.add({
      severity: "info",
      summary: "Recupera\xE7\xE3o de senha",
      detail: "Entre em contato com o administrador para redefinir sua senha."
    });
  }
  static {
    this.\u0275fac = function EsqueciSenhaComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _EsqueciSenhaComponent)(\u0275\u0275directiveInject(MessageService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _EsqueciSenhaComponent, selectors: [["app-esqueci-senha"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 0, consts: [[1, "layout"], [1, "content"], [1, "box"], ["src", "assets/logo.svg", "alt", "Barbearia", 1, "logo"], ["label", "Mais informa\xE7\xF5es", "styleClass", "btn", 3, "onClick"], ["routerLink", "/login", 1, "link", "primary"], [1, "pi", "pi-sign-in"], [1, "background"]], template: function EsqueciSenhaComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "img", 3);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Recuperar senha");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Para redefinir sua senha, entre em contato com o administrador do sistema.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p-button", 4);
        \u0275\u0275listener("onClick", function EsqueciSenhaComponent_Template_p_button_onClick_8_listener() {
          return ctx.info();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "a", 5);
        \u0275\u0275element(10, "i", 6);
        \u0275\u0275text(11, " Voltar ao login");
        \u0275\u0275elementEnd()()();
        \u0275\u0275element(12, "div", 7);
        \u0275\u0275elementEnd();
      }
    }, dependencies: [RouterLink, ButtonModule, Button], styles: ["\n\n.layout[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  align-items: stretch;\n}\n.content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100%;\n  max-width: 700px;\n}\n.background[_ngcontent-%COMP%] {\n  flex: 1;\n  background:\n    linear-gradient(\n      135deg,\n      #232129 0%,\n      #312e38 50%,\n      #1a191e 100%);\n}\n.box[_ngcontent-%COMP%] {\n  width: 340px;\n  text-align: center;\n}\n.box[_ngcontent-%COMP%]   .logo[_ngcontent-%COMP%] {\n  max-width: 200px;\n  margin-bottom: 24px;\n}\n.box[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  font-size: 1.5rem;\n}\n.box[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n  margin-bottom: 24px;\n}\n.box[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.box[_ngcontent-%COMP%]   .link.primary[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  color: #ff9000;\n}\n/*# sourceMappingURL=esqueci-senha.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(EsqueciSenhaComponent, { className: "EsqueciSenhaComponent", filePath: "src\\app\\pages\\esqueci-senha\\esqueci-senha.component.ts", lineNumber: 13 });
})();
export {
  EsqueciSenhaComponent
};
//# sourceMappingURL=chunk-GI5RKEUF.js.map
