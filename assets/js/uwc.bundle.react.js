var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i8 = decorators.length - 1, decorator; i8 >= 0; i8--)
    if (decorator = decorators[i8])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/button/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t6, e9, o10) {
    if (this._$cssResult$ = true, o10 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e9;
  }
  get styleSheet() {
    let t6 = this.o;
    const s5 = this.t;
    if (e && void 0 === t6) {
      const e9 = void 0 !== s5 && 1 === s5.length;
      e9 && (t6 = o.get(s5)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && o.set(s5, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var i = (t6, ...e9) => {
  const o10 = 1 === t6.length ? t6[0] : e9.reduce((e10, s5, o11) => e10 + ((t7) => {
    if (true === t7._$cssResult$) return t7.cssText;
    if ("number" == typeof t7) return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t6[o11 + 1], t6[0]);
  return new n(o10, t6, s);
};
var S = (s5, o10) => {
  if (e) s5.adoptedStyleSheets = o10.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else for (const e9 of o10) {
    const o11 = document.createElement("style"), n6 = t.litNonce;
    void 0 !== n6 && o11.setAttribute("nonce", n6), o11.textContent = e9.cssText, s5.appendChild(o11);
  }
};
var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e9 = "";
  for (const s5 of t7.cssRules) e9 += s5.cssText;
  return r(e9);
})(t6) : t6;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t6, s5) => t6;
var u = { toAttribute(t6, s5) {
  switch (s5) {
    case Boolean:
      t6 = t6 ? l : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, s5) {
  let i8 = t6;
  switch (s5) {
    case Boolean:
      i8 = null !== t6;
      break;
    case Number:
      i8 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i8 = JSON.parse(t6);
      } catch (t7) {
        i8 = null;
      }
  }
  return i8;
} };
var f = (t6, s5) => !i2(t6, s5);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t6) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t6);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t6, s5 = b) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t6) && ((s5 = Object.create(s5)).wrapped = true), this.elementProperties.set(t6, s5), !s5.noAccessor) {
      const i8 = /* @__PURE__ */ Symbol(), h4 = this.getPropertyDescriptor(t6, i8, s5);
      void 0 !== h4 && e2(this.prototype, t6, h4);
    }
  }
  static getPropertyDescriptor(t6, s5, i8) {
    const { get: e9, set: r7 } = h(this.prototype, t6) ?? { get() {
      return this[s5];
    }, set(t7) {
      this[s5] = t7;
    } };
    return { get: e9, set(s6) {
      const h4 = e9?.call(this);
      r7?.call(this, s6), this.requestUpdate(t6, h4, i8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t6 = n2(this);
    t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t7 = this.properties, s5 = [...r2(t7), ...o2(t7)];
      for (const i8 of s5) this.createProperty(i8, t7[i8]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s5 = litPropertyMetadata.get(t6);
      if (void 0 !== s5) for (const [t7, i8] of s5) this.elementProperties.set(t7, i8);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s5] of this.elementProperties) {
      const i8 = this._$Eu(t7, s5);
      void 0 !== i8 && this._$Eh.set(i8, t7);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i8 = [];
    if (Array.isArray(s5)) {
      const e9 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e9) i8.unshift(c(s6));
    } else void 0 !== s5 && i8.push(c(s5));
    return i8;
  }
  static _$Eu(t6, s5) {
    const i8 = s5.attribute;
    return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
  }
  addController(t6) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
  }
  removeController(t6) {
    this._$EO?.delete(t6);
  }
  _$E_() {
    const t6 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i8 of s5.keys()) this.hasOwnProperty(i8) && (t6.set(i8, this[i8]), delete this[i8]);
    t6.size > 0 && (this._$Ep = t6);
  }
  createRenderRoot() {
    const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t6, this.constructor.elementStyles), t6;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t6) => t6.hostDisconnected?.());
  }
  attributeChangedCallback(t6, s5, i8) {
    this._$AK(t6, i8);
  }
  _$ET(t6, s5) {
    const i8 = this.constructor.elementProperties.get(t6), e9 = this.constructor._$Eu(t6, i8);
    if (void 0 !== e9 && true === i8.reflect) {
      const h4 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u).toAttribute(s5, i8.type);
      this._$Em = t6, null == h4 ? this.removeAttribute(e9) : this.setAttribute(e9, h4), this._$Em = null;
    }
  }
  _$AK(t6, s5) {
    const i8 = this.constructor, e9 = i8._$Eh.get(t6);
    if (void 0 !== e9 && this._$Em !== e9) {
      const t7 = i8.getPropertyOptions(e9), h4 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
      this._$Em = e9;
      const r7 = h4.fromAttribute(s5, t7.type);
      this[e9] = r7 ?? this._$Ej?.get(e9) ?? r7, this._$Em = null;
    }
  }
  requestUpdate(t6, s5, i8, e9 = false, h4) {
    if (void 0 !== t6) {
      const r7 = this.constructor;
      if (false === e9 && (h4 = this[t6]), i8 ?? (i8 = r7.getPropertyOptions(t6)), !((i8.hasChanged ?? f)(h4, s5) || i8.useDefault && i8.reflect && h4 === this._$Ej?.get(t6) && !this.hasAttribute(r7._$Eu(t6, i8)))) return;
      this.C(t6, s5, i8);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t6, s5, { useDefault: i8, reflect: e9, wrapped: h4 }, r7) {
    i8 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t6) && (this._$Ej.set(t6, r7 ?? s5 ?? this[t6]), true !== h4 || void 0 !== r7) || (this._$AL.has(t6) || (this.hasUpdated || i8 || (s5 = void 0), this._$AL.set(t6, s5)), true === e9 && this._$Em !== t6 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t6));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t8, s6] of this._$Ep) this[t8] = s6;
        this._$Ep = void 0;
      }
      const t7 = this.constructor.elementProperties;
      if (t7.size > 0) for (const [s6, i8] of t7) {
        const { wrapped: t8 } = i8, e9 = this[s6];
        true !== t8 || this._$AL.has(s6) || void 0 === e9 || this.C(s6, void 0, i8, e9);
      }
    }
    let t6 = false;
    const s5 = this._$AL;
    try {
      t6 = this.shouldUpdate(s5), t6 ? (this.willUpdate(s5), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s5)) : this._$EM();
    } catch (s6) {
      throw t6 = false, this._$EM(), s6;
    }
    t6 && this._$AE(s5);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t7) => this._$ET(t7, this[t7]))), this._$EM();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t6) => t6;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var u2 = Array.isArray;
var d2 = (t6) => u2(t6) || "function" == typeof t6?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t6) => (i8, ...s5) => ({ _$litType$: t6, strings: i8, values: s5 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t6, i8) {
  if (!u2(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i8) : i8;
}
var N = (t6, i8) => {
  const s5 = t6.length - 1, e9 = [];
  let n6, l4 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c5 = v;
  for (let i9 = 0; i9 < s5; i9++) {
    const s6 = t6[i9];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n6 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n6 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n6 = void 0);
    const x2 = c5 === p2 && t6[i9 + 1].startsWith("/>") ? " " : "";
    l4 += c5 === v ? s6 + r3 : d3 >= 0 ? (e9.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i9 : x2);
  }
  return [V(t6, l4 + (t6[s5] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), e9];
};
var S2 = class _S {
  constructor({ strings: t6, _$litType$: i8 }, e9) {
    let r7;
    this.parts = [];
    let l4 = 0, a3 = 0;
    const u5 = t6.length - 1, d3 = this.parts, [f3, v3] = N(t6, i8);
    if (this.el = _S.createElement(f3, e9), P.currentNode = this.el.content, 2 === i8 || 3 === i8) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r7 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t7 of r7.getAttributeNames()) if (t7.endsWith(h2)) {
          const i9 = v3[a3++], s5 = r7.getAttribute(t7).split(o3), e10 = /([.?@])?(.*)/.exec(i9);
          d3.push({ type: 1, index: l4, name: e10[2], strings: s5, ctor: "." === e10[1] ? I : "?" === e10[1] ? L : "@" === e10[1] ? z : H }), r7.removeAttribute(t7);
        } else t7.startsWith(o3) && (d3.push({ type: 6, index: l4 }), r7.removeAttribute(t7));
        if (y2.test(r7.tagName)) {
          const t7 = r7.textContent.split(o3), i9 = t7.length - 1;
          if (i9 > 0) {
            r7.textContent = s2 ? s2.emptyScript : "";
            for (let s5 = 0; s5 < i9; s5++) r7.append(t7[s5], c3()), P.nextNode(), d3.push({ type: 2, index: ++l4 });
            r7.append(t7[i9], c3());
          }
        }
      } else if (8 === r7.nodeType) if (r7.data === n3) d3.push({ type: 2, index: l4 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = r7.data.indexOf(o3, t7 + 1)); ) d3.push({ type: 7, index: l4 }), t7 += o3.length - 1;
      }
      l4++;
    }
  }
  static createElement(t6, i8) {
    const s5 = l2.createElement("template");
    return s5.innerHTML = t6, s5;
  }
};
function M(t6, i8, s5 = t6, e9) {
  if (i8 === E) return i8;
  let h4 = void 0 !== e9 ? s5._$Co?.[e9] : s5._$Cl;
  const o10 = a2(i8) ? void 0 : i8._$litDirective$;
  return h4?.constructor !== o10 && (h4?._$AO?.(false), void 0 === o10 ? h4 = void 0 : (h4 = new o10(t6), h4._$AT(t6, s5, e9)), void 0 !== e9 ? (s5._$Co ?? (s5._$Co = []))[e9] = h4 : s5._$Cl = h4), void 0 !== h4 && (i8 = M(t6, h4._$AS(t6, i8.values), h4, e9)), i8;
}
var R = class {
  constructor(t6, i8) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i8;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    const { el: { content: i8 }, parts: s5 } = this._$AD, e9 = (t6?.creationScope ?? l2).importNode(i8, true);
    P.currentNode = e9;
    let h4 = P.nextNode(), o10 = 0, n6 = 0, r7 = s5[0];
    for (; void 0 !== r7; ) {
      if (o10 === r7.index) {
        let i9;
        2 === r7.type ? i9 = new k(h4, h4.nextSibling, this, t6) : 1 === r7.type ? i9 = new r7.ctor(h4, r7.name, r7.strings, this, t6) : 6 === r7.type && (i9 = new Z(h4, this, t6)), this._$AV.push(i9), r7 = s5[++n6];
      }
      o10 !== r7?.index && (h4 = P.nextNode(), o10++);
    }
    return P.currentNode = l2, e9;
  }
  p(t6) {
    let i8 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t6, s5, i8), i8 += s5.strings.length - 2) : s5._$AI(t6[i8])), i8++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t6, i8, s5, e9) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i8, this._$AM = s5, this.options = e9, this._$Cv = e9?.isConnected ?? true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i8 = this._$AM;
    return void 0 !== i8 && 11 === t6?.nodeType && (t6 = i8.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i8 = this) {
    t6 = M(this, t6, i8), a2(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== E && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : d2(t6) ? this.k(t6) : this._(t6);
  }
  O(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  T(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
  }
  _(t6) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(l2.createTextNode(t6)), this._$AH = t6;
  }
  $(t6) {
    const { values: i8, _$litType$: s5 } = t6, e9 = "number" == typeof s5 ? this._$AC(t6) : (void 0 === s5.el && (s5.el = S2.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e9) this._$AH.p(i8);
    else {
      const t7 = new R(e9, this), s6 = t7.u(this.options);
      t7.p(i8), this.T(s6), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i8 = C.get(t6.strings);
    return void 0 === i8 && C.set(t6.strings, i8 = new S2(t6)), i8;
  }
  k(t6) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i8 = this._$AH;
    let s5, e9 = 0;
    for (const h4 of t6) e9 === i8.length ? i8.push(s5 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s5 = i8[e9], s5._$AI(h4), e9++;
    e9 < i8.length && (this._$AR(s5 && s5._$AB.nextSibling, e9), i8.length = e9);
  }
  _$AR(t6 = this._$AA.nextSibling, s5) {
    for (this._$AP?.(false, true, s5); t6 !== this._$AB; ) {
      const s6 = i3(t6).nextSibling;
      i3(t6).remove(), t6 = s6;
    }
  }
  setConnected(t6) {
    void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t6, i8, s5, e9, h4) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i8, this._$AM = e9, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t6, i8 = this, s5, e9) {
    const h4 = this.strings;
    let o10 = false;
    if (void 0 === h4) t6 = M(this, t6, i8, 0), o10 = !a2(t6) || t6 !== this._$AH && t6 !== E, o10 && (this._$AH = t6);
    else {
      const e10 = t6;
      let n6, r7;
      for (t6 = h4[0], n6 = 0; n6 < h4.length - 1; n6++) r7 = M(this, e10[s5 + n6], i8, n6), r7 === E && (r7 = this._$AH[n6]), o10 || (o10 = !a2(r7) || r7 !== this._$AH[n6]), r7 === A ? t6 = A : t6 !== A && (t6 += (r7 ?? "") + h4[n6 + 1]), this._$AH[n6] = r7;
    }
    o10 && !e9 && this.j(t6);
  }
  j(t6) {
    t6 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === A ? void 0 : t6;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    this.element.toggleAttribute(this.name, !!t6 && t6 !== A);
  }
};
var z = class extends H {
  constructor(t6, i8, s5, e9, h4) {
    super(t6, i8, s5, e9, h4), this.type = 5;
  }
  _$AI(t6, i8 = this) {
    if ((t6 = M(this, t6, i8, 0) ?? A) === E) return;
    const s5 = this._$AH, e9 = t6 === A && s5 !== A || t6.capture !== s5.capture || t6.once !== s5.once || t6.passive !== s5.passive, h4 = t6 !== A && (s5 === A || e9);
    e9 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z = class {
  constructor(t6, i8, s5) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    M(this, t6);
  }
};
var j = { M: h2, P: o3, A: n3, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t6, i8, s5) => {
  const e9 = s5?.renderBefore ?? i8;
  let h4 = e9._$litPart$;
  if (void 0 === h4) {
    const t7 = s5?.renderBefore ?? null;
    e9._$litPart$ = h4 = new k(i8.insertBefore(c3(), t7), t7, void 0, s5 ?? {});
  }
  return h4._$AI(t6), h4;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t6 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t6.firstChild), t6;
  }
  update(t6) {
    const r7 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = D(r7, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ?? (s3.litElementVersions = [])).push("4.2.2");

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t6 = o5, e9, r7) => {
  const { kind: n6, metadata: i8 } = r7;
  let s5 = globalThis.litPropertyMetadata.get(i8);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i8, s5 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t6 = Object.create(t6)).wrapped = true), s5.set(r7.name, t6), "accessor" === n6) {
    const { name: o10 } = r7;
    return { set(r8) {
      const n7 = e9.get.call(this);
      e9.set.call(this, r8), this.requestUpdate(o10, n7, t6, true, r8);
    }, init(e10) {
      return void 0 !== e10 && this.C(o10, void 0, t6, e10), e10;
    } };
  }
  if ("setter" === n6) {
    const { name: o10 } = r7;
    return function(r8) {
      const n7 = this[o10];
      e9.call(this, r8), this.requestUpdate(o10, n7, t6, true, r8);
    };
  }
  throw Error("Unsupported decorator location: " + n6);
};
function n4(t6) {
  return (e9, o10) => "object" == typeof o10 ? r4(t6, e9, o10) : ((t7, e10, o11) => {
    const r7 = e10.hasOwnProperty(o11);
    return e10.constructor.createProperty(o11, t7), r7 ? Object.getOwnPropertyDescriptor(e10, o11) : void 0;
  })(t6, e9, o10);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r7) {
  return n4({ ...r7, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e9, t6, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t6 && Object.defineProperty(e9, t6, c5), c5);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e9, r7) {
  return (n6, s5, i8) => {
    const o10 = (t6) => t6.renderRoot?.querySelector(e9) ?? null;
    if (r7) {
      const { get: e10, set: r8 } = "object" == typeof s5 ? n6 : i8 ?? /* @__PURE__ */ (() => {
        const t6 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t6];
        }, set(e11) {
          this[t6] = e11;
        } };
      })();
      return e4(n6, s5, { get() {
        let t6 = e10.call(this);
        return void 0 === t6 && (t6 = o10(this), (null !== t6 || this.hasUpdated) && r8.call(this, t6)), t6;
      } });
    }
    return e4(n6, s5, { get() {
      return o10(this);
    } });
  };
}

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t6) => (...e9) => ({ _$litDirective$: t6, values: e9 });
var i5 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e9, i8) {
    this._$Ct = t6, this._$AM = e9, this._$Ci = i8;
  }
  _$AS(t6, e9) {
    return this.update(t6, e9);
  }
  update(t6, e9) {
    return this.render(...e9);
  }
};

