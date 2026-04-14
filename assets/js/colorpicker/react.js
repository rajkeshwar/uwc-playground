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

// src/colorpicker/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e8, o7) {
    if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e8;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e8 = void 0 !== s4 && 1 === s4.length;
      e8 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e8) => {
  const o7 = 1 === t4.length ? t4[0] : e8.reduce((e9, s4, o8) => e9 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o8 + 1], t4[0]);
  return new n(o7, t4, s);
};
var S = (s4, o7) => {
  if (e) s4.adoptedStyleSheets = o7.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e8 of o7) {
    const o8 = document.createElement("style"), n6 = t.litNonce;
    void 0 !== n6 && o8.setAttribute("nonce", n6), o8.textContent = e8.cssText, s4.appendChild(o8);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e8 = "";
  for (const s4 of t5.cssRules) e8 += s4.cssText;
  return r(e8);
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
    const { get: e8, set: r5 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e8, set(s5) {
      const h3 = e8?.call(this);
      r5?.call(this, s5), this.requestUpdate(t4, h3, i7);
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
      const e8 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e8) i7.unshift(c(s5));
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
    const i7 = this.constructor.elementProperties.get(t4), e8 = this.constructor._$Eu(t4, i7);
    if (void 0 !== e8 && true === i7.reflect) {
      const h3 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s4, i7.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e8) : this.setAttribute(e8, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i7 = this.constructor, e8 = i7._$Eh.get(t4);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t5 = i7.getPropertyOptions(e8), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e8;
      const r5 = h3.fromAttribute(s4, t5.type);
      this[e8] = r5 ?? this._$Ej?.get(e8) ?? r5, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i7, e8 = false, h3) {
    if (void 0 !== t4) {
      const r5 = this.constructor;
      if (false === e8 && (h3 = this[t4]), i7 ?? (i7 = r5.getPropertyOptions(t4)), !((i7.hasChanged ?? f)(h3, s4) || i7.useDefault && i7.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r5._$Eu(t4, i7)))) return;
      this.C(t4, s4, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i7, reflect: e8, wrapped: h3 }, r5) {
    i7 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t4) && (this._$Ej.set(t4, r5 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r5) || (this._$AL.has(t4) || (this.hasUpdated || i7 || (s4 = void 0), this._$AL.set(t4, s4)), true === e8 && this._$Em !== t4 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t4));
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
        const { wrapped: t6 } = i7, e8 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e8 || this.C(s5, void 0, i7, e8);
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
  const s4 = t4.length - 1, e8 = [];
  let n6, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c4 = v;
  for (let i8 = 0; i8 < s4; i8++) {
    const s5 = t4[i8];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n6 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n6 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n6 = void 0);
    const x2 = c4 === p2 && t4[i8 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e8.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i7 }, e8) {
    let r5;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i7);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r5 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r5.nodeType) {
        if (r5.hasAttributes()) for (const t5 of r5.getAttributeNames()) if (t5.endsWith(h2)) {
          const i8 = v2[a3++], s4 = r5.getAttribute(t5).split(o3), e9 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l3, name: e9[2], strings: s4, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r5.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r5.removeAttribute(t5));
        if (y2.test(r5.tagName)) {
          const t5 = r5.textContent.split(o3), i8 = t5.length - 1;
          if (i8 > 0) {
            r5.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i8; s4++) r5.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r5.append(t5[i8], c3());
          }
        }
      } else if (8 === r5.nodeType) if (r5.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r5.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t4, i7) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i7, s4 = t4, e8) {
  if (i7 === E) return i7;
  let h3 = void 0 !== e8 ? s4._$Co?.[e8] : s4._$Cl;
  const o7 = a2(i7) ? void 0 : i7._$litDirective$;
  return h3?.constructor !== o7 && (h3?._$AO?.(false), void 0 === o7 ? h3 = void 0 : (h3 = new o7(t4), h3._$AT(t4, s4, e8)), void 0 !== e8 ? (s4._$Co ?? (s4._$Co = []))[e8] = h3 : s4._$Cl = h3), void 0 !== h3 && (i7 = M(t4, h3._$AS(t4, i7.values), h3, e8)), i7;
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
    const { el: { content: i7 }, parts: s4 } = this._$AD, e8 = (t4?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e8;
    let h3 = P.nextNode(), o7 = 0, n6 = 0, r5 = s4[0];
    for (; void 0 !== r5; ) {
      if (o7 === r5.index) {
        let i8;
        2 === r5.type ? i8 = new k(h3, h3.nextSibling, this, t4) : 1 === r5.type ? i8 = new r5.ctor(h3, r5.name, r5.strings, this, t4) : 6 === r5.type && (i8 = new Z(h3, this, t4)), this._$AV.push(i8), r5 = s4[++n6];
      }
      o7 !== r5?.index && (h3 = P.nextNode(), o7++);
    }
    return P.currentNode = l2, e8;
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
  constructor(t4, i7, s4, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i7, this._$AM = s4, this.options = e8, this._$Cv = e8?.isConnected ?? true;
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
    const { values: i7, _$litType$: s4 } = t4, e8 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e8) this._$AH.p(i7);
    else {
      const t5 = new R(e8, this), s5 = t5.u(this.options);
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
    let s4, e8 = 0;
    for (const h3 of t4) e8 === i7.length ? i7.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i7[e8], s4._$AI(h3), e8++;
    e8 < i7.length && (this._$AR(s4 && s4._$AB.nextSibling, e8), i7.length = e8);
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
  constructor(t4, i7, s4, e8, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i7, this._$AM = e8, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i7 = this, s4, e8) {
    const h3 = this.strings;
    let o7 = false;
    if (void 0 === h3) t4 = M(this, t4, i7, 0), o7 = !a2(t4) || t4 !== this._$AH && t4 !== E, o7 && (this._$AH = t4);
    else {
      const e9 = t4;
      let n6, r5;
      for (t4 = h3[0], n6 = 0; n6 < h3.length - 1; n6++) r5 = M(this, e9[s4 + n6], i7, n6), r5 === E && (r5 = this._$AH[n6]), o7 || (o7 = !a2(r5) || r5 !== this._$AH[n6]), r5 === A ? t4 = A : t4 !== A && (t4 += (r5 ?? "") + h3[n6 + 1]), this._$AH[n6] = r5;
    }
    o7 && !e8 && this.j(t4);
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
  constructor(t4, i7, s4, e8, h3) {
    super(t4, i7, s4, e8, h3), this.type = 5;
  }
  _$AI(t4, i7 = this) {
    if ((t4 = M(this, t4, i7, 0) ?? A) === E) return;
    const s4 = this._$AH, e8 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
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
  const e8 = s4?.renderBefore ?? i7;
  let h3 = e8._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e8._$litPart$ = h3 = new k(i7.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
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
    const r5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r5, this.renderRoot, this.renderOptions);
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
var r4 = (t4 = o5, e8, r5) => {
  const { kind: n6, metadata: i7 } = r5;
  let s4 = globalThis.litPropertyMetadata.get(i7);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i7, s4 = /* @__PURE__ */ new Map()), "setter" === n6 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r5.name, t4), "accessor" === n6) {
    const { name: o7 } = r5;
    return { set(r6) {
      const n7 = e8.get.call(this);
      e8.set.call(this, r6), this.requestUpdate(o7, n7, t4, true, r6);
    }, init(e9) {
      return void 0 !== e9 && this.C(o7, void 0, t4, e9), e9;
    } };
  }
  if ("setter" === n6) {
    const { name: o7 } = r5;
    return function(r6) {
      const n7 = this[o7];
      e8.call(this, r6), this.requestUpdate(o7, n7, t4, true, r6);
    };
  }
  throw Error("Unsupported decorator location: " + n6);
};
function n4(t4) {
  return (e8, o7) => "object" == typeof o7 ? r4(t4, e8, o7) : ((t5, e9, o8) => {
    const r5 = e9.hasOwnProperty(o8);
    return e9.constructor.createProperty(o8, t5), r5 ? Object.getOwnPropertyDescriptor(e9, o8) : void 0;
  })(t4, e8, o7);
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t4, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t4 && Object.defineProperty(e8, t4, c4), c4);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r5) {
  return (n6, s4, i7) => {
    const o7 = (t4) => t4.renderRoot?.querySelector(e8) ?? null;
    if (r5) {
      const { get: e9, set: r6 } = "object" == typeof s4 ? n6 : i7 ?? /* @__PURE__ */ (() => {
        const t4 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t4];
        }, set(e10) {
          this[t4] = e10;
        } };
      })();
      return e4(n6, s4, { get() {
        let t4 = e9.call(this);
        return void 0 === t4 && (t4 = o7(this), (null !== t4 || this.hasUpdated) && r6.call(this, t4)), t4;
      } });
    }
    return e4(n6, s4, { get() {
      return o7(this);
    } });
  };
}

