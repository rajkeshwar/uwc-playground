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

// src/galleria/react.ts
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

// src/galleria/styles.ts
var styles_default = [
  hostReset,
  focusRing(".uwc-gal__item-wrapper", "--uwc-color-primary", "#6366f1"),
  focusRing(".uwc-gal__thumb-item", "--uwc-color-primary", "#6366f1"),
  i`
    /* ── Host ───────────────────────────────────────────────────────── */
    :host {
      display: block;
    }

    /* ── Outer container ────────────────────────────────────────────── */
    .uwc-gal {
      background: #000;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    /* ── Content area (item + thumbnails) ────────────────────────── */
    .uwc-gal__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    /* Left / right thumbnail positions → row layout */
    .uwc-gal__content--left,
    .uwc-gal__content--right {
      flex-direction: row;
    }

    /* ── Item section (item-wrapper + optional indicators) ────────── */
    .uwc-gal__item-section {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    /* ── Item wrapper (the focusable/draggable area) ─────────────── */
    .uwc-gal__item-wrapper {
      position: relative;
      flex: 1;
      overflow: hidden;
      user-select: none;
      cursor: grab;
      outline: none;
      min-height: var(--uwc-gal-item-min-height, 300px);
      display: flex;
      flex-direction: column;
    }
    .uwc-gal__item-wrapper:active {
      cursor: grabbing;
    }

    /* Hover-show nav: hide nav areas by default, show on hover/focus-within */
    .uwc-gal__item-wrapper--has-hover-nav .uwc-gal__nav-area {
      opacity: 0;
    }
    .uwc-gal__item-wrapper--has-hover-nav:hover .uwc-gal__nav-area,
    .uwc-gal__item-wrapper--has-hover-nav:focus-within .uwc-gal__nav-area {
      opacity: 1;
    }

    /* Hide fullscreen btn by default, show on wrapper hover/focus */
    .uwc-gal__item-wrapper .uwc-gal__fullscreen-btn {
      opacity: 0;
      transition: opacity ${durationBase};
    }
    .uwc-gal__item-wrapper:hover .uwc-gal__fullscreen-btn,
    .uwc-gal__item-wrapper:focus-within .uwc-gal__fullscreen-btn {
      opacity: 1;
    }

    /* ── Single item ─────────────────────────────────────────────── */
    .uwc-gal__item {
      flex: 1;
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* ── Default item image ──────────────────────────────────────── */
    .uwc-gal__default-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }

    /* ── Fade animation ──────────────────────────────────────────── */
    @keyframes uwc-gal-fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .uwc-gal__item.is-animating {
      animation: uwc-gal-fade var(--uwc-gal-duration, 300ms) ${easingOut};
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-gal__item.is-animating {
        animation: none;
      }
    }

    /* ── Nav areas (prev/next overlay buttons) ───────────────────── */
    .uwc-gal__nav-area {
      position: absolute;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      padding: 0.5rem;
      z-index: 1;
      transition: opacity ${durationBase};
    }
    .uwc-gal__nav-area--prev { left: 0; }
    .uwc-gal__nav-area--next { right: 0; }

    /* ── Fullscreen button ───────────────────────────────────────── */
    .uwc-gal__fullscreen-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 2;
    }

    /* ── Close button (inside fullscreen dialog) ─────────────────── */
    .uwc-gal__close-btn {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      z-index: 2;
    }

    /* ── Caption overlay ─────────────────────────────────────────── */
    .uwc-gal__caption {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%);
      padding: ${space6} ${space4} ${space3};
      pointer-events: none;
    }
    .uwc-gal__caption-title {
      margin: 0 0 ${space1};
      color: #fff;
      font-size: ${fontSizeXl};
      font-weight: ${fontWeightSemibold};
      line-height: 1.3;
    }
    .uwc-gal__caption-desc {
      margin: 0;
      color: rgba(255,255,255,0.75);
      font-size: ${fontSizeMd};
      line-height: 1.5;
    }

    /* ── Indicators ──────────────────────────────────────────────── */
    .uwc-gal__indicators {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: ${space2};
      padding: ${space2} 0;
      flex-shrink: 0;
    }

    /* Indicators overlaid on the item */
    .uwc-gal__indicators--on-item {
      position: absolute;
      left: 0;
      right: 0;
      z-index: 2;
      padding: ${space2};
    }
    .uwc-gal__indicators--on-item.uwc-gal__indicators--top    { top: 0; }
    .uwc-gal__indicators--on-item.uwc-gal__indicators--bottom { bottom: 0; }

    /* Indicator dot button */
    .uwc-gal__indicator {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: ${radiusFull};
      border: none;
      padding: 0;
      cursor: pointer;
      transition: background ${durationBase}, transform ${durationBase}, opacity ${durationBase};
      flex-shrink: 0;
      /* Default: dark-on-light (outside the item) */
      background: rgba(0,0,0,0.2);
    }
    .uwc-gal__indicator:hover {
      background: rgba(0,0,0,0.4);
    }
    .uwc-gal__indicator.is-active {
      background: ${primary};
      transform: scale(1.35);
    }

    /* On-item: light dots on dark background */
    .uwc-gal__indicators--on-item .uwc-gal__indicator {
      background: rgba(255,255,255,0.45);
    }
    .uwc-gal__indicators--on-item .uwc-gal__indicator:hover {
      background: rgba(255,255,255,0.75);
    }
    .uwc-gal__indicators--on-item .uwc-gal__indicator.is-active {
      background: #fff;
      transform: scale(1.35);
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-gal__indicator { transition: none; }
    }

    /* ── Thumbnail strip ─────────────────────────────────────────── */
    .uwc-gal__thumbnails {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.5rem;
      background: var(--uwc-gal-thumb-bg, #111);
      flex-shrink: 0;
    }
    .uwc-gal__thumbnails--vert {
      flex-direction: column;
      align-self: stretch;
      height: 100%;
    }

    /* Thumbnail viewport (clips the track, hides scrollbar) */
    .uwc-gal__thumb-viewport {
      flex: 1;
      overflow: hidden;
      scrollbar-width: none;
      min-width: 0;
      min-height: 0;
    }
    .uwc-gal__thumb-viewport::-webkit-scrollbar {
      display: none;
    }

    /* Thumbnail track */
    .uwc-gal__thumb-track {
      display: flex;
      gap: 0.5rem;
    }
    .uwc-gal__thumb-track--vert {
      flex-direction: column;
    }

    /* Individual thumbnail button */
    .uwc-gal__thumb-item {
      flex: 0 0 auto;
      width: var(--uwc-gal-thumb-w, 80px);
      height: var(--uwc-gal-thumb-h, 60px);
      overflow: hidden;
      border-radius: ${radiusSm};
      cursor: pointer;
      border: 2px solid transparent;
      opacity: 0.6;
      transition:
        opacity      ${durationBase},
        border-color ${durationBase};
      padding: 0;
      background: none;
    }
    .uwc-gal__thumb-item:hover {
      opacity: 0.9;
    }
    .uwc-gal__thumb-item.is-active {
      border-color: var(--uwc-gal-thumb-active, #fff);
      opacity: 1;
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-gal__thumb-item { transition: none; }
    }

    /* Thumbnail image */
    .uwc-gal__default-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      pointer-events: none;
    }

    /* ── Fullscreen dialog ───────────────────────────────────────── */
    dialog.uwc-gal__dialog {
      border: none;
      background: #000;
      padding: 0;
      margin: 0;
      width: 100vw;
      max-width: 100vw;
      height: 100dvh;
      max-height: 100dvh;
      display: flex;
      flex-direction: column;
    }

    dialog.uwc-gal__dialog::backdrop {
      background: rgba(0,0,0,0.95);
    }

    /* Inside dialog: make content fill available space */
    dialog.uwc-gal__dialog .uwc-gal__content {
      flex: 1;
      min-height: 0;
    }
    dialog.uwc-gal__dialog .uwc-gal__item-section {
      flex: 1;
      min-height: 0;
    }
    dialog.uwc-gal__dialog .uwc-gal__item-wrapper {
      flex: 1;
      min-height: 0;
      min-width: 0;
    }
    dialog.uwc-gal__dialog .uwc-gal__item {
      height: 100%;
    }
    dialog.uwc-gal__dialog .uwc-gal__default-img {
      object-fit: contain;
    }
  `
];

