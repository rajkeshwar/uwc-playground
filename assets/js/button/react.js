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

// src/button/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t5, e7, o7) {
    if (this._$cssResult$ = true, o7 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t5, this.t = e7;
  }
  get styleSheet() {
    let t5 = this.o;
    const s4 = this.t;
    if (e && void 0 === t5) {
      const e7 = void 0 !== s4 && 1 === s4.length;
      e7 && (t5 = o.get(s4)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e7 && o.set(s4, t5));
    }
    return t5;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
var i = (t5, ...e7) => {
  const o7 = 1 === t5.length ? t5[0] : e7.reduce((e8, s4, o8) => e8 + ((t6) => {
    if (true === t6._$cssResult$) return t6.cssText;
    if ("number" == typeof t6) return t6;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t6 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t5[o8 + 1], t5[0]);
  return new n(o7, t5, s);
};
var S = (s4, o7) => {
  if (e) s4.adoptedStyleSheets = o7.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
  else for (const e7 of o7) {
    const o8 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o8.setAttribute("nonce", n5), o8.textContent = e7.cssText, s4.appendChild(o8);
  }
};
var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
  let e7 = "";
  for (const s4 of t6.cssRules) e7 += s4.cssText;
  return r(e7);
})(t5) : t5;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t5, s4) => t5;
var u = { toAttribute(t5, s4) {
  switch (s4) {
    case Boolean:
      t5 = t5 ? l : null;
      break;
    case Object:
    case Array:
      t5 = null == t5 ? t5 : JSON.stringify(t5);
  }
  return t5;
}, fromAttribute(t5, s4) {
  let i6 = t5;
  switch (s4) {
    case Boolean:
      i6 = null !== t5;
      break;
    case Number:
      i6 = null === t5 ? null : Number(t5);
      break;
    case Object:
    case Array:
      try {
        i6 = JSON.parse(t5);
      } catch (t6) {
        i6 = null;
      }
  }
  return i6;
} };
var f = (t5, s4) => !i2(t5, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t5) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t5);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t5, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t5) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t5, s4), !s4.noAccessor) {
      const i6 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t5, i6, s4);
      void 0 !== h3 && e2(this.prototype, t5, h3);
    }
  }
  static getPropertyDescriptor(t5, s4, i6) {
    const { get: e7, set: r5 } = h(this.prototype, t5) ?? { get() {
      return this[s4];
    }, set(t6) {
      this[s4] = t6;
    } };
    return { get: e7, set(s5) {
      const h3 = e7?.call(this);
      r5?.call(this, s5), this.requestUpdate(t5, h3, i6);
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
      const t6 = this.properties, s4 = [...r2(t6), ...o2(t6)];
      for (const i6 of s4) this.createProperty(i6, t6[i6]);
    }
    const t5 = this[Symbol.metadata];
    if (null !== t5) {
      const s4 = litPropertyMetadata.get(t5);
      if (void 0 !== s4) for (const [t6, i6] of s4) this.elementProperties.set(t6, i6);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t6, s4] of this.elementProperties) {
      const i6 = this._$Eu(t6, s4);
      void 0 !== i6 && this._$Eh.set(i6, t6);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i6 = [];
    if (Array.isArray(s4)) {
      const e7 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e7) i6.unshift(c(s5));
    } else void 0 !== s4 && i6.push(c(s4));
    return i6;
  }
  static _$Eu(t5, s4) {
    const i6 = s4.attribute;
    return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
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
    const t5 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i6 of s4.keys()) this.hasOwnProperty(i6) && (t5.set(i6, this[i6]), delete this[i6]);
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
  attributeChangedCallback(t5, s4, i6) {
    this._$AK(t5, i6);
  }
  _$ET(t5, s4) {
    const i6 = this.constructor.elementProperties.get(t5), e7 = this.constructor._$Eu(t5, i6);
    if (void 0 !== e7 && true === i6.reflect) {
      const h3 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s4, i6.type);
      this._$Em = t5, null == h3 ? this.removeAttribute(e7) : this.setAttribute(e7, h3), this._$Em = null;
    }
  }
  _$AK(t5, s4) {
    const i6 = this.constructor, e7 = i6._$Eh.get(t5);
    if (void 0 !== e7 && this._$Em !== e7) {
      const t6 = i6.getPropertyOptions(e7), h3 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
      this._$Em = e7;
      const r5 = h3.fromAttribute(s4, t6.type);
      this[e7] = r5 ?? this._$Ej?.get(e7) ?? r5, this._$Em = null;
    }
  }
  requestUpdate(t5, s4, i6, e7 = false, h3) {
    if (void 0 !== t5) {
      const r5 = this.constructor;
      if (false === e7 && (h3 = this[t5]), i6 ?? (i6 = r5.getPropertyOptions(t5)), !((i6.hasChanged ?? f)(h3, s4) || i6.useDefault && i6.reflect && h3 === this._$Ej?.get(t5) && !this.hasAttribute(r5._$Eu(t5, i6)))) return;
      this.C(t5, s4, i6);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t5, s4, { useDefault: i6, reflect: e7, wrapped: h3 }, r5) {
    i6 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t5) && (this._$Ej.set(t5, r5 ?? s4 ?? this[t5]), true !== h3 || void 0 !== r5) || (this._$AL.has(t5) || (this.hasUpdated || i6 || (s4 = void 0), this._$AL.set(t5, s4)), true === e7 && this._$Em !== t5 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t5));
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
        for (const [t7, s5] of this._$Ep) this[t7] = s5;
        this._$Ep = void 0;
      }
      const t6 = this.constructor.elementProperties;
      if (t6.size > 0) for (const [s5, i6] of t6) {
        const { wrapped: t7 } = i6, e7 = this[s5];
        true !== t7 || this._$AL.has(s5) || void 0 === e7 || this.C(s5, void 0, i6, e7);
      }
    }
    let t5 = false;
    const s4 = this._$AL;
    try {
      t5 = this.shouldUpdate(s4), t5 ? (this.willUpdate(s4), this._$EO?.forEach((t6) => t6.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t5 = false, this._$EM(), s5;
    }
    t5 && this._$AE(s4);
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
var x = (t5) => (i6, ...s4) => ({ _$litType$: t5, strings: i6, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t5, i6) {
  if (!u2(t5) || !t5.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i6) : i6;
}
var N = (t5, i6) => {
  const s4 = t5.length - 1, e7 = [];
  let n5, l3 = 2 === i6 ? "<svg>" : 3 === i6 ? "<math>" : "", c4 = v;
  for (let i7 = 0; i7 < s4; i7++) {
    const s5 = t5[i7];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t5[i7 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e7.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i7 : x2);
  }
  return [V(t5, l3 + (t5[s4] || "<?>") + (2 === i6 ? "</svg>" : 3 === i6 ? "</math>" : "")), e7];
};
var S2 = class _S {
  constructor({ strings: t5, _$litType$: i6 }, e7) {
    let r5;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t5.length - 1, d3 = this.parts, [f3, v2] = N(t5, i6);
    if (this.el = _S.createElement(f3, e7), P.currentNode = this.el.content, 2 === i6 || 3 === i6) {
      const t6 = this.el.content.firstChild;
      t6.replaceWith(...t6.childNodes);
    }
    for (; null !== (r5 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r5.nodeType) {
        if (r5.hasAttributes()) for (const t6 of r5.getAttributeNames()) if (t6.endsWith(h2)) {
          const i7 = v2[a3++], s4 = r5.getAttribute(t6).split(o3), e8 = /([.?@])?(.*)/.exec(i7);
          d3.push({ type: 1, index: l3, name: e8[2], strings: s4, ctor: "." === e8[1] ? I : "?" === e8[1] ? L : "@" === e8[1] ? z : H }), r5.removeAttribute(t6);
        } else t6.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r5.removeAttribute(t6));
        if (y2.test(r5.tagName)) {
          const t6 = r5.textContent.split(o3), i7 = t6.length - 1;
          if (i7 > 0) {
            r5.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i7; s4++) r5.append(t6[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r5.append(t6[i7], c3());
          }
        }
      } else if (8 === r5.nodeType) if (r5.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t6 = -1;
        for (; -1 !== (t6 = r5.data.indexOf(o3, t6 + 1)); ) d3.push({ type: 7, index: l3 }), t6 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t5, i6) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t5, s4;
  }
};
function M(t5, i6, s4 = t5, e7) {
  if (i6 === E) return i6;
  let h3 = void 0 !== e7 ? s4._$Co?.[e7] : s4._$Cl;
  const o7 = a2(i6) ? void 0 : i6._$litDirective$;
  return h3?.constructor !== o7 && (h3?._$AO?.(false), void 0 === o7 ? h3 = void 0 : (h3 = new o7(t5), h3._$AT(t5, s4, e7)), void 0 !== e7 ? (s4._$Co ?? (s4._$Co = []))[e7] = h3 : s4._$Cl = h3), void 0 !== h3 && (i6 = M(t5, h3._$AS(t5, i6.values), h3, e7)), i6;
}
var R = class {
  constructor(t5, i6) {
    this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i6;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t5) {
    const { el: { content: i6 }, parts: s4 } = this._$AD, e7 = (t5?.creationScope ?? l2).importNode(i6, true);
    P.currentNode = e7;
    let h3 = P.nextNode(), o7 = 0, n5 = 0, r5 = s4[0];
    for (; void 0 !== r5; ) {
      if (o7 === r5.index) {
        let i7;
        2 === r5.type ? i7 = new k(h3, h3.nextSibling, this, t5) : 1 === r5.type ? i7 = new r5.ctor(h3, r5.name, r5.strings, this, t5) : 6 === r5.type && (i7 = new Z(h3, this, t5)), this._$AV.push(i7), r5 = s4[++n5];
      }
      o7 !== r5?.index && (h3 = P.nextNode(), o7++);
    }
    return P.currentNode = l2, e7;
  }
  p(t5) {
    let i6 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t5, s4, i6), i6 += s4.strings.length - 2) : s4._$AI(t5[i6])), i6++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t5, i6, s4, e7) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t5, this._$AB = i6, this._$AM = s4, this.options = e7, this._$Cv = e7?.isConnected ?? true;
  }
  get parentNode() {
    let t5 = this._$AA.parentNode;
    const i6 = this._$AM;
    return void 0 !== i6 && 11 === t5?.nodeType && (t5 = i6.parentNode), t5;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t5, i6 = this) {
    t5 = M(this, t5, i6), a2(t5) ? t5 === A || null == t5 || "" === t5 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t5 !== this._$AH && t5 !== E && this._(t5) : void 0 !== t5._$litType$ ? this.$(t5) : void 0 !== t5.nodeType ? this.T(t5) : d2(t5) ? this.k(t5) : this._(t5);
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
    const { values: i6, _$litType$: s4 } = t5, e7 = "number" == typeof s4 ? this._$AC(t5) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e7) this._$AH.p(i6);
    else {
      const t6 = new R(e7, this), s5 = t6.u(this.options);
      t6.p(i6), this.T(s5), this._$AH = t6;
    }
  }
  _$AC(t5) {
    let i6 = C.get(t5.strings);
    return void 0 === i6 && C.set(t5.strings, i6 = new S2(t5)), i6;
  }
  k(t5) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i6 = this._$AH;
    let s4, e7 = 0;
    for (const h3 of t5) e7 === i6.length ? i6.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i6[e7], s4._$AI(h3), e7++;
    e7 < i6.length && (this._$AR(s4 && s4._$AB.nextSibling, e7), i6.length = e7);
  }
  _$AR(t5 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t5 !== this._$AB; ) {
      const s5 = i3(t5).nextSibling;
      i3(t5).remove(), t5 = s5;
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
  constructor(t5, i6, s4, e7, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t5, this.name = i6, this._$AM = e7, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t5, i6 = this, s4, e7) {
    const h3 = this.strings;
    let o7 = false;
    if (void 0 === h3) t5 = M(this, t5, i6, 0), o7 = !a2(t5) || t5 !== this._$AH && t5 !== E, o7 && (this._$AH = t5);
    else {
      const e8 = t5;
      let n5, r5;
      for (t5 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r5 = M(this, e8[s4 + n5], i6, n5), r5 === E && (r5 = this._$AH[n5]), o7 || (o7 = !a2(r5) || r5 !== this._$AH[n5]), r5 === A ? t5 = A : t5 !== A && (t5 += (r5 ?? "") + h3[n5 + 1]), this._$AH[n5] = r5;
    }
    o7 && !e7 && this.j(t5);
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
  constructor(t5, i6, s4, e7, h3) {
    super(t5, i6, s4, e7, h3), this.type = 5;
  }
  _$AI(t5, i6 = this) {
    if ((t5 = M(this, t5, i6, 0) ?? A) === E) return;
    const s4 = this._$AH, e7 = t5 === A && s4 !== A || t5.capture !== s4.capture || t5.once !== s4.once || t5.passive !== s4.passive, h3 = t5 !== A && (s4 === A || e7);
    e7 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
  }
  handleEvent(t5) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
  }
};
var Z = class {
  constructor(t5, i6, s4) {
    this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t5) {
    M(this, t5);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t5, i6, s4) => {
  const e7 = s4?.renderBefore ?? i6;
  let h3 = e7._$litPart$;
  if (void 0 === h3) {
    const t6 = s4?.renderBefore ?? null;
    e7._$litPart$ = h3 = new k(i6.insertBefore(c3(), t6), t6, void 0, s4 ?? {});
  }
  return h3._$AI(t5), h3;
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
    const r5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = D(r5, this.renderRoot, this.renderOptions);
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

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t5) => (e7, o7) => {
  void 0 !== o7 ? o7.addInitializer(() => {
    customElements.define(t5, e7);
  }) : customElements.define(t5, e7);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t5 = o5, e7, r5) => {
  const { kind: n5, metadata: i6 } = r5;
  let s4 = globalThis.litPropertyMetadata.get(i6);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i6, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t5 = Object.create(t5)).wrapped = true), s4.set(r5.name, t5), "accessor" === n5) {
    const { name: o7 } = r5;
    return { set(r6) {
      const n6 = e7.get.call(this);
      e7.set.call(this, r6), this.requestUpdate(o7, n6, t5, true, r6);
    }, init(e8) {
      return void 0 !== e8 && this.C(o7, void 0, t5, e8), e8;
    } };
  }
  if ("setter" === n5) {
    const { name: o7 } = r5;
    return function(r6) {
      const n6 = this[o7];
      e7.call(this, r6), this.requestUpdate(o7, n6, t5, true, r6);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t5) {
  return (e7, o7) => "object" == typeof o7 ? r4(t5, e7, o7) : ((t6, e8, o8) => {
    const r5 = e8.hasOwnProperty(o8);
    return e8.constructor.createProperty(o8, t6), r5 ? Object.getOwnPropertyDescriptor(e8, o8) : void 0;
  })(t5, e7, o7);
}

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t5) => (...e7) => ({ _$litDirective$: t5, values: e7 });
var i5 = class {
  constructor(t5) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t5, e7, i6) {
    this._$Ct = t5, this._$AM = e7, this._$Ci = i6;
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
    if (super(t5), t5.type !== t4.ATTRIBUTE || "class" !== t5.name || t5.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t5) {
    return " " + Object.keys(t5).filter((s4) => t5[s4]).join(" ") + " ";
  }
  update(s4, [i6]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t5) => "" !== t5)));
      for (const t5 in i6) i6[t5] && !this.nt?.has(t5) && this.st.add(t5);
      return this.render(i6);
    }
    const r5 = s4.element.classList;
    for (const t5 of this.st) t5 in i6 || (r5.remove(t5), this.st.delete(t5));
    for (const t5 in i6) {
      const s5 = !!i6[t5];
      s5 === this.st.has(t5) || this.nt?.has(t5) || (s5 ? (r5.add(t5), this.st.add(t5)) : (r5.remove(t5), this.st.delete(t5)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/if-defined.js
var o6 = (o7) => o7 ?? A;

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

// src/button/styles.ts
var styles_default = [
  hostReset,
  i`
    :host {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      font-size: initial;
    }
    :host([fluid]) { display: block; width: 100%; }

    /* ── Base button ────────────────────────────────────────────────────────── */
    .uwc-btn {
      --_bg:         var(--uwc-btn-bg,        var(--uwc-color-primary,  ${primary}));
      --_color:      var(--uwc-btn-color,     #fff);
      --_border:     var(--uwc-btn-border,    transparent);
      --_radius:     var(--uwc-btn-radius,    var(--uwc-radius-md,     ${radiusMd}));
      --_shadow:     var(--uwc-btn-shadow,    none);
      --_font-size:  var(--uwc-btn-font-size, var(--uwc-font-size-md,  ${fontSizeMd}));
      --_px:         var(--uwc-btn-padding-x, 0.875rem);
      --_py:         var(--uwc-btn-padding-y, 0.5rem);
      --_gap:        var(--uwc-btn-gap,       0.375rem);
      --_transition: var(--uwc-btn-transition,
        background-color ${durationBase} ease,
        box-shadow ${durationBase} ease,
        opacity ${durationBase} ease,
        translate ${durationFast} ease
      );

      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--_gap);
      width: 100%;
      padding-inline: var(--_px);
      padding-block:  var(--_py);
      font-family:    var(--uwc-font-family, inherit);
      font-size:      var(--_font-size);
      font-weight:    var(--uwc-btn-font-weight, ${fontWeightMedium});
      letter-spacing: var(--uwc-btn-letter-spacing, normal);
      text-transform: var(--uwc-btn-text-transform, none);
      line-height:    1.25;
      white-space:    nowrap;
      cursor:         pointer;
      user-select:    none;
      text-decoration: none;
      outline:        none;
      box-sizing:     border-box;

      border:           1px solid var(--_border);
      border-radius:    var(--_radius);
      background-color: var(--_bg);
      color:            var(--_color);
      box-shadow:       var(--_shadow);
      transition:       var(--_transition);
    }
    .uwc-btn:hover  { background-color: color-mix(in oklab, var(--_bg) 100%, white 12%); }
    .uwc-btn:active { background-color: color-mix(in oklab, var(--_bg) 100%, black 6%); translate: 0 1px; }
    .uwc-btn:focus-visible { outline: 2px solid var(--_bg); outline-offset: 2px; }

    /* ── Variants ───────────────────────────────────────────────────────────── */
    .uwc-btn--primary   { --_bg: var(--uwc-color-primary,   ${primary});   }
    .uwc-btn--secondary { --_bg: var(--uwc-color-secondary, ${secondary}); }
    .uwc-btn--success   { --_bg: var(--uwc-color-success,   ${success});   }
    .uwc-btn--info      { --_bg: var(--uwc-color-info,      ${info});      }
    .uwc-btn--warning   { --_bg: var(--uwc-color-warning,   ${warning}); --_color: var(--uwc-btn-warning-color, ${contrast}); }
    .uwc-btn--help      { --_bg: var(--uwc-color-help,      ${help});    }
    .uwc-btn--danger    { --_bg: var(--uwc-color-danger,    ${danger});  }
    .uwc-btn--contrast  { --_bg: var(--uwc-color-contrast,  ${contrast}); --_color: #fff; }

    /* ── Sizes ──────────────────────────────────────────────────────────────── */
    .uwc-btn--small { --_font-size: var(--uwc-font-size-xs, ${fontSizeXs}); --_px: 0.625rem;  --_py: 0.3125rem; }
    .uwc-btn--large { --_font-size: var(--uwc-font-size-lg, ${fontSizeLg}); --_px: 1.125rem;  --_py: 0.6875rem; }

    /* ── Raised ─────────────────────────────────────────────────────────────── */
    .uwc-btn--raised       { --_shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12); }
    .uwc-btn--raised:hover { --_shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12); }

    /* ── Rounded / Outline / Text / Link ────────────────────────────────────── */
    .uwc-btn--rounded { --_radius: var(--uwc-radius-full, ${radiusFull}); }

    .uwc-btn--outline { --_border: var(--_bg); background-color: transparent; color: var(--_bg); }
    .uwc-btn--outline:hover  { background-color: color-mix(in oklab, var(--_bg) 12%, transparent); }
    .uwc-btn--outline:active { background-color: color-mix(in oklab, var(--_bg) 20%, transparent); }

    .uwc-btn--text { background-color: transparent; border-color: transparent; color: var(--_bg); }
    .uwc-btn--text:hover  { background-color: color-mix(in oklab, var(--_bg) 10%, transparent); }
    .uwc-btn--text:active { background-color: color-mix(in oklab, var(--_bg) 18%, transparent); }

    .uwc-btn--link { background-color: transparent; border-color: transparent; color: var(--_bg); text-decoration: underline; text-underline-offset: 2px; }
    .uwc-btn--link:hover  { background-color: transparent; color: color-mix(in oklab, var(--_bg) 80%, black); }
    .uwc-btn--link:active { translate: 0 0; }

    /* ── Icon-only / top / bottom ────────────────────────────────────────────── */
    .uwc-btn--icon-only { --_px: var(--_py); aspect-ratio: 1/1; gap: 0; justify-content: center; }
    .uwc-btn--icon-only.uwc-btn--small { --_px: 0.3125rem; }
    .uwc-btn--icon-only.uwc-btn--large { --_px: 0.6875rem; }
    .uwc-btn--icon-top,
    .uwc-btn--icon-bottom { flex-direction: column; gap: 0.25rem; }
    .uwc-btn--icon-bottom { flex-direction: column-reverse; }

    /* ── States ─────────────────────────────────────────────────────────────── */
    .uwc-btn--loading  { cursor: wait; }
    .uwc-btn--disabled { pointer-events: none; opacity: 0.6; cursor: not-allowed; }
    .uwc-btn--fluid    { width: 100%; }

    /* ── Inner elements ─────────────────────────────────────────────────────── */
    .uwc-btn__label { display: inline-flex; align-items: center; }
    .uwc-btn__icon  { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }

    /* ── Badge ──────────────────────────────────────────────────────────────── */
    .uwc-btn__badge {
      --_badge-bg:    var(--uwc-btn-badge-bg,    var(--uwc-color-danger, ${danger}));
      --_badge-color: var(--uwc-btn-badge-color, #fff);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1.125rem;
      height: 1.125rem;
      padding-inline: 0.3125rem;
      margin-inline-start: 0.125rem;
      font-size: 0.6875rem;
      font-weight: ${fontWeightBold};
      line-height: 1;
      border-radius: var(--uwc-radius-full, ${radiusFull});
      background-color: var(--_badge-bg);
      color: var(--_badge-color);
    }
    .uwc-btn__badge--primary   { --_badge-bg: var(--uwc-color-primary,   ${primary});   }
    .uwc-btn__badge--secondary { --_badge-bg: var(--uwc-color-secondary, ${secondary}); }
    .uwc-btn__badge--success   { --_badge-bg: var(--uwc-color-success,   ${success});   }
    .uwc-btn__badge--info      { --_badge-bg: var(--uwc-color-info,   ${info}); --_badge-color: #111; }
    .uwc-btn__badge--warning   { --_badge-bg: var(--uwc-color-warning, ${warning}); --_badge-color: #111; }
    .uwc-btn__badge--danger    { --_badge-bg: var(--uwc-color-danger,  ${danger});   }
    .uwc-btn__badge--help      { --_badge-bg: var(--uwc-color-help,    ${help});     }
    .uwc-btn__badge--contrast  { --_badge-bg: var(--uwc-color-contrast,${contrast}); }

    /* ── Ripple ─────────────────────────────────────────────────────────────── */
    /* CSS custom properties allow themes to tune ripple feel without JS changes.
       var() inside @keyframes is evaluated at animation-start, so it works in
       all modern browsers. */
    @keyframes uwc-ripple {
      from { opacity: var(--uwc-btn-ripple-opacity, 0.25); transform: scale(0);   }
      to   { opacity: 0; transform: scale(var(--uwc-btn-ripple-scale, 2.5)); }
    }
    .uwc-btn-ripple {
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      pointer-events: none;
      animation: uwc-ripple var(--uwc-btn-ripple-duration, 500ms)
                 var(--uwc-btn-ripple-easing, ease-out) forwards;
      transform-origin: center;
    }
  `
];

// src/button/index.ts
var UwcButton = class extends i4 {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.size = "medium";
    this.type = "button";
    this.iconPos = "left";
    this.iconOnly = false;
    this.loading = false;
    this.loadingIcon = "arrow-clockwise";
    this.raised = false;
    this.rounded = false;
    this.outline = false;
    this.text = false;
    this.link = false;
    this.fluid = false;
    this.disabled = false;
    this.badgeSeverity = "danger";
    this.ariaLabel = null;
    this.autofocus = false;
  }
  // ── Helpers ───────────────────────────────────────────────────────
  _hasSlot(name) {
    return Array.from(this.children).some((el) => el.slot === name);
  }
  _iconSize() {
    return this.size === "small" ? "13px" : this.size === "large" ? "20px" : "15px";
  }
  // ── Ripple ───────────────────────────────────────────────────────
  _handleClick(e7) {
    if (this.disabled || this.loading) return;
    this._spawnRipple(e7);
    this.dispatchEvent(new CustomEvent("uwc-click", { bubbles: true, composed: true, detail: { originalEvent: e7 } }));
  }
  _spawnRipple(e7) {
    const btn = this.shadowRoot.querySelector('[part="button"]');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x2 = e7.clientX - rect.left - size / 2;
    const y3 = e7.clientY - rect.top - size / 2;
    const span = document.createElement("span");
    span.className = "uwc-btn-ripple";
    span.style.cssText = `width:${size}px;height:${size}px;left:${x2}px;top:${y3}px`;
    btn.appendChild(span);
    span.addEventListener("animationend", () => span.remove(), { once: true });
  }
  // ── Render ────────────────────────────────────────────────────────
  _renderIcon() {
    const name = this.loading ? this.loadingIcon : this.icon;
    return b2`
      <uwc-icon
        part="icon"
        class="uwc-btn__icon"
        name=${name}
        size=${this._iconSize()}
        ?spin=${this.loading}>
      </uwc-icon>`;
  }
  _renderLabel() {
    if (this.label) {
      return b2`<span part="label" class="uwc-btn__label">${this.label}</span>`;
    }
    return b2`<slot part="label" class="uwc-btn__label"></slot>`;
  }
  _renderBadge() {
    if (!this.badge) return A;
    return b2`<span part="badge" class="uwc-btn__badge uwc-btn__badge--${this.badgeSeverity}">${this.badge}</span>`;
  }
  render() {
    const showIcon = this.icon && !this.loading || this.loading;
    const isVertical = this.iconPos === "top" || this.iconPos === "bottom";
    const classes = e6({
      "uwc-btn": true,
      [`uwc-btn--${this.variant}`]: true,
      [`uwc-btn--${this.size}`]: true,
      "uwc-btn--raised": this.raised,
      "uwc-btn--rounded": this.rounded,
      "uwc-btn--outline": this.outline,
      "uwc-btn--text": this.text,
      "uwc-btn--link": this.link,
      "uwc-btn--fluid": this.fluid,
      "uwc-btn--icon-only": this.iconOnly,
      "uwc-btn--icon-top": isVertical && this.iconPos === "top",
      "uwc-btn--icon-bottom": isVertical && this.iconPos === "bottom",
      "uwc-btn--loading": this.loading,
      "uwc-btn--disabled": this.disabled || this.loading
    });
    const iconEl = showIcon ? this._renderIcon() : A;
    const labelEl = this._renderLabel();
    const prefixEl = !this.loading && this._hasSlot("prefix") ? b2`<slot name="prefix" part="icon" class="uwc-btn__icon"></slot>` : A;
    const suffixEl = this._hasSlot("suffix") ? b2`<slot name="suffix" part="icon" class="uwc-btn__icon"></slot>` : A;
    const badgeEl = this._renderBadge();
    let inner;
    if (this.iconPos === "right") {
      inner = b2`${prefixEl}${labelEl}${iconEl}${suffixEl}${badgeEl}`;
    } else if (this.iconPos === "top") {
      inner = b2`${iconEl}${labelEl}${prefixEl}${suffixEl}${badgeEl}`;
    } else if (this.iconPos === "bottom") {
      inner = b2`${labelEl}${iconEl}${prefixEl}${suffixEl}${badgeEl}`;
    } else {
      inner = b2`${prefixEl}${iconEl}${labelEl}${suffixEl}${badgeEl}`;
    }
    return b2`
      <button
        part="button"
        class=${classes}
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        aria-label=${o6(this.ariaLabel ?? this.label)}
        aria-busy=${this.loading ? "true" : "false"}
        tabindex=${o6(this.tabindex)}
        ?autofocus=${this.autofocus}
        @click=${this._handleClick}
        @focus=${() => this.dispatchEvent(new CustomEvent("uwc-focus", { bubbles: true, composed: true }))}
        @blur=${() => this.dispatchEvent(new CustomEvent("uwc-blur", { bubbles: true, composed: true }))}
      >
        ${inner}
      </button>`;
  }
};
UwcButton.styles = [styles_default];
__decorateClass([
  n4()
], UwcButton.prototype, "label", 2);
__decorateClass([
  n4({ reflect: true })
], UwcButton.prototype, "variant", 2);
__decorateClass([
  n4({ reflect: true })
], UwcButton.prototype, "size", 2);
__decorateClass([
  n4({ reflect: true })
], UwcButton.prototype, "type", 2);
__decorateClass([
  n4()
], UwcButton.prototype, "icon", 2);
__decorateClass([
  n4({ reflect: true, attribute: "icon-pos" })
], UwcButton.prototype, "iconPos", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true, attribute: "icon-only" })
], UwcButton.prototype, "iconOnly", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "loading", 2);
__decorateClass([
  n4({ attribute: "loading-icon" })
], UwcButton.prototype, "loadingIcon", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "raised", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "rounded", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "outline", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "text", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "link", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "fluid", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcButton.prototype, "disabled", 2);
__decorateClass([
  n4()
], UwcButton.prototype, "badge", 2);
__decorateClass([
  n4({ attribute: "badge-severity" })
], UwcButton.prototype, "badgeSeverity", 2);
__decorateClass([
  n4({ attribute: "aria-label" })
], UwcButton.prototype, "ariaLabel", 2);
__decorateClass([
  n4({ type: Number })
], UwcButton.prototype, "tabindex", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcButton.prototype, "autofocus", 2);
UwcButton = __decorateClass([
  t3("uwc-button")
], UwcButton);

// src/button/react.ts
var UwcButtonReact = createComponent({
  tagName: "uwc-button",
  elementClass: UwcButton,
  react: React,
  events: {
    onUwcClick: "uwc-click",
    onUwcFocus: "uwc-focus",
    onUwcBlur: "uwc-blur"
  }
});
export {
  UwcButtonReact
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
lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
