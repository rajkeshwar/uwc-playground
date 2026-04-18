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

// src/virtualscroller/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e6, o7) {
    if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e6;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e6 = void 0 !== s4 && 1 === s4.length;
      e6 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e6) => {
  const o7 = 1 === t4.length ? t4[0] : e6.reduce((e7, s4, o8) => e7 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o8 + 1], t4[0]);
  return new n(o7, t4, s);
};
var S = (s4, o7) => {
  if (e) s4.adoptedStyleSheets = o7.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e6 of o7) {
    const o8 = document.createElement("style"), n6 = t.litNonce;
    void 0 !== n6 && o8.setAttribute("nonce", n6), o8.textContent = e6.cssText, s4.appendChild(o8);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e6 = "";
  for (const s4 of t5.cssRules) e6 += s4.cssText;
  return r(e6);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s4) => t4;
var u = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i7 = t4;
  switch (s4) {
    case Boolean:
      i7 = null !== t4;
      break;
    case Number:
      i7 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i7 = JSON.parse(t4);
      } catch (t5) {
        i7 = null;
      }
  }
  return i7;
} };
var f = (t4, s4) => !i2(t4, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i7 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t4, i7, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i7) {
    const { get: e6, set: r6 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e6, set(s5) {
      const h3 = e6?.call(this);
      r6?.call(this, s5), this.requestUpdate(t4, h3, i7);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
      for (const i7 of s4) this.createProperty(i7, t5[i7]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i7] of s4) this.elementProperties.set(t5, i7);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i7 = this._$Eu(t5, s4);
      void 0 !== i7 && this._$Eh.set(i7, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i7 = [];
    if (Array.isArray(s4)) {
      const e6 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e6) i7.unshift(c(s5));
    } else void 0 !== s4 && i7.push(c(s4));
    return i7;
  }
  static _$Eu(t4, s4) {
    const i7 = s4.attribute;
    return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i7 of s4.keys()) this.hasOwnProperty(i7) && (t4.set(i7, this[i7]), delete this[i7]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s4, i7) {
    this._$AK(t4, i7);
  }
  _$ET(t4, s4) {
    const i7 = this.constructor.elementProperties.get(t4), e6 = this.constructor._$Eu(t4, i7);
    if (void 0 !== e6 && true === i7.reflect) {
      const h3 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s4, i7.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e6) : this.setAttribute(e6, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i7 = this.constructor, e6 = i7._$Eh.get(t4);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t5 = i7.getPropertyOptions(e6), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e6;
      const r6 = h3.fromAttribute(s4, t5.type);
      this[e6] = r6 ?? this._$Ej?.get(e6) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i7, e6 = false, h3) {
    if (void 0 !== t4) {
      const r6 = this.constructor;
      if (false === e6 && (h3 = this[t4]), i7 ?? (i7 = r6.getPropertyOptions(t4)), !((i7.hasChanged ?? f)(h3, s4) || i7.useDefault && i7.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r6._$Eu(t4, i7)))) return;
      this.C(t4, s4, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i7, reflect: e6, wrapped: h3 }, r6) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t4) && (this._$Ej.set(t4, r6 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r6) || (this._$AL.has(t4) || (this.hasUpdated || i7 || (s4 = void 0), this._$AL.set(t4, s4)), true === e6 && this._$Em !== t4 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t4));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t6, s5] of this._$Ep) this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s5, i7] of t5) {
        const { wrapped: t6 } = i7, e6 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e6 || this.C(s5, void 0, i7, e6);
      }
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t4 = false, this._$EM(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
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
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t5) => this._$ET(t5, this[t5]))), this._$EM();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t4) => t4;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var u2 = Array.isArray;
var d2 = (t4) => u2(t4) || "function" == typeof t4?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t4) => (i7, ...s4) => ({ _$litType$: t4, strings: i7, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i7) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i7) : i7;
}
var N = (t4, i7) => {
  const s4 = t4.length - 1, e6 = [];
  let n6, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c4 = v;
  for (let i8 = 0; i8 < s4; i8++) {
    const s5 = t4[i8];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n6 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n6 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n6 = void 0);
    const x2 = c4 === p2 && t4[i8 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e6.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e6];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i7 }, e6) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i7);
    if (this.el = _S.createElement(f3, e6), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(h2)) {
          const i8 = v2[a3++], s4 = r6.getAttribute(t5).split(o3), e7 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l3, name: e7[2], strings: s4, ctor: "." === e7[1] ? I : "?" === e7[1] ? L : "@" === e7[1] ? z : H }), r6.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t5));
        if (y2.test(r6.tagName)) {
          const t5 = r6.textContent.split(o3), i8 = t5.length - 1;
          if (i8 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i8; s4++) r6.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t5[i8], c3());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r6.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t4, i7) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i7, s4 = t4, e6) {
  if (i7 === E) return i7;
  let h3 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o7 = a2(i7) ? void 0 : i7._$litDirective$;
  return h3?.constructor !== o7 && (h3?._$AO?.(false), void 0 === o7 ? h3 = void 0 : (h3 = new o7(t4), h3._$AT(t4, s4, e6)), void 0 !== e6 ? (s4._$Co ?? (s4._$Co = []))[e6] = h3 : s4._$Cl = h3), void 0 !== h3 && (i7 = M(t4, h3._$AS(t4, i7.values), h3, e6)), i7;
}
var R = class {
  constructor(t4, i7) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i7 }, parts: s4 } = this._$AD, e6 = (t4?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e6;
    let h3 = P.nextNode(), o7 = 0, n6 = 0, r6 = s4[0];
    for (; void 0 !== r6; ) {
      if (o7 === r6.index) {
        let i8;
        2 === r6.type ? i8 = new k(h3, h3.nextSibling, this, t4) : 1 === r6.type ? i8 = new r6.ctor(h3, r6.name, r6.strings, this, t4) : 6 === r6.type && (i8 = new Z(h3, this, t4)), this._$AV.push(i8), r6 = s4[++n6];
      }
      o7 !== r6?.index && (h3 = P.nextNode(), o7++);
    }
    return P.currentNode = l2, e6;
  }
  p(t4) {
    let i7 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i7), i7 += s4.strings.length - 2) : s4._$AI(t4[i7])), i7++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i7, s4, e6) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i7, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i7 = this._$AM;
    return void 0 !== i7 && 11 === t4?.nodeType && (t4 = i7.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i7 = this) {
    t4 = M(this, t4, i7), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
  }
  O(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
  }
  _(t4) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(l2.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i7, _$litType$: s4 } = t4, e6 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e6) this._$AH.p(i7);
    else {
      const t5 = new R(e6, this), s5 = t5.u(this.options);
      t5.p(i7), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i7 = C.get(t4.strings);
    return void 0 === i7 && C.set(t4.strings, i7 = new S2(t4)), i7;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s4, e6 = 0;
    for (const h3 of t4) e6 === i7.length ? i7.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i7[e6], s4._$AI(h3), e6++;
    e6 < i7.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i7.length = e6);
  }
  _$AR(t4 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t4 !== this._$AB; ) {
      const s5 = i3(t4).nextSibling;
      i3(t4).remove(), t4 = s5;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i7, s4, e6, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i7, this._$AM = e6, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i7 = this, s4, e6) {
    const h3 = this.strings;
    let o7 = false;
    if (void 0 === h3) t4 = M(this, t4, i7, 0), o7 = !a2(t4) || t4 !== this._$AH && t4 !== E, o7 && (this._$AH = t4);
    else {
      const e7 = t4;
      let n6, r6;
      for (t4 = h3[0], n6 = 0; n6 < h3.length - 1; n6++) r6 = M(this, e7[s4 + n6], i7, n6), r6 === E && (r6 = this._$AH[n6]), o7 || (o7 = !a2(r6) || r6 !== this._$AH[n6]), r6 === A ? t4 = A : t4 !== A && (t4 += (r6 ?? "") + h3[n6 + 1]), this._$AH[n6] = r6;
    }
    o7 && !e6 && this.j(t4);
  }
  j(t4) {
    t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === A ? void 0 : t4;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== A);
  }
};
var z = class extends H {
  constructor(t4, i7, s4, e6, h3) {
    super(t4, i7, s4, e6, h3), this.type = 5;
  }
  _$AI(t4, i7 = this) {
    if ((t4 = M(this, t4, i7, 0) ?? A) === E) return;
    const s4 = this._$AH, e6 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e6);
    e6 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i7, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    M(this, t4);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t4, i7, s4) => {
  const e6 = s4?.renderBefore ?? i7;
  let h3 = e6._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e6._$litPart$ = h3 = new k(i7.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t4 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t4.firstChild), t4;
  }
  update(t4) {
    const r6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r6, this.renderRoot, this.renderOptions);
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
var r4 = (t4 = o5, e6, r6) => {
  const { kind: n6, metadata: i7 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i7, s4 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r6.name, t4), "accessor" === n6) {
    const { name: o7 } = r6;
    return { set(r7) {
      const n7 = e6.get.call(this);
      e6.set.call(this, r7), this.requestUpdate(o7, n7, t4, true, r7);
    }, init(e7) {
      return void 0 !== e7 && this.C(o7, void 0, t4, e7), e7;
    } };
  }
  if ("setter" === n6) {
    const { name: o7 } = r6;
    return function(r7) {
      const n7 = this[o7];
      e6.call(this, r7), this.requestUpdate(o7, n7, t4, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n6);
};
function n4(t4) {
  return (e6, o7) => "object" == typeof o7 ? r4(t4, e6, o7) : ((t5, e7, o8) => {
    const r6 = e7.hasOwnProperty(o8);
    return e7.constructor.createProperty(o8, t5), r6 ? Object.getOwnPropertyDescriptor(e7, o8) : void 0;
  })(t4, e6, o7);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t4) => (...e6) => ({ _$litDirective$: t4, values: e6 });
var i5 = class {
  constructor(t4) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t4, e6, i7) {
    this._$Ct = t4, this._$AM = e6, this._$Ci = i7;
  }
  _$AS(t4, e6) {
    return this.update(t4, e6);
  }
  update(t4, e6) {
    return this.render(...e6);
  }
};