// node_modules/lit-html/directives/class-map.js
var e7 = e6(class extends i5 {
  constructor(t6) {
    if (super(t6), t6.type !== t3.ATTRIBUTE || "class" !== t6.name || t6.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return " " + Object.keys(t6).filter((s5) => t6[s5]).join(" ") + " ";
  }
  update(s5, [i8]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
      for (const t6 in i8) i8[t6] && !this.nt?.has(t6) && this.st.add(t6);
      return this.render(i8);
    }
    const r7 = s5.element.classList;
    for (const t6 of this.st) t6 in i8 || (r7.remove(t6), this.st.delete(t6));
    for (const t6 in i8) {
      const s6 = !!i8[t6];
      s6 === this.st.has(t6) || this.nt?.has(t6) || (s6 ? (r7.add(t6), this.st.add(t6)) : (r7.remove(t6), this.st.delete(t6)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/if-defined.js
var o6 = (o10) => o10 ?? A;

// src/styles/tokens.ts
var primary = r("#6366f1");
var secondary = r("#64748b");
var success = r("#22c55e");
var warning = r("#f59e0b");
var danger = r("#ef4444");
var info = r("#38bdf8");
var help = r("#a855f7");
var contrast = r("#1e293b");
var surface = r("#ffffff");
var surfaceRaised = r("#f9f8f5");
var border = r("rgba(0,0,0,0.09)");
var borderSubtle = r("rgba(0,0,0,0.06)");
var text = r("#111111");
var textSecondary = r("#64748b");
var textMuted = r("#9ca3af");
var textDisabled = r("#bbbbbb");
var hoverBg = r("rgba(0,0,0,0.04)");
var selectedBg = r("rgba(99,102,241,0.08)");
var radiusXs = r("2px");
var radiusSm = r("4px");
var radiusMd = r("6px");
var radiusLg = r("10px");
var radiusXl = r("14px");
var radiusFull = r("9999px");
var space1 = r("0.25rem");
var space2 = r("0.5rem");
var space3 = r("0.75rem");
var space4 = r("1rem");
var space5 = r("1.25rem");
var space6 = r("1.5rem");
var fontSizeXs = r("0.6875rem");
var fontSizeSm = r("0.75rem");
var fontSizeMd = r("0.875rem");
var fontSizeLg = r("1rem");
var fontSizeXl = r("1.125rem");
var fontWeightNormal = r("400");
var fontWeightMedium = r("500");
var fontWeightSemibold = r("600");
var fontWeightBold = r("700");
var shadowSm = r("0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.10)");
var shadowMd = r("0 4px 8px -2px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)");
var shadowLg = r("0 1px 2px rgba(0,0,0,0.05), 0 4px 8px -2px rgba(0,0,0,0.08), 0 16px 32px -4px rgba(0,0,0,0.12)");
var durationFast = r("80ms");
var durationBase = r("120ms");
var durationslow = r("200ms");
var easingStandard = r("cubic-bezier(0.16, 1, 0.3, 1)");
var easingOut = r("cubic-bezier(0, 0, 0.2, 1)");
var zFloat = r("9999");
var zTooltip = r("10000");
var zDialog = r("10001");

// src/styles/mixins.ts
var hostReset = i`
  :host {
    box-sizing: border-box;
  }
  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }
  :host [hidden] {
    display: none !important;
  }
`;
function floatingPanel(selector, opts = {}) {
  const {
    scaleFrom = "scale(0.96) translateY(-4px)",
    scaleTo = "scale(1) translateY(0)",
    durationVar = "--uwc-panel-duration",
    durationDefault = "200ms",
    easing = "cubic-bezier(0.16, 1, 0.3, 1)"
  } = opts;
  const sel = r(selector);
  const sf = r(scaleFrom);
  const st = r(scaleTo);
  const dv = r(durationVar);
  const dd = r(durationDefault);
  const ez = r(easing);
  return i`
    ${sel} {
      position: fixed;
      inset: 0 auto auto 0;
      margin: 0;
      opacity: 0;
      transform: ${sf};
      transition:
        opacity   var(${dv}, ${dd}) ${ez},
        transform var(${dv}, ${dd}) ${ez},
        display   var(${dv}, ${dd}) allow-discrete,
        overlay   var(${dv}, ${dd}) allow-discrete;
    }
    ${sel}.is-open,
    ${sel}:popover-open {
      opacity: 1;
      transform: ${st};
    }
  `;
}
var placementOrigins = i`
  [data-placement^="bottom"]      { transform-origin: top center;    }
  [data-placement="bottom-start"] { transform-origin: top left;      }
  [data-placement="bottom-end"]   { transform-origin: top right;     }
  [data-placement^="top"]         { transform-origin: bottom center; }
  [data-placement="top-start"]    { transform-origin: bottom left;   }
  [data-placement="top-end"]      { transform-origin: bottom right;  }
  [data-placement^="left"]        { transform-origin: right center;  }
  [data-placement^="right"]       { transform-origin: left center;   }
`;
var placementOriginsExtended = i`
  ${placementOrigins}
  [data-placement="left-start"]  { transform-origin: right top;    }
  [data-placement="left-end"]    { transform-origin: right bottom; }
  [data-placement="right-start"] { transform-origin: left top;     }
  [data-placement="right-end"]   { transform-origin: left bottom;  }
`;

// src/button/styles.ts
var styles_default = [
  hostReset,
  i`
    :host {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      font-size: initial;
    }
    :host([fluid]) { display: block; width: 100%; }

    /* ── Base button ────────────────────────────────────────────────────────── */
    .uwc-btn {
      --_bg:         var(--uwc-btn-bg,        var(--uwc-color-primary,  ${primary}));
      --_color:      var(--uwc-btn-color,     #fff);
      --_border:     var(--uwc-btn-border,    transparent);
      --_radius:     var(--uwc-btn-radius,    var(--uwc-radius-md,     ${radiusMd}));
      --_shadow:     var(--uwc-btn-shadow,    none);
      --_font-size:  var(--uwc-btn-font-size, var(--uwc-font-size-md,  ${fontSizeMd}));
      --_px:         var(--uwc-btn-padding-x, 0.875rem);
      --_py:         var(--uwc-btn-padding-y, 0.5rem);
      --_gap:        var(--uwc-btn-gap,       0.375rem);
      --_transition: var(--uwc-btn-transition,
        background-color ${durationBase} ease,
        box-shadow ${durationBase} ease,
        opacity ${durationBase} ease,
        translate ${durationFast} ease
      );

      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--_gap);
      width: 100%;
      padding-inline: var(--_px);
      padding-block:  var(--_py);
      font-family:    var(--uwc-font-family, inherit);
      font-size:      var(--_font-size);
      font-weight:    var(--uwc-btn-font-weight, ${fontWeightMedium});
      letter-spacing: var(--uwc-btn-letter-spacing, normal);
      text-transform: var(--uwc-btn-text-transform, none);
      line-height:    1.25;
      white-space:    nowrap;
      cursor:         pointer;
      user-select:    none;
      text-decoration: none;
      outline:        none;
      box-sizing:     border-box;

      border:           1px solid var(--_border);
      border-radius:    var(--_radius);
      background-color: var(--_bg);
      color:            var(--_color);
      box-shadow:       var(--_shadow);
      transition:       var(--_transition);
    }
    .uwc-btn:hover  { background-color: color-mix(in oklab, var(--_bg) 100%, white 12%); }
    .uwc-btn:active { background-color: color-mix(in oklab, var(--_bg) 100%, black 6%); translate: 0 1px; }
    .uwc-btn:focus-visible { outline: 2px solid var(--_bg); outline-offset: 2px; }

    /* ── Variants ───────────────────────────────────────────────────────────── */
    .uwc-btn--primary   { --_bg: var(--uwc-color-primary,   ${primary});   }
    .uwc-btn--secondary { --_bg: var(--uwc-color-secondary, ${secondary}); }
    .uwc-btn--success   { --_bg: var(--uwc-color-success,   ${success});   }
    .uwc-btn--info      { --_bg: var(--uwc-color-info,      ${info});      }
    .uwc-btn--warning   { --_bg: var(--uwc-color-warning,   ${warning}); --_color: var(--uwc-btn-warning-color, ${contrast}); }
    .uwc-btn--help      { --_bg: var(--uwc-color-help,      ${help});    }
    .uwc-btn--danger    { --_bg: var(--uwc-color-danger,    ${danger});  }
    .uwc-btn--contrast  { --_bg: var(--uwc-color-contrast,  ${contrast}); --_color: #fff; }

    /* ── Sizes ──────────────────────────────────────────────────────────────── */
    .uwc-btn--small { --_font-size: var(--uwc-font-size-xs, ${fontSizeXs}); --_px: 0.625rem;  --_py: 0.3125rem; }
    .uwc-btn--large { --_font-size: var(--uwc-font-size-lg, ${fontSizeLg}); --_px: 1.125rem;  --_py: 0.6875rem; }

    /* ── Raised ─────────────────────────────────────────────────────────────── */
    .uwc-btn--raised       { --_shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); }
    .uwc-btn--raised:hover { --_shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); }

    /* ── Rounded / Outline / Text / Link ────────────────────────────────────── */
    .uwc-btn--rounded { --_radius: var(--uwc-radius-full, ${radiusFull}); }

    .uwc-btn--outline { --_border: var(--_bg); background-color: transparent; color: var(--_bg); }
    .uwc-btn--outline:hover  { background-color: color-mix(in oklab, var(--_bg) 12%, transparent); }
    .uwc-btn--outline:active { background-color: color-mix(in oklab, var(--_bg) 20%, transparent); }

    .uwc-btn--text { background-color: transparent; border-color: transparent; color: var(--_bg); }
    .uwc-btn--text:hover  { background-color: color-mix(in oklab, var(--_bg) 10%, transparent); }
    .uwc-btn--text:active { background-color: color-mix(in oklab, var(--_bg) 18%, transparent); }

    .uwc-btn--link { background-color: transparent; border-color: transparent; color: var(--_bg); text-decoration: underline; text-underline-offset: 2px; }
    .uwc-btn--link:hover  { background-color: transparent; color: color-mix(in oklab, var(--_bg) 80%, black); }
    .uwc-btn--link:active { translate: 0 0; }

    /* ── Icon-only / top / bottom ────────────────────────────────────────────── */
    .uwc-btn--icon-only { --_px: var(--_py); aspect-ratio: 1/1; gap: 0; justify-content: center; }
    .uwc-btn--icon-only.uwc-btn--small { --_px: 0.3125rem; }
    .uwc-btn--icon-only.uwc-btn--large { --_px: 0.6875rem; }
    .uwc-btn--icon-top,
    .uwc-btn--icon-bottom { flex-direction: column; gap: 0.25rem; }
    .uwc-btn--icon-bottom { flex-direction: column-reverse; }

    /* ── States ─────────────────────────────────────────────────────────────── */
    .uwc-btn--loading  { cursor: wait; }
    .uwc-btn--disabled { pointer-events: none; opacity: 0.6; cursor: not-allowed; }
    .uwc-btn--fluid    { width: 100%; }

    /* ── Inner elements ─────────────────────────────────────────────────────── */
    .uwc-btn__label { display: inline-flex; align-items: center; }
    .uwc-btn__icon  { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }

    /* ── Badge ──────────────────────────────────────────────────────────────── */
    .uwc-btn__badge {
      --_badge-bg:    var(--uwc-btn-badge-bg,    var(--uwc-color-danger, ${danger}));
      --_badge-color: var(--uwc-btn-badge-color, #fff);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.125rem;
      height: 1.125rem;
      padding-inline: 0.3125rem;
      margin-inline-start: 0.125rem;
      font-size: 0.6875rem;
      font-weight: ${fontWeightBold};
      line-height: 1;
      border-radius: var(--uwc-radius-full, ${radiusFull});
      background-color: var(--_badge-bg);
      color: var(--_badge-color);
    }
    .uwc-btn__badge--primary   { --_badge-bg: var(--uwc-color-primary,   ${primary});   }
    .uwc-btn__badge--secondary { --_badge-bg: var(--uwc-color-secondary, ${secondary}); }
    .uwc-btn__badge--success   { --_badge-bg: var(--uwc-color-success,   ${success});   }
    .uwc-btn__badge--info      { --_badge-bg: var(--uwc-color-info,   ${info}); --_badge-color: #111; }
    .uwc-btn__badge--warning   { --_badge-bg: var(--uwc-color-warning, ${warning}); --_badge-color: #111; }
    .uwc-btn__badge--danger    { --_badge-bg: var(--uwc-color-danger,  ${danger});   }
    .uwc-btn__badge--help      { --_badge-bg: var(--uwc-color-help,    ${help});     }
    .uwc-btn__badge--contrast  { --_badge-bg: var(--uwc-color-contrast,${contrast}); }

    /* ── Ripple ─────────────────────────────────────────────────────────────── */
    /* CSS custom properties allow themes to tune ripple feel without JS changes.
       var() inside @keyframes is evaluated at animation-start, so it works in
       all modern browsers. */
    @keyframes uwc-ripple {
      from { opacity: var(--uwc-btn-ripple-opacity, 0.25); transform: scale(0);   }
      to   { opacity: 0; transform: scale(var(--uwc-btn-ripple-scale, 2.5)); }
    }
    .uwc-btn-ripple {
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      pointer-events: none;
      animation: uwc-ripple var(--uwc-btn-ripple-duration, 500ms)
                 var(--uwc-btn-ripple-easing, ease-out) forwards;
      transform-origin: center;
    }
  `
];

// src/button/index.ts
var UwcButton = class extends i4 {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.size = "medium";
    this.type = "button";
    this.iconPos = "left";
    this.iconOnly = false;
    this.loading = false;
    this.loadingIcon = "arrow-clockwise";
    this.raised = false;
    this.rounded = false;
    this.outline = false;
    this.text = false;
    this.link = false;
    this.fluid = false;
    this.disabled = false;
    this.badgeSeverity = "danger";
    this.ariaLabel = null;
    this.autofocus = false;
  }
  // ── Helpers ───────────────────────────────────────────────────────
  _hasSlot(name) {
    return Array.from(this.children).some((el) => el.slot === name);
  }
  _iconSize() {
    return this.size === "small" ? "13px" : this.size === "large" ? "20px" : "15px";
  }
  // ── Ripple ───────────────────────────────────────────────────────
  _handleClick(e9) {
    if (this.disabled || this.loading) return;
    this._spawnRipple(e9);
    this.dispatchEvent(new CustomEvent("uwc-click", { bubbles: true, composed: true, detail: { originalEvent: e9 } }));
  }
  _spawnRipple(e9) {
    const btn = this.shadowRoot.querySelector('[part="button"]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x2 = e9.clientX - rect.left - size / 2;
    const y3 = e9.clientY - rect.top - size / 2;
    const span = document.createElement("span");
    span.className = "uwc-btn-ripple";
    span.style.cssText = `width:${size}px;height:${size}px;left:${x2}px;top:${y3}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove(), { once: true });
  }
  // ── Render ────────────────────────────────────────────────────────
  _renderIcon() {
    const name = this.loading ? this.loadingIcon : this.icon;
    return b2`
      <uwc-icon
        part="icon"
        class="uwc-btn__icon"
        name=${name}
        size=${this._iconSize()}
        ?spin=${this.loading}>
      </uwc-icon>`;
  }
  _renderLabel() {
    if (this.label) {
      return b2`<span part="label" class="uwc-btn__label">${this.label}</span>`;
    }
    return b2`<slot part="label" class="uwc-btn__label"></slot>`;
  }
  _renderBadge() {
    if (!this.badge) return A;
    return b2`<span part="badge" class="uwc-btn__badge uwc-btn__badge--${this.badgeSeverity}">${this.badge}</span>`;
  }
  render() {
    const showIcon = this.icon && !this.loading || this.loading;
    const isVertical = this.iconPos === "top" || this.iconPos === "bottom";
    const classes = e7({
      "uwc-btn": true,
      [`uwc-btn--${this.variant}`]: true,
      [`uwc-btn--${this.size}`]: true,
      "uwc-btn--raised": this.raised,
      "uwc-btn--rounded": this.rounded,
      "uwc-btn--outline": this.outline,
      "uwc-btn--text": this.text,
      "uwc-btn--link": this.link,
      "uwc-btn--fluid": this.fluid,
      "uwc-btn--icon-only": this.iconOnly,
      "uwc-btn--icon-top": isVertical && this.iconPos === "top",
      "uwc-btn--icon-bottom": isVertical && this.iconPos === "bottom",
      "uwc-btn--loading": this.loading,
      "uwc-btn--disabled": this.disabled || this.loading
    });
    const iconEl = showIcon ? this._renderIcon() : A;
    const labelEl = this._renderLabel();
    const prefixEl = !this.loading && this._hasSlot("prefix") ? b2`<slot name="prefix" part="icon" class="uwc-btn__icon"></slot>` : A;
    const suffixEl = this._hasSlot("suffix") ? b2`<slot name="suffix" part="icon" class="uwc-btn__icon"></slot>` : A;
    const badgeEl = this._renderBadge();
    let inner;
    if (this.iconPos === "right") {
      inner = b2`${prefixEl}${labelEl}${iconEl}${suffixEl}${badgeEl}`;
    } else if (this.iconPos === "top") {
      inner = b2`${iconEl}${labelEl}${prefixEl}${suffixEl}${badgeEl}`;
    } else if (this.iconPos === "bottom") {
      inner = b2`${labelEl}${iconEl}${prefixEl}${suffixEl}${badgeEl}`;
    } else {
      inner = b2`${prefixEl}${iconEl}${labelEl}${suffixEl}${badgeEl}`;
    }
    return b2`
      <button
        part="button"
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${o6(this.ariaLabel ?? this.label)}
        aria-busy=${this.loading ? "true" : "false"}
        tabindex=${o6(this.tabindex)}
        ?autofocus=${this.autofocus}
        @click=${this._handleClick}
        @focus=${() => this.dispatchEvent(new CustomEvent("uwc-focus", { bubbles: true, composed: true }))}
        @blur=${() => this.dispatchEvent(new CustomEvent("uwc-blur", { bubbles: true, composed: true }))}
      >
        ${inner}
      </button>`;
  }
};
UwcButton.styles = [styles_default];
__decorateClass([
  n4()
], UwcButton.prototype, "label", 2);
__decorateClass([
  n4({ reflect: true })
], UwcButton.prototype, "variant", 2);
__decorateClass([
  n4({ reflect: true })
], UwcButton.prototype, "size", 2);
__decorateClass([
  n4({ reflect: true })
], UwcButton.prototype, "type", 2);
__decorateClass([
  n4()
], UwcButton.prototype, "icon", 2);
__decorateClass([
  n4({ reflect: true, attribute: "icon-pos" })
], UwcButton.prototype, "iconPos", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true, attribute: "icon-only" })
], UwcButton.prototype, "iconOnly", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "loading", 2);
__decorateClass([
  n4({ attribute: "loading-icon" })
], UwcButton.prototype, "loadingIcon", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "raised", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "rounded", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "outline", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "text", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "link", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "fluid", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "disabled", 2);
__decorateClass([
  n4()
], UwcButton.prototype, "badge", 2);
__decorateClass([
  n4({ attribute: "badge-severity" })
], UwcButton.prototype, "badgeSeverity", 2);
__decorateClass([
  n4({ attribute: "aria-label" })
], UwcButton.prototype, "ariaLabel", 2);
__decorateClass([
  n4({ type: Number })
], UwcButton.prototype, "tabindex", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcButton.prototype, "autofocus", 2);

// src/button/react.ts
var UwcButton2 = createComponent({
  tagName: "uwc-button",
  elementClass: UwcButton,
  react: React,
  events: {
    onUwcClick: "uwc-click",
    onUwcFocus: "uwc-focus",
    onUwcBlur: "uwc-blur"
  }
});

// src/checkbox/react.ts
import { createComponent as createComponent2 } from "@lit/react";
import React2 from "react";

// src/checkbox/styles.ts
var styles_default2 = [
  hostReset,
  i`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* ── Box ────────────────────────────────────────────────────────────────── */
    .uwc-cb {
      --_size:   var(--uwc-checkbox-size,   1.125rem);
      --_radius: var(--uwc-checkbox-radius, ${radiusSm});
      --_border: var(--uwc-checkbox-border, 1px solid #d1d5db);
      --_bg:     var(--uwc-checkbox-bg,     ${surface});
      --_color:  var(--uwc-checkbox-color,  var(--uwc-color-primary, ${primary}));

      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width:  var(--_size);
      height: var(--_size);
      flex-shrink: 0;
      border:        var(--_border);
      border-radius: var(--_radius);
      background:    var(--_bg);
      transition:
        background-color ${durationBase},
        border-color     ${durationBase},
        box-shadow       ${durationBase};
    }

    /* Hidden native checkbox */
    input[type="checkbox"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    /* Checked / indeterminate state */
    :host([checked]) .uwc-cb,
    :host([indeterminate]) .uwc-cb {
      background:   var(--_color);
      border-color: var(--_color);
    }

    /* Checkmark icon */
    .uwc-cb__icon {
      display: none;
      pointer-events: none;
      color: #fff;
      width:  0.6875rem;
      height: 0.6875rem;
    }
    :host([checked]) .uwc-cb__icon--check         { display: block; }
    :host([indeterminate]) .uwc-cb__icon--minus    { display: block; }

    /* Focus ring */
    input[type="checkbox"]:focus-visible ~ .uwc-cb,
    .uwc-cb:focus-within {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--_color) 25%, transparent);
    }

    /* Hover */
    :host(:not([disabled]):not([checked]):not([indeterminate])) .uwc-cb:hover {
      border-color: var(--_color);
    }

    /* ── Invalid ────────────────────────────────────────────────────────────── */
    :host([invalid]) .uwc-cb {
      border-color: var(--uwc-color-danger, ${danger});
    }

    /* ── Filled variant ─────────────────────────────────────────────────────── */
    :host([variant="filled"]:not([checked]):not([indeterminate])) .uwc-cb {
      --_bg: ${surfaceRaised};
      border-color: transparent;
    }

    /* ── Label ──────────────────────────────────────────────────────────────── */
    .uwc-cb__label {
      font-size:   var(--uwc-checkbox-font-size, ${fontSizeMd});
      color:       var(--uwc-checkbox-label-color, ${text});
      line-height: 1.4;
    }
  `
];

// src/checkbox/index.ts
var UwcCheckbox = class extends i4 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.indeterminate = false;
    this.value = "on";
    this.disabled = false;
    this.invalid = false;
    this.variant = "outlined";
  }
  // ── Handlers ─────────────────────────────────────────────────────
  _onChange(e9) {
    const input = e9.target;
    this.checked = input.checked;
    this.indeterminate = false;
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { checked: this.checked, value: this.value, originalEvent: e9 }
    }));
  }
  // ── Icons ─────────────────────────────────────────────────────────
  _checkIcon() {
    return w`
      <svg class="uwc-cb__icon uwc-cb__icon--check" viewBox="0 0 12 11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 5.5 4.5 9 11 1.5"/>
      </svg>`;
  }
  _minusIcon() {
    return w`
      <svg class="uwc-cb__icon uwc-cb__icon--minus" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="2" y1="6" x2="10" y2="6"/>
      </svg>`;
  }
  // ── Render ────────────────────────────────────────────────────────
  render() {
    const labelContent = this.label ? b2`<span part="label" class="uwc-cb__label">${this.label}</span>` : b2`<slot part="label" class="uwc-cb__label"></slot>`;
    return b2`
      <label style="display:inline-flex;align-items:center;gap:0.5rem;cursor:${this.disabled ? "not-allowed" : "pointer"}">
        <span part="box" class="uwc-cb">
          <input
            type="checkbox"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            value=${this.value}
            name=${o6(this.name)}
            ?disabled=${this.disabled}
            @change=${this._onChange}
          />
          ${this._checkIcon()}
          ${this._minusIcon()}
        </span>
        ${labelContent}
      </label>
    `;
  }
};
UwcCheckbox.styles = [styles_default2];
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcCheckbox.prototype, "checked", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcCheckbox.prototype, "indeterminate", 2);
__decorateClass([
  n4()
], UwcCheckbox.prototype, "value", 2);
__decorateClass([
  n4()
], UwcCheckbox.prototype, "name", 2);
__decorateClass([
  n4()
], UwcCheckbox.prototype, "label", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcCheckbox.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcCheckbox.prototype, "invalid", 2);
__decorateClass([
  n4({ reflect: true })
], UwcCheckbox.prototype, "variant", 2);

// src/checkbox/react.ts
var UwcCheckbox2 = createComponent2({
  tagName: "uwc-checkbox",
  elementClass: UwcCheckbox,
  react: React2,
  events: {
    onUwcChange: "uwc-change"
  }
});

// src/colorpicker/react.ts
import { createComponent as createComponent3 } from "@lit/react";
import React3 from "react";

// node_modules/lit-html/directives/style-map.js
var n5 = "important";
var i6 = " !" + n5;
var o7 = e6(class extends i5 {
  constructor(t6) {
    if (super(t6), t6.type !== t3.ATTRIBUTE || "style" !== t6.name || t6.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return Object.keys(t6).reduce((e9, r7) => {
      const s5 = t6[r7];
      return null == s5 ? e9 : e9 + `${r7 = r7.includes("-") ? r7 : r7.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s5};`;
    }, "");
  }
  update(e9, [r7]) {
    const { style: s5 } = e9.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r7)), this.render(r7);
    for (const t6 of this.ft) null == r7[t6] && (this.ft.delete(t6), t6.includes("-") ? s5.removeProperty(t6) : s5[t6] = null);
    for (const t6 in r7) {
      const e10 = r7[t6];
      if (null != e10) {
        this.ft.add(t6);
        const r8 = "string" == typeof e10 && e10.endsWith(i6);
        t6.includes("-") || r8 ? s5.setProperty(t6, r8 ? e10.slice(0, -11) : e10, r8 ? n5 : "") : s5[t6] = e10;
      }
    }
    return E;
  }
});

// src/colorpicker/styles.ts
var styles_default3 = [
  hostReset,
  // Panel enters/exits via the floatingPanel mixin — same as dropdown/popover/tooltip
  floatingPanel(".uwc-cp__panel", { durationVar: "--uwc-cp-duration", durationDefault: "140ms" }),
  placementOrigins,
  i`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    /* ── Trigger swatch ─────────────────────────────────────────────────────── */
    .uwc-cp__swatch {
      --_size:   var(--uwc-colorpicker-swatch-size,   2rem);
      --_radius: var(--uwc-colorpicker-swatch-radius, ${radiusMd});

      display: inline-flex;
      align-items: center;
      justify-content: center;
      width:         var(--_size);
      height:        var(--_size);
      border-radius: var(--_radius);
      border:        1px solid rgba(0,0,0,0.15);
      background:    var(--_swatch-bg, #ffffff);
      cursor:        pointer;
      transition:    box-shadow ${durationBase};
      flex-shrink:   0;
    }
    .uwc-cp__swatch:hover {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-color-primary, ${primary}) 30%, transparent);
    }
    .uwc-cp__swatch:focus-visible {
      outline: 2px solid var(--uwc-color-primary, ${primary});
      outline-offset: 2px;
    }
    .uwc-cp__swatch--open {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-color-primary, ${primary}) 30%, transparent);
    }

    /* Disabled */
    :host([disabled]) { pointer-events: none; opacity: 0.6; }

    /* ── Panel (popover) ────────────────────────────────────────────────────── */
    /* floatingPanel mixin sets position:fixed + opacity/transform animation but
       does NOT set pointer-events. We must do it here so the panel never blocks
       clicks while it is animating out (overlay allow-discrete keeps it in the
       top layer for the full duration of the exit transition). */
    .uwc-cp__panel {
      pointer-events: none;   /* ← closed: invisible AND non-interactive */
      width:         var(--uwc-colorpicker-panel-width, 13.5rem);
      background:    var(--uwc-cp-panel-bg, ${surface});
      border:        1px solid rgba(0,0,0,0.10);
      border-radius: ${radiusLg};
      box-shadow:    ${shadowLg};
      padding:       0.75rem;
      display:       flex;
      flex-direction: column;
      gap:           0.625rem;
      /* Reset browser popover styles */
      color:         ${text};
      font-family:   inherit;
      font-size:     ${fontSizeMd};
    }
    /* Only restore pointer-events when the panel is actually open */
    .uwc-cp__panel.is-open { pointer-events: auto; }

    /* ── Inline mode ────────────────────────────────────────────────────────── */
    :host([inline]) .uwc-cp__swatch  { display: none; }
    :host([inline]) .uwc-cp__panel {
      /* Override floatingPanel: always visible, static flow */
      position:  static !important;
      opacity:   1 !important;
      transform: none !important;
      pointer-events: auto !important;
      box-shadow: ${shadowSm};
    }

    /* ── Color area (SV gradient box) ───────────────────────────────────────── */
    .uwc-cp__area {
      position:    relative;
      width:       100%;
      aspect-ratio: 1 / 0.72;
      border-radius: ${radiusSm};
      overflow:    hidden;
      cursor:      crosshair;
      touch-action: none;
      user-select: none;
    }
    /* Hue layer — right gradient from white to pure hue */
    .uwc-cp__area-hue {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, #fff, hsl(var(--_hue, 0), 100%, 50%));
    }
    /* Dark layer — top gradient from transparent to black */
    .uwc-cp__area-dark {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, #000, transparent);
    }
    /* Cursor circle */
    .uwc-cp__cursor {
      position:      absolute;
      width:         12px;
      height:        12px;
      border-radius: 50%;
      border:        2px solid #fff;
      box-shadow:    0 0 0 1px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(0,0,0,0.1);
      transform:     translate(-50%, -50%);
      pointer-events: none;
    }

    /* ── Hue slider ─────────────────────────────────────────────────────────── */
    .uwc-cp__hue-track {
      position:      relative;
      height:        10px;
      border-radius: ${radiusFull};
      background:    linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
      cursor:        pointer;
      touch-action:  none;
      user-select:   none;
    }

    /* ── Alpha slider ───────────────────────────────────────────────────────── */
    .uwc-cp__alpha-track {
      position:      relative;
      height:        10px;
      border-radius: ${radiusFull};
      cursor:        pointer;
      touch-action:  none;
      user-select:   none;
      background-image:
        linear-gradient(to right, transparent, var(--_alpha-color, #6366f1)),
        repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 10px 10px;
    }

    /* Shared slider thumb */
    .uwc-cp__thumb {
      position:      absolute;
      top:           50%;
      width:         14px;
      height:        14px;
      border-radius: 50%;
      background:    #fff;
      box-shadow:    0 0 0 1px rgba(0,0,0,0.35), 0 1px 3px rgba(0,0,0,0.2);
      transform:     translate(-50%, -50%);
      pointer-events: none;
    }

    /* ── Preview row ────────────────────────────────────────────────────────── */
    .uwc-cp__preview-row {
      display:     flex;
      align-items: center;
      gap:         0.5rem;
    }
    .uwc-cp__preview-swatch {
      width:         1.75rem;
      height:        1.75rem;
      border-radius: ${radiusSm};
      border:        1px solid rgba(0,0,0,0.12);
      flex-shrink:   0;
    }
    .uwc-cp__sliders {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
    }

    /* ── Format inputs ──────────────────────────────────────────────────────── */
    /* align-items:flex-end → button bottom aligns with input bottom,
       format-label bottom aligns with input-label bottom. */
    .uwc-cp__inputs {
      display:     flex;
      gap:         0.375rem;
      align-items: flex-end;
    }

    /* Wrap the format button in the same column-flex structure as an input-wrap
       so it has an equal "label row" at the bottom — keeps all columns bottom-aligned */
    .uwc-cp__format-col {
      display:        flex;
      flex-direction: column;
      align-items:    center;
      gap:            0.125rem;
      flex-shrink:    0;
    }
    .uwc-cp__format-btn {
      display:         inline-flex;
      align-items:     center;
      justify-content: center;
      width:           2rem;
      height:          1.5rem;
      border:          1px solid #d1d5db;
      border-radius:   ${radiusSm};
      background:      transparent;
      cursor:          pointer;
      color:           ${textSecondary};
      font-size:       0.6rem;
      font-weight:     ${fontWeightBold};
      letter-spacing:  0.03em;
      transition:      background ${durationBase};
    }
    .uwc-cp__format-btn:hover { background: ${hoverBg}; }

    /* Invisible spacer that matches the height of .uwc-cp__input-label so
       the format button column is the same total height as an input-wrap column */
    .uwc-cp__format-spacer {
      display:    block;
      height:     0.75rem;   /* matches label line-height */
      visibility: hidden;
    }

    .uwc-cp__input-group {
      display: flex;
      flex:    1;
      gap:     0.25rem;
    }
    .uwc-cp__input-wrap {
      display:         flex;
      flex-direction:  column;
      align-items:     center;
      flex:            1;
      gap:             0.125rem;
    }
    .uwc-cp__input-field {
      width:       100%;
      padding:     0.25rem;
      font-size:   0.7rem;
      font-family: inherit;
      text-align:  center;
      border:      1px solid #d1d5db;
      border-radius: ${radiusXs};
      outline:     none;
      background:  ${surface};
      color:       ${text};
      transition:  border-color ${durationBase};
    }
    .uwc-cp__input-field:focus { border-color: var(--uwc-color-primary, ${primary}); }
    .uwc-cp__input-label {
      font-size:      0.6rem;
      line-height:    0.75rem;
      color:          ${textMuted};
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `
];

// src/utils/dom.utils.ts
function deepQueryById(root, id) {
  const direct = root.querySelector(`[id="${CSS.escape(id)}"]`);
  if (direct) return direct;
  for (const el of Array.from(root.querySelectorAll("*"))) {
    if (el.shadowRoot) {
      const found = deepQueryById(
        el.shadowRoot,
        id
      );
      if (found) return found;
    }
  }
  return null;
}
function computeCoords(tRect, pRect, placement, offset) {
  const [side, align = "center"] = placement.split("-");
  let top = 0, left = 0;
  switch (side) {
    case "top":
      top = tRect.top - pRect.height - offset;
      break;
    case "bottom":
      top = tRect.bottom + offset;
      break;
    case "left":
      left = tRect.left - pRect.width - offset;
      break;
    case "right":
      left = tRect.right + offset;
      break;
  }
  if (side === "top" || side === "bottom") {
    if (align === "start") left = tRect.left;
    else if (align === "end") left = tRect.right - pRect.width;
    else left = tRect.left + (tRect.width - pRect.width) / 2;
  } else {
    if (align === "start") top = tRect.top;
    else if (align === "end") top = tRect.bottom - pRect.height;
    else top = tRect.top + (tRect.height - pRect.height) / 2;
  }
  return { top, left };
}
function clampToViewport({ top, left }, pRect, margin = 8) {
  return {
    top: Math.max(margin, Math.min(top, window.innerHeight - pRect.height - margin)),
    left: Math.max(margin, Math.min(left, window.innerWidth - pRect.width - margin))
  };
}
function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function emit(host, name, detail, opts = {}) {
  const event = new CustomEvent(name, {
    detail,
    bubbles: true,
    composed: true,
    ...opts
  });
  host.dispatchEvent(event);
  return event;
}

// src/utils/placement.controller.ts
var PlacementController = class {
  constructor(host, options) {
    this.triggerEl = null;
    this._open = false;
    this._firstRenderDone = false;
    this._triggerId = null;
    this._triggerSlot = null;
    this._cleanupFns = [];
    this._triggerListenerCleanup = null;
    this._outsideClickTimer = null;
    this.host = host;
    host.addController(this);
    this._getPanelEl = options.getPanelEl;
    this._onTriggerFound = options.onTriggerFound ?? (() => void 0);
    this._dismissOnOutsideClick = options.dismissOnOutsideClick ?? false;
    this._dismissOnEscape = options.dismissOnEscape ?? false;
    this._afterShow = options.afterShow ?? null;
    this._afterHide = options.afterHide ?? null;
    this._afterPosition = options.afterPosition ?? null;
    this._onOutsideClick = this._handleOutsideClick.bind(this);
    this._onEscapeKey = this._handleEscapeKey.bind(this);
    this._onScroll = () => {
      if (this._open) this.position();
    };
    this._onResize = () => {
      if (this._open) this.position();
    };
  }
  get open() {
    return this._open;
  }
  // ── Lit ReactiveController lifecycle ────────────────────────────
  hostConnected() {
  }
  hostDisconnected() {
    this._teardown();
  }
  // ── Host integration API ─────────────────────────────────────────
  /**
   * Call from host's `firstUpdated()`.
   * Wires the trigger for the first time.
   */
  firstUpdated(triggerId, triggerSlot) {
    this._triggerId = triggerId;
    this._triggerSlot = triggerSlot;
    this._firstRenderDone = false;
    this._wire();
  }
  /**
   * Call from host's `updated(changed)`.
   * Skips the first call (handled by firstUpdated), then re-wires on
   * trigger-id changes.
   */
  updated(changed, triggerId, triggerSlot) {
    if (!this._firstRenderDone) {
      this._firstRenderDone = true;
      return;
    }
    if (changed.has("triggerId")) {
      this._triggerId = triggerId;
      this._triggerSlot = triggerSlot;
      this._teardown();
      this._wire();
    }
  }
  /**
   * For components that render their own trigger button (e.g. uwc-dropdown).
   * Bypasses slot / trigger-id wiring entirely.
   */
  setTriggerElement(el) {
    this._triggerListenerCleanup?.();
    this._triggerListenerCleanup = null;
    this.triggerEl = el;
    this._triggerListenerCleanup = this._onTriggerFound(el) ?? null;
  }
  // ── Wiring ───────────────────────────────────────────────────────
  _wire() {
    if (this._triggerId) this._wireExternal();
    else if (this._triggerSlot) this._wireInternal();
  }
  _wireExternal() {
    const tryFind = (attempts = 0) => {
      const el = deepQueryById(document, this._triggerId);
      if (el) {
        this._callOnTriggerFound(el);
      } else if (attempts < 10) {
        setTimeout(() => tryFind(attempts + 1), 50);
      } else {
        console.warn(`[PlacementController] trigger #${this._triggerId} not found`);
      }
    };
    tryFind();
  }
  _wireInternal() {
    const slot = this._triggerSlot;
    const onSlotChange = () => {
      const [el] = slot.assignedElements({ flatten: true });
      if (el) this._callOnTriggerFound(el);
    };
    slot.addEventListener("slotchange", onSlotChange);
    this._cleanupFns.push(() => slot.removeEventListener("slotchange", onSlotChange));
    onSlotChange();
  }
  _callOnTriggerFound(el) {
    this._triggerListenerCleanup?.();
    this._triggerListenerCleanup = null;
    this.triggerEl = el;
    this._triggerListenerCleanup = this._onTriggerFound(el) ?? null;
  }
  _teardown() {
    this._cleanupFns.forEach((fn) => fn());
    this._cleanupFns = [];
    this._triggerListenerCleanup?.();
    this._triggerListenerCleanup = null;
    this.triggerEl = null;
    this.hide();
  }
  // ── Open / Hide ──────────────────────────────────────────────────
  show() {
    if (this._open) return;
    this._setOpen(true);
    this.host.updateComplete.then(() => {
      const panel = this._getPanelEl();
      if (!panel) return;
      panel.showPopover();
      requestAnimationFrame(() => {
        this.position();
        this._startGlobalListeners();
        this._afterShow?.();
      });
    });
  }
  hide() {
    if (!this._open) return;
    this._setOpen(false);
    const panel = this._getPanelEl();
    if (panel) {
      try {
        panel.hidePopover();
      } catch {
      }
    }
    this._stopGlobalListeners();
    this._afterHide?.();
  }
  toggle() {
    this._open ? this.hide() : this.show();
  }
  // ── Positioning ──────────────────────────────────────────────────
  position() {
    const panel = this._getPanelEl();
    if (!panel) return;
    const trigger = this.triggerEl ?? this._triggerSlot?.assignedElements({ flatten: true })[0] ?? null;
    if (!trigger) return;
    const placement = this.host.placement ?? "bottom";
    const offset = Number(this.host.offset ?? 8);
    const tRect = trigger.getBoundingClientRect();
    const pRect = panel.getBoundingClientRect();
    const raw = computeCoords(tRect, pRect, placement, offset);
    const coords = clampToViewport(raw, pRect);
    panel.style.top = `${coords.top}px`;
    panel.style.left = `${coords.left}px`;
    this._afterPosition?.({ triggerRect: tRect, panelCoords: coords, panelEl: panel });
  }
  // ── Global listeners ─────────────────────────────────────────────
  _startGlobalListeners() {
    window.addEventListener("scroll", this._onScroll, { passive: true, capture: true });
    window.addEventListener("resize", this._onResize, { passive: true });
    if (this._dismissOnEscape) {
      document.addEventListener("keydown", this._onEscapeKey);
    }
    if (this._dismissOnOutsideClick) {
      this._outsideClickTimer = setTimeout(() => {
        document.addEventListener("click", this._onOutsideClick, { capture: true });
      }, 0);
    }
  }
  _stopGlobalListeners() {
    window.removeEventListener("scroll", this._onScroll, { capture: true });
    window.removeEventListener("resize", this._onResize);
    document.removeEventListener("keydown", this._onEscapeKey);
    if (this._outsideClickTimer !== null) {
      clearTimeout(this._outsideClickTimer);
      this._outsideClickTimer = null;
    }
    document.removeEventListener("click", this._onOutsideClick, { capture: true });
  }
  _handleOutsideClick(e9) {
    const path = e9.composedPath();
    const panel = this._getPanelEl();
    if (panel && !path.includes(panel) && !path.includes(this.triggerEl)) {
      this.hide();
    }
  }
  _handleEscapeKey(e9) {
    if (e9.key === "Escape") {
      this.hide();
      this.triggerEl?.focus();
    }
  }
  _setOpen(val) {
    this._open = val;
    this.host.requestUpdate();
  }
};

// src/colorpicker/index.ts
function hexToRgb(hex) {
  const c5 = hex.replace("#", "");
  if (c5.length === 3) {
    return { r: parseInt(c5[0] + c5[0], 16), g: parseInt(c5[1] + c5[1], 16), b: parseInt(c5[2] + c5[2], 16) };
  }
  if (c5.length === 6) {
    return { r: parseInt(c5.slice(0, 2), 16), g: parseInt(c5.slice(2, 4), 16), b: parseInt(c5.slice(4, 6), 16) };
  }
  return null;
}
function rgbToHex({ r: r7, g: g2, b: b3 }) {
  return "#" + [r7, g2, b3].map((v3) => Math.round(Math.max(0, Math.min(255, v3))).toString(16).padStart(2, "0")).join("");
}
function rgbToHsv({ r: r7, g: g2, b: b3 }) {
  const rr = r7 / 255, gg = g2 / 255, bb = b3 / 255;
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb), d3 = max - min;
  let h4 = 0;
  const s5 = max === 0 ? 0 : d3 / max;
  const v3 = max;
  if (d3 > 0) {
    if (max === rr) h4 = ((gg - bb) / d3 + (gg < bb ? 6 : 0)) / 6;
    else if (max === gg) h4 = ((bb - rr) / d3 + 2) / 6;
    else h4 = ((rr - gg) / d3 + 4) / 6;
  }
  return { h: h4 * 360, s: s5 * 100, v: v3 * 100 };
}
function hsvToRgb({ h: h4, s: s5, v: v3 }) {
  const ss = s5 / 100, vv = v3 / 100;
  const f3 = (n6) => {
    const k2 = (n6 + h4 / 60) % 6;
    return vv - vv * ss * Math.max(0, Math.min(k2, 4 - k2, 1));
  };
  return { r: Math.round(f3(5) * 255), g: Math.round(f3(3) * 255), b: Math.round(f3(1) * 255) };
}
function parseColor(value, format) {
  if (format === "hex") {
    const rgb = hexToRgb(value);
    return rgb ? rgbToHsv(rgb) : null;
  }
  if (format === "rgb") {
    const m3 = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return m3 ? rgbToHsv({ r: +m3[1], g: +m3[2], b: +m3[3] }) : null;
  }
  if (format === "hsb") {
    const m3 = value.match(/hsb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return m3 ? { h: +m3[1], s: +m3[2], v: +m3[3] } : null;
  }
  return null;
}
function hsvToOutput(hsv, format, alpha) {
  const rgb = hsvToRgb(hsv);
  if (format === "rgb") {
    return alpha < 1 ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})` : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }
  if (format === "hsb") return `hsb(${Math.round(hsv.h)}, ${Math.round(hsv.s)}, ${Math.round(hsv.v)})`;
  return rgbToHex(rgb);
}
var UwcColorPicker = class extends i4 {
  constructor() {
    super(...arguments);
    this.placement = "bottom-start";
    this.offset = 6;
    this.value = "#ff0000";
    this.format = "hex";
    this.inline = false;
    this.disabled = false;
    this.defaultColor = "#ff0000";
    this.showAlpha = false;
    // ── Internal state ────────────────────────────────────────────────
    this._hsv = { h: 0, s: 100, v: 100 };
    this._alpha = 1;
    this._hexInput = "";
    this._rgbR = 255;
    this._rgbG = 0;
    this._rgbB = 0;
    this._hsbH = 0;
    this._hsbS = 100;
    this._hsbV = 100;
    // ── PlacementController ───────────────────────────────────────────
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panelEl ?? null,
      onTriggerFound: (el) => {
        const onClick = (e9) => {
          e9.stopPropagation();
          this._pc.toggle();
        };
        const onKeydown = (e9) => {
          if ((e9.key === "Enter" || e9.key === " ") && !this._pc.open) {
            e9.preventDefault();
            this._pc.show();
          }
        };
        el.addEventListener("click", onClick);
        el.addEventListener("keydown", onKeydown);
        return () => {
          el.removeEventListener("click", onClick);
          el.removeEventListener("keydown", onKeydown);
        };
      },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      afterShow: () => this.dispatchEvent(new CustomEvent("uwc-show", { bubbles: true, composed: true })),
      afterHide: () => this.dispatchEvent(new CustomEvent("uwc-hide", { bubbles: true, composed: true }))
    });
    // dragging flag: prevents value→parse feedback loop during drag
    this._dragging = false;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────
  firstUpdated() {
    this._parseValue();
    if (!this.inline) {
      this._pc.setTriggerElement(this._swatchEl);
    }
  }
  updated(changed) {
    this._pc.updated(changed, null, null);
    if (changed.has("value") && !this._dragging) {
      this._parseValue();
    }
  }
  // ── Value parsing ─────────────────────────────────────────────────
  _parseValue() {
    const hsv = parseColor(this.value, this.format) ?? parseColor(this.defaultColor, "hex") ?? { h: 0, s: 100, v: 100 };
    this._hsv = hsv;
    this._syncInputFields();
    this.requestUpdate();
  }
  _syncInputFields() {
    const rgb = hsvToRgb(this._hsv);
    this._hexInput = rgbToHex(rgb);
    this._rgbR = rgb.r;
    this._rgbG = rgb.g;
    this._rgbB = rgb.b;
    this._hsbH = Math.round(this._hsv.h);
    this._hsbS = Math.round(this._hsv.s);
    this._hsbV = Math.round(this._hsv.v);
  }
  // ── Apply color ───────────────────────────────────────────────────
  _applyHsv(hsv) {
    this._hsv = { ...hsv };
    this._syncInputFields();
    const out = hsvToOutput(this._hsv, this.format, this._alpha);
    this.value = out;
    const rgb = hsvToRgb(this._hsv);
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { value: out, format: this.format, rgb, hex: rgbToHex(rgb), alpha: this._alpha }
    }));
    this.requestUpdate();
  }
  // ── Area drag ─────────────────────────────────────────────────────
  _areaPointerDown(e9) {
    e9.preventDefault();
    this._dragging = true;
    this._updateArea(e9);
    const move = (ev) => this._updateArea(ev);
    const up = () => {
      this._dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  _updateArea(e9) {
    const rect = this._areaEl.getBoundingClientRect();
    const s5 = Math.max(0, Math.min(1, (e9.clientX - rect.left) / rect.width)) * 100;
    const v3 = Math.max(0, Math.min(1, 1 - (e9.clientY - rect.top) / rect.height)) * 100;
    this._applyHsv({ h: this._hsv.h, s: s5, v: v3 });
  }
  // ── Hue drag ──────────────────────────────────────────────────────
  _huePointerDown(e9) {
    e9.preventDefault();
    this._dragging = true;
    this._updateHue(e9);
    const move = (ev) => this._updateHue(ev);
    const up = () => {
      this._dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  _updateHue(e9) {
    const rect = this._hueEl.getBoundingClientRect();
    const h4 = Math.max(0, Math.min(1, (e9.clientX - rect.left) / rect.width)) * 360;
    this._applyHsv({ ...this._hsv, h: h4 });
  }
  // ── Alpha drag ────────────────────────────────────────────────────
  _alphaPointerDown(e9) {
    if (!this._alphaEl) return;
    e9.preventDefault();
    this._dragging = true;
    this._updateAlpha(e9);
    const move = (ev) => this._updateAlpha(ev);
    const up = () => {
      this._dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  _updateAlpha(e9) {
    if (!this._alphaEl) return;
    const rect = this._alphaEl.getBoundingClientRect();
    this._alpha = Math.max(0, Math.min(1, (e9.clientX - rect.left) / rect.width));
    this._applyHsv(this._hsv);
  }
  // ── Text input handlers ───────────────────────────────────────────
  _onHexInput(e9) {
    this._hexInput = e9.target.value;
    const rgb = hexToRgb(this._hexInput);
    if (rgb) this._applyHsv(rgbToHsv(rgb));
  }
  _onRgbInput(ch, e9) {
    const v3 = parseInt(e9.target.value, 10);
    if (isNaN(v3)) return;
    const rgb = { r: this._rgbR, g: this._rgbG, b: this._rgbB };
    rgb[ch] = Math.max(0, Math.min(255, v3));
    this._applyHsv(rgbToHsv(rgb));
  }
  _onHsbInput(ch, e9) {
    const val = parseInt(e9.target.value, 10);
    if (isNaN(val)) return;
    const hsv = { ...this._hsv };
    const limits = { h: [0, 360], s: [0, 100], v: [0, 100] };
    const [min, max] = limits[ch];
    hsv[ch] = Math.max(min, Math.min(max, val));
    this._applyHsv(hsv);
  }
  _cycleFormat() {
    const all = ["hex", "rgb", "hsb"];
    this.format = all[(all.indexOf(this.format) + 1) % all.length];
    this.value = hsvToOutput(this._hsv, this.format, this._alpha);
    this.requestUpdate();
  }
  // ── Derived helpers ───────────────────────────────────────────────
  get _currentHex() {
    return rgbToHex(hsvToRgb(this._hsv));
  }
  // ── Render ────────────────────────────────────────────────────────
  _renderInputs() {
    if (this.format === "hex") {
      return b2`
        <div class="uwc-cp__input-group">
          <div class="uwc-cp__input-wrap" style="flex:1">
            <input class="uwc-cp__input-field" .value=${this._hexInput}
              @change=${this._onHexInput} maxlength="7" />
            <span class="uwc-cp__input-label">HEX</span>
          </div>
        </div>`;
    }
    if (this.format === "rgb") {
      return b2`
        <div class="uwc-cp__input-group">
          ${["r", "g", "b"].map((ch) => b2`
            <div class="uwc-cp__input-wrap">
              <input class="uwc-cp__input-field" type="number" min="0" max="255"
                .value=${String(ch === "r" ? this._rgbR : ch === "g" ? this._rgbG : this._rgbB)}
                @change=${(e9) => this._onRgbInput(ch, e9)} />
              <span class="uwc-cp__input-label">${ch.toUpperCase()}</span>
            </div>`)}
        </div>`;
    }
    return b2`
      <div class="uwc-cp__input-group">
        ${["h", "s", "v"].map((ch) => b2`
          <div class="uwc-cp__input-wrap">
            <input class="uwc-cp__input-field" type="number"
              min="0" max=${ch === "h" ? 360 : 100}
              .value=${String(ch === "h" ? this._hsbH : ch === "s" ? this._hsbS : this._hsbV)}
              @change=${(e9) => this._onHsbInput(ch, e9)} />
            <span class="uwc-cp__input-label">${ch === "v" ? "B" : ch.toUpperCase()}</span>
          </div>`)}
      </div>`;
  }
  render() {
    const hex = this._currentHex;
    const open = this._pc.open;
    const rgb = hsvToRgb(this._hsv);
    return b2`
      <!-- Swatch trigger (hidden in inline mode via CSS) -->
      <div
        part="swatch"
        class=${e7({ "uwc-cp__swatch": true, "uwc-cp__swatch--open": open })}
        tabindex=${this.disabled ? "-1" : "0"}
        role="button"
        aria-label="Pick color"
        aria-expanded=${open}
        style="--_swatch-bg:${hex}"
      ></div>

      <!-- Panel — popover="manual" lives in browser top layer -->
      <div
        part="panel"
        class=${e7({ "uwc-cp__panel": true, "is-open": open || this.inline })}
        popover="manual"
        data-placement=${this.placement}
      >
        <!-- SV color area -->
        <div
          class="uwc-cp__area"
          style="--_hue:${this._hsv.h}"
          @pointerdown=${this._areaPointerDown}
        >
          <div class="uwc-cp__area-hue"></div>
          <div class="uwc-cp__area-dark"></div>
          <div class="uwc-cp__cursor" style=${o7({
      left: `${this._hsv.s}%`,
      top: `${100 - this._hsv.v}%`
    })}></div>
        </div>

        <!-- Preview swatch + sliders -->
        <div class="uwc-cp__preview-row">
          <div class="uwc-cp__preview-swatch" style="background:${hex}"></div>
          <div class="uwc-cp__sliders">
            <!-- Hue -->
            <div class="uwc-cp__hue-track" @pointerdown=${this._huePointerDown}>
              <div class="uwc-cp__thumb" style=${o7({
      left: `${this._hsv.h / 360 * 100}%`
    })}></div>
            </div>
            <!-- Alpha (optional) -->
            ${this.showAlpha ? b2`
              <div class="uwc-cp__alpha-track"
                style=${o7({ "--_alpha-color": `rgb(${rgb.r},${rgb.g},${rgb.b})` })}
                @pointerdown=${this._alphaPointerDown}>
                <div class="uwc-cp__thumb" style=${o7({
      left: `${this._alpha * 100}%`
    })}></div>
              </div>` : A}
          </div>
        </div>

        <!-- Format inputs -->
        <div class="uwc-cp__inputs">
          <!-- Column wrapper mirrors the input-wrap structure so bottoms align -->
          <div class="uwc-cp__format-col">
            <button class="uwc-cp__format-btn" type="button"
              title="Cycle format (${this.format})"
              @click=${this._cycleFormat}>
              ${this.format.toUpperCase()}
            </button>
            <span class="uwc-cp__format-spacer" aria-hidden="true"></span>
          </div>
          ${this._renderInputs()}
        </div>
      </div>
    `;
  }
};
UwcColorPicker.styles = [styles_default3];
__decorateClass([
  n4({ reflect: true })
], UwcColorPicker.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcColorPicker.prototype, "offset", 2);
__decorateClass([
  n4()
], UwcColorPicker.prototype, "value", 2);
__decorateClass([
  n4({ reflect: true })
], UwcColorPicker.prototype, "format", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcColorPicker.prototype, "inline", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcColorPicker.prototype, "disabled", 2);
__decorateClass([
  n4({ attribute: "default-color" })
], UwcColorPicker.prototype, "defaultColor", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-alpha" })
], UwcColorPicker.prototype, "showAlpha", 2);
__decorateClass([
  e5(".uwc-cp__swatch")
], UwcColorPicker.prototype, "_swatchEl", 2);
__decorateClass([
  e5(".uwc-cp__panel")
], UwcColorPicker.prototype, "_panelEl", 2);
__decorateClass([
  e5(".uwc-cp__area")
], UwcColorPicker.prototype, "_areaEl", 2);
__decorateClass([
  e5(".uwc-cp__hue-track")
], UwcColorPicker.prototype, "_hueEl", 2);
__decorateClass([
  e5(".uwc-cp__alpha-track")
], UwcColorPicker.prototype, "_alphaEl", 2);

// src/colorpicker/react.ts
var UwcColorPicker2 = createComponent3({
  tagName: "uwc-colorpicker",
  elementClass: UwcColorPicker,
  react: React3,
  events: {
    onUwcChange: "uwc-change"
  }
});

// src/datatable/react.ts
import { createComponent as createComponent4 } from "@lit/react";
import React4 from "react";

// src/datatable/styles.ts
var styles_default4 = [
  hostReset,
  i`
    :host { display: block; }

    /* ── Toolbar ────────────────────────────────────────────────────────────── */
    .dt-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: 14px ${space4};
      border-bottom: 1px solid var(--uwc-dt-row-border, ${borderSubtle});
      background: var(--uwc-dt-surface, ${surface});
    }
    .dt-toolbar-left,
    .dt-toolbar-right { display: flex; align-items: center; gap: ${space2}; flex-wrap: wrap; }

    /* ── Search ─────────────────────────────────────────────────────────────── */
    .dt-search-wrap {
      display: flex;
      align-items: center;
      gap: 6px;
      background: var(--uwc-dt-header-bg, ${surfaceRaised});
      border: 1px solid var(--uwc-dt-header-border, ${border});
      border-radius: ${radiusLg};
      padding: 6px 10px;
      min-width: 220px;
      transition: border-color ${durationBase};
    }
    .dt-search-wrap:focus-within { border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); }
    .dt-search-icon { color: ${textDisabled}; flex-shrink: 0; }
    .dt-search {
      border: none;
      background: transparent;
      outline: none;
      font-family: inherit;
      font-size: ${fontSizeXs};
      color: ${text};
      flex: 1;
      min-width: 0;
    }
    .dt-search::placeholder { color: ${textDisabled}; }
    .dt-search-clr { background: none; border: none; cursor: pointer; font-size: ${fontSizeMd}; color: ${textDisabled}; padding: 0 2px; }
    .dt-search-clr:hover { color: ${textSecondary}; }

    /* ── Toolbar buttons ────────────────────────────────────────────────────── */
    .dt-toolbar-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px ${space3};
      font-family: inherit;
      font-size:   ${fontSizeXs};
      font-weight: ${fontWeightMedium};
      background:  var(--uwc-dt-header-bg, ${surfaceRaised});
      border: 1px solid var(--uwc-dt-header-border, ${border});
      border-radius: ${radiusMd};
      cursor: pointer;
      color: ${textSecondary};
      transition: all ${durationFast};
      white-space: nowrap;
    }
    .dt-toolbar-btn:hover {
      background: color-mix(in oklab, var(--uwc-dt-header-bg, ${surfaceRaised}) 80%, #000);
      color: ${text};
    }
    .dt-toolbar-btn.active {
      background:   var(--uwc-dt-primary-lt, rgba(99,102,241,0.08));
      border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      color:        var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
    }
    .dt-active-filter {
      background:   color-mix(in oklab, var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})) 12%, white);
      border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      color:        var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
    }
    .dt-sel-badge {
      padding: ${space1} 10px;
      background: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      color: #fff;
      border-radius: ${radiusFull};
      font-size:   ${fontSizeXs};
      font-weight: ${fontWeightSemibold};
    }

    /* ── Column visibility panel ────────────────────────────────────────────── */
    .dt-col-vis-wrap { position: relative; }
    .dt-col-panel {
      position: absolute;
      top: calc(100% + ${space1});
      right: 0;
      z-index: ${zFloat};
      background: var(--uwc-dt-surface, ${surface});
      border: 1px solid var(--uwc-dt-header-border, ${border});
      border-radius: ${radiusLg};
      box-shadow: ${shadowLg};
      padding: ${space2} 0;
      min-width: 180px;
    }
    .dt-col-panel-hdr {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: ${space2} 14px 10px;
      border-bottom: 1px solid ${borderSubtle};
      font-size:   ${fontSizeXs};
      font-weight: ${fontWeightSemibold};
      color:       ${textSecondary};
    }
    .dt-col-close { background: none; border: none; cursor: pointer; font-size: ${fontSizeLg}; color: ${textMuted}; }
    .dt-col-close:hover { color: ${textSecondary}; }
    .dt-col-item {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: 7px 14px;
      font-size: ${fontSizeXs};
      color: ${text};
      cursor: pointer;
      transition: background ${durationFast};
    }
    .dt-col-item:hover { background: ${hoverBg}; }
    .dt-col-item input { accent-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); }

    /* ── Table wrapper ──────────────────────────────────────────────────────── */
    .dt-wrapper { position: relative; }
    .dt-scroll   { overflow: auto; }

    /* ── Table ──────────────────────────────────────────────────────────────── */
    .dt-table { border-collapse: collapse; width: 100%; min-width: max-content; font-size: ${fontSizeSm}; }

    /* ── Header ─────────────────────────────────────────────────────────────── */
    .dt-head { position: sticky; top: 0; z-index: 20; }
    .dt-th {
      padding: 10px ${space3};
      text-align: left;
      font-size:      ${fontSizeXs};
      font-weight:    ${fontWeightSemibold};
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color:      var(--uwc-dt-header-color, ${textSecondary});
      background: var(--uwc-dt-header-bg,   ${surfaceRaised});
      border-bottom: 2px solid var(--uwc-dt-header-border, ${border});
      white-space: nowrap;
      position: relative;
      user-select: none;
    }
    .dt-th.sortable { cursor: pointer; }
    .dt-th.sortable:hover {
      background: color-mix(in oklab, var(--uwc-dt-header-bg, ${surfaceRaised}) 90%, #000);
      color: ${text};
    }
    .dt-th.sorted { color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); }
    .dt-th-check,
    .dt-th-actions { background: var(--uwc-dt-header-bg, ${surfaceRaised}); }
    .dt-th-inner { display: flex; align-items: center; gap: ${space1}; }
    .dt-th-label { flex: 1; }
    .dt-sort-icon { display: flex; align-items: center; gap: 2px; color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); }
    .dt-sort-rank {
      font-size:   9px;
      font-weight: ${fontWeightBold};
      background:  var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      color:       #fff;
      border-radius: ${radiusXs};
      padding: 0 3px;
      line-height: 1.4;
    }
    .dt-resize-handle {
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 4px;
      cursor: col-resize;
      background: transparent;
      transition: background ${durationFast};
    }
    .dt-resize-handle:hover { background: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); opacity: 0.4; }

    /* ── Filter row ─────────────────────────────────────────────────────────── */
    .dt-filter-row .dt-fc {
      padding: 6px ${space2};
      background:    var(--uwc-dt-header-bg, ${surfaceRaised});
      border-bottom: 1px solid var(--uwc-dt-header-border, ${border});
    }
    .dt-text-filter { position: relative; display: flex; align-items: center; }
    .dt-text-filter input,
    .dt-num-filter input {
      width: 100%;
      padding: 5px 24px 5px ${space2};
      font-family: inherit;
      font-size:   ${fontSizeXs};
      border: 1px solid var(--uwc-dt-header-border, ${border});
      border-radius: ${radiusMd};
      outline: none;
      background: var(--uwc-dt-surface, ${surface});
      transition: border-color ${durationBase};
    }
    .dt-text-filter input:focus,
    .dt-num-filter input:focus { border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); }
    .dt-num-filter { display: flex; gap: ${space1}; }
    .dt-num-filter input { width: 50%; padding: 5px 6px; }
    .dt-fc-clr { position: absolute; right: 6px; background: none; border: none; cursor: pointer; font-size: ${fontSizeMd}; color: ${textDisabled}; }
    .dt-fc-clr:hover { color: ${textSecondary}; }

    /* ── Body rows ──────────────────────────────────────────────────────────── */
    .dt-row { transition: background ${durationFast}; cursor: pointer; }
    .dt-row:hover { background: var(--uwc-dt-row-hover-bg, ${hoverBg}); }
    .dt-row--selected { background: var(--uwc-dt-primary-lt, rgba(99,102,241,0.08)); }
    .dt-row--selected:hover { background: color-mix(in oklab, var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})) 15%, transparent); }
    .dt-row--stripe:nth-child(even) { background: var(--uwc-dt-stripe-bg, ${surfaceRaised}); }
    .dt-row--stripe.dt-row--selected:nth-child(even) { background: var(--uwc-dt-primary-lt, rgba(99,102,241,0.08)); }

    .dt-td { padding: 10px ${space3}; border-bottom: 1px solid var(--uwc-dt-row-border, ${borderSubtle}); vertical-align: middle; }
    .dt-td-check,
    .dt-td-expand,
    .dt-td-actions { padding: 6px ${space2}; }
    .dt-td.editable { cursor: text; }
    .dt-td.editable:hover { background: color-mix(in oklab, var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})) 6%, transparent); }

    /* ── Expand button ──────────────────────────────────────────────────────── */
    .dt-expand-btn {
      width: 22px;
      height: 22px;
      border: 1px solid var(--uwc-dt-header-border, ${border});
      background: var(--uwc-dt-surface, ${surface});
      border-radius: ${radiusSm};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${textSecondary};
      transition: all ${durationFast};
    }
    .dt-expand-btn:hover { border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); }
    .dt-expand-btn.open { background: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); color: #fff; }

    /* ── Cell types ─────────────────────────────────────────────────────────── */
    .dt-badge {
      display: inline-flex;
      align-items: center;
      padding: 2px 9px;
      border-radius: ${radiusFull};
      font-size:   ${fontSizeXs};
      font-weight: ${fontWeightMedium};
      background: color-mix(in srgb, var(--bc) 14%, white);
      color: var(--bc);
    }
    .dt-currency { font-size: ${fontSizeSm}; font-weight: ${fontWeightMedium}; color: ${text}; font-variant-numeric: tabular-nums; }
    .dt-date     { font-size: ${fontSizeXs}; color: ${textSecondary}; }
    .dt-text     { font-size: ${fontSizeSm}; color: ${text}; }
    .dt-rating   { display: inline-flex; gap: 1px; font-size: ${fontSizeMd}; }
    .star-on     { color: ${warning}; }
    .star-off    { color: ${border}; }
    .dt-inline-input {
      width: 100%;
      padding: ${space1} ${space2};
      font-family: inherit;
      font-size:   ${fontSizeSm};
      border: 2px solid var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      border-radius: ${radiusSm};
      outline: none;
    }

    /* ── Row expansion ──────────────────────────────────────────────────────── */
    .dt-row-expansion td { padding: 0 !important; }
    .dt-expansion-cell { background: var(--uwc-dt-header-bg, ${surfaceRaised}); border-bottom: 2px solid var(--uwc-dt-header-border, ${border}); }
    .dt-exp-card { display: flex; gap: 20px; padding: 20px 24px; align-items: flex-start; }
    .dt-exp-avatar {
      width: 52px; height: 52px;
      border-radius: ${radiusFull};
      background: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: ${fontWeightBold};
      flex-shrink: 0;
    }
    .dt-exp-info { flex: 1; min-width: 0; }
    .dt-exp-info h3 { font-size: ${fontSizeLg}; font-weight: ${fontWeightBold}; color: ${text}; margin-bottom: 3px; }
    .dt-exp-role  { font-size: ${fontSizeXs}; color: ${textSecondary}; margin-bottom: ${space3}; }
    .dt-exp-grid  { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
    .dt-exp-grid > div { display: flex; flex-direction: column; gap: 2px; }
    .dt-exp-lbl   { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: ${textMuted}; }
    .dt-exp-bar-wrap { display: flex; align-items: center; gap: 10px; }
    .dt-exp-bar   { flex: 1; height: 6px; background: var(--uwc-dt-header-border, ${border}); border-radius: ${radiusXs}; overflow: hidden; }
    .dt-exp-bar-fill { height: 100%; background: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); border-radius: ${radiusXs}; transition: width 0.3s; }
    .dt-exp-bar-val { font-size: ${fontSizeXs}; font-weight: ${fontWeightSemibold}; color: ${textSecondary}; }

    /* ── Loading overlay ────────────────────────────────────────────────────── */
    .dt-loading {
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.75);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      z-index: 30;
      font-size: ${fontSizeXs};
      color: ${textSecondary};
    }
    .dt-spinner {
      width: 28px; height: 28px;
      border: 3px solid var(--uwc-dt-header-border, ${border});
      border-top-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary}));
      border-radius: ${radiusFull};
      animation: dt-spin 600ms linear infinite;
    }
    @keyframes dt-spin { to { transform: rotate(360deg); } }

    /* ── Empty state ────────────────────────────────────────────────────────── */
    .dt-empty { padding: 60px 20px !important; }
    .dt-empty-inner { display: flex; flex-direction: column; align-items: center; gap: ${space3}; }
    .dt-empty-inner p { font-size: ${fontSizeSm}; color: ${textMuted}; }

    /* ── Pagination ─────────────────────────────────────────────────────────── */
    .dt-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
      padding: ${space3} ${space4};
      border-top: 1px solid var(--uwc-dt-row-border, ${borderSubtle});
      background: var(--uwc-dt-surface, ${surface});
    }
    .dt-pag-left,
    .dt-pag-right  { display: flex; align-items: center; gap: ${space2}; }
    .dt-pag-center { display: flex; align-items: center; gap: 3px; }
    .dt-pag-info   { font-size: ${fontSizeXs}; color: ${textSecondary}; }
  `
];

// node_modules/lit-html/directive-helpers.js
var { I: t4 } = j;
var i7 = (o10) => o10;
var r6 = (o10) => void 0 === o10.strings;
var s4 = () => document.createComment("");
var v2 = (o10, n6, e9) => {
  const l4 = o10._$AA.parentNode, d3 = void 0 === n6 ? o10._$AB : n6._$AA;
  if (void 0 === e9) {
    const i8 = l4.insertBefore(s4(), d3), n7 = l4.insertBefore(s4(), d3);
    e9 = new t4(i8, n7, o10, o10.options);
  } else {
    const t6 = e9._$AB.nextSibling, n7 = e9._$AM, c5 = n7 !== o10;
    if (c5) {
      let t7;
      e9._$AQ?.(o10), e9._$AM = o10, void 0 !== e9._$AP && (t7 = o10._$AU) !== n7._$AU && e9._$AP(t7);
    }
    if (t6 !== d3 || c5) {
      let o11 = e9._$AA;
      for (; o11 !== t6; ) {
        const t7 = i7(o11).nextSibling;
        i7(l4).insertBefore(o11, d3), o11 = t7;
      }
    }
  }
  return e9;
};
var u3 = (o10, t6, i8 = o10) => (o10._$AI(t6, i8), o10);
var m2 = {};
var p3 = (o10, t6 = m2) => o10._$AH = t6;
var M2 = (o10) => o10._$AH;
var h3 = (o10) => {
  o10._$AR(), o10._$AA.remove();
};

// node_modules/lit-html/directives/repeat.js
var u4 = (e9, s5, t6) => {
  const r7 = /* @__PURE__ */ new Map();
  for (let l4 = s5; l4 <= t6; l4++) r7.set(e9[l4], l4);
  return r7;
};
var c4 = e6(class extends i5 {
  constructor(e9) {
    if (super(e9), e9.type !== t3.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e9, s5, t6) {
    let r7;
    void 0 === t6 ? t6 = s5 : void 0 !== s5 && (r7 = s5);
    const l4 = [], o10 = [];
    let i8 = 0;
    for (const s6 of e9) l4[i8] = r7 ? r7(s6, i8) : i8, o10[i8] = t6(s6, i8), i8++;
    return { values: o10, keys: l4 };
  }
  render(e9, s5, t6) {
    return this.dt(e9, s5, t6).values;
  }
  update(s5, [t6, r7, c5]) {
    const d3 = M2(s5), { values: p4, keys: a3 } = this.dt(t6, r7, c5);
    if (!Array.isArray(d3)) return this.ut = a3, p4;
    const h4 = this.ut ?? (this.ut = []), v3 = [];
    let m3, y3, x2 = 0, j2 = d3.length - 1, k2 = 0, w2 = p4.length - 1;
    for (; x2 <= j2 && k2 <= w2; ) if (null === d3[x2]) x2++;
    else if (null === d3[j2]) j2--;
    else if (h4[x2] === a3[k2]) v3[k2] = u3(d3[x2], p4[k2]), x2++, k2++;
    else if (h4[j2] === a3[w2]) v3[w2] = u3(d3[j2], p4[w2]), j2--, w2--;
    else if (h4[x2] === a3[w2]) v3[w2] = u3(d3[x2], p4[w2]), v2(s5, v3[w2 + 1], d3[x2]), x2++, w2--;
    else if (h4[j2] === a3[k2]) v3[k2] = u3(d3[j2], p4[k2]), v2(s5, d3[x2], d3[j2]), j2--, k2++;
    else if (void 0 === m3 && (m3 = u4(a3, k2, w2), y3 = u4(h4, x2, j2)), m3.has(h4[x2])) if (m3.has(h4[j2])) {
      const e9 = y3.get(a3[k2]), t7 = void 0 !== e9 ? d3[e9] : null;
      if (null === t7) {
        const e10 = v2(s5, d3[x2]);
        u3(e10, p4[k2]), v3[k2] = e10;
      } else v3[k2] = u3(t7, p4[k2]), v2(s5, d3[x2], t7), d3[e9] = null;
      k2++;
    } else h3(d3[j2]), j2--;
    else h3(d3[x2]), x2++;
    for (; k2 <= w2; ) {
      const e9 = v2(s5, v3[w2 + 1]);
      u3(e9, p4[k2]), v3[k2++] = e9;
    }
    for (; x2 <= j2; ) {
      const e9 = d3[x2++];
      null !== e9 && h3(e9);
    }
    return this.ut = a3, p3(s5, v3), E;
  }
});

// node_modules/lit-html/directives/live.js
var l3 = e6(class extends i5 {
  constructor(r7) {
    if (super(r7), r7.type !== t3.PROPERTY && r7.type !== t3.ATTRIBUTE && r7.type !== t3.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r6(r7)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r7) {
    return r7;
  }
  update(i8, [t6]) {
    if (t6 === E || t6 === A) return t6;
    const o10 = i8.element, l4 = i8.name;
    if (i8.type === t3.PROPERTY) {
      if (t6 === o10[l4]) return E;
    } else if (i8.type === t3.BOOLEAN_ATTRIBUTE) {
      if (!!t6 === o10.hasAttribute(l4)) return E;
    } else if (i8.type === t3.ATTRIBUTE && o10.getAttribute(l4) === t6 + "") return E;
    return p3(i8), t6;
  }
});

// src/datatable/index.ts
function fmtDate(d3) {
  return d3 ? `${String(d3.getMonth() + 1).padStart(2, "0")}/${String(d3.getDate()).padStart(2, "0")}/${d3.getFullYear()}` : "";
}
function fmtISO(d3) {
  return d3 ? `${d3.getFullYear()}-${String(d3.getMonth() + 1).padStart(2, "0")}-${String(d3.getDate()).padStart(2, "0")}` : "";
}
var DEPT_COLORS = {
  Engineering: "#3b82f6",
  Marketing: "#f59e0b",
  Sales: "#10b981",
  HR: "#8b5cf6",
  Finance: "#06b6d4",
  Design: "#ec4899",
  Operations: "#6b7280"
};
var STATUS_COLORS = {
  Active: "#22c55e",
  "On Leave": "#f59e0b",
  Inactive: "#ef4444"
};
var UwcDatatable = class extends i4 {
  constructor() {
    super();
    this.data = [];
    this.columns = [];
    this.selectionMode = "multiple";
    this.rowKey = "id";
    this.loading = false;
    this.rows = 20;
    this.rowsPerPageOptions = [10, 20, 50, 100];
    this.scrollableHeight = "520px";
    this.rowExpandable = false;
    this.stripedRows = true;
    this.resizableColumns = true;
    this.stateStorage = "";
    this.emptyMessage = "No records found.";
    this._page = 1;
    this._pageSize = 20;
    this._sortMeta = [];
    this._filters = {};
    this._globalFilter = "";
    this._selectedKeys = /* @__PURE__ */ new Set();
    this._expandedKeys = /* @__PURE__ */ new Set();
    this._showFilters = false;
    this._colWidths = {};
    this._editingCell = null;
    this._hiddenCols = /* @__PURE__ */ new Set();
    this._colPanelOpen = false;
    this._resizingCol = null;
    this._resizeStartX = 0;
    this._resizeStartW = 0;
    this._onMouseMove = this._onResizeMouseMove.bind(this);
    this._onMouseUp = this._onResizeMouseUp.bind(this);
  }
  // ── Computed data ────────────────────────────────────────────────────────
  get _filteredData() {
    let rows = this.data;
    if (this._globalFilter.trim()) {
      const q = this._globalFilter.toLowerCase();
      rows = rows.filter(
        (row) => Object.values(row).some((v3) => String(v3).toLowerCase().includes(q))
      );
    }
    for (const [field, f3] of Object.entries(this._filters)) {
      if (!f3) continue;
      rows = rows.filter((row) => {
        const v3 = row[field];
        if (f3.type === "text") {
          return !f3.value || String(v3).toLowerCase().includes(f3.value.toLowerCase());
        }
        if (f3.type === "select") {
          return !f3.value || v3 === f3.value;
        }
        if (f3.type === "date") {
          if (!f3.iso) return true;
          return fmtISO(v3) === f3.iso;
        }
        if (f3.type === "number") {
          const num = Number(v3);
          if (f3.min !== "" && f3.min !== void 0 && num < Number(f3.min)) return false;
          if (f3.max !== "" && f3.max !== void 0 && num > Number(f3.max)) return false;
          return true;
        }
        return true;
      });
    }
    return rows;
  }
  get _sortedData() {
    if (!this._sortMeta.length) return this._filteredData;
    return [...this._filteredData].sort((a3, b3) => {
      for (const { field, order } of this._sortMeta) {
        const av = a3[field], bv = b3[field];
        let cmp = 0;
        if (av instanceof Date && bv instanceof Date) {
          cmp = av.getTime() - bv.getTime();
        } else if (typeof av === "number" && typeof bv === "number") {
          cmp = av - bv;
        } else {
          cmp = String(av ?? "").localeCompare(String(bv ?? ""));
        }
        if (cmp !== 0) return cmp * order;
      }
      return 0;
    });
  }
  get _pagedData() {
    const start = (this._page - 1) * this._pageSize;
    return this._sortedData.slice(start, start + this._pageSize);
  }
  get _totalRecords() {
    return this._filteredData.length;
  }
  get _totalPages() {
    return Math.max(1, Math.ceil(this._totalRecords / this._pageSize));
  }
  get _visibleColumns() {
    return this.columns.filter((c5) => !this._hiddenCols.has(c5.field));
  }
  get _allSelected() {
    const paged = this._pagedData;
    return paged.length > 0 && paged.every((r7) => this._selectedKeys.has(r7[this.rowKey]));
  }
  // ── Sort ──────────────────────────────────────────────────────────────────
  _sort(field, e9) {
    if (e9.shiftKey) {
      const existing = this._sortMeta.find((s5) => s5.field === field);
      if (existing) {
        if (existing.order === 1) {
          this._sortMeta = this._sortMeta.map((s5) => s5.field === field ? { ...s5, order: -1 } : s5);
        } else {
          this._sortMeta = this._sortMeta.filter((s5) => s5.field !== field);
        }
      } else {
        this._sortMeta = [...this._sortMeta, { field, order: 1 }];
      }
    } else {
      const cur = this._sortMeta.find((s5) => s5.field === field);
      if (cur && this._sortMeta.length === 1) {
        this._sortMeta = cur.order === 1 ? [{ field, order: -1 }] : [];
      } else {
        this._sortMeta = [{ field, order: 1 }];
      }
    }
    this._page = 1;
  }
  _getSortOrder(field) {
    return this._sortMeta.find((s5) => s5.field === field)?.order ?? 0;
  }
  _getSortRank(field) {
    const idx = this._sortMeta.findIndex((s5) => s5.field === field);
    return this._sortMeta.length > 1 ? idx >= 0 ? idx + 1 : 0 : 0;
  }
  // ── Filter ────────────────────────────────────────────────────────────────
  _setFilter(field, type, patch) {
    const cur = this._filters[field] ?? { type };
    this._filters = { ...this._filters, [field]: { ...cur, type, ...patch } };
    this._page = 1;
    emit(this, "uwc-filter", { field, filters: this._filters });
  }
  _clearAllFilters() {
    this._filters = {};
    this._globalFilter = "";
    this._page = 1;
  }
  get _hasActiveFilters() {
    if (this._globalFilter.trim()) return true;
    return Object.values(this._filters).some((f3) => {
      if (!f3) return false;
      if (f3.type === "number") return f3.min !== "" && f3.min !== void 0 || f3.max !== "" && f3.max !== void 0;
      return f3.value || f3.iso;
    });
  }
  // ── Selection ─────────────────────────────────────────────────────────────
  _toggleRow(row, _e) {
    if (this.selectionMode === "none") return;
    const key = row[this.rowKey];
    const next = new Set(this._selectedKeys);
    if (this.selectionMode === "single") {
      next.clear();
      if (!this._selectedKeys.has(key)) next.add(key);
    } else {
      next.has(key) ? next.delete(key) : next.add(key);
    }
    this._selectedKeys = next;
    emit(this, "uwc-selection-change", {
      selectedKeys: [...this._selectedKeys],
      selectedRows: this.data.filter((r7) => this._selectedKeys.has(r7[this.rowKey]))
    });
  }
  _toggleAll() {
    if (this._allSelected) {
      const next = new Set(this._selectedKeys);
      this._pagedData.forEach((r7) => next.delete(r7[this.rowKey]));
      this._selectedKeys = next;
    } else {
      const next = new Set(this._selectedKeys);
      this._pagedData.forEach((r7) => next.add(r7[this.rowKey]));
      this._selectedKeys = next;
    }
    emit(this, "uwc-selection-change", {
      selectedKeys: [...this._selectedKeys],
      selectedRows: this.data.filter((r7) => this._selectedKeys.has(r7[this.rowKey]))
    });
  }
  // ── Expansion ─────────────────────────────────────────────────────────────
  _toggleExpand(row, e9) {
    e9.stopPropagation();
    const key = row[this.rowKey];
    const next = new Set(this._expandedKeys);
    next.has(key) ? next.delete(key) : next.add(key);
    this._expandedKeys = next;
  }
  // ── Inline edit ───────────────────────────────────────────────────────────
  _startEdit(row, field, e9) {
    if (e9.detail !== 2) return;
    this._editingCell = { key: row[this.rowKey], field };
  }
  _commitEdit(row, field, e9) {
    const val = e9.target.value;
    const col = this.columns.find((c5) => c5.field === field);
    let parsed = val;
    if (col?.type === "currency" || col?.type === "rating") {
      parsed = Number(val.replace(/[^0-9.-]/g, "")) || 0;
    }
    const idx = this.data.findIndex((r7) => r7[this.rowKey] === row[this.rowKey]);
    if (idx >= 0) {
      const copy = [...this.data];
      copy[idx] = { ...copy[idx], [field]: parsed };
      this.data = copy;
    }
    this._editingCell = null;
    emit(this, "uwc-cell-edit", { row, field, value: parsed });
  }
  _cancelEdit() {
    this._editingCell = null;
  }
  // ── Column resize ─────────────────────────────────────────────────────────
  _startResize(field, e9) {
    e9.preventDefault();
    e9.stopPropagation();
    this._resizingCol = field;
    this._resizeStartX = e9.clientX;
    this._resizeStartW = this._colWidths[field] ?? (this.columns.find((c5) => c5.field === field)?.width ?? 160);
    window.addEventListener("mousemove", this._onMouseMove);
    window.addEventListener("mouseup", this._onMouseUp);
  }
  _onResizeMouseMove(e9) {
    if (!this._resizingCol) return;
    const delta = e9.clientX - this._resizeStartX;
    const newW = Math.max(80, this._resizeStartW + delta);
    this._colWidths = { ...this._colWidths, [this._resizingCol]: newW };
  }
  _onResizeMouseUp() {
    window.removeEventListener("mousemove", this._onMouseMove);
    window.removeEventListener("mouseup", this._onMouseUp);
    this._resizingCol = null;
  }
  // ── Export ────────────────────────────────────────────────────────────────
  _exportCSV() {
    const cols = this._visibleColumns;
    const header = cols.map((c5) => `"${c5.header}"`).join(",");
    const rows = this._sortedData.map(
      (row) => cols.map((c5) => {
        let v3 = row[c5.field];
        if (v3 instanceof Date) v3 = fmtDate(v3);
        return `"${String(v3 ?? "").replace(/"/g, '""')}"`;
      }).join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a3 = document.createElement("a");
    a3.href = url;
    a3.download = "datatable-export.csv";
    a3.click();
    URL.revokeObjectURL(url);
    emit(this, "uwc-export", { format: "csv", rowCount: this._sortedData.length });
  }
  // ── Pagination ────────────────────────────────────────────────────────────
  _onPageChange(e9) {
    this._page = e9.detail.page + 1;
    this._pageSize = e9.detail.rows;
    emit(this, "uwc-page", { page: this._page, pageSize: this._pageSize });
  }
  // ── Render ────────────────────────────────────────────────────────────────
  render() {
    return b2`
      ${this._renderToolbar()}
      <div class="dt-wrapper">
        ${this.loading ? this._renderLoading() : A}
        <div class="dt-scroll" style="max-height:${this.scrollableHeight}">
          <table class="dt-table">
            <thead class="dt-head">
              ${this._renderHeaderRow()}
              ${this._showFilters ? this._renderFilterRow() : A}
            </thead>
            <tbody class="dt-body">
              ${this._pagedData.length === 0 ? this._renderEmpty() : c4(this._pagedData, (r7) => r7[this.rowKey], (r7) => this._renderRow(r7))}
            </tbody>
          </table>
        </div>
      </div>
      ${this._renderPagination()}
    `;
  }
  // ── Toolbar ───────────────────────────────────────────────────────────────
  _renderToolbar() {
    const selCount = this._selectedKeys.size;
    return b2`
      <div class="dt-toolbar">
        <div class="dt-toolbar-left">
          <div class="dt-search-wrap">
            <svg class="dt-search-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M9 9l3.5 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            <input
              class="dt-search"
              type="text"
              placeholder="Global search…"
              .value=${l3(this._globalFilter)}
              @input=${(e9) => {
      this._globalFilter = e9.target.value;
      this._page = 1;
    }}
            />
            ${this._globalFilter ? b2`<button class="dt-search-clr" @click=${() => {
      this._globalFilter = "";
      this._page = 1;
    }}>×</button>` : A}
          </div>

          ${this._hasActiveFilters ? b2`
            <button class="dt-toolbar-btn dt-active-filter" @click=${this._clearAllFilters.bind(this)}>
              <span>✕ Clear filters</span>
            </button>
          ` : A}

          ${selCount > 0 ? b2`
            <div class="dt-sel-badge">${selCount} selected</div>
          ` : A}
        </div>

        <div class="dt-toolbar-right">
          <button class="dt-toolbar-btn ${this._showFilters ? "active" : ""}"
            @click=${() => this._showFilters = !this._showFilters}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
            Filters
          </button>

          ${this._renderColVisibility()}

          <button class="dt-toolbar-btn" @click=${this._exportCSV.bind(this)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M1 10v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Export CSV
          </button>
        </div>
      </div>
    `;
  }
  _renderColVisibility() {
    const cols = this.columns;
    return b2`
      <div class="dt-col-vis-wrap">
        <button class="dt-toolbar-btn" id="col-vis-trigger"
          @click=${() => this._colPanelOpen = !this._colPanelOpen}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="12" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"/>
            <rect x="8" y="1" width="5" height="12" rx="1" stroke="currentColor" stroke-width="1.2" fill="none"/>
          </svg>
          Columns
        </button>
        ${this._colPanelOpen ? b2`
          <div class="dt-col-panel" @click=${(e9) => e9.stopPropagation()}>
            <div class="dt-col-panel-hdr">
              <span>Show / hide columns</span>
              <button class="dt-col-close" @click=${() => this._colPanelOpen = false}>×</button>
            </div>
            ${cols.map((c5) => b2`
              <label class="dt-col-item">
                <input type="checkbox"
                  .checked=${!this._hiddenCols.has(c5.field)}
                  @change=${(e9) => {
      const n6 = new Set(this._hiddenCols);
      e9.target.checked ? n6.delete(c5.field) : n6.add(c5.field);
      this._hiddenCols = n6;
    }}
                />
                ${c5.header}
              </label>
            `)}
          </div>
        ` : A}
      </div>
    `;
  }
  // ── Header row ───────────────────────────────────────────────────────────
  _renderHeaderRow() {
    const cols = this._visibleColumns;
    return b2`
      <tr>
        ${this.selectionMode === "multiple" ? b2`
          <th class="dt-th dt-th-check" style="width:40px">
            <input type="checkbox"
              .checked=${this._allSelected}
              .indeterminate=${!this._allSelected && this._selectedKeys.size > 0}
              @change=${this._toggleAll.bind(this)}
            />
          </th>
        ` : A}
        ${this.rowExpandable ? b2`<th class="dt-th" style="width:40px"></th>` : A}
        ${cols.map((col) => {
      const sortOrder = this._getSortOrder(col.field);
      const sortRank = this._getSortRank(col.field);
      const w2 = this._colWidths[col.field] ?? col.width ?? 150;
      return b2`
            <th class="dt-th ${col.sortable ? "sortable" : ""} ${sortOrder ? "sorted" : ""}"
              style="width:${w2}px; min-width:${w2}px"
              @click=${col.sortable ? (e9) => this._sort(col.field, e9) : A}
            >
              <div class="dt-th-inner">
                <span class="dt-th-label">${col.header}</span>
                ${col.sortable ? b2`
                  <span class="dt-sort-icon">
                    ${sortOrder === 1 ? b2`<svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 2l4 6H1z" fill="currentColor"/></svg>` : A}
                    ${sortOrder === -1 ? b2`<svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 8L1 2h8z" fill="currentColor"/></svg>` : A}
                    ${sortOrder === 0 ? b2`<svg width="10" height="10" viewBox="0 0 10 10" style="opacity:.25"><path d="M5 2l3 4H2zM5 8l3-4H2z" fill="currentColor"/></svg>` : A}
                    ${sortRank > 0 ? b2`<span class="dt-sort-rank">${sortRank}</span>` : A}
                  </span>
                ` : A}
              </div>
              ${this.resizableColumns ? b2`
                <div class="dt-resize-handle" @mousedown=${(e9) => this._startResize(col.field, e9)}></div>
              ` : A}
            </th>
          `;
    })}
        <th class="dt-th dt-th-actions" style="width:50px"></th>
      </tr>
    `;
  }
  // ── Filter row ───────────────────────────────────────────────────────────
  _renderFilterRow() {
    const cols = this._visibleColumns;
    return b2`
      <tr class="dt-filter-row">
        ${this.selectionMode === "multiple" ? b2`<td class="dt-fc"></td>` : A}
        ${this.rowExpandable ? b2`<td class="dt-fc"></td>` : A}
        ${cols.map((col) => b2`
          <td class="dt-fc">
            ${col.filterable !== false ? this._renderFilter(col) : A}
          </td>
        `)}
        <td class="dt-fc"></td>
      </tr>
    `;
  }
  _renderFilter(col) {
    const f3 = this._filters[col.field];
    switch (col.filterType) {
      case "select":
        return b2`
          <uwc-dropdown
            .options=${(col.filterOptions ?? []).map((o10) => ({ label: o10.label, value: o10.value }))}
            .value=${f3?.value ?? null}
            placeholder="All"
            placement="bottom-start"
            offset="2"
            show-clear
            @uwc-change=${(e9) => this._setFilter(col.field, "select", { value: String(e9.detail.value ?? "") })}
            @uwc-clear=${() => this._setFilter(col.field, "select", { value: "" })}
          ></uwc-dropdown>
        `;
      case "date":
        return b2`
          <uwc-datepicker
            .value=${f3?.dateObj ?? null}
            placeholder="Select date"
            placement="bottom-start"
            offset="2"
            @uwc-date-select=${(e9) => {
          const d3 = e9.detail.value;
          const iso = d3 ? fmtISO(d3) : "";
          this._setFilter(col.field, "date", { value: iso, iso, dateObj: d3 });
        }}
            @uwc-clear=${() => this._setFilter(col.field, "date", { value: "", iso: "", dateObj: null })}
          ></uwc-datepicker>
        `;
      case "number":
        return b2`
          <div class="dt-num-filter">
            <input type="number" placeholder="Min"
              .value=${l3(String(f3?.min ?? ""))}
              @input=${(e9) => this._setFilter(col.field, "number", { min: e9.target.value })}
            />
            <input type="number" placeholder="Max"
              .value=${l3(String(f3?.max ?? ""))}
              @input=${(e9) => this._setFilter(col.field, "number", { max: e9.target.value })}
            />
          </div>
        `;
      default:
        return b2`
          <div class="dt-text-filter">
            <input type="text" placeholder="Search…"
              .value=${l3(f3?.value ?? "")}
              @input=${(e9) => this._setFilter(col.field, "text", { value: e9.target.value })}
            />
            ${f3?.value ? b2`<button class="dt-fc-clr" @click=${() => this._setFilter(col.field, "text", { value: "" })}>×</button>` : A}
          </div>
        `;
    }
  }
  // ── Body rows ────────────────────────────────────────────────────────────
  _renderRow(row) {
    const key = row[this.rowKey];
    const selected = this._selectedKeys.has(key);
    const expanded = this._expandedKeys.has(key);
    const cols = this._visibleColumns;
    return b2`
      <tr
        class=${e7({
      "dt-row": true,
      "dt-row--selected": selected,
      "dt-row--expanded": expanded,
      "dt-row--stripe": this.stripedRows
    })}
        @click=${(e9) => this._toggleRow(row, e9)}
      >
        ${this.selectionMode === "multiple" ? b2`
          <td class="dt-td dt-td-check" @click=${(e9) => e9.stopPropagation()}>
            <input type="checkbox" .checked=${selected}
              @change=${(e9) => this._toggleRow(row, e9)}/>
          </td>
        ` : A}

        ${this.rowExpandable ? b2`
          <td class="dt-td dt-td-expand" @click=${(e9) => e9.stopPropagation()}>
            <button class="dt-expand-btn ${expanded ? "open" : ""}" type="button"
              @click=${(e9) => this._toggleExpand(row, e9)}>
              ${expanded ? b2`<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3l3 4 3-4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>` : b2`<svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 2l4 3-4 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`}
            </button>
          </td>
        ` : A}

        ${cols.map((col) => {
      const isEditing = this._editingCell?.key === key && this._editingCell?.field === col.field;
      return b2`
            <td class="dt-td ${col.editable ? "editable" : ""}"
              @click=${col.editable ? (e9) => this._startEdit(row, col.field, e9) : A}
            >
              ${isEditing ? b2`<input class="dt-inline-input" type="text"
                    .value=${l3(String(row[col.field]))}
                    autofocus
                    @keydown=${(e9) => {
        if (e9.key === "Enter") this._commitEdit(row, col.field, e9);
        if (e9.key === "Escape") this._cancelEdit();
      }}
                    @blur=${(e9) => this._commitEdit(row, col.field, e9)}
                    @click=${(e9) => e9.stopPropagation()}
                  />` : this._renderCell(row, col)}
            </td>
          `;
    })}

        <td class="dt-td dt-td-actions" @click=${(e9) => e9.stopPropagation()}>
          <uwc-menu .items=${this._rowActions(row)} placement="bottom-end" offset="2">
            <uwc-button slot="trigger" icon="three-dots" icon-only variant="text" size="small" aria-label="Row actions"></uwc-button>
          </uwc-menu>
        </td>
      </tr>

      ${expanded ? b2`
        <tr class="dt-row-expansion">
          <td
            colspan=${cols.length + (this.selectionMode === "multiple" ? 1 : 0) + (this.rowExpandable ? 1 : 0) + 1}
            class="dt-expansion-cell"
          >
            ${this._renderExpansion(row)}
          </td>
        </tr>
      ` : A}
    `;
  }
  _renderCell(row, col) {
    const v3 = row[col.field];
    switch (col.type) {
      case "badge": {
        const color = col.field === "department" ? DEPT_COLORS[v3] : col.field === "status" ? STATUS_COLORS[v3] : "#888";
        return b2`<span class="dt-badge" style="--bc:${color}">${v3}</span>`;
      }
      case "currency":
        return b2`<span class="dt-currency">$${Number(v3).toLocaleString()}</span>`;
      case "date":
        return b2`<span class="dt-date">${v3 instanceof Date ? v3.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : v3}</span>`;
      case "rating": {
        const n6 = Number(v3);
        return b2`<span class="dt-rating">
          ${Array.from({ length: 5 }, (_2, i8) => b2`<span class="${i8 < n6 ? "star-on" : "star-off"}">★</span>`)}
        </span>`;
      }
      case "avatar":
        return b2`<div class="dt-avatar">${String(v3).charAt(0).toUpperCase()}</div>`;
      default:
        return b2`<span class="dt-text">${v3}</span>`;
    }
  }
  _rowActions(row) {
    return [
      { icon: "pencil-fill", label: "Edit", command: () => emit(this, "uwc-row-edit", { row }) },
      { icon: "copy", label: "Duplicate", command: () => emit(this, "uwc-row-duplicate", { row }) },
      { icon: "link-45deg", label: "Copy link", command: () => emit(this, "uwc-row-link", { row }) },
      { separator: true },
      {
        icon: "trash-fill",
        label: "Delete",
        danger: true,
        command: () => {
          this.data = this.data.filter((r7) => r7[this.rowKey] !== row[this.rowKey]);
          this._selectedKeys.delete(row[this.rowKey]);
          this._selectedKeys = new Set(this._selectedKeys);
          emit(this, "uwc-row-delete", { row });
        }
      }
    ];
  }
  _renderExpansion(row) {
    const salary = row["salary"];
    const startDate = row["startDate"];
    const pct = Math.min(100, Math.round((salary - 5e4) / 15e4 * 100));
    const daysWorked = Math.round((Date.now() - startDate.getTime()) / 864e5);
    const rating = row["rating"];
    const status = row["status"];
    return b2`
      <div class="dt-exp-card">
        <div class="dt-exp-avatar">${row["name"].charAt(0)}</div>
        <div class="dt-exp-info">
          <h3>${row["name"]}</h3>
          <p class="dt-exp-role">${row["role"]} · ${row["department"]}</p>
          <div class="dt-exp-grid">
            <div><span class="dt-exp-lbl">Email</span><span>${row["email"]}</span></div>
            <div><span class="dt-exp-lbl">Country</span><span>${row["country"]}</span></div>
            <div><span class="dt-exp-lbl">Start Date</span><span>${fmtDate(startDate)}</span></div>
            <div><span class="dt-exp-lbl">Days Worked</span><span>${daysWorked.toLocaleString()} days</span></div>
            <div><span class="dt-exp-lbl">Status</span>
              <span class="dt-badge" style="--bc:${STATUS_COLORS[status]}">${status}</span>
            </div>
            <div><span class="dt-exp-lbl">Rating</span>
              <span class="dt-rating">
                ${Array.from({ length: 5 }, (_2, i8) => b2`<span class="${i8 < rating ? "star-on" : "star-off"}">★</span>`)}
              </span>
            </div>
          </div>
          <div class="dt-exp-bar-wrap">
            <span class="dt-exp-lbl">Salary vs range ($50K–$200K)</span>
            <div class="dt-exp-bar"><div class="dt-exp-bar-fill" style="width:${pct}%"></div></div>
            <span class="dt-exp-bar-val">$${salary.toLocaleString()}</span>
          </div>
        </div>
      </div>
    `;
  }
  _renderLoading() {
    return b2`
      <div class="dt-loading">
        <div class="dt-spinner"></div>
        <span>Loading…</span>
      </div>
    `;
  }
  _renderEmpty() {
    return b2`
      <tr>
        <td colspan="999" class="dt-empty">
          <div class="dt-empty-inner">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="#e0ddd8" stroke-width="2"/>
              <path d="M13 20h14M20 13v14" stroke="#e0ddd8" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <p>${this.emptyMessage}</p>
          </div>
        </td>
      </tr>
    `;
  }
  // ── Pagination ────────────────────────────────────────────────────────────
  _renderPagination() {
    const first = (this._page - 1) * this._pageSize;
    const rppOptions = this.rowsPerPageOptions.join(",");
    return b2`
      <uwc-paginator
        total-records=${this._totalRecords}
        rows=${this._pageSize}
        first=${first}
        rows-per-page-options=${rppOptions}
        page-links="5"
        show-current-page-report
        current-page-report-template="Showing {first}–{last} of {totalRecords} records${this._totalRecords < this.data.length ? ` (filtered from ${this.data.length})` : ""}"
        @uwc-page-change=${this._onPageChange.bind(this)}
      ></uwc-paginator>
    `;
  }
};
// ── Styles ────────────────────────────────────────────────────────────────
UwcDatatable.styles = [styles_default4];
__decorateClass([
  n4({ attribute: false })
], UwcDatatable.prototype, "data", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDatatable.prototype, "columns", 2);
__decorateClass([
  n4({ type: String, attribute: "selection-mode" })
], UwcDatatable.prototype, "selectionMode", 2);
__decorateClass([
  n4({ type: String, attribute: "row-key" })
], UwcDatatable.prototype, "rowKey", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDatatable.prototype, "loading", 2);
__decorateClass([
  n4({ type: Number })
], UwcDatatable.prototype, "rows", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDatatable.prototype, "rowsPerPageOptions", 2);
__decorateClass([
  n4({ type: String, attribute: "scroll-height" })
], UwcDatatable.prototype, "scrollableHeight", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "row-expandable" })
], UwcDatatable.prototype, "rowExpandable", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "striped-rows" })
], UwcDatatable.prototype, "stripedRows", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "resizable-columns" })
], UwcDatatable.prototype, "resizableColumns", 2);
__decorateClass([
  n4({ type: String, attribute: "state-storage" })
], UwcDatatable.prototype, "stateStorage", 2);
__decorateClass([
  n4({ type: String, attribute: "empty-message" })
], UwcDatatable.prototype, "emptyMessage", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_page", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_pageSize", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_sortMeta", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_filters", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_globalFilter", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_selectedKeys", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_expandedKeys", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_showFilters", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_colWidths", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_editingCell", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_hiddenCols", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_colPanelOpen", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_resizingCol", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_resizeStartX", 2);
__decorateClass([
  r5()
], UwcDatatable.prototype, "_resizeStartW", 2);

// src/datatable/react.ts
var UwcDatatable2 = createComponent4({
  tagName: "uwc-datatable",
  elementClass: UwcDatatable,
  react: React4,
  events: {
    onUwcFilter: "uwc-filter",
    onUwcSelectionChange: "uwc-selection-change",
    onUwcCellEdit: "uwc-cell-edit",
    onUwcExport: "uwc-export",
    onUwcPage: "uwc-page",
    onUwcRowEdit: "uwc-row-edit",
    onUwcRowDuplicate: "uwc-row-duplicate",
    onUwcRowLink: "uwc-row-link",
    onUwcRowDelete: "uwc-row-delete"
  }
});

// src/datepicker/react.ts
import { createComponent as createComponent5 } from "@lit/react";
import React5 from "react";

// src/datepicker/styles.ts
var styles_default5 = [
  hostReset,
  floatingPanel(".dp-panel", { durationVar: "--uwc-dp-duration", durationDefault: "160ms" }),
  placementOriginsExtended,
  i`
    :host           { display: inline-block; position: relative; }
    :host([inline]) { display: block; }

    /* ── Trigger / Input ────────────────────────────────────────────────────── */
    .dp-trigger {
      display: inline-flex;
      align-items: center;
      background:    var(--uwc-dp-trigger-bg,     ${surface});
      border:        var(--uwc-dp-trigger-border, 1px solid #d0cfc9);
      border-radius: var(--uwc-dp-trigger-radius, ${radiusLg});
      min-width: 180px;
      overflow:  hidden;
      transition: border-color ${durationBase}, box-shadow ${durationBase};
    }
    .dp-trigger:focus-within,
    .dp-trigger--open {
      border-color: var(--uwc-dp-primary, var(--uwc-color-primary, ${primary}));
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-dp-primary, var(--uwc-color-primary, ${primary})) 20%, transparent);
    }
    .dp-trigger--disabled { opacity: 0.5; pointer-events: none; }
    .dp-trigger--readonly { background: ${surfaceRaised}; }

    .dp-input {
      flex: 1;
      min-width: 0;
      padding: ${space2} 10px;
      border: none;
      outline: none;
      font-family:    var(--uwc-font-family, inherit);
      font-size:      var(--uwc-dp-trigger-font-size, ${fontSizeSm});
      color:          var(--uwc-dp-trigger-color, ${text});
      background:     transparent;
      cursor:         pointer;
      white-space:    nowrap;
      overflow:       hidden;
      text-overflow:  ellipsis;
    }
    .dp-input::placeholder { color: ${textMuted}; }

    .dp-clear-btn,
    .dp-cal-icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0 ${space2};
      height: 36px;
      color: ${textMuted};
      transition: color ${durationFast};
    }
    .dp-clear-btn:hover,
    .dp-cal-icon:hover { color: ${textSecondary}; }
    .dp-clear-btn  { font-size: ${fontSizeXs}; }
    .dp-cal-icon   { font-size: ${fontSizeMd}; }
    .dp-cal-icon:disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── Floating panel (visual) ────────────────────────────────────────────── */
    .dp-panel {
      background:    var(--uwc-dp-bg,     ${surface});
      border:        var(--uwc-dp-border, 1px solid ${border});
      border-radius: var(--uwc-dp-radius, ${radiusXl});
      box-shadow:    var(--uwc-dp-shadow, ${shadowLg});
      z-index:       var(--uwc-dp-z,     ${zFloat});
      overflow:      hidden;
      user-select:   none;
    }

    /* ── Inline variant ─────────────────────────────────────────────────────── */
    .dp-panel--inline {
      position: static !important;
      inset: unset !important;
      margin: 0 !important;
      opacity: 1 !important;
      transform: none !important;
      display: inline-block;
    }

    /* ── Date view grid ─────────────────────────────────────────────────────── */
    .dp-date-view {
      display: grid;
      grid-template-columns: repeat(var(--dp-months, 1), auto);
    }
    .dp-month-panel {
      padding: ${space4};
      min-width: 268px;
    }
    .dp-month-panel + .dp-month-panel { border-left: 1px solid ${borderSubtle}; }

    /* ── Header ─────────────────────────────────────────────────────────────── */
    .dp-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: ${space3};
    }
    .dp-header-labels { display: flex; gap: ${space1}; align-items: center; }

    .dp-month-label,
    .dp-year-label {
      font-size:   ${fontSizeMd};
      font-weight: ${fontWeightSemibold};
      font-family: inherit;
      background:  none;
      border:      none;
      cursor:      pointer;
      color:       var(--uwc-dp-header-color, ${text});
      padding:     3px 6px;
      border-radius: ${radiusSm};
      transition: background ${durationFast};
    }
    .dp-month-label:hover,
    .dp-year-label:hover { background: ${hoverBg}; }

    .dp-decade-label { font-size: ${fontSizeMd}; font-weight: ${fontWeightSemibold}; color: ${text}; padding: 3px 6px; }

    .dp-nav-btn {
      width: 28px;
      height: 28px;
      border-radius: ${radiusMd};
      border:     none;
      background: none;
      cursor:     pointer;
      font-size:  ${fontSizeLg};
      color:      ${textSecondary};
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background ${durationFast}, color ${durationFast};
    }
    .dp-nav-btn:hover { background: ${hoverBg}; color: ${text}; }
    .dp-nav-spacer { width: 28px; flex-shrink: 0; }

    /* ── Day-name headers ───────────────────────────────────────────────────── */
    .dp-day-headers { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin-bottom: ${space1}; }
    .dp-day-headers--week { grid-template-columns: 24px repeat(7, 1fr); }
    .dp-day-name { text-align: center; font-size: ${fontSizeXs}; font-weight: ${fontWeightMedium}; color: ${textDisabled}; padding: 3px 0; }
    .dp-week-label { text-align: center; font-size: 10px; color: ${textDisabled}; padding: 3px 0; }

    /* ── Day grid ───────────────────────────────────────────────────────────── */
    .dp-days-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
    .dp-days-grid--week { grid-template-columns: 24px repeat(7, 1fr); }
    .dp-week-num { display: flex; align-items: center; justify-content: center; font-size: 10px; color: ${textDisabled}; }

    /* ── Day cell ───────────────────────────────────────────────────────────── */
    .dp-day {
      width: 100%;
      aspect-ratio: 1/1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: ${fontSizeSm};
      border-radius: ${radiusFull};
      border: none;
      background: none;
      cursor: pointer;
      color: ${text};
      transition: background ${durationFast}, color ${durationFast};
      position: relative;
    }
    .dp-day:hover:not(:disabled):not(.dp-day--selected) {
      background: var(--uwc-dp-day-hover-bg, rgba(99,102,241,0.08));
    }
    .dp-day--other-month { color: ${textDisabled}; }
    .dp-day--today       { border: 1.5px solid var(--uwc-dp-day-today-border, var(--uwc-color-primary, ${primary})); font-weight: ${fontWeightSemibold}; }
    .dp-day--selected    { background: var(--uwc-dp-day-selected-bg, var(--uwc-color-primary, ${primary})); color: var(--uwc-dp-day-selected-color, #fff); font-weight: ${fontWeightSemibold}; }
    .dp-day--range-start,
    .dp-day--range-end   { background: var(--uwc-dp-day-selected-bg, var(--uwc-color-primary, ${primary})); color: var(--uwc-dp-day-selected-color, #fff); border-radius: ${radiusFull}; z-index: 1; }
    .dp-day--in-range    { background: var(--uwc-dp-range-bg, rgba(99,102,241,0.1)); border-radius: 0; }
    .dp-day--disabled    { color: ${textDisabled}; cursor: not-allowed; opacity: 0.5; }

    /* ── Month / Year grid ──────────────────────────────────────────────────── */
    .dp-month-grid,
    .dp-year-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: ${space1}; padding: ${space3} ${space4}; }

    .dp-month-cell,
    .dp-year-cell {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${space2} ${space1};
      font-size: ${fontSizeSm};
      border-radius: ${radiusMd};
      border: none;
      background: none;
      cursor: pointer;
      color: ${text};
      transition: background ${durationFast};
    }
    .dp-month-cell:hover,
    .dp-year-cell:hover { background: ${hoverBg}; }
    .dp-month-cell--selected,
    .dp-year-cell--selected {
      background: var(--uwc-dp-day-selected-bg, var(--uwc-color-primary, ${primary}));
      color: var(--uwc-dp-day-selected-color, #fff);
      font-weight: ${fontWeightMedium};
    }
    .dp-month-cell--current,
    .dp-year-cell--current  { font-weight: ${fontWeightSemibold}; }
    .dp-month-cell--disabled,
    .dp-year-cell--disabled { opacity: 0.4; cursor: not-allowed; }

    /* ── Time picker ────────────────────────────────────────────────────────── */
    .dp-time-picker {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${space2};
      padding: ${space3} ${space4};
      border-top: 1px solid ${borderSubtle};
    }
    .dp-time-input {
      width: 52px;
      padding: ${space1} ${space2};
      border: 1px solid ${border};
      border-radius: ${radiusMd};
      font-family: inherit;
      font-size:   ${fontSizeSm};
      text-align:  center;
      outline: none;
      color: ${text};
      transition: border-color ${durationBase};
    }
    .dp-time-input:focus { border-color: var(--uwc-dp-primary, var(--uwc-color-primary, ${primary})); }
    .dp-time-sep { font-size: ${fontSizeLg}; font-weight: ${fontWeightBold}; color: ${textSecondary}; }

    /* ── Button bar ─────────────────────────────────────────────────────────── */
    .dp-btn-bar {
      display: flex;
      justify-content: flex-end;
      gap: ${space2};
      padding: ${space2} ${space4};
      border-top: 1px solid ${borderSubtle};
    }
  `
];

// src/datepicker/index.ts
var MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
var MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
var DAY_NARROW = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
function startOfDay(d3) {
  return new Date(d3.getFullYear(), d3.getMonth(), d3.getDate());
}
function sameDay(a3, b3) {
  return Boolean(
    a3 && b3 && a3.getFullYear() === b3.getFullYear() && a3.getMonth() === b3.getMonth() && a3.getDate() === b3.getDate()
  );
}
function isAfter(a3, b3) {
  return startOfDay(a3) > startOfDay(b3);
}
function isBefore(a3, b3) {
  return startOfDay(a3) < startOfDay(b3);
}
function isBetween(d3, start, end) {
  const sd = startOfDay(d3);
  return sd > startOfDay(start) && sd < startOfDay(end);
}
function getISOWeek(d3) {
  const date = new Date(d3.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(
    ((date.getTime() - week1.getTime()) / 864e5 - 3 + (week1.getDay() + 6) % 7) / 7
  );
}
function buildCalendarGrid(year, month, firstDayOfWeek) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const offset = (firstDay - firstDayOfWeek + 7) % 7;
  const cells = [];
  for (let i8 = offset - 1; i8 >= 0; i8--) {
    cells.push({ date: new Date(year, month - 1, daysInPrev - i8), other: true });
  }
  for (let i8 = 1; i8 <= daysInMonth; i8++) {
    cells.push({ date: new Date(year, month, i8), other: false });
  }
  let next = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, next++), other: true });
  }
  return cells;
}
function getOrderedDayHeaders(firstDayOfWeek) {
  return Array.from({ length: 7 }, (_2, i8) => DAY_NARROW[(firstDayOfWeek + i8) % 7]);
}
function formatDate(date, fmt) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = String(date.getFullYear());
  const yy = yyyy.slice(-2);
  return fmt.replace("dd", dd).replace("mm", mm).replace("yyyy", yyyy).replace("yy", yy);
}
function formatTime(h4, m3, s5, showSeconds, hourFormat, ampm) {
  const display12 = hourFormat === "12";
  const hh = display12 ? String(h4 === 0 ? 12 : h4 > 12 ? h4 - 12 : h4).padStart(2, "0") : String(h4).padStart(2, "0");
  const mm = String(m3).padStart(2, "0");
  const ss = String(s5).padStart(2, "0");
  const ap = display12 ? ` ${ampm}` : "";
  return showSeconds ? `${hh}:${mm}:${ss}${ap}` : `${hh}:${mm}${ap}`;
}
function isDateDisabled(date, minDate, maxDate, disabledDates, disabledDays) {
  if (minDate && isBefore(date, minDate)) return true;
  if (maxDate && isAfter(date, maxDate)) return true;
  if (disabledDays.includes(date.getDay())) return true;
  if (disabledDates.some((d3) => sameDay(d3, date))) return true;
  return false;
}
var UwcDatepicker = class extends i4 {
  constructor() {
    super(...arguments);
    this.value = null;
    this.selectionMode = "single";
    this.dateFormat = "mm/dd/yyyy";
    this.minDate = null;
    this.maxDate = null;
    this.disabledDates = [];
    this.disabledDays = [];
    this.showTime = false;
    this.hourFormat = "24";
    this.showSeconds = false;
    this.showWeek = false;
    this.numberOfMonths = 1;
    this.firstDayOfWeek = 0;
    this.inline = false;
    this.showButtonBar = false;
    this.showClear = false;
    this.placeholder = "Select date";
    this.readonly = false;
    this.disabled = false;
    this.view = "date";
    this.placement = "bottom-start";
    this.offset = 4;
    this._viewDate = (() => {
      const now = /* @__PURE__ */ new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    })();
    this._currentView = "date";
    this._rangeStart = null;
    this._hoveredDate = null;
    this._inputValue = "";
    this._timeH = 0;
    this._timeM = 0;
    this._timeS = 0;
    this._ampm = "AM";
    this._yearBase = (() => Math.floor((/* @__PURE__ */ new Date()).getFullYear() / 12) * 12)();
    this._focusedDate = null;
    // ── PlacementController ───────────────────────────────────────────────────
    //
    // Datepicker renders its own <input> trigger, so we call
    // setTriggerElement() in firstUpdated() — the same pattern as uwc-dropdown.
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const onKeydown = (e9) => {
          if (this.disabled || this.readonly) return;
          if (e9.key === "Enter" || e9.key === " ") {
            e9.preventDefault();
            this._pc.toggle();
          }
        };
        el.addEventListener("keydown", onKeydown);
        return () => el.removeEventListener("keydown", onKeydown);
      },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      afterShow: () => {
        const first = this._firstSelectedDate();
        if (first) {
          this._viewDate = new Date(first.getFullYear(), first.getMonth(), 1);
        }
        this._currentView = this.view;
        emit(this, "uwc-show");
      },
      afterHide: () => {
        this._hoveredDate = null;
        this._rangeStart = null;
        emit(this, "uwc-hide");
      }
    });
  }
  // ── Lifecycle ─────────────────────────────────────────────────────────────
  firstUpdated() {
    if (!this.inline) {
      this._pc.firstUpdated(
        this.triggerId ?? null,
        null
        // no trigger slot — we use the rendered input directly
      );
      if (!this.triggerId) {
        this._pc.setTriggerElement(this._triggerInput);
      }
    }
    this._syncInputValue();
  }
  updated(changed) {
    super.updated(changed);
    if (!this.inline) {
      this._pc.updated(
        changed,
        this.triggerId ?? null,
        null
      );
    }
    if (changed.has("value")) {
      this._syncInputValue();
    }
    if (changed.has("view")) {
      this._currentView = this.view;
    }
  }
  // ── Value helpers ─────────────────────────────────────────────────────────
  _firstSelectedDate() {
    if (!this.value) return null;
    if (Array.isArray(this.value)) return this.value[0] ?? null;
    return this.value;
  }
  _hasValue() {
    const v3 = this.value;
    if (!v3) return false;
    if (Array.isArray(v3)) return v3.length > 0 && v3[0] !== null;
    return true;
  }
  _syncInputValue() {
    const v3 = this.value;
    if (!v3 || Array.isArray(v3) && v3.length === 0) {
      this._inputValue = "";
      return;
    }
    switch (this.selectionMode) {
      case "single": {
        this._inputValue = this._formatFull(v3);
        break;
      }
      case "range": {
        const [s5, e9] = v3;
        this._inputValue = s5 ? `${this._formatFull(s5)} \u2192 ${e9 ? this._formatFull(e9) : "\u2013"}` : "";
        break;
      }
      case "multiple": {
        const dates = v3;
        if (dates.length === 0) this._inputValue = "";
        else if (dates.length === 1) this._inputValue = this._formatFull(dates[0]);
        else this._inputValue = `${dates.length} dates selected`;
        break;
      }
    }
  }
  /** Format a Date using dateFormat + optional time suffix. */
  _formatFull(date) {
    let s5 = formatDate(date, this.dateFormat);
    if (this.showTime) {
      s5 += " " + formatTime(
        this._timeH,
        this._timeM,
        this._timeS,
        this.showSeconds,
        this.hourFormat,
        this._ampm
      );
    }
    return s5;
  }
  // ── Day-cell state queries ────────────────────────────────────────────────
  _isSelected(date) {
    const v3 = this.value;
    if (!v3) return false;
    if (this.selectionMode === "single") return sameDay(v3, date);
    if (this.selectionMode === "multiple") return v3.some((d3) => sameDay(d3, date));
    if (this.selectionMode === "range") {
      const [s5, e9] = v3;
      return sameDay(s5, date) || e9 !== null && sameDay(e9, date);
    }
    return false;
  }
  _isRangeStart(date) {
    if (this.selectionMode !== "range") return false;
    const s5 = Array.isArray(this.value) ? this.value[0] : this._rangeStart;
    return s5 !== null && s5 !== void 0 && sameDay(s5, date);
  }
  _isRangeEnd(date) {
    if (this.selectionMode !== "range" || !Array.isArray(this.value)) return false;
    const e9 = this.value[1];
    return e9 !== null && sameDay(e9, date);
  }
  _isInRange(date) {
    if (this.selectionMode !== "range") return false;
    if (Array.isArray(this.value)) {
      const [s5, e9] = this.value;
      if (s5 && e9) return isBetween(date, s5, e9);
    }
    if (this._rangeStart && this._hoveredDate) {
      const start = isBefore(this._rangeStart, this._hoveredDate) ? this._rangeStart : this._hoveredDate;
      const end = isBefore(this._rangeStart, this._hoveredDate) ? this._hoveredDate : this._rangeStart;
      return isBetween(date, start, end);
    }
    return false;
  }
  _isToday(date) {
    return sameDay(date, /* @__PURE__ */ new Date());
  }
  _isDisabled(date) {
    return isDateDisabled(date, this.minDate, this.maxDate, this.disabledDates, this.disabledDays);
  }
  // ── Selection logic ───────────────────────────────────────────────────────
  _selectDate(date, originalEvent) {
    if (this.disabled || this.readonly) return;
    if (this._isDisabled(date)) return;
    let d3 = new Date(date);
    if (this.showTime) {
      const h4 = this.hourFormat === "12" ? this._ampm === "PM" ? this._timeH === 12 ? 12 : this._timeH + 12 : this._timeH === 12 ? 0 : this._timeH : this._timeH;
      d3.setHours(h4, this._timeM, this._timeS, 0);
    }
    switch (this.selectionMode) {
      case "single": {
        this.value = sameDay(this.value, d3) ? null : d3;
        if (this.value && !this.inline) this._pc.hide();
        break;
      }
      case "multiple": {
        const arr = Array.isArray(this.value) ? [...this.value] : [];
        const idx = arr.findIndex((x2) => sameDay(x2, d3));
        if (idx >= 0) arr.splice(idx, 1);
        else arr.push(d3);
        this.value = arr;
        break;
      }
      case "range": {
        if (!this._rangeStart) {
          this._rangeStart = d3;
          this.value = [d3, null];
        } else {
          const s5 = isBefore(this._rangeStart, d3) ? this._rangeStart : d3;
          const e9 = isBefore(this._rangeStart, d3) ? d3 : this._rangeStart;
          this.value = [s5, e9];
          this._rangeStart = null;
          if (!this.inline) this._pc.hide();
        }
        break;
      }
    }
    emit(this, "uwc-date-select", {
      value: this.value,
      selectionMode: this.selectionMode,
      originalEvent
    });
  }
  // ── Month / Year selection ────────────────────────────────────────────────
  _selectMonth(month) {
    const year = this._viewDate.getFullYear();
    this._viewDate = new Date(year, month, 1);
    if (this.view === "month") {
      this.value = new Date(year, month, 1);
      if (!this.inline) this._pc.hide();
      emit(this, "uwc-date-select", {
        value: this.value,
        selectionMode: this.selectionMode
      });
    } else {
      this._currentView = "date";
    }
    emit(this, "uwc-month-change", { month, year });
  }
  _selectYear(year) {
    this._yearBase = Math.floor(year / 12) * 12;
    this._viewDate = new Date(year, this._viewDate.getMonth(), 1);
    if (this.view === "year") {
      this.value = new Date(year, 0, 1);
      if (!this.inline) this._pc.hide();
      emit(this, "uwc-date-select", {
        value: this.value,
        selectionMode: this.selectionMode
      });
    } else {
      this._currentView = "month";
    }
  }
  // ── Navigation ────────────────────────────────────────────────────────────
  _prevMonth(step = 1) {
    const d3 = this._viewDate;
    this._viewDate = new Date(d3.getFullYear(), d3.getMonth() - step, 1);
    emit(this, "uwc-month-change", {
      month: this._viewDate.getMonth(),
      year: this._viewDate.getFullYear()
    });
  }
  _nextMonth(step = 1) {
    const d3 = this._viewDate;
    this._viewDate = new Date(d3.getFullYear(), d3.getMonth() + step, 1);
    emit(this, "uwc-month-change", {
      month: this._viewDate.getMonth(),
      year: this._viewDate.getFullYear()
    });
  }
  _prevYear() {
    this._viewDate = new Date(this._viewDate.getFullYear() - 1, this._viewDate.getMonth(), 1);
  }
  _nextYear() {
    this._viewDate = new Date(this._viewDate.getFullYear() + 1, this._viewDate.getMonth(), 1);
  }
  _prevDecade() {
    this._yearBase -= 12;
  }
  _nextDecade() {
    this._yearBase += 12;
  }
  // ── Time spinner ──────────────────────────────────────────────────────────
  _stepTime(field, delta) {
    if (field === "h") {
      const max = this.hourFormat === "12" ? 12 : 23;
      const min = this.hourFormat === "12" ? 1 : 0;
      let v3 = this._timeH + delta;
      if (v3 > max) v3 = min;
      if (v3 < min) v3 = max;
      this._timeH = v3;
    } else if (field === "m") {
      let v3 = this._timeM + delta;
      if (v3 > 59) v3 = 0;
      if (v3 < 0) v3 = 59;
      this._timeM = v3;
    } else {
      let v3 = this._timeS + delta;
      if (v3 > 59) v3 = 0;
      if (v3 < 0) v3 = 59;
      this._timeS = v3;
    }
    this._syncInputValue();
  }
  _setTimeField(field, raw) {
    const max12h = { h: 12, m: 59, s: 59 };
    const max24h = { h: 23, m: 59, s: 59 };
    const max = (this.hourFormat === "12" ? max12h : max24h)[field];
    const min = field === "h" && this.hourFormat === "12" ? 1 : 0;
    let v3 = parseInt(raw, 10);
    if (isNaN(v3) || v3 < min) v3 = min;
    if (v3 > max) v3 = max;
    if (field === "h") this._timeH = v3;
    else if (field === "m") this._timeM = v3;
    else this._timeS = v3;
    this._syncInputValue();
  }
  _toggleAmPm() {
    this._ampm = this._ampm === "AM" ? "PM" : "AM";
    this._syncInputValue();
  }
  // ── Keyboard navigation ───────────────────────────────────────────────────
  _handleCalendarKeydown(e9) {
    if (this._currentView !== "date") return;
    const base = this._focusedDate ?? this._firstSelectedDate() ?? /* @__PURE__ */ new Date();
    let next = new Date(base);
    switch (e9.key) {
      case "ArrowRight":
        next.setDate(next.getDate() + 1);
        break;
      case "ArrowLeft":
        next.setDate(next.getDate() - 1);
        break;
      case "ArrowDown":
        next.setDate(next.getDate() + 7);
        break;
      case "ArrowUp":
        next.setDate(next.getDate() - 7);
        break;
      case "PageDown":
        next.setMonth(next.getMonth() + 1);
        break;
      case "PageUp":
        next.setMonth(next.getMonth() - 1);
        break;
      case "Home":
        next = new Date(next.getFullYear(), next.getMonth(), 1);
        break;
      case "End":
        next = new Date(next.getFullYear(), next.getMonth() + 1, 0);
        break;
      case "Enter":
        e9.preventDefault();
        if (this._focusedDate) this._selectDate(this._focusedDate, e9);
        return;
      default:
        return;
    }
    e9.preventDefault();
    this._focusedDate = next;
    const vd = this._viewDate;
    if (next.getMonth() !== vd.getMonth() || next.getFullYear() !== vd.getFullYear()) {
      this._viewDate = new Date(next.getFullYear(), next.getMonth(), 1);
    }
  }
  // ── Clear / Today actions ─────────────────────────────────────────────────
  _clear(e9) {
    e9?.stopPropagation();
    const prev = this.value;
    this.value = this.selectionMode === "multiple" ? [] : null;
    this._rangeStart = null;
    this._inputValue = "";
    emit(this, "uwc-clear", { previousValue: prev });
    emit(this, "uwc-date-select", {
      value: this.value,
      selectionMode: this.selectionMode
    });
  }
  _goToday() {
    const today = /* @__PURE__ */ new Date();
    this._viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    this._selectDate(today);
  }
  // ── Public imperative API ─────────────────────────────────────────────────
  /** Open the calendar panel programmatically. No-op in inline mode. */
  show() {
    if (!this.inline) this._pc.show();
  }
  /** Close the calendar panel programmatically. No-op in inline mode. */
  hide() {
    if (!this.inline) this._pc.hide();
  }
  /** Toggle the calendar panel. No-op in inline mode. */
  toggle() {
    if (!this.inline) this._pc.toggle();
  }
  /** Clear the current value. */
  clear() {
    this._clear();
  }
  /** Whether the panel is currently open. Always true in inline mode. */
  get isOpen() {
    return this.inline ? true : this._pc.open;
  }
  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  render() {
    return this.inline ? this._renderInline() : this._renderDropdown();
  }
  // ── Dropdown wrapper (input trigger + positioned panel) ───────────────────
  _renderDropdown() {
    const open = this._pc.open;
    const hasValue = this._hasValue();
    return b2`
      <div
        part="trigger"
        class=${e7({
      "dp-trigger": true,
      "dp-trigger--open": open,
      "dp-trigger--disabled": this.disabled,
      "dp-trigger--readonly": this.readonly
    })}
      >
        <input
          id="trigger-input"
          part="input"
          type="text"
          class="dp-input"
          .value=${l3(this._inputValue)}
          placeholder=${this.placeholder}
          ?readonly=${true}
          ?disabled=${this.disabled}
          autocomplete="off"
          aria-haspopup="dialog"
          aria-expanded=${open}
          aria-label=${this._inputValue || this.placeholder}
          @click=${(e9) => {
      e9.stopPropagation();
      if (!this.disabled && !this.readonly) this._pc.toggle();
    }}
          @focus=${() => emit(this, "uwc-focus")}
          @blur=${() => emit(this, "uwc-blur")}
        />

        ${hasValue && this.showClear ? b2`
          <button
            part="clear-btn"
            class="dp-clear-btn"
            type="button"
            tabindex="-1"
            aria-label="Clear"
            @click=${this._clear}
          >✕</button>
        ` : A}

        <button
          part="cal-icon"
          class="dp-cal-icon"
          type="button"
          tabindex="-1"
          aria-hidden="true"
          ?disabled=${this.disabled}
          @click=${(e9) => {
      e9.stopPropagation();
      if (!this.disabled && !this.readonly) this._pc.toggle();
    }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="1" y="3" width="14" height="12" rx="2" stroke="currentColor" stroke-width="1.25" fill="none"/>
            <path d="M1 7h14" stroke="currentColor" stroke-width="1.25"/>
            <path d="M5 1v4M11 1v4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div
        id="panel"
        part="panel"
        popover="manual"
        role="dialog"
        aria-label="Calendar"
        aria-modal="true"
        class=${e7({
      "dp-panel": true,
      "is-open": open
    })}
        data-placement=${this.placement}
        @keydown=${this._handleCalendarKeydown.bind(this)}
      >
        ${this._renderPanelContent()}
      </div>
    `;
  }
  // ── Inline wrapper (no input, always visible) ─────────────────────────────
  _renderInline() {
    return b2`
      <div
        class="dp-panel dp-panel--inline"
        role="dialog"
        aria-label="Calendar"
        @keydown=${this._handleCalendarKeydown.bind(this)}
      >
        ${this._renderPanelContent()}
      </div>
    `;
  }
  // ── Panel content router ──────────────────────────────────────────────────
  _renderPanelContent() {
    switch (this._currentView) {
      case "year":
        return this._renderYearGrid();
      case "month":
        return this._renderMonthGrid();
      default:
        return this._renderDateView();
    }
  }
  // ── Date view ─────────────────────────────────────────────────────────────
  _renderDateView() {
    const n6 = Math.max(1, this.numberOfMonths);
    const panels = Array.from({ length: n6 }, (_2, i8) => {
      const d3 = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth() + i8, 1);
      return { year: d3.getFullYear(), month: d3.getMonth() };
    });
    return b2`
      <div class="dp-date-view" style="--dp-months: ${n6}">
        ${panels.map((p4, i8) => this._renderMonthPanel(p4.year, p4.month, i8, n6))}
      </div>
      ${this.showTime ? this._renderTimePicker() : A}
      ${this.showButtonBar ? this._renderButtonBar() : A}
    `;
  }
  _renderMonthPanel(year, month, idx, total) {
    const cells = buildCalendarGrid(year, month, this.firstDayOfWeek);
    const headers = getOrderedDayHeaders(this.firstDayOfWeek);
    const isFirst = idx === 0;
    const isLast = idx === total - 1;
    return b2`
      <div class="dp-month-panel">

        <!-- ── Header ── -->
        <div part="header" class="dp-header">
          ${isFirst ? b2`
            <button
              part="nav-btn"
              class="dp-nav-btn"
              type="button"
              aria-label="Previous month"
              @click=${() => this._prevMonth(total)}
            >‹</button>
          ` : b2`<span class="dp-nav-spacer"></span>`}

          <div class="dp-header-labels">
            <button
              class="dp-month-label"
              type="button"
              title="Select month"
              @click=${() => {
      if (this.view === "date") this._currentView = "month";
    }}
            >${MONTH_NAMES[month]}</button>

            <button
              class="dp-year-label"
              type="button"
              title="Select year"
              @click=${() => {
      if (this.view !== "year") {
        this._yearBase = Math.floor(year / 12) * 12;
        this._currentView = "year";
      }
    }}
            >${year}</button>
          </div>

          ${isLast ? b2`
            <button
              part="nav-btn"
              class="dp-nav-btn"
              type="button"
              aria-label="Next month"
              @click=${() => this._nextMonth(total)}
            >›</button>
          ` : b2`<span class="dp-nav-spacer"></span>`}
        </div>

        <!-- ── Day-name column headers ── -->
        <div
          class=${e7({
      "dp-day-headers": true,
      "dp-day-headers--week": this.showWeek
    })}
          aria-hidden="true"
        >
          ${this.showWeek ? b2`<span class="dp-week-label">W</span>` : A}
          ${headers.map((d3) => b2`<span part="day-name" class="dp-day-name">${d3}</span>`)}
        </div>

        <!-- ── Day grid ── -->
        <div
          class=${e7({
      "dp-days-grid": true,
      "dp-days-grid--week": this.showWeek
    })}
          role="grid"
          aria-label="${MONTH_NAMES[month]} ${year}"
        >
          ${c4(
      Array.from({ length: 6 }, (_2, r7) => r7),
      (r7) => r7,
      (r7) => {
        const row = cells.slice(r7 * 7, r7 * 7 + 7);
        const wkNum = this.showWeek ? getISOWeek(row[0].date) : null;
        return b2`
                ${this.showWeek ? b2`<span part="week-num" class="dp-week-num" aria-label="Week ${wkNum}">${wkNum}</span>` : A}
                ${row.map(({ date, other }) => this._renderDayCell(date, other))}
              `;
      }
    )}
        </div>

      </div>
    `;
  }
  _renderDayCell(date, other) {
    const disabled = this._isDisabled(date);
    const selected = this._isSelected(date);
    const rangeS = this._isRangeStart(date);
    const rangeE = this._isRangeEnd(date);
    const inRange = this._isInRange(date);
    const today = this._isToday(date);
    const focused = this._focusedDate !== null && sameDay(this._focusedDate, date);
    return b2`
      <button
        type="button"
        part=${[
      "day",
      today && "day-today",
      selected && "day-selected",
      inRange && "day-in-range",
      disabled && "day-disabled"
    ].filter(Boolean).join(" ")}
        class=${e7({
      "dp-day": true,
      "dp-day--other": other,
      "dp-day--today": today,
      "dp-day--selected": selected,
      "dp-day--range-s": rangeS && !rangeE,
      "dp-day--range-e": rangeE,
      "dp-day--in-range": inRange,
      "dp-day--disabled": disabled,
      "dp-day--focused": focused
    })}
        ?disabled=${disabled}
        role="gridcell"
        aria-label=${date.toDateString()}
        aria-selected=${selected}
        aria-disabled=${disabled}
        tabindex=${focused ? "0" : "-1"}
        @click=${(e9) => this._selectDate(date, e9)}
        @mouseenter=${() => {
      this._hoveredDate = date;
    }}
        @mouseleave=${() => {
      this._hoveredDate = null;
    }}
      >${date.getDate()}</button>
    `;
  }
  // ── Month grid view ───────────────────────────────────────────────────────
  _renderMonthGrid() {
    const year = this._viewDate.getFullYear();
    const selM = this._firstSelectedDate()?.getMonth() ?? -1;
    const selY = this._firstSelectedDate()?.getFullYear() ?? -1;
    const todayM = (/* @__PURE__ */ new Date()).getMonth();
    const todayY = (/* @__PURE__ */ new Date()).getFullYear();
    return b2`
      <div class="dp-view-panel">
        <div part="header" class="dp-header">
          <button part="nav-btn" class="dp-nav-btn" type="button" aria-label="Previous year"
            @click=${this._prevYear.bind(this)}>‹</button>
          <button class="dp-year-label" type="button"
            @click=${() => {
      this._yearBase = Math.floor(year / 12) * 12;
      this._currentView = "year";
    }}
          >${year}</button>
          <button part="nav-btn" class="dp-nav-btn" type="button" aria-label="Next year"
            @click=${this._nextYear.bind(this)}>›</button>
        </div>

        <div class="dp-month-grid">
          ${MONTH_SHORT.map((name, i8) => b2`
            <button
              type="button"
              part=${["month-cell", i8 === selM && year === selY && "month-cell--selected"].filter(Boolean).join(" ")}
              class=${e7({
      "dp-month-cell": true,
      "dp-month-cell--selected": i8 === selM && year === selY,
      "dp-month-cell--today": i8 === todayM && year === todayY
    })}
              @click=${() => this._selectMonth(i8)}
            >${name}</button>
          `)}
        </div>
      </div>
    `;
  }
  // ── Year grid view (decade) ───────────────────────────────────────────────
  _renderYearGrid() {
    const base = this._yearBase;
    const years = Array.from({ length: 12 }, (_2, i8) => base + i8);
    const selYear = this._firstSelectedDate()?.getFullYear() ?? -1;
    const curYear = (/* @__PURE__ */ new Date()).getFullYear();
    return b2`
      <div class="dp-view-panel">
        <div part="header" class="dp-header">
          <button part="nav-btn" class="dp-nav-btn" type="button" aria-label="Previous decade"
            @click=${this._prevDecade.bind(this)}>‹</button>
          <span class="dp-decade-label">${base} – ${base + 11}</span>
          <button part="nav-btn" class="dp-nav-btn" type="button" aria-label="Next decade"
            @click=${this._nextDecade.bind(this)}>›</button>
        </div>

        <div class="dp-year-grid">
          ${years.map((y3) => b2`
            <button
              type="button"
              part=${["year-cell", y3 === selYear && "year-cell--selected"].filter(Boolean).join(" ")}
              class=${e7({
      "dp-year-cell": true,
      "dp-year-cell--selected": y3 === selYear,
      "dp-year-cell--today": y3 === curYear
    })}
              @click=${() => this._selectYear(y3)}
            >${y3}</button>
          `)}
        </div>
      </div>
    `;
  }
  // ── Time picker ───────────────────────────────────────────────────────────
  _renderTimePicker() {
    return b2`
      <div part="time-section" class="dp-time-section">
        ${this._renderSpinner("h", this._timeH, this.hourFormat === "12" ? 12 : 23)}
        <span class="dp-time-sep" aria-hidden="true">:</span>
        ${this._renderSpinner("m", this._timeM, 59)}
        ${this.showSeconds ? b2`
          <span class="dp-time-sep" aria-hidden="true">:</span>
          ${this._renderSpinner("s", this._timeS, 59)}
        ` : A}
        ${this.hourFormat === "12" ? b2`
          <button
            type="button"
            class="dp-ampm-btn"
            aria-label="Toggle AM/PM"
            @click=${this._toggleAmPm.bind(this)}
          >${this._ampm}</button>
        ` : A}
      </div>
    `;
  }
  _renderSpinner(field, val, max) {
    const label = field === "h" ? "Hours" : field === "m" ? "Minutes" : "Seconds";
    return b2`
      <div class="dp-spinner" role="group" aria-label=${label}>
        <button type="button" class="dp-spin-btn" aria-label="Increment ${label}"
          @click=${() => this._stepTime(field, 1)}>▲</button>
        <input
          type="text"
          class="dp-spin-input"
          inputmode="numeric"
          .value=${l3(String(val).padStart(2, "0"))}
          aria-label=${label}
          @change=${(e9) => this._setTimeField(field, e9.target.value)}
        />
        <button type="button" class="dp-spin-btn" aria-label="Decrement ${label}"
          @click=${() => this._stepTime(field, -1)}>▼</button>
      </div>
    `;
  }
  // ── Button bar ────────────────────────────────────────────────────────────
  _renderButtonBar() {
    return b2`
      <div part="button-bar" class="dp-button-bar">
        <button type="button" class="dp-bar-btn dp-bar-btn--today"
          @click=${this._goToday.bind(this)}>Today</button>
        <button type="button" class="dp-bar-btn dp-bar-btn--clear"
          @click=${this._clear.bind(this)}>Clear</button>
      </div>
    `;
  }
};
// ═══════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════
UwcDatepicker.styles = [styles_default5];
__decorateClass([
  n4({ attribute: false })
], UwcDatepicker.prototype, "value", 2);
__decorateClass([
  n4({ type: String, attribute: "selection-mode" })
], UwcDatepicker.prototype, "selectionMode", 2);
__decorateClass([
  n4({ type: String, attribute: "date-format" })
], UwcDatepicker.prototype, "dateFormat", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDatepicker.prototype, "minDate", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDatepicker.prototype, "maxDate", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDatepicker.prototype, "disabledDates", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDatepicker.prototype, "disabledDays", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-time" })
], UwcDatepicker.prototype, "showTime", 2);
__decorateClass([
  n4({ type: String, attribute: "hour-format" })
], UwcDatepicker.prototype, "hourFormat", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-seconds" })
], UwcDatepicker.prototype, "showSeconds", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-week" })
], UwcDatepicker.prototype, "showWeek", 2);
__decorateClass([
  n4({ type: Number, attribute: "number-of-months" })
], UwcDatepicker.prototype, "numberOfMonths", 2);
__decorateClass([
  n4({ type: Number, attribute: "first-day-of-week" })
], UwcDatepicker.prototype, "firstDayOfWeek", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDatepicker.prototype, "inline", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-button-bar" })
], UwcDatepicker.prototype, "showButtonBar", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-clear" })
], UwcDatepicker.prototype, "showClear", 2);
__decorateClass([
  n4({ type: String })
], UwcDatepicker.prototype, "placeholder", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDatepicker.prototype, "readonly", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDatepicker.prototype, "disabled", 2);
__decorateClass([
  n4({ type: String })
], UwcDatepicker.prototype, "view", 2);
__decorateClass([
  n4({ type: String })
], UwcDatepicker.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcDatepicker.prototype, "offset", 2);
__decorateClass([
  n4({ type: String, attribute: "trigger-id" })
], UwcDatepicker.prototype, "triggerId", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_viewDate", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_currentView", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_rangeStart", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_hoveredDate", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_inputValue", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_timeH", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_timeM", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_timeS", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_ampm", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_yearBase", 2);
__decorateClass([
  r5()
], UwcDatepicker.prototype, "_focusedDate", 2);
__decorateClass([
  e5("#trigger-input")
], UwcDatepicker.prototype, "_triggerInput", 2);
__decorateClass([
  e5("#panel")
], UwcDatepicker.prototype, "_panel", 2);

// src/datepicker/react.ts
var UwcDatepicker2 = createComponent5({
  tagName: "uwc-datepicker",
  elementClass: UwcDatepicker,
  react: React5,
  events: {
    onUwcDateSelect: "uwc-date-select",
    onUwcMonthChange: "uwc-month-change",
    onUwcClear: "uwc-clear",
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide",
    onUwcFocus: "uwc-focus",
    onUwcBlur: "uwc-blur"
  }
});

// src/dropdown/react.ts
import { createComponent as createComponent6 } from "@lit/react";
import React6 from "react";

// src/dropdown/styles.ts
var styles_default6 = [
  hostReset,
  floatingPanel(".panel", { durationVar: "--uwc-dd-duration", durationDefault: "140ms" }),
  placementOrigins,
  i`
    :host { display: inline-block; }

    /* ── Trigger ────────────────────────────────────────────────────────────── */
    .trigger {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      padding: ${space2} ${space3};
      font-family:   var(--uwc-font-family, inherit);
      font-size:     var(--uwc-dd-trigger-font-size, ${fontSizeSm});
      background:    var(--uwc-dd-trigger-bg,     ${surface});
      border:        var(--uwc-dd-trigger-border, 1px solid #d0cfc9);
      border-radius: var(--uwc-dd-trigger-radius, ${radiusLg});
      color:         var(--uwc-dd-trigger-color,  ${text});
      cursor:        pointer;
      text-align:    left;
      user-select:   none;
      min-width:     140px;
      transition:    border-color ${durationBase}, box-shadow ${durationBase};
    }
    .trigger:hover:not(:disabled) {
      border-color: color-mix(in oklab, var(--uwc-dd-trigger-border, #d0cfc9) 80%, #000);
    }
    .trigger:focus-visible {
      outline: none;
      border-color: var(--uwc-dd-trigger-focus-border, var(--uwc-color-primary, ${primary}));
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-dd-trigger-focus-border, var(--uwc-color-primary, ${primary})) 20%, transparent);
    }
    .trigger:disabled {
      background: var(--uwc-dd-trigger-disabled-bg, #f5f5f0);
      color:      var(--uwc-text-disabled, ${textDisabled});
      cursor:     not-allowed;
    }
    .trigger--open {
      border-color: var(--uwc-dd-trigger-focus-border, var(--uwc-color-primary, ${primary}));
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-dd-trigger-focus-border, var(--uwc-color-primary, ${primary})) 20%, transparent);
    }

    .trigger-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .trigger-label.is-placeholder { color: var(--uwc-dd-trigger-placeholder, ${textMuted}); }

    .trigger-actions { display: flex; align-items: center; gap: ${space1}; flex-shrink: 0; }

    /* ── Caret ──────────────────────────────────────────────────────────────── */
    .caret { color: ${textMuted}; transition: transform 160ms ease; }
    .caret--open { transform: rotate(180deg); }

    /* ── Clear button ───────────────────────────────────────────────────────── */
    .clear-btn {
      font-size: ${fontSizeXs};
      color: ${textMuted};
      cursor: pointer;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: ${radiusFull};
      transition: background ${durationFast}, color ${durationFast};
    }
    .clear-btn:hover { background: ${hoverBg}; color: ${text}; }

    /* ── Loading spinner ────────────────────────────────────────────────────── */
    .loading-icon {
      display: block;
      width: 14px;
      height: 14px;
      border: 2px solid #ddd;
      border-top-color: var(--uwc-color-primary, ${primary});
      border-radius: ${radiusFull};
      animation: dd-spin 600ms linear infinite;
    }
    @keyframes dd-spin { to { transform: rotate(360deg); } }

    /* ── Chips (multi-select) ───────────────────────────────────────────────── */
    .chips-wrapper { display: flex; flex-wrap: wrap; gap: ${space1}; flex: 1; min-width: 0; }
    .chip {
      display: inline-flex;
      align-items: center;
      gap: ${space1};
      padding: 2px 6px 2px 8px;
      background:    var(--uwc-dd-chip-bg,    #ebe8e1);
      color:         var(--uwc-dd-chip-color, #444);
      border-radius: var(--uwc-radius-sm, ${radiusSm});
      font-size:     ${fontSizeXs};
    }
    .chip--overflow { background: ${borderSubtle}; color: ${textSecondary}; padding: 2px 8px; }

    .chip-remove {
      font-size: ${fontSizeSm};
      line-height: 1;
      background: none;
      border: none;
      cursor: pointer;
      color: ${textMuted};
      padding: 0 2px;
      transition: color ${durationFast};
    }
    .chip-remove:hover { color: ${text}; }

    /* ── Floating panel (visual) ────────────────────────────────────────────── */
    .panel {
      background:    var(--uwc-dd-panel-bg,     ${surface});
      border:        var(--uwc-dd-panel-border, 1px solid ${border});
      border-radius: var(--uwc-dd-panel-radius, ${radiusLg});
      box-shadow:    var(--uwc-dd-panel-shadow, ${shadowLg});
      z-index:       var(--uwc-dd-z,            ${zFloat});
      min-width:     160px;
      overflow:      hidden;
    }

    /* ── Filter input ───────────────────────────────────────────────────────── */
    .filter-wrapper {
      display: flex;
      align-items: center;
      gap: ${space2};
      padding: ${space2} ${space3};
      border-bottom: 1px solid ${borderSubtle};
    }
    .filter-icon  { color: ${textDisabled}; flex-shrink: 0; }
    .filter-input {
      flex: 1;
      border: none;
      outline: none;
      font-family: var(--uwc-font-family, inherit);
      font-size:   ${fontSizeXs};
      color:       ${text};
      background:  transparent;
    }
    .filter-input::placeholder { color: ${textDisabled}; }

    /* ── Options list ───────────────────────────────────────────────────────── */
    .options-wrapper { overflow-y: auto; max-height: var(--uwc-dd-max-height, 220px); }
    .options-list    { list-style: none; margin: 0; padding: ${space1} 0; }

    /* ── Group header ───────────────────────────────────────────────────────── */
    .group-header {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: ${space2} 13px 4px;
      font-size:      ${fontSizeXs};
      font-weight:    ${fontWeightBold};
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color:          var(--uwc-dd-group-color, ${textMuted});
      cursor:         default;
    }

    /* ── Option ─────────────────────────────────────────────────────────────── */
    .option {
      display: flex;
      align-items: center;
      gap: 9px;
      padding: ${space2} 13px;
      font-size:  ${fontSizeSm};
      color:      ${text};
      cursor:     pointer;
      list-style: none;
      transition: background ${durationFast};
    }
    .option:hover,
    .option--highlighted { background: var(--uwc-dd-option-hover-bg, ${hoverBg}); }
    .option--selected {
      background:  var(--uwc-dd-option-selected-bg,    rgba(99,102,241,0.08));
      color:       var(--uwc-dd-option-selected-color, var(--uwc-color-primary, ${primary}));
      font-weight: ${fontWeightMedium};
    }
    .option--selected.option--highlighted {
      background: color-mix(in oklab, var(--uwc-color-primary, ${primary}) 15%, transparent);
    }
    .option--disabled { color: var(--uwc-dd-option-disabled-color, ${textDisabled}); cursor: not-allowed; }
    .option--disabled:hover { background: transparent; }

    .opt-icon  { width: 18px; text-align: center; flex-shrink: 0; }
    .opt-label { flex: 1; }
    .opt-badge {
      font-size: ${fontSizeXs};
      padding: 1px 6px;
      border-radius: ${radiusFull};
      background: ${borderSubtle};
      color: ${textSecondary};
    }
    .opt-check { color: var(--uwc-color-primary, ${primary}); margin-left: auto; }

    /* ── Empty state ────────────────────────────────────────────────────────── */
    .empty { padding: 20px ${space4}; text-align: center; font-size: ${fontSizeXs}; color: ${textDisabled}; }
  `
];

// src/dropdown/index.ts
var UwcDropdown = class extends i4 {
  constructor() {
    super(...arguments);
    this.options = [];
    this.value = null;
    this.placement = "bottom-start";
    this.offset = 4;
    this.placeholder = "Select\u2026";
    this.multiple = false;
    this.filter = false;
    this.filterPlaceholder = "Search\u2026";
    this.showClear = false;
    this.loading = false;
    this.disabled = false;
    this.scrollHeight = 220;
    this.autoDisplayFirst = false;
    this.emptyMessage = "No results found.";
    this.maxSelectedLabels = 3;
    this._filterQuery = "";
    this._highlightIdx = -1;
    this._focusWithin = false;
    this._onDropdownKeydown = this._handleDropdownKeydown.bind(this);
    // ── Controller ───────────────────────────────────────────────────
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      // Dropdown renders its own trigger; setTriggerElement() called from firstUpdated
      onTriggerFound: (el) => {
        const onClick = (e9) => {
          e9.stopPropagation();
          this._pc.toggle();
        };
        const onKeydown = (e9) => {
          if ((e9.key === "ArrowDown" || e9.key === "Enter" || e9.key === " ") && !this._pc.open) {
            e9.preventDefault();
            this._pc.show();
          }
        };
        el.setAttribute("aria-haspopup", "listbox");
        el.addEventListener("click", onClick);
        el.addEventListener("keydown", onKeydown);
        return () => {
          el.removeEventListener("click", onClick);
          el.removeEventListener("keydown", onKeydown);
          el.removeAttribute("aria-haspopup");
        };
      },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      afterShow: () => {
        this._filterQuery = "";
        this._highlightIdx = this._indexOfSelectedValue();
        document.addEventListener("keydown", this._onDropdownKeydown);
        emit(this, "uwc-show");
        requestAnimationFrame(() => {
          if (this.filter) this._filterInput?.focus();
          this._scrollToHighlighted();
        });
      },
      afterHide: () => {
        document.removeEventListener("keydown", this._onDropdownKeydown);
        this._highlightIdx = -1;
        emit(this, "uwc-hide");
        this._triggerBtn?.focus();
      }
    });
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  firstUpdated() {
    this._pc.setTriggerElement(this._triggerBtn);
    if (this.autoDisplayFirst && !this._hasValue() && this.options.length) {
      const first = this.options.find((o10) => !o10.group && !o10.disabled);
      if (first) this._selectOption(first, void 0, { silent: true });
    }
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(changed, null, null);
    if (changed.has("_highlightIdx")) {
      this._scrollToHighlighted();
    }
  }
  // ── Value helpers ────────────────────────────────────────────────
  _hasValue() {
    if (this.multiple) return Array.isArray(this.value) && this.value.length > 0;
    return this.value !== null && this.value !== void 0;
  }
  _isSelected(opt) {
    if (this.multiple) {
      return Array.isArray(this.value) && this.value.includes(opt.value);
    }
    return this.value === opt.value;
  }
  _indexOfSelectedValue() {
    if (!this._hasValue()) return -1;
    const visible = this._filteredOptions();
    if (this.multiple) return 0;
    return visible.findIndex((o10) => !o10.group && o10.value === this.value);
  }
  // ── Options helpers ──────────────────────────────────────────────
  _filteredOptions() {
    if (!this._filterQuery) return this.options;
    const q = this._filterQuery.toLowerCase();
    return this.options.filter(
      (o10) => o10.group !== void 0 || o10.label.toLowerCase().includes(q)
    );
  }
  _selectableOptions() {
    return this._filteredOptions().filter((o10) => !o10.group && !o10.disabled);
  }
  _labelForValue(val) {
    return this.options.find((o10) => o10.value === val)?.label ?? String(val);
  }
  _triggerLabel() {
    if (!this._hasValue()) return "";
    if (this.multiple) {
      const selected = this.value.map((v3) => this._labelForValue(v3));
      if (selected.length <= this.maxSelectedLabels) return selected.join(", ");
      return `${selected.length} items selected`;
    }
    return this._labelForValue(this.value);
  }
  // ── Selection ────────────────────────────────────────────────────
  _selectOption(opt, e9, { silent = false } = {}) {
    if (opt.disabled || opt.group) return;
    let newValue;
    if (this.multiple) {
      const current = Array.isArray(this.value) ? [...this.value] : [];
      const idx = current.indexOf(opt.value);
      if (idx >= 0) current.splice(idx, 1);
      else current.push(opt.value);
      newValue = current;
    } else {
      newValue = opt.value;
      this._pc.hide();
    }
    this.value = newValue;
    if (!silent) {
      emit(this, "uwc-change", {
        value: newValue,
        label: opt.label,
        originalEvent: e9
      });
    }
    this.requestUpdate();
  }
  _removeChip(val, e9) {
    e9.stopPropagation();
    if (!this.multiple || !Array.isArray(this.value)) return;
    const prev = this.value;
    this.value = prev.filter((v3) => v3 !== val);
    emit(this, "uwc-change", {
      value: this.value,
      label: this._labelForValue(val)
    });
  }
  _clear(e9) {
    e9.stopPropagation();
    const prev = this.value;
    this.value = this.multiple ? [] : null;
    emit(this, "uwc-clear", { previousValue: prev });
    emit(this, "uwc-change", {
      value: this.value,
      label: ""
    });
  }
  // ── Filter ───────────────────────────────────────────────────────
  _handleFilterInput(e9) {
    this._filterQuery = e9.target.value;
    this._highlightIdx = 0;
    emit(this, "uwc-filter", { query: this._filterQuery, originalEvent: e9 });
  }
  // ── Keyboard navigation ──────────────────────────────────────────
  _handleDropdownKeydown(e9) {
    const opts = this._selectableOptions();
    if (!opts.length) return;
    switch (e9.key) {
      case "ArrowDown":
        e9.preventDefault();
        this._highlightIdx = (this._highlightIdx + 1) % opts.length;
        break;
      case "ArrowUp":
        e9.preventDefault();
        this._highlightIdx = (this._highlightIdx - 1 + opts.length) % opts.length;
        break;
      case "Home":
        e9.preventDefault();
        this._highlightIdx = 0;
        break;
      case "End":
        e9.preventDefault();
        this._highlightIdx = opts.length - 1;
        break;
      case "Enter":
      case " ":
        if (e9.key === " " && this.filter) break;
        e9.preventDefault();
        if (this._highlightIdx >= 0 && opts[this._highlightIdx]) {
          this._selectOption(opts[this._highlightIdx], e9);
        }
        break;
      case "Tab":
        this._pc.hide();
        break;
    }
  }
  _scrollToHighlighted() {
    requestAnimationFrame(() => {
      const list = this._optionsList;
      const item = list?.querySelector('[data-highlighted="true"]');
      item?.scrollIntoView({ block: "nearest" });
    });
  }
  // ── Render helpers ────────────────────────────────────────────────
  _renderChips() {
    if (!this.multiple || !Array.isArray(this.value)) return b2``;
    const selected = this.value;
    const visible = selected.slice(0, this.maxSelectedLabels);
    const overflow = selected.length - visible.length;
    return b2`
      <div class="chips-wrapper">
        ${visible.map((val) => b2`
          <span part="chip" class="chip">
            <span class="chip-label">${this._labelForValue(val)}</span>
            <button
              type="button"
              class="chip-remove"
              aria-label="Remove ${this._labelForValue(val)}"
              tabindex="-1"
              @click=${(e9) => this._removeChip(val, e9)}
            >×</button>
          </span>`)}
        ${overflow > 0 ? b2`<span class="chip chip--overflow">+${overflow}</span>` : A}
      </div>`;
  }
  _renderOptions() {
    const filtered = this._filteredOptions();
    const selectable = this._selectableOptions();
    if (!filtered.length) {
      return b2`<div part="empty" class="empty">${this.emptyMessage}</div>`;
    }
    return b2`
      <ul
        id="options-list"
        role="listbox"
        aria-multiselectable=${this.multiple}
        class="options-list"
      >
        ${c4(
      filtered,
      (opt) => String(opt.value ?? opt.group ?? opt.label),
      (opt) => {
        if (opt.group !== void 0) {
          return b2`
                <li part="group-header" class="group-header" role="presentation">
                  ${opt.icon ? b2`<span class="opt-icon">${opt.icon}</span>` : A}
                  <span>${opt.group || opt.label}</span>
                </li>`;
        }
        const selIdx = selectable.indexOf(opt);
        const isHighlit = selIdx === this._highlightIdx;
        const isSelected = this._isSelected(opt);
        return b2`
              <li
                part="option"
                role="option"
                id="opt-${String(opt.value)}"
                aria-selected=${isSelected}
                aria-disabled=${opt.disabled ?? false}
                data-highlighted=${isHighlit}
                class=${e7({
          "option": true,
          "option--selected": isSelected,
          "option--highlighted": isHighlit,
          "option--disabled": !!opt.disabled
        })}
                title=${opt.title ?? ""}
                @click=${(e9) => {
          if (!opt.disabled) this._selectOption(opt, e9);
        }}
                @mouseenter=${() => {
          if (!opt.disabled) this._highlightIdx = selIdx;
        }}
              >
                ${opt.icon ? b2`<span class="opt-icon">${opt.icon}</span>` : A}
                <span class="opt-label">${opt.label}</span>
                ${opt.badge ? b2`<span class="opt-badge">${opt.badge}</span>` : A}
                ${isSelected ? b2`<span class="opt-check" aria-hidden="true">✓</span>` : A}
              </li>`;
      }
    )}
      </ul>`;
  }
  // ── Render ───────────────────────────────────────────────────────
  render() {
    const open = this._pc.open;
    const hasValue = this._hasValue();
    const label = this._triggerLabel();
    const showClearBtn = this.showClear && hasValue && !this.disabled && !this.loading;
    return b2`
      <button
        id="trigger-btn"
        part="trigger"
        type="button"
        class=${e7({
      "trigger": true,
      "trigger--open": open,
      "trigger--loading": this.loading,
      "trigger--empty": !hasValue
    })}
        ?disabled=${this.disabled || this.loading}
        aria-expanded=${open}
        aria-controls="panel"
        aria-label=${label || this.placeholder}
        @focus=${() => {
      this._focusWithin = true;
      emit(this, "uwc-focus");
    }}
        @blur=${() => {
      this._focusWithin = false;
      emit(this, "uwc-blur");
    }}
      >
        ${this.multiple && hasValue ? this._renderChips() : b2`<span part="label" class="trigger-label ${!hasValue ? "is-placeholder" : ""}">
                   ${hasValue ? label : this.placeholder}
                 </span>`}

        <span class="trigger-actions">
          ${showClearBtn ? b2`
            <span
              part="clear-btn"
              class="clear-btn"
              role="button"
              tabindex="-1"
              aria-label="Clear"
              @click=${this._clear}
            >✕</span>` : A}

          ${this.loading ? b2`<span part="loading-icon" class="loading-icon" aria-hidden="true"></span>` : b2`<svg
                part="caret"
                class="caret ${open ? "caret--open" : ""}"
                width="12" height="12" viewBox="0 0 12 12" fill="none"
                aria-hidden="true">
                <path d="M2 4l4 4 4-4"
                  stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"/>
              </svg>`}
        </span>
      </button>

      <div
        id="panel"
        part="panel"
        popover="manual"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
        style="--scroll-height: ${this.scrollHeight}"
        aria-label="Options"
      >
        ${this.filter ? b2`
          <div class="filter-wrapper">
            <span class="filter-icon" aria-hidden="true">🔍</span>
            <input
              id="filter-input"
              part="filter-input"
              type="text"
              class="filter-input"
              placeholder=${this.filterPlaceholder}
              .value=${l3(this._filterQuery)}
              autocomplete="off"
              @input=${this._handleFilterInput}
              @keydown=${(e9) => {
      if (["ArrowUp", "ArrowDown"].includes(e9.key)) e9.preventDefault();
    }}
            />
          </div>` : A}

        <div class="options-wrapper">
          ${this._renderOptions()}
        </div>
      </div>`;
  }
};
UwcDropdown.styles = [styles_default6];
__decorateClass([
  n4({ type: Array })
], UwcDropdown.prototype, "options", 2);
__decorateClass([
  n4({ attribute: false })
], UwcDropdown.prototype, "value", 2);
__decorateClass([
  n4({ type: String })
], UwcDropdown.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcDropdown.prototype, "offset", 2);
__decorateClass([
  n4({ type: String })
], UwcDropdown.prototype, "placeholder", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDropdown.prototype, "multiple", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcDropdown.prototype, "filter", 2);
__decorateClass([
  n4({ type: String, attribute: "filter-placeholder" })
], UwcDropdown.prototype, "filterPlaceholder", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-clear" })
], UwcDropdown.prototype, "showClear", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDropdown.prototype, "loading", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcDropdown.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Number, attribute: "scroll-height" })
], UwcDropdown.prototype, "scrollHeight", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "auto-display-first" })
], UwcDropdown.prototype, "autoDisplayFirst", 2);
__decorateClass([
  n4({ type: String, attribute: "empty-message" })
], UwcDropdown.prototype, "emptyMessage", 2);
__decorateClass([
  n4({ type: Number, attribute: "max-selected-labels" })
], UwcDropdown.prototype, "maxSelectedLabels", 2);
__decorateClass([
  r5()
], UwcDropdown.prototype, "_filterQuery", 2);
__decorateClass([
  r5()
], UwcDropdown.prototype, "_highlightIdx", 2);
__decorateClass([
  r5()
], UwcDropdown.prototype, "_focusWithin", 2);
__decorateClass([
  e5("#trigger-btn")
], UwcDropdown.prototype, "_triggerBtn", 2);
__decorateClass([
  e5("#filter-input")
], UwcDropdown.prototype, "_filterInput", 2);
__decorateClass([
  e5("#panel")
], UwcDropdown.prototype, "_panel", 2);
__decorateClass([
  e5("#options-list")
], UwcDropdown.prototype, "_optionsList", 2);

// src/dropdown/react.ts
var UwcDropdown2 = createComponent6({
  tagName: "uwc-dropdown",
  elementClass: UwcDropdown,
  react: React6,
  events: {
    onUwcChange: "uwc-change",
    onUwcFilter: "uwc-filter",
    onUwcClear: "uwc-clear",
    onUwcFocus: "uwc-focus",
    onUwcBlur: "uwc-blur",
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide"
  }
});

// src/icon/react.ts
import { createComponent as createComponent7 } from "@lit/react";
import React7 from "react";

// node_modules/lit-html/directives/unsafe-html.js
var e8 = class extends i5 {
  constructor(i8) {
    if (super(i8), this.it = A, i8.type !== t3.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r7) {
    if (r7 === A || null == r7) return this._t = void 0, this.it = r7;
    if (r7 === E) return r7;
    if ("string" != typeof r7) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r7 === this.it) return this._t;
    this.it = r7;
    const s5 = [r7];
    return s5.raw = s5, this._t = { _$litType$: this.constructor.resultType, strings: s5, values: [] };
  }
};
e8.directiveName = "unsafeHTML", e8.resultType = 1;
var o8 = e6(e8);

// node_modules/lit-html/directives/unsafe-svg.js
var t5 = class extends e8 {
};
t5.directiveName = "unsafeSVG", t5.resultType = 2;
var o9 = e6(t5);

// src/icon/library.ts
var registry = /* @__PURE__ */ new Map();
var localRegistry = /* @__PURE__ */ new Map();
var CRITICAL_ICONS = {
  // Angle icons
  "angle-up": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg>',
  "angle-down": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>',
  "angle-left": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>',
  "angle-right": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>',
  // Caret icons
  "caret-up-fill": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/></svg>',
  "caret-down-fill": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m7.247 11.14 2.451-5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>',
  "caret-left-fill": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>',
  "caret-right-fill": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>',
  // Loading/Spinner icons
  "arrow-clockwise": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
  "spinner": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/></svg>',
  // Material Design Icons (critical ones)
  "check": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>',
  "close": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
  "menu": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
  "search": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
  "arrow-back": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
  "arrow-forward": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
  "add": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
  "remove": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>',
  "more-vert": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
  "more-horiz": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>',
  "check-circle": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  "error": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>',
  "info": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>',
  "warning": '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>'
};
Object.entries(CRITICAL_ICONS).forEach(([name, svg]) => {
  localRegistry.set(name, svg);
});
registry.set(
  "default",
  (name) => `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/icons/${name}.svg`
);
function getResolver(name) {
  return registry.get(name);
}
function getLocalIcon(name) {
  return localRegistry.get(name);
}
function hasLocalIcon(name) {
  return localRegistry.has(name);
}

// src/icon/index.ts
var UwcIcon = class extends i4 {
  constructor() {
    super(...arguments);
    this.name = "";
    this.library = "default";
    this.size = "18px";
    this.color = "currentColor";
    this.spin = false;
    this.svgContent = "";
    this.isLocalIcon = false;
  }
  updated(changedProperties) {
    if (changedProperties.has("name") || changedProperties.has("library") || changedProperties.has("src")) {
      this.loadIcon();
    }
  }
  async loadIcon() {
    if (this.src) {
      await this.fetchRemoteIcon(this.src);
      return;
    }
    if (hasLocalIcon(this.name)) {
      this.loadLocalIcon();
      return;
    }
    const url = this.resolveUrl();
    if (url) {
      await this.fetchRemoteIcon(url);
    } else {
      this.svgContent = "";
    }
  }
  loadLocalIcon() {
    const localSvg = getLocalIcon(this.name);
    if (localSvg) {
      this.isLocalIcon = true;
      this.svgContent = this.cleanSvg(localSvg);
      this.dispatchEvent(new CustomEvent("uwc-load", {
        detail: { source: "local-registry" }
      }));
    }
  }
  async fetchRemoteIcon(url) {
    try {
      const response = await fetch(url, { mode: "cors" });
      if (response.ok) {
        const rawSvg = await response.text();
        this.isLocalIcon = false;
        this.svgContent = this.cleanSvg(rawSvg);
        this.dispatchEvent(new CustomEvent("uwc-load", {
          detail: { source: "remote" }
        }));
      } else {
        throw new Error(`Failed to fetch icon: ${response.status}`);
      }
    } catch (err) {
      this.svgContent = "";
      this.dispatchEvent(new CustomEvent("uwc-error", {
        detail: { err, iconName: this.name }
      }));
    }
  }
  cleanSvg(rawSvg) {
    return rawSvg.replace(/<svg([^>]*)>/, (match, attrs) => {
      const cleanedAttrs = attrs.replace(/\b(width|height|fill)\b="[^"]*"/g, "").trim();
      return `<svg ${cleanedAttrs}>`;
    });
  }
  resolveUrl() {
    const resolver = getResolver(this.library);
    return resolver ? resolver(this.name) : "";
  }
  render() {
    const containerStyles = {
      "--icon-size": this.size,
      "--icon-color": this.color
    };
    const shouldSpin = this.spin || this.name === "loading" || this.name === "spinner";
    const containerClass = shouldSpin ? "icon-container spin" : "icon-container";
    return b2`
      <div 
        class="${containerClass}" 
        style=${o7(containerStyles)}
        role="img"
        aria-hidden="true"
        data-source="${this.isLocalIcon ? "local" : "remote"}"
      >
        ${o9(this.svgContent)}
      </div>
    `;
  }
};
UwcIcon.styles = i`
    :host {
      display: inline-flex;
      vertical-align: middle;
      justify-content: center;
      align-items: center;
    }

    /* This ensures the injected SVG obeys the host's size and color */
    .icon-container, 
    .icon-container svg {
      display: block;
      width: var(--icon-size);
      height: var(--icon-size);
      fill: var(--icon-color);
    }

    /* Spin animation for loading icons */
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .icon-container.spin svg {
      animation: spin 1s linear infinite;
    }
  `;
__decorateClass([
  n4({ reflect: true })
], UwcIcon.prototype, "name", 2);
__decorateClass([
  n4({ reflect: true })
], UwcIcon.prototype, "library", 2);
__decorateClass([
  n4({ reflect: true })
], UwcIcon.prototype, "size", 2);
__decorateClass([
  n4({ reflect: true })
], UwcIcon.prototype, "color", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcIcon.prototype, "spin", 2);
__decorateClass([
  n4()
], UwcIcon.prototype, "src", 2);
__decorateClass([
  r5()
], UwcIcon.prototype, "svgContent", 2);
__decorateClass([
  r5()
], UwcIcon.prototype, "isLocalIcon", 2);

// src/icon/react.ts
var UwcIcon2 = createComponent7({
  tagName: "uwc-icon",
  elementClass: UwcIcon,
  react: React7,
  events: {}
});

// src/inputtext/react.ts
import { createComponent as createComponent8 } from "@lit/react";
import React8 from "react";

// src/inputtext/styles.ts
var styles_default7 = [
  hostReset,
  i`
    :host {
      display: inline-block;
      vertical-align: middle;
    }
    :host([fluid]) { display: block; width: 100%; }

    /* ── Wrapper ────────────────────────────────────────────────────────────── */
    .uwc-input {
      --_bg:        var(--uwc-input-bg,                ${surface});
      --_border:    var(--uwc-input-border,            1px solid #d1d5db);
      --_radius:    var(--uwc-input-radius,            ${radiusMd});
      --_color:     var(--uwc-input-color,             ${text});
      --_ph-color:  var(--uwc-input-placeholder-color, ${textMuted});
      --_font-size: var(--uwc-input-font-size,         ${fontSizeMd});
      --_px:        var(--uwc-input-padding-x,         0.75rem);
      --_py:        var(--uwc-input-padding-y,         0.5rem);
      --_icon-gap:  0.5rem;

      display: flex;
      align-items: center;
      width: 100%;
      background:    var(--_bg);
      border:        var(--_border);
      border-radius: var(--_radius);
      overflow: hidden;
      transition: border-color ${durationBase}, box-shadow ${durationBase};
    }

    .uwc-input:focus-within {
      border-color: var(--uwc-color-primary, ${primary});
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-color-primary, ${primary}) 20%, transparent);
    }

    /* ── Variants ───────────────────────────────────────────────────────────── */
    .uwc-input--filled {
      --_bg: var(--uwc-input-filled-bg, ${surfaceRaised});
      border-color: transparent;
    }
    .uwc-input--filled:focus-within {
      --_bg: var(--uwc-input-bg, ${surface});
      border-color: var(--uwc-color-primary, ${primary});
    }

    /* ── Invalid ────────────────────────────────────────────────────────────── */
    .uwc-input--invalid {
      border-color: var(--uwc-color-danger, ${danger}) !important;
    }
    .uwc-input--invalid:focus-within {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--uwc-color-danger, ${danger}) 20%, transparent);
    }

    /* ── Sizes ──────────────────────────────────────────────────────────────── */
    .uwc-input--small { --_font-size: ${fontSizeXs}; --_px: 0.5rem;  --_py: 0.3125rem; }
    .uwc-input--large { --_font-size: ${fontSizeLg}; --_px: 1rem;    --_py: 0.6875rem; }

    /* ── Disabled ───────────────────────────────────────────────────────────── */
    .uwc-input--disabled { pointer-events: none; opacity: 0.6; }

    /* ── Native input ───────────────────────────────────────────────────────── */
    input {
      flex: 1;
      min-width: 0;
      padding-inline: var(--_px);
      padding-block:  var(--_py);
      font-family: var(--uwc-font-family, inherit);
      font-size:   var(--_font-size);
      color:       var(--_color);
      background:  transparent;
      border:      none;
      outline:     none;
    }
    input::placeholder { color: var(--_ph-color); }
    input:disabled      { cursor: not-allowed; }

    /* ── Icon slots ─────────────────────────────────────────────────────────── */
    .uwc-input__prefix,
    .uwc-input__suffix {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: var(--_ph-color);
    }
    .uwc-input__prefix { padding-inline-start: var(--_px); }
    .uwc-input__suffix { padding-inline-end:   var(--_px); }

    /* Shrink native input padding when slot is present */
    :host([has-prefix]) input { padding-inline-start: var(--_icon-gap); }
    :host([has-suffix]) input { padding-inline-end:   var(--_icon-gap); }
  `
];

// src/inputtext/index.ts
var UwcInputText = class extends i4 {
  constructor() {
    super(...arguments);
    this.value = "";
    this.type = "text";
    this.variant = "outlined";
    this.size = "medium";
    this.disabled = false;
    this.readonly = false;
    this.invalid = false;
    this.fluid = false;
    this._hasPrefix = false;
    this._hasSuffix = false;
  }
  // ── Lifecycle ─────────────────────────────────────────────────────
  firstUpdated() {
    this._detectSlots();
  }
  _detectSlots() {
    this._hasPrefix = this.querySelector('[slot="prefix"]') !== null;
    this._hasSuffix = this.querySelector('[slot="suffix"]') !== null;
    if (this._hasPrefix) this.setAttribute("has-prefix", "");
    else this.removeAttribute("has-prefix");
    if (this._hasSuffix) this.setAttribute("has-suffix", "");
    else this.removeAttribute("has-suffix");
  }
  // ── Handlers ─────────────────────────────────────────────────────
  _onInput(e9) {
    const input = e9.target;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent("uwc-input", {
      bubbles: true,
      composed: true,
      detail: { value: this.value, originalEvent: e9 }
    }));
  }
  _onChange(e9) {
    const input = e9.target;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value, originalEvent: e9 }
    }));
  }
  // ── Render ────────────────────────────────────────────────────────
  render() {
    const classes = e7({
      "uwc-input": true,
      [`uwc-input--${this.variant}`]: true,
      [`uwc-input--${this.size}`]: this.size !== "medium",
      "uwc-input--invalid": this.invalid,
      "uwc-input--disabled": this.disabled
    });
    return b2`
      <div part="wrapper" class=${classes}>
        ${this._hasPrefix ? b2`<span class="uwc-input__prefix"><slot name="prefix"></slot></span>` : A}
        <input
          part="input"
          type=${this.type}
          .value=${this.value}
          placeholder=${o6(this.placeholder)}
          name=${o6(this.name)}
          autocomplete=${o6(this.autocomplete)}
          maxlength=${o6(this.maxlength)}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          @input=${this._onInput}
          @change=${this._onChange}
          @focus=${() => this.dispatchEvent(new CustomEvent("uwc-focus", { bubbles: true, composed: true }))}
          @blur=${() => this.dispatchEvent(new CustomEvent("uwc-blur", { bubbles: true, composed: true }))}
        />
        ${this._hasSuffix ? b2`<span class="uwc-input__suffix"><slot name="suffix"></slot></span>` : A}
      </div>
    `;
  }
};
UwcInputText.styles = [styles_default7];
__decorateClass([
  n4()
], UwcInputText.prototype, "value", 2);
__decorateClass([
  n4()
], UwcInputText.prototype, "placeholder", 2);
__decorateClass([
  n4()
], UwcInputText.prototype, "type", 2);
__decorateClass([
  n4()
], UwcInputText.prototype, "name", 2);
__decorateClass([
  n4()
], UwcInputText.prototype, "autocomplete", 2);
__decorateClass([
  n4({ type: Number })
], UwcInputText.prototype, "maxlength", 2);
__decorateClass([
  n4({ reflect: true })
], UwcInputText.prototype, "variant", 2);
__decorateClass([
  n4({ reflect: true })
], UwcInputText.prototype, "size", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcInputText.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcInputText.prototype, "readonly", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcInputText.prototype, "invalid", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcInputText.prototype, "fluid", 2);
__decorateClass([
  r5()
], UwcInputText.prototype, "_hasPrefix", 2);
__decorateClass([
  r5()
], UwcInputText.prototype, "_hasSuffix", 2);

// src/inputtext/react.ts
var UwcInputText2 = createComponent8({
  tagName: "uwc-inputtext",
  elementClass: UwcInputText,
  react: React8,
  events: {
    onUwcInput: "uwc-input",
    onUwcChange: "uwc-change",
    onUwcFocus: "uwc-focus",
    onUwcBlur: "uwc-blur"
  }
});

// src/listbox/react.ts
import { createComponent as createComponent9 } from "@lit/react";
import React9 from "react";

// src/listbox/styles.ts
var styles_default8 = [
  hostReset,
  i`
    :host {
      display: inline-block;
      vertical-align: top;
    }
    :host([fluid]) { display: block; width: 100%; }

    /* ── Container ──────────────────────────────────────────────────────────── */
    .uwc-lb {
      --_radius:      var(--uwc-listbox-radius,     ${radiusMd});
      --_border:      var(--uwc-listbox-border,     1px solid #d1d5db);
      --_bg:          var(--uwc-listbox-bg,         ${surface});
      --_item-height: var(--uwc-listbox-item-height,2.5rem);
      --_font-size:   var(--uwc-listbox-font-size,  ${fontSizeMd});
      --_color:       var(--uwc-listbox-color,      var(--uwc-color-primary, ${primary}));

      display: flex;
      flex-direction: column;
      width: 100%;
      background:    var(--_bg);
      border:        var(--_border);
      border-radius: var(--_radius);
      overflow: hidden;
      font-size: var(--_font-size);
    }

    /* ── Filter ─────────────────────────────────────────────────────────────── */
    .uwc-lb__filter {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #e5e7eb;
      gap: 0.375rem;
    }
    .uwc-lb__filter-input {
      flex: 1;
      min-width: 0;
      padding: 0.375rem 0.5rem;
      font-size: var(--_font-size);
      font-family: inherit;
      color: ${text};
      background: transparent;
      border: 1px solid #d1d5db;
      border-radius: ${radiusSm};
      outline: none;
      transition: border-color ${durationBase}, box-shadow ${durationBase};
    }
    .uwc-lb__filter-input:focus {
      border-color: var(--_color);
      box-shadow: 0 0 0 2px color-mix(in oklab, var(--_color) 20%, transparent);
    }
    .uwc-lb__filter-icon {
      color: ${textMuted};
      flex-shrink: 0;
    }

    /* ── Header ─────────────────────────────────────────────────────────────── */
    .uwc-lb__header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid #e5e7eb;
      font-weight: ${fontWeightSemibold};
      font-size: ${fontSizeSm};
      color: ${textSecondary};
    }

    /* ── List ───────────────────────────────────────────────────────────────── */
    .uwc-lb__list {
      list-style: none;
      margin: 0;
      padding: 0.25rem 0;
      overflow-y: auto;
      max-height: var(--uwc-listbox-max-height, 14rem);
      outline: none;
    }

    /* ── Item ───────────────────────────────────────────────────────────────── */
    .uwc-lb__item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      min-height: var(--_item-height);
      padding: 0.375rem 0.75rem;
      cursor: pointer;
      transition: background-color ${durationFast};
      color: ${text};
    }
    .uwc-lb__item:hover          { background-color: ${hoverBg}; }
    .uwc-lb__item--selected      { background-color: ${selectedBg}; color: var(--_color); font-weight: ${fontWeightMedium}; }
    .uwc-lb__item--selected:hover{ background-color: color-mix(in oklab, ${selectedBg} 120%, transparent); }
    .uwc-lb__item--disabled      { pointer-events: none; opacity: 0.5; }
    .uwc-lb__item--focused       { background-color: ${hoverBg}; }

    /* Check icon for selected item */
    .uwc-lb__check {
      margin-inline-start: auto;
      flex-shrink: 0;
      display: none;
    }
    .uwc-lb__item--selected .uwc-lb__check { display: flex; }

    /* ── Group header ───────────────────────────────────────────────────────── */
    .uwc-lb__group-header {
      display: flex;
      align-items: center;
      padding: 0.375rem 0.75rem;
      font-size: ${fontSizeSm};
      font-weight: ${fontWeightSemibold};
      color: ${textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* ── Empty ──────────────────────────────────────────────────────────────── */
    .uwc-lb__empty {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      color: ${textMuted};
      font-size: ${fontSizeSm};
    }

    /* ── Disabled host ──────────────────────────────────────────────────────── */
    :host([disabled]) .uwc-lb {
      pointer-events: none;
      opacity: 0.6;
    }

    /* ── Invalid ────────────────────────────────────────────────────────────── */
    :host([invalid]) .uwc-lb {
      border-color: var(--uwc-color-danger, ${danger});
    }

    /* ── Multiple select checkboxes ─────────────────────────────────────────── */
    .uwc-lb__item-cb {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
      border: 1px solid #d1d5db;
      border-radius: ${radiusXs};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color ${durationBase}, border-color ${durationBase};
    }
    .uwc-lb__item--selected .uwc-lb__item-cb {
      background: var(--_color);
      border-color: var(--_color);
    }
  `
];

// src/listbox/index.ts
var UwcListbox = class extends i4 {
  constructor() {
    super(...arguments);
    this.options = [];
    this.value = null;
    this.multiple = false;
    this.filter = false;
    this.filterPlaceholder = "Search...";
    this.filterBy = "label";
    this.listStyleHeight = "";
    this.emptyMessage = "No results found";
    this.disabled = false;
    this.invalid = false;
    this.fluid = false;
    this._filterQuery = "";
    this._focusedIdx = -1;
  }
  // ── Computed ──────────────────────────────────────────────────────
  get _selectedValues() {
    if (!this.multiple) {
      return this.value != null ? [this.value] : [];
    }
    return Array.isArray(this.value) ? this.value : this.value != null ? [this.value] : [];
  }
  get _filteredOptions() {
    if (!this._filterQuery) return this.options;
    const q = this._filterQuery.toLowerCase();
    return this.options.filter((opt) => {
      if (opt.group) return true;
      const field = opt[this.filterBy];
      return String(field ?? opt.label ?? "").toLowerCase().includes(q);
    });
  }
  _isSelected(opt) {
    return this._selectedValues.some((v3) => JSON.stringify(v3) === JSON.stringify(opt.value));
  }
  // ── Handlers ──────────────────────────────────────────────────────
  _selectOption(opt, e9) {
    if (opt.disabled || opt.group) return;
    let newValue;
    if (this.multiple) {
      const vals = [...this._selectedValues];
      const idx = vals.findIndex((v3) => JSON.stringify(v3) === JSON.stringify(opt.value));
      if (idx >= 0) vals.splice(idx, 1);
      else vals.push(opt.value);
      newValue = vals;
    } else {
      newValue = this._isSelected(opt) ? null : opt.value;
    }
    this.value = newValue;
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { value: newValue, originalEvent: e9 }
    }));
  }
  _onFilter(e9) {
    this._filterQuery = e9.target.value;
    this.dispatchEvent(new CustomEvent("uwc-filter", {
      bubbles: true,
      composed: true,
      detail: { query: this._filterQuery, originalEvent: e9 }
    }));
  }
  _onKeydown(e9, opt) {
    if (e9.key === "Enter" || e9.key === " ") {
      e9.preventDefault();
      this._selectOption(opt, e9);
    }
  }
  // ── Render helpers ────────────────────────────────────────────────
  _renderCheckIcon() {
    return w`
      <svg width="10" height="10" viewBox="0 0 12 11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="1 5.5 4.5 9 11 1.5"/>
      </svg>`;
  }
  _renderItem(opt, idx) {
    if (opt.group) {
      return b2`<li class="uwc-lb__group-header" role="presentation">${opt.group}</li>`;
    }
    const selected = this._isSelected(opt);
    const classes = e7({
      "uwc-lb__item": true,
      "uwc-lb__item--selected": selected,
      "uwc-lb__item--disabled": !!opt.disabled,
      "uwc-lb__item--focused": this._focusedIdx === idx
    });
    return b2`
      <li
        class=${classes}
        role="option"
        aria-selected=${selected}
        tabindex=${opt.disabled ? A : "0"}
        @click=${(e9) => this._selectOption(opt, e9)}
        @keydown=${(e9) => this._onKeydown(e9, opt)}
      >
        ${this.multiple ? b2`<span class="uwc-lb__item-cb">${selected ? this._renderCheckIcon() : A}</span>` : A}
        ${opt.icon ? b2`<uwc-icon name=${opt.icon} size="15px"></uwc-icon>` : A}
        <span class="uwc-lb__item-label">${opt.label}</span>
        ${opt.badge ? b2`<span style="margin-inline-start:auto;font-size:0.7em;opacity:0.7">${opt.badge}</span>` : A}
        ${!this.multiple && selected ? b2`<span class="uwc-lb__check">${this._renderCheckIcon()}</span>` : A}
      </li>
    `;
  }
  // ── Render ────────────────────────────────────────────────────────
  render() {
    const filtered = this._filteredOptions;
    const listStyle = this.listStyleHeight ? `max-height:${this.listStyleHeight}` : "";
    return b2`
      <div part="container" class="uwc-lb">
        ${this.filter ? b2`
          <div class="uwc-lb__filter">
            <uwc-icon class="uwc-lb__filter-icon" name="search" size="14px"></uwc-icon>
            <input
              class="uwc-lb__filter-input"
              type="text"
              .value=${this._filterQuery}
              placeholder=${this.filterPlaceholder}
              @input=${this._onFilter}
            />
          </div>` : A}

        <ul
          part="list"
          class="uwc-lb__list"
          role="listbox"
          aria-multiselectable=${this.multiple}
          style=${listStyle}
        >
          ${filtered.length === 0 ? b2`<li class="uwc-lb__empty">${this.emptyMessage}</li>` : c4(filtered, (o10, i8) => `${i8}-${String(o10.value)}`, (o10, i8) => this._renderItem(o10, i8))}
        </ul>
      </div>
    `;
  }
};
UwcListbox.styles = [styles_default8];
__decorateClass([
  n4({ type: Array })
], UwcListbox.prototype, "options", 2);
__decorateClass([
  n4()
], UwcListbox.prototype, "value", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcListbox.prototype, "multiple", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcListbox.prototype, "filter", 2);
__decorateClass([
  n4({ attribute: "filter-placeholder" })
], UwcListbox.prototype, "filterPlaceholder", 2);
__decorateClass([
  n4({ attribute: "filter-by" })
], UwcListbox.prototype, "filterBy", 2);
__decorateClass([
  n4({ attribute: "list-style-height" })
], UwcListbox.prototype, "listStyleHeight", 2);
__decorateClass([
  n4({ attribute: "empty-message" })
], UwcListbox.prototype, "emptyMessage", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcListbox.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcListbox.prototype, "invalid", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcListbox.prototype, "fluid", 2);
__decorateClass([
  r5()
], UwcListbox.prototype, "_filterQuery", 2);
__decorateClass([
  r5()
], UwcListbox.prototype, "_focusedIdx", 2);

// src/listbox/react.ts
var UwcListbox2 = createComponent9({
  tagName: "uwc-listbox",
  elementClass: UwcListbox,
  react: React9,
  events: {
    onUwcChange: "uwc-change",
    onUwcFilter: "uwc-filter"
  }
});

// src/menu/react.ts
import { createComponent as createComponent10 } from "@lit/react";
import React10 from "react";

// src/menu/styles.ts
var styles_default9 = [
  hostReset,
  floatingPanel(".panel", { durationVar: "--uwc-menu-duration", durationDefault: "140ms" }),
  placementOrigins,
  i`
    :host { display: contents; }
    slot[name="trigger"] { display: contents; }

    /* ── Floating panel (visual) ────────────────────────────────────────────── */
    .panel {
      background:    var(--uwc-menu-bg,     ${surface});
      border:        var(--uwc-menu-border, 1px solid ${border});
      border-radius: var(--uwc-menu-radius, ${radiusLg});
      box-shadow:    var(--uwc-menu-shadow, ${shadowLg});
      min-width:     var(--uwc-menu-min-width, 180px);
      z-index:       var(--uwc-menu-z, ${zFloat});
      overflow:      hidden;
    }

    /* ── List ───────────────────────────────────────────────────────────────── */
    .list { list-style: none; padding: ${space1} 0; margin: 0; }

    /* ── Separator ──────────────────────────────────────────────────────────── */
    .separator { height: 1px; background: var(--uwc-menu-separator-color, ${borderSubtle}); margin: ${space1} 0; }

    /* ── Item ───────────────────────────────────────────────────────────────── */
    .item { position: relative; }

    .item-inner {
      display: flex;
      align-items: center;
      gap: 9px;
      width: 100%;
      padding: ${space2} 13px;
      font-size:   var(--uwc-menu-item-font-size, ${fontSizeSm});
      font-family: var(--uwc-font-family, inherit);
      color:       var(--uwc-menu-item-color, ${text});
      background:  transparent;
      border:      none;
      cursor:      pointer;
      text-align:  left;
      text-decoration: none;
      border-radius: 0;
      outline: none;
      white-space: nowrap;
      transition: background ${durationFast}, color ${durationFast};
    }
    .item-inner:hover,
    .item-inner:focus-visible {
      background: var(--uwc-menu-item-hover-bg,    ${hoverBg});
      color:      var(--uwc-menu-item-hover-color, ${text});
    }
    .item--disabled .item-inner {
      color:  var(--uwc-menu-item-disabled-color, ${textDisabled});
      cursor: not-allowed;
    }
    .item--disabled .item-inner:hover { background: transparent; }
    .item--active > .item-inner { background: var(--uwc-menu-item-hover-bg, ${hoverBg}); }
    .item--danger > .item-inner { color: var(--uwc-menu-item-danger-color, ${danger}); }
    .item--danger > .item-inner:hover {
      background: color-mix(in oklab, var(--uwc-menu-item-danger-color, ${danger}) 10%, transparent);
      color: var(--uwc-menu-item-danger-color, ${danger});
    }

    /* ── Item sub-elements ──────────────────────────────────────────────────── */
    .item-icon {
      width: 18px;
      text-align: center;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .item-label { flex: 1; }
    .item-badge {
      font-size: ${fontSizeXs};
      padding: 1px 6px;
      border-radius: ${radiusFull};
      background: ${borderSubtle};
      color: ${textSecondary};
      font-weight: ${fontWeightMedium};
      flex-shrink: 0;
    }
    .item-chevron { font-size: 16px; color: ${textMuted}; margin-left: auto; line-height: 1; }

    /* ── Submenu panel ──────────────────────────────────────────────────────── */
    .submenu-panel {
      position: absolute;
      left: calc(100% + 4px);
      top: 0;
      list-style: none;
      padding: ${space1} 0;
      margin: 0;
      background:    var(--uwc-menu-bg,     ${surface});
      border:        var(--uwc-menu-border, 1px solid ${border});
      border-radius: var(--uwc-menu-radius, ${radiusLg});
      box-shadow:    var(--uwc-menu-shadow, ${shadowLg});
      min-width:     160px;
      z-index: 1;
      animation: submenu-in 120ms ${easingStandard} both;
    }

    @keyframes submenu-in {
      from { opacity: 0; transform: translateX(-4px) scale(0.97); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
  `
];

// src/menu/index.ts
var UwcMenu = class extends i4 {
  constructor() {
    super(...arguments);
    this.items = [];
    this.placement = "bottom-start";
    this.offset = 6;
    this._openSubmenuIndex = null;
    this._focusedIndex = -1;
    this._onMenuKeydown = this._handleMenuKeydown.bind(this);
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const onClick = (e9) => {
          e9.stopPropagation();
          this._pc.toggle();
        };
        const onKeydown = (e9) => {
          if ((e9.key === "ArrowDown" || e9.key === "Enter" || e9.key === " ") && !this._pc.open) {
            e9.preventDefault();
            this._pc.show();
          }
        };
        el.setAttribute("aria-haspopup", "menu");
        el.addEventListener("click", onClick);
        el.addEventListener("keydown", onKeydown);
        return () => {
          el.removeEventListener("click", onClick);
          el.removeEventListener("keydown", onKeydown);
          el.removeAttribute("aria-haspopup");
        };
      },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      afterShow: () => {
        this._focusedIndex = -1;
        this._openSubmenuIndex = null;
        document.addEventListener("keydown", this._onMenuKeydown);
        emit(this, "uwc-show");
        requestAnimationFrame(() => this._focusItem(this._firstFocusableIndex()));
      },
      afterHide: () => {
        document.removeEventListener("keydown", this._onMenuKeydown);
        this._openSubmenuIndex = null;
        this._focusedIndex = -1;
        emit(this, "uwc-hide");
      }
    });
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  firstUpdated() {
    this._pc.firstUpdated(
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(
      changed,
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  // ── Item helpers ─────────────────────────────────────────────────
  /** Flat array of visible, non-separator items — used for keyboard nav. */
  _focusableItems() {
    return this.items.filter((it) => !it.separator && it.visible !== false && !it.disabled);
  }
  _firstFocusableIndex() {
    return this.items.findIndex((it) => !it.separator && it.visible !== false && !it.disabled);
  }
  _focusItem(idx) {
    if (idx < 0) return;
    this._focusedIndex = idx;
    const btn = this._panel?.querySelector(`[data-menu-index="${idx}"]`);
    btn?.focus();
  }
  _itemToFlatIndex(item) {
    return this.items.indexOf(item);
  }
  // ── Keyboard navigation ──────────────────────────────────────────
  _handleMenuKeydown(e9) {
    const items = this.items;
    const focusable = items.map((it, i8) => ({ it, i: i8 })).filter(({ it }) => !it.separator && it.visible !== false && !it.disabled);
    const curPos = focusable.findIndex(({ i: i8 }) => i8 === this._focusedIndex);
    switch (e9.key) {
      case "ArrowDown": {
        e9.preventDefault();
        const next = focusable[(curPos + 1) % focusable.length];
        if (next) this._focusItem(next.i);
        break;
      }
      case "ArrowUp": {
        e9.preventDefault();
        const prev = focusable[(curPos - 1 + focusable.length) % focusable.length];
        if (prev) this._focusItem(prev.i);
        break;
      }
      case "Home":
        e9.preventDefault();
        if (focusable[0]) this._focusItem(focusable[0].i);
        break;
      case "End":
        e9.preventDefault();
        if (focusable.at(-1)) this._focusItem(focusable.at(-1).i);
        break;
      case "ArrowRight": {
        const focused = items[this._focusedIndex];
        if (focused?.items?.length) {
          this._openSubmenuIndex = this._focusedIndex;
          requestAnimationFrame(() => {
            const subItem = this._panel?.querySelector(
              `[data-submenu-index="${this._focusedIndex}"] [data-sub-item-index="0"]`
            );
            subItem?.focus();
          });
        }
        break;
      }
      case "ArrowLeft":
        this._openSubmenuIndex = null;
        break;
      case "Tab":
        this._pc.hide();
        break;
    }
  }
  // ── Item command execution ────────────────────────────────────────
  _executeItem(item, e9) {
    if (item.disabled) return;
    const ev = { originalEvent: e9, item };
    item.command?.(ev);
    emit(this, "uwc-item-select", { item, originalEvent: e9 });
    if (!item.items?.length) this._pc.hide();
  }
  _handleItemClick(item, idx, e9) {
    e9.stopPropagation();
    if (item.separator || item.disabled) return;
    if (item.items?.length) {
      this._openSubmenuIndex = this._openSubmenuIndex === idx ? null : idx;
      return;
    }
    this._executeItem(item, e9);
  }
  _handleItemMouseEnter(idx, item) {
    if (item.items?.length) {
      this._openSubmenuIndex = idx;
    } else if (this._openSubmenuIndex !== null) {
      this._openSubmenuIndex = null;
    }
  }
  // ── Render helpers ────────────────────────────────────────────────
  _renderItem(item, idx) {
    if (item.visible === false) return b2``;
    if (item.separator) {
      return b2`<li part="separator" class="separator" role="separator" aria-hidden="true"></li>`;
    }
    const hasSubmenu = Boolean(item.items?.length);
    const isSubmenuOpen = this._openSubmenuIndex === idx;
    const isFocused = this._focusedIndex === idx;
    const labelContent = item.escape === true ? b2`${item.label ?? ""}` : b2`<span .innerHTML=${escapeHtml(item.label ?? "")}></span>`;
    return b2`
      <li
        part="item"
        class=${e7({
      "item": true,
      "item--disabled": !!item.disabled,
      "item--active": isSubmenuOpen,
      "item--focused": isFocused,
      "item--danger": !!item.danger
    })}
        style=${item.style ? o7(item.style) : ""}
        data-menu-index=${idx}
        role="none"
        @mouseenter=${() => this._handleItemMouseEnter(idx, item)}
      >
        ${item.url && !item.disabled ? b2`
            <a
              href=${item.url}
              target=${item.target ?? "_self"}
              title=${item.title ?? ""}
              role="menuitem"
              data-menu-index=${idx}
              class="item-inner"
              tabindex=${isFocused ? "0" : "-1"}
              @click=${(e9) => this._executeItem(item, e9)}
            >
              ${this._renderItemInner(item, hasSubmenu)}
            </a>` : b2`
            <button
              type="button"
              role="menuitem"
              data-menu-index=${idx}
              class="item-inner"
              tabindex=${isFocused ? "0" : "-1"}
              ?disabled=${item.disabled}
              title=${item.title ?? ""}
              aria-haspopup=${hasSubmenu ? "menu" : "false"}
              aria-expanded=${hasSubmenu ? String(isSubmenuOpen) : "false"}
              @click=${(e9) => this._handleItemClick(item, idx, e9)}
              @focus=${() => {
      this._focusedIndex = idx;
    }}
            >
              ${this._renderItemInner(item, hasSubmenu)}
            </button>`}

        ${hasSubmenu && isSubmenuOpen ? b2`
          <ul
            class="submenu-panel"
            part="submenu-panel"
            role="menu"
            data-submenu-index=${idx}
          >
            ${c4(
      (item.items ?? []).filter((sub) => sub.visible !== false),
      (sub) => sub.id ?? sub.label,
      (sub, subIdx) => this._renderSubItem(sub, subIdx, idx)
    )}
          </ul>` : A}
      </li>`;
  }
  _renderItemInner(item, hasSubmenu) {
    return b2`
      ${item.icon ? b2`<span part="item-icon" class="item-icon ${item.iconClass ?? ""}"><uwc-icon name=${item.icon} size="15px"></uwc-icon></span>` : A}
      <span part="item-label" class="item-label">${item.label ?? ""}</span>
      ${item.badge ? b2`<span part="item-badge" class="item-badge ${item.badgeClass ?? ""}">${item.badge}</span>` : A}
      ${hasSubmenu ? b2`<span class="item-chevron" aria-hidden="true">›</span>` : A}`;
  }
  _renderSubItem(item, subIdx, parentIdx) {
    if (item.separator) {
      return b2`<li class="separator" role="separator" aria-hidden="true"></li>`;
    }
    return b2`
      <li role="none" class=${e7({ "item": true, "item--disabled": !!item.disabled })}>
        <button
          type="button"
          role="menuitem"
          data-sub-item-index=${subIdx}
          class="item-inner"
          tabindex="-1"
          ?disabled=${item.disabled}
          title=${item.title ?? ""}
          @click=${(e9) => {
      e9.stopPropagation();
      if (!item.disabled) this._executeItem(item, e9);
    }}
        >
          ${this._renderItemInner(item, false)}
        </button>
      </li>`;
  }
  // ── Public API ───────────────────────────────────────────────────
  show() {
    this._pc.show();
  }
  hide() {
    this._pc.hide();
  }
  toggle() {
    this._pc.toggle();
  }
  get isOpen() {
    return this._pc.open;
  }
  // ── Render ───────────────────────────────────────────────────────
  render() {
    const isExternal = Boolean(this.triggerId);
    const open = this._pc.open;
    const visible = this.items.filter((it) => it.visible !== false);
    return b2`
      ${!isExternal ? b2`<slot name="trigger" part="trigger"></slot>` : A}

      <div
        id="panel"
        part="panel"
        popover="manual"
        role="menu"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
        aria-orientation="vertical"
      >
        <ul class="list" role="presentation">
          ${c4(
      visible,
      (item) => item.id ?? item.label ?? Math.random(),
      (item, idx) => this._renderItem(item, idx)
    )}
        </ul>
      </div>`;
  }
};
UwcMenu.styles = [styles_default9];
__decorateClass([
  n4({ type: String, attribute: "trigger-id" })
], UwcMenu.prototype, "triggerId", 2);
__decorateClass([
  n4({ type: Array })
], UwcMenu.prototype, "items", 2);
__decorateClass([
  n4({ type: String })
], UwcMenu.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcMenu.prototype, "offset", 2);
__decorateClass([
  e5("#panel")
], UwcMenu.prototype, "_panel", 2);
__decorateClass([
  r5()
], UwcMenu.prototype, "_openSubmenuIndex", 2);
__decorateClass([
  r5()
], UwcMenu.prototype, "_focusedIndex", 2);

// src/menu/react.ts
var UwcMenu2 = createComponent10({
  tagName: "uwc-menu",
  elementClass: UwcMenu,
  react: React10,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide",
    onUwcItemSelect: "uwc-item-select"
  }
});

// src/overlay/react.ts
import { createComponent as createComponent11 } from "@lit/react";
import React11 from "react";

// src/overlay/styles.ts
var styles_default10 = [
  hostReset,
  floatingPanel(".panel", { durationVar: "--uwc-overlay-duration", durationDefault: "160ms" }),
  placementOriginsExtended,
  i`
    :host { display: contents; }
    slot[name="trigger"] { display: contents; }

    /* ── Backdrop ───────────────────────────────────────────────────────────── */
    .backdrop {
      position: fixed;
      inset: 0;
      margin: 0;
      border: none;
      background: var(--uwc-backdrop-color, rgba(0,0,0,0.25));
      z-index: calc(var(--uwc-overlay-z, ${zFloat}) - 1);
      opacity: 0;
      transition:
        opacity  var(--uwc-overlay-duration, 160ms) ease,
        display  var(--uwc-overlay-duration, 160ms) allow-discrete,
        overlay  var(--uwc-overlay-duration, 160ms) allow-discrete;
    }
    .backdrop.is-open,
    .backdrop:popover-open { opacity: 1; }

    /* ── Panel (visual) ─────────────────────────────────────────────────────── */
    .panel {
      padding:       0;
      background:    var(--uwc-overlay-bg,     ${surface});
      border:        var(--uwc-overlay-border, 1px solid ${border});
      border-radius: var(--uwc-overlay-radius, ${radiusLg});
      box-shadow:    var(--uwc-overlay-shadow, ${shadowLg});
      min-width:     160px;
      z-index:       var(--uwc-overlay-z, ${zFloat});
    }
  `
];

// src/overlay/index.ts
var UwcOverlay = class extends i4 {
  constructor() {
    super(...arguments);
    this.placement = "bottom";
    this.offset = 8;
    this.backdrop = false;
    this.closeOnEscape = true;
    this.closeOnOutsideClick = true;
    // ── Controller ───────────────────────────────────────────────────
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const handler = (e9) => {
          e9.stopPropagation();
          this._pc.toggle();
        };
        el.addEventListener("click", handler);
        return () => el.removeEventListener("click", handler);
      },
      get dismissOnOutsideClick() {
        return true;
      },
      // always wired; actual gate in _handleOutsideClick
      get dismissOnEscape() {
        return true;
      },
      afterShow: () => {
        if (this.backdrop) this._backdrop?.showPopover();
        emit(this, "uwc-show", { triggeredBy: this._pc.triggerEl ?? void 0 });
      },
      afterHide: () => {
        try {
          this._backdrop?.hidePopover();
        } catch {
        }
        emit(this, "uwc-hide", { triggeredBy: this._pc.triggerEl ?? void 0 });
      }
    });
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  firstUpdated() {
    this._pc.firstUpdated(
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(
      changed,
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  // ── Public imperative API ────────────────────────────────────────
  show() {
    this._pc.show();
  }
  hide() {
    this._pc.hide();
  }
  toggle() {
    this._pc.toggle();
  }
  get isOpen() {
    return this._pc.open;
  }
  // ── Render ───────────────────────────────────────────────────────
  render() {
    const isExternal = Boolean(this.triggerId);
    const open = this._pc.open;
    return b2`
      ${!isExternal ? b2`<slot name="trigger" part="trigger"></slot>` : A}

      ${this.backdrop ? b2`<div id="backdrop" part="backdrop" popover="manual"
                    class="backdrop ${open ? "is-open" : ""}"
                    @click=${() => {
      if (this.closeOnOutsideClick) this._pc.hide();
    }}>
               </div>` : A}

      <div
        id="panel"
        part="panel"
        popover="manual"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
        aria-modal=${this.backdrop ? "true" : "false"}
      >
        <slot name="content"></slot>
        <slot></slot>
      </div>`;
  }
};
UwcOverlay.styles = [styles_default10];
__decorateClass([
  n4({ type: String, attribute: "trigger-id" })
], UwcOverlay.prototype, "triggerId", 2);
__decorateClass([
  n4({ type: String })
], UwcOverlay.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcOverlay.prototype, "offset", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcOverlay.prototype, "backdrop", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "close-on-escape" })
], UwcOverlay.prototype, "closeOnEscape", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "close-on-outside-click" })
], UwcOverlay.prototype, "closeOnOutsideClick", 2);
__decorateClass([
  e5("#panel")
], UwcOverlay.prototype, "_panel", 2);
__decorateClass([
  e5("#backdrop")
], UwcOverlay.prototype, "_backdrop", 2);

// src/overlay/react.ts
var UwcOverlay2 = createComponent11({
  tagName: "uwc-overlay",
  elementClass: UwcOverlay,
  react: React11,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide"
  }
});

// src/paginator/react.ts
import { createComponent as createComponent12 } from "@lit/react";
import React12 from "react";

// src/paginator/styles.ts
var styles_default11 = [
  hostReset,
  i`
    :host {
      display: block;
    }

    /* ── Container ──────────────────────────────────────────────────────── */
    .uwc-pg {
      display:         flex;
      align-items:     center;
      flex-wrap:       wrap;
      gap:             0.25rem;
      padding:         var(--uwc-paginator-padding, 0.5rem 1rem);
      background:      var(--uwc-paginator-bg, ${surface});
      border-top:      var(--uwc-paginator-border, 1px solid rgba(0,0,0,0.08));
      border-radius:   var(--uwc-paginator-radius, ${radiusMd});
      font-family:     var(--uwc-font-family, inherit);
      font-size:       var(--uwc-paginator-font-size, ${fontSizeMd});
      color:           ${text};
      box-sizing:      border-box;
      user-select:     none;
    }

    /* Spacer between left slot, page controls, and right slot */
    .uwc-pg__spacer { flex: 1; }

    /* ── Shared button ──────────────────────────────────────────────────── */
    .uwc-pg__btn {
      --_bg:     var(--uwc-paginator-btn-bg,     transparent);
      --_color:  var(--uwc-paginator-btn-color,  ${text});
      --_radius: var(--uwc-paginator-btn-radius,  ${radiusMd});

      display:         inline-flex;
      align-items:     center;
      justify-content: center;
      min-width:       2.25rem;
      height:          2.25rem;
      padding-inline:  0.25rem;
      border:          1px solid transparent;
      border-radius:   var(--_radius);
      background:      var(--_bg);
      color:           var(--_color);
      font-family:     inherit;
      font-size:       inherit;
      font-weight:     ${fontWeightMedium};
      line-height:     1;
      cursor:          pointer;
      transition:      background ${durationBase}, color ${durationBase}, border-color ${durationBase};
      outline:         none;
      box-sizing:      border-box;
    }
    .uwc-pg__btn:hover:not(:disabled) {
      background: var(--uwc-paginator-btn-hover-bg, ${hoverBg});
    }
    .uwc-pg__btn:focus-visible {
      outline: 2px solid var(--uwc-color-primary, ${primary});
      outline-offset: 1px;
    }
    .uwc-pg__btn:disabled {
      opacity:        0.4;
      cursor:         not-allowed;
      pointer-events: none;
    }

    /* ── Nav icon buttons ───────────────────────────────────────────────── */
    .uwc-pg__nav {
      color: var(--uwc-paginator-nav-color, ${textSecondary});
    }
    .uwc-pg__nav svg {
      display: block;
      width:   1rem;
      height:  1rem;
    }

    /* ── Page link buttons ──────────────────────────────────────────────── */
    .uwc-pg__page {
      min-width: 2.25rem;
    }
    .uwc-pg__page--active {
      --_bg:    var(--uwc-paginator-active-bg,    var(--uwc-color-primary, ${primary}));
      --_color: var(--uwc-paginator-active-color, #fff);
      border-color: var(--uwc-paginator-active-bg, var(--uwc-color-primary, ${primary}));
    }
    .uwc-pg__page--active:hover:not(:disabled) {
      background: var(--_bg);
      opacity:    0.9;
    }

    /* Ellipsis */
    .uwc-pg__ellipsis {
      display:         inline-flex;
      align-items:     center;
      justify-content: center;
      min-width:       2.25rem;
      height:          2.25rem;
      color:           ${textMuted};
      font-size:       inherit;
      letter-spacing:  0.1em;
    }

    /* ── Rows-per-page select ───────────────────────────────────────────── */
    .uwc-pg__rpp {
      display:       flex;
      align-items:   center;
      gap:           0.375rem;
      margin-inline: 0.375rem;
    }
    .uwc-pg__rpp-label {
      font-size:  var(--uwc-paginator-label-size, 0.8125rem);
      color:      ${textSecondary};
      white-space: nowrap;
    }
    .uwc-pg__rpp-select {
      height:        2.25rem;
      padding-inline: 0.5rem 1.5rem;
      padding-block: 0;
      border:        1px solid rgba(0,0,0,0.15);
      border-radius: var(--uwc-paginator-btn-radius, ${radiusMd});
      background:    ${surface} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%236b7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 0.375rem center;
      color:         ${text};
      font-family:   inherit;
      font-size:     inherit;
      cursor:        pointer;
      outline:       none;
      appearance:    none;
      transition:    border-color ${durationBase};
    }
    .uwc-pg__rpp-select:focus {
      border-color: var(--uwc-color-primary, ${primary});
    }

    /* ── Current page report ────────────────────────────────────────────── */
    .uwc-pg__report {
      font-size:    var(--uwc-paginator-label-size, 0.8125rem);
      color:        ${textSecondary};
      margin-inline: 0.375rem;
      white-space:  nowrap;
    }

    /* ── Jump to page ───────────────────────────────────────────────────── */
    .uwc-pg__jump {
      display:     flex;
      align-items: center;
      gap:         0.375rem;
      margin-inline: 0.375rem;
    }
    .uwc-pg__jump-label {
      font-size:  var(--uwc-paginator-label-size, 0.8125rem);
      color:      ${textSecondary};
      white-space: nowrap;
    }
    .uwc-pg__jump-input {
      width:         3.5rem;
      height:        2.25rem;
      padding-inline: 0.5rem;
      border:        1px solid rgba(0,0,0,0.15);
      border-radius: var(--uwc-paginator-btn-radius, ${radiusMd});
      background:    ${surface};
      color:         ${text};
      font-family:   inherit;
      font-size:     inherit;
      text-align:    center;
      outline:       none;
      appearance:    textfield;
      -moz-appearance: textfield;
      transition:    border-color ${durationBase};
    }
    .uwc-pg__jump-input::-webkit-inner-spin-button,
    .uwc-pg__jump-input::-webkit-outer-spin-button { appearance: none; }
    .uwc-pg__jump-input:focus {
      border-color: var(--uwc-color-primary, ${primary});
    }
    .uwc-pg__jump-select {
      height:        2.25rem;
      padding-inline: 0.5rem 1.5rem;
      padding-block: 0;
      border:        1px solid rgba(0,0,0,0.15);
      border-radius: var(--uwc-paginator-btn-radius, ${radiusMd});
      background:    ${surface} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'%3E%3Cpath fill='%236b7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 0.375rem center;
      color:         ${text};
      font-family:   inherit;
      font-size:     inherit;
      cursor:        pointer;
      outline:       none;
      appearance:    none;
      transition:    border-color ${durationBase};
    }
    .uwc-pg__jump-select:focus {
      border-color: var(--uwc-color-primary, ${primary});
    }

    /* ── Slots ──────────────────────────────────────────────────────────── */
    .uwc-pg__slot-start,
    .uwc-pg__slot-end {
      display:     flex;
      align-items: center;
    }
  `
];

// src/paginator/index.ts
var UwcPaginator = class extends i4 {
  constructor() {
    super(...arguments);
    this.first = 0;
    this.rows = 10;
    this.totalRecords = 0;
    this.pageLinks = 5;
    this.rowsPerPageOptions = null;
    this.showFirstLast = true;
    this.showPageLinks = true;
    this.showCurrentPageReport = false;
    this.currentPageReportTemplate = "({currentPage} of {totalPages})";
    this.showJumpToPageInput = false;
    this.showJumpToPageDropdown = false;
    this.alwaysShow = true;
    this.disabled = false;
    this._jumpValue = "";
  }
  // ── Computed helpers ──────────────────────────────────────────────────
  get _pageCount() {
    return this.rows > 0 ? Math.max(1, Math.ceil(this.totalRecords / this.rows)) : 1;
  }
  get _currentPage() {
    return this.rows > 0 ? Math.floor(this.first / this.rows) : 0;
  }
  get _rppOptions() {
    if (!this.rowsPerPageOptions) return [];
    return this.rowsPerPageOptions.split(",").map((s5) => parseInt(s5.trim(), 10)).filter((n6) => !isNaN(n6));
  }
  /** Build the sliding-window page number array with -1 as ellipsis sentinel */
  _buildPageLinks() {
    const pc = this._pageCount;
    const cur = this._currentPage;
    const max = this.pageLinks;
    if (pc <= max) {
      return Array.from({ length: pc }, (_2, i8) => i8);
    }
    const half = Math.floor(max / 2);
    let start = cur - half;
    let end = cur + half;
    if (start < 0) {
      end += -start;
      start = 0;
    }
    if (end >= pc) {
      start -= end - pc + 1;
      end = pc - 1;
    }
    start = Math.max(0, start);
    const pages = [];
    if (start > 0) {
      pages.push(0);
      if (start > 1) pages.push(-1);
    }
    for (let i8 = start; i8 <= end; i8++) pages.push(i8);
    if (end < pc - 1) {
      if (end < pc - 2) pages.push(-1);
      pages.push(pc - 1);
    }
    return pages;
  }
  // ── Navigation helpers ────────────────────────────────────────────────
  _goToPage(page) {
    if (this.disabled) return;
    const pc = this._pageCount;
    page = Math.max(0, Math.min(page, pc - 1));
    const newFirst = page * this.rows;
    if (newFirst === this.first) return;
    this.first = newFirst;
    this._emit();
  }
  _setRows(rows) {
    if (this.disabled) return;
    this.rows = rows;
    this.first = 0;
    this._emit();
  }
  _emit() {
    const detail = {
      first: this.first,
      rows: this.rows,
      page: this._currentPage,
      pageCount: this._pageCount
    };
    this.dispatchEvent(new CustomEvent("uwc-page-change", {
      bubbles: true,
      composed: true,
      detail
    }));
  }
  // ── Jump to page ──────────────────────────────────────────────────────
  _onJumpInput(e9) {
    this._jumpValue = e9.target.value;
  }
  _onJumpKeydown(e9) {
    if (e9.key === "Enter") this._commitJump();
  }
  _onJumpBlur() {
    this._commitJump();
  }
  _commitJump() {
    const page = parseInt(this._jumpValue, 10);
    if (!isNaN(page)) {
      this._goToPage(page - 1);
    }
    this._jumpValue = "";
  }
  _onJumpDropdownChange(e9) {
    const page = parseInt(e9.target.value, 10);
    if (!isNaN(page)) this._goToPage(page);
  }
  _onRppChange(e9) {
    const rows = parseInt(e9.target.value, 10);
    if (!isNaN(rows)) this._setRows(rows);
  }
  // ── Render ────────────────────────────────────────────────────────────
  render() {
    const pc = this._pageCount;
    const cur = this._currentPage;
    if (!this.alwaysShow && pc <= 1) return A;
    const isFirst = cur === 0;
    const isLast = cur >= pc - 1;
    const iconFirst = b2`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"/></svg>`;
    const iconPrev = b2`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
    const iconNext = b2`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
    const iconLast = b2`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"/></svg>`;
    const rppTpl = this._rppOptions.length > 0 ? b2`
      <span class="uwc-pg__rpp">
        <span class="uwc-pg__rpp-label">Rows per page:</span>
        <select
          part="rows-per-page"
          class="uwc-pg__rpp-select"
          .value=${String(this.rows)}
          ?disabled=${this.disabled}
          @change=${this._onRppChange}
        >
          ${this._rppOptions.map((n6) => b2`<option value=${n6} ?selected=${n6 === this.rows}>${n6}</option>`)}
        </select>
      </span>
    ` : A;
    const reportTpl = this.showCurrentPageReport ? b2`
      <span part="report" class="uwc-pg__report">
        ${this._buildReport(cur, pc)}
      </span>
    ` : A;
    const jumpInputTpl = this.showJumpToPageInput ? b2`
      <span class="uwc-pg__jump">
        <span class="uwc-pg__jump-label">Go to:</span>
        <input
          part="jump-input"
          class="uwc-pg__jump-input"
          type="number"
          min="1"
          max=${pc}
          .value=${this._jumpValue}
          ?disabled=${this.disabled}
          @input=${this._onJumpInput}
          @keydown=${this._onJumpKeydown}
          @blur=${this._onJumpBlur}
        />
      </span>
    ` : A;
    const jumpDropdownTpl = this.showJumpToPageDropdown ? b2`
      <span class="uwc-pg__jump">
        <span class="uwc-pg__jump-label">Go to:</span>
        <select
          part="jump-dropdown"
          class="uwc-pg__jump-select"
          .value=${String(cur)}
          ?disabled=${this.disabled}
          @change=${this._onJumpDropdownChange}
        >
          ${Array.from({ length: pc }, (_2, i8) => b2`
            <option value=${i8} ?selected=${i8 === cur}>${i8 + 1}</option>
          `)}
        </select>
      </span>
    ` : A;
    const pageLinksTpl = this.showPageLinks ? b2`
      <span style="display:inline-flex;align-items:center;gap:0.125rem">
        ${c4(this._buildPageLinks(), (p4, idx) => `${p4}-${idx}`, (p4) => {
      if (p4 === -1) return b2`<span class="uwc-pg__ellipsis">&hellip;</span>`;
      const active = p4 === cur;
      return b2`
            <button
              part=${active ? "page-btn page-btn-active" : "page-btn"}
              class=${e7({ "uwc-pg__btn": true, "uwc-pg__page": true, "uwc-pg__page--active": active })}
              ?disabled=${this.disabled}
              aria-current=${active ? "page" : A}
              aria-label="Page ${p4 + 1}"
              @click=${() => this._goToPage(p4)}
            >${p4 + 1}</button>
          `;
    })}
      </span>
    ` : A;
    return b2`
      <div part="container" class="uwc-pg" role="navigation" aria-label="Pagination">

        <slot name="start" class="uwc-pg__slot-start"></slot>

        ${rppTpl}

        ${reportTpl}

        <span style="display:inline-flex;align-items:center;gap:0.125rem">
          ${this.showFirstLast ? b2`
            <button
              part="nav-first"
              class="uwc-pg__btn uwc-pg__nav"
              ?disabled=${isFirst || this.disabled}
              aria-label="First page"
              @click=${() => this._goToPage(0)}
            >${iconFirst}</button>
          ` : A}

          <button
            part="nav-prev"
            class="uwc-pg__btn uwc-pg__nav"
            ?disabled=${isFirst || this.disabled}
            aria-label="Previous page"
            @click=${() => this._goToPage(cur - 1)}
          >${iconPrev}</button>
        </span>

        ${pageLinksTpl}

        <span style="display:inline-flex;align-items:center;gap:0.125rem">
          <button
            part="nav-next"
            class="uwc-pg__btn uwc-pg__nav"
            ?disabled=${isLast || this.disabled}
            aria-label="Next page"
            @click=${() => this._goToPage(cur + 1)}
          >${iconNext}</button>

          ${this.showFirstLast ? b2`
            <button
              part="nav-last"
              class="uwc-pg__btn uwc-pg__nav"
              ?disabled=${isLast || this.disabled}
              aria-label="Last page"
              @click=${() => this._goToPage(pc - 1)}
            >${iconLast}</button>
          ` : A}
        </span>

        ${jumpInputTpl}
        ${jumpDropdownTpl}

        <slot name="end" class="uwc-pg__slot-end"></slot>
      </div>
    `;
  }
  _buildReport(cur, pc) {
    const first = this.first + 1;
    const last = Math.min(this.first + this.rows, this.totalRecords);
    return this.currentPageReportTemplate.replace("{currentPage}", String(cur + 1)).replace("{totalPages}", String(pc)).replace("{first}", String(first)).replace("{last}", String(last)).replace("{totalRecords}", String(this.totalRecords));
  }
};
UwcPaginator.styles = styles_default11;
__decorateClass([
  n4({ type: Number, reflect: true })
], UwcPaginator.prototype, "first", 2);
__decorateClass([
  n4({ type: Number, reflect: true })
], UwcPaginator.prototype, "rows", 2);
__decorateClass([
  n4({ type: Number, attribute: "total-records" })
], UwcPaginator.prototype, "totalRecords", 2);
__decorateClass([
  n4({ type: Number, attribute: "page-links" })
], UwcPaginator.prototype, "pageLinks", 2);
__decorateClass([
  n4({ attribute: "rows-per-page-options" })
], UwcPaginator.prototype, "rowsPerPageOptions", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-first-last" })
], UwcPaginator.prototype, "showFirstLast", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-page-links" })
], UwcPaginator.prototype, "showPageLinks", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-current-page-report" })
], UwcPaginator.prototype, "showCurrentPageReport", 2);
__decorateClass([
  n4({ attribute: "current-page-report-template" })
], UwcPaginator.prototype, "currentPageReportTemplate", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-jump-to-page-input" })
], UwcPaginator.prototype, "showJumpToPageInput", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-jump-to-page-dropdown" })
], UwcPaginator.prototype, "showJumpToPageDropdown", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcPaginator.prototype, "alwaysShow", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcPaginator.prototype, "disabled", 2);
__decorateClass([
  r5()
], UwcPaginator.prototype, "_jumpValue", 2);

// src/paginator/react.ts
var UwcPaginator2 = createComponent12({
  tagName: "uwc-paginator",
  elementClass: UwcPaginator,
  react: React12,
  events: {
    onUwcPageChange: "uwc-page-change"
  }
});

// src/popover/react.ts
import { createComponent as createComponent13 } from "@lit/react";
import React13 from "react";

// src/popover/styles.ts
var styles_default12 = [
  hostReset,
  floatingPanel(".panel", { durationVar: "--uwc-popover-duration", durationDefault: "160ms" }),
  placementOrigins,
  i`
    :host { display: contents; }
    slot[name="trigger"] { display: contents; }

    /* ── Panel (visual) ─────────────────────────────────────────────────────── */
    .panel {
      background:    var(--uwc-popover-bg,        ${surface});
      border:        var(--uwc-popover-border,     1px solid ${border});
      border-radius: var(--uwc-popover-radius,     ${radiusLg});
      box-shadow:    var(--uwc-popover-shadow,     ${shadowLg});
      min-width:     var(--uwc-popover-min-width,  180px);
      z-index:       var(--uwc-popover-z,          ${zFloat});
      overflow:      hidden;
    }

    /* ── Arrow ──────────────────────────────────────────────────────────────── */
    .arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--uwc-popover-bg,     ${surface});
      border:     var(--uwc-popover-border, 1px solid ${border});
      transform: rotate(45deg);
      border-radius: ${radiusXs};
      z-index: -1;
    }

    /* ── Header ─────────────────────────────────────────────────────────────── */
    .header {
      display: flex;
      align-items: center;
      gap: ${space2};
      padding: ${space3} ${space4};
      border-bottom: 1px solid var(--uwc-popover-separator-color, ${borderSubtle});
      background: var(--uwc-popover-header-bg, transparent);
    }
    .header-content { flex: 1; min-width: 0; }
    .header-text {
      font-size:   ${fontSizeSm};
      font-weight: ${fontWeightSemibold};
      color:       var(--uwc-popover-header-color, ${text});
    }

    /* ── Close button ───────────────────────────────────────────────────────── */
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      border-radius: var(--uwc-radius-sm, ${radiusSm});
      background: transparent;
      font-size: ${fontSizeXs};
      color: ${textMuted};
      cursor: pointer;
      flex-shrink: 0;
      transition: background ${durationFast}, color ${durationFast};
    }
    .close-btn:hover { background: var(--uwc-hover-bg, ${hoverBg}); color: ${text}; }

    /* ── Body & footer ──────────────────────────────────────────────────────── */
    .body { padding: 0; }
    .footer { padding: 10px ${space4}; border-top: 1px solid var(--uwc-popover-separator-color, ${borderSubtle}); }
  `
];

// src/popover/index.ts
var UwcPopover = class extends i4 {
  constructor() {
    super(...arguments);
    this.placement = "bottom";
    this.offset = 8;
    this.showCloseButton = false;
    this.closeOnEscape = true;
    this.closeOnOutsideClick = true;
    this.arrow = false;
    this._ARROW_HALF = 6;
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const handler = (e9) => {
          e9.stopPropagation();
          this._pc.toggle();
        };
        el.addEventListener("click", handler);
        return () => el.removeEventListener("click", handler);
      },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      afterShow: () => emit(this, "uwc-show"),
      afterHide: () => emit(this, "uwc-hide"),
      afterPosition: ({ triggerRect, panelCoords, panelEl }) => {
        if (this.arrow) this._positionArrow(triggerRect, panelCoords, panelEl);
      }
    });
    this._hasHeaderSlot = () => Array.from(this.children).some((c5) => c5.slot === "header");
    this._hasFooterSlot = () => Array.from(this.children).some((c5) => c5.slot === "footer");
  }
  firstUpdated() {
    this._pc.firstUpdated(
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(
      changed,
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  _positionArrow(tRect, coords, panelEl) {
    const arrow = this._arrow;
    if (!arrow) return;
    const [side] = this.placement.split("-");
    const pRect = panelEl.getBoundingClientRect();
    const AH = this._ARROW_HALF;
    const MIN = 12;
    arrow.style.cssText = "";
    if (side === "top" || side === "bottom") {
      const cx = tRect.left + tRect.width / 2;
      const max = pRect.width - AH * 2 - MIN;
      const al = Math.max(MIN, Math.min(cx - coords.left - AH, max));
      arrow.style.left = `${al}px`;
      arrow.style[side === "bottom" ? "top" : "bottom"] = `${-AH}px`;
    } else {
      const cy = tRect.top + tRect.height / 2;
      const max = pRect.height - AH * 2 - MIN;
      const at = Math.max(MIN, Math.min(cy - coords.top - AH, max));
      arrow.style.top = `${at}px`;
      arrow.style[side === "right" ? "left" : "right"] = `${-AH}px`;
    }
  }
  _handleClose(e9) {
    this._pc.hide();
    emit(this, "uwc-close", { originalEvent: e9 });
  }
  show() {
    this._pc.show();
  }
  hide() {
    this._pc.hide();
  }
  toggle() {
    this._pc.toggle();
  }
  get isOpen() {
    return this._pc.open;
  }
  render() {
    const isExternal = Boolean(this.triggerId);
    const open = this._pc.open;
    const showHeader = this.header || this._hasHeaderSlot() || this.showCloseButton;
    const showFooter = this._hasFooterSlot();
    return b2`
      ${!isExternal ? b2`<slot name="trigger" part="trigger"></slot>` : A}

      <div
        id="panel"
        part="panel"
        popover="manual"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
      >
        ${this.arrow ? b2`<div id="arrow" part="arrow" class="arrow"></div>` : A}

        ${showHeader ? b2`
          <div part="header" class="header">
            <div class="header-content">
              ${this.header ? b2`<span class="header-text">${this.header}</span>` : b2`<slot name="header"></slot>`}
            </div>
            ${this.showCloseButton ? b2`
              <button
                part="close-btn"
                class="close-btn"
                aria-label="Close"
                @click=${this._handleClose}
              >✕</button>` : A}
          </div>` : A}

        <div part="body" class="body">
          <slot name="content"></slot>
          <slot></slot>
        </div>

        ${showFooter ? b2`
          <div part="footer" class="footer">
            <slot name="footer"></slot>
          </div>` : A}
      </div>`;
  }
};
UwcPopover.styles = [styles_default12];
__decorateClass([
  n4({ type: String, attribute: "trigger-id" })
], UwcPopover.prototype, "triggerId", 2);
__decorateClass([
  n4({ type: String })
], UwcPopover.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcPopover.prototype, "offset", 2);
__decorateClass([
  n4({ type: String })
], UwcPopover.prototype, "header", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-close-button" })
], UwcPopover.prototype, "showCloseButton", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "close-on-escape" })
], UwcPopover.prototype, "closeOnEscape", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "close-on-outside-click" })
], UwcPopover.prototype, "closeOnOutsideClick", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcPopover.prototype, "arrow", 2);
__decorateClass([
  e5("#panel")
], UwcPopover.prototype, "_panel", 2);
__decorateClass([
  e5("#arrow")
], UwcPopover.prototype, "_arrow", 2);

