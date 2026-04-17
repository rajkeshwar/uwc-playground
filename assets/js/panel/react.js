var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i6 = decorators.length - 1, decorator; i6 >= 0; i6--)
    if (decorator = decorators[i6])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/panel/react.ts
import React from "react";
import { createComponent } from "@lit/react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e8, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
  const o6 = 1 === t4.length ? t4[0] : e8.reduce((e9, s4, o7) => e9 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e8 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e8.cssText, s4.appendChild(o7);
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
  let i6 = t4;
  switch (s4) {
    case Boolean:
      i6 = null !== t4;
      break;
    case Number:
      i6 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i6 = JSON.parse(t4);
      } catch (t5) {
        i6 = null;
      }
  }
  return i6;
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
      const i6 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t4, i6, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i6) {
    const { get: e8, set: r6 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e8, set(s5) {
      const h3 = e8?.call(this);
      r6?.call(this, s5), this.requestUpdate(t4, h3, i6);
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
      for (const i6 of s4) this.createProperty(i6, t5[i6]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i6] of s4) this.elementProperties.set(t5, i6);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i6 = this._$Eu(t5, s4);
      void 0 !== i6 && this._$Eh.set(i6, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i6 = [];
    if (Array.isArray(s4)) {
      const e8 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e8) i6.unshift(c(s5));
    } else void 0 !== s4 && i6.push(c(s4));
    return i6;
  }
  static _$Eu(t4, s4) {
    const i6 = s4.attribute;
    return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
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
    for (const i6 of s4.keys()) this.hasOwnProperty(i6) && (t4.set(i6, this[i6]), delete this[i6]);
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
  attributeChangedCallback(t4, s4, i6) {
    this._$AK(t4, i6);
  }
  _$ET(t4, s4) {
    const i6 = this.constructor.elementProperties.get(t4), e8 = this.constructor._$Eu(t4, i6);
    if (void 0 !== e8 && true === i6.reflect) {
      const h3 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s4, i6.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e8) : this.setAttribute(e8, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i6 = this.constructor, e8 = i6._$Eh.get(t4);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t5 = i6.getPropertyOptions(e8), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e8;
      const r6 = h3.fromAttribute(s4, t5.type);
      this[e8] = r6 ?? this._$Ej?.get(e8) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i6, e8 = false, h3) {
    if (void 0 !== t4) {
      const r6 = this.constructor;
      if (false === e8 && (h3 = this[t4]), i6 ?? (i6 = r6.getPropertyOptions(t4)), !((i6.hasChanged ?? f)(h3, s4) || i6.useDefault && i6.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r6._$Eu(t4, i6)))) return;
      this.C(t4, s4, i6);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i6, reflect: e8, wrapped: h3 }, r6) {
    i6 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t4) && (this._$Ej.set(t4, r6 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r6) || (this._$AL.has(t4) || (this.hasUpdated || i6 || (s4 = void 0), this._$AL.set(t4, s4)), true === e8 && this._$Em !== t4 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t4));
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
      if (t5.size > 0) for (const [s5, i6] of t5) {
        const { wrapped: t6 } = i6, e8 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e8 || this.C(s5, void 0, i6, e8);
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
var x = (t4) => (i6, ...s4) => ({ _$litType$: t4, strings: i6, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i6) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i6) : i6;
}
var N = (t4, i6) => {
  const s4 = t4.length - 1, e8 = [];
  let n5, l3 = 2 === i6 ? "<svg>" : 3 === i6 ? "<math>" : "", c4 = v;
  for (let i7 = 0; i7 < s4; i7++) {
    const s5 = t4[i7];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t4[i7 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e8.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i7 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i6 ? "</svg>" : 3 === i6 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i6 }, e8) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i6);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i6 || 3 === i6) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t5 of r6.getAttributeNames()) if (t5.endsWith(h2)) {
          const i7 = v2[a3++], s4 = r6.getAttribute(t5).split(o3), e9 = /([.?@])?(.*)/.exec(i7);
          d3.push({ type: 1, index: l3, name: e9[2], strings: s4, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r6.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t5));
        if (y2.test(r6.tagName)) {
          const t5 = r6.textContent.split(o3), i7 = t5.length - 1;
          if (i7 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i7; s4++) r6.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t5[i7], c3());
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
  static createElement(t4, i6) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i6, s4 = t4, e8) {
  if (i6 === E) return i6;
  let h3 = void 0 !== e8 ? s4._$Co?.[e8] : s4._$Cl;
  const o6 = a2(i6) ? void 0 : i6._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e8)), void 0 !== e8 ? (s4._$Co ?? (s4._$Co = []))[e8] = h3 : s4._$Cl = h3), void 0 !== h3 && (i6 = M(t4, h3._$AS(t4, i6.values), h3, e8)), i6;
}
var R = class {
  constructor(t4, i6) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i6;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i6 }, parts: s4 } = this._$AD, e8 = (t4?.creationScope ?? l2).importNode(i6, true);
    P.currentNode = e8;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r6 = s4[0];
    for (; void 0 !== r6; ) {
      if (o6 === r6.index) {
        let i7;
        2 === r6.type ? i7 = new k(h3, h3.nextSibling, this, t4) : 1 === r6.type ? i7 = new r6.ctor(h3, r6.name, r6.strings, this, t4) : 6 === r6.type && (i7 = new Z(h3, this, t4)), this._$AV.push(i7), r6 = s4[++n5];
      }
      o6 !== r6?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e8;
  }
  p(t4) {
    let i6 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i6), i6 += s4.strings.length - 2) : s4._$AI(t4[i6])), i6++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i6, s4, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i6, this._$AM = s4, this.options = e8, this._$Cv = e8?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i6 = this._$AM;
    return void 0 !== i6 && 11 === t4?.nodeType && (t4 = i6.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i6 = this) {
    t4 = M(this, t4, i6), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
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
    const { values: i6, _$litType$: s4 } = t4, e8 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e8) this._$AH.p(i6);
    else {
      const t5 = new R(e8, this), s5 = t5.u(this.options);
      t5.p(i6), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i6 = C.get(t4.strings);
    return void 0 === i6 && C.set(t4.strings, i6 = new S2(t4)), i6;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i6 = this._$AH;
    let s4, e8 = 0;
    for (const h3 of t4) e8 === i6.length ? i6.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i6[e8], s4._$AI(h3), e8++;
    e8 < i6.length && (this._$AR(s4 && s4._$AB.nextSibling, e8), i6.length = e8);
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
  constructor(t4, i6, s4, e8, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i6, this._$AM = e8, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i6 = this, s4, e8) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = M(this, t4, i6, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
    else {
      const e9 = t4;
      let n5, r6;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = M(this, e9[s4 + n5], i6, n5), r6 === E && (r6 = this._$AH[n5]), o6 || (o6 = !a2(r6) || r6 !== this._$AH[n5]), r6 === A ? t4 = A : t4 !== A && (t4 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o6 && !e8 && this.j(t4);
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
  constructor(t4, i6, s4, e8, h3) {
    super(t4, i6, s4, e8, h3), this.type = 5;
  }
  _$AI(t4, i6 = this) {
    if ((t4 = M(this, t4, i6, 0) ?? A) === E) return;
    const s4 = this._$AH, e8 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i6, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s4;
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
var D = (t4, i6, s4) => {
  const e8 = s4?.renderBefore ?? i6;
  let h3 = e8._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e8._$litPart$ = h3 = new k(i6.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
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
var r4 = (t4 = o5, e8, r6) => {
  const { kind: n5, metadata: i6 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i6);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i6, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r6.name, t4), "accessor" === n5) {
    const { name: o6 } = r6;
    return { set(r7) {
      const n6 = e8.get.call(this);
      e8.set.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    }, init(e9) {
      return void 0 !== e9 && this.C(o6, void 0, t4, e9), e9;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r6;
    return function(r7) {
      const n6 = this[o6];
      e8.call(this, r7), this.requestUpdate(o6, n6, t4, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e8, o6) => "object" == typeof o6 ? r4(t4, e8, o6) : ((t5, e9, o7) => {
    const r6 = e9.hasOwnProperty(o7);
    return e9.constructor.createProperty(o7, t5), r6 ? Object.getOwnPropertyDescriptor(e9, o7) : void 0;
  })(t4, e8, o6);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e8, t4, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t4 && Object.defineProperty(e8, t4, c4), c4);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e8, r6) {
  return (n5, s4, i6) => {
    const o6 = (t4) => t4.renderRoot?.querySelector(e8) ?? null;
    if (r6) {
      const { get: e9, set: r7 } = "object" == typeof s4 ? n5 : i6 ?? /* @__PURE__ */ (() => {
        const t4 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t4];
        }, set(e10) {
          this[t4] = e10;
        } };
      })();
      return e4(n5, s4, { get() {
        let t4 = e9.call(this);
        return void 0 === t4 && (t4 = o6(this), (null !== t4 || this.hasUpdated) && r7.call(this, t4)), t4;
      } });
    }
    return e4(n5, s4, { get() {
      return o6(this);
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
  _$AT(t4, e8, i6) {
    this._$Ct = t4, this._$AM = e8, this._$Ci = i6;
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
  update(s4, [i6]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t4) => "" !== t4)));
      for (const t4 in i6) i6[t4] && !this.nt?.has(t4) && this.st.add(t4);
      return this.render(i6);
    }
    const r6 = s4.element.classList;
    for (const t4 of this.st) t4 in i6 || (r6.remove(t4), this.st.delete(t4));
    for (const t4 in i6) {
      const s5 = !!i6[t4];
      s5 === this.st.has(t4) || this.nt?.has(t4) || (s5 ? (r6.add(t4), this.st.add(t4)) : (r6.remove(t4), this.st.delete(t4)));
    }
    return E;
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

// src/panel/styles.ts
var styles_default = [
  hostReset,
  i`
    /* ── Host ───────────────────────────────────────────────────────── */
    :host {
      display: block;
      border:        var(--uwc-panel-border,  1px solid ${border});
      border-radius: var(--uwc-panel-radius,  ${radiusLg});
      background:    var(--uwc-panel-bg,      ${surface});
      box-shadow:    var(--uwc-panel-shadow,  ${shadowSm});
      overflow:      hidden;
    }

    /* ── Header ─────────────────────────────────────────────────────── */
    .uwc-panel__header {
      display:         flex;
      align-items:     center;
      gap:             ${space2};
      padding:         var(--uwc-panel-header-padding, ${space3} ${space5});
      background:      var(--uwc-panel-header-bg,      transparent);
      border-bottom:   var(--uwc-panel-header-border,  1px solid ${border});
      color:           var(--uwc-panel-header-color,   ${text});
      font-size:       var(--uwc-panel-header-font-size, ${fontSizeLg});
      font-weight:     var(--uwc-panel-header-font-weight, ${fontWeightSemibold});
      line-height:     1.4;
      min-height:      3rem;
    }

    /* When collapsed, header has no bottom border (content is hidden) */
    :host([collapsed]) .uwc-panel__header {
      border-bottom-color: transparent;
    }

    /* ── Header icon ─────────────────────────────────────────────────── */
    .uwc-panel__header-icon {
      display:         inline-flex;
      align-items:     center;
      flex-shrink:     0;
      color:           var(--uwc-panel-icon-color, ${primary});
    }

    /* ── Header title ────────────────────────────────────────────────── */
    .uwc-panel__title {
      flex:          1;
      min-width:     0;
      overflow:      hidden;
      text-overflow: ellipsis;
      white-space:   nowrap;
    }

    /* ── Header icons slot (custom actions) ──────────────────────────── */
    .uwc-panel__header-actions {
      display:     inline-flex;
      align-items: center;
      gap:         ${space1};
      margin-left: auto;
      flex-shrink: 0;
    }

    /* ── Toggle button ───────────────────────────────────────────────── */
    .uwc-panel__toggler {
      display:          inline-flex;
      align-items:      center;
      justify-content:  center;
      width:            1.75rem;
      height:           1.75rem;
      border-radius:    ${radiusFull};
      border:           1px solid ${border};
      background:       transparent;
      color:            var(--uwc-panel-toggler-color, ${textSecondary});
      cursor:           pointer;
      padding:          0;
      flex-shrink:      0;
      transition:
        background    ${durationBase},
        border-color  ${durationBase},
        color         ${durationBase};
    }

    .uwc-panel__toggler:hover {
      background:    ${hoverBg};
      border-color:  var(--uwc-color-primary, ${primary});
      color:         var(--uwc-color-primary, ${primary});
    }

    .uwc-panel__toggler:focus-visible {
      outline:        2px solid var(--uwc-color-primary, ${primary});
      outline-offset: 2px;
    }

    /* Chevron rotation — open state */
    .uwc-panel__toggler-icon {
      display:    inline-flex;
      transform:  rotate(0deg);
      transition: transform 250ms ease;
    }

    :host(:not([collapsed])) .uwc-panel__toggler-icon {
      transform: rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .uwc-panel__toggler-icon { transition: none; }
      .uwc-panel__toggler      { transition: none; }
    }

    /* ── Content wrapper (WAAPI animated) ───────────────────────────── */
    .uwc-panel__content-wrap {
      /* Height animated by JS; overflow applied inline during animation */
    }

    /* ── Content body ────────────────────────────────────────────────── */
    .uwc-panel__content {
      padding:    var(--uwc-panel-content-padding, ${space4} ${space5});
      color:      var(--uwc-panel-content-color,   ${text});
      font-size:  var(--uwc-panel-content-font-size, ${fontSizeMd});
      line-height: 1.6;
    }

    /* ── Footer ─────────────────────────────────────────────────────── */
    .uwc-panel__footer {
      padding:      var(--uwc-panel-footer-padding, ${space3} ${space5});
      background:   var(--uwc-panel-footer-bg,      transparent);
      border-top:   var(--uwc-panel-footer-border,  1px solid ${border});
      font-size:    ${fontSizeMd};
      color:        ${textSecondary};
    }

    /* Footer hidden when slot is empty */
    .uwc-panel__footer--hidden {
      display: none;
    }

    /* ── No-header mode ──────────────────────────────────────────────── */
    :host([no-header]) .uwc-panel__header {
      display: none;
    }
  `
];

// src/panel/index.ts
var UwcPanel = class extends i4 {
  constructor() {
    super(...arguments);
    this.header = "";
    this.toggleable = false;
    this.collapsed = false;
    this.noHeader = false;
    this._hasFooter = false;
  }
  // ── Lifecycle ──────────────────────────────────────────────────────────────
  firstUpdated() {
    if (this._wrap && this.collapsed) {
      this._wrap.style.height = "0px";
      this._wrap.style.overflow = "hidden";
    }
  }
  updated(changed) {
    super.updated(changed);
    if (!changed.has("collapsed") || !this._wrap) return;
    if (this.collapsed) {
      this._animateClose();
    } else {
      this._animateOpen();
    }
  }
  // ── WAAPI animations ───────────────────────────────────────────────────────
  _animateOpen() {
    const wrap = this._wrap;
    if (!wrap) return;
    const fromHeight = this._currentAnimation ? wrap.getBoundingClientRect().height : 0;
    this._currentAnimation?.cancel();
    this._currentAnimation = void 0;
    wrap.style.removeProperty("height");
    wrap.style.removeProperty("overflow");
    const toHeight = wrap.scrollHeight;
    const anim = wrap.animate(
      [
        { height: `${fromHeight}px`, overflow: "hidden" },
        { height: `${toHeight}px`, overflow: "hidden" }
      ],
      { duration: this._duration(), easing: "ease", fill: "both" }
    );
    this._currentAnimation = anim;
    anim.addEventListener("finish", () => {
      if (this._currentAnimation !== anim) return;
      anim.cancel();
      wrap.style.removeProperty("height");
      wrap.style.removeProperty("overflow");
      this._currentAnimation = void 0;
      emit(this, "uwc-expand");
    }, { once: true });
  }
  _animateClose() {
    const wrap = this._wrap;
    if (!wrap) return;
    const fromHeight = wrap.getBoundingClientRect().height;
    this._currentAnimation?.cancel();
    this._currentAnimation = void 0;
    const anim = wrap.animate(
      [
        { height: `${fromHeight}px`, overflow: "hidden" },
        { height: "0px", overflow: "hidden" }
      ],
      { duration: this._duration(), easing: "ease", fill: "both" }
    );
    this._currentAnimation = anim;
    anim.addEventListener("finish", () => {
      if (this._currentAnimation !== anim) return;
      anim.cancel();
      wrap.style.height = "0px";
      wrap.style.overflow = "hidden";
      this._currentAnimation = void 0;
      emit(this, "uwc-collapse");
    }, { once: true });
  }
  _duration() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 250;
  }
  // ── Handlers ───────────────────────────────────────────────────────────────
  _onToggle() {
    this.collapsed = !this.collapsed;
    emit(this, "uwc-toggle", { collapsed: this.collapsed });
  }
  _onFooterSlotChange(e8) {
    const slot = e8.target;
    this._hasFooter = slot.assignedNodes({ flatten: true }).length > 0;
  }
  // ── Public API ─────────────────────────────────────────────────────────────
  /** Expand the panel. No-op if already expanded. */
  expand() {
    if (!this.collapsed) return;
    this.collapsed = false;
    emit(this, "uwc-toggle", { collapsed: false });
  }
  /** Collapse the panel. No-op if already collapsed. */
  collapse() {
    if (this.collapsed) return;
    this.collapsed = true;
    emit(this, "uwc-toggle", { collapsed: true });
  }
  /** Toggle the panel open/closed. */
  toggle() {
    this._onToggle();
  }
  // ── Render helpers ─────────────────────────────────────────────────────────
  _renderHeader() {
    return b2`
      <div part="header" class="uwc-panel__header">
        ${this.icon ? b2`
          <span part="header-icon" class="uwc-panel__header-icon" aria-hidden="true">
            <uwc-icon name=${this.icon} size="18px"></uwc-icon>
          </span>
        ` : A}

        <slot name="header">
          <span part="title" class="uwc-panel__title">${this.header}</span>
        </slot>

        <span part="actions" class="uwc-panel__header-actions">
          <slot name="icons"></slot>
        </span>

        ${this.toggleable ? b2`
          <button
            type="button"
            part="toggler"
            class="uwc-panel__toggler"
            aria-label=${this.collapsed ? "Expand panel" : "Collapse panel"}
            aria-expanded=${!this.collapsed ? "true" : "false"}
            aria-controls="uwc-panel-content"
            @click=${this._onToggle}
          >
            <span class="uwc-panel__toggler-icon" aria-hidden="true">
              <uwc-icon name="chevron-down" size="14px"></uwc-icon>
            </span>
          </button>
        ` : A}
      </div>
    `;
  }
  // ── Render ─────────────────────────────────────────────────────────────────
  render() {
    return b2`
      <div part="panel" class="uwc-panel">
        ${!this.noHeader ? this._renderHeader() : A}

        <div
          part="content-wrap"
          class="uwc-panel__content-wrap"
          id="uwc-panel-content"
          role="region"
          aria-labelledby="uwc-panel-header-title"
        >
          <div part="content" class="uwc-panel__content">
            <slot></slot>
          </div>
        </div>

        <div
          part="footer"
          class=${e7({ "uwc-panel__footer": true, "uwc-panel__footer--hidden": !this._hasFooter })}
        >
          <slot name="footer" @slotchange=${this._onFooterSlotChange}></slot>
        </div>
      </div>
    `;
  }
};
UwcPanel.styles = styles_default;
__decorateClass([
  n4()
], UwcPanel.prototype, "header", 2);
__decorateClass([
  n4()
], UwcPanel.prototype, "icon", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcPanel.prototype, "toggleable", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcPanel.prototype, "collapsed", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true, attribute: "no-header" })
], UwcPanel.prototype, "noHeader", 2);
__decorateClass([
  e5(".uwc-panel__content-wrap")
], UwcPanel.prototype, "_wrap", 2);
__decorateClass([
  r5()
], UwcPanel.prototype, "_hasFooter", 2);

// src/panel/react.ts
var UwcPanelReact = createComponent({
  react: React,
  tagName: "uwc-panel",
  elementClass: UwcPanel,
  events: {
    onUwcToggle: "uwc-toggle",
    onUwcCollapse: "uwc-collapse",
    onUwcExpand: "uwc-expand"
  }
});
export {
  UwcPanelReact as UwcPanel,
  UwcPanelReact
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
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