// src/galleria/index.ts
var THUMB_W = 80;
var THUMB_H = 60;
var THUMB_GAP = 8;
var UwcGalleria = class extends i4 {
  constructor() {
    super(...arguments);
    this.items = [];
    this.activeIndex = 0;
    this.numVisible = 4;
    this.circular = false;
    this.autoPlay = false;
    this.autoPlayInterval = 4e3;
    this.showThumbnails = false;
    this.showItemNavigators = false;
    this.showItemNavigatorsOnHover = false;
    this.showIndicators = false;
    this.showIndicatorsOnItem = false;
    this.showCaption = false;
    this.thumbnailsPosition = "bottom";
    this.indicatorsPosition = "bottom";
    this.fullscreenEnabled = false;
    this.changeOnIndicatorHover = false;
    /** Responsive breakpoint overrides. */
    this.responsiveOptions = [];
    this._activeIndex = 0;
    this._isFullscreen = false;
    this._isAnimating = false;
    this._liveLabel = "";
    this._effectiveNumVisible = 4;
    this._thumbAtStart = true;
    this._thumbAtEnd = false;
    this._pointerStartX = 0;
    this._pointerStartY = 0;
    this._pointerDragging = false;
    this._isSwiping = false;
  }
  // ── Lifecycle ───────────────────────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback();
    this._activeIndex = this.activeIndex;
    this._applyResponsive();
    this._resizeObserver = new ResizeObserver(() => this._applyResponsive());
    this._resizeObserver.observe(this);
    if (this.autoPlay) this._startAutoplay();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._stopAutoplay();
  }
  firstUpdated() {
    this._updateThumbScrollState();
  }
  updated(changed) {
    if (changed.has("activeIndex")) {
      this._setActiveIndex(this.activeIndex, false);
    }
    if (changed.has("autoPlay") || changed.has("autoPlayInterval")) {
      this._stopAutoplay();
      if (this.autoPlay) this._startAutoplay();
    }
    if (changed.has("items") || changed.has("numVisible")) {
      this._applyResponsive();
    }
    if (changed.has("_activeIndex")) {
      this._scrollActiveThumbIntoView();
    }
  }
  // ── Responsive ──────────────────────────────────────────────────────────────
  _applyResponsive() {
    const w2 = this.offsetWidth;
    let nv = this.numVisible;
    if (this.responsiveOptions.length) {
      const sorted = [...this.responsiveOptions].sort(
        (a3, b3) => parseInt(b3.breakpoint) - parseInt(a3.breakpoint)
      );
      for (const opt of sorted) {
        if (w2 <= parseInt(opt.breakpoint)) {
          nv = opt.numVisible;
        }
      }
    }
    this._effectiveNumVisible = Math.max(1, Math.min(nv, this.items.length || 1));
    this._updateThumbScrollState();
  }
  // ── Navigation ──────────────────────────────────────────────────────────────
  _setActiveIndex(index, animate = true) {
    const len = this.items.length;
    if (len === 0) return;
    let next;
    if (this.circular) {
      next = (index % len + len) % len;
    } else {
      next = Math.max(0, Math.min(index, len - 1));
    }
    if (next === this._activeIndex) return;
    if (animate) {
      this._isAnimating = true;
      setTimeout(() => {
        this._isAnimating = false;
      }, 400);
    }
    this._activeIndex = next;
    this._liveLabel = `Image ${next + 1} of ${len}`;
    emit(this, "uwc-change", { index: next });
  }
  /** Navigate to the previous item. */
  prev() {
    this._setActiveIndex(this._activeIndex - 1);
  }
  /** Navigate to the next item. */
  next() {
    this._setActiveIndex(this._activeIndex + 1);
  }
  /** Navigate to a specific item index (0-based). */
  goTo(index) {
    this._setActiveIndex(index);
  }
  get isPrevDisabled() {
    return !this.circular && this._activeIndex === 0;
  }
  get isNextDisabled() {
    return !this.circular && this._activeIndex >= this.items.length - 1;
  }
  // ── Autoplay ─────────────────────────────────────────────────────────────────
  _startAutoplay() {
    if (!this.autoPlay || this.autoPlayInterval <= 0) return;
    this._autoplayTimer = setInterval(() => {
      const len = this.items.length;
      if (len === 0) return;
      const next = this.circular ? (this._activeIndex + 1) % len : this._activeIndex < len - 1 ? this._activeIndex + 1 : 0;
      this._setActiveIndex(next);
    }, this.autoPlayInterval);
  }
  _stopAutoplay() {
    if (this._autoplayTimer) {
      clearInterval(this._autoplayTimer);
      this._autoplayTimer = void 0;
    }
  }
  // ── Thumbnail scroll ─────────────────────────────────────────────────────────
  _scrollActiveThumbIntoView() {
    requestAnimationFrame(() => {
      this.renderRoot.querySelector(".uwc-gal__thumb-item.is-active")?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    });
  }
  _scrollThumbs(dir) {
    const viewport = this.renderRoot.querySelector(".uwc-gal__thumb-viewport");
    if (!viewport) return;
    const isVert = this.thumbnailsPosition === "left" || this.thumbnailsPosition === "right";
    const step = this._effectiveNumVisible * ((isVert ? THUMB_H : THUMB_W) + THUMB_GAP);
    if (isVert) {
      viewport.scrollBy({ top: dir === "next" ? step : -step, behavior: "smooth" });
    } else {
      viewport.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
    }
  }
  _updateThumbScrollState() {
    const viewport = this.renderRoot.querySelector(".uwc-gal__thumb-viewport");
    if (!viewport) return;
    const isVert = this.thumbnailsPosition === "left" || this.thumbnailsPosition === "right";
    const scrollPos = isVert ? viewport.scrollTop : viewport.scrollLeft;
    const scrollSize = isVert ? viewport.scrollHeight : viewport.scrollWidth;
    const clientSize = isVert ? viewport.clientHeight : viewport.clientWidth;
    this._thumbAtStart = scrollPos <= 1;
    this._thumbAtEnd = scrollPos + clientSize >= scrollSize - 1;
  }
  _onThumbScroll() {
    this._updateThumbScrollState();
  }
  // ── Event handlers ───────────────────────────────────────────────────────────
  _onKeyDown(e8) {
    switch (e8.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e8.preventDefault();
        this.prev();
        break;
      case "ArrowRight":
      case "ArrowDown":
        e8.preventDefault();
        this.next();
        break;
      case "Home":
        e8.preventDefault();
        this._setActiveIndex(0);
        break;
      case "End":
        e8.preventDefault();
        this._setActiveIndex(this.items.length - 1);
        break;
      case "Escape":
        if (this._isFullscreen) this._closeFullscreen();
        break;
    }
  }
  _onPointerDown(e8) {
    if (e8.button !== 0) return;
    this._pointerStartX = e8.clientX;
    this._pointerStartY = e8.clientY;
    this._pointerDragging = true;
    this._isSwiping = false;
    this._stopAutoplay();
  }
  _onPointerMove(e8) {
    if (!this._pointerDragging || this._isSwiping) return;
    const dx = Math.abs(e8.clientX - this._pointerStartX);
    const dy = Math.abs(e8.clientY - this._pointerStartY);
    if (dx > 8 && dx > dy) {
      this._isSwiping = true;
      e8.currentTarget.setPointerCapture(e8.pointerId);
    }
  }
  _onPointerUp(e8) {
    if (!this._pointerDragging) return;
    this._pointerDragging = false;
    if (this._isSwiping) {
      this._isSwiping = false;
      const dx = e8.clientX - this._pointerStartX;
      const dy = e8.clientY - this._pointerStartY;
      const threshold = 50;
      if (Math.abs(dx) >= Math.abs(dy) && Math.abs(dx) >= threshold) {
        dx < 0 ? this.next() : this.prev();
      }
    }
    if (this.autoPlay) this._startAutoplay();
  }
  _onPointerCancel() {
    this._pointerDragging = false;
    this._isSwiping = false;
    if (this.autoPlay) this._startAutoplay();
  }
  // ── Fullscreen ───────────────────────────────────────────────────────────────
  async _openFullscreen() {
    this._isFullscreen = true;
    await this.updateComplete;
    this._dialog?.showModal();
    this._dialog?.querySelector(".uwc-gal__close-btn uwc-button")?.focus();
    emit(this, "uwc-fullscreen-open", {});
  }
  _closeFullscreen() {
    this._dialog?.close();
    this._isFullscreen = false;
    emit(this, "uwc-fullscreen-close", {});
  }
  // ── Default templates ────────────────────────────────────────────────────────
  _getItemSrc(item) {
    const it = item;
    return String(it["itemImageSrc"] ?? it["src"] ?? it["image"] ?? it["url"] ?? "");
  }
  _getItemAlt(item) {
    const it = item;
    return String(it["alt"] ?? it["title"] ?? "");
  }
  _defaultItemTpl(item) {
    const src = this._getItemSrc(item);
    const alt = this._getItemAlt(item);
    return b2`<img class="uwc-gal__default-img" src=${src} alt=${alt} loading="lazy" draggable="false" />`;
  }
  _defaultThumbTpl(item) {
    const it = item;
    const src = String(it["thumbnailImageSrc"] ?? it["thumb"] ?? it["thumbnail"] ?? this._getItemSrc(item));
    const alt = this._getItemAlt(item);
    return b2`<img class="uwc-gal__default-thumb" src=${src} alt=${alt} loading="lazy" draggable="false" />`;
  }
  _defaultCaptionTpl(item) {
    const it = item;
    const title = it["title"] ? String(it["title"]) : "";
    const desc = it["description"] ? String(it["description"]) : it["alt"] ? String(it["alt"]) : "";
    return b2`
      ${title ? b2`<p class="uwc-gal__caption-title">${title}</p>` : A}
      ${desc ? b2`<p class="uwc-gal__caption-desc">${desc}</p>` : A}
    `;
  }
  // ── Render helpers ───────────────────────────────────────────────────────────
  _renderNavBtn(dir) {
    const isPrev = dir === "prev";
    const icon = isPrev ? "chevron-left" : "chevron-right";
    const label = isPrev ? "Previous image" : "Next image";
    const disabled = isPrev ? this.isPrevDisabled : this.isNextDisabled;
    const handler = isPrev ? () => this.prev() : () => this.next();
    return b2`
      <uwc-button
        icon=${icon}
        icon-only
        aria-label=${label}
        rounded
        variant="secondary"
        outline
        ?disabled=${disabled}
        @uwc-click=${handler}
      ></uwc-button>
    `;
  }
  _renderIndicators(inItem = false) {
    const posClass = `uwc-gal__indicators--${this.indicatorsPosition}`;
    const classes = {
      "uwc-gal__indicators": true,
      "uwc-gal__indicators--on-item": inItem,
      "uwc-gal__indicators--top": inItem && this.indicatorsPosition === "top",
      "uwc-gal__indicators--bottom": inItem && this.indicatorsPosition === "bottom",
      [posClass]: !inItem
    };
    return b2`
      <div
        class=${e7(classes)}
        role="tablist"
        aria-label="Gallery indicators"
      >
        ${c4(
      this.items,
      (_2, i7) => i7,
      (_2, i7) => b2`
            <button
              type="button"
              class=${e7({ "uwc-gal__indicator": true, "is-active": i7 === this._activeIndex })}
              role="tab"
              aria-selected=${i7 === this._activeIndex ? "true" : "false"}
              aria-label="Go to image ${i7 + 1}"
              @click=${() => this._setActiveIndex(i7)}
              @mouseenter=${this.changeOnIndicatorHover ? () => this._setActiveIndex(i7) : A}
            ></button>
          `
    )}
      </div>
    `;
  }
  _renderThumbnailStrip() {
    const isVert = this.thumbnailsPosition === "left" || this.thumbnailsPosition === "right";
    return b2`
      <div class=${e7({ "uwc-gal__thumbnails": true, "uwc-gal__thumbnails--vert": isVert })}>
        <!-- Scroll prev -->
        <uwc-button
          size="small"
          text
          icon-only
          icon=${isVert ? "chevron-up" : "chevron-left"}
          aria-label="Scroll thumbnails backward"
          ?disabled=${this._thumbAtStart}
          @uwc-click=${() => this._scrollThumbs("prev")}
        ></uwc-button>

        <!-- Viewport + track -->
        <div class="uwc-gal__thumb-viewport" @scroll=${this._onThumbScroll}>
          <div class=${e7({ "uwc-gal__thumb-track": true, "uwc-gal__thumb-track--vert": isVert })}>
            ${c4(
      this.items,
      (_2, i7) => i7,
      (item, i7) => b2`
                <button
                  type="button"
                  class=${e7({ "uwc-gal__thumb-item": true, "is-active": i7 === this._activeIndex })}
                  aria-label="View image ${i7 + 1}"
                  aria-pressed=${i7 === this._activeIndex ? "true" : "false"}
                  @click=${() => this._setActiveIndex(i7)}
                >
                  ${this.thumbnailTemplate ? this.thumbnailTemplate(item, i7) : this._defaultThumbTpl(item)}
                </button>
              `
    )}
          </div>
        </div>

        <!-- Scroll next -->
        <uwc-button
          size="small"
          text
          icon-only
          icon=${isVert ? "chevron-down" : "chevron-right"}
          aria-label="Scroll thumbnails forward"
          ?disabled=${this._thumbAtEnd}
          @uwc-click=${() => this._scrollThumbs("next")}
        ></uwc-button>
      </div>
    `;
  }
  _renderItemSection(inFullscreen = false) {
    const showNav = this.showItemNavigators || this.showItemNavigatorsOnHover;
    const hoverNav = this.showItemNavigatorsOnHover && !this.showItemNavigators;
    const activeItem = this.items[this._activeIndex];
    const topIndicators = this.showIndicators && !this.showIndicatorsOnItem && this.indicatorsPosition === "top" ? this._renderIndicators(false) : A;
    const bottomIndicators = this.showIndicators && !this.showIndicatorsOnItem && this.indicatorsPosition === "bottom" ? this._renderIndicators(false) : A;
    const onItemIndicators = this.showIndicators && this.showIndicatorsOnItem ? this._renderIndicators(true) : A;
    return b2`
      <div class="uwc-gal__item-section">
        ${topIndicators}

        <div
          class=${e7({
      "uwc-gal__item-wrapper": true,
      "uwc-gal__item-wrapper--has-hover-nav": hoverNav
    })}
          tabindex="0"
          role="group"
          aria-roledescription="gallery"
          aria-label="Image gallery"
          @keydown=${this._onKeyDown}
          @pointerdown=${this._onPointerDown}
          @pointermove=${this._onPointerMove}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
        >
          <!-- Prev nav area -->
          ${showNav ? b2`
            <div class="uwc-gal__nav-area uwc-gal__nav-area--prev">
              ${this._renderNavBtn("prev")}
            </div>
          ` : A}

          <!-- Active item -->
          <div
            class=${e7({ "uwc-gal__item": true, "is-animating": this._isAnimating })}
            role="img"
            aria-label=${this._liveLabel || `Image ${this._activeIndex + 1} of ${this.items.length}`}
          >
            ${activeItem != null ? this.itemTemplate ? this.itemTemplate(activeItem, this._activeIndex) : this._defaultItemTpl(activeItem) : A}

            <!-- Caption overlay -->
            ${this.showCaption && activeItem != null ? b2`
              <div class="uwc-gal__caption">
                ${this.captionTemplate ? this.captionTemplate(activeItem, this._activeIndex) : this._defaultCaptionTpl(activeItem)}
              </div>
            ` : A}

            <!-- On-item indicators -->
            ${onItemIndicators}
          </div>

          <!-- Next nav area -->
          ${showNav ? b2`
            <div class="uwc-gal__nav-area uwc-gal__nav-area--next">
              ${this._renderNavBtn("next")}
            </div>
          ` : A}

          <!-- Fullscreen open button (only when not already in fullscreen) -->
          ${this.fullscreenEnabled && !inFullscreen ? b2`
            <div class="uwc-gal__fullscreen-btn">
              <uwc-button
                icon="arrows-fullscreen"
                icon-only
                size="small"
                variant="secondary"
                outline
                aria-label="Open fullscreen"
                @uwc-click=${this._openFullscreen}
              ></uwc-button>
            </div>
          ` : A}

          <!-- Close button (only when in fullscreen) -->
          ${inFullscreen ? b2`
            <div class="uwc-gal__close-btn">
              <uwc-button
                icon="x-lg"
                icon-only
                size="small"
                variant="secondary"
                outline
                aria-label="Close fullscreen"
                @uwc-click=${this._closeFullscreen}
              ></uwc-button>
            </div>
          ` : A}
        </div>

        ${bottomIndicators}
      </div>
    `;
  }
  _renderContent(inFullscreen = false) {
    const pos = this.thumbnailsPosition;
    const isVert = pos === "left" || pos === "right";
    const contentClasses = {
      "uwc-gal__content": true,
      "uwc-gal__content--left": pos === "left",
      "uwc-gal__content--right": pos === "right"
    };
    const thumbStrip = this.showThumbnails ? this._renderThumbnailStrip() : A;
    const itemSection = this._renderItemSection(inFullscreen);
    if (pos === "top") {
      return b2`
        <div class=${e7(contentClasses)}>
          ${thumbStrip}
          ${itemSection}
        </div>
      `;
    }
    if (pos === "left") {
      return b2`
        <div class=${e7(contentClasses)}>
          ${thumbStrip}
          ${itemSection}
        </div>
      `;
    }
    if (pos === "right") {
      return b2`
        <div class=${e7(contentClasses)}>
          ${itemSection}
          ${thumbStrip}
        </div>
      `;
    }
    return b2`
      <div class=${e7(contentClasses)}>
        ${itemSection}
        ${thumbStrip}
      </div>
    `;
  }
  // ── Render ────────────────────────────────────────────────────────────────────
  render() {
    return b2`
      <!-- Live region for screen readers -->
      <div
        aria-live="polite"
        aria-atomic="true"
        style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap"
      >${this._liveLabel}</div>

      <slot name="header"></slot>

      <div class="uwc-gal">
        ${this._renderContent()}
      </div>

      <slot name="footer"></slot>

      ${this._isFullscreen ? b2`
        <dialog
          class="uwc-gal__dialog"
          @close=${this._closeFullscreen}
          @keydown=${this._onKeyDown}
        >
          <div class="uwc-gal">
            ${this._renderContent(true)}
          </div>
        </dialog>
      ` : A}
    `;
  }
};
UwcGalleria.styles = styles_default;
__decorateClass([
  n4({ type: Array })
], UwcGalleria.prototype, "items", 2);
__decorateClass([
  n4({ type: Number, attribute: "active-index" })
], UwcGalleria.prototype, "activeIndex", 2);
__decorateClass([
  n4({ type: Number, attribute: "num-visible" })
], UwcGalleria.prototype, "numVisible", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcGalleria.prototype, "circular", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "auto-play" })
], UwcGalleria.prototype, "autoPlay", 2);
__decorateClass([
  n4({ type: Number, attribute: "auto-play-interval" })
], UwcGalleria.prototype, "autoPlayInterval", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-thumbnails" })
], UwcGalleria.prototype, "showThumbnails", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-item-navigators" })
], UwcGalleria.prototype, "showItemNavigators", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-item-navigators-on-hover" })
], UwcGalleria.prototype, "showItemNavigatorsOnHover", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-indicators" })
], UwcGalleria.prototype, "showIndicators", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-indicators-on-item" })
], UwcGalleria.prototype, "showIndicatorsOnItem", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-caption" })
], UwcGalleria.prototype, "showCaption", 2);
__decorateClass([
  n4({ attribute: "thumbnails-position" })
], UwcGalleria.prototype, "thumbnailsPosition", 2);
__decorateClass([
  n4({ attribute: "indicators-position" })
], UwcGalleria.prototype, "indicatorsPosition", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "fullscreen-enabled" })
], UwcGalleria.prototype, "fullscreenEnabled", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "change-on-indicator-hover" })
], UwcGalleria.prototype, "changeOnIndicatorHover", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_activeIndex", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_isFullscreen", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_isAnimating", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_liveLabel", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_effectiveNumVisible", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_thumbAtStart", 2);
__decorateClass([
  r5()
], UwcGalleria.prototype, "_thumbAtEnd", 2);
__decorateClass([
  e5("dialog")
], UwcGalleria.prototype, "_dialog", 2);

// src/galleria/react.ts
var UwcGalleriaReact = createComponent({
  react: React,
  tagName: "uwc-galleria",
  elementClass: UwcGalleria,
  events: {
    onUwcChange: "uwc-change",
    onUwcFullscreenOpen: "uwc-fullscreen-open",
    onUwcFullscreenClose: "uwc-fullscreen-close"
  }
});
export {
  UwcGalleriaReact as UwcGalleria,
  UwcGalleriaReact
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