// src/popover/react.ts
var UwcPopover2 = createComponent13({
  tagName: "uwc-popover",
  elementClass: UwcPopover,
  react: React13,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide",
    onUwcClose: "uwc-close"
  }
});

// src/radiobutton/react.ts
import { createComponent as createComponent14 } from "@lit/react";
import React14 from "react";

// src/radiobutton/styles.ts
var styles_default13 = [
  hostReset,
  i`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.6;
      cursor: not-allowed;
    }

    /* ── Circle ─────────────────────────────────────────────────────────────── */
    .uwc-rb {
      --_size:        var(--uwc-radio-size,   1.125rem);
      --_dot-size:    calc(var(--_size) * 0.45);
      --_border:      var(--uwc-radio-border, 1px solid #d1d5db);
      --_bg:          var(--uwc-radio-bg,     ${surface});
      --_color:       var(--uwc-radio-color,  var(--uwc-color-primary, ${primary}));

      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width:         var(--_size);
      height:        var(--_size);
      flex-shrink:   0;
      border:        var(--_border);
      border-radius: 50%;
      background:    var(--_bg);
      transition:
        background-color ${durationBase},
        border-color     ${durationBase},
        box-shadow       ${durationBase};
    }

    /* Hidden native radio */
    input[type="radio"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    /* Checked state */
    :host([checked]) .uwc-rb {
      border-color: var(--_color);
    }

    /* Inner dot */
    .uwc-rb__dot {
      width:         var(--_dot-size);
      height:        var(--_dot-size);
      border-radius: 50%;
      background:    var(--_color);
      transform:     scale(0);
      transition:    transform ${durationBase} ${easingStandard};
      pointer-events: none;
    }
    :host([checked]) .uwc-rb__dot { transform: scale(1); }

    /* Focus ring */
    .uwc-rb:focus-within {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--_color) 25%, transparent);
    }

    /* Hover */
    :host(:not([disabled]):not([checked])) .uwc-rb:hover {
      border-color: var(--_color);
    }

    /* ── Invalid ────────────────────────────────────────────────────────────── */
    :host([invalid]) .uwc-rb {
      border-color: var(--uwc-color-danger, ${danger}) !important;
    }

    /* ── Filled variant ─────────────────────────────────────────────────────── */
    :host([variant="filled"]:not([checked])) .uwc-rb {
      --_bg: ${surfaceRaised};
      border-color: transparent;
    }

    /* ── Label ──────────────────────────────────────────────────────────────── */
    .uwc-rb__label {
      font-size:   var(--uwc-radio-font-size, ${fontSizeMd});
      color:       var(--uwc-radio-label-color, ${text});
      line-height: 1.4;
    }
  `
];

