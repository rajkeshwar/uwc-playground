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

// src/stepper/react.ts
import React from "react";
import { createComponent } from "@lit/react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t5, e8, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
  const o6 = 1 === t5.length ? t5[0] : e8.reduce((e9, s5, o7) => e9 + ((t6) => {
    if (true === t6._$cssResult$) return t6.cssText;
    if ("number" == typeof t6) return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t5[o7 + 1], t5[0]);
  return new n(o6, t5, s);
};
var S = (s5, o6) => {
  if (e) s5.adoptedStyleSheets = o6.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
  else for (const e8 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e8.cssText, s5.appendChild(o7);
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
  let i7 = t5;
  switch (s5) {
    case Boolean:
      i7 = null !== t5;
      break;
    case Number:
      i7 = null === t5 ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        i7 = JSON.parse(t5);
      } catch (t6) {
        i7 = null;
      }
  }
  return i7;
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
      const i7 = /* @__PURE__ */ Symbol(), h4 = this.getPropertyDescriptor(t5, i7, s5);
      void 0 !== h4 && e2(this.prototype, t5, h4);
    }
  }
  static getPropertyDescriptor(t5, s5, i7) {
    const { get: e8, set: r6 } = h(this.prototype, t5) ?? { get() {
      return this[s5];
    }, set(t6) {
      this[s5] = t6;
    } };
    return { get: e8, set(s6) {
      const h4 = e8?.call(this);
      r6?.call(this, s6), this.requestUpdate(t5, h4, i7);
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
      for (const i7 of s5) this.createProperty(i7, t6[i7]);
    }
    const t5 = this[Symbol.metadata];
    if (null !== t5) {
      const s5 = litPropertyMetadata.get(t5);
      if (void 0 !== s5) for (const [t6, i7] of s5) this.elementProperties.set(t6, i7);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t6, s5] of this.elementProperties) {
      const i7 = this._$Eu(t6, s5);
      void 0 !== i7 && this._$Eh.set(i7, t6);
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
  static _$Eu(t5, s5) {
    const i7 = s5.attribute;
    return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
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
    for (const i7 of s5.keys()) this.hasOwnProperty(i7) && (t5.set(i7, this[i7]), delete this[i7]);
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
  attributeChangedCallback(t5, s5, i7) {
    this._$AK(t5, i7);
  }
  _$ET(t5, s5) {
    const i7 = this.constructor.elementProperties.get(t5), e8 = this.constructor._$Eu(t5, i7);
    if (void 0 !== e8 && true === i7.reflect) {
      const h4 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s5, i7.type);
      this._$Em = t5, null == h4 ? this.removeAttribute(e8) : this.setAttribute(e8, h4), this._$Em = null;
    }
  }
  _$AK(t5, s5) {
    const i7 = this.constructor, e8 = i7._$Eh.get(t5);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t6 = i7.getPropertyOptions(e8), h4 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
      this._$Em = e8;
      const r6 = h4.fromAttribute(s5, t6.type);
      this[e8] = r6 ?? this._$Ej?.get(e8) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t5, s5, i7, e8 = false, h4) {
    if (void 0 !== t5) {
      const r6 = this.constructor;
      if (false === e8 && (h4 = this[t5]), i7 ?? (i7 = r6.getPropertyOptions(t5)), !((i7.hasChanged ?? f)(h4, s5) || i7.useDefault && i7.reflect && h4 === this._$Ej?.get(t5) && !this.hasAttribute(r6._$Eu(t5, i7)))) return;
      this.C(t5, s5, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t5, s5, { useDefault: i7, reflect: e8, wrapped: h4 }, r6) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r6 ?? s5 ?? this[t5]), true !== h4 || void 0 !== r6) || (this._$AL.has(t5) || (this.hasUpdated || i7 || (s5 = void 0), this._$AL.set(t5, s5)), true === e8 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
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
      if (t6.size > 0) for (const [s6, i7] of t6) {
        const { wrapped: t7 } = i7, e8 = this[s6];
        true !== t7 || this._$AL.has(s6) || void 0 === e8 || this.C(s6, void 0, i7, e8);
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
var x = (t5) => (i7, ...s5) => ({ _$litType$: t5, strings: i7, values: s5 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t5, i7) {
  if (!u2(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i7) : i7;
}
var N = (t5, i7) => {
  const s5 = t5.length - 1, e8 = [];
  let n5, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
  for (let i8 = 0; i8 < s5; i8++) {
    const s6 = t5[i8];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n5 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n5 = void 0);
    const x2 = c5 === p2 && t5[i8 + 1].startsWith("/>") ? " " : "";
    l3 += c5 === v ? s6 + r3 : d3 >= 0 ? (e8.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t5, l3 + (t5[s5] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t5, _$litType$: i7 }, e8) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u5 = t5.length - 1, d3 = this.parts, [f3, v3] = N(t5, i7);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t6 of r6.getAttributeNames()) if (t6.endsWith(h2)) {
          const i8 = v3[a3++], s5 = r6.getAttribute(t6).split(o3), e9 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l3, name: e9[2], strings: s5, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r6.removeAttribute(t6);
        } else t6.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t6));
        if (y2.test(r6.tagName)) {
          const t6 = r6.textContent.split(o3), i8 = t6.length - 1;
          if (i8 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s5 = 0; s5 < i8; s5++) r6.append(t6[s5], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t6[i8], c3());
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
  static createElement(t5, i7) {
    const s5 = l2.createElement("template");
    return s5.innerHTML = t5, s5;
  }
};
function M(t5, i7, s5 = t5, e8) {
  if (i7 === E) return i7;
  let h4 = void 0 !== e8 ? s5._$Co?.[e8] : s5._$Cl;
  const o6 = a2(i7) ? void 0 : i7._$litDirective$;
  return h4?.constructor !== o6 && (h4?._$AO?.(false), void 0 === o6 ? h4 = void 0 : (h4 = new o6(t5), h4._$AT(t5, s5, e8)), void 0 !== e8 ? (s5._$Co ?? (s5._$Co = []))[e8] = h4 : s5._$Cl = h4), void 0 !== h4 && (i7 = M(t5, h4._$AS(t5, i7.values), h4, e8)), i7;
}
var R = class {
  constructor(t5, i7) {
    this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t5) {
    const { el: { content: i7 }, parts: s5 } = this._$AD, e8 = (t5?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e8;
    let h4 = P.nextNode(), o6 = 0, n5 = 0, r6 = s5[0];
    for (; void 0 !== r6; ) {
      if (o6 === r6.index) {
        let i8;
        2 === r6.type ? i8 = new k(h4, h4.nextSibling, this, t5) : 1 === r6.type ? i8 = new r6.ctor(h4, r6.name, r6.strings, this, t5) : 6 === r6.type && (i8 = new Z(h4, this, t5)), this._$AV.push(i8), r6 = s5[++n5];
      }
      o6 !== r6?.index && (h4 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e8;
  }
  p(t5) {
    let i7 = 0;
    for (const s5 of this._$AV) void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i7), i7 += s5.strings.length - 2) : s5._$AI(t5[i7])), i7++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t5, i7, s5, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i7, this._$AM = s5, this.options = e8, this._$Cv = e8?.isConnected ?? true;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i7 = this._$AM;
    return void 0 !== i7 && 11 === t5?.nodeType && (t5 = i7.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i7 = this) {
    t5 = M(this, t5, i7), a2(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== E && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : d2(t5) ? this.k(t5) : this._(t5);
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
    const { values: i7, _$litType$: s5 } = t5, e8 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = S2.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e8) this._$AH.p(i7);
    else {
      const t6 = new R(e8, this), s6 = t6.u(this.options);
      t6.p(i7), this.T(s6), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i7 = C.get(t5.strings);
    return void 0 === i7 && C.set(t5.strings, i7 = new S2(t5)), i7;
  }
  k(t5) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s5, e8 = 0;
    for (const h4 of t5) e8 === i7.length ? i7.push(s5 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s5 = i7[e8], s5._$AI(h4), e8++;
    e8 < i7.length && (this._$AR(s5 && s5._$AB.nextSibling, e8), i7.length = e8);
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
  constructor(t5, i7, s5, e8, h4) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i7, this._$AM = e8, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t5, i7 = this, s5, e8) {
    const h4 = this.strings;
    let o6 = false;
    if (void 0 === h4) t5 = M(this, t5, i7, 0), o6 = !a2(t5) || t5 !== this._$AH && t5 !== E, o6 && (this._$AH = t5);
    else {
      const e9 = t5;
      let n5, r6;
      for (t5 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r6 = M(this, e9[s5 + n5], i7, n5), r6 === E && (r6 = this._$AH[n5]), o6 || (o6 = !a2(r6) || r6 !== this._$AH[n5]), r6 === A ? t5 = A : t5 !== A && (t5 += (r6 ?? "") + h4[n5 + 1]), this._$AH[n5] = r6;
    }
    o6 && !e8 && this.j(t5);
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
  constructor(t5, i7, s5, e8, h4) {
    super(t5, i7, s5, e8, h4), this.type = 5;
  }
  _$AI(t5, i7 = this) {
    if ((t5 = M(this, t5, i7, 0) ?? A) === E) return;
    const s5 = this._$AH, e8 = t5 === A && s5 !== A || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h4 = t5 !== A && (s5 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var Z = class {
  constructor(t5, i7, s5) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s5;
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
var D = (t5, i7, s5) => {
  const e8 = s5?.renderBefore ?? i7;
  let h4 = e8._$litPart$;
  if (void 0 === h4) {
    const t6 = s5?.renderBefore ?? null;
    e8._$litPart$ = h4 = new k(i7.insertBefore(c3(), t6), t6, void 0, s5 ?? {});
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

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t5 = o5, e8, r6) => {
  const { kind: n5, metadata: i7 } = r6;
  let s5 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i7, s5 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t5 = Object.create(t5)).wrapped = true), s5.set(r6.name, t5), "accessor" === n5) {
    const { name: o6 } = r6;
    return { set(r7) {
      const n6 = e8.get.call(this);
      e8.set.call(this, r7), this.requestUpdate(o6, n6, t5, true, r7);
    }, init(e9) {
      return void 0 !== e9 && this.C(o6, void 0, t5, e9), e9;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r6;
    return function(r7) {
      const n6 = this[o6];
      e8.call(this, r7), this.requestUpdate(o6, n6, t5, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t5) {
  return (e8, o6) => "object" == typeof o6 ? r4(t5, e8, o6) : ((t6, e9, o7) => {
    const r6 = e9.hasOwnProperty(o7);
    return e9.constructor.createProperty(o7, t6), r6 ? Object.getOwnPropertyDescriptor(e9, o7) : void 0;
  })(t5, e8, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t5, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t5 && Object.defineProperty(e8, t5, c5), c5);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r6) {
  return (n5, s5, i7) => {
    const o6 = (t5) => t5.renderRoot?.querySelector(e8) ?? null;
    if (r6) {
      const { get: e9, set: r7 } = "object" == typeof s5 ? n5 : i7 ?? /* @__PURE__ */ (() => {
        const t5 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t5];
        }, set(e10) {
          this[t5] = e10;
        } };
      })();
      return e4(n5, s5, { get() {
        let t5 = e9.call(this);
        return void 0 === t5 && (t5 = o6(this), (null !== t5 || this.hasUpdated) && r7.call(this, t5)), t5;
      } });
    }
    return e4(n5, s5, { get() {
      return o6(this);
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
  _$AT(t5, e8, i7) {
    this._$Ct = t5, this._$AM = e8, this._$Ci = i7;
  }
  _$AS(t5, e8) {
    return this.update(t5, e8);
  }
  update(t5, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directives/class-map.js
var e7 = e6(class extends i5 {
  constructor(t5) {
    if (super(t5), t5.type !== t3.ATTRIBUTE || "class" !== t5.name || t5.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return " " + Object.keys(t5).filter((s5) => t5[s5]).join(" ") + " ";
  }
  update(s5, [i7]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
      for (const t5 in i7) i7[t5] && !this.nt?.has(t5) && this.st.add(t5);
      return this.render(i7);
    }
    const r6 = s5.element.classList;
    for (const t5 of this.st) t5 in i7 || (r6.remove(t5), this.st.delete(t5));
    for (const t5 in i7) {
      const s6 = !!i7[t5];
      s6 === this.st.has(t5) || this.nt?.has(t5) || (s6 ? (r6.add(t5), this.st.add(t5)) : (r6.remove(t5), this.st.delete(t5)));
    }
    return E;
  }
});

// node_modules/lit-html/directive-helpers.js
var { I: t4 } = j;
var i6 = (o6) => o6;
var s4 = () => document.createComment("");
var v2 = (o6, n5, e8) => {
  const l3 = o6._$AA.parentNode, d3 = void 0 === n5 ? o6._$AB : n5._$AA;
  if (void 0 === e8) {
    const i7 = l3.insertBefore(s4(), d3), n6 = l3.insertBefore(s4(), d3);
    e8 = new t4(i7, n6, o6, o6.options);
  } else {
    const t5 = e8._$AB.nextSibling, n6 = e8._$AM, c5 = n6 !== o6;
    if (c5) {
      let t6;
      e8._$AQ?.(o6), e8._$AM = o6, void 0 !== e8._$AP && (t6 = o6._$AU) !== n6._$AU && e8._$AP(t6);
    }
    if (t5 !== d3 || c5) {
      let o7 = e8._$AA;
      for (; o7 !== t5; ) {
        const t6 = i6(o7).nextSibling;
        i6(l3).insertBefore(o7, d3), o7 = t6;
      }
    }
  }
  return e8;
};
var u3 = (o6, t5, i7 = o6) => (o6._$AI(t5, i7), o6);
var m2 = {};
var p3 = (o6, t5 = m2) => o6._$AH = t5;
var M2 = (o6) => o6._$AH;
var h3 = (o6) => {
  o6._$AR(), o6._$AA.remove();
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
    const l3 = [], o6 = [];
    let i7 = 0;
    for (const s6 of e8) l3[i7] = r6 ? r6(s6, i7) : i7, o6[i7] = t5(s6, i7), i7++;
    return { values: o6, keys: l3 };
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

// src/utils/dom.utils.ts
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
var borderControl = r("rgba(0,0,0,0.20)");
var text = r("#111111");
var textSecondary = r("#64748b");
var textMuted = r("#9ca3af");
var textDisabled = r("#bbbbbb");
var hoverBg = r("rgba(0,0,0,0.04)");
var selectedBg = r("rgba(99,102,241,0.08)");
var colorWhite = r("#ffffff");
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
function focusRing(selector, colorVar = "--uwc-color-primary", colorDefault = "#6366f1") {
  return i`
    ${r(selector)}:focus-visible {
      outline: 2px solid var(${r(colorVar)}, ${r(colorDefault)});
      outline-offset: 2px;
    }
  `;
}

// src/stepper/styles.ts
var INDICATOR_SIZE = r("2rem");
var CONNECTOR_THICKNESS = r("2px");
var panelStyles = [
  hostReset,
  focusRing(".uwc-sp__v-indicator", "--uwc-color-primary", "#6366f1"),
  focusRing(".uwc-sp__v-header", "--uwc-color-primary", "#6366f1"),
  i`
    /* ── Host ─────────────────────────────────────────────────────── */
    :host {
      display: block;
    }

    /* Horizontal: hide inactive panels */
    :host([orientation="horizontal"]:not([active])) {
      display: none;
    }

    /* ── Horizontal content wrapper ───────────────────────────────── */
    .uwc-sp__h-wrap {
      padding: var(--uwc-step-content-padding, ${space5} 0 ${space3});
    }

    /* ── Vertical: full step row ───────────────────────────────────── */
    .uwc-sp__v-row {
      display:        flex;
      align-items:    stretch;
      gap:            0;
    }

    /* ── Vertical: left column (indicator + connector line) ───────── */
    .uwc-sp__v-left {
      display:        flex;
      flex-direction: column;
      align-items:    center;
      flex-shrink:    0;
      width:          ${INDICATOR_SIZE};
      margin-right:   ${space4};
    }

    /* ── Step indicator circle ────────────────────────────────────── */
    .uwc-sp__v-indicator {
      display:         inline-flex;
      align-items:     center;
      justify-content: center;
      width:           ${INDICATOR_SIZE};
      height:          ${INDICATOR_SIZE};
      border-radius:   ${radiusFull};
      border:          var(--uwc-step-indicator-border, 2px solid ${border});
      background:      var(--uwc-step-indicator-bg,     ${surface});
      color:           var(--uwc-step-indicator-color,  ${textSecondary});
      font-size:       ${fontSizeSm};
      font-weight:     ${fontWeightSemibold};
      flex-shrink:     0;
      cursor:          default;
      padding:         0;
      transition:
        background    ${durationBase},
        border-color  ${durationBase},
        color         ${durationBase},
        box-shadow    ${durationBase};
    }

    :host([active]) .uwc-sp__v-indicator {
      background:   var(--uwc-step-active-bg,    ${primary});
      border-color: var(--uwc-step-active-border, ${primary});
      color:        var(--uwc-step-active-color,  ${colorWhite});
      box-shadow:   0 0 0 4px color-mix(in oklab, ${primary} 18%, transparent);
    }

    :host([completed]) .uwc-sp__v-indicator {
      background:   var(--uwc-step-done-bg,    ${primary});
      border-color: var(--uwc-step-done-border, ${primary});
      color:        var(--uwc-step-done-color,  ${colorWhite});
      box-shadow:   none;
    }

    :host([disabled]) .uwc-sp__v-indicator {
      opacity: 0.38;
      cursor: not-allowed;
    }

    /* Clickable indicator (non-linear mode) */
    .uwc-sp__v-indicator.is-clickable {
      cursor: pointer;
    }
    .uwc-sp__v-indicator.is-clickable:hover:not(:disabled) {
      border-color: var(--uwc-color-primary, ${primary});
      color:        var(--uwc-color-primary, ${primary});
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-sp__v-indicator { transition: none; }
    }

    /* ── Connector line (between indicator and next step) ─────────── */
    .uwc-sp__v-connector {
      flex:             1;
      width:            ${CONNECTOR_THICKNESS};
      min-height:       ${space6};
      background:       var(--uwc-step-connector-color, ${border});
      margin:           ${space1} 0;
      border-radius:    ${radiusFull};
      transition:       background ${durationBase};
    }

    .uwc-sp__v-connector.is-completed {
      background: var(--uwc-step-connector-done, ${primary});
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-sp__v-connector { transition: none; }
    }

    /* ── Vertical: right column (header + animated content) ────────── */
    .uwc-sp__v-right {
      flex:       1;
      min-width:  0;
      padding-bottom: ${space4};
    }

    /* Last row: no bottom padding needed (no connector below) */
    :host([is-last]) .uwc-sp__v-right {
      padding-bottom: 0;
    }

    /* ── Step header button ────────────────────────────────────────── */
    .uwc-sp__v-header {
      display:     block;
      width:       100%;
      background:  transparent;
      border:      none;
      padding:     0 0 ${space2};
      text-align:  left;
      cursor:      default;
      line-height: 1.3;
    }

    .uwc-sp__v-header.is-clickable { cursor: pointer; }

    .uwc-sp__v-title {
      display:     block;
      font-size:   var(--uwc-step-title-font-size, ${fontSizeMd});
      font-weight: var(--uwc-step-title-font-weight, ${fontWeightSemibold});
      color:       var(--uwc-step-title-color, ${textSecondary});
      transition:  color ${durationBase};
      line-height: 1.4;
    }

    :host([active]) .uwc-sp__v-title {
      color: var(--uwc-step-active-title-color, ${text});
    }
    :host([completed]) .uwc-sp__v-title {
      color: var(--uwc-step-done-title-color, ${textSecondary});
    }

    .uwc-sp__v-subtitle {
      display:    block;
      font-size:  ${fontSizeSm};
      color:      ${textMuted};
      margin-top: ${space1};
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-sp__v-title { transition: none; }
    }

    /* ── Animated content wrapper (WAAPI-controlled) ──────────────── */
    .uwc-sp__v-content-wrap {
      /* height animated in JS; overflow set inline during animation */
    }

    .uwc-sp__v-content {
      padding-bottom: ${space3};
    }

    /* ── Vertical nav buttons ──────────────────────────────────────── */
    .uwc-sp__v-nav {
      display:         flex;
      align-items:     center;
      gap:             ${space2};
      padding-top:     ${space3};
    }
  `
];
var stepperStyles = [
  hostReset,
  focusRing(".uwc-step__button", "--uwc-color-primary", "#6366f1"),
  i`
    :host {
      display: block;
    }

    /* ── Horizontal layout ────────────────────────────────────────── */
    .uwc-stepper--horizontal {
      display:        flex;
      flex-direction: column;
    }

    /* Step nav bar */
    .uwc-stepper__nav {
      display:     flex;
      align-items: center;
      padding:     ${space2} 0 ${space5};
      gap:         0;
      overflow-x:  auto;
      scrollbar-width: none;
    }
    .uwc-stepper__nav::-webkit-scrollbar { display: none; }

    /* Individual step container (button + separator) */
    .uwc-step {
      display:     flex;
      align-items: center;
      flex:        1;
      min-width:   0;
    }

    /* Last step: no flex grow on separator */
    .uwc-step:last-child {
      flex: 0 0 auto;
    }

    /* Step clickable button */
    .uwc-step__button {
      display:          inline-flex;
      align-items:      center;
      gap:              ${space2};
      background:       transparent;
      border:           none;
      padding:          ${space1} ${space2} ${space1} 0;
      cursor:           default;
      white-space:      nowrap;
      border-radius:    ${radiusMd};
      transition:       background ${durationBase};
      min-width:        0;
    }

    .uwc-step__button.is-clickable {
      cursor: pointer;
    }

    .uwc-step__button.is-clickable:hover {
      background: ${hoverBg};
    }

    /* ── Horizontal step indicator circle ─────────────────────────── */
    .uwc-step__indicator {
      display:         inline-flex;
      align-items:     center;
      justify-content: center;
      width:           ${INDICATOR_SIZE};
      height:          ${INDICATOR_SIZE};
      border-radius:   ${radiusFull};
      border:          var(--uwc-step-indicator-border, 2px solid ${border});
      background:      var(--uwc-step-indicator-bg,     ${surface});
      color:           var(--uwc-step-indicator-color,  ${textSecondary});
      font-size:       ${fontSizeSm};
      font-weight:     ${fontWeightSemibold};
      flex-shrink:     0;
      transition:
        background    ${durationBase},
        border-color  ${durationBase},
        color         ${durationBase},
        box-shadow    ${durationBase};
    }

    .uwc-step__indicator--active {
      background:  var(--uwc-step-active-bg,    ${primary});
      border-color:var(--uwc-step-active-border, ${primary});
      color:       var(--uwc-step-active-color,  ${colorWhite});
      box-shadow:  0 0 0 4px color-mix(in oklab, ${primary} 18%, transparent);
    }

    .uwc-step__indicator--completed {
      background:   var(--uwc-step-done-bg,    ${primary});
      border-color: var(--uwc-step-done-border, ${primary});
      color:        var(--uwc-step-done-color,  ${colorWhite});
      box-shadow:   none;
    }

    .uwc-step__indicator--disabled {
      opacity: 0.38;
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-step__indicator { transition: none; }
    }

    /* ── Step title / subtitle ────────────────────────────────────── */
    .uwc-step__info {
      display:    flex;
      flex-direction: column;
      gap:        1px;
      min-width:  0;
    }

    .uwc-step__title {
      font-size:   var(--uwc-step-title-font-size,   ${fontSizeMd});
      font-weight: var(--uwc-step-title-font-weight,  ${fontWeightSemibold});
      color:       var(--uwc-step-title-color,        ${textSecondary});
      line-height: 1.3;
      transition:  color ${durationBase};
      white-space: nowrap;
      overflow:    hidden;
      text-overflow: ellipsis;
    }

    .uwc-step__title--active    { color: var(--uwc-step-active-title-color, ${text}); }
    .uwc-step__title--completed { color: var(--uwc-step-done-title-color, ${textSecondary}); }

    .uwc-step__subtitle {
      font-size:  ${fontSizeSm};
      color:      ${textMuted};
      white-space: nowrap;
      overflow:   hidden;
      text-overflow: ellipsis;
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-step__title { transition: none; }
    }

    /* ── Separator (line between steps) ───────────────────────────── */
    .uwc-step__separator {
      flex:       1;
      min-width:  ${space4};
      height:     ${CONNECTOR_THICKNESS};
      background: var(--uwc-step-connector-color, ${border});
      margin:     0 ${space2};
      border-radius: ${radiusFull};
      transition: background ${durationBase};
    }

    .uwc-step__separator--completed {
      background: var(--uwc-step-connector-done, ${primary});
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-step__separator { transition: none; }
    }

    /* ── Content area ─────────────────────────────────────────────── */
    .uwc-stepper__content {
      border-top: 1px solid var(--uwc-step-divider, ${borderSubtle});
      padding-top: ${space4};
    }

    /* ── Footer (nav buttons — horizontal) ────────────────────────── */
    .uwc-stepper__footer {
      display:         flex;
      align-items:     center;
      justify-content: space-between;
      padding-top:     ${space5};
      border-top:      1px solid var(--uwc-step-divider, ${borderSubtle});
      margin-top:      ${space4};
    }

    /* ── Vertical layout ──────────────────────────────────────────── */
    .uwc-stepper--vertical {
      display: block;
    }
  `
];

// src/stepper/index.ts
var PANEL_CONNECTED = "uwc-stepper-panel-connected";
var STEP_ACTION = "uwc-stepper-action";
var UwcStepperPanel = class extends i4 {
  constructor() {
    super(...arguments);
    this.header = "";
    this.subheader = "";
    this.disabled = false;
    this.active = false;
    this.completed = false;
    this.orientation = "horizontal";
    this.isLast = false;
    this.isClickable = false;
    this.noNav = false;
    // ── Zero-based index within the stepper (set by stepper) ──────────────────
    this._stepIndex = 0;
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(new CustomEvent(PANEL_CONNECTED, { bubbles: true, composed: true }));
  }
  firstUpdated() {
    if (this.orientation === "vertical" && !this.active) {
      const wrap = this._wrap;
      if (wrap) {
        wrap.style.height = "0px";
        wrap.style.overflow = "hidden";
      }
    }
  }
  updated(changed) {
    super.updated(changed);
    if (!changed.has("active")) return;
    if (this.orientation === "vertical") {
      this.active ? this._animateOpen() : this._animateClose();
    }
  }
  // ── WAAPI animation (vertical mode) ───────────────────────────────────────
  _animateOpen() {
    const wrap = this._wrap;
    if (!wrap) return;
    const fromH = this._currentAnimation ? wrap.getBoundingClientRect().height : 0;
    this._currentAnimation?.cancel();
    this._currentAnimation = void 0;
    const toH = wrap.scrollHeight;
    const anim = wrap.animate(
      [
        { height: `${fromH}px`, overflow: "hidden" },
        { height: `${toH}px`, overflow: "hidden" }
      ],
      { duration: this._dur(), easing: "ease", fill: "both" }
    );
    this._currentAnimation = anim;
    anim.addEventListener("finish", () => {
      if (this._currentAnimation !== anim) return;
      wrap.style.removeProperty("height");
      wrap.style.removeProperty("overflow");
      anim.cancel();
      this._currentAnimation = void 0;
    }, { once: true });
  }
  _animateClose() {
    const wrap = this._wrap;
    if (!wrap) return;
    const fromH = wrap.getBoundingClientRect().height;
    this._currentAnimation?.cancel();
    this._currentAnimation = void 0;
    const anim = wrap.animate(
      [
        { height: `${fromH}px`, overflow: "hidden" },
        { height: "0px", overflow: "hidden" }
      ],
      { duration: this._dur(), easing: "ease", fill: "both" }
    );
    this._currentAnimation = anim;
    anim.addEventListener("finish", () => {
      if (this._currentAnimation !== anim) return;
      anim.cancel();
      wrap.style.height = "0px";
      wrap.style.overflow = "hidden";
      this._currentAnimation = void 0;
    }, { once: true });
  }
  _dur() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 250;
  }
  // ── Event dispatchers ──────────────────────────────────────────────────────
  /** Fires when the user clicks the step header/indicator in vertical mode. */
  _onHeaderClick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent(STEP_ACTION, {
      bubbles: true,
      composed: true,
      detail: { action: "select", stepIndex: this._stepIndex }
    }));
  }
  /** Fires when the built-in "Back" button inside a vertical step is clicked. */
  _onPrev() {
    this.dispatchEvent(new CustomEvent(STEP_ACTION, {
      bubbles: true,
      composed: true,
      detail: { action: "prev" }
    }));
  }
  /** Fires when the built-in "Next" button inside a vertical step is clicked. */
  _onNext() {
    this.dispatchEvent(new CustomEvent(STEP_ACTION, {
      bubbles: true,
      composed: true,
      detail: { action: "next" }
    }));
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderIndicatorContent() {
    if (this.completed) return b2`<uwc-icon name="check-lg" size="12px"></uwc-icon>`;
    if (this.icon) return b2`<uwc-icon name=${this.icon} size="14px"></uwc-icon>`;
    return b2`${this._stepIndex + 1}`;
  }
  // ── Render: vertical layout ────────────────────────────────────────────────
  _renderVertical() {
    return b2`
      <div class=${e7({
      "uwc-sp__v-row": true,
      "is-active": this.active,
      "is-completed": this.completed
    })}>

        <!-- Left column: circle + vertical line -->
        <div class="uwc-sp__v-left">
          <button
            type="button"
            class=${e7({
      "uwc-sp__v-indicator": true,
      "is-clickable": this.isClickable && !this.disabled
    })}
            aria-label=${`Step ${this._stepIndex + 1}: ${this.header}${this.completed ? " (completed)" : this.active ? " (current)" : ""}`}
            aria-current=${this.active ? "step" : A}
            ?disabled=${this.disabled}
            tabindex=${this.isClickable && !this.disabled ? "0" : "-1"}
            @click=${this._onHeaderClick}
          >${this._renderIndicatorContent()}</button>

          ${!this.isLast ? b2`
            <div class=${e7({
      "uwc-sp__v-connector": true,
      "is-completed": this.completed
    })}></div>
          ` : A}
        </div>

        <!-- Right column: title + animated content -->
        <div class="uwc-sp__v-right">
          <button
            type="button"
            class=${e7({
      "uwc-sp__v-header": true,
      "is-clickable": this.isClickable && !this.disabled
    })}
            aria-expanded=${this.active ? "true" : "false"}
            aria-disabled=${this.disabled ? "true" : A}
            tabindex=${this.isClickable && !this.disabled ? "0" : "-1"}
            @click=${this._onHeaderClick}
          >
            <span class=${e7({
      "uwc-sp__v-title": true,
      "is-active": this.active,
      "is-completed": this.completed
    })}>${this.header}</span>
            ${this.subheader ? b2`<span class="uwc-sp__v-subtitle">${this.subheader}</span>` : A}
          </button>

          <!-- Animated content -->
          <!-- inert keeps keyboard focus out while closed; height is always
               measured correctly because the nav is always in the DOM -->
          <div class="uwc-sp__v-content-wrap" role="region"
               aria-labelledby=${`uwc-sp-title-${this._stepIndex}`}
               ?inert=${!this.active}>
            <div class="uwc-sp__v-content">
              <slot></slot>
              ${!this.noNav ? b2`
                <div class="uwc-sp__v-nav">
                  <uwc-button
                    variant="secondary"
                    outline
                    icon="arrow-left"
                    ?disabled=${this._stepIndex === 0}
                    @uwc-click=${this._onPrev}
                  >Back</uwc-button>
                  <uwc-button
                    icon="arrow-right"
                    icon-pos="right"
                    @uwc-click=${this._onNext}
                  >${this.isLast ? "Finish" : "Next"}</uwc-button>
                </div>
              ` : A}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  // ── Render: horizontal layout (content only) ───────────────────────────────
  _renderHorizontal() {
    return b2`
      <div
        class="uwc-sp__h-wrap"
        role="tabpanel"
        id=${`uwc-sp-panel-${this._stepIndex}`}
        aria-labelledby=${`uwc-sp-tab-${this._stepIndex}`}
      >
        <slot></slot>
      </div>
    `;
  }
  // ── Render ─────────────────────────────────────────────────────────────────
  render() {
    return this.orientation === "vertical" ? this._renderVertical() : this._renderHorizontal();
  }
};
UwcStepperPanel.styles = panelStyles;
__decorateClass([
  n4()
], UwcStepperPanel.prototype, "header", 2);
__decorateClass([
  n4()
], UwcStepperPanel.prototype, "subheader", 2);
__decorateClass([
  n4()
], UwcStepperPanel.prototype, "icon", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcStepperPanel.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcStepperPanel.prototype, "active", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcStepperPanel.prototype, "completed", 2);
__decorateClass([
  n4({ reflect: true })
], UwcStepperPanel.prototype, "orientation", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true, attribute: "is-last" })
], UwcStepperPanel.prototype, "isLast", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "is-clickable" })
], UwcStepperPanel.prototype, "isClickable", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "no-nav" })
], UwcStepperPanel.prototype, "noNav", 2);
__decorateClass([
  e5(".uwc-sp__v-content-wrap")
], UwcStepperPanel.prototype, "_wrap", 2);
var UwcStepper = class extends i4 {
  constructor() {
    super(...arguments);
    this.activeStep = 0;
    this.orientation = "horizontal";
    this.linear = false;
    this.noNav = false;
    this._panels = [];
    this._activeIndex = 0;
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(PANEL_CONNECTED, this._onPanelConnect);
    this.addEventListener(STEP_ACTION, this._onStepAction);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(PANEL_CONNECTED, this._onPanelConnect);
    this.removeEventListener(STEP_ACTION, this._onStepAction);
  }
  firstUpdated() {
    this._syncPanels();
    this._apply(this.activeStep, false);
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("activeStep") && !changed.has("_activeIndex")) {
      this._apply(this.activeStep, false);
    }
    if (changed.has("orientation") || changed.has("linear") || changed.has("noNav")) {
      this._updatePanelMeta();
    }
  }
  // ── Panel management ───────────────────────────────────────────────────────
  _syncPanels() {
    this._panels = Array.from(this.children).filter(
      (el) => el instanceof UwcStepperPanel
    );
    this._updatePanelMeta();
  }
  _updatePanelMeta() {
    const n5 = this._panels.length;
    this._panels.forEach((p4, i7) => {
      p4._stepIndex = i7;
      p4.isLast = i7 === n5 - 1;
      p4.orientation = this.orientation;
      p4.noNav = this.noNav;
      p4.isClickable = !this.linear && !p4.disabled;
    });
  }
  // ── Core navigation logic ──────────────────────────────────────────────────
  _apply(index, fireEvent = true) {
    const n5 = this._panels.length;
    if (n5 === 0) return;
    const next = Math.max(0, Math.min(index, n5 - 1));
    const prev = this._activeIndex;
    if (next === prev && fireEvent) return;
    this._activeIndex = next;
    this._panels.forEach((p4, i7) => {
      p4.active = i7 === next;
      p4.completed = i7 < next;
    });
    if (fireEvent) {
      emit(this, "uwc-step-change", { step: next, prevStep: prev });
    }
  }
  // ── Event handlers ─────────────────────────────────────────────────────────
  _onPanelConnect() {
    this._syncPanels();
    this._apply(this._activeIndex, false);
  }
  _onStepAction(e8) {
    const detail = e8.detail;
    switch (detail.action) {
      case "select":
        if (!this.linear) {
          this._apply(detail.stepIndex ?? this._activeIndex);
        }
        break;
      case "prev":
        this.prev();
        break;
      case "next":
        this.next();
        break;
    }
  }
  _onSlotChange() {
    this._syncPanels();
    this._apply(this._activeIndex, false);
  }
  // ── Step header click (horizontal nav bar) ─────────────────────────────────
  _onStepClick(i7) {
    if (this.linear) return;
    const panel = this._panels[i7];
    if (!panel || panel.disabled) return;
    this._apply(i7);
  }
  // ── Public API ─────────────────────────────────────────────────────────────
  /** Advance to the next step. Emits `uwc-finish` when already on the last step. */
  next() {
    if (this._activeIndex >= this._panels.length - 1) {
      emit(this, "uwc-finish", {});
      return;
    }
    this._apply(this._activeIndex + 1);
  }
  /** Return to the previous step. No-op on the first step. */
  prev() {
    if (this._activeIndex <= 0) return;
    this._apply(this._activeIndex - 1);
  }
  /** Jump to a specific step (zero-based). In linear mode only the current
   *  step's Back/Next controls are respected; direct jumps are blocked. */
  goTo(index) {
    if (this.linear) return;
    this._apply(index);
  }
  /** Returns the zero-based index of the currently active step. */
  getActiveStep() {
    return this._activeIndex;
  }
  /** Returns the total number of steps. */
  getStepCount() {
    return this._panels.length;
  }
  // ── Getters ────────────────────────────────────────────────────────────────
  get _isFirst() {
    return this._activeIndex === 0;
  }
  get _isLast() {
    return this._activeIndex >= this._panels.length - 1;
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderIndicatorContent(panel, i7) {
    const isCompleted = panel.completed && i7 < this._activeIndex;
    if (isCompleted) return b2`<uwc-icon name="check-lg" size="12px"></uwc-icon>`;
    if (panel.icon) return b2`<uwc-icon name=${panel.icon} size="14px"></uwc-icon>`;
    return b2`${i7 + 1}`;
  }
  _renderHorizontalNav() {
    return b2`
      <nav
        part="nav"
        class="uwc-stepper__nav"
        role="tablist"
        aria-label="Steps"
      >
        ${c4(this._panels, (_2, i7) => i7, (panel, i7) => {
      const isActive = i7 === this._activeIndex;
      const isCompleted = panel.completed && i7 < this._activeIndex;
      const isFuture = i7 > this._activeIndex;
      const isDisabled = panel.disabled || this.linear && isFuture;
      const isClickable = !this.linear && !panel.disabled;
      return b2`
            <div class="uwc-step">
              <button
                type="button"
                id=${`uwc-sp-tab-${i7}`}
                class=${e7({
        "uwc-step__button": true,
        "is-clickable": isClickable
      })}
                role="tab"
                aria-selected=${isActive ? "true" : "false"}
                aria-controls=${`uwc-sp-panel-${i7}`}
                aria-disabled=${isDisabled ? "true" : "false"}
                aria-label=${`Step ${i7 + 1}: ${panel.header}${isCompleted ? " (completed)" : isActive ? " (current)" : ""}`}
                tabindex=${isActive ? "0" : "-1"}
                @click=${() => this._onStepClick(i7)}
              >
                <span class=${e7({
        "uwc-step__indicator": true,
        "uwc-step__indicator--active": isActive,
        "uwc-step__indicator--completed": isCompleted,
        "uwc-step__indicator--disabled": isDisabled
      })}>${this._renderIndicatorContent(panel, i7)}</span>

                <div class="uwc-step__info">
                  <span class=${e7({
        "uwc-step__title": true,
        "uwc-step__title--active": isActive,
        "uwc-step__title--completed": isCompleted
      })}>${panel.header}</span>
                  ${panel.subheader ? b2`
                    <span class="uwc-step__subtitle">${panel.subheader}</span>
                  ` : A}
                </div>
              </button>

              ${i7 < this._panels.length - 1 ? b2`
                <div class=${e7({
        "uwc-step__separator": true,
        "uwc-step__separator--completed": isCompleted || isActive && i7 < this._activeIndex
      })} aria-hidden="true"></div>
              ` : A}
            </div>
          `;
    })}
      </nav>
    `;
  }
  _renderHorizontalFooter() {
    if (this.noNav) return b2``;
    return b2`
      <div part="footer" class="uwc-stepper__footer">
        <uwc-button
          variant="secondary"
          outline
          icon="arrow-left"
          ?disabled=${this._isFirst}
          @uwc-click=${() => this.prev()}
        >Back</uwc-button>

        <uwc-button
          icon="arrow-right"
          icon-pos="right"
          @uwc-click=${() => this.next()}
        >${this._isLast ? "Finish" : "Next"}</uwc-button>
      </div>
    `;
  }
  // ── Render ─────────────────────────────────────────────────────────────────
  render() {
    if (this.orientation === "vertical") {
      return b2`
        <div class="uwc-stepper--vertical">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>
      `;
    }
    return b2`
      <div class="uwc-stepper--horizontal">
        ${this._renderHorizontalNav()}

        <div part="content" class="uwc-stepper__content" aria-live="polite">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>

        ${this._renderHorizontalFooter()}
      </div>
    `;
  }
};
UwcStepper.styles = stepperStyles;
__decorateClass([
  n4({ type: Number, attribute: "active-step" })
], UwcStepper.prototype, "activeStep", 2);
__decorateClass([
  n4({ reflect: true })
], UwcStepper.prototype, "orientation", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcStepper.prototype, "linear", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "no-nav" })
], UwcStepper.prototype, "noNav", 2);
__decorateClass([
  r5()
], UwcStepper.prototype, "_panels", 2);
__decorateClass([
  r5()
], UwcStepper.prototype, "_activeIndex", 2);

// src/stepper/react.ts
var UwcStepperReact = createComponent({
  react: React,
  tagName: "uwc-stepper",
  elementClass: UwcStepper,
  events: {
    onUwcStepChange: "uwc-step-change",
    onUwcFinish: "uwc-finish"
  }
});
var UwcStepperPanelReact = createComponent({
  react: React,
  tagName: "uwc-stepper-panel",
  elementClass: UwcStepperPanel,
  events: {}
});
export {
  UwcStepperReact as UwcStepper,
  UwcStepperPanelReact as UwcStepperPanel,
  UwcStepperPanelReact,
  UwcStepperReact
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
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
