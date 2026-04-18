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

// src/paginator/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t5, e7, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5, this.t = e7;
  }
  get styleSheet() {
    let t5 = this.o;
    const s5 = this.t;
    if (e && void 0 === t5) {
      const e7 = void 0 !== s5 && 1 === s5.length;
      e7 && (t5 = o.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && o.set(s5, t5));
    }
    return t5;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
var i = (t5, ...e7) => {
  const o6 = 1 === t5.length ? t5[0] : e7.reduce((e8, s5, o7) => e8 + ((t6) => {
    if (true === t6._$cssResult$) return t6.cssText;
    if ("number" == typeof t6) return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t5[o7 + 1], t5[0]);
  return new n(o6, t5, s);
};
var S = (s5, o6) => {
  if (e) s5.adoptedStyleSheets = o6.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
  else for (const e7 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e7.cssText, s5.appendChild(o7);
  }
};
var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e7 = "";
  for (const s5 of t6.cssRules) e7 += s5.cssText;
  return r(e7);
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
    const { get: e7, set: r6 } = h(this.prototype, t5) ?? { get() {
      return this[s5];
    }, set(t6) {
      this[s5] = t6;
    } };
    return { get: e7, set(s6) {
      const h4 = e7?.call(this);
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
      const e7 = new Set(s5.flat(1 / 0).reverse());
      for (const s6 of e7) i7.unshift(c(s6));
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
    const i7 = this.constructor.elementProperties.get(t5), e7 = this.constructor._$Eu(t5, i7);
    if (void 0 !== e7 && true === i7.reflect) {
      const h4 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s5, i7.type);
      this._$Em = t5, null == h4 ? this.removeAttribute(e7) : this.setAttribute(e7, h4), this._$Em = null;
    }
  }
  _$AK(t5, s5) {
    const i7 = this.constructor, e7 = i7._$Eh.get(t5);
    if (void 0 !== e7 && this._$Em !== e7) {
      const t6 = i7.getPropertyOptions(e7), h4 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
      this._$Em = e7;
      const r6 = h4.fromAttribute(s5, t6.type);
      this[e7] = r6 ?? this._$Ej?.get(e7) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t5, s5, i7, e7 = false, h4) {
    if (void 0 !== t5) {
      const r6 = this.constructor;
      if (false === e7 && (h4 = this[t5]), i7 ?? (i7 = r6.getPropertyOptions(t5)), !((i7.hasChanged ?? f)(h4, s5) || i7.useDefault && i7.reflect && h4 === this._$Ej?.get(t5) && !this.hasAttribute(r6._$Eu(t5, i7)))) return;
      this.C(t5, s5, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t5, s5, { useDefault: i7, reflect: e7, wrapped: h4 }, r6) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r6 ?? s5 ?? this[t5]), true !== h4 || void 0 !== r6) || (this._$AL.has(t5) || (this.hasUpdated || i7 || (s5 = void 0), this._$AL.set(t5, s5)), true === e7 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
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
        const { wrapped: t7 } = i7, e7 = this[s6];
        true !== t7 || this._$AL.has(s6) || void 0 === e7 || this.C(s6, void 0, i7, e7);
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
  const s5 = t5.length - 1, e7 = [];
  let n5, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
  for (let i8 = 0; i8 < s5; i8++) {
    const s6 = t5[i8];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n5 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n5 = void 0);
    const x2 = c5 === p2 && t5[i8 + 1].startsWith("/>") ? " " : "";
    l3 += c5 === v ? s6 + r3 : d3 >= 0 ? (e7.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t5, l3 + (t5[s5] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e7];
};
var S2 = class _S {
  constructor({ strings: t5, _$litType$: i7 }, e7) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u5 = t5.length - 1, d3 = this.parts, [f3, v3] = N(t5, i7);
    if (this.el = _S.createElement(f3, e7), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t6 of r6.getAttributeNames()) if (t6.endsWith(h2)) {
          const i8 = v3[a3++], s5 = r6.getAttribute(t6).split(o3), e8 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l3, name: e8[2], strings: s5, ctor: "." === e8[1] ? I : "?" === e8[1] ? L : "@" === e8[1] ? z : H }), r6.removeAttribute(t6);
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
function M(t5, i7, s5 = t5, e7) {
  if (i7 === E) return i7;
  let h4 = void 0 !== e7 ? s5._$Co?.[e7] : s5._$Cl;
  const o6 = a2(i7) ? void 0 : i7._$litDirective$;
  return h4?.constructor !== o6 && (h4?._$AO?.(false), void 0 === o6 ? h4 = void 0 : (h4 = new o6(t5), h4._$AT(t5, s5, e7)), void 0 !== e7 ? (s5._$Co ?? (s5._$Co = []))[e7] = h4 : s5._$Cl = h4), void 0 !== h4 && (i7 = M(t5, h4._$AS(t5, i7.values), h4, e7)), i7;
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
    const { el: { content: i7 }, parts: s5 } = this._$AD, e7 = (t5?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e7;
    let h4 = P.nextNode(), o6 = 0, n5 = 0, r6 = s5[0];
    for (; void 0 !== r6; ) {
      if (o6 === r6.index) {
        let i8;
        2 === r6.type ? i8 = new k(h4, h4.nextSibling, this, t5) : 1 === r6.type ? i8 = new r6.ctor(h4, r6.name, r6.strings, this, t5) : 6 === r6.type && (i8 = new Z(h4, this, t5)), this._$AV.push(i8), r6 = s5[++n5];
      }
      o6 !== r6?.index && (h4 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e7;
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
  constructor(t5, i7, s5, e7) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i7, this._$AM = s5, this.options = e7, this._$Cv = e7?.isConnected ?? true;
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
    const { values: i7, _$litType$: s5 } = t5, e7 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = S2.createElement(V(s5.h, s5.h[0]), this.options)), s5);
    if (this._$AH?._$AD === e7) this._$AH.p(i7);
    else {
      const t6 = new R(e7, this), s6 = t6.u(this.options);
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
    let s5, e7 = 0;
    for (const h4 of t5) e7 === i7.length ? i7.push(s5 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s5 = i7[e7], s5._$AI(h4), e7++;
    e7 < i7.length && (this._$AR(s5 && s5._$AB.nextSibling, e7), i7.length = e7);
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
  constructor(t5, i7, s5, e7, h4) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i7, this._$AM = e7, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = A;
  }
  _$AI(t5, i7 = this, s5, e7) {
    const h4 = this.strings;
    let o6 = false;
    if (void 0 === h4) t5 = M(this, t5, i7, 0), o6 = !a2(t5) || t5 !== this._$AH && t5 !== E, o6 && (this._$AH = t5);
    else {
      const e8 = t5;
      let n5, r6;
      for (t5 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r6 = M(this, e8[s5 + n5], i7, n5), r6 === E && (r6 = this._$AH[n5]), o6 || (o6 = !a2(r6) || r6 !== this._$AH[n5]), r6 === A ? t5 = A : t5 !== A && (t5 += (r6 ?? "") + h4[n5 + 1]), this._$AH[n5] = r6;
    }
    o6 && !e7 && this.j(t5);
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
  constructor(t5, i7, s5, e7, h4) {
    super(t5, i7, s5, e7, h4), this.type = 5;
  }
  _$AI(t5, i7 = this) {
    if ((t5 = M(this, t5, i7, 0) ?? A) === E) return;
    const s5 = this._$AH, e7 = t5 === A && s5 !== A || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h4 = t5 !== A && (s5 === A || e7);
    e7 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
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
  const e7 = s5?.renderBefore ?? i7;
  let h4 = e7._$litPart$;
  if (void 0 === h4) {
    const t6 = s5?.renderBefore ?? null;
    e7._$litPart$ = h4 = new k(i7.insertBefore(c3(), t6), t6, void 0, s5 ?? {});
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
var r4 = (t5 = o5, e7, r6) => {
  const { kind: n5, metadata: i7 } = r6;
  let s5 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i7, s5 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t5 = Object.create(t5)).wrapped = true), s5.set(r6.name, t5), "accessor" === n5) {
    const { name: o6 } = r6;
    return { set(r7) {
      const n6 = e7.get.call(this);
      e7.set.call(this, r7), this.requestUpdate(o6, n6, t5, true, r7);
    }, init(e8) {
      return void 0 !== e8 && this.C(o6, void 0, t5, e8), e8;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r6;
    return function(r7) {
      const n6 = this[o6];
      e7.call(this, r7), this.requestUpdate(o6, n6, t5, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t5) {
  return (e7, o6) => "object" == typeof o6 ? r4(t5, e7, o6) : ((t6, e8, o7) => {
    const r6 = e8.hasOwnProperty(o7);
    return e8.constructor.createProperty(o7, t6), r6 ? Object.getOwnPropertyDescriptor(e8, o7) : void 0;
  })(t5, e7, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t5) => (...e7) => ({ _$litDirective$: t5, values: e7 });
var i5 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e7, i7) {
    this._$Ct = t5, this._$AM = e7, this._$Ci = i7;
  }
  _$AS(t5, e7) {
    return this.update(t5, e7);
  }
  update(t5, e7) {
    return this.render(...e7);
  }
};

// node_modules/lit-html/directives/class-map.js
var e6 = e5(class extends i5 {
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
var v2 = (o6, n5, e7) => {
  const l3 = o6._$AA.parentNode, d3 = void 0 === n5 ? o6._$AB : n5._$AA;
  if (void 0 === e7) {
    const i7 = l3.insertBefore(s4(), d3), n6 = l3.insertBefore(s4(), d3);
    e7 = new t4(i7, n6, o6, o6.options);
  } else {
    const t5 = e7._$AB.nextSibling, n6 = e7._$AM, c5 = n6 !== o6;
    if (c5) {
      let t6;
      e7._$AQ?.(o6), e7._$AM = o6, void 0 !== e7._$AP && (t6 = o6._$AU) !== n6._$AU && e7._$AP(t6);
    }
    if (t5 !== d3 || c5) {
      let o7 = e7._$AA;
      for (; o7 !== t5; ) {
        const t6 = i6(o7).nextSibling;
        i6(l3).insertBefore(o7, d3), o7 = t6;
      }
    }
  }
  return e7;
};
var u3 = (o6, t5, i7 = o6) => (o6._$AI(t5, i7), o6);
var m2 = {};
var p3 = (o6, t5 = m2) => o6._$AH = t5;
var M2 = (o6) => o6._$AH;
var h3 = (o6) => {
  o6._$AR(), o6._$AA.remove();
};

// node_modules/lit-html/directives/repeat.js
var u4 = (e7, s5, t5) => {
  const r6 = /* @__PURE__ */ new Map();
  for (let l3 = s5; l3 <= t5; l3++) r6.set(e7[l3], l3);
  return r6;
};
var c4 = e5(class extends i5 {
  constructor(e7) {
    if (super(e7), e7.type !== t3.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e7, s5, t5) {
    let r6;
    void 0 === t5 ? t5 = s5 : void 0 !== s5 && (r6 = s5);
    const l3 = [], o6 = [];
    let i7 = 0;
    for (const s6 of e7) l3[i7] = r6 ? r6(s6, i7) : i7, o6[i7] = t5(s6, i7), i7++;
    return { values: o6, keys: l3 };
  }
  render(e7, s5, t5) {
    return this.dt(e7, s5, t5).values;
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
      const e7 = y3.get(a3[k2]), t6 = void 0 !== e7 ? d3[e7] : null;
      if (null === t6) {
        const e8 = v2(s5, d3[x2]);
        u3(e8, p4[k2]), v3[k2] = e8;
      } else v3[k2] = u3(t6, p4[k2]), v2(s5, d3[x2], t6), d3[e7] = null;
      k2++;
    } else h3(d3[j2]), j2--;
    else h3(d3[x2]), x2++;
    for (; k2 <= w2; ) {
      const e7 = v2(s5, v3[w2 + 1]);
      u3(e7, p4[k2]), v3[k2++] = e7;
    }
    for (; x2 <= j2; ) {
      const e7 = d3[x2++];
      null !== e7 && h3(e7);
    }
    return this.ut = a3, p3(s5, v3), E;
  }
});

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

// src/paginator/styles.ts
var styles_default = [
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
      --_color: var(--uwc-paginator-active-color, ${colorWhite});
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
      border:        1px solid ${borderControl};
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
      border:        1px solid ${borderControl};
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
      border:        1px solid ${borderControl};
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
    return this.rowsPerPageOptions.split(",").map((s5) => parseInt(s5.trim(), 10)).filter((n5) => !isNaN(n5));
  }
  /** Build the sliding-window page number array with -1 as ellipsis sentinel */
  _buildPageLinks() {
    const pc = this._pageCount;
    const cur = this._currentPage;
    const max = this.pageLinks;
    if (pc <= max) {
      return Array.from({ length: pc }, (_2, i7) => i7);
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
    for (let i7 = start; i7 <= end; i7++) pages.push(i7);
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
  _onJumpInput(e7) {
    this._jumpValue = e7.target.value;
  }
  _onJumpKeydown(e7) {
    if (e7.key === "Enter") this._commitJump();
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
  _onJumpDropdownChange(e7) {
    const page = parseInt(e7.target.value, 10);
    if (!isNaN(page)) this._goToPage(page);
  }
  _onRppChange(e7) {
    const rows = parseInt(e7.target.value, 10);
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
          ${this._rppOptions.map((n5) => b2`<option value=${n5} ?selected=${n5 === this.rows}>${n5}</option>`)}
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
          ${Array.from({ length: pc }, (_2, i7) => b2`
            <option value=${i7} ?selected=${i7 === cur}>${i7 + 1}</option>
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
              class=${e6({ "uwc-pg__btn": true, "uwc-pg__page": true, "uwc-pg__page--active": active })}
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
UwcPaginator.styles = styles_default;
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
var UwcPaginator2 = createComponent({
  tagName: "uwc-paginator",
  elementClass: UwcPaginator,
  react: React,
  events: {
    onUwcPageChange: "uwc-page-change"
  }
});
export {
  UwcPaginator2 as UwcPaginator
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
