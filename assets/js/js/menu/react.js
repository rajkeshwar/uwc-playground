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

// src/menu/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t5, e8, o7) {
    if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5, this.t = e8;
  }
  get styleSheet() {
    let t5 = this.o;
    const s5 = this.t;
    if (e && void 0 === t5) {
      const e8 = void 0 !== s5 && 1 === s5.length;
      e8 && (t5 = o.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s5, t5));
    }
    return t5;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
var i = (t5, ...e8) => {
  const o7 = 1 === t5.length ? t5[0] : e8.reduce((e9, s5, o8) => e9 + ((t6) => {
    if (true === t6._$cssResult$) return t6.cssText;
    if ("number" == typeof t6) return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t5[o8 + 1], t5[0]);
  return new n(o7, t5, s);
};
var S = (s5, o7) => {
  if (e) s5.adoptedStyleSheets = o7.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
  else for (const e8 of o7) {
    const o8 = document.createElement("style"), n6 = t.litNonce;
    void 0 !== n6 && o8.setAttribute("nonce", n6), o8.textContent = e8.cssText, s5.appendChild(o8);
  }
};
var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e8 = "";
  for (const s5 of t6.cssRules) e8 += s5.cssText;
  return r(e8);
})(t5) : t5;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t5, s5) => t5;
var u = { toAttribute(t5, s5) {
  switch (s5) {
    case Boolean:
      t5 = t5 ? l : null;
      break;
    case Object:
    case Array:
      t5 = null == t5 ? t5 : JSON.stringify(t5);
  }
  return t5;
}, fromAttribute(t5, s5) {
  let i8 = t5;
  switch (s5) {
    case Boolean:
      i8 = null !== t5;
      break;
    case Number:
      i8 = null === t5 ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        i8 = JSON.parse(t5);
      } catch (t6) {
        i8 = null;
      }
  }
  return i8;
} };
var f = (t5, s5) => !i2(t5, s5);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t5) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t5);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t5, s5 = b) {
    if (s5.state && (s5.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t5) && ((s5 = Object.create(s5)).wrapped = true), this.elementProperties.set(t5, s5), !s5.noAccessor) {
      const i8 = /* @__PURE__ */ Symbol(), h4 = this.getPropertyDescriptor(t5, i8, s5);
      void 0 !== h4 && e2(this.prototype, t5, h4);
    }
  }
  static getPropertyDescriptor(t5, s5, i8) {
    const { get: e8, set: r6 } = h(this.prototype, t5) ?? { get() {
      return this[s5];
    }, set(t6) {
      this[s5] = t6;
    } };
    return { get: e8, set(s6) {
      const h4 = e8?.call(this);
      r6?.call(this, s6), this.requestUpdate(t5, h4, i8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t5) {
    return this.elementProperties.get(t5) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t5 = n2(this);
    t5.finalize(), void 0 !== t5.l && (this.l = [...t5.l]), this.elementProperties = new Map(t5.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t6 = this.properties, s5 = [...r2(t6), ...o2(t6)];
      for (const i8 of s5) this.createProperty(i8, t6[i8]);
    }
    const t5 = this[Symbol.metadata];
    if (null !== t5) {
      const s5 = litPropertyMetadata.get(t5);
      if (void 0 !== s5) for (const [t6, i8] of s5) this.elementProperties.set(t6, i8);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t6, s5] of this.elementProperties) {
      const i8 = this._$Eu(t6, s5);
      void 0 !== i8 && this._$Eh.set(i8, t6);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i8 = [];
    if (Array.isArray(s5)) {
      const e8 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e8) i8.unshift(c(s6));
    } else void 0 !== s5 && i8.push(c(s5));
    return i8;
  }
  static _$Eu(t5, s5) {
    const i8 = s5.attribute;
    return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t5) => t5(this));
  }
  addController(t5) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t5), void 0 !== this.renderRoot && this.isConnected && t5.hostConnected?.();
  }
  removeController(t5) {
    this._$EO?.delete(t5);
  }
  _$E_() {
    const t5 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
    for (const i8 of s5.keys()) this.hasOwnProperty(i8) && (t5.set(i8, this[i8]), delete this[i8]);
    t5.size > 0 && (this._$Ep = t5);
  }
  createRenderRoot() {
    const t5 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t5, this.constructor.elementStyles), t5;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t5) => t5.hostConnected?.());
  }
  enableUpdating(t5) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t5) => t5.hostDisconnected?.());
  }
  attributeChangedCallback(t5, s5, i8) {
    this._$AK(t5, i8);
  }
  _$ET(t5, s5) {
    const i8 = this.constructor.elementProperties.get(t5), e8 = this.constructor._$Eu(t5, i8);
    if (void 0 !== e8 && true === i8.reflect) {
      const h4 = (void 0 !== i8.converter?.toAttribute ? i8.converter : u).toAttribute(s5, i8.type);
      this._$Em = t5, null == h4 ? this.removeAttribute(e8) : this.setAttribute(e8, h4), this._$Em = null;
    }
  }
  _$AK(t5, s5) {
    const i8 = this.constructor, e8 = i8._$Eh.get(t5);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t6 = i8.getPropertyOptions(e8), h4 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
      this._$Em = e8;
      const r6 = h4.fromAttribute(s5, t6.type);
      this[e8] = r6 ?? this._$Ej?.get(e8) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t5, s5, i8, e8 = false, h4) {
    if (void 0 !== t5) {
      const r6 = this.constructor;
      if (false === e8 && (h4 = this[t5]), i8 ?? (i8 = r6.getPropertyOptions(t5)), !((i8.hasChanged ?? f)(h4, s5) || i8.useDefault && i8.reflect && h4 === this._$Ej?.get(t5) && !this.hasAttribute(r6._$Eu(t5, i8)))) return;
      this.C(t5, s5, i8);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t5, s5, { useDefault: i8, reflect: e8, wrapped: h4 }, r6) {
    i8 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r6 ?? s5 ?? this[t5]), true !== h4 || void 0 !== r6) || (this._$AL.has(t5) || (this.hasUpdated || i8 || (s5 = void 0), this._$AL.set(t5, s5)), true === e8 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t6) {
      Promise.reject(t6);
    }
    const t5 = this.scheduleUpdate();
    return null != t5 && await t5, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t7, s6] of this._$Ep) this[t7] = s6;
        this._$Ep = void 0;
      }
      const t6 = this.constructor.elementProperties;
      if (t6.size > 0) for (const [s6, i8] of t6) {
        const { wrapped: t7 } = i8, e8 = this[s6];
        true !== t7 || this._$AL.has(s6) || void 0 === e8 || this.C(s6, void 0, i8, e8);
      }
    }
    let t5 = false;
    const s5 = this._$AL;
    try {
      t5 = this.shouldUpdate(s5), t5 ? (this.willUpdate(s5), this._$EO?.forEach((t6) => t6.hostUpdate?.()), this.update(s5)) : this._$EM();
    } catch (s6) {
      throw t5 = false, this._$EM(), s6;
    }
    t5 && this._$AE(s5);
  }
  willUpdate(t5) {
  }
  _$AE(t5) {
    this._$EO?.forEach((t6) => t6.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
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
  shouldUpdate(t5) {
    return true;
  }
  update(t5) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t6) => this._$ET(t6, this[t6]))), this._$EM();
  }
  updated(t5) {
  }
  firstUpdated(t5) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t5) => t5;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