// src/radiobutton/index.ts
var UwcRadioButton = class extends i4 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.disabled = false;
    this.invalid = false;
    this.variant = "outlined";
  }
  // ── Handlers ─────────────────────────────────────────────────────
  _onChange(e9) {
    const input = e9.target;
    if (!input.checked) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { value: this.value, originalEvent: e9 }
    }));
  }
  // ── Render ────────────────────────────────────────────────────────
  render() {
    const labelContent = this.label ? b2`<span part="label" class="uwc-rb__label">${this.label}</span>` : b2`<slot part="label" class="uwc-rb__label"></slot>`;
    return b2`
      <label style="display:inline-flex;align-items:center;gap:0.5rem;cursor:${this.disabled ? "not-allowed" : "pointer"}">
        <span part="circle" class="uwc-rb">
          <input
            type="radio"
            .checked=${this.checked}
            value=${o6(this.value)}
            name=${o6(this.name)}
            ?disabled=${this.disabled}
            @change=${this._onChange}
          />
          <span class="uwc-rb__dot"></span>
        </span>
        ${labelContent}
      </label>
    `;
  }
};
UwcRadioButton.styles = [styles_default13];
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcRadioButton.prototype, "checked", 2);
__decorateClass([
  n4()
], UwcRadioButton.prototype, "value", 2);
__decorateClass([
  n4()
], UwcRadioButton.prototype, "name", 2);
__decorateClass([
  n4()
], UwcRadioButton.prototype, "label", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcRadioButton.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcRadioButton.prototype, "invalid", 2);
__decorateClass([
  n4({ reflect: true })
], UwcRadioButton.prototype, "variant", 2);