// node_modules/lit-html/directive.js
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t4) => (...e8) => ({ _$litDirective$: t4, values: e8 });
var i5 = class {
  constructor(t4) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t4, e8, i7) {
    this._$Ct = t4, this._$AM = e8, this._$Ci = i7;
  }
  _$AS(t4, e8) {
    return this.update(t4, e8);
  }
  update(t4, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directives/class-map.js
var e7 = e6(class extends i5 {
  constructor(t4) {
    if (super(t4), t4.type !== t3.ATTRIBUTE || "class" !== t4.name || t4.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t4) {
    return " " + Object.keys(t4).filter((s4) => t4[s4]).join(" ") + " ";
  }
  update(s4, [i7]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t4) => "" !== t4)));
      for (const t4 in i7) i7[t4] && !this.nt?.has(t4) && this.st.add(t4);
      return this.render(i7);
    }
    const r5 = s4.element.classList;
    for (const t4 of this.st) t4 in i7 || (r5.remove(t4), this.st.delete(t4));
    for (const t4 in i7) {
      const s5 = !!i7[t4];
      s5 === this.st.has(t4) || this.nt?.has(t4) || (s5 ? (r5.add(t4), this.st.add(t4)) : (r5.remove(t4), this.st.delete(t4)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/style-map.js
var n5 = "important";
var i6 = " !" + n5;
var o6 = e6(class extends i5 {
  constructor(t4) {
    if (super(t4), t4.type !== t3.ATTRIBUTE || "style" !== t4.name || t4.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t4) {
    return Object.keys(t4).reduce((e8, r5) => {
      const s4 = t4[r5];
      return null == s4 ? e8 : e8 + `${r5 = r5.includes("-") ? r5 : r5.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s4};`;
    }, "");
  }
  update(e8, [r5]) {
    const { style: s4 } = e8.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r5)), this.render(r5);
    for (const t4 of this.ft) null == r5[t4] && (this.ft.delete(t4), t4.includes("-") ? s4.removeProperty(t4) : s4[t4] = null);
    for (const t4 in r5) {
      const e9 = r5[t4];
      if (null != e9) {
        this.ft.add(t4);
        const r6 = "string" == typeof e9 && e9.endsWith(i6);
        t4.includes("-") || r6 ? s4.setProperty(t4, r6 ? e9.slice(0, -11) : e9, r6 ? n5 : "") : s4[t4] = e9;
      }
    }
    return E;
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

// src/colorpicker/styles.ts
var styles_default = [
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

// src/colorpicker/index.ts
function hexToRgb(hex) {
  const c4 = hex.replace("#", "");
  if (c4.length === 3) {
    return { r: parseInt(c4[0] + c4[0], 16), g: parseInt(c4[1] + c4[1], 16), b: parseInt(c4[2] + c4[2], 16) };
  }
  if (c4.length === 6) {
    return { r: parseInt(c4.slice(0, 2), 16), g: parseInt(c4.slice(2, 4), 16), b: parseInt(c4.slice(4, 6), 16) };
  }
  return null;
}
function rgbToHex({ r: r5, g: g2, b: b3 }) {
  return "#" + [r5, g2, b3].map((v2) => Math.round(Math.max(0, Math.min(255, v2))).toString(16).padStart(2, "0")).join("");
}
function rgbToHsv({ r: r5, g: g2, b: b3 }) {
  const rr = r5 / 255, gg = g2 / 255, bb = b3 / 255;
  const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb), d3 = max - min;
  let h3 = 0;
  const s4 = max === 0 ? 0 : d3 / max;
  const v2 = max;
  if (d3 > 0) {
    if (max === rr) h3 = ((gg - bb) / d3 + (gg < bb ? 6 : 0)) / 6;
    else if (max === gg) h3 = ((bb - rr) / d3 + 2) / 6;
    else h3 = ((rr - gg) / d3 + 4) / 6;
  }
  return { h: h3 * 360, s: s4 * 100, v: v2 * 100 };
}
function hsvToRgb({ h: h3, s: s4, v: v2 }) {
  const ss = s4 / 100, vv = v2 / 100;
  const f3 = (n6) => {
    const k2 = (n6 + h3 / 60) % 6;
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
    const m2 = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return m2 ? rgbToHsv({ r: +m2[1], g: +m2[2], b: +m2[3] }) : null;
  }
  if (format === "hsb") {
    const m2 = value.match(/hsb\((\d+),\s*(\d+),\s*(\d+)\)/);
    return m2 ? { h: +m2[1], s: +m2[2], v: +m2[3] } : null;
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
        const onClick = (e8) => {
          e8.stopPropagation();
          this._pc.toggle();
        };
        const onKeydown = (e8) => {
          if ((e8.key === "Enter" || e8.key === " ") && !this._pc.open) {
            e8.preventDefault();
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
  _areaPointerDown(e8) {
    e8.preventDefault();
    this._dragging = true;
    this._updateArea(e8);
    const move = (ev) => this._updateArea(ev);
    const up = () => {
      this._dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  _updateArea(e8) {
    const rect = this._areaEl.getBoundingClientRect();
    const s4 = Math.max(0, Math.min(1, (e8.clientX - rect.left) / rect.width)) * 100;
    const v2 = Math.max(0, Math.min(1, 1 - (e8.clientY - rect.top) / rect.height)) * 100;
    this._applyHsv({ h: this._hsv.h, s: s4, v: v2 });
  }
  // ── Hue drag ──────────────────────────────────────────────────────
  _huePointerDown(e8) {
    e8.preventDefault();
    this._dragging = true;
    this._updateHue(e8);
    const move = (ev) => this._updateHue(ev);
    const up = () => {
      this._dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  _updateHue(e8) {
    const rect = this._hueEl.getBoundingClientRect();
    const h3 = Math.max(0, Math.min(1, (e8.clientX - rect.left) / rect.width)) * 360;
    this._applyHsv({ ...this._hsv, h: h3 });
  }
  // ── Alpha drag ────────────────────────────────────────────────────
  _alphaPointerDown(e8) {
    if (!this._alphaEl) return;
    e8.preventDefault();
    this._dragging = true;
    this._updateAlpha(e8);
    const move = (ev) => this._updateAlpha(ev);
    const up = () => {
      this._dragging = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  }
  _updateAlpha(e8) {
    if (!this._alphaEl) return;
    const rect = this._alphaEl.getBoundingClientRect();
    this._alpha = Math.max(0, Math.min(1, (e8.clientX - rect.left) / rect.width));
    this._applyHsv(this._hsv);
  }
  // ── Text input handlers ───────────────────────────────────────────
  _onHexInput(e8) {
    this._hexInput = e8.target.value;
    const rgb = hexToRgb(this._hexInput);
    if (rgb) this._applyHsv(rgbToHsv(rgb));
  }
  _onRgbInput(ch, e8) {
    const v2 = parseInt(e8.target.value, 10);
    if (isNaN(v2)) return;
    const rgb = { r: this._rgbR, g: this._rgbG, b: this._rgbB };
    rgb[ch] = Math.max(0, Math.min(255, v2));
    this._applyHsv(rgbToHsv(rgb));
  }
  _onHsbInput(ch, e8) {
    const val = parseInt(e8.target.value, 10);
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
                @change=${(e8) => this._onRgbInput(ch, e8)} />
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
              @change=${(e8) => this._onHsbInput(ch, e8)} />
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
          <div class="uwc-cp__cursor" style=${o6({
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
              <div class="uwc-cp__thumb" style=${o6({
      left: `${this._hsv.h / 360 * 100}%`
    })}></div>
            </div>
            <!-- Alpha (optional) -->
            ${this.showAlpha ? b2`
              <div class="uwc-cp__alpha-track"
                style=${o6({ "--_alpha-color": `rgb(${rgb.r},${rgb.g},${rgb.b})` })}
                @pointerdown=${this._alphaPointerDown}>
                <div class="uwc-cp__thumb" style=${o6({
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
UwcColorPicker.styles = [styles_default];
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
var UwcColorPicker2 = createComponent({
  tagName: "uwc-colorpicker",
  elementClass: UwcColorPicker,
  react: React,
  events: {
    onUwcChange: "uwc-change"
  }
});
export {
  UwcColorPicker2 as UwcColorPicker
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

lit-html/directives/class-map.js:
lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
