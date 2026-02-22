import {
  DashboardRecepcaoComponent,
  addMonths,
  endOfMonth,
  format,
  getDay,
  isSameMonth,
  parseISO,
  pt_BR_default,
  startOfMonth,
  subDays,
  subMonths
} from "./chunk-VBX3JNLB.js";
import {
  AuthService
} from "./chunk-7RHHINVH.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  ReactiveFormsModule,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-BE4EWPG2.js";
import {
  ApiService,
  environment
} from "./chunk-Y5F4OO7J.js";
import {
  RouterLink,
  RouterLinkActive
} from "./chunk-ZLFHMEWZ.js";
import {
  CommonModule,
  CurrencyPipe,
  DecimalPipe,
  __spreadProps,
  __spreadValues,
  computed,
  signal,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdeclareLet,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind3,
  ɵɵpipeBindV,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreadContextLet,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstoreLet,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate4
} from "./chunk-6OXXDOK5.js";

// src/app/pages/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.nome;
var _forTrack2 = ($index, $item) => $item.index;
var _forTrack3 = ($index, $item) => $item.data;
var _forTrack4 = ($index, $item) => $item.data.getTime();
var _forTrack5 = ($index, $item) => $item.id_atendimento;
var _forTrack6 = ($index, $item) => $item.descricao + $item.valor;
var _forTrack7 = ($index, $item) => $item.descricao + $item.quantidade;
var _c0 = (a0) => [a0, "BRL", "symbol", "1.2-2", "pt-BR"];
function DashboardComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275element(1, "i", 50);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 17);
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("src", ctx_r2.avatarUrl(), \u0275\u0275sanitizeUrl)("alt", (tmp_3_0 = (tmp_3_0 = ctx_r2.user()) == null ? null : tmp_3_0.nome) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "");
  }
}
function DashboardComponent_Conditional_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 37);
  }
}
function DashboardComponent_Conditional_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_62_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 108);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_0_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirModalRecebimento());
    });
    \u0275\u0275elementStart(1, "div", 109);
    \u0275\u0275element(2, "i", 110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 111)(4, "div", 112);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 113);
    \u0275\u0275text(7, " Valor: ");
    \u0275\u0275elementStart(8, "strong");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 114);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "button", 115);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_0_Template_button_click_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.fecharToastRecebimento($event));
    });
    \u0275\u0275element(14, "i", 116);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" RECEBIMENTO para ", ctx_r2.recebimentoNotificacao().subtitulo || "Cliente", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind3(10, 3, ctx_r2.recebimentoNotificacao().valor, "1.2-2", "pt-BR"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.recebimentoNotificacao().tempo_atras, " ");
  }
}
function DashboardComponent_Conditional_62_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Abertura: R$ ", \u0275\u0275pipeBind3(2, 1, ctx_r2.valorAberturaCaixa(), "1.2-2", "pt-BR"), "");
  }
}
function DashboardComponent_Conditional_62_Conditional_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "Caixa fechado");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_62_Conditional_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74)(1, "div", 117)(2, "label");
    \u0275\u0275text(3, "Data in\xEDcio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 118);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_62_Conditional_51_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.chartDataInicio.set($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "label");
    \u0275\u0275text(6, "Data fim");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 118);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_62_Conditional_51_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.chartDataFim.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 119)(9, "button", 120);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_51_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarPeriodoGrafico(15));
    });
    \u0275\u0275text(10, "15 dias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 120);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_51_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarPeriodoGrafico(30));
    });
    \u0275\u0275text(12, "30 dias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 120);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_51_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarPeriodoGrafico(60));
    });
    \u0275\u0275text(14, "60 dias");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 120);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_51_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarPeriodoGrafico(90));
    });
    \u0275\u0275text(16, "90 dias");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 121);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_51_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarFiltroGrafico());
    });
    \u0275\u0275text(18, "Aplicar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.chartDataInicio());
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r2.chartDataFim());
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.chartPeriodo() === 15);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.chartPeriodo() === 30);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.chartPeriodo() === 60);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.chartPeriodo() === 90);
  }
}
function DashboardComponent_Conditional_62_Conditional_53_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275element(0, "line", 123);
  }
  if (rf & 2) {
    const gy_r7 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275attribute("x1", ctx_r2.chartPadding.left)("y1", gy_r7)("x2", ctx_r2.chartWidth - ctx_r2.chartPadding.right)("y2", gy_r7);
  }
}
function DashboardComponent_Conditional_62_Conditional_53_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "rect", 127);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_53_For_5_Template_rect_click_0_listener() {
      const bar_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.abrirModalAtendimentosDia(ctx_r2.graficoDados()[bar_r9.index].data));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const bar_r9 = ctx.$implicit;
    \u0275\u0275attribute("x", bar_r9.x)("y", bar_r9.y)("width", bar_r9.width)("height", bar_r9.height);
  }
}
function DashboardComponent_Conditional_62_Conditional_53_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 128);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_53_For_8_Template_span_click_0_listener() {
      const d_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.abrirModalAtendimentosDia(d_r11.data));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const d_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.diaDoMes(d_r11.data));
  }
}
function DashboardComponent_Conditional_62_Conditional_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 76);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 122);
    \u0275\u0275repeaterCreate(2, DashboardComponent_Conditional_62_Conditional_53_For_3_Template, 1, 4, ":svg:line", 123, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275repeaterCreate(4, DashboardComponent_Conditional_62_Conditional_53_For_5_Template, 1, 4, ":svg:rect", 124, _forTrack2);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "div", 125);
    \u0275\u0275repeaterCreate(7, DashboardComponent_Conditional_62_Conditional_53_For_8_Template, 2, 1, "span", 126, _forTrack3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("viewBox", "0 0 " + ctx_r2.chartWidth + " " + ctx_r2.chartHeight);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.chartGridLines());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.chartBars());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.graficoDados());
  }
}
function DashboardComponent_Conditional_62_Conditional_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275text(1, "Sem dados no per\xEDodo");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_62_For_75_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 131);
  }
  if (rf & 2) {
    const p_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.produtoImagemUrl(p_r12), \u0275\u0275sanitizeUrl)("alt", p_r12.descricao || "Produto");
  }
}
function DashboardComponent_Conditional_62_For_75_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 132);
    \u0275\u0275element(1, "i", 133);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_62_For_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 129);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 130);
    \u0275\u0275template(6, DashboardComponent_Conditional_62_For_75_Conditional_6_Template, 1, 2, "img", 131)(7, DashboardComponent_Conditional_62_For_75_Conditional_7_Template, 2, 0, "span", 132);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_14_0;
    const p_r12 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("estoque-baixo", ctx_r2.isEstoqueBaixo(p_r12));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r12.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_14_0 = p_r12.estoque) !== null && tmp_14_0 !== void 0 ? tmp_14_0 : 0);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.produtoImagemUrl(p_r12) ? 6 : 7);
  }
}
function DashboardComponent_Conditional_62_ForEmpty_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 134);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.searchProduto().trim() ? "Nenhum produto encontrado." : "Nenhum produto cadastrado.");
  }
}
function DashboardComponent_Conditional_62_Conditional_88_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 140);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r14 = ctx.$implicit;
    \u0275\u0275property("value", c_r14.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r14.nome);
  }
}
function DashboardComponent_Conditional_62_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 95)(1, "form", 135);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_62_Conditional_88_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarProfFiltro());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "label");
    \u0275\u0275text(4, "M\xEAs");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 137);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 136)(7, "label");
    \u0275\u0275text(8, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 138)(10, "option", 139);
    \u0275\u0275text(11, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, DashboardComponent_Conditional_62_Conditional_88_For_13_Template, 2, 2, "option", 140, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 141);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.profFiltroForm);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.cabeleireiros());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r2.profFiltroCarregando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.profFiltroCarregando() ? "Carregando..." : "PESQUISAR", " ");
  }
}
function DashboardComponent_Conditional_62_For_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 97);
    \u0275\u0275element(1, "img", 142);
    \u0275\u0275elementStart(2, "div", 143)(3, "span", 144);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 145);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 146);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.avatarUrlNome(p_r15.nome), \u0275\u0275sanitizeUrl)("alt", p_r15.nome);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r15.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", p_r15.atendimentos, " ", p_r15.atendimentos === 1 ? "atendimento" : "atendimentos", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(9, 6, \u0275\u0275pureFunction1(12, _c0, p_r15.total)));
  }
}
function DashboardComponent_Conditional_62_ForEmpty_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 98);
    \u0275\u0275text(1, "Nenhum dado no per\xEDodo");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_62_Conditional_98_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 147);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Conditional_98_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.openAgendaModal());
    });
    \u0275\u0275element(1, "i", 11);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_62_Conditional_102_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 140);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r18 = ctx.$implicit;
    \u0275\u0275property("value", c_r18.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r18.nome);
  }
}
function DashboardComponent_Conditional_62_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 105)(1, "form", 135);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_62_Conditional_102_Template_form_ngSubmit_1_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.aplicarAgendaFiltro());
    });
    \u0275\u0275elementStart(2, "div", 136)(3, "label");
    \u0275\u0275text(4, "M\xEAs");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 137);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 136)(7, "label");
    \u0275\u0275text(8, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "select", 138)(10, "option", 139);
    \u0275\u0275text(11, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(12, DashboardComponent_Conditional_62_Conditional_102_For_13_Template, 2, 2, "option", 140, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 136)(15, "label");
    \u0275\u0275text(16, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "select", 148)(18, "option", 139);
    \u0275\u0275text(19, "Todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "option", 149);
    \u0275\u0275text(21, "AGENDADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "option", 150);
    \u0275\u0275text(23, "CONFIRMADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "option", 151);
    \u0275\u0275text(25, "CANCELADO");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "option", 152);
    \u0275\u0275text(27, "FINALIZADO");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "button", 153);
    \u0275\u0275text(29, "Aplicar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r2.agendaFiltroForm);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.cabeleireiros());
  }
}
function DashboardComponent_Conditional_62_For_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r19.nomeCliente || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r19.cabeleireiro || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r19.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarDataHoraAgenda(a_r19.data_hora));
  }
}
function DashboardComponent_Conditional_62_ForEmpty_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 154);
    \u0275\u0275text(2, "Nenhum agendamento");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275template(0, DashboardComponent_Conditional_62_Conditional_0_Template, 15, 7, "div", 51);
    \u0275\u0275elementStart(1, "div", 41)(2, "section", 52)(3, "div", 53)(4, "div", 54);
    \u0275\u0275element(5, "i", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 56);
    \u0275\u0275text(7, "FATURAMENTO TOTAL");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 57);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 58);
    \u0275\u0275element(12, "div", 59);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 53)(14, "div", 60);
    \u0275\u0275element(15, "i", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 56);
    \u0275\u0275text(17, "EM ESPERA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 61);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span", 62);
    \u0275\u0275text(21, "Clientes aguardando");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 53)(23, "div", 63);
    \u0275\u0275element(24, "i", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 56);
    \u0275\u0275text(26, "AGENDAMENTOS");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 61);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span", 62);
    \u0275\u0275text(30, "Este m\xEAs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 64);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Template_div_click_31_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalCaixaDia());
    })("keydown.enter", function DashboardComponent_Conditional_62_Template_div_keydown_enter_31_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalCaixaDia());
    })("keydown.space", function DashboardComponent_Conditional_62_Template_div_keydown_space_31_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.abrirModalCaixaDia();
      return \u0275\u0275resetView($event.preventDefault());
    });
    \u0275\u0275elementStart(32, "div", 65);
    \u0275\u0275element(33, "i", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span", 56);
    \u0275\u0275text(35, "CAIXA DO DIA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "span", 61);
    \u0275\u0275text(37);
    \u0275\u0275pipe(38, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(39, DashboardComponent_Conditional_62_Conditional_39_Template, 3, 5, "span", 62)(40, DashboardComponent_Conditional_62_Conditional_40_Template, 2, 0, "span", 62);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 67)(42, "div", 68)(43, "section", 69)(44, "div", 70)(45, "div")(46, "h3");
    \u0275\u0275text(47, "Gr\xE1fico Atendimentos");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 71)(49, "button", 72);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Template_button_click_49_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleChartFiltro());
    });
    \u0275\u0275element(50, "i", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275template(51, DashboardComponent_Conditional_62_Conditional_51_Template, 19, 10, "div", 74);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div", 75);
    \u0275\u0275template(53, DashboardComponent_Conditional_62_Conditional_53_Template, 9, 1, "div", 76)(54, DashboardComponent_Conditional_62_Conditional_54_Template, 2, 0, "div", 77);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(55, "div", 68)(56, "section", 78)(57, "div", 79)(58, "h3");
    \u0275\u0275text(59, "Produtos em estoque");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 80)(61, "div", 81);
    \u0275\u0275element(62, "i", 33);
    \u0275\u0275elementStart(63, "input", 82);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_62_Template_input_ngModelChange_63_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchProduto.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 83)(65, "table", 84)(66, "thead")(67, "tr")(68, "th");
    \u0275\u0275text(69, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(70, "th", 85);
    \u0275\u0275text(71, "Quantidade");
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "th", 86);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "tbody");
    \u0275\u0275repeaterCreate(74, DashboardComponent_Conditional_62_For_75_Template, 8, 5, "tr", 87, _forTrack0, false, DashboardComponent_Conditional_62_ForEmpty_76_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(77, "div", 88)(78, "section", 89)(79, "div", 90)(80, "h3");
    \u0275\u0275text(81, "Cabeleireiros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(82, "div", 91)(83, "button", 92);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Template_button_click_83_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalVerTodosCabeleireiros());
    });
    \u0275\u0275text(84, "Ver todos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(85, "div", 93)(86, "button", 94);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Template_button_click_86_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleProfFiltro());
    });
    \u0275\u0275element(87, "i", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275template(88, DashboardComponent_Conditional_62_Conditional_88_Template, 16, 3, "div", 95);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(89, "ul", 96);
    \u0275\u0275repeaterCreate(90, DashboardComponent_Conditional_62_For_91_Template, 10, 14, "li", 97, _forTrack1, false, DashboardComponent_Conditional_62_ForEmpty_92_Template, 2, 0, "li", 98);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(93, "section", 99)(94, "div", 100)(95, "h3");
    \u0275\u0275text(96, "Agenda de Hoje");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "div", 101);
    \u0275\u0275template(98, DashboardComponent_Conditional_62_Conditional_98_Template, 2, 0, "button", 102);
    \u0275\u0275elementStart(99, "div", 103)(100, "button", 104);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_62_Template_button_click_100_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleAgendaFiltro());
    });
    \u0275\u0275element(101, "i", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275template(102, DashboardComponent_Conditional_62_Conditional_102_Template, 30, 1, "div", 105);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(103, "div", 106)(104, "table", 107)(105, "thead")(106, "tr")(107, "th");
    \u0275\u0275text(108, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(109, "th");
    \u0275\u0275text(110, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(111, "th");
    \u0275\u0275text(112, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(113, "th");
    \u0275\u0275text(114, "Data/Hora");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(115, "tbody");
    \u0275\u0275repeaterCreate(116, DashboardComponent_Conditional_62_For_117_Template, 9, 4, "tr", null, _forTrack0, false, DashboardComponent_Conditional_62_ForEmpty_118_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r2.recebimentoNotificacao() ? 0 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(10, 23, \u0275\u0275pureFunction1(33, _c0, ctx_r2.fluxoCaixaTotal())));
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", 100, "%");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.clientesEmEspera());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.totalAgendamentosMes());
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("R$ ", \u0275\u0275pipeBind3(38, 29, ctx_r2.saldoCaixa(), "1.2-2", "pt-BR"), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.caixaAberto() ? 39 : 40);
    \u0275\u0275advance(10);
    \u0275\u0275classProp("active", ctx_r2.chartFiltroOpen());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.chartFiltroOpen() ? 51 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.graficoDados().length > 0 ? 53 : 54);
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r2.searchProduto());
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.produtosEstoqueFiltrados());
    \u0275\u0275advance(12);
    \u0275\u0275classProp("active", ctx_r2.profFiltroOpen());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.profFiltroOpen() ? 88 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.rankingProfissionais());
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r2.agendaLista().length > 5 ? 98 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.agendaFiltroOpen());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.agendaFiltroOpen() ? 102 : -1);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.agendaListaCard());
  }
}
function DashboardComponent_Conditional_63_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 172);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_For_33_Template_button_click_0_listener() {
      const cell_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selecionarDiaCalendario(cell_r22.data, cell_r22.isCurrentMonth));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("outside", !cell_r22.isCurrentMonth)("has-agendamento", cell_r22.isCurrentMonth && ctx_r2.diaTemAgendamento(cell_r22.data))("selected", cell_r22.isCurrentMonth && ctx_r2.agendaDiaSelecionado() === cell_r22.dataStr);
    \u0275\u0275property("disabled", !cell_r22.isCurrentMonth);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cell_r22.dia, " ");
  }
}
function DashboardComponent_Conditional_63_Conditional_36_Conditional_6_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 178)(1, "span", 179);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 180);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 181);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r24 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r24.nomeCliente || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarDataHoraAgenda(a_r24.data_hora));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r24.cabeleireiro || "\u2014");
  }
}
function DashboardComponent_Conditional_63_Conditional_36_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 176);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_63_Conditional_36_Conditional_6_For_2_Template, 7, 3, "li", 178, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.agendamentosDoDiaSelecionado());
  }
}
function DashboardComponent_Conditional_63_Conditional_36_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 177);
    \u0275\u0275text(1, "Nenhum agendamento neste dia.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_63_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 171)(1, "div", 173)(2, "span", 174);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 175);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_Conditional_36_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.fecharDiaSelecionado());
    });
    \u0275\u0275text(5, "Fechar");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, DashboardComponent_Conditional_63_Conditional_36_Conditional_6_Template, 3, 0, "ul", 176)(7, DashboardComponent_Conditional_63_Conditional_36_Conditional_7_Template, 2, 0, "p", 177);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Agendamentos do dia ", ctx_r2.agendaDiaSelecionadoFormatado(), "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r2.agendamentosDoDiaSelecionado().length > 0 ? 6 : 7);
  }
}
function DashboardComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 155);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeAgendaModal());
    })("keydown.escape", function DashboardComponent_Conditional_63_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeAgendaModal());
    });
    \u0275\u0275elementStart(1, "div", 156);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r20);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 157)(3, "h3");
    \u0275\u0275text(4, "Agenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 158);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeAgendaModal());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 159)(8, "div", 160)(9, "button", 161);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navegarMesCalendario(-1));
    });
    \u0275\u0275element(10, "i", 162);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 163);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 164);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_63_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.navegarMesCalendario(1));
    });
    \u0275\u0275element(14, "i", 165);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 166)(16, "div", 167)(17, "span");
    \u0275\u0275text(18, "Dom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Seg");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22, "Ter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24, "Qua");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Qui");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28, "Sex");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "S\xE1b");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 168);
    \u0275\u0275repeaterCreate(32, DashboardComponent_Conditional_63_For_33_Template, 2, 8, "button", 169, _forTrack4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "p", 170);
    \u0275\u0275text(35, "Dias em verde possuem agendamentos. Clique no dia para ver a lista.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(36, DashboardComponent_Conditional_63_Conditional_36_Template, 8, 2, "div", 171);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r2.agendaCalendarioTitulo());
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r2.agendaCalendarioDias());
    \u0275\u0275advance(4);
    \u0275\u0275conditional((tmp_4_0 = ctx_r2.agendaDiaSelecionado()) ? 36 : -1, tmp_4_0);
  }
}
function DashboardComponent_Conditional_64_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 187);
    \u0275\u0275text(1, "Nenhuma notifica\xE7\xE3o.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_64_Conditional_9_For_2_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 198);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r27 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("\u2022 ", n_r27.detalhe, "");
  }
}
function DashboardComponent_Conditional_64_Conditional_9_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193);
    \u0275\u0275text(1);
    \u0275\u0275template(2, DashboardComponent_Conditional_64_Conditional_9_For_2_Conditional_4_Conditional_2_Template, 2, 1, "span", 198);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const n_r27 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", n_r27.subtitulo, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(n_r27.detalhe ? 2 : -1);
  }
}
function DashboardComponent_Conditional_64_Conditional_9_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 194);
    \u0275\u0275text(1, " Valor: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const n_r27 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind3(4, 1, n_r27.valor, "1.2-2", "pt-BR"), " ");
  }
}
function DashboardComponent_Conditional_64_Conditional_9_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "li", 190);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_64_Conditional_9_For_2_Template_li_click_0_listener() {
      const n_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.marcarNotificacaoLida(n_r27));
    });
    \u0275\u0275elementStart(1, "div", 191)(2, "div", 192);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, DashboardComponent_Conditional_64_Conditional_9_For_2_Conditional_4_Template, 3, 2, "div", 193)(5, DashboardComponent_Conditional_64_Conditional_9_For_2_Conditional_5_Template, 5, 5, "div", 194);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 195)(7, "span", 196);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 197);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const n_r27 = ctx.$implicit;
    \u0275\u0275classProp("lida", n_r27.lido);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", n_r27.titulo, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(n_r27.subtitulo || n_r27.detalhe ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(n_r27.valor != null ? 5 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", n_r27.tipo, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", n_r27.tempo_atras, " ");
  }
}
function DashboardComponent_Conditional_64_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "ul", 188);
    \u0275\u0275repeaterCreate(1, DashboardComponent_Conditional_64_Conditional_9_For_2_Template, 11, 7, "li", 189, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.notificacoes());
  }
}
function DashboardComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 182);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_64_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNotificacoes());
    })("keydown.escape", function DashboardComponent_Conditional_64_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNotificacoes());
    });
    \u0275\u0275elementStart(1, "div", 183);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_64_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r25);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 184)(3, "h3");
    \u0275\u0275text(4, "Notifica\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 185);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_64_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNotificacoes());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 186);
    \u0275\u0275template(8, DashboardComponent_Conditional_64_Conditional_8_Template, 2, 0, "p", 187)(9, DashboardComponent_Conditional_64_Conditional_9_Template, 3, 0, "ul", 188);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r2.notificacoes().length === 0 ? 8 : 9);
  }
}
function DashboardComponent_Conditional_65_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 209);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.recebimentoErro());
  }
}
function DashboardComponent_Conditional_65_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Salvando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_65_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Confirmar recebimento");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_65_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 199);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    })("keydown.escape", function DashboardComponent_Conditional_65_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    });
    \u0275\u0275elementStart(1, "div", 200);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r28);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 201)(3, "h3");
    \u0275\u0275text(4, "Receber pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 202);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 203)(8, "p", 204);
    \u0275\u0275text(9, " Cliente: ");
    \u0275\u0275elementStart(10, "strong");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "p", 205);
    \u0275\u0275text(13, " Valor: ");
    \u0275\u0275elementStart(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "label", 206);
    \u0275\u0275text(18, "Forma de pagamento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 207)(20, "button", 208);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("DINHEIRO"));
    });
    \u0275\u0275text(21, " Dinheiro ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 208);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("PIX"));
    });
    \u0275\u0275text(23, " Pix ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 208);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setTipoPagamentoRecebimento("CARTAO"));
    });
    \u0275\u0275text(25, " Cart\xE3o ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(26, DashboardComponent_Conditional_65_Conditional_26_Template, 2, 1, "p", 209);
    \u0275\u0275elementStart(27, "div", 210)(28, "button", 211);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalRecebimento());
    });
    \u0275\u0275text(29, " Cancelar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 212);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_65_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmarRecebimentoNotificacao());
    });
    \u0275\u0275template(31, DashboardComponent_Conditional_65_Conditional_31_Template, 2, 0, "span")(32, DashboardComponent_Conditional_65_Conditional_32_Template, 2, 0, "span");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(ctx_r2.recebimentoNotificacao().subtitulo || "Cliente");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" R$ ", \u0275\u0275pipeBind3(16, 11, ctx_r2.recebimentoNotificacao().valor, "1.2-2", "pt-BR"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "DINHEIRO");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "PIX");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active", ctx_r2.tipoPagamentoRecebimento() === "CARTAO");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.recebimentoErro() ? 26 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.recebimentoCarregando());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.recebimentoCarregando() ? 31 : 32);
  }
}
function DashboardComponent_Conditional_66_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 219);
    \u0275\u0275text(1, "Carregando...");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 232);
    \u0275\u0275text(1, "Carregando servi\xE7os e produtos...");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r32 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r32.descricao, " \u2014 ", \u0275\u0275pipeBindV(2, 2, \u0275\u0275pureFunction1(8, _c0, s_r32.valor)), "");
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 233)(1, "strong");
    \u0275\u0275text(2, "Servi\xE7os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275repeaterCreate(4, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_For_5_Template, 3, 10, "li", null, _forTrack6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const detalhe_r33 = \u0275\u0275readContextLet(0);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(detalhe_r33.servicos);
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r34 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate4("", p_r34.descricao, " \u2014 ", p_r34.quantidade, " x ", \u0275\u0275pipeBindV(2, 4, \u0275\u0275pureFunction1(16, _c0, p_r34.valor)), " = ", \u0275\u0275pipeBindV(3, 10, \u0275\u0275pureFunction1(18, _c0, p_r34.subtotal)), "");
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 233)(1, "strong");
    \u0275\u0275text(2, "Produtos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "ul");
    \u0275\u0275repeaterCreate(4, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_For_5_Template, 4, 20, "li", null, _forTrack7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext(2);
    const detalhe_r33 = \u0275\u0275readContextLet(0);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(detalhe_r33.produtos);
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 234);
    \u0275\u0275text(1, "Nenhum servi\xE7o ou produto lan\xE7ado.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_0_Template, 6, 0, "div", 233)(1, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_1_Template, 6, 0, "div", 233)(2, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Conditional_2_Template, 2, 0, "p", 234);
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const detalhe_r33 = \u0275\u0275readContextLet(0);
    \u0275\u0275conditional(detalhe_r33.servicos && detalhe_r33.servicos.length > 0 ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(detalhe_r33.produtos && detalhe_r33.produtos.length > 0 ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((!detalhe_r33.servicos || detalhe_r33.servicos.length === 0) && (!detalhe_r33.produtos || detalhe_r33.produtos.length === 0) ? 2 : -1);
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275declareLet(0);
    \u0275\u0275template(1, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Conditional_1_Template, 3, 3);
  }
  if (rf & 2) {
    const item_r31 = \u0275\u0275nextContext(2).$implicit;
    const detalhe_r35 = \u0275\u0275storeLet(\u0275\u0275nextContext(3).detalheAtendimentoMap()[item_r31.id_atendimento]);
    \u0275\u0275advance();
    \u0275\u0275conditional(detalhe_r35 ? 1 : -1);
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 231);
    \u0275\u0275template(1, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_1_Template, 2, 0, "p", 232)(2, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Conditional_2_Template, 2, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r31 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.carregandoDetalheId() === item_r31.id_atendimento ? 1 : 2);
  }
}
function DashboardComponent_Conditional_66_Conditional_9_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 220)(1, "div", 222);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_66_Conditional_9_For_1_Template_div_click_1_listener() {
      const item_r31 = \u0275\u0275restoreView(_r30).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.toggleDetalheAtendimento(item_r31.id_atendimento));
    });
    \u0275\u0275elementStart(2, "div", 223);
    \u0275\u0275element(3, "i", 224);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 225)(5, "span", 226);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 227);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 228);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 229);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "i", 230);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardComponent_Conditional_66_Conditional_9_For_1_Conditional_14_Template, 3, 1, "div", 231);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r31 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(item_r31.nome_cliente || "Cliente");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarHoraAtendimento(item_r31.data_hora));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r31.servicos || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarValorAtendimento(item_r31.total));
    \u0275\u0275advance();
    \u0275\u0275classProp("pi-chevron-down", ctx_r2.atendimentoExpandidoId() !== item_r31.id_atendimento)("pi-chevron-up", ctx_r2.atendimentoExpandidoId() === item_r31.id_atendimento);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.atendimentoExpandidoId() === item_r31.id_atendimento ? 14 : -1);
  }
}
function DashboardComponent_Conditional_66_Conditional_9_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 221);
    \u0275\u0275text(1, "Nenhum atendimento neste dia.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_66_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DashboardComponent_Conditional_66_Conditional_9_For_1_Template, 15, 9, "div", 220, _forTrack5, false, DashboardComponent_Conditional_66_Conditional_9_ForEmpty_2_Template, 2, 0, "p", 221);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.listaAtendimentosDia());
  }
}
function DashboardComponent_Conditional_66_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 213);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_66_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAtendimentosDia());
    })("keydown.escape", function DashboardComponent_Conditional_66_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAtendimentosDia());
    });
    \u0275\u0275elementStart(1, "div", 214);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_66_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r29);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 215)(3, "h3", 216);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 217);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_66_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r29);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAtendimentosDia());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 218);
    \u0275\u0275template(8, DashboardComponent_Conditional_66_Conditional_8_Template, 2, 0, "p", 219)(9, DashboardComponent_Conditional_66_Conditional_9_Template, 3, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Atendimentos em ", ctx_r2.formatarDataTituloModal(ctx_r2.dataSelecionadaAtendimentos()), "");
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.carregandoAtendimentosDia() ? 8 : 9);
  }
}
function DashboardComponent_Conditional_67_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 97);
    \u0275\u0275element(1, "img", 142);
    \u0275\u0275elementStart(2, "div", 143)(3, "span", 144);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 145);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 146);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r37 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r2.avatarUrlNome(p_r37.nome), \u0275\u0275sanitizeUrl)("alt", p_r37.nome);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r37.nome);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", p_r37.atendimentos, " ", p_r37.atendimentos === 1 ? "atendimento" : "atendimentos", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(9, 6, \u0275\u0275pureFunction1(12, _c0, p_r37.total)));
  }
}
function DashboardComponent_Conditional_67_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 98);
    \u0275\u0275text(1, "Nenhum cabeleireiro cadastrado.");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 235);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_67_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalVerTodosCabeleireiros());
    })("keydown.escape", function DashboardComponent_Conditional_67_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalVerTodosCabeleireiros());
    });
    \u0275\u0275elementStart(1, "div", 236);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_67_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r36);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 237)(3, "h3", 238);
    \u0275\u0275text(4, "Cabeleireiros");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 239);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_67_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r36);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalVerTodosCabeleireiros());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 240)(8, "ul", 241);
    \u0275\u0275repeaterCreate(9, DashboardComponent_Conditional_67_For_10_Template, 10, 14, "li", 97, \u0275\u0275repeaterTrackByIndex, false, DashboardComponent_Conditional_67_ForEmpty_11_Template, 2, 0, "li", 98);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r2.rankingProfissionaisCompleto());
  }
}
function DashboardComponent_Conditional_68_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 251);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.produtoErro());
  }
}
function DashboardComponent_Conditional_68_For_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 256);
  }
  if (rf & 2) {
    const p_r40 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.produtoImagemUrl(p_r40), \u0275\u0275sanitizeUrl)("alt", p_r40.descricao || "Produto");
  }
}
function DashboardComponent_Conditional_68_For_30_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 257);
    \u0275\u0275element(1, "i", 133);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_68_For_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 130);
    \u0275\u0275template(2, DashboardComponent_Conditional_68_For_30_Conditional_2_Template, 1, 2, "img", 256)(3, DashboardComponent_Conditional_68_For_30_Conditional_3_Template, 2, 0, "span", 257);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 258);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 258);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 259)(12, "button", 260);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_68_For_30_Template_button_click_12_listener() {
      const p_r40 = \u0275\u0275restoreView(_r39).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirModalEditarProduto(p_r40));
    });
    \u0275\u0275element(13, "i", 261);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 262);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_68_For_30_Template_button_click_14_listener() {
      const p_r40 = \u0275\u0275restoreView(_r39).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.excluirProduto(p_r40));
    });
    \u0275\u0275element(15, "i", 263);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const p_r40 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.produtoImagemUrl(p_r40) ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(p_r40.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(8, 4, \u0275\u0275pureFunction1(10, _c0, p_r40.valor_venda)));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate((tmp_15_0 = p_r40.estoque) !== null && tmp_15_0 !== void 0 ? tmp_15_0 : 0);
  }
}
function DashboardComponent_Conditional_68_ForEmpty_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 264);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.searchProdutoModal().trim() ? "Nenhum produto encontrado." : "Nenhum produto cadastrado.");
  }
}
function DashboardComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 242);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_68_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalProdutos());
    });
    \u0275\u0275elementStart(1, "div", 243);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_68_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r38);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 244)(3, "h3");
    \u0275\u0275text(4, "Produtos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 245);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_68_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalProdutos());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 246)(8, "div", 247);
    \u0275\u0275element(9, "i", 33);
    \u0275\u0275elementStart(10, "input", 248);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_68_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchProdutoModal.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 249);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_68_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r38);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalNovoProduto());
    });
    \u0275\u0275element(12, "i", 250);
    \u0275\u0275text(13, " Cadastrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, DashboardComponent_Conditional_68_Conditional_14_Template, 2, 1, "p", 251);
    \u0275\u0275elementStart(15, "div", 252)(16, "table", 253)(17, "thead")(18, "tr");
    \u0275\u0275element(19, "th", 86);
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 254);
    \u0275\u0275text(23, "Valor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 254);
    \u0275\u0275text(25, "Estoque");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th", 255);
    \u0275\u0275text(27, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "tbody");
    \u0275\u0275repeaterCreate(29, DashboardComponent_Conditional_68_For_30_Template, 16, 12, "tr", null, _forTrack0, false, DashboardComponent_Conditional_68_ForEmpty_31_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r2.searchProdutoModal());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.produtoErro() && !ctx_r2.produtoFormModalOpen() ? 14 : -1);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r2.produtosFiltradosModal());
  }
}
function DashboardComponent_Conditional_69_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 276);
    \u0275\u0275text(1, "Imagem selecionada");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_69_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.produtoErro());
  }
}
function DashboardComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 265);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_69_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormProduto());
    });
    \u0275\u0275elementStart(1, "div", 266);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_69_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r41);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 267)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 268);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_69_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormProduto());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 269);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_69_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarProduto());
    });
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Descri\xE7\xE3o *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 270);
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Valor de venda (R$) *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 271);
    \u0275\u0275listener("input", function DashboardComponent_Conditional_69_Template_input_input_13_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onValorVendaInput($event.target.value));
    })("blur", function DashboardComponent_Conditional_69_Template_input_blur_13_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onValorVendaBlur());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15, "Estoque *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 272);
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div", 273)(20, "input", 274);
    \u0275\u0275listener("change", function DashboardComponent_Conditional_69_Template_input_change_20_listener($event) {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileProdutoSelectedModal($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span", 275);
    \u0275\u0275text(22, "IMAGEM");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(23, DashboardComponent_Conditional_69_Conditional_23_Template, 2, 0, "p", 276)(24, DashboardComponent_Conditional_69_Conditional_24_Template, 2, 1, "p", 277);
    \u0275\u0275elementStart(25, "div", 278)(26, "button", 279);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_69_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r41);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormProduto());
    });
    \u0275\u0275text(27, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 280);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.produtoEditId() != null ? "Editar Produto" : "Novo Produto");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.produtoForm);
    \u0275\u0275advance(6);
    \u0275\u0275property("value", ctx_r2.valorVendaMask());
    \u0275\u0275advance(10);
    \u0275\u0275conditional(((tmp_5_0 = ctx_r2.produtoForm.get("imagem")) == null ? null : tmp_5_0.value) ? 23 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.produtoErro() ? 24 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.produtoSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.produtoSalvando() ? "Salvando..." : "Salvar");
  }
}
function DashboardComponent_Conditional_70_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 251);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.servicoErro());
  }
}
function DashboardComponent_Conditional_70_For_28_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 256);
  }
  if (rf & 2) {
    const s_r44 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r2.servicoImagemUrl(s_r44), \u0275\u0275sanitizeUrl)("alt", s_r44.descricao || "Servi\xE7o");
  }
}
function DashboardComponent_Conditional_70_For_28_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 257);
    \u0275\u0275element(1, "i", 10);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_70_For_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 130);
    \u0275\u0275template(2, DashboardComponent_Conditional_70_For_28_Conditional_2_Template, 1, 2, "img", 256)(3, DashboardComponent_Conditional_70_For_28_Conditional_3_Template, 2, 0, "span", 257);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 258);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 259)(10, "button", 260);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_70_For_28_Template_button_click_10_listener() {
      const s_r44 = \u0275\u0275restoreView(_r43).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirModalEditarServico(s_r44));
    });
    \u0275\u0275element(11, "i", 261);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 262);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_70_For_28_Template_button_click_12_listener() {
      const s_r44 = \u0275\u0275restoreView(_r43).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.excluirServico(s_r44));
    });
    \u0275\u0275element(13, "i", 263);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const s_r44 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.servicoImagemUrl(s_r44) ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(s_r44.descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBindV(8, 3, \u0275\u0275pureFunction1(9, _c0, s_r44.valor)));
  }
}
function DashboardComponent_Conditional_70_ForEmpty_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 282);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.searchServicoModal().trim() ? "Nenhum servi\xE7o encontrado." : "Nenhum servi\xE7o cadastrado.");
  }
}
function DashboardComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 242);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_70_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalServicos());
    });
    \u0275\u0275elementStart(1, "div", 243);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_70_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r42);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 244)(3, "h3");
    \u0275\u0275text(4, "Servi\xE7os");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 245);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_70_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalServicos());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 246)(8, "div", 247);
    \u0275\u0275element(9, "i", 33);
    \u0275\u0275elementStart(10, "input", 281);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_70_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchServicoModal.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 249);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_70_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r42);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalNovoServico());
    });
    \u0275\u0275element(12, "i", 250);
    \u0275\u0275text(13, " Cadastrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, DashboardComponent_Conditional_70_Conditional_14_Template, 2, 1, "p", 251);
    \u0275\u0275elementStart(15, "div", 252)(16, "table", 253)(17, "thead")(18, "tr");
    \u0275\u0275element(19, "th", 86);
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Descri\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th", 254);
    \u0275\u0275text(23, "Valor");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th", 255);
    \u0275\u0275text(25, "A\xE7\xF5es");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(26, "tbody");
    \u0275\u0275repeaterCreate(27, DashboardComponent_Conditional_70_For_28_Template, 14, 11, "tr", null, _forTrack0, false, DashboardComponent_Conditional_70_ForEmpty_29_Template, 3, 1, "tr");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r2.searchServicoModal());
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.servicoErro() && !ctx_r2.servicoFormModalOpen() ? 14 : -1);
    \u0275\u0275advance(13);
    \u0275\u0275repeater(ctx_r2.servicosFiltrados());
  }
}
function DashboardComponent_Conditional_71_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 276);
    \u0275\u0275text(1, "Imagem selecionada");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_71_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.servicoErro());
  }
}
function DashboardComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 265);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_71_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormServico());
    });
    \u0275\u0275elementStart(1, "div", 266);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_71_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r45);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 267)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 268);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_71_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormServico());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 269);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_71_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarServico());
    });
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Descri\xE7\xE3o *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 283);
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Valor (R$) *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 284);
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15, "Imagem");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 273)(17, "input", 274);
    \u0275\u0275listener("change", function DashboardComponent_Conditional_71_Template_input_change_17_listener($event) {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileServicoSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 285);
    \u0275\u0275text(19, "Enviar imagem");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, DashboardComponent_Conditional_71_Conditional_20_Template, 2, 0, "p", 276)(21, DashboardComponent_Conditional_71_Conditional_21_Template, 2, 1, "p", 277);
    \u0275\u0275elementStart(22, "div", 278)(23, "button", 279);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_71_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r45);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalFormServico());
    });
    \u0275\u0275text(24, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 280);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.servicoEditId() != null ? "Editar Servi\xE7o" : "Novo Servi\xE7o");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.servicoForm);
    \u0275\u0275advance(13);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r2.servicoForm.get("imagem")) == null ? null : tmp_4_0.value) ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.servicoErro() ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.servicoSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.servicoSalvando() ? "Salvando..." : "Salvar");
  }
}
function DashboardComponent_Conditional_72_For_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td");
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 294)(10, "button", 295);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_72_For_34_Template_button_click_10_listener() {
      const a_r48 = \u0275\u0275restoreView(_r47).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirModalEditarAgendamento(a_r48));
    });
    \u0275\u0275element(11, "i", 261);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 296);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_72_For_34_Template_button_click_12_listener() {
      const a_r48 = \u0275\u0275restoreView(_r47).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.excluirAgendamento(a_r48));
    });
    \u0275\u0275element(13, "i", 263);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r48 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r48.nomeCliente || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r48.servico_descricao || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r48.cabeleireiro || "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatarDataHoraAgenda(a_r48.data_hora));
  }
}
function DashboardComponent_Conditional_72_ForEmpty_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 264);
    \u0275\u0275text(2, "Nenhum agendamento no m\xEAs.");
    \u0275\u0275elementEnd()();
  }
}
function DashboardComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r46 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 242);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_72_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAgenda());
    });
    \u0275\u0275elementStart(1, "div", 286);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_72_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r46);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 244)(3, "h3");
    \u0275\u0275text(4, "Agenda");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 245);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_72_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalAgenda());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 287)(8, "div", 247);
    \u0275\u0275element(9, "i", 33);
    \u0275\u0275elementStart(10, "input", 288);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_72_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.agendaSearchCliente.set($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 289)(12, "label");
    \u0275\u0275text(13, "M\xEAs");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 290);
    \u0275\u0275listener("ngModelChange", function DashboardComponent_Conditional_72_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.agendaModalMes.set($event);
      return \u0275\u0275resetView(ctx_r2.carregarAgendaModal());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 249);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_72_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r46);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.abrirModalNovoAgendamento());
    });
    \u0275\u0275element(16, "i", 250);
    \u0275\u0275text(17, " Cadastrar ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 291)(19, "table", 292)(20, "thead")(21, "tr")(22, "th");
    \u0275\u0275text(23, "Cliente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "Servi\xE7o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th");
    \u0275\u0275text(27, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th");
    \u0275\u0275text(29, "Data/Hora");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th", 293);
    \u0275\u0275text(31, "A\xC7\xD5ES");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "tbody");
    \u0275\u0275repeaterCreate(33, DashboardComponent_Conditional_72_For_34_Template, 14, 4, "tr", null, _forTrack0, false, DashboardComponent_Conditional_72_ForEmpty_35_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("ngModel", ctx_r2.agendaSearchCliente());
    \u0275\u0275advance(4);
    \u0275\u0275property("ngModel", ctx_r2.agendaModalMes());
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r2.agendaListaFiltrada());
  }
}
function DashboardComponent_Conditional_73_For_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 301);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r50 = ctx.$implicit;
    \u0275\u0275property("ngValue", s_r50.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", s_r50.descricao, " \u2014 ", \u0275\u0275pipeBindV(2, 3, \u0275\u0275pureFunction1(9, _c0, s_r50.valor)), "");
  }
}
function DashboardComponent_Conditional_73_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 301);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r51 = ctx.$implicit;
    \u0275\u0275property("ngValue", c_r51.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r51.nome);
  }
}
function DashboardComponent_Conditional_73_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.agendamentoErro());
  }
}
function DashboardComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 265);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_73_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNovoAgendamento());
    });
    \u0275\u0275elementStart(1, "div", 266);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_73_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r49);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 267)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 268);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_73_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNovoAgendamento());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "form", 269);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_73_Template_form_ngSubmit_7_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.salvarAgendamento());
    });
    \u0275\u0275elementStart(8, "label");
    \u0275\u0275text(9, "Cliente *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 297);
    \u0275\u0275elementStart(11, "label");
    \u0275\u0275text(12, "Data *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 298);
    \u0275\u0275elementStart(14, "label");
    \u0275\u0275text(15, "Hora *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 299);
    \u0275\u0275elementStart(17, "label");
    \u0275\u0275text(18, "Servi\xE7o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "select", 300)(20, "option", 301);
    \u0275\u0275text(21, "\u2014 Selecionar \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(22, DashboardComponent_Conditional_73_For_23_Template, 3, 11, "option", 301, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "label");
    \u0275\u0275text(25, "Cabeleireiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "select", 302)(27, "option", 301);
    \u0275\u0275text(28, "\u2014 Selecionar \u2014");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(29, DashboardComponent_Conditional_73_For_30_Template, 2, 2, "option", 301, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "label");
    \u0275\u0275text(32, "Observa\xE7\xE3o");
    \u0275\u0275elementEnd();
    \u0275\u0275element(33, "input", 303);
    \u0275\u0275template(34, DashboardComponent_Conditional_73_Conditional_34_Template, 2, 1, "p", 277);
    \u0275\u0275elementStart(35, "div", 278)(36, "button", 279);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_73_Template_button_click_36_listener() {
      \u0275\u0275restoreView(_r49);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalNovoAgendamento());
    });
    \u0275\u0275text(37, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 280);
    \u0275\u0275text(39);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.agendaEditId() ? "Editar agendamento" : "Novo agendamento");
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r2.agendamentoForm);
    \u0275\u0275advance(13);
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.servicosListAgenda());
    \u0275\u0275advance(5);
    \u0275\u0275property("ngValue", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.cabeleireiros());
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r2.agendamentoErro() ? 34 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.agendamentoSalvando());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.agendamentoSalvando() ? "Salvando..." : "Salvar");
  }
}
function DashboardComponent_Conditional_74_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 310);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r53);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirConfigDadosPessoais());
    });
    \u0275\u0275element(1, "i", 224);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Dados Pessoais");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "i", 165);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 310);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Conditional_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r53);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.abrirConfigSegurancaSenha());
    });
    \u0275\u0275element(6, "i", 311);
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8, "Seguran\xE7a e Senha");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "i", 165);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_74_Conditional_9_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configDadosErro());
  }
}
function DashboardComponent_Conditional_74_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 309)(1, "button", 312);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Conditional_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r54);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275element(2, "i", 313);
    \u0275\u0275text(3, " Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5, "Dados Pessoais");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 135);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_74_Conditional_9_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r54);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.salvarConfigDadosPessoais());
    });
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "Nome *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 314);
    \u0275\u0275elementStart(10, "p", 315);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 315);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, DashboardComponent_Conditional_74_Conditional_9_Conditional_14_Template, 2, 1, "p", 277);
    \u0275\u0275elementStart(15, "div", 278)(16, "button", 279);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Conditional_9_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r54);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275text(17, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 280);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r2.configDadosForm);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Login: ", ctx_r2.configUsuarioLogin(), "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Perfil: ", ctx_r2.configUsuarioPerfil(), "");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.configDadosErro() ? 14 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.configDadosLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configDadosLoading() ? "Salvando..." : "Salvar");
  }
}
function DashboardComponent_Conditional_74_Conditional_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 277);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configSenhaErro());
  }
}
function DashboardComponent_Conditional_74_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 309)(1, "button", 312);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275element(2, "i", 313);
    \u0275\u0275text(3, " Voltar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h4");
    \u0275\u0275text(5, "Seguran\xE7a e Senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "form", 135);
    \u0275\u0275listener("ngSubmit", function DashboardComponent_Conditional_74_Conditional_10_Template_form_ngSubmit_6_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.salvarConfigSenha());
    });
    \u0275\u0275elementStart(7, "label");
    \u0275\u0275text(8, "Senha atual *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(9, "input", 316);
    \u0275\u0275elementStart(10, "label");
    \u0275\u0275text(11, "Nova senha *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 317);
    \u0275\u0275elementStart(13, "label");
    \u0275\u0275text(14, "Confirmar nova senha *");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 318);
    \u0275\u0275template(16, DashboardComponent_Conditional_74_Conditional_10_Conditional_16_Template, 2, 1, "p", 277);
    \u0275\u0275elementStart(17, "div", 278)(18, "button", 279);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Conditional_10_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r55);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.configVoltarMenu());
    });
    \u0275\u0275text(19, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 280);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275property("formGroup", ctx_r2.configSenhaForm);
    \u0275\u0275advance(10);
    \u0275\u0275conditional(ctx_r2.configSenhaErro() ? 16 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r2.configSenhaLoading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.configSenhaLoading() ? "Alterando..." : "Alterar senha");
  }
}
function DashboardComponent_Conditional_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 304);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalConfiguracoes());
    })("keydown.escape", function DashboardComponent_Conditional_74_Template_div_keydown_escape_0_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalConfiguracoes());
    });
    \u0275\u0275elementStart(1, "div", 305);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r52);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 306)(3, "h3");
    \u0275\u0275text(4, "Configura\xE7\xF5es");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 307);
    \u0275\u0275listener("click", function DashboardComponent_Conditional_74_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r52);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fecharModalConfiguracoes());
    });
    \u0275\u0275element(6, "i", 116);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 308);
    \u0275\u0275template(8, DashboardComponent_Conditional_74_Conditional_8_Template, 10, 0)(9, DashboardComponent_Conditional_74_Conditional_9_Template, 20, 6, "div", 309)(10, DashboardComponent_Conditional_74_Conditional_10_Template, 22, 4, "div", 309);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r2.configSubView() === "menu" ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.configSubView() === "dados" ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.configSubView() === "senha" ? 10 : -1);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(auth, api, fb) {
    this.auth = auth;
    this.api = api;
    this.fb = fb;
    this.user = this.auth.user;
    this.dashboard = signal(null);
    this.receitaDia = signal(0);
    this.percentualDia = signal(null);
    this.saldoCaixa = signal(0);
    this.caixaAberto = signal(null);
    this.agendamentosHoje = signal([]);
    this.notificacoes = signal([]);
    this.notificacoesModalOpen = signal(false);
    this.notificacoesCarregando = signal(false);
    this.recebimentoNotificacao = signal(null);
    this.recebimentoModalOpen = signal(false);
    this.tipoPagamentoRecebimento = signal("DINHEIRO");
    this.recebimentoCarregando = signal(false);
    this.recebimentoErro = signal("");
    this.recebimentoIntervalId = null;
    this.ultimoRecebimentoNotificacaoId = null;
    this.loading = signal(true);
    this.dashboardGrafico = signal(null);
    this.chartPeriodo = signal(15);
    this.chartDataInicio = signal("");
    this.chartDataFim = signal("");
    this.chartFiltroOpen = signal(false);
    this.produtosEstoque = signal([]);
    this.searchProduto = signal("");
    this.estimativaPeriodo = signal(15);
    this.atendimentosDiaModalOpen = signal(false);
    this.dataSelecionadaAtendimentos = signal("");
    this.listaAtendimentosDia = signal([]);
    this.carregandoAtendimentosDia = signal(false);
    this.atendimentoExpandidoId = signal(null);
    this.detalheAtendimentoMap = signal({});
    this.carregandoDetalheId = signal(null);
    this.filterPanelOpen = signal(false);
    this.cabeleireiros = signal([]);
    this.atendimentosFiltrados = signal([]);
    this.profFiltroOpen = signal(false);
    this.dashboardCabeleireiros = signal(null);
    this.profFiltroCarregando = signal(false);
    this.modalVerTodosCabeleireirosOpen = signal(false);
    this.agendaFiltroOpen = signal(false);
    this.agendaLista = signal([]);
    this.agendaListaMesAtual = signal([]);
    this.agendaListaCard = computed(() => this.agendaLista().slice(0, 5));
    this.agendaModalOpen = signal(false);
    this.agendaCalendarMes = signal(format(/* @__PURE__ */ new Date(), "yyyy-MM"));
    this.agendaListaCalendario = signal([]);
    this.agendaDiaSelecionado = signal(null);
    this.modalProdutosOpen = signal(false);
    this.searchProdutoModal = signal("");
    this.produtosListModal = signal([]);
    this.produtoEditId = signal(null);
    this.produtoFormModalOpen = signal(false);
    this.produtoSalvando = signal(false);
    this.produtoErro = signal("");
    this.valorVendaMask = signal("");
    this.modalServicosOpen = signal(false);
    this.searchServicoModal = signal("");
    this.servicosList = signal([]);
    this.servicoEditId = signal(null);
    this.servicoFormModalOpen = signal(false);
    this.servicoSalvando = signal(false);
    this.servicoErro = signal("");
    this.modalAgendaOpen = signal(false);
    this.agendaModalMes = signal(format(/* @__PURE__ */ new Date(), "yyyy-MM"));
    this.agendaSearchCliente = signal("");
    this.agendaListaModal = signal([]);
    this.modalNovoAgendamentoOpen = signal(false);
    this.agendaEditId = signal(null);
    this.clientesList = signal([]);
    this.servicosListAgenda = signal([]);
    this.agendamentoSalvando = signal(false);
    this.agendamentoErro = signal("");
    this.configModalOpen = signal(false);
    this.configSubView = signal("menu");
    this.configDadosLoading = signal(false);
    this.configDadosErro = signal("");
    this.configSenhaLoading = signal(false);
    this.configSenhaErro = signal("");
    this.configUsuarioLogin = signal("");
    this.configUsuarioPerfil = signal("");
    this.avatarUploading = signal(false);
    this.diasComAgendamento = computed(() => {
      const list = this.agendaListaCalendario();
      const set = /* @__PURE__ */ new Set();
      list.forEach((a) => {
        if (a.data_hora) {
          try {
            const d = typeof a.data_hora === "string" ? parseISO(a.data_hora) : new Date(a.data_hora);
            set.add(format(d, "yyyy-MM-dd"));
          } catch {
          }
        }
      });
      return set;
    });
    this.agendaCalendarioDias = computed(() => {
      const mesStr = this.agendaCalendarMes();
      const [y, m] = mesStr.split("-").map(Number);
      const inicio = startOfMonth(new Date(y, m - 1, 1));
      const fim = endOfMonth(inicio);
      const primeiroDia = getDay(inicio);
      const diasNoMes = fim.getDate();
      const inicioGrid = subDays(inicio, primeiroDia);
      const totalCells = Math.ceil((primeiroDia + diasNoMes) / 7) * 7;
      const dias = [];
      for (let i = 0; i < totalCells; i++) {
        const d = new Date(inicioGrid.getFullYear(), inicioGrid.getMonth(), inicioGrid.getDate() + i);
        dias.push({
          data: d,
          dia: d.getDate(),
          isCurrentMonth: isSameMonth(d, inicio),
          dataStr: format(d, "yyyy-MM-dd")
        });
      }
      return dias;
    });
    this.agendaCalendarioTitulo = computed(() => {
      const mesStr = this.agendaCalendarMes();
      const [y, m] = mesStr.split("-").map(Number);
      const d = new Date(y, m - 1, 1);
      return format(d, "MMMM yyyy", { locale: pt_BR_default });
    });
    this.agendamentosDoDiaSelecionado = computed(() => {
      const dataStr = this.agendaDiaSelecionado();
      if (!dataStr)
        return [];
      const list = this.agendaListaCalendario();
      const filtrados = list.filter((a) => {
        if (!a.data_hora)
          return false;
        try {
          const d = typeof a.data_hora === "string" ? parseISO(a.data_hora) : new Date(a.data_hora);
          return format(d, "yyyy-MM-dd") === dataStr;
        } catch {
          return false;
        }
      });
      return filtrados.slice().sort((a, b) => {
        const da = a.data_hora ? typeof a.data_hora === "string" ? parseISO(a.data_hora).getTime() : new Date(a.data_hora).getTime() : 0;
        const db = b.data_hora ? typeof b.data_hora === "string" ? parseISO(b.data_hora).getTime() : new Date(b.data_hora).getTime() : 0;
        return da - db;
      });
    });
    this.agendaDiaSelecionadoFormatado = computed(() => {
      const dataStr = this.agendaDiaSelecionado();
      if (!dataStr)
        return "";
      try {
        const d = parseISO(dataStr);
        return format(d, "dd/MM/yyyy", { locale: pt_BR_default });
      } catch {
        return dataStr;
      }
    });
    this.produtosFiltradosModal = computed(() => {
      const lista = this.produtosListModal();
      const q = this.searchProdutoModal().trim().toLowerCase();
      if (!q)
        return lista;
      return lista.filter((p) => (p.descricao ?? "").toLowerCase().includes(q));
    });
    this.servicosFiltrados = computed(() => {
      const lista = this.servicosList();
      const q = this.searchServicoModal().trim().toLowerCase();
      if (!q)
        return lista;
      return lista.filter((s) => (s.descricao ?? "").toLowerCase().includes(q));
    });
    this.agendaListaFiltrada = computed(() => {
      const lista = this.agendaListaModal();
      const q = this.agendaSearchCliente().trim().toLowerCase();
      if (!q)
        return lista;
      return lista.filter((a) => (a.nomeCliente ?? "").toLowerCase().includes(q));
    });
    this.ESTOQUE_BAIXO_LIMITE = 5;
    this.produtosEstoqueFiltrados = computed(() => {
      const lista = this.produtosEstoque();
      const q = this.searchProduto().trim().toLowerCase();
      const filtrada = q ? lista.filter((p) => (p.descricao ?? "").toLowerCase().includes(q)) : [...lista];
      return filtrada.sort((a, b) => {
        const aBaixo = (a.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE ? 1 : 0;
        const bBaixo = (b.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE ? 1 : 0;
        if (aBaixo !== bBaixo)
          return bBaixo - aBaixo;
        return (a.estoque ?? 0) - (b.estoque ?? 0);
      });
    });
    this.saudacao = computed(() => {
      const h = (/* @__PURE__ */ new Date()).getHours();
      if (h < 12)
        return "Bom dia";
      if (h < 18)
        return "Boa tarde";
      return "Boa noite";
    });
    this.nomeUsuario = computed(() => this.user()?.nome?.split(" ")[0] ?? "Usu\xE1rio");
    this.cargoUsuario = computed(() => {
      const p = this.user()?.perfil ?? "";
      if (p === "ADMIN" || p === "DONO")
        return "Administrador";
      if (p === "RECEPCIONISTA" || p === "RECEPCAO")
        return "Recepcionista";
      if (p === "CABELEIREIRO")
        return "Cabeleireiro";
      return p || "Usu\xE1rio";
    });
    this.receitaDiariaValor = computed(() => {
      const saldo = this.saldoCaixa();
      const rec = this.receitaDia();
      return saldo > 0 ? saldo : rec;
    });
    this.notificacoesNaoLidas = computed(() => this.notificacoes().filter((n) => !n.lido));
    this.clientesEmEspera = computed(() => this.dashboard()?.em_espera ?? 0);
    this.valorAberturaCaixa = computed(() => this.caixaAberto()?.valor_abertura ?? 0);
    this.totalAgendamentosMes = computed(() => this.agendaListaMesAtual().length);
    this.alertasEstoque = computed(() => {
      const not = this.notificacoes().filter((n) => n.tipo?.toLowerCase().includes("estoque") || n.titulo?.toLowerCase().includes("estoque"));
      return not.length > 0 ? not.length : 0;
    });
    this.alertasEstoqueTexto = computed(() => {
      const n = this.alertasEstoque();
      return n === 0 ? "Nenhum alerta" : n === 1 ? "01 Item" : `${String(n).padStart(2, "0")} Itens`;
    });
    this.graficoDados = computed(() => {
      const d = this.dashboardGrafico();
      if (!d?.grafico?.length)
        return [];
      return d.grafico;
    });
    this.fluxoCaixaTotal = computed(() => {
      const g = this.graficoDados();
      return g.reduce((s, i) => s + (i.valor || 0), 0);
    });
    this.mediaDiariaFaturamento = computed(() => {
      const total = this.fluxoCaixaTotal();
      const dias = this.chartPeriodo() || 1;
      return total / dias;
    });
    this.estimativaValor = computed(() => {
      const media = this.mediaDiariaFaturamento();
      const dias = this.estimativaPeriodo();
      return media * dias;
    });
    this.estimativaChartBars = computed(() => {
      const dados = this.graficoDados();
      const w = 200;
      const h = 70;
      const pad = { top: 8, right: 8, bottom: 18, left: 8 };
      const innerW = w - pad.left - pad.right;
      const innerH = h - pad.top - pad.bottom;
      if (dados.length === 0)
        return [];
      const max = Math.max(...dados.map((d) => d.valor), 1);
      const n = dados.length;
      const gap = 2;
      const barWidth = Math.max(1, (innerW - (n - 1) * gap) / n);
      const baseY = h - pad.bottom;
      return dados.map((d, i) => {
        const barHeight = d.valor / max * innerH;
        const x = pad.left + i * (barWidth + gap);
        const y = baseY - barHeight;
        return { x, y, width: barWidth, height: barHeight, valor: d.valor, index: i };
      });
    });
    this.estimativaChartWidth = 200;
    this.estimativaChartHeight = 70;
    this.pieColors = ["#ff9000", "#e67e22", "#d35400", "#b8860b", "#8b6914", "#6b5344"];
    this.pieSlices = computed(() => {
      const ranking = this.dashboardGrafico()?.ranking ?? [];
      const list = ranking.slice(0, 6).filter((r2) => (r2.total ?? 0) > 0);
      const total = list.reduce((s, r2) => s + (r2.total ?? 0), 0);
      if (total === 0)
        return [];
      const cx = 100;
      const cy = 100;
      const r = 70;
      let startAngle = -Math.PI / 2;
      return list.map((item, i) => {
        const value = item.total ?? 0;
        const percent = total > 0 ? value / total * 100 : 0;
        const sweepAngle = percent / 100 * 2 * Math.PI;
        const endAngle = startAngle + sweepAngle;
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        const largeArc = percent > 50 ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
        startAngle = endAngle;
        return {
          label: item.nome ?? "\u2014",
          value,
          percent,
          color: this.pieColors[i % this.pieColors.length],
          path
        };
      });
    });
    this.rankingProfissionais = computed(() => {
      const source = this.dashboardCabeleireiros() ?? this.dashboard();
      const r = source?.ranking ?? [];
      return r.slice(0, 5).map((item) => ({
        nome: item.nome,
        atendimentos: item.atendimentos ?? 0,
        total: item.total ?? 0
      }));
    });
    this.rankingProfissionaisCompleto = computed(() => {
      const source = this.dashboardCabeleireiros() ?? this.dashboard();
      const r = source?.ranking ?? [];
      const rankingMap = /* @__PURE__ */ new Map();
      r.forEach((item) => {
        const nome = (item.nome ?? "").trim();
        if (nome)
          rankingMap.set(nome, { atendimentos: item.atendimentos ?? 0, total: item.total ?? 0 });
      });
      const cabList = this.cabeleireiros();
      if (cabList.length === 0)
        return r.map((item) => ({ nome: item.nome ?? "", atendimentos: item.atendimentos ?? 0, total: item.total ?? 0 }));
      return cabList.map((c) => {
        const nome = (c.nome ?? "").trim();
        const dados = rankingMap.get(nome);
        return {
          nome: nome || "Sem nome",
          atendimentos: dados?.atendimentos ?? 0,
          total: dados?.total ?? 0
        };
      });
    });
    this.rankingMax = computed(() => {
      const r = this.rankingProfissionais();
      if (r.length === 0)
        return 1;
      return Math.max(...r.map((x) => x.total), 1);
    });
    this.atividadeRecente = computed(() => {
      const d = this.dashboard()?.atividade_recente ?? [];
      if (d.length > 0) {
        return d.slice(0, 5).map((a) => ({
          texto: `Venda - R$ ${(a.valor ?? 0).toFixed(2).replace(".", ",")} \u2022 ${a.nome ?? ""}`,
          cor: "green",
          tempo: this.formatarTempoAtras(a.data)
        }));
      }
      const not = this.notificacoes().slice(0, 5);
      return not.map((n) => ({
        texto: n.titulo + (n.subtitulo ? ` \u2022 ${n.subtitulo}` : ""),
        cor: "orange",
        tempo: n.tempo_atras ?? ""
      }));
    });
    this.agendaHojeLista = computed(() => this.agendamentosHoje().slice(0, 5));
    this.chartWidth = 380;
    this.chartHeight = 140;
    this.chartPadding = { top: 20, right: 16, bottom: 24, left: 16 };
    this.chartBars = computed(() => {
      const dados = this.graficoDados();
      const w = this.chartWidth;
      const h = this.chartHeight;
      const pad = this.chartPadding;
      const innerW = w - pad.left - pad.right;
      const innerH = h - pad.top - pad.bottom;
      if (dados.length === 0)
        return [];
      const max = Math.max(...dados.map((d) => d.valor), 1);
      const n = dados.length;
      const gap = 4;
      const barWidth = Math.max(2, (innerW - (n - 1) * gap) / n);
      const baseY = h - pad.bottom;
      return dados.map((d, i) => {
        const barHeight = d.valor / max * innerH;
        const x = pad.left + i * (barWidth + gap);
        const y = baseY - barHeight;
        return { x, y, width: barWidth, height: barHeight, valor: d.valor, index: i };
      });
    });
    this.chartGridLines = computed(() => {
      const h = this.chartHeight;
      const pad = this.chartPadding;
      const innerH = h - pad.top - pad.bottom;
      const count = 4;
      const lines = [];
      for (let i = 1; i <= count; i++) {
        lines.push(pad.top + innerH * i / (count + 1));
      }
      return lines;
    });
    const hoje = /* @__PURE__ */ new Date();
    const quinzeDiasAtras = subDays(hoje, 14);
    this.chartDataInicio.set(format(quinzeDiasAtras, "yyyy-MM-dd"));
    this.chartDataFim.set(format(hoje, "yyyy-MM-dd"));
    const trintaDiasAtras = subDays(hoje, 29);
    this.filterForm = this.fb.group({
      data_inicio: [format(trintaDiasAtras, "yyyy-MM-dd")],
      data_fim: [format(hoje, "yyyy-MM-dd")],
      status: [""],
      id_cabeleireiro: [""]
    });
    this.agendaFiltroForm = this.fb.group({
      mes: [format(hoje, "yyyy-MM")],
      id_cabeleireiro: [""],
      status: [""]
    });
    this.profFiltroForm = this.fb.group({
      mes: [format(hoje, "yyyy-MM")],
      id_cabeleireiro: [""]
    });
    this.produtoForm = this.fb.group({
      descricao: ["", Validators.required],
      valor_venda: [0, [Validators.required, Validators.min(0)]],
      estoque: [0, [Validators.required, Validators.min(0)]],
      imagem: [""]
    });
    this.servicoForm = this.fb.group({
      descricao: ["", Validators.required],
      valor: [0, [Validators.required, Validators.min(0)]],
      imagem: [""]
    });
    const hojeStr = format(hoje, "yyyy-MM-dd");
    this.agendamentoForm = this.fb.group({
      nome_cliente: ["", Validators.required],
      data: [hojeStr, Validators.required],
      hora: ["09:00", Validators.required],
      id_servico: [null],
      id_cabeleireiro: [null],
      observacao: [""],
      id_cliente: [null]
      // usado na edição (PATCH)
    });
    this.configDadosForm = this.fb.group({
      nome: [this.auth.user()?.nome ?? "", Validators.required]
    });
    this.configSenhaForm = this.fb.group({
      senha_atual: ["", Validators.required],
      nova_senha: ["", [Validators.required, Validators.minLength(4)]],
      confirmar: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.carregarTudo();
    this.carregarGraficoAtendimentos();
    this.carregarCabeleireiros();
    this.carregarAgenda();
    this.carregarProdutos();
    this.iniciarMonitorRecebimentos();
  }
  ngOnDestroy() {
    if (this.recebimentoIntervalId) {
      clearInterval(this.recebimentoIntervalId);
      this.recebimentoIntervalId = null;
    }
  }
  toggleAgendaFiltro() {
    this.agendaFiltroOpen.update((v) => !v);
  }
  toggleProfFiltro() {
    this.profFiltroOpen.update((v) => !v);
  }
  abrirModalVerTodosCabeleireiros() {
    this.modalVerTodosCabeleireirosOpen.set(true);
  }
  fecharModalVerTodosCabeleireiros() {
    this.modalVerTodosCabeleireirosOpen.set(false);
  }
  /** Aplica filtro do painel Cabeleireiros: mês e cabeleireiro, e recarrega ranking */
  aplicarProfFiltro() {
    const v = this.profFiltroForm.value;
    const mes = v.mes || format(/* @__PURE__ */ new Date(), "yyyy-MM");
    const idCabeleireiro = v.id_cabeleireiro ? String(v.id_cabeleireiro) : "";
    this.profFiltroCarregando.set(true);
    const params = { mes };
    if (idCabeleireiro)
      params["id_cabeleireiro"] = idCabeleireiro;
    this.api.get("/admin/dashboard", params).subscribe({
      next: (data) => {
        this.dashboardCabeleireiros.set(data);
        this.profFiltroCarregando.set(false);
        this.profFiltroOpen.set(false);
      },
      error: () => this.profFiltroCarregando.set(false)
    });
  }
  openAgendaModal() {
    this.agendaCalendarMes.set(format(/* @__PURE__ */ new Date(), "yyyy-MM"));
    this.carregarAgendaCalendario();
    this.agendaModalOpen.set(true);
  }
  closeAgendaModal() {
    this.agendaModalOpen.set(false);
    this.agendaDiaSelecionado.set(null);
  }
  /** Carrega agendamentos do mês para o calendário (dias em verde) */
  carregarAgendaCalendario() {
    const mes = this.agendaCalendarMes();
    this.api.get("/agendamentos/agenda", { mes }).subscribe({
      next: (list) => this.agendaListaCalendario.set(list ?? []),
      error: () => this.agendaListaCalendario.set([])
    });
  }
  /** Navega o mês do calendário (delta: -1 ou 1) */
  navegarMesCalendario(delta) {
    const [y, m] = this.agendaCalendarMes().split("-").map(Number);
    const d = new Date(y, m - 1, 1);
    const novo = delta < 0 ? subMonths(d, 1) : addMonths(d, 1);
    this.agendaCalendarMes.set(format(novo, "yyyy-MM"));
    this.carregarAgendaCalendario();
  }
  /** Retorna se a data (Date) tem agendamento */
  diaTemAgendamento(data) {
    return this.diasComAgendamento().has(format(data, "yyyy-MM-dd"));
  }
  selecionarDiaCalendario(data, isCurrentMonth) {
    if (!isCurrentMonth)
      return;
    this.agendaDiaSelecionado.set(format(data, "yyyy-MM-dd"));
  }
  fecharDiaSelecionado() {
    this.agendaDiaSelecionado.set(null);
  }
  carregarAgenda() {
    const v = this.agendaFiltroForm.value;
    const params = {};
    params["mes"] = v.mes || format(/* @__PURE__ */ new Date(), "yyyy-MM");
    if (v.id_cabeleireiro)
      params["id_cabeleireiro"] = String(v.id_cabeleireiro);
    if (v.status)
      params["status"] = v.status;
    this.api.get("/agendamentos/agenda", params).subscribe({
      next: (list) => this.agendaLista.set(list ?? []),
      error: () => this.agendaLista.set([])
    });
  }
  aplicarAgendaFiltro() {
    this.carregarAgenda();
    this.agendaFiltroOpen.set(false);
  }
  // —— Sidebar: abrir modais ——
  abrirModalProdutos() {
    this.modalProdutosOpen.set(true);
    this.searchProdutoModal.set("");
    this.produtoErro.set("");
    this.carregarProdutosModal();
  }
  fecharModalProdutos() {
    this.modalProdutosOpen.set(false);
  }
  carregarProdutosModal() {
    this.api.get("/produtos", { todos: "1" }).subscribe({
      next: (list) => this.produtosListModal.set(list ?? []),
      error: () => this.produtosListModal.set([])
    });
  }
  abrirModalNovoProduto() {
    this.produtoEditId.set(null);
    this.produtoForm.reset({ descricao: "", valor_venda: 0, estoque: 0, imagem: "" });
    this.valorVendaMask.set(this.formatarMoeda(0));
    this.produtoErro.set("");
    this.produtoFormModalOpen.set(true);
  }
  abrirModalEditarProduto(p) {
    this.produtoEditId.set(p.id);
    const valor = p.valor_venda ?? 0;
    this.produtoForm.patchValue({
      descricao: p.descricao ?? "",
      valor_venda: valor,
      estoque: p.estoque ?? 0,
      imagem: p.imagem ?? ""
    });
    this.valorVendaMask.set(this.formatarMoeda(valor));
    this.produtoErro.set("");
    this.produtoFormModalOpen.set(true);
  }
  fecharModalFormProduto() {
    this.produtoFormModalOpen.set(false);
    this.produtoEditId.set(null);
    this.produtoErro.set("");
  }
  formatarMoeda(val) {
    if (val == null || Number.isNaN(val))
      return "R$ 0,00";
    return "R$ " + val.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  parsearMoeda(s) {
    if (!s || typeof s !== "string")
      return 0;
    const limpo = s.replace(/\D/g, "");
    if (limpo.length === 0)
      return 0;
    return Math.round(parseInt(limpo, 10) * 100) / 1e4;
  }
  onValorVendaInput(val) {
    const num = this.parsearMoeda(val);
    this.produtoForm.patchValue({ valor_venda: num }, { emitEvent: true });
    this.valorVendaMask.set(val ? this.formatarMoeda(num) : "");
  }
  onValorVendaBlur() {
    const num = this.produtoForm.get("valor_venda")?.value ?? 0;
    this.valorVendaMask.set(this.formatarMoeda(num));
  }
  onFileProdutoSelectedModal(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    this.api.upload("/upload", file).subscribe({
      next: (res) => {
        if (res?.imagem)
          this.produtoForm.patchValue({ imagem: res.imagem });
      },
      error: () => this.produtoErro.set("Falha ao enviar imagem.")
    });
    input.value = "";
  }
  salvarProduto() {
    if (this.produtoForm.invalid) {
      this.produtoForm.markAllAsTouched();
      return;
    }
    const id = this.produtoEditId();
    const val = this.produtoForm.value;
    const payload = {
      descricao: val.descricao?.trim() ?? "",
      valor_venda: Number(val.valor_venda) ?? 0,
      estoque: Number(val.estoque) ?? 0,
      imagem: val.imagem?.trim() || void 0
    };
    this.produtoSalvando.set(true);
    this.produtoErro.set("");
    if (id != null) {
      this.api.patch(`/produtos/${id}`, payload).subscribe({
        next: () => {
          this.produtoSalvando.set(false);
          this.fecharModalFormProduto();
          this.carregarProdutosModal();
          this.carregarProdutos();
        },
        error: (err) => {
          this.produtoSalvando.set(false);
          this.produtoErro.set(err?.error?.error || "Erro ao atualizar.");
        }
      });
    } else {
      this.api.post("/produtos", payload).subscribe({
        next: () => {
          this.produtoSalvando.set(false);
          this.fecharModalFormProduto();
          this.carregarProdutosModal();
          this.carregarProdutos();
        },
        error: (err) => {
          this.produtoSalvando.set(false);
          this.produtoErro.set(err?.error?.error || "Erro ao cadastrar.");
        }
      });
    }
  }
  excluirProduto(p) {
    if (!confirm(`Excluir o produto "${p.descricao ?? "Produto"}"?`))
      return;
    this.api.delete(`/produtos/${p.id}`).subscribe({
      next: () => {
        this.carregarProdutosModal();
        this.carregarProdutos();
      },
      error: () => this.produtoErro.set("Erro ao excluir.")
    });
  }
  // —— Modal Serviços ——
  abrirModalServicos() {
    this.modalServicosOpen.set(true);
    this.searchServicoModal.set("");
    this.servicoErro.set("");
    this.carregarServicosModal();
  }
  fecharModalServicos() {
    this.modalServicosOpen.set(false);
  }
  carregarServicosModal() {
    this.api.get("/servicos", { todos: "1" }).subscribe({
      next: (list) => this.servicosList.set(list ?? []),
      error: () => this.servicosList.set([])
    });
  }
  abrirModalNovoServico() {
    this.servicoEditId.set(null);
    this.servicoForm.reset({ descricao: "", valor: 0, imagem: "" });
    this.servicoErro.set("");
    this.servicoFormModalOpen.set(true);
  }
  abrirModalEditarServico(s) {
    this.servicoEditId.set(s.id);
    this.servicoForm.patchValue({
      descricao: s.descricao ?? "",
      valor: s.valor ?? 0,
      imagem: s.imagem ?? ""
    });
    this.servicoErro.set("");
    this.servicoFormModalOpen.set(true);
  }
  fecharModalFormServico() {
    this.servicoFormModalOpen.set(false);
    this.servicoEditId.set(null);
    this.servicoErro.set("");
  }
  servicoImagemUrl(s) {
    if (!s?.imagem?.trim())
      return "";
    const img = s.imagem.trim();
    if (img.startsWith("http://") || img.startsWith("https://"))
      return img;
    const base = (environment?.apiUrl ?? "").replace(/\/api\/?$/, "") || "http://localhost:8080";
    return base + (img.startsWith("/") ? "" : "/") + img;
  }
  onFileServicoSelected(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    this.api.upload("/upload", file).subscribe({
      next: (res) => {
        if (res?.imagem)
          this.servicoForm.patchValue({ imagem: res.imagem });
      },
      error: () => this.servicoErro.set("Falha ao enviar imagem.")
    });
    input.value = "";
  }
  salvarServico() {
    if (this.servicoForm.invalid) {
      this.servicoForm.markAllAsTouched();
      return;
    }
    const id = this.servicoEditId();
    const val = this.servicoForm.value;
    const payload = {
      descricao: val.descricao?.trim() ?? "",
      valor: Number(val.valor) ?? 0,
      imagem: val.imagem?.trim() || void 0
    };
    this.servicoSalvando.set(true);
    this.servicoErro.set("");
    if (id != null) {
      this.api.patch(`/servicos/${id}`, payload).subscribe({
        next: () => {
          this.servicoSalvando.set(false);
          this.fecharModalFormServico();
          this.carregarServicosModal();
        },
        error: (err) => {
          this.servicoSalvando.set(false);
          this.servicoErro.set(err?.error?.error || "Erro ao atualizar.");
        }
      });
    } else {
      this.api.post("/servicos", payload).subscribe({
        next: () => {
          this.servicoSalvando.set(false);
          this.fecharModalFormServico();
          this.carregarServicosModal();
        },
        error: (err) => {
          this.servicoSalvando.set(false);
          this.servicoErro.set(err?.error?.error || "Erro ao cadastrar.");
        }
      });
    }
  }
  excluirServico(s) {
    if (!confirm(`Excluir o servi\xE7o "${s.descricao ?? "Servi\xE7o"}"?`))
      return;
    this.api.delete(`/servicos/${s.id}`).subscribe({
      next: () => this.carregarServicosModal(),
      error: () => this.servicoErro.set("Erro ao excluir.")
    });
  }
  // —— Modal Agenda (sidebar) ——
  abrirModalAgenda() {
    this.modalAgendaOpen.set(true);
    this.agendaSearchCliente.set("");
    this.carregarAgendaModal();
  }
  fecharModalAgenda() {
    this.modalAgendaOpen.set(false);
  }
  carregarAgendaModal() {
    const mes = this.agendaModalMes();
    this.api.get("/agendamentos/agenda", { mes }).subscribe({
      next: (list) => this.agendaListaModal.set(list ?? []),
      error: () => this.agendaListaModal.set([])
    });
  }
  abrirModalNovoAgendamento() {
    this.agendaEditId.set(null);
    this.agendamentoForm.reset({
      nome_cliente: "",
      data: format(/* @__PURE__ */ new Date(), "yyyy-MM-dd"),
      hora: "09:00",
      id_servico: null,
      id_cabeleireiro: null,
      observacao: "",
      id_cliente: null
    });
    this.agendamentoErro.set("");
    this.carregarClientesEServicosParaAgendamento();
    this.modalNovoAgendamentoOpen.set(true);
  }
  abrirModalEditarAgendamento(a) {
    const dataHora = a.data_hora ? parseISO(a.data_hora) : /* @__PURE__ */ new Date();
    this.agendaEditId.set(a.id);
    this.agendamentoForm.reset({
      nome_cliente: a.nomeCliente ?? "",
      data: format(dataHora, "yyyy-MM-dd"),
      hora: format(dataHora, "HH:mm"),
      id_servico: a.id_servico ?? null,
      id_cabeleireiro: a.id_cabeleireiro ?? null,
      observacao: a.observacao ?? "",
      id_cliente: a.id_cliente ?? null
    });
    this.agendamentoErro.set("");
    this.carregarClientesEServicosParaAgendamento();
    this.modalNovoAgendamentoOpen.set(true);
  }
  fecharModalNovoAgendamento() {
    this.modalNovoAgendamentoOpen.set(false);
    this.agendaEditId.set(null);
  }
  carregarClientesEServicosParaAgendamento() {
    this.api.get("/clientes").subscribe({
      next: (list) => this.clientesList.set(list ?? []),
      error: () => this.clientesList.set([])
    });
    this.api.get("/servicos", { todos: "1" }).subscribe({
      next: (list) => this.servicosListAgenda.set(list ?? []),
      error: () => this.servicosListAgenda.set([])
    });
  }
  salvarAgendamento() {
    if (this.agendamentoForm.invalid) {
      this.agendamentoForm.markAllAsTouched();
      return;
    }
    const val = this.agendamentoForm.value;
    const dataHoraStr = `${val.data}T${val.hora}`;
    const idServico = val.id_servico ? Number(val.id_servico) : void 0;
    const idCabeleireiro = val.id_cabeleireiro ? Number(val.id_cabeleireiro) : void 0;
    const observacao = (val.observacao ?? "").trim();
    const idEdit = this.agendaEditId();
    if (idEdit != null) {
      const idCliente = val.id_cliente ? Number(val.id_cliente) : void 0;
      this.agendamentoSalvando.set(true);
      this.agendamentoErro.set("");
      this.api.patch(`/agendamentos/${idEdit}`, {
        id_cliente: idCliente,
        data_hora: dataHoraStr,
        id_servico: idServico ?? null,
        id_cabeleireiro: idCabeleireiro ?? null,
        observacao: observacao || void 0
      }).subscribe({
        next: () => {
          this.agendamentoSalvando.set(false);
          this.fecharModalNovoAgendamento();
          this.carregarAgendaModal();
          this.carregarAgenda();
          this.carregarTudo();
        },
        error: (err) => {
          this.agendamentoSalvando.set(false);
          this.agendamentoErro.set(err?.error?.error || "Erro ao atualizar agendamento.");
        }
      });
      return;
    }
    const nomeCliente = (val.nome_cliente ?? "").trim();
    if (!nomeCliente) {
      this.agendamentoErro.set("Informe o nome do cliente.");
      return;
    }
    this.agendamentoSalvando.set(true);
    this.agendamentoErro.set("");
    const clientes = this.clientesList();
    const existente = clientes.find((c) => c.nome?.trim().toLowerCase() === nomeCliente.toLowerCase());
    const doPostAgendamento = (idCliente) => {
      this.api.post("/agendamentos", {
        id_cliente: idCliente,
        data_hora: dataHoraStr,
        id_servico: idServico || void 0,
        id_cabeleireiro: idCabeleireiro || void 0,
        observacao: observacao || void 0
      }).subscribe({
        next: () => {
          this.agendamentoSalvando.set(false);
          this.fecharModalNovoAgendamento();
          this.carregarAgendaModal();
          this.carregarAgenda();
          this.carregarTudo();
        },
        error: (err) => {
          this.agendamentoSalvando.set(false);
          this.agendamentoErro.set(err?.error?.error || "Erro ao criar agendamento.");
        }
      });
    };
    if (existente) {
      doPostAgendamento(existente.id);
      return;
    }
    this.api.post("/clientes", { nome: nomeCliente }).subscribe({
      next: (res) => {
        doPostAgendamento(res.id);
      },
      error: (err) => {
        this.agendamentoSalvando.set(false);
        this.agendamentoErro.set(err?.error?.error || "Erro ao criar cliente.");
      }
    });
  }
  excluirAgendamento(a) {
    if (!confirm("Excluir este agendamento?"))
      return;
    this.api.delete(`/agendamentos/${a.id}`).subscribe({
      next: () => {
        this.carregarAgendaModal();
        this.carregarAgenda();
        this.carregarTudo();
      },
      error: () => {
      }
    });
  }
  abrirSolicitacaoUsuarios() {
  }
  formatarDataHoraAgenda(dataHora) {
    if (!dataHora)
      return "\u2014";
    try {
      const d = parseISO(dataHora);
      return format(d, "dd/MM/yyyy HH:mm", { locale: pt_BR_default });
    } catch {
      return dataHora;
    }
  }
  /** Recarrega todos os dados do dashboard (cards, gráficos, agenda, estoque) sem recarregar a página */
  recarregarDashboard() {
    this.carregarTudo();
    this.carregarGraficoAtendimentos();
    this.carregarCabeleireiros();
    this.carregarAgenda();
    this.carregarProdutos();
  }
  carregarProdutos() {
    this.api.get("/produtos").subscribe({
      next: (list) => this.produtosEstoque.set(list ?? []),
      error: () => this.produtosEstoque.set([])
    });
  }
  isEstoqueBaixo(p) {
    return (p.estoque ?? 0) <= this.ESTOQUE_BAIXO_LIMITE;
  }
  /** URL da imagem do produto (path uploads/ ou URL absoluta) */
  produtoImagemUrl(p) {
    if (!p?.imagem?.trim())
      return "";
    const img = p.imagem.trim();
    if (img.startsWith("http://") || img.startsWith("https://"))
      return img;
    const base = (environment?.apiUrl ?? "").replace(/\/api\/?$/, "") || "http://localhost:8080";
    return base + (img.startsWith("/") ? "" : "/") + img;
  }
  carregarCabeleireiros() {
    this.api.get("/usuarios", { perfil: "CABELEIREIRO" }).subscribe({
      next: (list) => this.cabeleireiros.set(list ?? []),
      error: () => this.cabeleireiros.set([])
    });
  }
  /** Verifica se o usuário atual deve ver notificações de recebimento (recepção / dono) */
  deveMonitorarRecebimentos() {
    const perfil = this.user()?.perfil ?? "";
    return perfil === "RECEPCAO" || perfil === "RECEPCIONISTA" || perfil === "DONO" || perfil === "ADMIN";
  }
  /** Inicia o polling periódico de notificações de RECEBIMENTO para exibir toast na web */
  iniciarMonitorRecebimentos() {
    if (!this.deveMonitorarRecebimentos()) {
      return;
    }
    if (this.recebimentoIntervalId) {
      clearInterval(this.recebimentoIntervalId);
      this.recebimentoIntervalId = null;
    }
    this.verificarRecebimentosPendentes();
    this.recebimentoIntervalId = setInterval(() => {
      this.verificarRecebimentosPendentes();
    }, 15e3);
  }
  /** Busca notificações não lidas do tipo RECEBIMENTO para exibir no toast */
  verificarRecebimentosPendentes() {
    this.api.get("/notificacoes", { perfil: "RECEPCAO" }).subscribe({
      next: (list) => {
        const pendentes = (list || []).filter((n) => (n.tipo || "").toUpperCase() === "RECEBIMENTO");
        if (pendentes.length === 0) {
          return;
        }
        const maisRecente = pendentes[0];
        if (this.ultimoRecebimentoNotificacaoId === maisRecente.id) {
          return;
        }
        this.ultimoRecebimentoNotificacaoId = maisRecente.id;
        this.recebimentoNotificacao.set(maisRecente);
      },
      error: () => {
      }
    });
  }
  abrirModalRecebimento() {
    if (!this.recebimentoNotificacao()) {
      return;
    }
    this.recebimentoErro.set("");
    this.tipoPagamentoRecebimento.set("DINHEIRO");
    this.recebimentoModalOpen.set(true);
  }
  fecharModalRecebimento() {
    this.recebimentoModalOpen.set(false);
  }
  setTipoPagamentoRecebimento(tipo) {
    this.tipoPagamentoRecebimento.set(tipo);
  }
  fecharToastRecebimento(event) {
    event.stopPropagation();
    this.recebimentoNotificacao.set(null);
  }
  /** Confirma o recebimento no caixa usando a notificação selecionada */
  confirmarRecebimentoNotificacao() {
    const notif = this.recebimentoNotificacao();
    if (!notif || !notif.id_atendimento || !notif.valor) {
      return;
    }
    this.recebimentoCarregando.set(true);
    this.recebimentoErro.set("");
    this.api.post("/caixa", {
      id_atendimento: notif.id_atendimento,
      valor: notif.valor,
      tipo_pagamento: this.tipoPagamentoRecebimento()
    }).subscribe({
      next: () => {
        this.api.patch(`/notificacoes/${notif.id}/lido`, {}).subscribe({
          next: () => {
          },
          error: () => {
          }
        });
        this.recebimentoCarregando.set(false);
        this.recebimentoModalOpen.set(false);
        this.recebimentoNotificacao.set(null);
        this.recarregarDashboard();
      },
      error: (err) => {
        this.recebimentoCarregando.set(false);
        let msg = "Erro ao registrar recebimento.";
        if (err && err.error && err.error.error) {
          msg = err.error.error;
        }
        this.recebimentoErro.set(msg);
      }
    });
  }
  aplicarFiltro() {
    const v = this.filterForm.value;
    const params = {};
    if (v.data_inicio)
      params["data_inicio"] = v.data_inicio;
    if (v.data_fim)
      params["data_fim"] = v.data_fim;
    if (v.status)
      params["status"] = v.status;
    if (v.id_cabeleireiro)
      params["id_cabeleireiro"] = String(v.id_cabeleireiro);
    this.api.get("/atendimentos", params).subscribe({
      next: (list) => this.atendimentosFiltrados.set(list ?? []),
      error: () => this.atendimentosFiltrados.set([])
    });
    this.filterPanelOpen.set(false);
  }
  carregarTudo() {
    this.loading.set(true);
    const hoje = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
    this.dashboardCabeleireiros.set(null);
    this.api.get("/admin/dashboard", { periodo: "30" }).subscribe({
      next: (data) => this.dashboard.set(data),
      error: () => this.dashboard.set(null)
    });
    this.api.get("/admin/dashboard", { periodo: "1" }).subscribe({
      next: (data) => {
        this.receitaDia.set(data?.faturamento_total ?? 0);
        this.percentualDia.set(data?.percentual_vs_anterior ?? null);
      },
      error: () => {
      }
    });
    this.api.get("/caixa/saldo").subscribe({
      next: (res) => this.saldoCaixa.set(res?.saldo ?? 0),
      error: () => {
      }
    });
    this.api.get("/caixa/aberto").subscribe({
      next: (res) => this.caixaAberto.set(res && res.valor_abertura != null ? res : null),
      error: () => this.caixaAberto.set(null)
    });
    this.api.get("/agendamentos", { data: hoje }).subscribe({
      next: (list) => {
        const items = (list || []).map((a) => ({
          id: a.id,
          data_hora: a.data_hora,
          horaFormatada: format(parseISO(a.data_hora), "HH:mm"),
          clienteNome: a.cliente?.nome ?? "Cliente",
          servicoDescricao: a.servico?.descricao ?? "Servi\xE7o",
          cabeleireiroNome: a.cabeleireiro?.nome
        }));
        this.agendamentosHoje.set(items);
      },
      error: () => this.agendamentosHoje.set([])
    });
    const mesAtual = format(/* @__PURE__ */ new Date(), "yyyy-MM");
    this.api.get("/agendamentos/agenda", { mes: mesAtual }).subscribe({
      next: (list) => this.agendaListaMesAtual.set(list ?? []),
      error: () => this.agendaListaMesAtual.set([])
    });
    this.api.get("/notificacoes", { perfil: "RECEPCAO" }).subscribe({
      next: (list) => this.notificacoes.set(list || []),
      error: () => this.notificacoes.set([]),
      complete: () => this.loading.set(false)
    });
  }
  toggleChartFiltro() {
    this.chartFiltroOpen.update((v) => !v);
  }
  /** Aplica um dos períodos rápidos (15, 30, 60, 90 dias) e recarrega o gráfico */
  aplicarPeriodoGrafico(dias) {
    const fim = /* @__PURE__ */ new Date();
    const inicio = subDays(fim, dias - 1);
    this.chartPeriodo.set(dias);
    this.chartDataInicio.set(format(inicio, "yyyy-MM-dd"));
    this.chartDataFim.set(format(fim, "yyyy-MM-dd"));
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }
  /** Aplica filtro do gráfico usando as datas escolhidas (calcula período em dias) */
  aplicarFiltroGrafico() {
    const ini = this.chartDataInicio();
    const fim = this.chartDataFim();
    if (ini && fim) {
      const dIni = parseISO(ini);
      const dFim = parseISO(fim);
      const dias = Math.max(1, Math.ceil((dFim.getTime() - dIni.getTime()) / (24 * 60 * 60 * 1e3)) + 1);
      this.chartPeriodo.set(Math.min(365, Math.max(1, dias)));
    }
    this.carregarGraficoAtendimentos();
    this.chartFiltroOpen.set(false);
  }
  carregarGraficoAtendimentos() {
    const periodo = this.chartPeriodo();
    this.api.get("/admin/dashboard", { periodo: String(periodo) }).subscribe({
      next: (data) => this.dashboardGrafico.set(data),
      error: () => this.dashboardGrafico.set(null)
    });
  }
  /** Abre o modal de atendimentos do dia ao clicar em um dia do gráfico */
  abrirModalAtendimentosDia(data) {
    if (!data)
      return;
    this.dataSelecionadaAtendimentos.set(data);
    this.atendimentosDiaModalOpen.set(true);
    this.carregandoAtendimentosDia.set(true);
    this.api.get("/admin/atendimentos-dia", { data }).subscribe({
      next: (list) => {
        this.listaAtendimentosDia.set(list ?? []);
        this.carregandoAtendimentosDia.set(false);
      },
      error: () => {
        this.listaAtendimentosDia.set([]);
        this.carregandoAtendimentosDia.set(false);
      }
    });
  }
  fecharModalAtendimentosDia() {
    this.atendimentosDiaModalOpen.set(false);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.carregandoDetalheId.set(null);
  }
  /** Abre o modal de atendimentos do dia com a data de hoje (ao clicar no card Caixa do Dia) */
  abrirModalCaixaDia() {
    const hoje = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
    this.dataSelecionadaAtendimentos.set(hoje);
    this.atendimentosDiaModalOpen.set(true);
    this.atendimentoExpandidoId.set(null);
    this.detalheAtendimentoMap.set({});
    this.carregandoAtendimentosDia.set(true);
    this.api.get("/admin/atendimentos-dia", { data: hoje }).subscribe({
      next: (list) => {
        this.listaAtendimentosDia.set(list ?? []);
        this.carregandoAtendimentosDia.set(false);
      },
      error: () => {
        this.listaAtendimentosDia.set([]);
        this.carregandoAtendimentosDia.set(false);
      }
    });
  }
  /** Alterna a exibição do detalhe (serviços/produtos) de um atendimento no modal */
  toggleDetalheAtendimento(idAtendimento) {
    const atual = this.atendimentoExpandidoId();
    if (atual === idAtendimento) {
      this.atendimentoExpandidoId.set(null);
      return;
    }
    this.atendimentoExpandidoId.set(idAtendimento);
    const map = this.detalheAtendimentoMap();
    if (map[idAtendimento]) {
      return;
    }
    this.carregandoDetalheId.set(idAtendimento);
    this.api.get(`/atendimentos/${idAtendimento}/detalhe`).subscribe({
      next: (detalhe) => {
        this.detalheAtendimentoMap.update((m) => __spreadProps(__spreadValues({}, m), { [idAtendimento]: detalhe }));
        this.carregandoDetalheId.set(null);
      },
      error: () => this.carregandoDetalheId.set(null)
    });
  }
  /** Data formatada para o título do modal: "Atendimentos em DD/MM/YYYY" */
  formatarDataTituloModal(data) {
    if (!data)
      return "";
    try {
      const d = parseISO(data);
      return format(d, "dd/MM/yyyy", { locale: pt_BR_default });
    } catch {
      return data;
    }
  }
  /** Hora para exibir no card: HH:mm */
  formatarHoraAtendimento(dataHora) {
    if (!dataHora)
      return "\u2014";
    try {
      const d = parseISO(dataHora);
      return format(d, "HH:mm", { locale: pt_BR_default });
    } catch {
      return dataHora;
    }
  }
  /** Valor em reais para o card */
  formatarValorAtendimento(total) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total ?? 0);
  }
  setEstimativaPeriodo(dias) {
    this.estimativaPeriodo.set(dias);
  }
  abrirModalNotificacoes() {
    this.notificacoesCarregando.set(false);
    this.notificacoesModalOpen.set(true);
  }
  fecharModalNotificacoes() {
    this.notificacoesModalOpen.set(false);
  }
  marcarNotificacaoLida(not) {
    if (!not || not.lido)
      return;
    this.api.patch(`/notificacoes/${not.id}/lido`, {}).subscribe({
      next: () => {
        this.notificacoes.update((lista) => lista.map((n) => n.id === not.id ? __spreadProps(__spreadValues({}, n), { lido: true }) : n));
      },
      error: () => {
      }
    });
  }
  /** Base URL do servidor (sem /api) para montar URL do avatar quando retornado como path relativo */
  get serverBase() {
    const url = environment?.apiUrl ?? "http://localhost:8080/api";
    return url.replace(/\/api\/?$/, "");
  }
  avatarUrl() {
    const u = this.user();
    if (u?.avatar) {
      const av = u.avatar;
      if (av.startsWith("http"))
        return av;
      return `${this.serverBase}/${av.startsWith("api/") ? av : "api/" + av}`;
    }
    const nome = u?.nome ?? "U";
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=ff9000&color=1a1a1a`;
  }
  abrirModalConfiguracoes() {
    this.configSubView.set("menu");
    this.configDadosErro.set("");
    this.configSenhaErro.set("");
    this.configModalOpen.set(true);
  }
  fecharModalConfiguracoes() {
    this.configModalOpen.set(false);
    this.configSubView.set("menu");
  }
  configVoltarMenu() {
    this.configSubView.set("menu");
  }
  abrirConfigDadosPessoais() {
    const u = this.user();
    this.configDadosForm.patchValue({ nome: u?.nome ?? "" });
    this.configUsuarioLogin.set(u?.login ?? "");
    this.api.getUsuario(u?.id ?? 0).subscribe({
      next: (usuario) => {
        this.configUsuarioLogin.set(usuario.login ?? "");
        this.configUsuarioPerfil.set(usuario.perfil ?? "");
        this.configDadosForm.patchValue({ nome: usuario.nome ?? "" });
        this.configSubView.set("dados");
        this.configDadosErro.set("");
      },
      error: () => this.configDadosErro.set("Erro ao carregar dados.")
    });
  }
  abrirConfigSegurancaSenha() {
    this.configSenhaForm.reset({ senha_atual: "", nova_senha: "", confirmar: "" });
    this.configSenhaErro.set("");
    this.configSubView.set("senha");
  }
  salvarConfigDadosPessoais() {
    if (this.configDadosForm.invalid) {
      this.configDadosForm.markAllAsTouched();
      return;
    }
    const id = this.user()?.id ?? 0;
    if (!id)
      return;
    const nome = this.configDadosForm.get("nome")?.value?.trim() ?? "";
    if (!nome) {
      this.configDadosErro.set("Nome \xE9 obrigat\xF3rio.");
      return;
    }
    this.configDadosLoading.set(true);
    this.configDadosErro.set("");
    this.api.updateUsuario(id, { nome }).subscribe({
      next: () => {
        this.auth.updateUser(__spreadProps(__spreadValues({}, this.user()), { nome }));
        this.configDadosLoading.set(false);
        this.configSubView.set("menu");
      },
      error: (err) => {
        this.configDadosLoading.set(false);
        this.configDadosErro.set(err?.error?.error || "Erro ao salvar.");
      }
    });
  }
  salvarConfigSenha() {
    if (this.configSenhaForm.invalid) {
      this.configSenhaForm.markAllAsTouched();
      const nova = this.configSenhaForm.get("nova_senha")?.value ?? "";
      const conf = this.configSenhaForm.get("confirmar")?.value ?? "";
      if (nova.length < 4)
        this.configSenhaErro.set("Nova senha deve ter no m\xEDnimo 4 caracteres.");
      else if (nova !== conf)
        this.configSenhaErro.set("Nova senha e confirma\xE7\xE3o n\xE3o conferem.");
      return;
    }
    const id = this.user()?.id ?? 0;
    if (!id)
      return;
    const senhaAtual = this.configSenhaForm.get("senha_atual")?.value ?? "";
    const novaSenha = this.configSenhaForm.get("nova_senha")?.value ?? "";
    const confirmar = this.configSenhaForm.get("confirmar")?.value ?? "";
    if (novaSenha.length < 4) {
      this.configSenhaErro.set("Nova senha deve ter no m\xEDnimo 4 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      this.configSenhaErro.set("Nova senha e confirma\xE7\xE3o n\xE3o conferem.");
      return;
    }
    this.configSenhaLoading.set(true);
    this.configSenhaErro.set("");
    this.api.alterarSenha(id, senhaAtual, novaSenha).subscribe({
      next: () => {
        this.configSenhaLoading.set(false);
        this.configSubView.set("menu");
      },
      error: (err) => {
        this.configSenhaLoading.set(false);
        this.configSenhaErro.set(err?.error?.error || "Erro ao alterar senha.");
      }
    });
  }
  onAvatarSelected(event) {
    const input = event.target;
    const file = input?.files?.[0];
    if (!file)
      return;
    const id = this.user()?.id ?? 0;
    if (!id)
      return;
    this.avatarUploading.set(true);
    this.api.uploadAvatar(id, file).subscribe({
      next: () => {
        this.api.getUsuario(id).subscribe({
          next: (usuario) => {
            this.auth.updateUser(__spreadProps(__spreadValues({}, this.user()), { avatar: usuario.avatar ?? void 0 }));
            this.avatarUploading.set(false);
          },
          error: () => this.avatarUploading.set(false)
        });
      },
      error: () => {
        this.avatarUploading.set(false);
      }
    });
    input.value = "";
  }
  avatarUrlNome(nome) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=3e3b47&color=ff9000`;
  }
  encodeUrl(s) {
    return encodeURIComponent(s ?? "");
  }
  /** Retorna apenas o dia (número) da data para o rótulo do gráfico. Ex: "2025-02-08" -> "8" */
  diaDoMes(data) {
    if (!data)
      return "";
    try {
      const d = parseISO(data);
      return String(d.getDate());
    } catch {
      return data;
    }
  }
  formatarTempoAtras(dataStr) {
    try {
      const d = new Date(dataStr);
      const diff = Date.now() - d.getTime();
      const min = Math.floor(diff / 6e4);
      const h = Math.floor(diff / 36e5);
      if (min < 60)
        return `${min} min atr\xE1s`;
      if (h < 24)
        return `${h}h atr\xE1s`;
      return `${Math.floor(h / 24)}d atr\xE1s`;
    } catch {
      return "";
    }
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(ApiService), \u0275\u0275directiveInject(FormBuilder));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 75, vars: 23, consts: [["avatarFileInput", ""], [1, "dashboard"], [1, "sidebar"], [1, "sidebar-logo"], ["src", "/assets/logoWl.png", "alt", "Logo", 1, "sidebar-logo-img"], [1, "sidebar-nav"], ["routerLink", "/dashboard", "routerLinkActive", "active", 1, "nav-item"], [1, "pi", "pi-home"], ["type", "button", 1, "nav-item", "nav-item-btn", 3, "click"], [1, "pi", "pi-box"], [1, "pi", "pi-wrench"], [1, "pi", "pi-calendar"], [1, "pi", "pi-users"], [1, "sidebar-footer"], [1, "profile-card"], ["type", "button", "title", "Alterar foto", 1, "profile-avatar-wrap", 3, "click", "disabled"], [1, "profile-avatar", "profile-avatar-loading"], [1, "profile-avatar", 3, "src", "alt"], ["type", "file", "accept", "image/*", 1, "profile-avatar-input", 3, "change"], [1, "profile-info"], [1, "profile-nome"], [1, "profile-cargo"], ["type", "button", 1, "btn-config", 3, "click"], [1, "pi", "pi-cog"], [1, "main"], [1, "header"], [1, "header-left"], [1, "header-label"], [1, "header-title"], [1, "header-right"], ["type", "button", "title", "Atualizar cards e gr\xE1ficos", 1, "btn-replay", 3, "click", "disabled"], [1, "pi", "pi-refresh"], [1, "search-wrap"], [1, "pi", "pi-search"], ["type", "text", "placeholder", "Buscar relat\xF3rio...", 1, "search-input"], ["type", "button", "aria-label", "Notifica\xE7\xF5es", 1, "btn-icon", "notif", 3, "click"], [1, "pi", "pi-bell"], [1, "badge"], ["type", "button", "aria-label", "Sair", 1, "btn-icon", 3, "click"], [1, "pi", "pi-sign-out"], [1, "loading-state"], [1, "dashboard-animate"], ["role", "button", "tabindex", "0", 1, "agenda-modal-overlay"], ["role", "button", "tabindex", "0", 1, "notificacoes-overlay"], ["role", "button", "tabindex", "0", 1, "recebimento-overlay"], ["role", "button", "tabindex", "0", 1, "atendimentos-dia-overlay"], ["role", "button", "tabindex", "0", 1, "prof-modal-overlay"], ["role", "button", "tabindex", "0", 1, "prod-overlay"], ["role", "button", "tabindex", "0", 1, "prod-form-overlay"], ["role", "button", "tabindex", "0", 1, "config-overlay"], [1, "pi", "pi-spin", "pi-spinner"], [1, "recebimento-toast"], [1, "cards"], [1, "card"], [1, "card-icon", "receita"], [1, "pi", "pi-wallet"], [1, "card-label"], [1, "card-value", "card-value--green"], [1, "card-progress"], [1, "card-progress-fill"], [1, "card-icon", "em-espera"], [1, "card-value"], [1, "card-detail"], [1, "card-icon", "agendamentos"], ["role", "button", "tabindex", "0", 1, "card", "card-caixa", "card-clickable", 3, "click", "keydown.enter", "keydown.space"], [1, "card-icon", "caixa"], [1, "pi", "pi-money-bill"], [1, "charts-row"], [1, "col-6"], [1, "chart-section"], [1, "chart-header"], [1, "chart-filter-wrap"], ["type", "button", "title", "Filtro", 1, "btn-chart-filtro", 3, "click"], [1, "pi", "pi-filter"], [1, "chart-filter-panel"], [1, "chart-wrap"], [1, "chart-bars-row"], [1, "chart-empty"], [1, "chart-section", "estoque-section"], [1, "chart-header", "estoque-header"], [1, "chart-pie-wrap", "estoque-wrap"], [1, "estoque-search-wrap"], ["type", "text", "placeholder", "Pesquisar produto...", 1, "estoque-search-input", 3, "ngModelChange", "ngModel"], [1, "estoque-grid-wrap"], [1, "estoque-grid"], [1, "th-qtd"], [1, "th-img"], [3, "estoque-baixo"], [1, "grid-bottom"], [1, "panel", "media-prof"], [1, "panel-head", "panel-head-prof"], [1, "prof-head-right"], ["type", "button", 1, "link-ver", 3, "click"], [1, "prof-filter-wrap"], ["type", "button", "title", "Filtros", 1, "btn-prof-filtro", 3, "click"], [1, "prof-filter-panel"], [1, "prof-list"], [1, "prof-item"], [1, "prof-empty"], [1, "panel", "agenda-panel"], [1, "panel-head", "panel-head-agenda"], [1, "agenda-head-right"], ["type", "button", "title", "Ver todos os registros", 1, "btn-agenda-calendar"], [1, "agenda-filter-wrap"], ["type", "button", "title", "Filtros", 1, "btn-agenda-filtro", 3, "click"], [1, "agenda-filter-panel"], [1, "agenda-table-wrap"], [1, "agenda-table"], [1, "recebimento-toast", 3, "click"], [1, "recebimento-toast-icon"], [1, "pi", "pi-dollar"], [1, "recebimento-toast-content"], [1, "recebimento-toast-title"], [1, "recebimento-toast-text"], [1, "recebimento-toast-tempo"], ["type", "button", "aria-label", "Fechar notifica\xE7\xE3o", 1, "recebimento-toast-close", 3, "click"], [1, "pi", "pi-times"], [1, "chart-filter-dates"], ["type", "date", 1, "chart-date-input", 3, "ngModelChange", "ngModel"], [1, "chart-filter-buttons"], ["type", "button", 1, "chart-period-btn", 3, "click"], ["type", "button", 1, "chart-filter-aplicar", 3, "click"], ["preserveAspectRatio", "xMidYMid meet", 1, "chart-svg", "chart-svg-bars"], [1, "chart-grid"], ["fill", "#ff9000", "rx", "4", 1, "chart-bar", "chart-bar-clickable"], [1, "chart-labels-row"], [1, "chart-label", "chart-label-clickable"], ["fill", "#ff9000", "rx", "4", 1, "chart-bar", "chart-bar-clickable", 3, "click"], [1, "chart-label", "chart-label-clickable", 3, "click"], [1, "td-qtd"], [1, "td-img"], [1, "estoque-produto-img", 3, "src", "alt"], [1, "estoque-produto-placeholder"], [1, "pi", "pi-image"], ["colspan", "3", 1, "estoque-empty"], [3, "ngSubmit", "formGroup"], [1, "filter-field"], ["type", "month", "formControlName", "mes"], ["formControlName", "id_cabeleireiro"], ["value", ""], [3, "value"], ["type", "submit", 1, "btn-prof-pesquisar", 3, "disabled"], [1, "prof-avatar", 3, "src", "alt"], [1, "prof-info"], [1, "prof-nome"], [1, "prof-media"], [1, "prof-valor"], ["type", "button", "title", "Ver todos os registros", 1, "btn-agenda-calendar", 3, "click"], ["formControlName", "status"], ["value", "AGENDADO"], ["value", "CONFIRMADO"], ["value", "CANCELADO"], ["value", "FINALIZADO"], ["type", "submit", 1, "btn-aplicar"], ["colspan", "4", 1, "agenda-empty-cell"], ["role", "button", "tabindex", "0", 1, "agenda-modal-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", 1, "agenda-modal", "agenda-modal-calendario", 3, "click"], [1, "agenda-modal-header"], ["type", "button", "aria-label", "Fechar", 1, "agenda-modal-close", 3, "click"], [1, "agenda-calendario-wrap"], [1, "agenda-calendario-nav"], ["type", "button", "aria-label", "M\xEAs anterior", 1, "agenda-calendario-nav-btn", 3, "click"], [1, "pi", "pi-chevron-left"], [1, "agenda-calendario-mes"], ["type", "button", "aria-label", "Pr\xF3ximo m\xEAs", 1, "agenda-calendario-nav-btn", 3, "click"], [1, "pi", "pi-chevron-right"], [1, "agenda-calendario-grid"], [1, "agenda-calendario-weekdays"], [1, "agenda-calendario-dias"], ["type", "button", 1, "agenda-calendario-dia", 3, "outside", "has-agendamento", "selected", "disabled"], [1, "agenda-calendario-leyenda"], [1, "agenda-dia-list"], ["type", "button", 1, "agenda-calendario-dia", 3, "click", "disabled"], [1, "agenda-dia-list-head"], [1, "agenda-dia-list-title"], ["type", "button", 1, "agenda-dia-list-fechar", 3, "click"], [1, "agenda-dia-list-ul"], [1, "agenda-dia-list-empty"], [1, "agenda-dia-list-li"], [1, "agenda-dia-cliente"], [1, "agenda-dia-hora"], [1, "agenda-dia-cabeleireiro"], ["role", "button", "tabindex", "0", 1, "notificacoes-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", 1, "notificacoes-modal", 3, "click"], [1, "notificacoes-header"], ["type", "button", "aria-label", "Fechar", 1, "notificacoes-close", 3, "click"], [1, "notificacoes-body"], [1, "notificacoes-empty"], [1, "notificacoes-list"], [1, "notificacao-item", 3, "lida"], [1, "notificacao-item", 3, "click"], [1, "notificacao-main"], [1, "notificacao-titulo"], [1, "notificacao-subtitulo"], [1, "notificacao-valor"], [1, "notificacao-side"], [1, "notificacao-tipo"], [1, "notificacao-tempo"], [1, "notificacao-detalhe"], ["role", "button", "tabindex", "0", 1, "recebimento-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", 1, "recebimento-modal", 3, "click"], [1, "recebimento-header"], ["type", "button", "aria-label", "Fechar", 1, "recebimento-close", 3, "click"], [1, "recebimento-body"], [1, "recebimento-cliente"], [1, "recebimento-valor"], [1, "recebimento-label"], [1, "recebimento-tipo-group"], ["type", "button", 1, "recebimento-tipo-btn", 3, "click"], [1, "recebimento-erro"], [1, "recebimento-footer"], ["type", "button", 1, "recebimento-btn-sec", 3, "click"], ["type", "button", 1, "recebimento-btn-pri", 3, "click", "disabled"], ["role", "button", "tabindex", "0", 1, "atendimentos-dia-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "atendimentos-dia-title", 1, "atendimentos-dia-modal", 3, "click"], [1, "atendimentos-dia-header"], ["id", "atendimentos-dia-title"], ["type", "button", "aria-label", "Fechar", 1, "atendimentos-dia-close", 3, "click"], [1, "atendimentos-dia-body"], [1, "atendimentos-dia-loading"], [1, "atendimentos-dia-item"], [1, "atendimentos-dia-empty"], ["role", "button", "tabindex", "0", 1, "atendimentos-dia-card", "atendimentos-dia-card-clickable", 3, "click"], [1, "atendimentos-dia-card-icon"], [1, "pi", "pi-user"], [1, "atendimentos-dia-card-info"], [1, "atendimentos-dia-card-nome"], [1, "atendimentos-dia-card-hora"], [1, "atendimentos-dia-card-servico"], [1, "atendimentos-dia-card-valor"], [1, "pi", "atendimentos-dia-card-chevron"], [1, "atendimentos-dia-detalhe"], [1, "atendimentos-dia-detalhe-loading"], [1, "atendimentos-dia-detalhe-block"], [1, "atendimentos-dia-detalhe-empty"], ["role", "button", "tabindex", "0", 1, "prof-modal-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "prof-modal-title", 1, "prof-modal", 3, "click"], [1, "prof-modal-header"], ["id", "prof-modal-title"], ["type", "button", "aria-label", "Fechar", 1, "prof-modal-close", 3, "click"], [1, "prof-modal-body"], [1, "prof-list", "prof-list-modal"], ["role", "button", "tabindex", "0", 1, "prod-overlay", 3, "click"], ["role", "dialog", 1, "prod-modal", 3, "click"], [1, "prod-modal-head"], ["type", "button", 1, "prod-close", 3, "click"], [1, "prod-modal-toolbar"], [1, "prod-search-wrap"], ["type", "text", "placeholder", "Buscar produtos...", 1, "prod-search-input", 3, "ngModelChange", "ngModel"], ["type", "button", 1, "prod-btn-add", 3, "click"], [1, "pi", "pi-plus"], [1, "prod-err"], [1, "prod-modal-body"], [1, "prod-table"], [1, "th-num"], [1, "th-actions"], [1, "prod-row-img", 3, "src", "alt"], [1, "prod-row-placeholder"], [1, "td-num"], [1, "td-actions"], ["type", "button", "title", "Editar", 1, "prod-btn-action", 3, "click"], [1, "pi", "pi-pencil"], ["type", "button", "title", "Excluir", 1, "prod-btn-action", "danger", 3, "click"], [1, "pi", "pi-trash"], ["colspan", "5", 1, "prod-empty"], ["role", "button", "tabindex", "0", 1, "prod-form-overlay", 3, "click"], ["role", "dialog", 1, "prod-form-modal", 3, "click"], [1, "prod-form-head"], ["type", "button", 1, "prod-form-close", 3, "click"], [1, "prod-form-body", 3, "ngSubmit", "formGroup"], ["type", "text", "formControlName", "descricao", "placeholder", "Nome do produto", 1, "prod-form-input"], ["type", "text", "placeholder", "R$ 0,00", 1, "prod-form-input", 3, "input", "blur", "value"], ["type", "number", "formControlName", "estoque", "min", "0", "placeholder", "0", 1, "prod-form-input"], [1, "prod-form-file-wrap"], ["type", "file", "accept", "image/*", 1, "prod-form-file", 3, "change"], [1, "prod-form-file-label", "prod-form-file-label--orange"], [1, "prod-form-imagem-preview"], [1, "prod-form-err"], [1, "prod-form-footer"], ["type", "button", 1, "prod-form-btn-sec", 3, "click"], ["type", "submit", 1, "prod-form-btn-pri", 3, "disabled"], ["type", "text", "placeholder", "Buscar servi\xE7os...", 1, "prod-search-input", 3, "ngModelChange", "ngModel"], ["colspan", "4", 1, "prod-empty"], ["type", "text", "formControlName", "descricao", "placeholder", "Nome do servi\xE7o", 1, "prod-form-input"], ["type", "number", "formControlName", "valor", "step", "0.01", "min", "0", "placeholder", "0,00", 1, "prod-form-input"], [1, "prod-form-file-label"], ["role", "dialog", 1, "agenda-modal-sidebar", 3, "click"], [1, "agenda-modal-toolbar"], ["type", "text", "placeholder", "Pesquisar cliente...", 1, "prod-search-input", 3, "ngModelChange", "ngModel"], [1, "agenda-modal-mes-wrap"], ["type", "month", 1, "agenda-mes-input", 3, "ngModelChange", "ngModel"], [1, "agenda-modal-list"], [1, "prod-table", "agenda-table-inline"], [1, "agenda-th-acoes"], [1, "agenda-td-acoes"], ["type", "button", "title", "Editar", 1, "agenda-btn-acao", "agenda-btn-editar", 3, "click"], ["type", "button", "title", "Excluir", 1, "agenda-btn-acao", "agenda-btn-excluir", 3, "click"], ["type", "text", "formControlName", "nome_cliente", "placeholder", "Nome do cliente", 1, "prod-form-input"], ["type", "date", "formControlName", "data", 1, "prod-form-input"], ["type", "time", "formControlName", "hora", 1, "prod-form-input"], ["formControlName", "id_servico", 1, "prod-form-input"], [3, "ngValue"], ["formControlName", "id_cabeleireiro", 1, "prod-form-input"], ["type", "text", "formControlName", "observacao", "placeholder", "Opcional", 1, "prod-form-input"], ["role", "button", "tabindex", "0", 1, "config-overlay", 3, "click", "keydown.escape"], ["role", "dialog", "aria-modal", "true", 1, "config-modal", 3, "click"], [1, "config-header"], ["type", "button", "aria-label", "Fechar", 1, "config-close", 3, "click"], [1, "config-body"], [1, "config-form-wrap"], ["type", "button", 1, "config-menu-item", 3, "click"], [1, "pi", "pi-lock"], ["type", "button", 1, "config-back", 3, "click"], [1, "pi", "pi-arrow-left"], ["type", "text", "formControlName", "nome", "placeholder", "Seu nome", 1, "prod-form-input"], [1, "config-readonly"], ["type", "password", "formControlName", "senha_atual", "placeholder", "Senha atual", 1, "prod-form-input"], ["type", "password", "formControlName", "nova_senha", "placeholder", "M\xEDnimo 4 caracteres", 1, "prod-form-input"], ["type", "password", "formControlName", "confirmar", "placeholder", "Repita a nova senha", 1, "prod-form-input"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "aside", 2)(2, "div", 3);
        \u0275\u0275element(3, "img", 4);
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "Wender Barbearia");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "nav", 5)(7, "a", 6);
        \u0275\u0275element(8, "i", 7);
        \u0275\u0275elementStart(9, "span");
        \u0275\u0275text(10, "Inicio");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "button", 8);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_11_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalProdutos());
        });
        \u0275\u0275element(12, "i", 9);
        \u0275\u0275elementStart(13, "span");
        \u0275\u0275text(14, "Produtos");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(15, "button", 8);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_15_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalServicos());
        });
        \u0275\u0275element(16, "i", 10);
        \u0275\u0275elementStart(17, "span");
        \u0275\u0275text(18, "Servi\xE7os");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "button", 8);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_19_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalAgenda());
        });
        \u0275\u0275element(20, "i", 11);
        \u0275\u0275elementStart(21, "span");
        \u0275\u0275text(22, "Agenda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(23, "button", 8);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_23_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirSolicitacaoUsuarios());
        });
        \u0275\u0275element(24, "i", 12);
        \u0275\u0275elementStart(25, "span");
        \u0275\u0275text(26, "Solicita\xE7\xE3o de Usu\xE1rios");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(27, "div", 13)(28, "div", 14)(29, "button", 15);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_29_listener() {
          \u0275\u0275restoreView(_r1);
          const avatarFileInput_r2 = \u0275\u0275reference(33);
          return \u0275\u0275resetView(avatarFileInput_r2.click());
        });
        \u0275\u0275template(30, DashboardComponent_Conditional_30_Template, 2, 0, "span", 16)(31, DashboardComponent_Conditional_31_Template, 1, 2, "img", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "input", 18, 0);
        \u0275\u0275listener("change", function DashboardComponent_Template_input_change_32_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onAvatarSelected($event));
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "div", 19)(35, "span", 20);
        \u0275\u0275text(36);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "span", 21);
        \u0275\u0275text(38);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "button", 22);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_39_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalConfiguracoes());
        });
        \u0275\u0275element(40, "i", 23);
        \u0275\u0275elementStart(41, "span");
        \u0275\u0275text(42, "Configura\xE7\xF5es");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(43, "main", 24)(44, "header", 25)(45, "div", 26)(46, "span", 27);
        \u0275\u0275text(47, "DASHBOARD");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "h2", 28);
        \u0275\u0275text(49);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(50, "div", 29)(51, "button", 30);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_51_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.recarregarDashboard());
        });
        \u0275\u0275element(52, "i", 31);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(53, "div", 32);
        \u0275\u0275element(54, "i", 33)(55, "input", 34);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(56, "button", 35);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_56_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.abrirModalNotificacoes());
        });
        \u0275\u0275element(57, "i", 36);
        \u0275\u0275template(58, DashboardComponent_Conditional_58_Template, 1, 0, "span", 37);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "button", 38);
        \u0275\u0275listener("click", function DashboardComponent_Template_button_click_59_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.auth.logout());
        });
        \u0275\u0275element(60, "i", 39);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(61, DashboardComponent_Conditional_61_Template, 2, 0, "div", 40)(62, DashboardComponent_Conditional_62_Template, 119, 35, "div", 41);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(63, DashboardComponent_Conditional_63_Template, 37, 2, "div", 42)(64, DashboardComponent_Conditional_64_Template, 10, 1, "div", 43)(65, DashboardComponent_Conditional_65_Template, 33, 15, "div", 44)(66, DashboardComponent_Conditional_66_Template, 10, 2, "div", 45)(67, DashboardComponent_Conditional_67_Template, 12, 1, "div", 46)(68, DashboardComponent_Conditional_68_Template, 32, 3, "div", 47)(69, DashboardComponent_Conditional_69_Template, 30, 7, "div", 48)(70, DashboardComponent_Conditional_70_Template, 30, 3, "div", 47)(71, DashboardComponent_Conditional_71_Template, 27, 6, "div", 48)(72, DashboardComponent_Conditional_72_Template, 36, 3, "div", 47)(73, DashboardComponent_Conditional_73_Template, 40, 7, "div", 48)(74, DashboardComponent_Conditional_74_Template, 11, 3, "div", 49);
      }
      if (rf & 2) {
        let tmp_3_0;
        \u0275\u0275advance(29);
        \u0275\u0275property("disabled", ctx.avatarUploading());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.avatarUploading() ? 30 : 31);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate((tmp_3_0 = ctx.user()) == null ? null : tmp_3_0.nome);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(ctx.cargoUsuario());
        \u0275\u0275advance(11);
        \u0275\u0275textInterpolate2("", ctx.saudacao(), ", ", ctx.nomeUsuario(), "");
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.loading());
        \u0275\u0275advance();
        \u0275\u0275classProp("pi-spin", ctx.loading());
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.notificacoesNaoLidas().length > 0 ? 58 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.loading() ? 61 : 62);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.agendaModalOpen() ? 63 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.notificacoesModalOpen() ? 64 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.recebimentoModalOpen() && ctx.recebimentoNotificacao() ? 65 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.atendimentosDiaModalOpen() ? 66 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.modalVerTodosCabeleireirosOpen() ? 67 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.modalProdutosOpen() ? 68 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.produtoFormModalOpen() ? 69 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.modalServicosOpen() ? 70 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.servicoFormModalOpen() ? 71 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.modalAgendaOpen() ? 72 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.modalNovoAgendamentoOpen() ? 73 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.configModalOpen() ? 74 : -1);
      }
    }, dependencies: [CommonModule, DecimalPipe, CurrencyPipe, RouterLink, RouterLinkActive, ReactiveFormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, FormGroupDirective, FormControlName, FormsModule, NgModel], styles: ['@charset "UTF-8";\n\n\n\n.dashboard[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  min-height: 100vh;\n  overflow: hidden;\n  background: #0d0d0d;\n  color: #fff;\n}\n.sidebar[_ngcontent-%COMP%] {\n  width: 260px;\n  min-width: 260px;\n  height: 100vh;\n  flex-shrink: 0;\n  background: #141414;\n  display: flex;\n  flex-direction: column;\n  border-right: 1px solid #1f1f1f;\n  overflow: hidden;\n}\n.sidebar-logo[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 24px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.sidebar-logo[_ngcontent-%COMP%]   .sidebar-logo-img[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  object-fit: contain;\n  flex-shrink: 0;\n}\n.sidebar-logo[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  letter-spacing: 0.05em;\n  color: #fff;\n}\n.sidebar-nav[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  padding: 16px 12px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  overflow-y: auto;\n}\n.nav-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border-radius: 8px;\n  color: #a3a3a3;\n  text-decoration: none;\n  font-size: 0.95rem;\n  transition: background 0.2s, color 0.2s;\n}\n.nav-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: inherit;\n}\n.nav-item[_ngcontent-%COMP%]:hover {\n  background: #1f1f1f;\n  color: #fff;\n}\n.nav-item.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n}\n.nav-item.active[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #1a1a1a;\n}\n.nav-item.nav-item-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  border: none;\n  background: none;\n  cursor: pointer;\n  text-align: left;\n  font-family: inherit;\n}\n.sidebar-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 16px 12px 24px;\n  margin-top: auto;\n  border-top: 1px solid #1f1f1f;\n  display: flex;\n  justify-content: center;\n}\n.profile-card[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 10px;\n  padding: 16px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n.profile-avatar-wrap[_ngcontent-%COMP%] {\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: transparent;\n  cursor: pointer;\n  display: block;\n  line-height: 0;\n}\n.profile-avatar-wrap[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.profile-avatar-input[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 0;\n  height: 0;\n  opacity: 0;\n  pointer-events: none;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  object-fit: cover;\n  background: #2a2a2a;\n  display: block;\n}\n.profile-avatar-loading[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  border-radius: 50%;\n  background: #2a2a2a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #ff9000;\n  font-size: 1.2rem;\n}\n.profile-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n  text-align: center;\n}\n.profile-info[_ngcontent-%COMP%]   .profile-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n}\n.profile-info[_ngcontent-%COMP%]   .profile-cargo[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n}\n.btn-config[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  padding: 8px 12px;\n  background: #262626;\n  border: none;\n  border-radius: 8px;\n  color: #a3a3a3;\n  font-size: 0.9rem;\n  transition: background 0.2s, color 0.2s;\n  width: 100%;\n  cursor: pointer;\n  font-family: inherit;\n}\n.btn-config[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-config[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.config-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1100;\n}\n.config-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  min-width: 320px;\n  max-width: 420px;\n  width: 90%;\n  max-height: 90vh;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);\n}\n.config-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #2a2a2a;\n}\n.config-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.config-close[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #a3a3a3;\n  cursor: pointer;\n  padding: 4px;\n  border-radius: 4px;\n}\n.config-close[_ngcontent-%COMP%]:hover {\n  color: #fff;\n  background: #333;\n}\n.config-body[_ngcontent-%COMP%] {\n  padding: 16px 20px 24px;\n  overflow-y: auto;\n}\n.config-menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: 100%;\n  padding: 14px 16px;\n  background: #262626;\n  border: none;\n  border-radius: 10px;\n  color: #e5e5e5;\n  font-size: 1rem;\n  text-align: left;\n  cursor: pointer;\n  font-family: inherit;\n  margin-bottom: 10px;\n  transition: background 0.2s;\n}\n.config-menu-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:first-child {\n  color: #ff9000;\n  font-size: 1.1rem;\n}\n.config-menu-item[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]:last-child {\n  margin-left: auto;\n  color: #737373;\n  font-size: 0.9rem;\n}\n.config-menu-item[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.config-form-wrap[_ngcontent-%COMP%]   .config-back[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: #a3a3a3;\n  cursor: pointer;\n  padding: 0 0 12px;\n  font-size: 0.9rem;\n  margin-bottom: 8px;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-family: inherit;\n}\n.config-form-wrap[_ngcontent-%COMP%]   .config-back[_ngcontent-%COMP%]:hover {\n  color: #ff9000;\n}\n.config-form-wrap[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n  font-size: 1rem;\n  color: #fff;\n}\n.config-form-wrap[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 4px;\n  font-size: 0.9rem;\n  color: #a3a3a3;\n}\n.config-form-wrap[_ngcontent-%COMP%]   .config-readonly[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n  margin: 8px 0;\n}\n.main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  min-height: 0;\n  height: 100vh;\n  overflow-y: auto;\n  padding: 24px 32px 48px;\n  display: flex;\n  flex-direction: column;\n  gap: 28px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.header-left[_ngcontent-%COMP%]   .header-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  letter-spacing: 0.08em;\n  color: #737373;\n  margin-bottom: 4px;\n}\n.header-left[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0;\n}\n.header-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.btn-replay[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  padding: 0;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.2s, opacity 0.2s;\n}\n.btn-replay[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.btn-replay[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e67e00;\n}\n.btn-replay[_ngcontent-%COMP%]:disabled {\n  opacity: 0.8;\n  cursor: not-allowed;\n}\n.filter-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.btn-filtro[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s, opacity 0.2s;\n}\n.btn-filtro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-filtro[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.btn-filtro.active[_ngcontent-%COMP%] {\n  opacity: 0.95;\n}\n.filter-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  z-index: 100;\n  min-width: 280px;\n  padding: 16px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}\n.filter-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #a3a3a3;\n}\n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 6px;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #ff9000;\n}\n.filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.filter-panel[_ngcontent-%COMP%]   .btn-aplicar[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.filter-panel[_ngcontent-%COMP%]   .btn-aplicar[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.search-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 10px 16px;\n  background: #1a1a1a;\n  border-radius: 8px;\n  border: 1px solid #262626;\n  min-width: 240px;\n}\n.search-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 1rem;\n}\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\n.btn-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  position: relative;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.btn-icon[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.btn-icon[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  width: 8px;\n  height: 8px;\n  background: #ff9000;\n  border-radius: 50%;\n}\n.btn-novo[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 20px;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  cursor: pointer;\n  transition: background 0.2s, transform 0.1s;\n}\n.btn-novo[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-novo[_ngcontent-%COMP%]:hover {\n  background: #e68200;\n}\n.btn-novo[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 28px;\n  margin-bottom: 32px;\n}\n.card[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.card-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\n.card-clickable[_ngcontent-%COMP%]:hover {\n  background: #222;\n  border-color: #333;\n}\n.card-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 4px;\n}\n.card-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #1a1a1a;\n}\n.card-icon.receita[_ngcontent-%COMP%], \n.card-icon.crescimento[_ngcontent-%COMP%], \n.card-icon.em-espera[_ngcontent-%COMP%], \n.card-icon.agendamentos[_ngcontent-%COMP%], \n.card-icon.estoque[_ngcontent-%COMP%], \n.card-icon.caixa[_ngcontent-%COMP%] {\n  background: #ff9000;\n}\n.card-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  letter-spacing: 0.06em;\n  color: #a3a3a3;\n}\n.card-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #fff;\n}\n.card-value.card-value--green[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.card-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 20px;\n  right: 20px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.card-badge.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.card-badge-alert[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  width: 10px;\n  height: 10px;\n  background: #ff9000;\n  border-radius: 50%;\n}\n.card-detail[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n}\n.card-compare[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.85rem;\n  margin-top: 4px;\n}\n.card-compare.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.card-progress[_ngcontent-%COMP%] {\n  height: 4px;\n  background: #262626;\n  border-radius: 2px;\n  overflow: hidden;\n  margin-top: 8px;\n}\n.card-progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #ff9000;\n  border-radius: 2px;\n  transition: width 0.3s ease;\n}\n.card.alert[_ngcontent-%COMP%]   .card-urgente[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #ef4444;\n  font-weight: 500;\n}\n@keyframes _ngcontent-%COMP%_dashboardFadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(12px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.45s ease forwards;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.05s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.1s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 0.15s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .cards[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 0.2s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .charts-row[_ngcontent-%COMP%]   .col-6[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.5s ease forwards;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .charts-row[_ngcontent-%COMP%]   .col-6[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0.25s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .charts-row[_ngcontent-%COMP%]   .col-6[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 0.32s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .grid-bottom[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%] {\n  opacity: 0;\n  animation: _ngcontent-%COMP%_dashboardFadeIn 0.5s ease forwards;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .grid-bottom[_ngcontent-%COMP%]   .panel.media-prof[_ngcontent-%COMP%] {\n  animation-delay: 0.4s;\n}\n.dashboard-animate[_ngcontent-%COMP%]   .grid-bottom[_ngcontent-%COMP%]   .panel.agenda-panel[_ngcontent-%COMP%] {\n  animation-delay: 0.48s;\n}\n.charts-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n  margin-top: 8px;\n  margin-bottom: 24px;\n  align-items: stretch;\n}\n.col-6[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n.col-6[_ngcontent-%COMP%]    > .chart-section[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 0;\n}\n@media (max-width: 900px) {\n  .charts-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.chart-section[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 12px;\n  padding: 24px;\n  border: 1px solid rgba(255, 255, 255, 0.12);\n}\n.chart-section[_ngcontent-%COMP%]   .chart-wrap[_ngcontent-%COMP%], \n.chart-section[_ngcontent-%COMP%]   .chart-pie-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n}\n.chart-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.chart-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0 0 4px 0;\n}\n.chart-total[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #fff;\n  margin: 0 0 4px 0;\n}\n.chart-compare[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.chart-compare.positive[_ngcontent-%COMP%] {\n  color: #22c55e;\n}\n.chart-filter-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.btn-chart-filtro[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 10px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-chart-filtro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.btn-chart-filtro[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.btn-chart-filtro.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n  border-color: #ff9000;\n}\n.chart-filter-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  z-index: 50;\n  min-width: 280px;\n  padding: 16px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.chart-filter-dates[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  align-items: center;\n  gap: 8px 12px;\n}\n.chart-filter-dates[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.chart-date-input[_ngcontent-%COMP%] {\n  padding: 8px 10px;\n  border: 1px solid #333;\n  border-radius: 8px;\n  background: #0d0d0d;\n  color: #fff;\n  font-size: 0.9rem;\n}\n.chart-date-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #ff9000;\n}\n.chart-filter-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.chart-period-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #a3a3a3;\n  font-size: 0.85rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.chart-period-btn[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.chart-period-btn.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n  border-color: #ff9000;\n}\n.chart-filter-aplicar[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: none;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: opacity 0.2s;\n}\n.chart-filter-aplicar[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.chart-wrap[_ngcontent-%COMP%] {\n  min-height: 220px;\n  padding: 12px 0;\n  background: transparent;\n  border-radius: 8px;\n  position: relative;\n  overflow: hidden;\n}\n.chart-bars-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.chart-svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 200px;\n  display: block;\n}\n.chart-grid[_ngcontent-%COMP%] {\n  stroke: rgba(255, 255, 255, 0.08);\n  stroke-width: 0.5;\n}\n.chart-svg-bars[_ngcontent-%COMP%]   .chart-bar[_ngcontent-%COMP%] {\n  transition: opacity 0.2s ease;\n}\n.chart-svg-bars[_ngcontent-%COMP%]   .chart-bar[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.chart-svg-bars[_ngcontent-%COMP%]   .chart-bar.chart-bar-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.chart-label-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.chart-label-clickable[_ngcontent-%COMP%]:hover {\n  color: rgba(255, 255, 255, 0.9);\n}\n.chart-pie-section[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.chart-pie-wrap[_ngcontent-%COMP%] {\n  min-height: 220px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding: 12px 0;\n}\n.chart-pie-svg[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 200px;\n  height: 200px;\n}\n.chart-pie-slice[_ngcontent-%COMP%] {\n  transition: opacity 0.2s ease;\n}\n.chart-pie-slice[_ngcontent-%COMP%]:hover {\n  opacity: 0.9;\n}\n.chart-pie-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: 100%;\n  max-width: 240px;\n}\n.chart-pie-legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.85rem;\n}\n.chart-pie-legend-dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.chart-pie-legend-label[_ngcontent-%COMP%] {\n  flex: 1;\n  color: rgba(255, 255, 255, 0.9);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.chart-pie-legend-pct[_ngcontent-%COMP%] {\n  color: #ff9000;\n  font-weight: 600;\n  flex-shrink: 0;\n}\n.estimativa-section[_ngcontent-%COMP%]   .chart-header.estimativa-header[_ngcontent-%COMP%] {\n  flex-direction: column;\n  align-items: stretch;\n  gap: 12px;\n}\n.estimativa-filtros[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.estimativa-btn[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #a3a3a3;\n  font-size: 0.8rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.estimativa-btn[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.estimativa-btn.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #1a1a1a;\n  border-color: #ff9000;\n}\n.estimativa-section[_ngcontent-%COMP%]   .chart-pie-wrap.estimativa-wrap[_ngcontent-%COMP%] {\n  flex-direction: row !important;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 20px;\n  padding: 8px 0;\n}\n.estimativa-grafico[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 140px;\n  min-width: 140px;\n}\n.estimativa-textos[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  text-align: right;\n}\n.estimativa-pergunta[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: rgba(255, 255, 255, 0.8);\n  text-align: right;\n  line-height: 1.4;\n}\n.estimativa-valor[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #ff9000;\n  text-align: right;\n  line-height: 1.2;\n}\n.estimativa-subtitulo[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: rgba(255, 255, 255, 0.7);\n  text-align: right;\n}\n.estimativa-svg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 70px;\n  display: block;\n}\n.estimativa-bar[_ngcontent-%COMP%] {\n  transition: opacity 0.2s ease;\n}\n.estimativa-bar[_ngcontent-%COMP%]:hover {\n  opacity: 0.85;\n}\n.estimativa-grafico-label[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 0.75rem;\n  color: #737373;\n  text-align: center;\n}\n.estimativa-base[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #737373;\n  text-align: right;\n}\n.estoque-section[_ngcontent-%COMP%]   .chart-header.estoque-header[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.estoque-section[_ngcontent-%COMP%]   .chart-pie-wrap.estoque-wrap[_ngcontent-%COMP%] {\n  flex-direction: column;\n  align-items: stretch;\n  gap: 12px;\n  min-height: 0;\n}\n.estoque-search-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.12);\n  border-radius: 8px;\n}\n.estoque-search-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 1rem;\n}\n.estoque-search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.estoque-search-input[_ngcontent-%COMP%]::placeholder {\n  color: #737373;\n}\n.estoque-grid-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  max-height: 200px;\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.estoque-grid[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.85rem;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  background: #1a1a1a;\n  z-index: 1;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  color: #a3a3a3;\n  font-weight: 600;\n  border-bottom: 1px solid #262626;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   .th-qtd[_ngcontent-%COMP%] {\n  text-align: right;\n  width: 90px;\n}\n.estoque-grid[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   .th-img[_ngcontent-%COMP%] {\n  width: 56px;\n  text-align: right;\n  padding-right: 12px;\n}\n.estoque-grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  border-bottom: 1px solid #262626;\n  color: rgba(255, 255, 255, 0.9);\n}\n.estoque-grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.estoque-baixo[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  color: #ef4444;\n  font-weight: 600;\n}\n.estoque-grid[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr.estoque-baixo[_ngcontent-%COMP%]   .td-qtd[_ngcontent-%COMP%] {\n  color: #ef4444;\n}\n.estoque-grid[_ngcontent-%COMP%]   .td-qtd[_ngcontent-%COMP%] {\n  text-align: right;\n  font-weight: 600;\n  color: #ff9000;\n}\n.estoque-grid[_ngcontent-%COMP%]   .td-img[_ngcontent-%COMP%] {\n  text-align: right;\n  vertical-align: middle;\n  padding: 6px 12px;\n  width: 56px;\n}\n.estoque-grid[_ngcontent-%COMP%]   .estoque-produto-img[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  object-fit: cover;\n  border-radius: 8px;\n  background: #262626;\n  display: block;\n  margin-left: auto;\n}\n.estoque-grid[_ngcontent-%COMP%]   .estoque-produto-placeholder[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 8px;\n  background: #262626;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-left: auto;\n  color: #525252;\n  font-size: 1rem;\n}\n.estoque-grid[_ngcontent-%COMP%]   .estoque-empty[_ngcontent-%COMP%] {\n  color: #737373;\n  text-align: center;\n  padding: 24px 12px;\n  font-size: 0.9rem;\n}\n.chart-labels-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-evenly;\n  padding: 0 16px;\n  gap: 4px;\n}\n.chart-label[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: center;\n  font-size: 10px;\n  color: rgba(255, 255, 255, 0.54);\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.chart-empty[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #525252;\n  font-size: 0.9rem;\n}\n.chart-subtitle[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 8px;\n  left: 24px;\n  margin: 0;\n  font-size: 0.75rem;\n  color: #525252;\n}\n.grid-bottom[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 24px;\n}\n.panel[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  padding: 20px;\n  border: 1px solid #262626;\n}\n.panel-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.panel-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0;\n}\n.link-ver[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n  text-decoration: none;\n  background: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  font: inherit;\n}\n.link-ver[_ngcontent-%COMP%]:hover {\n  color: #ff9000;\n}\n.panel-head-agenda[_ngcontent-%COMP%]   .agenda-head-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.btn-agenda-calendar[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-agenda-calendar[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-agenda-calendar[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.agenda-filter-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.btn-agenda-filtro[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-agenda-filtro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-agenda-filtro[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.btn-agenda-filtro.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #000;\n  border-color: #ff9000;\n}\n.agenda-filter-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  z-index: 50;\n  min-width: 260px;\n  padding: 16px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #a3a3a3;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 6px;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.agenda-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #ff9000;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .btn-aplicar[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.agenda-filter-panel[_ngcontent-%COMP%]   .btn-aplicar[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.agenda-table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  border-radius: 8px;\n  border: 1px solid #262626;\n}\n.agenda-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.agenda-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%] {\n  background: #262626;\n}\n.agenda-table[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 10px 12px;\n  font-weight: 600;\n  color: #a3a3a3;\n  white-space: nowrap;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #262626;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.agenda-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 144, 0, 0.06);\n}\n.agenda-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  color: #e5e5e5;\n}\n.agenda-table[_ngcontent-%COMP%]   .agenda-empty-cell[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #525252;\n  padding: 20px;\n}\n.agenda-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.agenda-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.5);\n  max-width: 90vw;\n  width: 700px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n}\n.agenda-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n  flex-shrink: 0;\n}\n.agenda-modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0;\n}\n.agenda-modal-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.agenda-modal-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.agenda-modal-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  overflow-x: auto;\n  max-height: calc(85vh - 70px);\n}\n.agenda-modal-body[_ngcontent-%COMP%]   .agenda-table[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.agenda-modal-calendario[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 380px;\n}\n.agenda-calendario-wrap[_ngcontent-%COMP%] {\n  padding: 16px 20px 20px;\n}\n.agenda-calendario-nav[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.agenda-calendario-nav-btn[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: #262626;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.agenda-calendario-nav-btn[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.agenda-calendario-nav-btn[_ngcontent-%COMP%]:hover {\n  background: #ff9000;\n  color: #000;\n}\n.agenda-calendario-mes[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  font-size: 1rem;\n  text-transform: capitalize;\n}\n.agenda-calendario-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.agenda-calendario-weekdays[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 2px;\n  text-align: center;\n  font-size: 0.75rem;\n  font-weight: 600;\n  color: #737373;\n}\n.agenda-calendario-dias[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n}\n.agenda-calendario-dia[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.85rem;\n  color: #e5e5e5;\n  background: #262626;\n  border-radius: 8px;\n  border: 1px solid #333;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    border-color 0.2s,\n    transform 0.1s;\n  padding: 0;\n  font: inherit;\n}\n.agenda-calendario-dia[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #333;\n  border-color: #404040;\n}\n.agenda-calendario-dia[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n}\n.agenda-calendario-dia.outside[_ngcontent-%COMP%] {\n  color: #525252;\n  background: #1f1f1f;\n}\n.agenda-calendario-dia.has-agendamento[_ngcontent-%COMP%] {\n  background: #166534;\n  color: #fff;\n  border-color: #15803d;\n  font-weight: 600;\n}\n.agenda-calendario-dia.has-agendamento[_ngcontent-%COMP%]:not(:disabled):hover {\n  background: #15803d;\n  border-color: #16a34a;\n}\n.agenda-calendario-dia.selected[_ngcontent-%COMP%] {\n  border-color: #ff9000;\n  box-shadow: 0 0 0 2px rgba(255, 144, 0, 0.4);\n}\n.agenda-calendario-leyenda[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  font-size: 0.8rem;\n  color: #737373;\n  text-align: center;\n}\n.agenda-dia-list[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #262626;\n}\n.agenda-dia-list-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.agenda-dia-list-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  font-size: 0.95rem;\n}\n.agenda-dia-list-fechar[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  font-size: 0.8rem;\n  background: #262626;\n  border: 1px solid #333;\n  color: #a3a3a3;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.agenda-dia-list-fechar[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.agenda-dia-list-ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n  max-height: 220px;\n  overflow-y: auto;\n}\n.agenda-dia-list-li[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr auto 1fr;\n  gap: 12px;\n  align-items: center;\n  padding: 10px 12px;\n  background: #262626;\n  border-radius: 8px;\n  margin-bottom: 6px;\n  font-size: 0.85rem;\n  border: 1px solid #333;\n}\n.agenda-dia-cliente[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #fff;\n}\n.agenda-dia-hora[_ngcontent-%COMP%] {\n  color: #ff9000;\n  font-weight: 500;\n}\n.agenda-dia-cabeleireiro[_ngcontent-%COMP%] {\n  color: #a3a3a3;\n  text-align: right;\n}\n.agenda-dia-list-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 16px;\n  text-align: center;\n  color: #737373;\n  font-size: 0.9rem;\n  background: #262626;\n  border-radius: 8px;\n  border: 1px solid #333;\n}\n.atendimentos-dia-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.atendimentos-dia-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 420px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);\n}\n.atendimentos-dia-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n  flex-shrink: 0;\n}\n.atendimentos-dia-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.atendimentos-dia-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.atendimentos-dia-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.atendimentos-dia-close[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.atendimentos-dia-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  max-height: calc(85vh - 70px);\n}\n.atendimentos-dia-loading[_ngcontent-%COMP%], \n.atendimentos-dia-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #737373;\n  font-size: 0.95rem;\n  text-align: center;\n  padding: 24px;\n}\n.atendimentos-dia-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #2c2c2c;\n  border-radius: 10px;\n  border: 1px solid #333;\n}\n.atendimentos-dia-card-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #ff9000;\n  color: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.atendimentos-dia-card-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.atendimentos-dia-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.atendimentos-dia-card-nome[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #fff;\n  font-size: 1rem;\n}\n.atendimentos-dia-card-hora[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.atendimentos-dia-card-servico[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n}\n.atendimentos-dia-card-valor[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #ff9000;\n  font-size: 1rem;\n  flex-shrink: 0;\n}\n.atendimentos-dia-item[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n}\n.atendimentos-dia-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.atendimentos-dia-card-clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\n.atendimentos-dia-card-clickable[_ngcontent-%COMP%]:hover {\n  background: #333;\n  border-color: #404040;\n}\n.atendimentos-dia-card-chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: #737373;\n  font-size: 0.9rem;\n  margin-left: 8px;\n}\n.atendimentos-dia-detalhe[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  padding: 14px 16px 14px 56px;\n  background: #252525;\n  border-radius: 10px;\n  border: 1px solid #333;\n  font-size: 0.9rem;\n}\n.atendimentos-dia-detalhe-loading[_ngcontent-%COMP%], \n.atendimentos-dia-detalhe-empty[_ngcontent-%COMP%] {\n  color: #a3a3a3;\n  margin: 0;\n  font-size: 0.9rem;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e5e5e5;\n  display: block;\n  margin-bottom: 6px;\n  font-size: 0.85rem;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  color: #a3a3a3;\n  padding: 4px 0;\n  border-bottom: 1px solid #2c2c2c;\n}\n.atendimentos-dia-detalhe-block[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.panel-head-prof[_ngcontent-%COMP%]   .prof-head-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.prof-filter-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.btn-prof-filtro[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.btn-prof-filtro[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.btn-prof-filtro[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.btn-prof-filtro.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  color: #000;\n  border-color: #ff9000;\n}\n.prof-filter-panel[_ngcontent-%COMP%] {\n  position: absolute;\n  top: calc(100% + 8px);\n  right: 0;\n  z-index: 50;\n  min-width: 260px;\n  padding: 16px;\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n}\n.prof-filter-panel[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #a3a3a3;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], \n.prof-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 6px;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus, \n.prof-filter-panel[_ngcontent-%COMP%]   .filter-field[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\n  border-color: #ff9000;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .btn-prof-pesquisar[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #000;\n  border: none;\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .btn-prof-pesquisar[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e67e00;\n}\n.prof-filter-panel[_ngcontent-%COMP%]   .btn-prof-pesquisar[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.prof-modal-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.prof-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border: 1px solid #262626;\n  border-radius: 12px;\n  width: 100%;\n  max-width: 440px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5);\n}\n.prof-modal-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n  flex-shrink: 0;\n}\n.prof-modal-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.prof-modal-close[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.prof-modal-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.prof-modal-close[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.prof-modal-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n}\n.prof-list-modal[_ngcontent-%COMP%] {\n  max-height: none;\n}\n.prof-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.prof-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 0;\n  border-bottom: 1px solid #262626;\n}\n.prof-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.prof-avatar[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  object-fit: cover;\n  background: #262626;\n  flex-shrink: 0;\n}\n.prof-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.prof-info[_ngcontent-%COMP%]   .prof-nome[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #fff;\n}\n.prof-info[_ngcontent-%COMP%]   .prof-media[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #ff9000;\n  font-weight: 500;\n}\n.prof-valor[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-weight: 600;\n  color: #ff9000;\n  font-size: 0.95rem;\n}\n.prof-bar-wrap[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 6px;\n  background: #262626;\n  border-radius: 3px;\n  overflow: hidden;\n  flex-shrink: 0;\n}\n.prof-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #ff9000;\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n.prof-empty[_ngcontent-%COMP%] {\n  padding: 16px 0;\n  color: #525252;\n  font-size: 0.9rem;\n}\n.agenda-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.agenda-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 0;\n  border-bottom: 1px solid #262626;\n}\n.agenda-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.agenda-hora[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #ff9000;\n  min-width: 56px;\n}\n.agenda-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.agenda-body[_ngcontent-%COMP%]   .agenda-servico[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #fff;\n}\n.agenda-body[_ngcontent-%COMP%]   .agenda-pessoas[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #737373;\n}\n.agenda-body[_ngcontent-%COMP%]   .agenda-pessoas[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\n.agenda-item[_ngcontent-%COMP%]   .pi-chevron-right[_ngcontent-%COMP%] {\n  color: #525252;\n  font-size: 0.9rem;\n}\n.agenda-empty[_ngcontent-%COMP%] {\n  padding: 16px 0;\n  color: #525252;\n  font-size: 0.9rem;\n}\n.atividade-panel[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: #fff;\n  margin: 0 0 16px 0;\n}\n.atividade-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.atividade-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid #262626;\n}\n.atividade-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.atividade-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.atividade-dot.green[_ngcontent-%COMP%] {\n  background: #22c55e;\n}\n.atividade-dot.orange[_ngcontent-%COMP%] {\n  background: #ff9000;\n}\n.atividade-texto[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #a3a3a3;\n}\n.atividade-empty[_ngcontent-%COMP%] {\n  padding: 16px 0;\n  color: #525252;\n  font-size: 0.9rem;\n}\n.loading-state[_ngcontent-%COMP%] {\n  padding: 48px;\n  text-align: center;\n  color: #737373;\n}\n.notificacoes-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1150;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.notificacoes-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 520px;\n  max-height: 80vh;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n  display: flex;\n  flex-direction: column;\n}\n.notificacoes-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.notificacoes-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.notificacoes-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.notificacoes-close[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.notificacoes-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.notificacoes-body[_ngcontent-%COMP%] {\n  padding: 12px 20px 16px;\n  overflow-y: auto;\n  max-height: calc(80vh - 60px);\n}\n.notificacoes-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: 20px 0;\n  text-align: center;\n  font-size: 0.9rem;\n  color: #737373;\n}\n.notificacoes-list[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin: 0;\n}\n.notificacao-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 10px 0;\n  border-bottom: 1px solid #262626;\n  cursor: pointer;\n  transition: background 0.15s ease, border-color 0.15s ease;\n}\n.notificacao-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.notificacao-item[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 144, 0, 0.08);\n  border-color: rgba(255, 144, 0, 0.3);\n}\n.notificacao-item.lida[_ngcontent-%COMP%] {\n  opacity: 0.7;\n}\n.notificacao-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.notificacao-titulo[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #fff;\n}\n.notificacao-subtitulo[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #e5e5e5;\n}\n.notificacao-detalhe[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  color: #a3a3a3;\n}\n.notificacao-valor[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #e5e5e5;\n}\n.notificacao-valor[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\n.notificacao-side[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  gap: 4px;\n  flex-shrink: 0;\n}\n.notificacao-tipo[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  text-transform: uppercase;\n  letter-spacing: 0.06em;\n  color: #ff9000;\n}\n.notificacao-tempo[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #737373;\n}\n.recebimento-toast[_ngcontent-%COMP%] {\n  position: fixed;\n  right: 32px;\n  bottom: 32px;\n  z-index: 1100;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 16px;\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #ff9000;\n  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);\n  cursor: pointer;\n  min-width: 260px;\n  max-width: 360px;\n}\n.recebimento-toast-icon[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #ff9000;\n  color: #1a1a1a;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.recebimento-toast-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.recebimento-toast-content[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.recebimento-toast-title[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #fff;\n}\n.recebimento-toast-text[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #e5e5e5;\n}\n.recebimento-toast-tempo[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #737373;\n}\n.recebimento-toast-close[_ngcontent-%COMP%] {\n  width: 28px;\n  height: 28px;\n  border-radius: 999px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: background 0.2s, color 0.2s;\n}\n.recebimento-toast-close[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.recebimento-toast-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.recebimento-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1200;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.recebimento-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 420px;\n  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.6);\n  display: flex;\n  flex-direction: column;\n}\n.recebimento-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.recebimento-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.recebimento-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background 0.2s, color 0.2s;\n}\n.recebimento-close[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.recebimento-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.recebimento-body[_ngcontent-%COMP%] {\n  padding: 18px 20px 20px;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.recebimento-cliente[_ngcontent-%COMP%], \n.recebimento-valor[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.95rem;\n  color: #e5e5e5;\n}\n.recebimento-cliente[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%], \n.recebimento-valor[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.recebimento-valor[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #ff9000;\n}\n.recebimento-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 500;\n  color: #a3a3a3;\n  margin-top: 4px;\n}\n.recebimento-tipo-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.recebimento-tipo-btn[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 999px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #e5e5e5;\n  font-size: 0.85rem;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.recebimento-tipo-btn[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.recebimento-tipo-btn.active[_ngcontent-%COMP%] {\n  background: #ff9000;\n  border-color: #ff9000;\n  color: #1a1a1a;\n}\n.recebimento-erro[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  font-size: 0.85rem;\n  color: #ef4444;\n}\n.recebimento-footer[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.recebimento-btn-sec[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #e5e5e5;\n  font-size: 0.9rem;\n  cursor: pointer;\n  transition:\n    background 0.2s,\n    color 0.2s,\n    border-color 0.2s;\n}\n.recebimento-btn-sec[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.recebimento-btn-pri[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n  border-radius: 8px;\n  border: none;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n  min-width: 170px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.2s, opacity 0.2s;\n}\n.recebimento-btn-pri[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e67e00;\n}\n.recebimento-btn-pri[_ngcontent-%COMP%]:disabled {\n  opacity: 0.8;\n  cursor: not-allowed;\n}\n@media (max-width: 1200px) {\n  .cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .grid-bottom[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 768px) {\n  .dashboard[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .sidebar[_ngcontent-%COMP%] {\n    width: 100%;\n    min-width: unset;\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 12px;\n    gap: 12px;\n  }\n  .sidebar-logo[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .sidebar-nav[_ngcontent-%COMP%] {\n    flex: 1;\n    flex-direction: row;\n    flex-wrap: wrap;\n    padding: 0;\n  }\n  .sidebar-footer[_ngcontent-%COMP%] {\n    width: 100%;\n    border-top: none;\n  }\n  .profile-card[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n  }\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .header-right[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .search-wrap[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n  }\n  .cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.prod-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1150;\n  background: rgba(0, 0, 0, 0.7);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.prod-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 720px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.prod-modal-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.prod-modal-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.prod-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.prod-modal-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 20px;\n  border-bottom: 1px solid #262626;\n}\n.prod-search-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  background: #262626;\n  border-radius: 8px;\n  border: 1px solid #333;\n}\n.prod-search-wrap[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  color: #737373;\n  font-size: 0.95rem;\n}\n.prod-search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  background: transparent;\n  color: #fff;\n  font-size: 0.9rem;\n  outline: none;\n}\n.prod-search-input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\n.prod-btn-add[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  background: #ff9000;\n  color: #1a1a1a;\n  border: none;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.prod-btn-add[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n}\n.prod-btn-add[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.prod-err[_ngcontent-%COMP%] {\n  margin: 0 20px 8px;\n  font-size: 0.85rem;\n  color: #ef4444;\n}\n.prod-modal-body[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n}\n.prod-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.9rem;\n}\n.prod-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.prod-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 10px 12px;\n  text-align: left;\n  border-bottom: 1px solid #262626;\n  color: #e5e5e5;\n}\n.prod-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #a3a3a3;\n}\n.prod-table[_ngcontent-%COMP%]   .th-img[_ngcontent-%COMP%] {\n  width: 56px;\n}\n.prod-table[_ngcontent-%COMP%]   .th-num[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: right;\n}\n.prod-table[_ngcontent-%COMP%]   .th-actions[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n}\n.prod-table[_ngcontent-%COMP%]   .td-num[_ngcontent-%COMP%] {\n  text-align: right;\n}\n.prod-table[_ngcontent-%COMP%]   .td-actions[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.prod-row-img[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  object-fit: cover;\n  border-radius: 8px;\n  display: block;\n}\n.prod-row-placeholder[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 8px;\n  background: #262626;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #737373;\n}\n.prod-row-placeholder[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n.prod-btn-action[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  margin: 0 2px;\n  border: none;\n  background: #262626;\n  color: #e5e5e5;\n  border-radius: 8px;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-btn-action[_ngcontent-%COMP%]:hover {\n  background: #333;\n  color: #fff;\n}\n.prod-btn-action.danger[_ngcontent-%COMP%]:hover {\n  background: #7f1d1d;\n  color: #fca5a5;\n}\n.prod-btn-action[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.prod-empty[_ngcontent-%COMP%] {\n  padding: 24px;\n  text-align: center;\n  color: #737373;\n  font-size: 0.9rem;\n}\n.prod-form-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  z-index: 1250;\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.prod-form-modal[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 420px;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.prod-form-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 20px;\n  border-bottom: 1px solid #262626;\n}\n.prod-form-head[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: #fff;\n}\n.prod-form-close[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border: none;\n  background: transparent;\n  color: #a3a3a3;\n  border-radius: 8px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.prod-form-close[_ngcontent-%COMP%]:hover {\n  background: #262626;\n  color: #fff;\n}\n.prod-form-body[_ngcontent-%COMP%] {\n  padding: 18px 20px 20px;\n}\n.prod-form-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.8rem;\n  color: #a3a3a3;\n  margin-top: 12px;\n  margin-bottom: 6px;\n}\n.prod-form-body[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n.prod-form-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 0.95rem;\n  box-sizing: border-box;\n  outline: none;\n}\n.prod-form-input[_ngcontent-%COMP%]::placeholder {\n  color: #525252;\n}\n.prod-form-input[type=time][_ngcontent-%COMP%], \n.prod-form-input[type=date][_ngcontent-%COMP%] {\n  min-height: 40px;\n}\nselect.prod-form-input[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.prod-form-file-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.prod-form-file[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.prod-form-file-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 10px 16px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #a3a3a3;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.prod-form-file-label[_ngcontent-%COMP%]:hover {\n  color: #fff;\n}\n.prod-form-file-label.prod-form-file-label--orange[_ngcontent-%COMP%] {\n  background: #ff9000;\n  border-color: #ff9000;\n  color: #1a1a1a;\n  font-weight: 600;\n}\n.prod-form-file-label.prod-form-file-label--orange[_ngcontent-%COMP%]:hover {\n  background: #e67e00;\n  border-color: #e67e00;\n  color: #1a1a1a;\n}\n.prod-form-imagem-preview[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 0.85rem;\n  color: #22c55e;\n}\n.prod-form-err[_ngcontent-%COMP%] {\n  margin: 12px 0 0;\n  font-size: 0.85rem;\n  color: #ef4444;\n}\n.prod-form-footer[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n}\n.prod-form-btn-sec[_ngcontent-%COMP%] {\n  padding: 10px 16px;\n  border-radius: 8px;\n  border: 1px solid #333;\n  background: #262626;\n  color: #e5e5e5;\n  font-size: 0.9rem;\n  cursor: pointer;\n}\n.prod-form-btn-sec[_ngcontent-%COMP%]:hover {\n  background: #333;\n}\n.prod-form-btn-pri[_ngcontent-%COMP%] {\n  padding: 10px 20px;\n  border-radius: 8px;\n  border: none;\n  background: #ff9000;\n  color: #1a1a1a;\n  font-size: 0.9rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.prod-form-btn-pri[_ngcontent-%COMP%]:disabled {\n  opacity: 0.7;\n  cursor: not-allowed;\n}\n.prod-form-btn-pri[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: #e67e00;\n}\n.agenda-modal-sidebar[_ngcontent-%COMP%] {\n  background: #1a1a1a;\n  border-radius: 12px;\n  border: 1px solid #262626;\n  width: 100%;\n  max-width: 720px;\n  max-height: 85vh;\n  display: flex;\n  flex-direction: column;\n  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.6);\n}\n.agenda-modal-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding: 12px 20px;\n  border-bottom: 1px solid #262626;\n}\n.agenda-modal-toolbar[_ngcontent-%COMP%]   .prod-search-wrap[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n}\n.agenda-modal-mes-wrap[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.agenda-modal-mes-wrap[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #a3a3a3;\n  margin: 0;\n}\n.agenda-mes-input[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  background: #262626;\n  border: 1px solid #333;\n  border-radius: 8px;\n  color: #fff;\n  font-size: 0.9rem;\n}\n.agenda-modal-list[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  overflow-y: auto;\n  flex: 1;\n  min-height: 0;\n}\n.agenda-table-inline[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.agenda-th-acoes[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n  white-space: nowrap;\n}\n.agenda-td-acoes[_ngcontent-%COMP%] {\n  text-align: center;\n  white-space: nowrap;\n}\n.agenda-btn-acao[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  margin: 0 2px;\n  transition: background 0.2s, color 0.2s;\n}\n.agenda-btn-acao[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n}\n.agenda-btn-editar[_ngcontent-%COMP%] {\n  background: #262626;\n  color: #a3a3a3;\n}\n.agenda-btn-editar[_ngcontent-%COMP%]:hover {\n  background: #ff9000;\n  color: #000;\n}\n.agenda-btn-excluir[_ngcontent-%COMP%] {\n  background: #262626;\n  color: #a3a3a3;\n}\n.agenda-btn-excluir[_ngcontent-%COMP%]:hover {\n  background: #ef4444;\n  color: #fff;\n}\n/*# sourceMappingURL=dashboard.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\pages\\dashboard\\dashboard.component.ts", lineNumber: 34 });
})();