var u2 = Array.isArray;
var d2 = (t5) => u2(t5) || "function" == typeof t5?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t5) => (i8, ...s5) => ({ _$litType$: t5, strings: i8, values: s5 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t5, i8) {
  if (!u2(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i8) : i8;
}
var N = (t5, i8) => {
  const s5 = t5.length - 1, e8 = [];
  let n6, l3 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c5 = v;
  for (let i9 = 0; i9 < s5; i9++) {
    const s6 = t5[i9];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n6 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n6 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n6 = void 0);
    const x2 = c5 === p2 && t5[i9 + 1].startsWith("/>") ? " " : "";
    l3 += c5 === v ? s6 + r3 : d3 >= 0 ? (e8.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i9 : x2);
  }
  return [V(t5, l3 + (t5[s5] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t5, _$litType$: i8 }, e8) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u5 = t5.length - 1, d3 = this.parts, [f3, v3] = N(t5, i8);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i8 || 3 === i8) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t6 of r6.getAttributeNames()) if (t6.endsWith(h2)) {
          const i9 = v3[a3++], s5 = r6.getAttribute(t6).split(o3), e9 = /([.?@])?(.*)/.exec(i9);
          d3.push({ type: 1, index: l3, name: e9[2], strings: s5, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r6.removeAttribute(t6);
        } else t6.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t6));
        if (y2.test(r6.tagName)) {
          const t6 = r6.textContent.split(o3), i9 = t6.length - 1;
          if (i9 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s5 = 0; s5 < i9; s5++) r6.append(t6[s5], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t6[i9], c3());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t6 = -1;
        for (; -1 !== (t6 = r6.data.indexOf(o3, t6 + 1)); ) d3.push({ type: 7, index: l3 }), t6 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t5, i8) {
    const s5 = l2.createElement("template");
    return s5.innerHTML = t5, s5;
  }
};
function M(t5, i8, s5 = t5, e8) {
  if (i8 === E) return i8;
  let h4 = void 0 !== e8 ? s5._$Co?.[e8] : s5._$Cl;
  const o7 = a2(i8) ? void 0 : i8._$litDirective$;
  return h4?.constructor !== o7 && (h4?._$AO?.(false), void 0 === o7 ? h4 = void 0 : (h4 = new o7(t5), h4._$AT(t5, s5, e8)), void 0 !== e8 ? (s5._$Co ?? (s5._$Co = []))[e8] = h4 : s5._$Cl = h4), void 0 !== h4 && (i8 = M(t5, h4._$AS(t5, i8.values), h4, e8)), i8;
}
var R = class {
  constructor(t5, i8) {
    this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i8;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t5) {
    const { el: { content: i8 }, parts: s5 } = this._$AD, e8 = (t5?.creationScope ?? l2).importNode(i8, true);
    P.currentNode = e8;
    let h4 = P.nextNode(), o7 = 0, n6 = 0, r6 = s5[0];
    for (; void 0 !== r6; ) {
      if (o7 === r6.index) {
        let i9;
        2 === r6.type ? i9 = new k(h4, h4.nextSibling, this, t5) : 1 === r6.type ? i9 = new r6.ctor(h4, r6.name, r6.strings, this, t5) : 6 === r6.type && (i9 = new Z(h4, this, t5)), this._$AV.push(i9), r6 = s5[++n6];
      }
      o7 !== r6?.index && (h4 = P.nextNode(), o7++);
    }
    return P.currentNode = l2, e8;
  }
  p(t5) {
    let i8 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i8), i8 += s5.strings.length - 2) : s5._$AI(t5[i8])), i8++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t5, i8, s5, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i8, this._$AM = s5, this.options = e8, this._$Cv = e8?.isConnected ?? true;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i8 = this._$AM;
    return void 0 !== i8 && 11 === t5?.nodeType && (t5 = i8.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i8 = this) {
    t5 = M(this, t5, i8), a2(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== E && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : d2(t5) ? this.k(t5) : this._(t5);
  }
  O(t5) {
    return this._$AA.parentNode.insertBefore(t5, this._$AB);
  }
  T(t5) {
    this._$AH !== t5 && (this._$AR(), this._$AH = this.O(t5));
  }
  _(t5) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t5 : this.T(l2.createTextNode(t5)), this._$AH = t5;
  }
  $(t5) {
    const { values: i8, _$litType$: s5 } = t5, e8 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = S2.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e8) this._$AH.p(i8);
    else {
      const t6 = new R(e8, this), s6 = t6.u(this.options);
      t6.p(i8), this.T(s6), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i8 = C.get(t5.strings);
    return void 0 === i8 && C.set(t5.strings, i8 = new S2(t5)), i8;
  }
  k(t5) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i8 = this._$AH;
    let s5, e8 = 0;
    for (const h4 of t5) e8 === i8.length ? i8.push(s5 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s5 = i8[e8], s5._$AI(h4), e8++;
    e8 < i8.length && (this._$AR(s5 && s5._$AB.nextSibling, e8), i8.length = e8);
  }
  _$AR(t5 = this._$AA.nextSibling, s5) {
    for (this._$AP?.(false, true, s5); t5 !== this._$AB; ) {
      const s6 = i3(t5).nextSibling;
      i3(t5).remove(), t5 = s6;
    }
  }
  setConnected(t5) {
    void 0 === this._$AM && (this._$Cv = t5, this._$AP?.(t5));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t5, i8, s5, e8, h4) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i8, this._$AM = e8, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t5, i8 = this, s5, e8) {
    const h4 = this.strings;
    let o7 = false;
    if (void 0 === h4) t5 = M(this, t5, i8, 0), o7 = !a2(t5) || t5 !== this._$AH && t5 !== E, o7 && (this._$AH = t5);
    else {
      const e9 = t5;
      let n6, r6;
      for (t5 = h4[0], n6 = 0; n6 < h4.length - 1; n6++) r6 = M(this, e9[s5 + n6], i8, n6), r6 === E && (r6 = this._$AH[n6]), o7 || (o7 = !a2(r6) || r6 !== this._$AH[n6]), r6 === A ? t5 = A : t5 !== A && (t5 += (r6 ?? "") + h4[n6 + 1]), this._$AH[n6] = r6;
    }
    o7 && !e8 && this.j(t5);
  }
  j(t5) {
    t5 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t5) {
    this.element[this.name] = t5 === A ? void 0 : t5;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t5) {
    this.element.toggleAttribute(this.name, !!t5 && t5 !== A);
  }
};
var z = class extends H {
  constructor(t5, i8, s5, e8, h4) {
    super(t5, i8, s5, e8, h4), this.type = 5;
  }
  _$AI(t5, i8 = this) {
    if ((t5 = M(this, t5, i8, 0) ?? A) === E) return;
    const s5 = this._$AH, e8 = t5 === A && s5 !== A || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h4 = t5 !== A && (s5 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var Z = class {
  constructor(t5, i8, s5) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    M(this, t5);
  }
};
var j = { M: h2, P: o3, A: n3, C: 1, L: N, R, D: d2, V: M, I: k, H, N: L, U: z, B: I, F: Z };
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t5, i8, s5) => {
  const e8 = s5?.renderBefore ?? i8;
  let h4 = e8._$litPart$;
  if (void 0 === h4) {
    const t6 = s5?.renderBefore ?? null;
    e8._$litPart$ = h4 = new k(i8.insertBefore(c3(), t6), t6, void 0, s5 ?? {});
  }
  return h4._$AI(t5), h4;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t5 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t5.firstChild), t5;
  }
  update(t5) {
    const r6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = D(r6, this.renderRoot, this.renderOptions);
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

// src/menu/styles.ts
var styles_default = [
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

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t5 = o5, e8, r6) => {
  const { kind: n6, metadata: i8 } = r6;
  let s5 = globalThis.litPropertyMetadata.get(i8);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i8, s5 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t5 = Object.create(t5)).wrapped = true), s5.set(r6.name, t5), "accessor" === n6) {
    const { name: o7 } = r6;
    return { set(r7) {
      const n7 = e8.get.call(this);
      e8.set.call(this, r7), this.requestUpdate(o7, n7, t5, true, r7);
    }, init(e9) {
      return void 0 !== e9 && this.C(o7, void 0, t5, e9), e9;
    } };
  }
  if ("setter" === n6) {
    const { name: o7 } = r6;
    return function(r7) {
      const n7 = this[o7];
      e8.call(this, r7), this.requestUpdate(o7, n7, t5, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n6);
};
function n4(t5) {
  return (e8, o7) => "object" == typeof o7 ? r4(t5, e8, o7) : ((t6, e9, o8) => {
    const r6 = e9.hasOwnProperty(o8);
    return e9.constructor.createProperty(o8, t6), r6 ? Object.getOwnPropertyDescriptor(e9, o8) : void 0;
  })(t5, e8, o7);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t5, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t5 && Object.defineProperty(e8, t5, c5), c5);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r6) {
  return (n6, s5, i8) => {
    const o7 = (t5) => t5.renderRoot?.querySelector(e8) ?? null;
    if (r6) {
      const { get: e9, set: r7 } = "object" == typeof s5 ? n6 : i8 ?? /* @__PURE__ */ (() => {
        const t5 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t5];
        }, set(e10) {
          this[t5] = e10;
        } };
      })();
      return e4(n6, s5, { get() {
        let t5 = e9.call(this);
        return void 0 === t5 && (t5 = o7(this), (null !== t5 || this.hasUpdated) && r7.call(this, t5)), t5;
      } });
    }
    return e4(n6, s5, { get() {
      return o7(this);
    } });
  };
}

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t5) => (...e8) => ({ _$litDirective$: t5, values: e8 });
var i5 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e8, i8) {
    this._$Ct = t5, this._$AM = e8, this._$Ci = i8;
  }
  _$AS(t5, e8) {
    return this.update(t5, e8);
  }
  update(t5, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directive-helpers.js
var { I: t4 } = j;
var i6 = (o7) => o7;
var s4 = () => document.createComment("");
var v2 = (o7, n6, e8) => {
  const l3 = o7._$AA.parentNode, d3 = void 0 === n6 ? o7._$AB : n6._$AA;
  if (void 0 === e8) {
    const i8 = l3.insertBefore(s4(), d3), n7 = l3.insertBefore(s4(), d3);
    e8 = new t4(i8, n7, o7, o7.options);
  } else {
    const t5 = e8._$AB.nextSibling, n7 = e8._$AM, c5 = n7 !== o7;
    if (c5) {
      let t6;
      e8._$AQ?.(o7), e8._$AM = o7, void 0 !== e8._$AP && (t6 = o7._$AU) !== n7._$AU && e8._$AP(t6);
    }
    if (t5 !== d3 || c5) {
      let o8 = e8._$AA;
      for (; o8 !== t5; ) {
        const t6 = i6(o8).nextSibling;
        i6(l3).insertBefore(o8, d3), o8 = t6;
      }
    }
  }
  return e8;
};
var u3 = (o7, t5, i8 = o7) => (o7._$AI(t5, i8), o7);
var m2 = {};
var p3 = (o7, t5 = m2) => o7._$AH = t5;
var M2 = (o7) => o7._$AH;
var h3 = (o7) => {
  o7._$AR(), o7._$AA.remove();
};

// node_modules/lit-html/directives/repeat.js
var u4 = (e8, s5, t5) => {
  const r6 = /* @__PURE__ */ new Map();
  for (let l3 = s5; l3 <= t5; l3++) r6.set(e8[l3], l3);
  return r6;
};
var c4 = e6(class extends i5 {
  constructor(e8) {
    if (super(e8), e8.type !== t3.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e8, s5, t5) {
    let r6;
    void 0 === t5 ? t5 = s5 : void 0 !== s5 && (r6 = s5);
    const l3 = [], o7 = [];
    let i8 = 0;
    for (const s6 of e8) l3[i8] = r6 ? r6(s6, i8) : i8, o7[i8] = t5(s6, i8), i8++;
    return { values: o7, keys: l3 };
  }
  render(e8, s5, t5) {
    return this.dt(e8, s5, t5).values;
  }
  update(s5, [t5, r6, c5]) {
    const d3 = M2(s5), { values: p4, keys: a3 } = this.dt(t5, r6, c5);
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
      const e8 = y3.get(a3[k2]), t6 = void 0 !== e8 ? d3[e8] : null;
      if (null === t6) {
        const e9 = v2(s5, d3[x2]);
        u3(e9, p4[k2]), v3[k2] = e9;
      } else v3[k2] = u3(t6, p4[k2]), v2(s5, d3[x2], t6), d3[e8] = null;
      k2++;
    } else h3(d3[j2]), j2--;
    else h3(d3[x2]), x2++;
    for (; k2 <= w2; ) {
      const e8 = v2(s5, v3[w2 + 1]);
      u3(e8, p4[k2]), v3[k2++] = e8;
    }
    for (; x2 <= j2; ) {
      const e8 = d3[x2++];
      null !== e8 && h3(e8);
    }
    return this.ut = a3, p3(s5, v3), E;
  }
});

// node_modules/lit-html/directives/class-map.js
var e7 = e6(class extends i5 {
  constructor(t5) {
    if (super(t5), t5.type !== t3.ATTRIBUTE || "class" !== t5.name || t5.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return " " + Object.keys(t5).filter((s5) => t5[s5]).join(" ") + " ";
  }
  update(s5, [i8]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
      for (const t5 in i8) i8[t5] && !this.nt?.has(t5) && this.st.add(t5);
      return this.render(i8);
    }
    const r6 = s5.element.classList;
    for (const t5 of this.st) t5 in i8 || (r6.remove(t5), this.st.delete(t5));
    for (const t5 in i8) {
      const s6 = !!i8[t5];
      s6 === this.st.has(t5) || this.nt?.has(t5) || (s6 ? (r6.add(t5), this.st.add(t5)) : (r6.remove(t5), this.st.delete(t5)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/style-map.js
var n5 = "important";
var i7 = " !" + n5;
var o6 = e6(class extends i5 {
  constructor(t5) {
    if (super(t5), t5.type !== t3.ATTRIBUTE || "style" !== t5.name || t5.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return Object.keys(t5).reduce((e8, r6) => {
      const s5 = t5[r6];
      return null == s5 ? e8 : e8 + `${r6 = r6.includes("-") ? r6 : r6.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s5};`;
    }, "");
  }
  update(e8, [r6]) {
    const { style: s5 } = e8.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r6)), this.render(r6);
    for (const t5 of this.ft) null == r6[t5] && (this.ft.delete(t5), t5.includes("-") ? s5.removeProperty(t5) : s5[t5] = null);
    for (const t5 in r6) {
      const e9 = r6[t5];
      if (null != e9) {
        this.ft.add(t5);
        const r7 = "string" == typeof e9 && e9.endsWith(i7);
        t5.includes("-") || r7 ? s5.setProperty(t5, r7 ? e9.slice(0, -11) : e9, r7 ? n5 : "") : s5[t5] = e9;
      }
    }
    return E;
  }
});

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
  _handleOutsideClick(e8) {
    const path = e8.composedPath();
    const panel = this._getPanelEl();
    if (panel && !path.includes(panel) && !path.includes(this.triggerEl)) {
      this.hide();
    }
  }
  _handleEscapeKey(e8) {
    if (e8.key === "Escape") {
      this.hide();
      this.triggerEl?.focus();
    }
  }
  _setOpen(val) {
    this._open = val;
    this.host.requestUpdate();
  }
};

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
        const onClick = (e8) => {
          e8.stopPropagation();
          this._pc.toggle();
        };
        const onKeydown = (e8) => {
          if ((e8.key === "ArrowDown" || e8.key === "Enter" || e8.key === " ") && !this._pc.open) {
            e8.preventDefault();
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
  _handleMenuKeydown(e8) {
    const items = this.items;
    const focusable = items.map((it, i8) => ({ it, i: i8 })).filter(({ it }) => !it.separator && it.visible !== false && !it.disabled);
    const curPos = focusable.findIndex(({ i: i8 }) => i8 === this._focusedIndex);
    switch (e8.key) {
      case "ArrowDown": {
        e8.preventDefault();
        const next = focusable[(curPos + 1) % focusable.length];
        if (next) this._focusItem(next.i);
        break;
      }
      case "ArrowUp": {
        e8.preventDefault();
        const prev = focusable[(curPos - 1 + focusable.length) % focusable.length];
        if (prev) this._focusItem(prev.i);
        break;
      }
      case "Home":
        e8.preventDefault();
        if (focusable[0]) this._focusItem(focusable[0].i);
        break;
      case "End":
        e8.preventDefault();
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
  _executeItem(item, e8) {
    if (item.disabled) return;
    const ev = { originalEvent: e8, item };
    item.command?.(ev);
    emit(this, "uwc-item-select", { item, originalEvent: e8 });
    if (!item.items?.length) this._pc.hide();
  }
  _handleItemClick(item, idx, e8) {
    e8.stopPropagation();
    if (item.separator || item.disabled) return;
    if (item.items?.length) {
      this._openSubmenuIndex = this._openSubmenuIndex === idx ? null : idx;
      return;
    }
    this._executeItem(item, e8);
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
        style=${item.style ? o6(item.style) : ""}
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
              @click=${(e8) => this._executeItem(item, e8)}
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
              @click=${(e8) => this._handleItemClick(item, idx, e8)}
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
          @click=${(e8) => {
      e8.stopPropagation();
      if (!item.disabled) this._executeItem(item, e8);
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
UwcMenu.styles = [styles_default];
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
var UwcMenu2 = createComponent({
  tagName: "uwc-menu",
  elementClass: UwcMenu,
  react: React,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide",
    onUwcItemSelect: "uwc-item-select"
  }
});
export {
  UwcMenu2 as UwcMenu
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

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
