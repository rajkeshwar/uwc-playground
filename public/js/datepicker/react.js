var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i7 = decorators.length - 1, decorator; i7 >= 0; i7--)
    if (decorator = decorators[i7])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/datepicker/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t6, e8, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e8;
  }
  get styleSheet() {
    let t6 = this.o;
    const s5 = this.t;
    if (e && void 0 === t6) {
      const e8 = void 0 !== s5 && 1 === s5.length;
      e8 && (t6 = o.get(s5)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s5, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var i = (t6, ...e8) => {
  const o6 = 1 === t6.length ? t6[0] : e8.reduce((e9, s5, o7) => e9 + ((t7) => {
    if (true === t7._$cssResult$) return t7.cssText;
    if ("number" == typeof t7) return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t6[o7 + 1], t6[0]);
  return new n(o6, t6, s);
};
var S = (s5, o6) => {
  if (e) s5.adoptedStyleSheets = o6.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else for (const e8 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e8.cssText, s5.appendChild(o7);
  }
};
var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e8 = "";
  for (const s5 of t7.cssRules) e8 += s5.cssText;
  return r(e8);
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
  let i7 = t6;
  switch (s5) {
    case Boolean:
      i7 = null !== t6;
      break;
    case Number:
      i7 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i7 = JSON.parse(t6);
      } catch (t7) {
        i7 = null;
      }
  }
  return i7;
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
      const i7 = /* @__PURE__ */ Symbol(), h4 = this.getPropertyDescriptor(t6, i7, s5);
      void 0 !== h4 && e2(this.prototype, t6, h4);
    }
  }
  static getPropertyDescriptor(t6, s5, i7) {
    const { get: e8, set: r7 } = h(this.prototype, t6) ?? { get() {
      return this[s5];
    }, set(t7) {
      this[s5] = t7;
    } };
    return { get: e8, set(s6) {
      const h4 = e8?.call(this);
      r7?.call(this, s6), this.requestUpdate(t6, h4, i7);
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
      for (const i7 of s5) this.createProperty(i7, t7[i7]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s5 = litPropertyMetadata.get(t6);
      if (void 0 !== s5) for (const [t7, i7] of s5) this.elementProperties.set(t7, i7);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s5] of this.elementProperties) {
      const i7 = this._$Eu(t7, s5);
      void 0 !== i7 && this._$Eh.set(i7, t7);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s5) {
    const i7 = [];
    if (Array.isArray(s5)) {
      const e8 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e8) i7.unshift(c(s6));
    } else void 0 !== s5 && i7.push(c(s5));
    return i7;
  }
  static _$Eu(t6, s5) {
    const i7 = s5.attribute;
    return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
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
    for (const i7 of s5.keys()) this.hasOwnProperty(i7) && (t6.set(i7, this[i7]), delete this[i7]);
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
  attributeChangedCallback(t6, s5, i7) {
    this._$AK(t6, i7);
  }
  _$ET(t6, s5) {
    const i7 = this.constructor.elementProperties.get(t6), e8 = this.constructor._$Eu(t6, i7);
    if (void 0 !== e8 && true === i7.reflect) {
      const h4 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s5, i7.type);
      this._$Em = t6, null == h4 ? this.removeAttribute(e8) : this.setAttribute(e8, h4), this._$Em = null;
    }
  }
  _$AK(t6, s5) {
    const i7 = this.constructor, e8 = i7._$Eh.get(t6);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t7 = i7.getPropertyOptions(e8), h4 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
      this._$Em = e8;
      const r7 = h4.fromAttribute(s5, t7.type);
      this[e8] = r7 ?? this._$Ej?.get(e8) ?? r7, this._$Em = null;
    }
  }
  requestUpdate(t6, s5, i7, e8 = false, h4) {
    if (void 0 !== t6) {
      const r7 = this.constructor;
      if (false === e8 && (h4 = this[t6]), i7 ?? (i7 = r7.getPropertyOptions(t6)), !((i7.hasChanged ?? f)(h4, s5) || i7.useDefault && i7.reflect && h4 === this._$Ej?.get(t6) && !this.hasAttribute(r7._$Eu(t6, i7)))) return;
      this.C(t6, s5, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t6, s5, { useDefault: i7, reflect: e8, wrapped: h4 }, r7) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t6) && (this._$Ej.set(t6, r7 ?? s5 ?? this[t6]), true !== h4 || void 0 !== r7) || (this._$AL.has(t6) || (this.hasUpdated || i7 || (s5 = void 0), this._$AL.set(t6, s5)), true === e8 && this._$Em !== t6 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t6));
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
      if (t7.size > 0) for (const [s6, i7] of t7) {
        const { wrapped: t8 } = i7, e8 = this[s6];
        true !== t8 || this._$AL.has(s6) || void 0 === e8 || this.C(s6, void 0, i7, e8);
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
var x = (t6) => (i7, ...s5) => ({ _$litType$: t6, strings: i7, values: s5 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t6, i7) {
  if (!u2(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i7) : i7;
}
var N = (t6, i7) => {
  const s5 = t6.length - 1, e8 = [];
  let n5, l4 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
  for (let i8 = 0; i8 < s5; i8++) {
    const s6 = t6[i8];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n5 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n5 = void 0);
    const x2 = c5 === p2 && t6[i8 + 1].startsWith("/>") ? " " : "";
    l4 += c5 === v ? s6 + r3 : d3 >= 0 ? (e8.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t6, l4 + (t6[s5] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t6, _$litType$: i7 }, e8) {
    let r7;
    this.parts = [];
    let l4 = 0, a3 = 0;
    const u5 = t6.length - 1, d3 = this.parts, [f3, v3] = N(t6, i7);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r7 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t7 of r7.getAttributeNames()) if (t7.endsWith(h2)) {
          const i8 = v3[a3++], s5 = r7.getAttribute(t7).split(o3), e9 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l4, name: e9[2], strings: s5, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r7.removeAttribute(t7);
        } else t7.startsWith(o3) && (d3.push({ type: 6, index: l4 }), r7.removeAttribute(t7));
        if (y2.test(r7.tagName)) {
          const t7 = r7.textContent.split(o3), i8 = t7.length - 1;
          if (i8 > 0) {
            r7.textContent = s2 ? s2.emptyScript : "";
            for (let s5 = 0; s5 < i8; s5++) r7.append(t7[s5], c3()), P.nextNode(), d3.push({ type: 2, index: ++l4 });
            r7.append(t7[i8], c3());
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
  static createElement(t6, i7) {
    const s5 = l2.createElement("template");
    return s5.innerHTML = t6, s5;
  }
};
function M(t6, i7, s5 = t6, e8) {
  if (i7 === E) return i7;
  let h4 = void 0 !== e8 ? s5._$Co?.[e8] : s5._$Cl;
  const o6 = a2(i7) ? void 0 : i7._$litDirective$;
  return h4?.constructor !== o6 && (h4?._$AO?.(false), void 0 === o6 ? h4 = void 0 : (h4 = new o6(t6), h4._$AT(t6, s5, e8)), void 0 !== e8 ? (s5._$Co ?? (s5._$Co = []))[e8] = h4 : s5._$Cl = h4), void 0 !== h4 && (i7 = M(t6, h4._$AS(t6, i7.values), h4, e8)), i7;
}
var R = class {
  constructor(t6, i7) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    const { el: { content: i7 }, parts: s5 } = this._$AD, e8 = (t6?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e8;
    let h4 = P.nextNode(), o6 = 0, n5 = 0, r7 = s5[0];
    for (; void 0 !== r7; ) {
      if (o6 === r7.index) {
        let i8;
        2 === r7.type ? i8 = new k(h4, h4.nextSibling, this, t6) : 1 === r7.type ? i8 = new r7.ctor(h4, r7.name, r7.strings, this, t6) : 6 === r7.type && (i8 = new Z(h4, this, t6)), this._$AV.push(i8), r7 = s5[++n5];
      }
      o6 !== r7?.index && (h4 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e8;
  }
  p(t6) {
    let i7 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t6, s5, i7), i7 += s5.strings.length - 2) : s5._$AI(t6[i7])), i7++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t6, i7, s5, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i7, this._$AM = s5, this.options = e8, this._$Cv = e8?.isConnected ?? true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i7 = this._$AM;
    return void 0 !== i7 && 11 === t6?.nodeType && (t6 = i7.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i7 = this) {
    t6 = M(this, t6, i7), a2(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== E && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : d2(t6) ? this.k(t6) : this._(t6);
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
    const { values: i7, _$litType$: s5 } = t6, e8 = "number" == typeof s5 ? this._$AC(t6) : (void 0 === s5.el && (s5.el = S2.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e8) this._$AH.p(i7);
    else {
      const t7 = new R(e8, this), s6 = t7.u(this.options);
      t7.p(i7), this.T(s6), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i7 = C.get(t6.strings);
    return void 0 === i7 && C.set(t6.strings, i7 = new S2(t6)), i7;
  }
  k(t6) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s5, e8 = 0;
    for (const h4 of t6) e8 === i7.length ? i7.push(s5 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s5 = i7[e8], s5._$AI(h4), e8++;
    e8 < i7.length && (this._$AR(s5 && s5._$AB.nextSibling, e8), i7.length = e8);
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
  constructor(t6, i7, s5, e8, h4) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i7, this._$AM = e8, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t6, i7 = this, s5, e8) {
    const h4 = this.strings;
    let o6 = false;
    if (void 0 === h4) t6 = M(this, t6, i7, 0), o6 = !a2(t6) || t6 !== this._$AH && t6 !== E, o6 && (this._$AH = t6);
    else {
      const e9 = t6;
      let n5, r7;
      for (t6 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r7 = M(this, e9[s5 + n5], i7, n5), r7 === E && (r7 = this._$AH[n5]), o6 || (o6 = !a2(r7) || r7 !== this._$AH[n5]), r7 === A ? t6 = A : t6 !== A && (t6 += (r7 ?? "") + h4[n5 + 1]), this._$AH[n5] = r7;
    }
    o6 && !e8 && this.j(t6);
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
  constructor(t6, i7, s5, e8, h4) {
    super(t6, i7, s5, e8, h4), this.type = 5;
  }
  _$AI(t6, i7 = this) {
    if ((t6 = M(this, t6, i7, 0) ?? A) === E) return;
    const s5 = this._$AH, e8 = t6 === A && s5 !== A || t6.capture !== s5.capture || t6.once !== s5.once || t6.passive !== s5.passive, h4 = t6 !== A && (s5 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z = class {
  constructor(t6, i7, s5) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s5;
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
var D = (t6, i7, s5) => {
  const e8 = s5?.renderBefore ?? i7;
  let h4 = e8._$litPart$;
  if (void 0 === h4) {
    const t7 = s5?.renderBefore ?? null;
    e8._$litPart$ = h4 = new k(i7.insertBefore(c3(), t7), t7, void 0, s5 ?? {});
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

// src/datepicker/styles.ts
var styles_default = [
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

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t6) => (e8, o6) => {
  void 0 !== o6 ? o6.addInitializer(() => {
    customElements.define(t6, e8);
  }) : customElements.define(t6, e8);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t6 = o5, e8, r7) => {
  const { kind: n5, metadata: i7 } = r7;
  let s5 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i7, s5 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t6 = Object.create(t6)).wrapped = true), s5.set(r7.name, t6), "accessor" === n5) {
    const { name: o6 } = r7;
    return { set(r8) {
      const n6 = e8.get.call(this);
      e8.set.call(this, r8), this.requestUpdate(o6, n6, t6, true, r8);
    }, init(e9) {
      return void 0 !== e9 && this.C(o6, void 0, t6, e9), e9;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r7;
    return function(r8) {
      const n6 = this[o6];
      e8.call(this, r8), this.requestUpdate(o6, n6, t6, true, r8);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t6) {
  return (e8, o6) => "object" == typeof o6 ? r4(t6, e8, o6) : ((t7, e9, o7) => {
    const r7 = e9.hasOwnProperty(o7);
    return e9.constructor.createProperty(o7, t7), r7 ? Object.getOwnPropertyDescriptor(e9, o7) : void 0;
  })(t6, e8, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r7) {
  return n4({ ...r7, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t6, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t6 && Object.defineProperty(e8, t6, c5), c5);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r7) {
  return (n5, s5, i7) => {
    const o6 = (t6) => t6.renderRoot?.querySelector(e8) ?? null;
    if (r7) {
      const { get: e9, set: r8 } = "object" == typeof s5 ? n5 : i7 ?? /* @__PURE__ */ (() => {
        const t6 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t6];
        }, set(e10) {
          this[t6] = e10;
        } };
      })();
      return e4(n5, s5, { get() {
        let t6 = e9.call(this);
        return void 0 === t6 && (t6 = o6(this), (null !== t6 || this.hasUpdated) && r8.call(this, t6)), t6;
      } });
    }
    return e4(n5, s5, { get() {
      return o6(this);
    } });
  };
}

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t6) => (...e8) => ({ _$litDirective$: t6, values: e8 });
var i5 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e8, i7) {
    this._$Ct = t6, this._$AM = e8, this._$Ci = i7;
  }
  _$AS(t6, e8) {
    return this.update(t6, e8);
  }
  update(t6, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directives/class-map.js
var e7 = e6(class extends i5 {
  constructor(t6) {
    if (super(t6), t6.type !== t4.ATTRIBUTE || "class" !== t6.name || t6.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return " " + Object.keys(t6).filter((s5) => t6[s5]).join(" ") + " ";
  }
  update(s5, [i7]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
      for (const t6 in i7) i7[t6] && !this.nt?.has(t6) && this.st.add(t6);
      return this.render(i7);
    }
    const r7 = s5.element.classList;
    for (const t6 of this.st) t6 in i7 || (r7.remove(t6), this.st.delete(t6));
    for (const t6 in i7) {
      const s6 = !!i7[t6];
      s6 === this.st.has(t6) || this.nt?.has(t6) || (s6 ? (r7.add(t6), this.st.add(t6)) : (r7.remove(t6), this.st.delete(t6)));
    }
    return E;
  }
});

// node_modules/lit-html/directive-helpers.js
var { I: t5 } = j;
var i6 = (o6) => o6;
var r6 = (o6) => void 0 === o6.strings;
var s4 = () => document.createComment("");
var v2 = (o6, n5, e8) => {
  const l4 = o6._$AA.parentNode, d3 = void 0 === n5 ? o6._$AB : n5._$AA;
  if (void 0 === e8) {
    const i7 = l4.insertBefore(s4(), d3), n6 = l4.insertBefore(s4(), d3);
    e8 = new t5(i7, n6, o6, o6.options);
  } else {
    const t6 = e8._$AB.nextSibling, n6 = e8._$AM, c5 = n6 !== o6;
    if (c5) {
      let t7;
      e8._$AQ?.(o6), e8._$AM = o6, void 0 !== e8._$AP && (t7 = o6._$AU) !== n6._$AU && e8._$AP(t7);
    }
    if (t6 !== d3 || c5) {
      let o7 = e8._$AA;
      for (; o7 !== t6; ) {
        const t7 = i6(o7).nextSibling;
        i6(l4).insertBefore(o7, d3), o7 = t7;
      }
    }
  }
  return e8;
};
var u3 = (o6, t6, i7 = o6) => (o6._$AI(t6, i7), o6);
var m2 = {};
var p3 = (o6, t6 = m2) => o6._$AH = t6;
var M2 = (o6) => o6._$AH;
var h3 = (o6) => {
  o6._$AR(), o6._$AA.remove();
};

// node_modules/lit-html/directives/repeat.js
var u4 = (e8, s5, t6) => {
  const r7 = /* @__PURE__ */ new Map();
  for (let l4 = s5; l4 <= t6; l4++) r7.set(e8[l4], l4);
  return r7;
};
var c4 = e6(class extends i5 {
  constructor(e8) {
    if (super(e8), e8.type !== t4.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e8, s5, t6) {
    let r7;
    void 0 === t6 ? t6 = s5 : void 0 !== s5 && (r7 = s5);
    const l4 = [], o6 = [];
    let i7 = 0;
    for (const s6 of e8) l4[i7] = r7 ? r7(s6, i7) : i7, o6[i7] = t6(s6, i7), i7++;
    return { values: o6, keys: l4 };
  }
  render(e8, s5, t6) {
    return this.dt(e8, s5, t6).values;
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
      const e8 = y3.get(a3[k2]), t7 = void 0 !== e8 ? d3[e8] : null;
      if (null === t7) {
        const e9 = v2(s5, d3[x2]);
        u3(e9, p4[k2]), v3[k2] = e9;
      } else v3[k2] = u3(t7, p4[k2]), v2(s5, d3[x2], t7), d3[e8] = null;
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

// node_modules/lit-html/directives/live.js
var l3 = e6(class extends i5 {
  constructor(r7) {
    if (super(r7), r7.type !== t4.PROPERTY && r7.type !== t4.ATTRIBUTE && r7.type !== t4.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r6(r7)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r7) {
    return r7;
  }
  update(i7, [t6]) {
    if (t6 === E || t6 === A) return t6;
    const o6 = i7.element, l4 = i7.name;
    if (i7.type === t4.PROPERTY) {
      if (t6 === o6[l4]) return E;
    } else if (i7.type === t4.BOOLEAN_ATTRIBUTE) {
      if (!!t6 === o6.hasAttribute(l4)) return E;
    } else if (i7.type === t4.ATTRIBUTE && o6.getAttribute(l4) === t6 + "") return E;
    return p3(i7), t6;
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
  for (let i7 = offset - 1; i7 >= 0; i7--) {
    cells.push({ date: new Date(year, month - 1, daysInPrev - i7), other: true });
  }
  for (let i7 = 1; i7 <= daysInMonth; i7++) {
    cells.push({ date: new Date(year, month, i7), other: false });
  }
  let next = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, next++), other: true });
  }
  return cells;
}
function getOrderedDayHeaders(firstDayOfWeek) {
  return Array.from({ length: 7 }, (_2, i7) => DAY_NARROW[(firstDayOfWeek + i7) % 7]);
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
        const onKeydown = (e8) => {
          if (this.disabled || this.readonly) return;
          if (e8.key === "Enter" || e8.key === " ") {
            e8.preventDefault();
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
        const [s5, e8] = v3;
        this._inputValue = s5 ? `${this._formatFull(s5)} \u2192 ${e8 ? this._formatFull(e8) : "\u2013"}` : "";
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
      const [s5, e8] = v3;
      return sameDay(s5, date) || e8 !== null && sameDay(e8, date);
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
    const e8 = this.value[1];
    return e8 !== null && sameDay(e8, date);
  }
  _isInRange(date) {
    if (this.selectionMode !== "range") return false;
    if (Array.isArray(this.value)) {
      const [s5, e8] = this.value;
      if (s5 && e8) return isBetween(date, s5, e8);
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
          const e8 = isBefore(this._rangeStart, d3) ? d3 : this._rangeStart;
          this.value = [s5, e8];
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
  _handleCalendarKeydown(e8) {
    if (this._currentView !== "date") return;
    const base = this._focusedDate ?? this._firstSelectedDate() ?? /* @__PURE__ */ new Date();
    let next = new Date(base);
    switch (e8.key) {
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
        e8.preventDefault();
        if (this._focusedDate) this._selectDate(this._focusedDate, e8);
        return;
      default:
        return;
    }
    e8.preventDefault();
    this._focusedDate = next;
    const vd = this._viewDate;
    if (next.getMonth() !== vd.getMonth() || next.getFullYear() !== vd.getFullYear()) {
      this._viewDate = new Date(next.getFullYear(), next.getMonth(), 1);
    }
  }
  // ── Clear / Today actions ─────────────────────────────────────────────────
  _clear(e8) {
    e8?.stopPropagation();
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
          @click=${(e8) => {
      e8.stopPropagation();
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
          @click=${(e8) => {
      e8.stopPropagation();
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
    const n5 = Math.max(1, this.numberOfMonths);
    const panels = Array.from({ length: n5 }, (_2, i7) => {
      const d3 = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth() + i7, 1);
      return { year: d3.getFullYear(), month: d3.getMonth() };
    });
    return b2`
      <div class="dp-date-view" style="--dp-months: ${n5}">
        ${panels.map((p4, i7) => this._renderMonthPanel(p4.year, p4.month, i7, n5))}
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
        @click=${(e8) => this._selectDate(date, e8)}
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
          ${MONTH_SHORT.map((name, i7) => b2`
            <button
              type="button"
              part=${["month-cell", i7 === selM && year === selY && "month-cell--selected"].filter(Boolean).join(" ")}
              class=${e7({
      "dp-month-cell": true,
      "dp-month-cell--selected": i7 === selM && year === selY,
      "dp-month-cell--today": i7 === todayM && year === todayY
    })}
              @click=${() => this._selectMonth(i7)}
            >${name}</button>
          `)}
        </div>
      </div>
    `;
  }
  // ── Year grid view (decade) ───────────────────────────────────────────────
  _renderYearGrid() {
    const base = this._yearBase;
    const years = Array.from({ length: 12 }, (_2, i7) => base + i7);
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
          @change=${(e8) => this._setTimeField(field, e8.target.value)}
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
UwcDatepicker.styles = [styles_default];
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
UwcDatepicker = __decorateClass([
  t3("uwc-datepicker")
], UwcDatepicker);

// src/datepicker/react.ts
var UwcDatepickerReact = createComponent({
  tagName: "uwc-datepicker",
  elementClass: UwcDatepicker,
  react: React,
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
export {
  UwcDatepickerReact
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

lit-html/directives/class-map.js:
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