// src/radiobutton/react.ts
var UwcRadioButton2 = createComponent14({
  tagName: "uwc-radiobutton",
  elementClass: UwcRadioButton,
  react: React14,
  events: {
    onUwcChange: "uwc-change"
  }
});

// src/togglebutton/react.ts
import { createComponent as createComponent15 } from "@lit/react";
import React15 from "react";

// src/togglebutton/styles.ts
var styles_default14 = [
  hostReset,
  i`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    /* ── Button ─────────────────────────────────────────────────────────────── */
    .uwc-tb {
      --_bg:        var(--uwc-togglebtn-bg,         ${surface});
      --_border:    var(--uwc-togglebtn-border,      1px solid #d1d5db);
      --_color:     var(--uwc-togglebtn-color,       ${text});
      --_radius:    var(--uwc-togglebtn-radius,      ${radiusMd});
      --_font-size: var(--uwc-togglebtn-font-size,   ${fontSizeMd});
      --_px:        var(--uwc-togglebtn-padding-x,   0.875rem);
      --_py:        var(--uwc-togglebtn-padding-y,   0.5rem);
      --_gap:       var(--uwc-togglebtn-gap,         0.375rem);
      --_active-bg: var(--uwc-togglebtn-active-bg,   var(--uwc-color-primary, ${primary}));
      --_active-color: var(--uwc-togglebtn-active-color, #fff);

      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap:            var(--_gap);
      padding-inline: var(--_px);
      padding-block:  var(--_py);
      font-family:    var(--uwc-font-family, inherit);
      font-size:      var(--_font-size);
      font-weight:    ${fontWeightMedium};
      line-height:    1.25;
      white-space:    nowrap;
      cursor:         pointer;
      user-select:    none;
      outline:        none;
      box-sizing:     border-box;
      border:           var(--_border);
      border-radius:    var(--_radius);
      background-color: var(--_bg);
      color:            var(--_color);
      transition:
        background-color ${durationBase},
        border-color     ${durationBase},
        color            ${durationBase},
        box-shadow       ${durationBase};
    }

    /* Hidden input */
    input[type="checkbox"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    .uwc-tb:hover { background-color: ${hoverBg}; }
    .uwc-tb:focus-within {
      outline: 2px solid var(--uwc-color-primary, ${primary});
      outline-offset: 2px;
    }

    /* ── Checked / on ───────────────────────────────────────────────────────── */
    :host([checked]) .uwc-tb {
      background-color: var(--_active-bg);
      border-color:     var(--_active-bg);
      color:            var(--_active-color);
    }
    :host([checked]) .uwc-tb:hover {
      background-color: color-mix(in oklab, var(--_active-bg) 100%, black 8%);
    }

    /* ── Outline modifier ───────────────────────────────────────────────────── */
    :host([outline]:not([checked])) .uwc-tb {
      --_color: var(--uwc-color-primary, ${primary});
      border-color: var(--uwc-color-primary, ${primary});
    }

    /* ── Disabled ───────────────────────────────────────────────────────────── */
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.6;
    }

    /* ── Sizes ──────────────────────────────────────────────────────────────── */
    :host([size="small"]) .uwc-tb { font-size: ${fontSizeXs}; --_px: 0.625rem; --_py: 0.3125rem; }
    :host([size="large"]) .uwc-tb { font-size: ${fontSizeLg}; --_px: 1.125rem; --_py: 0.6875rem; }

    /* ── Icon ───────────────────────────────────────────────────────────────── */
    .uwc-tb__icon {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .uwc-tb__label { display: inline-flex; align-items: center; }

    /* ── Ripple ─────────────────────────────────────────────────────────────── */
    @keyframes uwc-tb-ripple {
      from { opacity: 0.2; transform: scale(0);   }
      to   { opacity: 0;   transform: scale(2.5); }
    }
    .uwc-tb-ripple {
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      pointer-events: none;
      animation: uwc-tb-ripple 480ms ease-out forwards;
    }
  `
];