// node_modules/lit-html/directives/style-map.js
var n5 = "important";
var i6 = " !" + n5;
var o6 = e5(class extends i5 {
  constructor(t4) {
    if (super(t4), t4.type !== t3.ATTRIBUTE || "style" !== t4.name || t4.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t4) {
    return Object.keys(t4).reduce((e6, r6) => {
      const s4 = t4[r6];
      return null == s4 ? e6 : e6 + `${r6 = r6.includes("-") ? r6 : r6.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s4};`;
    }, "");
  }
  update(e6, [r6]) {
    const { style: s4 } = e6.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r6)), this.render(r6);
    for (const t4 of this.ft) null == r6[t4] && (this.ft.delete(t4), t4.includes("-") ? s4.removeProperty(t4) : s4[t4] = null);
    for (const t4 in r6) {
      const e7 = r6[t4];
      if (null != e7) {
        this.ft.add(t4);
        const r7 = "string" == typeof e7 && e7.endsWith(i6);
        t4.includes("-") || r7 ? s4.setProperty(t4, r7 ? e7.slice(0, -11) : e7, r7 ? n5 : "") : s4[t4] = e7;
      }
    }
    return E;
  }
});

// src/utils/virtual-scroll.controller.ts
var VirtualScrollController = class {
  // ── Construction ─────────────────────────────────────────────────
  constructor(host, opts = {}) {
    // ── State ─────────────────────────────────────────────────────────
    this._items = [];
    this._scrollTop = 0;
    this._containerHeight = 0;
    this._scrollEl = null;
    this._resizeObs = null;
    this._lastRange = { first: 0, last: 0 };
    // ── Private ───────────────────────────────────────────────────────
    /** Arrow function preserves `this` for removeEventListener identity. */
    this._onScroll = () => {
      if (!this._scrollEl) return;
      this._scrollTop = this._scrollEl.scrollTop;
      const r6 = this.range;
      const changed = r6.first !== this._lastRange.first || r6.last !== this._lastRange.last;
      if (changed) {
        this._lastRange = r6;
        this._onRangeChange?.(r6);
        this.host.requestUpdate();
      }
    };
    this.host = host;
    this._itemSize = opts.itemSize ?? 48;
    this._buffer = opts.buffer ?? 4;
    this._onRangeChange = opts.onRangeChange ?? null;
    host.addController(this);
  }
  // ── Reactive controller lifecycle ─────────────────────────────────
  /** Intentionally empty — wiring is deferred to `attach()`. */
  hostConnected() {
  }
  hostDisconnected() {
    this.detach();
  }
  // ── Public API ────────────────────────────────────────────────────
  /** Replace the items array and request a host re-render. */
  setItems(items) {
    this._items = items;
    if (this._scrollEl) {
      this._scrollTop = Math.min(this._scrollTop, this.totalHeight);
    }
    this.host.requestUpdate();
  }
  /** Update estimated item height and request a re-render. */
  setItemSize(px) {
    this._itemSize = px;
    this.host.requestUpdate();
  }
  /** Update render buffer size. */
  setBuffer(n6) {
    this._buffer = n6;
    this.host.requestUpdate();
  }
  // ── Derived state (read-only) ─────────────────────────────────────
  get items() {
    return this._items;
  }
  get totalCount() {
    return this._items.length;
  }
  get itemSize() {
    return this._itemSize;
  }
  /** Total pixel height the full (un-windowed) list would occupy. */
  get totalHeight() {
    return this._items.length * this._itemSize;
  }
  /** The index range currently rendered (first inclusive, last exclusive). */
  get range() {
    const safeHeight = this._containerHeight > 0 ? this._containerHeight : 400;
    const first = Math.max(
      0,
      Math.floor(this._scrollTop / this._itemSize) - this._buffer
    );
    const visibleCount = Math.ceil(safeHeight / this._itemSize);
    const last = Math.min(
      this._items.length,
      first + visibleCount + this._buffer * 2
    );
    return { first, last };
  }
  /** Items currently in the render window with their absolute indices. */
  get visibleItems() {
    const { first, last } = this.range;
    return this._items.slice(first, last).map((item, i7) => ({
      item,
      index: first + i7
    }));
  }
  /** Pixel height of the empty spacer placed BEFORE the rendered items. */
  get paddingBefore() {
    return this.range.first * this._itemSize;
  }
  /** Pixel height of the empty spacer placed AFTER the rendered items. */
  get paddingAfter() {
    return (this._items.length - this.range.last) * this._itemSize;
  }
  /** Current scroll offset of the attached container (px). */
  get scrollTop() {
    return this._scrollTop;
  }
  // ── Scroll control ────────────────────────────────────────────────
  /**
   * Scroll so that the item at `index` is visible.
   * Defaults to 'auto' (instant) so UI interactions feel immediate;
   * pass 'smooth' for animated transitions.
   */
  scrollToIndex(index, behavior = "auto") {
    if (!this._scrollEl) return;
    const top = Math.max(0, Math.min(index * this._itemSize, this.totalHeight));
    this._scrollEl.scrollTo({ top, behavior });
  }
  /** Scroll to the very beginning of the list. */
  scrollToTop(behavior = "auto") {
    this._scrollEl?.scrollTo({ top: 0, behavior });
  }
  /** Scroll to the very end of the list. */
  scrollToBottom(behavior = "auto") {
    this._scrollEl?.scrollTo({ top: this.totalHeight, behavior });
  }
  // ── Container wiring ──────────────────────────────────────────────
  /**
   * Attach the controller to a DOM scroll container.
   *
   * Call from the host's `firstUpdated()` once the shadow DOM is ready.
   * If called multiple times, the previous container is automatically
   * detached first.
   */
  attach(scrollEl) {
    this.detach();
    this._scrollEl = scrollEl;
    this._containerHeight = scrollEl.clientHeight;
    this._scrollTop = scrollEl.scrollTop;
    scrollEl.addEventListener("scroll", this._onScroll, { passive: true });
    this._resizeObs = new ResizeObserver((entries) => {
      const h3 = entries[0]?.contentRect.height ?? 0;
      if (h3 !== this._containerHeight) {
        this._containerHeight = h3;
        this.host.requestUpdate();
      }
    });
    this._resizeObs.observe(scrollEl);
  }
  /**
   * Remove scroll listeners and observer.
   * Called automatically when the host disconnects.
   */
  detach() {
    if (this._scrollEl) {
      this._scrollEl.removeEventListener("scroll", this._onScroll);
      this._scrollEl = null;
    }
    this._resizeObs?.disconnect();
    this._resizeObs = null;
    this._scrollTop = 0;
    this._containerHeight = 0;
  }
};

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