// src/app/pages/dashboard/dashboard-wrapper.component.ts
function DashboardWrapperComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-dashboard-recepcao");
  }
}
function DashboardWrapperComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-dashboard");
  }
}
var DashboardWrapperComponent = class _DashboardWrapperComponent {
  constructor(auth) {
    this.auth = auth;
    this.perfil = computed(() => (this.auth.user()?.perfil ?? "").toUpperCase());
    this.isRecepcao = computed(() => {
      const p = this.perfil();
      return p === "RECEPCAO" || p === "RECEPCIONISTA";
    });
  }
  static {
    this.\u0275fac = function DashboardWrapperComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardWrapperComponent)(\u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardWrapperComponent, selectors: [["app-dashboard-wrapper"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, template: function DashboardWrapperComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, DashboardWrapperComponent_Conditional_0_Template, 1, 0, "app-dashboard-recepcao")(1, DashboardWrapperComponent_Conditional_1_Template, 1, 0, "app-dashboard");
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.isRecepcao() ? 0 : 1);
      }
    }, dependencies: [CommonModule, DashboardComponent, DashboardRecepcaoComponent], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n/*# sourceMappingURL=dashboard-wrapper.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardWrapperComponent, { className: "DashboardWrapperComponent", filePath: "src\\app\\pages\\dashboard\\dashboard-wrapper.component.ts", lineNumber: 20 });
})();
export {
  DashboardWrapperComponent
};
//# sourceMappingURL=chunk-UIHAYMPY.js.map
