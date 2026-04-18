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

// src/datatable/react.ts
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
    const { get: e7, set: r7 } = h(this.prototype, t5) ?? { get() {
      return this[s5];
    }, set(t6) {
      this[s5] = t6;
    } };
    return { get: e7, set(s6) {
      const h4 = e7?.call(this);
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
      const r7 = h4.fromAttribute(s5, t6.type);
      this[e7] = r7 ?? this._$Ej?.get(e7) ?? r7, this._$Em = null;
    }
  }
  requestUpdate(t5, s5, i7, e7 = false, h4) {
    if (void 0 !== t5) {
      const r7 = this.constructor;
      if (false === e7 && (h4 = this[t5]), i7 ?? (i7 = r7.getPropertyOptions(t5)), !((i7.hasChanged ?? f)(h4, s5) || i7.useDefault && i7.reflect && h4 === this._$Ej?.get(t5) && !this.hasAttribute(r7._$Eu(t5, i7)))) return;
      this.C(t5, s5, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t5, s5, { useDefault: i7, reflect: e7, wrapped: h4 }, r7) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r7 ?? s5 ?? this[t5]), true !== h4 || void 0 !== r7) || (this._$AL.has(t5) || (this.hasUpdated || i7 || (s5 = void 0), this._$AL.set(t5, s5)), true === e7 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
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
  let n5, l4 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c5 = v;
  for (let i8 = 0; i8 < s5; i8++) {
    const s6 = t5[i8];
    let a3, u5, d3 = -1, f3 = 0;
    for (; f3 < s6.length && (c5.lastIndex = f3, u5 = c5.exec(s6), null !== u5); ) f3 = c5.lastIndex, c5 === v ? "!--" === u5[1] ? c5 = _ : void 0 !== u5[1] ? c5 = m : void 0 !== u5[2] ? (y2.test(u5[2]) && (n5 = RegExp("</" + u5[2], "g")), c5 = p2) : void 0 !== u5[3] && (c5 = p2) : c5 === p2 ? ">" === u5[0] ? (c5 = n5 ?? v, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? p2 : '"' === u5[3] ? $ : g) : c5 === $ || c5 === g ? c5 = p2 : c5 === _ || c5 === m ? c5 = v : (c5 = p2, n5 = void 0);
    const x2 = c5 === p2 && t5[i8 + 1].startsWith("/>") ? " " : "";
    l4 += c5 === v ? s6 + r3 : d3 >= 0 ? (e7.push(a3), s6.slice(0, d3) + h2 + s6.slice(d3) + o3 + x2) : s6 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t5, l4 + (t5[s5] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e7];
};
var S2 = class _S {
  constructor({ strings: t5, _$litType$: i7 }, e7) {
    let r7;
    this.parts = [];
    let l4 = 0, a3 = 0;
    const u5 = t5.length - 1, d3 = this.parts, [f3, v3] = N(t5, i7);
    if (this.el = _S.createElement(f3, e7), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r7 = P.nextNode()) && d3.length < u5; ) {
      if (1 === r7.nodeType) {
        if (r7.hasAttributes()) for (const t6 of r7.getAttributeNames()) if (t6.endsWith(h2)) {
          const i8 = v3[a3++], s5 = r7.getAttribute(t6).split(o3), e8 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l4, name: e8[2], strings: s5, ctor: "." === e8[1] ? I : "?" === e8[1] ? L : "@" === e8[1] ? z : H }), r7.removeAttribute(t6);
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
    let h4 = P.nextNode(), o6 = 0, n5 = 0, r7 = s5[0];
    for (; void 0 !== r7; ) {
      if (o6 === r7.index) {
        let i8;
        2 === r7.type ? i8 = new k(h4, h4.nextSibling, this, t5) : 1 === r7.type ? i8 = new r7.ctor(h4, r7.name, r7.strings, this, t5) : 6 === r7.type && (i8 = new Z(h4, this, t5)), this._$AV.push(i8), r7 = s5[++n5];
      }
      o6 !== r7?.index && (h4 = P.nextNode(), o6++);
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
      let n5, r7;
      for (t5 = h4[0], n5 = 0; n5 < h4.length - 1; n5++) r7 = M(this, e8[s5 + n5], i7, n5), r7 === E && (r7 = this._$AH[n5]), o6 || (o6 = !a2(r7) || r7 !== this._$AH[n5]), r7 === A ? t5 = A : t5 !== A && (t5 += (r7 ?? "") + h4[n5 + 1]), this._$AH[n5] = r7;
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

// src/datatable/styles.ts
var styles_default = [
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
      background:   var(--uwc-dt-primary-lt, ${selectedBg});
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
      color: ${colorWhite};
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
      color:       ${colorWhite};
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
    .dt-expand-btn.open { background: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); border-color: var(--uwc-dt-primary, var(--uwc-color-primary, ${primary})); color: ${colorWhite}; }

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
      color: ${colorWhite};
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

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e4 = (t5) => (...e7) => ({ _$litDirective$: t5, values: e7 });
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
var e5 = e4(class extends i5 {
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

// node_modules/lit-html/directive-helpers.js
var { I: t4 } = j;
var i6 = (o6) => o6;
var r4 = (o6) => void 0 === o6.strings;
var s4 = () => document.createComment("");
var v2 = (o6, n5, e7) => {
  const l4 = o6._$AA.parentNode, d3 = void 0 === n5 ? o6._$AB : n5._$AA;
  if (void 0 === e7) {
    const i7 = l4.insertBefore(s4(), d3), n6 = l4.insertBefore(s4(), d3);
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
        i6(l4).insertBefore(o7, d3), o7 = t6;
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
  const r7 = /* @__PURE__ */ new Map();
  for (let l4 = s5; l4 <= t5; l4++) r7.set(e7[l4], l4);
  return r7;
};
var c4 = e4(class extends i5 {
  constructor(e7) {
    if (super(e7), e7.type !== t3.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(e7, s5, t5) {
    let r7;
    void 0 === t5 ? t5 = s5 : void 0 !== s5 && (r7 = s5);
    const l4 = [], o6 = [];
    let i7 = 0;
    for (const s6 of e7) l4[i7] = r7 ? r7(s6, i7) : i7, o6[i7] = t5(s6, i7), i7++;
    return { values: o6, keys: l4 };
  }
  render(e7, s5, t5) {
    return this.dt(e7, s5, t5).values;
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

// node_modules/lit-html/directives/live.js
var l3 = e4(class extends i5 {
  constructor(r7) {
    if (super(r7), r7.type !== t3.PROPERTY && r7.type !== t3.ATTRIBUTE && r7.type !== t3.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r4(r7)) throw Error("`live` bindings can only contain a single expression");
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

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r5 = (t5 = o5, e7, r7) => {
  const { kind: n5, metadata: i7 } = r7;
  let s5 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s5 && globalThis.litPropertyMetadata.set(i7, s5 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t5 = Object.create(t5)).wrapped = true), s5.set(r7.name, t5), "accessor" === n5) {
    const { name: o6 } = r7;
    return { set(r8) {
      const n6 = e7.get.call(this);
      e7.set.call(this, r8), this.requestUpdate(o6, n6, t5, true, r8);
    }, init(e8) {
      return void 0 !== e8 && this.C(o6, void 0, t5, e8), e8;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r7;
    return function(r8) {
      const n6 = this[o6];
      e7.call(this, r8), this.requestUpdate(o6, n6, t5, true, r8);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t5) {
  return (e7, o6) => "object" == typeof o6 ? r5(t5, e7, o6) : ((t6, e8, o7) => {
    const r7 = e8.hasOwnProperty(o7);
    return e8.constructor.createProperty(o7, t6), r7 ? Object.getOwnPropertyDescriptor(e8, o7) : void 0;
  })(t5, e7, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r6(r7) {
  return n4({ ...r7, state: true, attribute: false });
}

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
  _sort(field, e7) {
    if (e7.shiftKey) {
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
  _toggleExpand(row, e7) {
    e7.stopPropagation();
    const key = row[this.rowKey];
    const next = new Set(this._expandedKeys);
    next.has(key) ? next.delete(key) : next.add(key);
    this._expandedKeys = next;
  }
  // ── Inline edit ───────────────────────────────────────────────────────────
  _startEdit(row, field, e7) {
    if (e7.detail !== 2) return;
    this._editingCell = { key: row[this.rowKey], field };
  }
  _commitEdit(row, field, e7) {
    const val = e7.target.value;
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
  _startResize(field, e7) {
    e7.preventDefault();
    e7.stopPropagation();
    this._resizingCol = field;
    this._resizeStartX = e7.clientX;
    this._resizeStartW = this._colWidths[field] ?? (this.columns.find((c5) => c5.field === field)?.width ?? 160);
    window.addEventListener("mousemove", this._onMouseMove);
    window.addEventListener("mouseup", this._onMouseUp);
  }
  _onResizeMouseMove(e7) {
    if (!this._resizingCol) return;
    const delta = e7.clientX - this._resizeStartX;
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
  _onPageChange(e7) {
    this._page = e7.detail.page + 1;
    this._pageSize = e7.detail.rows;
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
              @input=${(e7) => {
      this._globalFilter = e7.target.value;
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
          <div class="dt-col-panel" @click=${(e7) => e7.stopPropagation()}>
            <div class="dt-col-panel-hdr">
              <span>Show / hide columns</span>
              <button class="dt-col-close" @click=${() => this._colPanelOpen = false}>×</button>
            </div>
            ${cols.map((c5) => b2`
              <label class="dt-col-item">
                <input type="checkbox"
                  .checked=${!this._hiddenCols.has(c5.field)}
                  @change=${(e7) => {
      const n5 = new Set(this._hiddenCols);
      e7.target.checked ? n5.delete(c5.field) : n5.add(c5.field);
      this._hiddenCols = n5;
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
              @click=${col.sortable ? (e7) => this._sort(col.field, e7) : A}
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
                <div class="dt-resize-handle" @mousedown=${(e7) => this._startResize(col.field, e7)}></div>
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
            .options=${(col.filterOptions ?? []).map((o6) => ({ label: o6.label, value: o6.value }))}
            .value=${f3?.value ?? null}
            placeholder="All"
            placement="bottom-start"
            offset="2"
            show-clear
            @uwc-change=${(e7) => this._setFilter(col.field, "select", { value: String(e7.detail.value ?? "") })}
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
            @uwc-date-select=${(e7) => {
          const d3 = e7.detail.value;
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
              @input=${(e7) => this._setFilter(col.field, "number", { min: e7.target.value })}
            />
            <input type="number" placeholder="Max"
              .value=${l3(String(f3?.max ?? ""))}
              @input=${(e7) => this._setFilter(col.field, "number", { max: e7.target.value })}
            />
          </div>
        `;
      default:
        return b2`
          <div class="dt-text-filter">
            <input type="text" placeholder="Search…"
              .value=${l3(f3?.value ?? "")}
              @input=${(e7) => this._setFilter(col.field, "text", { value: e7.target.value })}
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
        class=${e5({
      "dt-row": true,
      "dt-row--selected": selected,
      "dt-row--expanded": expanded,
      "dt-row--stripe": this.stripedRows
    })}
        @click=${(e7) => this._toggleRow(row, e7)}
      >
        ${this.selectionMode === "multiple" ? b2`
          <td class="dt-td dt-td-check" @click=${(e7) => e7.stopPropagation()}>
            <input type="checkbox" .checked=${selected}
              @change=${(e7) => this._toggleRow(row, e7)}/>
          </td>
        ` : A}

        ${this.rowExpandable ? b2`
          <td class="dt-td dt-td-expand" @click=${(e7) => e7.stopPropagation()}>
            <button class="dt-expand-btn ${expanded ? "open" : ""}" type="button"
              @click=${(e7) => this._toggleExpand(row, e7)}>
              ${expanded ? b2`<svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 3l3 4 3-4" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>` : b2`<svg width="10" height="10" viewBox="0 0 10 10"><path d="M3 2l4 3-4 3" stroke="currentColor" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>`}
            </button>
          </td>
        ` : A}

        ${cols.map((col) => {
      const isEditing = this._editingCell?.key === key && this._editingCell?.field === col.field;
      return b2`
            <td class="dt-td ${col.editable ? "editable" : ""}"
              @click=${col.editable ? (e7) => this._startEdit(row, col.field, e7) : A}
            >
              ${isEditing ? b2`<input class="dt-inline-input" type="text"
                    .value=${l3(String(row[col.field]))}
                    autofocus
                    @keydown=${(e7) => {
        if (e7.key === "Enter") this._commitEdit(row, col.field, e7);
        if (e7.key === "Escape") this._cancelEdit();
      }}
                    @blur=${(e7) => this._commitEdit(row, col.field, e7)}
                    @click=${(e7) => e7.stopPropagation()}
                  />` : this._renderCell(row, col)}
            </td>
          `;
    })}

        <td class="dt-td dt-td-actions" @click=${(e7) => e7.stopPropagation()}>
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
        const n5 = Number(v3);
        return b2`<span class="dt-rating">
          ${Array.from({ length: 5 }, (_2, i7) => b2`<span class="${i7 < n5 ? "star-on" : "star-off"}">★</span>`)}
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
                ${Array.from({ length: 5 }, (_2, i7) => b2`<span class="${i7 < rating ? "star-on" : "star-off"}">★</span>`)}
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
UwcDatatable.styles = [styles_default];
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
  r6()
], UwcDatatable.prototype, "_page", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_pageSize", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_sortMeta", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_filters", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_globalFilter", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_selectedKeys", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_expandedKeys", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_showFilters", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_colWidths", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_editingCell", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_hiddenCols", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_colPanelOpen", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_resizingCol", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_resizeStartX", 2);
__decorateClass([
  r6()
], UwcDatatable.prototype, "_resizeStartW", 2);

// src/datatable/react.ts
var UwcDatatable2 = createComponent({
  tagName: "uwc-datatable",
  elementClass: UwcDatatable,
  react: React,
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
export {
  UwcDatatable2 as UwcDatatable
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
lit-html/directive.js:
lit-html/directives/repeat.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
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

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