// src/virtualscroller/styles.ts
var styles_default = [
  hostReset,
  i`
    :host {
      display: block;
      /* height is applied via inline style from scrollHeight property */
    }

    /* ── Outer shell ─────────────────────────────────────────────────── */
    .uwc-vs {
      display:        flex;
      flex-direction: column;
      box-sizing:     border-box;
      /* height is set via inline style from the scrollHeight property */
      border:         var(--uwc-vs-border,        1px solid ${border});
      border-radius:  var(--uwc-vs-radius,        ${radiusMd});
      background:     var(--uwc-vs-bg,            ${surface});
      overflow:       hidden;
    }

    /* ── Header slot ─────────────────────────────────────────────────── */
    .uwc-vs__header {
      padding:      var(--uwc-vs-header-padding, ${space2} ${space3});
      border-bottom:1px solid var(--uwc-vs-divider, ${borderSubtle});
      flex-shrink:  0;
    }

    /* ── Scroll viewport ─────────────────────────────────────────────── */
    .uwc-vs__viewport {
      overflow-y:      auto;
      overflow-x:      hidden;
      flex:            1;
      min-height:      0;        /* allow flex child to shrink below content size */
      position:        relative;
      /*
       * Disable browser scroll-anchoring. Without this, when Lit replaces
       * rendered items with a taller paddingBefore spacer the browser adjusts
       * scrollTop to compensate, which fires another scroll event and creates
       * a runaway scroll loop to the end of the list.
       */
      overflow-anchor: none;
      scrollbar-width: thin;
      scrollbar-color: var(--uwc-vs-scrollbar, ${borderControl}) transparent;
    }
    .uwc-vs__viewport::-webkit-scrollbar         { width: 6px; }
    .uwc-vs__viewport::-webkit-scrollbar-track   { background: transparent; }
    .uwc-vs__viewport::-webkit-scrollbar-thumb   {
      background:    var(--uwc-vs-scrollbar, ${borderControl});
      border-radius: ${radiusFull};
    }

    /* ── Spacers that maintain the full-list scroll height ───────────── */
    .uwc-vs__spacer {
      flex-shrink:     0;
      width:           100%;
      overflow-anchor: none;   /* never let the browser anchor to a spacer */
    }

    /* ── Default item rendering (used when renderItem is not supplied) ── */
    .uwc-vs__item {
      display:     flex;
      align-items: center;
      padding:     0 var(--uwc-vs-item-padding-x, ${space3});
      height:      var(--uwc-vs-item-height, 3rem);
      border-bottom: 1px solid var(--uwc-vs-item-divider, ${borderSubtle});
      font-size:   var(--uwc-vs-item-font-size, ${fontSizeMd});
      color:       var(--uwc-vs-item-color, ${text});
      cursor:      pointer;
      user-select: none;
      transition:  background ${durationFast};
    }
    .uwc-vs__item:last-child { border-bottom: none; }
    .uwc-vs__item:hover      { background: var(--uwc-vs-item-hover-bg, ${hoverBg}); }
    .uwc-vs__item[aria-selected="true"] {
      background: var(--uwc-vs-item-selected-bg, ${selectedBg});
      color:      var(--uwc-color-primary, ${primary});
      font-weight:${fontWeightSemibold};
    }
    .uwc-vs__item[data-focused="true"] {
      outline:        2px solid var(--uwc-color-primary, ${primary});
      outline-offset: -2px;
    }

    /* ── Empty state ─────────────────────────────────────────────────── */
    .uwc-vs__empty {
      display:        flex;
      align-items:    center;
      justify-content:center;
      height:         100%;
      min-height:     6rem;
      color:          var(--uwc-vs-empty-color, ${textMuted});
      font-size:      ${fontSizeMd};
    }

    /* ── Loading skeleton ────────────────────────────────────────────── */
    .uwc-vs__skeleton-item {
      display:     flex;
      align-items: center;
      gap:         ${space3};
      padding:     0 var(--uwc-vs-item-padding-x, ${space3});
      height:      var(--uwc-vs-item-height, 3rem);
      border-bottom: 1px solid ${borderSubtle};
    }
    .uwc-vs__skeleton-bar {
      height:       0.875rem;
      border-radius:${radiusSm};
      background:   linear-gradient(
        90deg,
        ${borderSubtle} 25%,
        ${border}       50%,
        ${borderSubtle} 75%
      );
      background-size: 200% 100%;
      animation:   uwc-vs-shimmer 1.4s ease infinite;
    }
    @keyframes uwc-vs-shimmer {
      0%   { background-position:  200% 0; }
      100% { background-position: -200% 0; }
    }

    /* ── Footer slot ─────────────────────────────────────────────────── */
    .uwc-vs__footer {
      padding:     var(--uwc-vs-footer-padding, ${space2} ${space3});
      border-top:  1px solid var(--uwc-vs-divider, ${borderSubtle});
      flex-shrink: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-vs__skeleton-bar { animation: none; }
    }
  `
];

