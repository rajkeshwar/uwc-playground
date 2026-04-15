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

// src/dropdown/react.ts
import { createComponent } from "@lit/react";
import React from "react";

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
    const { get: e8, set: r7 } = h(this.prototype, t5) ?? { get() {
      return this[s5];
    }, set(t6) {
      this[s5] = t6;
    } };
    return { get: e8, set(s6) {
      const h4 = e8?.call(this);
      r7?.call(this, s6), this.requestUpdate(t5, h4, i7);
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
      const r7 = h4.fromAttribute(s5, t6.type);
      this[e8] = r7 ?? this._$Ej?.get(e8) ?? r7, this._$Em = null;
    }
  }
  requestUpdate(t5, s5, i7, e8 = false, h4) {
    if (void 0 !== t5) {
      const r7 = this.constructor;
      if (false === e8 && (h4 = this[t5]), i7 ?? (i7 = r7.getPropertyOptions(t5)), !((i7.hasChanged ?? f)(h4, s5) || i7.useDefault && i7.reflect && h4 === this._$Ej?.get(t5) && !this.hasAttribute(r7._$Eu(t5, i7)))) return;
      this.C(t5, s5, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t5, s5, { useDefault: i7, reflect: e8, wrapped: h4 }, r7) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r7 ?? s5 ?? this[t5]), true !== h4 || void 0 !== r7) || (this._$AL.has(t5) || (this.hasUpdated || i7 || (s5 = void 0), this._$AL.set(t5, s5)), true === e8 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
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
  let n5, l4 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
  for (let i8 = 0; i8 < s5; i8++) {
    const s6 = t5[i8];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n5 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n5 = void 0);
    const x2 = c5 === p2 && t5[i8 + 1].startsWith("/>") ? " " : "";
    l4 += c5 === v ? s6 + r3 : d3 >= 0 ? (e8.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t5, l4 + (t5[s5] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t5, _$litType$: i7 }, e8) {
    let r7;
    this.parts = [];
    let l4 = 0, a3 = 0;
    const u5 = t5.length - 1, d3 = this.parts, [f3, v3] = N(t5, i7);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r7 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t6 of r7.getAttributeNames()) if (t6.endsWith(h2)) {
          const i8 = v3[a3++], s5 = r7.getAttribute(t6).split(o3), e9 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l4, name: e9[2], strings: s5, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r7.removeAttribute(t6);
        } else t6.startsWith(o3) && (d3.push({ type: 6, index: l4 }), r7.removeAttribute(t6));
        if (y2.test(r7.tagName)) {
          const t6 = r7.textContent.split(o3), i8 = t6.length - 1;
          if (i8 > 0) {
            r7.textContent = s2 ? s2.emptyScript : "";
            for (let s5 = 0; s5 < i8; s5++) r7.append(t6[s5], c3()), P.nextNode(), d3.push({ type: 2, index: ++l4 });
            r7.append(t6[i8], c3());
          }
        }
      } else if (8 === r7.nodeType) if (r7.data === n3) d3.push({ type: 2, index: l4 });
      else {
        let t6 = -1;
        for (; -1 !== (t6 = r7.data.indexOf(o3, t6 + 1)); ) d3.push({ type: 7, index: l4 }), t6 += o3.length - 1;
      }
      l4++;
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
    let h4 = P.nextNode(), o6 = 0, n5 = 0, r7 = s5[0];
    for (; void 0 !== r7; ) {
      if (o6 === r7.index) {
        let i8;
        2 === r7.type ? i8 = new k(h4, h4.nextSibling, this, t5) : 1 === r7.type ? i8 = new r7.ctor(h4, r7.name, r7.strings, this, t5) : 6 === r7.type && (i8 = new Z(h4, this, t5)), this._$AV.push(i8), r7 = s5[++n5];
      }
      o6 !== r7?.index && (h4 = P.nextNode(), o6++);
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
      let n5, r7;
      for (t5 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r7 = M(this, e9[s5 + n5], i7, n5), r7 === E && (r7 = this._$AH[n5]), o6 || (o6 = !a2(r7) || r7 !== this._$AH[n5]), r7 === A ? t5 = A : t5 !== A && (t5 += (r7 ?? "") + h4[n5 + 1]), this._$AH[n5] = r7;
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
    const r7 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = D(r7, this.renderRoot, this.renderOptions);
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

// src/dropdown/styles.ts
var styles_default = [
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

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t5 = o5, e8, r7) => {
  const { kind: n5, metadata: i7 } = r7;
  let s5 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i7, s5 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t5 = Object.create(t5)).wrapped = true), s5.set(r7.name, t5), "accessor" === n5) {
    const { name: o6 } = r7;
    return { set(r8) {
      const n6 = e8.get.call(this);
      e8.set.call(this, r8), this.requestUpdate(o6, n6, t5, true, r8);
    }, init(e9) {
      return void 0 !== e9 && this.C(o6, void 0, t5, e9), e9;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r7;
    return function(r8) {
      const n6 = this[o6];
      e8.call(this, r8), this.requestUpdate(o6, n6, t5, true, r8);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t5) {
  return (e8, o6) => "object" == typeof o6 ? r4(t5, e8, o6) : ((t6, e9, o7) => {
    const r7 = e9.hasOwnProperty(o7);
    return e9.constructor.createProperty(o7, t6), r7 ? Object.getOwnPropertyDescriptor(e9, o7) : void 0;
  })(t5, e8, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r7) {
  return n4({ ...r7, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t5, c5) => (c5.configurable = true, c5.enumerable = true, Reflect.decorate && "object" != typeof t5 && Object.defineProperty(e8, t5, c5), c5);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r7) {
  return (n5, s5, i7) => {
    const o6 = (t5) => t5.renderRoot?.querySelector(e8) ?? null;
    if (r7) {
      const { get: e9, set: r8 } = "object" == typeof s5 ? n5 : i7 ?? /* @__PURE__ */ (() => {
        const t5 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t5];
        }, set(e10) {
          this[t5] = e10;
        } };
      })();
      return e4(n5, s5, { get() {
        let t5 = e9.call(this);
        return void 0 === t5 && (t5 = o6(this), (null !== t5 || this.hasUpdated) && r8.call(this, t5)), t5;
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

// node_modules/lit-html/directive-helpers.js
var { I: t4 } = j;
var i6 = (o6) => o6;
var r6 = (o6) => void 0 === o6.strings;
var s4 = () => document.createComment("");
var v2 = (o6, n5, e8) => {
  const l4 = o6._$AA.parentNode, d3 = void 0 === n5 ? o6._$AB : n5._$AA;
  if (void 0 === e8) {
    const i7 = l4.insertBefore(s4(), d3), n6 = l4.insertBefore(s4(), d3);
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
        i6(l4).insertBefore(o7, d3), o7 = t6;
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
  const r7 = /* @__PURE__ */ new Map();
  for (let l4 = s5; l4 <= t5; l4++) r7.set(e8[l4], l4);
  return r7;
};
var c4 = e6(class extends i5 {
  constructor(e8) {
    if (super(e8), e8.type !== t3.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e8, s5, t5) {
    let r7;
    void 0 === t5 ? t5 = s5 : void 0 !== s5 && (r7 = s5);
    const l4 = [], o6 = [];
    let i7 = 0;
    for (const s6 of e8) l4[i7] = r7 ? r7(s6, i7) : i7, o6[i7] = t5(s6, i7), i7++;
    return { values: o6, keys: l4 };
  }
  render(e8, s5, t5) {
    return this.dt(e8, s5, t5).values;
  }
  update(s5, [t5, r7, c5]) {
    const d3 = M2(s5), { values: p4, keys: a3 } = this.dt(t5, r7, c5);
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
  update(s5, [i7]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s5.strings && (this.nt = new Set(s5.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
      for (const t5 in i7) i7[t5] && !this.nt?.has(t5) && this.st.add(t5);
      return this.render(i7);
    }
    const r7 = s5.element.classList;
    for (const t5 of this.st) t5 in i7 || (r7.remove(t5), this.st.delete(t5));
    for (const t5 in i7) {
      const s6 = !!i7[t5];
      s6 === this.st.has(t5) || this.nt?.has(t5) || (s6 ? (r7.add(t5), this.st.add(t5)) : (r7.remove(t5), this.st.delete(t5)));
    }
    return E;
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
  update(i7, [t5]) {
    if (t5 === E || t5 === A) return t5;
    const o6 = i7.element, l4 = i7.name;
    if (i7.type === t3.PROPERTY) {
      if (t5 === o6[l4]) return E;
    } else if (i7.type === t3.BOOLEAN_ATTRIBUTE) {
      if (!!t5 === o6.hasAttribute(l4)) return E;
    } else if (i7.type === t3.ATTRIBUTE && o6.getAttribute(l4) === t5 + "") return E;
    return p3(i7), t5;
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
      const first = this.options.find((o6) => !o6.group && !o6.disabled);
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
    return visible.findIndex((o6) => !o6.group && o6.value === this.value);
  }
  // ── Options helpers ──────────────────────────────────────────────
  _filteredOptions() {
    if (!this._filterQuery) return this.options;
    const q = this._filterQuery.toLowerCase();
    return this.options.filter(
      (o6) => o6.group !== void 0 || o6.label.toLowerCase().includes(q)
    );
  }
  _selectableOptions() {
    return this._filteredOptions().filter((o6) => !o6.group && !o6.disabled);
  }
  _labelForValue(val) {
    return this.options.find((o6) => o6.value === val)?.label ?? String(val);
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
  _selectOption(opt, e8, { silent = false } = {}) {
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
        originalEvent: e8
      });
    }
    this.requestUpdate();
  }
  _removeChip(val, e8) {
    e8.stopPropagation();
    if (!this.multiple || !Array.isArray(this.value)) return;
    const prev = this.value;
    this.value = prev.filter((v3) => v3 !== val);
    emit(this, "uwc-change", {
      value: this.value,
      label: this._labelForValue(val)
    });
  }
  _clear(e8) {
    e8.stopPropagation();
    const prev = this.value;
    this.value = this.multiple ? [] : null;
    emit(this, "uwc-clear", { previousValue: prev });
    emit(this, "uwc-change", {
      value: this.value,
      label: ""
    });
  }
  // ── Filter ───────────────────────────────────────────────────────
  _handleFilterInput(e8) {
    this._filterQuery = e8.target.value;
    this._highlightIdx = 0;
    emit(this, "uwc-filter", { query: this._filterQuery, originalEvent: e8 });
  }
  // ── Keyboard navigation ──────────────────────────────────────────
  _handleDropdownKeydown(e8) {
    const opts = this._selectableOptions();
    if (!opts.length) return;
    switch (e8.key) {
      case "ArrowDown":
        e8.preventDefault();
        this._highlightIdx = (this._highlightIdx + 1) % opts.length;
        break;
      case "ArrowUp":
        e8.preventDefault();
        this._highlightIdx = (this._highlightIdx - 1 + opts.length) % opts.length;
        break;
      case "Home":
        e8.preventDefault();
        this._highlightIdx = 0;
        break;
      case "End":
        e8.preventDefault();
        this._highlightIdx = opts.length - 1;
        break;
      case "Enter":
      case " ":
        if (e8.key === " " && this.filter) break;
        e8.preventDefault();
        if (this._highlightIdx >= 0 && opts[this._highlightIdx]) {
          this._selectOption(opts[this._highlightIdx], e8);
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
              @click=${(e8) => this._removeChip(val, e8)}
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
                @click=${(e8) => {
          if (!opt.disabled) this._selectOption(opt, e8);
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
              @keydown=${(e8) => {
      if (["ArrowUp", "ArrowDown"].includes(e8.key)) e8.preventDefault();
    }}
            />
          </div>` : A}

        <div class="options-wrapper">
          ${this._renderOptions()}
        </div>
      </div>`;
  }
};
UwcDropdown.styles = [styles_default];
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
var UwcDropdown2 = createComponent({
  tagName: "uwc-dropdown",
  elementClass: UwcDropdown,
  react: React,
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
export {
  UwcDropdown2 as UwcDropdown
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
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