// src/togglebutton/index.ts
var UwcToggleButton = class extends i4 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.onLabel = "Yes";
    this.offLabel = "No";
    this.size = "medium";
    this.outline = false;
    this.disabled = false;
  }
  // ── Handlers ─────────────────────────────────────────────────────
  _onChange(e9) {
    const input = e9.target;
    this.checked = input.checked;
    this._spawnRipple(e9);
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { checked: this.checked, originalEvent: e9 }
    }));
  }
  _spawnRipple(e9) {
    const btn = this.shadowRoot?.querySelector('[part="button"]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x2 = (e9.clientX || rect.left + rect.width / 2) - rect.left - size / 2;
    const y3 = (e9.clientY || rect.top + rect.height / 2) - rect.top - size / 2;
    const span = document.createElement("span");
    span.className = "uwc-tb-ripple";
    span.style.cssText = `width:${size}px;height:${size}px;left:${x2}px;top:${y3}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove(), { once: true });
  }
  // ── Render ────────────────────────────────────────────────────────
  _renderIcon() {
    const iconName = this.checked ? this.onIcon : this.offIcon;
    if (!iconName) return A;
    return b2`<uwc-icon class="uwc-tb__icon" name=${iconName} size="14px"></uwc-icon>`;
  }
  render() {
    const label = this.checked ? this.onLabel : this.offLabel;
    return b2`
      <label part="button" class="uwc-tb" aria-pressed=${this.checked}>
        <input
          type="checkbox"
          .checked=${this.checked}
          name=${o6(this.name)}
          ?disabled=${this.disabled}
          @change=${this._onChange}
        />
        ${this._renderIcon()}
        <span class="uwc-tb__label">${label}</span>
      </label>
    `;
  }
};
UwcToggleButton.styles = [styles_default14];
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcToggleButton.prototype, "checked", 2);
__decorateClass([
  n4({ attribute: "on-label" })
], UwcToggleButton.prototype, "onLabel", 2);
__decorateClass([
  n4({ attribute: "off-label" })
], UwcToggleButton.prototype, "offLabel", 2);
__decorateClass([
  n4({ attribute: "on-icon" })
], UwcToggleButton.prototype, "onIcon", 2);
__decorateClass([
  n4({ attribute: "off-icon" })
], UwcToggleButton.prototype, "offIcon", 2);
__decorateClass([
  n4()
], UwcToggleButton.prototype, "name", 2);
__decorateClass([
  n4({ reflect: true })
], UwcToggleButton.prototype, "size", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcToggleButton.prototype, "outline", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcToggleButton.prototype, "disabled", 2);

// src/togglebutton/react.ts
var UwcToggleButton2 = createComponent15({
  tagName: "uwc-togglebutton",
  elementClass: UwcToggleButton,
  react: React15,
  events: {
    onUwcChange: "uwc-change"
  }
});

// src/toggleswitch/react.ts
import { createComponent as createComponent16 } from "@lit/react";
import React16 from "react";

// src/toggleswitch/styles.ts
var styles_default15 = [
  hostReset,
  i`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
    }
    :host([disabled]) {
      pointer-events: none;
      opacity: 0.6;
    }

    /* ── Track ──────────────────────────────────────────────────────────────── */
    .uwc-ts {
      --_width:    var(--uwc-switch-width,    2.75rem);
      --_height:   var(--uwc-switch-height,   1.5rem);
      --_radius:   var(--uwc-switch-radius,   ${radiusFull});
      --_bg-off:   var(--uwc-switch-bg-off,   #d1d5db);
      --_bg-on:    var(--uwc-switch-bg-on,    var(--uwc-color-primary, ${primary}));
      --_color:    var(--uwc-switch-color,    var(--uwc-color-primary, ${primary}));
      --_dot-size: calc(var(--_height) - 0.25rem);

      position:       relative;
      display:        inline-flex;
      align-items:    center;
      width:          var(--_width);
      height:         var(--_height);
      flex-shrink:    0;
      border-radius:  var(--_radius);
      background:     var(--_bg-off);
      transition:     background-color ${durationBase};
    }

    /* Hidden input */
    input[type="checkbox"] {
      position: absolute;
      inset: 0;
      opacity: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      cursor: pointer;
    }

    /* On state */
    :host([checked]) .uwc-ts { background: var(--_bg-on); }

    /* Focus ring */
    .uwc-ts:focus-within {
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--_color) 25%, transparent);
    }

    /* ── Dot / thumb ────────────────────────────────────────────────────────── */
    .uwc-ts__dot {
      position:      absolute;
      left:          0.125rem;
      width:         var(--_dot-size);
      height:        var(--_dot-size);
      border-radius: 50%;
      background:    #fff;
      box-shadow:    0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.12);
      transition:    transform ${durationBase} ${easingStandard};
      pointer-events: none;
    }
    :host([checked]) .uwc-ts__dot {
      transform: translateX(calc(var(--_width) - var(--_dot-size) - 0.25rem));
    }

    /* ── Invalid ────────────────────────────────────────────────────────────── */
    :host([invalid]) .uwc-ts {
      box-shadow: 0 0 0 2px var(--uwc-color-danger, ${danger});
    }

    /* ── Sizes ──────────────────────────────────────────────────────────────── */
    :host([size="small"]) .uwc-ts {
      --_width: 2.25rem;
      --_height: 1.25rem;
    }
    :host([size="large"]) .uwc-ts {
      --_width: 3.25rem;
      --_height: 1.75rem;
    }

    /* ── Label ──────────────────────────────────────────────────────────────── */
    .uwc-ts__label {
      font-size:   var(--uwc-switch-font-size, ${fontSizeMd});
      color:       var(--uwc-switch-label-color, ${text});
      line-height: 1.4;
    }
  `
];

// src/toggleswitch/index.ts
var UwcToggleSwitch = class extends i4 {
  constructor() {
    super(...arguments);
    this.checked = false;
    this.size = "medium";
    this.disabled = false;
    this.invalid = false;
  }
  // ── Handlers ─────────────────────────────────────────────────────
  _onChange(e9) {
    const input = e9.target;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent("uwc-change", {
      bubbles: true,
      composed: true,
      detail: { checked: this.checked, originalEvent: e9 }
    }));
  }
  // ── Render ────────────────────────────────────────────────────────
  render() {
    const labelContent = this.label ? b2`<span part="label" class="uwc-ts__label">${this.label}</span>` : b2`<slot part="label" class="uwc-ts__label"></slot>`;
    return b2`
      <label style="display:inline-flex;align-items:center;gap:0.5rem;cursor:${this.disabled ? "not-allowed" : "pointer"}">
        <span part="track" class="uwc-ts" role="switch" aria-checked=${this.checked}>
          <input
            type="checkbox"
            .checked=${this.checked}
            name=${o6(this.name)}
            ?disabled=${this.disabled}
            @change=${this._onChange}
          />
          <span part="dot" class="uwc-ts__dot"></span>
        </span>
        ${labelContent}
      </label>
    `;
  }
};
UwcToggleSwitch.styles = [styles_default15];
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcToggleSwitch.prototype, "checked", 2);
__decorateClass([
  n4()
], UwcToggleSwitch.prototype, "label", 2);
__decorateClass([
  n4()
], UwcToggleSwitch.prototype, "name", 2);
__decorateClass([
  n4({ reflect: true })
], UwcToggleSwitch.prototype, "size", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcToggleSwitch.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcToggleSwitch.prototype, "invalid", 2);

// src/toggleswitch/react.ts
var UwcToggleSwitch2 = createComponent16({
  tagName: "uwc-toggleswitch",
  elementClass: UwcToggleSwitch,
  react: React16,
  events: {
    onUwcChange: "uwc-change"
  }
});

// src/tooltip/react.ts
import { createComponent as createComponent17 } from "@lit/react";
import React17 from "react";

// src/tooltip/styles.ts
var styles_default16 = [
  hostReset,
  floatingPanel(".panel", {
    scaleFrom: "scale(0.93)",
    scaleTo: "scale(1)",
    durationVar: "--uwc-tooltip-duration",
    durationDefault: "120ms",
    easing: "ease"
  }),
  placementOriginsExtended,
  i`
    :host { display: contents; }
    slot[name="trigger"] { display: contents; }

    /* ── Panel (visual) ─────────────────────────────────────────────────────── */
    .panel {
      overflow: visible;
      --bg: var(--uwc-tooltip-bg, #1c1c22);
      background:    var(--bg);
      border-radius: var(--uwc-tooltip-radius,    7px);
      border:        none;
      box-shadow:    var(--uwc-tooltip-shadow,    ${shadowLg});
      z-index:       var(--uwc-tooltip-z,         ${zTooltip});
      max-width:     var(--uwc-tooltip-max-width, 280px);
    }

    /* ── Text content ───────────────────────────────────────────────────────── */
    .text {
      padding: 6px 10px;
      font-size:   var(--uwc-tooltip-font-size, ${fontSizeXs});
      line-height: 1.5;
      color:       var(--uwc-tooltip-color, rgba(255,255,255,0.88));
      white-space: nowrap;
    }

    /* ── Arrow ──────────────────────────────────────────────────────────────── */
    .arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--bg);
      transform: rotate(45deg);
      border-radius: ${radiusXs};
      z-index: -1;
    }
  `
];

// src/tooltip/index.ts
var ARROW_HALF = 6;
var UwcTooltip = class extends i4 {
  constructor() {
    super(...arguments);
    this.placement = "top";
    this.offset = 10;
    this.showDelay = 400;
    this.hideDelay = 100;
    this.disabled = false;
    this.arrow = true;
    this.triggerMode = "hover focus";
    this.maxWidth = "260px";
    this._showTimer = null;
    this._hideTimer = null;
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const cleanups = [];
        if (this.triggerMode.includes("hover")) {
          const onEnter = () => this._scheduleShow();
          const onLeave = () => this._scheduleHide();
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(
            () => el.removeEventListener("mouseenter", onEnter),
            () => el.removeEventListener("mouseleave", onLeave)
          );
        }
        if (this.triggerMode.includes("focus")) {
          const onFocus = () => {
            this._cancelTimers();
            this._pc.show();
          };
          const onBlur = () => {
            this._cancelTimers();
            this._pc.hide();
          };
          el.addEventListener("focus", onFocus);
          el.addEventListener("blur", onBlur);
          cleanups.push(
            () => el.removeEventListener("focus", onFocus),
            () => el.removeEventListener("blur", onBlur)
          );
        }
        if (this.triggerMode === "click") {
          const onClick = (e9) => {
            e9.stopPropagation();
            this._pc.toggle();
          };
          el.addEventListener("click", onClick);
          cleanups.push(() => el.removeEventListener("click", onClick));
        }
        const panelId = "panel";
        el.setAttribute("aria-describedby", panelId);
        return () => {
          cleanups.forEach((fn) => fn());
          el.removeAttribute("aria-describedby");
        };
      },
      dismissOnEscape: true,
      afterPosition: ({ triggerRect, panelCoords, panelEl }) => {
        if (this.arrow) this._positionArrow(triggerRect, panelCoords, panelEl);
      }
    });
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  firstUpdated() {
    this._pc.firstUpdated(
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
    const panel = this._panel;
    panel?.addEventListener("mouseenter", () => this._cancelTimers());
    panel?.addEventListener("mouseleave", () => this._scheduleHide());
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(
      changed,
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  // ── Timer helpers ────────────────────────────────────────────────
  _cancelTimers() {
    if (this._showTimer !== null) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
    if (this._hideTimer !== null) {
      clearTimeout(this._hideTimer);
      this._hideTimer = null;
    }
  }
  _scheduleShow() {
    if (this.disabled) return;
    this._cancelTimers();
    this._showTimer = setTimeout(() => this._pc.show(), this.showDelay);
  }
  _scheduleHide() {
    this._cancelTimers();
    this._hideTimer = setTimeout(() => this._pc.hide(), this.hideDelay);
  }
  // ── Arrow positioning ────────────────────────────────────────────
  /**
   * Position the arrow element on the correct panel edge,
   * sliding along that edge so it always points at the trigger's center.
   * The arrow is a rotated square; ARROW_HALF px places it half-in, half-out.
   */
  _positionArrow(tRect, coords, panelEl) {
    const arrow = this._arrow;
    if (!arrow) return;
    const [side] = this.placement.split("-");
    const pRect = panelEl.getBoundingClientRect();
    const MIN = 10;
    arrow.style.cssText = "";
    if (side === "top" || side === "bottom") {
      const cx = tRect.left + tRect.width / 2;
      const max = pRect.width - ARROW_HALF * 2 - MIN;
      const al = Math.max(MIN, Math.min(cx - coords.left - ARROW_HALF, max));
      arrow.style.left = `${al}px`;
      arrow.style[side === "bottom" ? "top" : "bottom"] = `${-ARROW_HALF}px`;
    } else {
      const cy = tRect.top + tRect.height / 2;
      const max = pRect.height - ARROW_HALF * 2 - MIN;
      const at = Math.max(MIN, Math.min(cy - coords.top - ARROW_HALF, max));
      arrow.style.top = `${at}px`;
      arrow.style[side === "right" ? "left" : "right"] = `${-ARROW_HALF}px`;
    }
  }
  // ── Public API ───────────────────────────────────────────────────
  show() {
    this._cancelTimers();
    this._pc.show();
  }
  hide() {
    this._cancelTimers();
    this._pc.hide();
  }
  get isOpen() {
    return this._pc.open;
  }
  // ── Slot detection ───────────────────────────────────────────────
  _hasContentSlot() {
    return Array.from(this.children).some((c5) => c5.slot === "content");
  }
  // ── Render ───────────────────────────────────────────────────────
  render() {
    const isExternal = Boolean(this.triggerId);
    const open = this._pc.open;
    return b2`
      ${!isExternal ? b2`<slot name="trigger" part="trigger"></slot>` : A}

      <div
        id="panel"
        part="panel"
        popover="manual"
        role="tooltip"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
        style="max-width: ${this.maxWidth}"
      >
        ${this.arrow ? b2`<div id="arrow" part="arrow" class="arrow"></div>` : A}

        ${this.content && !this._hasContentSlot() ? b2`<div part="text" class="text">${this.content}</div>` : A}

        <slot name="content"></slot>
        <slot></slot>
      </div>`;
  }
};
UwcTooltip.styles = [styles_default16];
__decorateClass([
  n4({ type: String })
], UwcTooltip.prototype, "triggerId", 2);
__decorateClass([
  n4({ type: String })
], UwcTooltip.prototype, "content", 2);
__decorateClass([
  n4({ type: String })
], UwcTooltip.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcTooltip.prototype, "offset", 2);
__decorateClass([
  n4({ type: Number, attribute: "show-delay" })
], UwcTooltip.prototype, "showDelay", 2);
__decorateClass([
  n4({ type: Number, attribute: "hide-delay" })
], UwcTooltip.prototype, "hideDelay", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcTooltip.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcTooltip.prototype, "arrow", 2);
__decorateClass([
  n4({ type: String, attribute: "trigger-mode" })
], UwcTooltip.prototype, "triggerMode", 2);
__decorateClass([
  n4({ type: String, attribute: "max-width" })
], UwcTooltip.prototype, "maxWidth", 2);
__decorateClass([
  e5("#panel")
], UwcTooltip.prototype, "_panel", 2);
__decorateClass([
  e5("#arrow")
], UwcTooltip.prototype, "_arrow", 2);

// src/tooltip/react.ts
var UwcTooltip2 = createComponent17({
  tagName: "uwc-tooltip",
  elementClass: UwcTooltip,
  react: React17,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide"
  }
});
export {
  UwcButton2 as UwcButton,
  UwcCheckbox2 as UwcCheckbox,
  UwcColorPicker2 as UwcColorPicker,
  UwcDatatable2 as UwcDatatable,
  UwcDatepicker2 as UwcDatepicker,
  UwcDropdown2 as UwcDropdown,
  UwcIcon2 as UwcIcon,
  UwcInputText2 as UwcInputText,
  UwcListbox2 as UwcListbox,
  UwcMenu2 as UwcMenu,
  UwcOverlay2 as UwcOverlay,
  UwcPaginator2 as UwcPaginator,
  UwcPopover2 as UwcPopover,
  UwcRadioButton2 as UwcRadioButton,
  UwcToggleButton2 as UwcToggleButton,
  UwcToggleSwitch2 as UwcToggleSwitch,
  UwcTooltip2 as UwcTooltip
};
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
lit-html/directives/repeat.js:
lit-html/directives/unsafe-html.js:
lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
//# sourceMappingURL=uwc.bundle.react.js.map