// src/virtualscroller/index.ts
var UwcVirtualScroller = class extends i4 {
  constructor() {
    super(...arguments);
    this.items = [];
    this.itemSize = 48;
    this.scrollHeight = 400;
    this.buffer = 4;
    this.loading = false;
    this.emptyMessage = "No items";
    this._focusedIndex = -1;
    this._vs = new VirtualScrollController(this, {
      onRangeChange: (range) => {
        this.dispatchEvent(new CustomEvent("uwc-range-change", {
          bubbles: true,
          composed: true,
          detail: range
        }));
      }
    });
  }
  // ── Lifecycle ─────────────────────────────────────────────────────
  willUpdate(changed) {
    if (changed.has("items")) this._vs.setItems(this.items);
    if (changed.has("itemSize")) this._vs.setItemSize(this.itemSize);
    if (changed.has("buffer")) this._vs.setBuffer(this.buffer);
  }
  firstUpdated() {
    const vp = this.shadowRoot.querySelector(".uwc-vs__viewport");
    this._vs.attach(vp);
  }
  // ── Public methods ────────────────────────────────────────────────
  /** Scroll so that item at `index` is visible. */
  scrollToIndex(index, behavior = "auto") {
    this._vs.scrollToIndex(index, behavior);
  }
  scrollToTop(behavior = "auto") {
    this._vs.scrollToTop(behavior);
  }
  scrollToBottom(behavior = "auto") {
    this._vs.scrollToBottom(behavior);
  }
  // ── Keyboard navigation ───────────────────────────────────────────
  _onKeydown(e6) {
    const total = this._vs.totalCount;
    if (!total) return;
    if (e6.key === "ArrowDown") {
      e6.preventDefault();
      this._focusedIndex = Math.min(this._focusedIndex + 1, total - 1);
      this._vs.scrollToIndex(this._focusedIndex, "smooth");
    } else if (e6.key === "ArrowUp") {
      e6.preventDefault();
      this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
      this._vs.scrollToIndex(this._focusedIndex, "smooth");
    } else if (e6.key === "Home") {
      e6.preventDefault();
      this._focusedIndex = 0;
      this._vs.scrollToTop();
    } else if (e6.key === "End") {
      e6.preventDefault();
      this._focusedIndex = total - 1;
      this._vs.scrollToBottom();
    } else if ((e6.key === "Enter" || e6.key === " ") && this._focusedIndex >= 0) {
      e6.preventDefault();
      this._selectItem(this.items[this._focusedIndex], this._focusedIndex);
    }
  }
  _selectItem(item, index) {
    this.selectedId = item.id;
    this._focusedIndex = index;
    this.dispatchEvent(new CustomEvent("uwc-item-click", {
      bubbles: true,
      composed: true,
      detail: { item, index }
    }));
  }
  // ── Renderers ─────────────────────────────────────────────────────
  _renderDefaultItem(item, index) {
    const selected = item.id !== void 0 && item.id === this.selectedId;
    const focused = index === this._focusedIndex;
    return b2`
      <div
        part="item"
        class="uwc-vs__item"
        role="option"
        aria-selected=${selected}
        data-focused=${focused}
        style=${o6({ height: `${this.itemSize}px` })}
        @click=${() => this._selectItem(item, index)}
      >
        <div>
          <div>${item.label}</div>
          ${item.subtitle ? b2`<div style="font-size:.75rem;color:#9ca3af;margin-top:1px;">${item.subtitle}</div>` : A}
        </div>
      </div>
    `;
  }
  _renderSkeleton() {
    const count = Math.ceil(this.scrollHeight / this.itemSize);
    return b2`
      ${Array.from({ length: count }, () => b2`
        <div class="uwc-vs__skeleton-item">
          <div class="uwc-vs__skeleton-bar" style="width:40%;flex-shrink:0;"></div>
          <div class="uwc-vs__skeleton-bar" style="flex:1;"></div>
        </div>
      `)}
    `;
  }
  _renderEmpty() {
    return b2`
      <div class="uwc-vs__empty" role="status" aria-live="polite">
        <slot name="empty">${this.emptyMessage}</slot>
      </div>
    `;
  }
  // ── Render ────────────────────────────────────────────────────────
  render() {
    const hasHeader = !!this.querySelector('[slot="header"]');
    const hasFooter = !!this.querySelector('[slot="footer"]');
    const wrapperStyles = o6({
      height: `${this.scrollHeight}px`
    });
    let listContent = A;
    if (this.loading) {
      listContent = this._renderSkeleton();
    } else if (this._vs.totalCount === 0) {
      listContent = this._renderEmpty();
    } else {
      const renderer = this.renderItem ? this.renderItem.bind(this) : this._renderDefaultItem.bind(this);
      listContent = b2`
        <div
          class="uwc-vs__spacer"
          style=${o6({ height: `${this._vs.paddingBefore}px` })}
          aria-hidden="true"
        ></div>
        ${this._vs.visibleItems.map(({ item, index }) => renderer(item, index))}
        <div
          class="uwc-vs__spacer"
          style=${o6({ height: `${this._vs.paddingAfter}px` })}
          aria-hidden="true"
        ></div>
      `;
    }
    return b2`
      <div class="uwc-vs" style=${wrapperStyles}>
        ${hasHeader ? b2`<div class="uwc-vs__header"><slot name="header"></slot></div>` : A}

        <div
          part="viewport"
          class="uwc-vs__viewport"
          role="listbox"
          tabindex="0"
          aria-label="Virtual list"
          aria-rowcount=${this._vs.totalCount}
          @keydown=${this._onKeydown}
        >
          ${listContent}
        </div>

        ${hasFooter ? b2`<div class="uwc-vs__footer"><slot name="footer"></slot></div>` : A}
      </div>
    `;
  }
};
UwcVirtualScroller.styles = [styles_default];
__decorateClass([
  n4({ type: Array })
], UwcVirtualScroller.prototype, "items", 2);
__decorateClass([
  n4({ type: Number, attribute: "item-size" })
], UwcVirtualScroller.prototype, "itemSize", 2);
__decorateClass([
  n4({ type: Number, attribute: "scroll-height" })
], UwcVirtualScroller.prototype, "scrollHeight", 2);
__decorateClass([
  n4({ type: Number })
], UwcVirtualScroller.prototype, "buffer", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcVirtualScroller.prototype, "loading", 2);
__decorateClass([
  n4({ attribute: "empty-message" })
], UwcVirtualScroller.prototype, "emptyMessage", 2);
__decorateClass([
  n4({ attribute: "selected-id" })
], UwcVirtualScroller.prototype, "selectedId", 2);
__decorateClass([
  r5()
], UwcVirtualScroller.prototype, "_focusedIndex", 2);

// src/virtualscroller/react.ts
var UwcVirtualScroller2 = createComponent({
  tagName: "uwc-virtualscroller",
  elementClass: UwcVirtualScroller,
  react: React,
  events: {
    onUwcRangeChange: "uwc-range-change",
    onUwcItemClick: "uwc-item-click"
  }
});
export {
  UwcVirtualScroller2 as UwcVirtualScroller
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

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
