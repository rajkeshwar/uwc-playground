var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i5 = decorators.length - 1, decorator; i5 >= 0; i5--)
    if (decorator = decorators[i5])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};

// src/tooltip/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t3, e6, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e6;
  }
  get styleSheet() {
    let t3 = this.o;
    const s4 = this.t;
    if (e && void 0 === t3) {
      const e6 = void 0 !== s4 && 1 === s4.length;
      e6 && (t3 = o.get(s4)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s4, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t3) => new n("string" == typeof t3 ? t3 : t3 + "", void 0, s);
var i = (t3, ...e6) => {
  const o6 = 1 === t3.length ? t3[0] : e6.reduce((e7, s4, o7) => e7 + ((t4) => {
    if (true === t4._$cssResult$) return t4.cssText;
    if ("number" == typeof t4) return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t3[o7 + 1], t3[0]);
  return new n(o6, t3, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet);
  else for (const e6 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e6.cssText, s4.appendChild(o7);
  }
};
var c = e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e6 = "";
  for (const s4 of t4.cssRules) e6 += s4.cssText;
  return r(e6);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t3, s4) => t3;
var u = { toAttribute(t3, s4) {
  switch (s4) {
    case Boolean:
      t3 = t3 ? l : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, s4) {
  let i5 = t3;
  switch (s4) {
    case Boolean:
      i5 = null !== t3;
      break;
    case Number:
      i5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t3);
      } catch (t4) {
        i5 = null;
      }
  }
  return i5;
} };
var f = (t3, s4) => !i2(t3, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t3) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t3);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t3, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t3) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t3, s4), !s4.noAccessor) {
      const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t3, i5, s4);
      void 0 !== h3 && e2(this.prototype, t3, h3);
    }
  }
  static getPropertyDescriptor(t3, s4, i5) {
    const { get: e6, set: r5 } = h(this.prototype, t3) ?? { get() {
      return this[s4];
    }, set(t4) {
      this[s4] = t4;
    } };
    return { get: e6, set(s5) {
      const h3 = e6?.call(this);
      r5?.call(this, s5), this.requestUpdate(t3, h3, i5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t3 = n2(this);
    t3.finalize(), void 0 !== t3.l && (this.l = [...t3.l]), this.elementProperties = new Map(t3.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t4 = this.properties, s4 = [...r2(t4), ...o2(t4)];
      for (const i5 of s4) this.createProperty(i5, t4[i5]);
    }
    const t3 = this[Symbol.metadata];
    if (null !== t3) {
      const s4 = litPropertyMetadata.get(t3);
      if (void 0 !== s4) for (const [t4, i5] of s4) this.elementProperties.set(t4, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t4, s4] of this.elementProperties) {
      const i5 = this._$Eu(t4, s4);
      void 0 !== i5 && this._$Eh.set(i5, t4);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i5 = [];
    if (Array.isArray(s4)) {
      const e6 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e6) i5.unshift(c(s5));
    } else void 0 !== s4 && i5.push(c(s4));
    return i5;
  }
  static _$Eu(t3, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t3) => this.enableUpdating = t3), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t3) => t3(this));
  }
  addController(t3) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t3), void 0 !== this.renderRoot && this.isConnected && t3.hostConnected?.();
  }
  removeController(t3) {
    this._$EO?.delete(t3);
  }
  _$E_() {
    const t3 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t3.set(i5, this[i5]), delete this[i5]);
    t3.size > 0 && (this._$Ep = t3);
  }
  createRenderRoot() {
    const t3 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t3, this.constructor.elementStyles), t3;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t3) => t3.hostConnected?.());
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t3) => t3.hostDisconnected?.());
  }
  attributeChangedCallback(t3, s4, i5) {
    this._$AK(t3, i5);
  }
  _$ET(t3, s4) {
    const i5 = this.constructor.elementProperties.get(t3), e6 = this.constructor._$Eu(t3, i5);
    if (void 0 !== e6 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t3, null == h3 ? this.removeAttribute(e6) : this.setAttribute(e6, h3), this._$Em = null;
    }
  }
  _$AK(t3, s4) {
    const i5 = this.constructor, e6 = i5._$Eh.get(t3);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t4 = i5.getPropertyOptions(e6), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== t4.converter?.fromAttribute ? t4.converter : u;
      this._$Em = e6;
      const r5 = h3.fromAttribute(s4, t4.type);
      this[e6] = r5 ?? this._$Ej?.get(e6) ?? r5, this._$Em = null;
    }
  }
  requestUpdate(t3, s4, i5, e6 = false, h3) {
    if (void 0 !== t3) {
      const r5 = this.constructor;
      if (false === e6 && (h3 = this[t3]), i5 ?? (i5 = r5.getPropertyOptions(t3)), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t3) && !this.hasAttribute(r5._$Eu(t3, i5)))) return;
      this.C(t3, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t3, s4, { useDefault: i5, reflect: e6, wrapped: h3 }, r5) {
    i5 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t3) && (this._$Ej.set(t3, r5 ?? s4 ?? this[t3]), true !== h3 || void 0 !== r5) || (this._$AL.has(t3) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t3, s4)), true === e6 && this._$Em !== t3 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t3));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t5, s5] of this._$Ep) this[t5] = s5;
        this._$Ep = void 0;
      }
      const t4 = this.constructor.elementProperties;
      if (t4.size > 0) for (const [s5, i5] of t4) {
        const { wrapped: t5 } = i5, e6 = this[s5];
        true !== t5 || this._$AL.has(s5) || void 0 === e6 || this.C(s5, void 0, i5, e6);
      }
    }
    let t3 = false;
    const s4 = this._$AL;
    try {
      t3 = this.shouldUpdate(s4), t3 ? (this.willUpdate(s4), this._$EO?.forEach((t4) => t4.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t3 = false, this._$EM(), s5;
    }
    t3 && this._$AE(s4);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    this._$EO?.forEach((t4) => t4.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
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
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t4) => this._$ET(t4, this[t4]))), this._$EM();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t3) => t3;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u2 = Array.isArray;
var d2 = (t3) => u2(t3) || "function" == typeof t3?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t3) => (i5, ...s4) => ({ _$litType$: t3, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t3, i5) {
  if (!u2(t3) || !t3.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t3, i5) => {
  const s4 = t3.length - 1, e6 = [];
  let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t3[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t3[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e6.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t3, l3 + (t3[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e6];
};
var S2 = class _S {
  constructor({ strings: t3, _$litType$: i5 }, e6) {
    let r5;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t3.length - 1, d3 = this.parts, [f3, v2] = N(t3, i5);
    if (this.el = _S.createElement(f3, e6), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t4 = this.el.content.firstChild;
      t4.replaceWith(...t4.childNodes);
    }
    for (; null !== (r5 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r5.nodeType) {
        if (r5.hasAttributes()) for (const t4 of r5.getAttributeNames()) if (t4.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r5.getAttribute(t4).split(o3), e7 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e7[2], strings: s4, ctor: "." === e7[1] ? I : "?" === e7[1] ? L : "@" === e7[1] ? z : H }), r5.removeAttribute(t4);
        } else t4.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r5.removeAttribute(t4));
        if (y2.test(r5.tagName)) {
          const t4 = r5.textContent.split(o3), i6 = t4.length - 1;
          if (i6 > 0) {
            r5.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r5.append(t4[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r5.append(t4[i6], c3());
          }
        }
      } else if (8 === r5.nodeType) if (r5.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t4 = -1;
        for (; -1 !== (t4 = r5.data.indexOf(o3, t4 + 1)); ) d3.push({ type: 7, index: l3 }), t4 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t3, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t3, s4;
  }
};
function M(t3, i5, s4 = t3, e6) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o6 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t3), h3._$AT(t3, s4, e6)), void 0 !== e6 ? (s4._$Co ?? (s4._$Co = []))[e6] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t3, h3._$AS(t3, i5.values), h3, e6)), i5;
}
var R = class {
  constructor(t3, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t3, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t3) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e6 = (t3?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e6;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r5 = s4[0];
    for (; void 0 !== r5; ) {
      if (o6 === r5.index) {
        let i6;
        2 === r5.type ? i6 = new k(h3, h3.nextSibling, this, t3) : 1 === r5.type ? i6 = new r5.ctor(h3, r5.name, r5.strings, this, t3) : 6 === r5.type && (i6 = new Z(h3, this, t3)), this._$AV.push(i6), r5 = s4[++n5];
      }
      o6 !== r5?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e6;
  }
  p(t3) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t3, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t3[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t3, i5, s4, e6) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t3, this._$AB = i5, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t3?.nodeType && (t3 = i5.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i5 = this) {
    t3 = M(this, t3, i5), a2(t3) ? t3 === A || null == t3 || "" === t3 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t3 !== this._$AH && t3 !== E && this._(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : d2(t3) ? this.k(t3) : this._(t3);
  }
  O(t3) {
    return this._$AA.parentNode.insertBefore(t3, this._$AB);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  _(t3) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(l2.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    const { values: i5, _$litType$: s4 } = t3, e6 = "number" == typeof s4 ? this._$AC(t3) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e6) this._$AH.p(i5);
    else {
      const t4 = new R(e6, this), s5 = t4.u(this.options);
      t4.p(i5), this.T(s5), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i5 = C.get(t3.strings);
    return void 0 === i5 && C.set(t3.strings, i5 = new S2(t3)), i5;
  }
  k(t3) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e6 = 0;
    for (const h3 of t3) e6 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e6], s4._$AI(h3), e6++;
    e6 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i5.length = e6);
  }
  _$AR(t3 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t3 !== this._$AB; ) {
      const s5 = i3(t3).nextSibling;
      i3(t3).remove(), t3 = s5;
    }
  }
  setConnected(t3) {
    void 0 === this._$AM && (this._$Cv = t3, this._$AP?.(t3));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t3, i5, s4, e6, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t3, this.name = i5, this._$AM = e6, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t3, i5 = this, s4, e6) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t3 = M(this, t3, i5, 0), o6 = !a2(t3) || t3 !== this._$AH && t3 !== E, o6 && (this._$AH = t3);
    else {
      const e7 = t3;
      let n5, r5;
      for (t3 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r5 = M(this, e7[s4 + n5], i5, n5), r5 === E && (r5 = this._$AH[n5]), o6 || (o6 = !a2(r5) || r5 !== this._$AH[n5]), r5 === A ? t3 = A : t3 !== A && (t3 += (r5 ?? "") + h3[n5 + 1]), this._$AH[n5] = r5;
    }
    o6 && !e6 && this.j(t3);
  }
  j(t3) {
    t3 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === A ? void 0 : t3;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    this.element.toggleAttribute(this.name, !!t3 && t3 !== A);
  }
};
var z = class extends H {
  constructor(t3, i5, s4, e6, h3) {
    super(t3, i5, s4, e6, h3), this.type = 5;
  }
  _$AI(t3, i5 = this) {
    if ((t3 = M(this, t3, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e6 = t3 === A && s4 !== A || t3.capture !== s4.capture || t3.once !== s4.once || t3.passive !== s4.passive, h3 = t3 !== A && (s4 === A || e6);
    e6 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var Z = class {
  constructor(t3, i5, s4) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    M(this, t3);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t3, i5, s4) => {
  const e6 = s4?.renderBefore ?? i5;
  let h3 = e6._$litPart$;
  if (void 0 === h3) {
    const t4 = s4?.renderBefore ?? null;
    e6._$litPart$ = h3 = new k(i5.insertBefore(c3(), t4), t4, void 0, s4 ?? {});
  }
  return h3._$AI(t3), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t3 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t3.firstChild), t3;
  }
  update(t3) {
    const r5 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Do = D(r5, this.renderRoot, this.renderOptions);
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

// src/tooltip/styles.ts
var styles_default = [
  hostReset,
  floatingPanel(".panel", {
    scaleFrom: "scale(0.93)",
    scaleTo: "scale(1)",
    durationVar: "--uwc-tooltip-duration",
    durationDefault: "120ms",
    easing: "ease"
  }),
  placementOriginsExtended,
  i`
    :host { display: contents; }
    slot[name="trigger"] { display: contents; }

    /* ── Panel (visual) ─────────────────────────────────────────────────────── */
    .panel {
      overflow: visible;
      --bg: var(--uwc-tooltip-bg, #1c1c22);
      background:    var(--bg);
      border-radius: var(--uwc-tooltip-radius,    7px);
      border:        none;
      box-shadow:    var(--uwc-tooltip-shadow,    ${shadowLg});
      z-index:       var(--uwc-tooltip-z,         ${zTooltip});
      max-width:     var(--uwc-tooltip-max-width, 280px);
    }

    /* ── Text content ───────────────────────────────────────────────────────── */
    .text {
      padding: 6px 10px;
      font-size:   var(--uwc-tooltip-font-size, ${fontSizeXs});
      line-height: 1.5;
      color:       var(--uwc-tooltip-color, rgba(255,255,255,0.88));
      white-space: nowrap;
    }

    /* ── Arrow ──────────────────────────────────────────────────────────────── */
    .arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--bg);
      transform: rotate(45deg);
      border-radius: ${radiusXs};
      z-index: -1;
    }
  `
];

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t3 = o5, e6, r5) => {
  const { kind: n5, metadata: i5 } = r5;
  let s4 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t3 = Object.create(t3)).wrapped = true), s4.set(r5.name, t3), "accessor" === n5) {
    const { name: o6 } = r5;
    return { set(r6) {
      const n6 = e6.get.call(this);
      e6.set.call(this, r6), this.requestUpdate(o6, n6, t3, true, r6);
    }, init(e7) {
      return void 0 !== e7 && this.C(o6, void 0, t3, e7), e7;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r5;
    return function(r6) {
      const n6 = this[o6];
      e6.call(this, r6), this.requestUpdate(o6, n6, t3, true, r6);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t3) {
  return (e6, o6) => "object" == typeof o6 ? r4(t3, e6, o6) : ((t4, e7, o7) => {
    const r5 = e7.hasOwnProperty(o7);
    return e7.constructor.createProperty(o7, t4), r5 ? Object.getOwnPropertyDescriptor(e7, o7) : void 0;
  })(t3, e6, o6);
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e6, t3, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t3 && Object.defineProperty(e6, t3, c4), c4);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e6, r5) {
  return (n5, s4, i5) => {
    const o6 = (t3) => t3.renderRoot?.querySelector(e6) ?? null;
    if (r5) {
      const { get: e7, set: r6 } = "object" == typeof s4 ? n5 : i5 ?? /* @__PURE__ */ (() => {
        const t3 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t3];
        }, set(e8) {
          this[t3] = e8;
        } };
      })();
      return e4(n5, s4, { get() {
        let t3 = e7.call(this);
        return void 0 === t3 && (t3 = o6(this), (null !== t3 || this.hasUpdated) && r6.call(this, t3)), t3;
      } });
    }
    return e4(n5, s4, { get() {
      return o6(this);
    } });
  };
}

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
  _handleOutsideClick(e6) {
    const path = e6.composedPath();
    const panel = this._getPanelEl();
    if (panel && !path.includes(panel) && !path.includes(this.triggerEl)) {
      this.hide();
    }
  }
  _handleEscapeKey(e6) {
    if (e6.key === "Escape") {
      this.hide();
      this.triggerEl?.focus();
    }
  }
  _setOpen(val) {
    this._open = val;
    this.host.requestUpdate();
  }
};

// src/tooltip/index.ts
var ARROW_HALF = 6;
var UwcTooltip = class extends i4 {
  constructor() {
    super(...arguments);
    this.placement = "top";
    this.offset = 10;
    this.showDelay = 400;
    this.hideDelay = 100;
    this.disabled = false;
    this.arrow = true;
    this.triggerMode = "hover focus";
    this.maxWidth = "260px";
    this._showTimer = null;
    this._hideTimer = null;
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const cleanups = [];
        if (this.triggerMode.includes("hover")) {
          const onEnter = () => this._scheduleShow();
          const onLeave = () => this._scheduleHide();
          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
          cleanups.push(
            () => el.removeEventListener("mouseenter", onEnter),
            () => el.removeEventListener("mouseleave", onLeave)
          );
        }
        if (this.triggerMode.includes("focus")) {
          const onFocus = () => {
            this._cancelTimers();
            this._pc.show();
          };
          const onBlur = () => {
            this._cancelTimers();
            this._pc.hide();
          };
          el.addEventListener("focus", onFocus);
          el.addEventListener("blur", onBlur);
          cleanups.push(
            () => el.removeEventListener("focus", onFocus),
            () => el.removeEventListener("blur", onBlur)
          );
        }
        if (this.triggerMode === "click") {
          const onClick = (e6) => {
            e6.stopPropagation();
            this._pc.toggle();
          };
          el.addEventListener("click", onClick);
          cleanups.push(() => el.removeEventListener("click", onClick));
        }
        const panelId = "panel";
        el.setAttribute("aria-describedby", panelId);
        return () => {
          cleanups.forEach((fn) => fn());
          el.removeAttribute("aria-describedby");
        };
      },
      dismissOnEscape: true,
      afterPosition: ({ triggerRect, panelCoords, panelEl }) => {
        if (this.arrow) this._positionArrow(triggerRect, panelCoords, panelEl);
      }
    });
  }
  // ── Lifecycle ────────────────────────────────────────────────────
  firstUpdated() {
    this._pc.firstUpdated(
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
    const panel = this._panel;
    panel?.addEventListener("mouseenter", () => this._cancelTimers());
    panel?.addEventListener("mouseleave", () => this._scheduleHide());
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(
      changed,
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  // ── Timer helpers ────────────────────────────────────────────────
  _cancelTimers() {
    if (this._showTimer !== null) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
    if (this._hideTimer !== null) {
      clearTimeout(this._hideTimer);
      this._hideTimer = null;
    }
  }
  _scheduleShow() {
    if (this.disabled) return;
    this._cancelTimers();
    this._showTimer = setTimeout(() => this._pc.show(), this.showDelay);
  }
  _scheduleHide() {
    this._cancelTimers();
    this._hideTimer = setTimeout(() => this._pc.hide(), this.hideDelay);
  }
  // ── Arrow positioning ────────────────────────────────────────────
  /**
   * Position the arrow element on the correct panel edge,
   * sliding along that edge so it always points at the trigger's center.
   * The arrow is a rotated square; ARROW_HALF px places it half-in, half-out.
   */
  _positionArrow(tRect, coords, panelEl) {
    const arrow = this._arrow;
    if (!arrow) return;
    const [side] = this.placement.split("-");
    const pRect = panelEl.getBoundingClientRect();
    const MIN = 10;
    arrow.style.cssText = "";
    if (side === "top" || side === "bottom") {
      const cx = tRect.left + tRect.width / 2;
      const max = pRect.width - ARROW_HALF * 2 - MIN;
      const al = Math.max(MIN, Math.min(cx - coords.left - ARROW_HALF, max));
      arrow.style.left = `${al}px`;
      arrow.style[side === "bottom" ? "top" : "bottom"] = `${-ARROW_HALF}px`;
    } else {
      const cy = tRect.top + tRect.height / 2;
      const max = pRect.height - ARROW_HALF * 2 - MIN;
      const at = Math.max(MIN, Math.min(cy - coords.top - ARROW_HALF, max));
      arrow.style.top = `${at}px`;
      arrow.style[side === "right" ? "left" : "right"] = `${-ARROW_HALF}px`;
    }
  }
  // ── Public API ───────────────────────────────────────────────────
  show() {
    this._cancelTimers();
    this._pc.show();
  }
  hide() {
    this._cancelTimers();
    this._pc.hide();
  }
  get isOpen() {
    return this._pc.open;
  }
  // ── Slot detection ───────────────────────────────────────────────
  _hasContentSlot() {
    return Array.from(this.children).some((c4) => c4.slot === "content");
  }
  // ── Render ───────────────────────────────────────────────────────
  render() {
    const isExternal = Boolean(this.triggerId);
    const open = this._pc.open;
    return b2`
      ${!isExternal ? b2`<slot name="trigger" part="trigger"></slot>` : A}

      <div
        id="panel"
        part="panel"
        popover="manual"
        role="tooltip"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
        style="max-width: ${this.maxWidth}"
      >
        ${this.arrow ? b2`<div id="arrow" part="arrow" class="arrow"></div>` : A}

        ${this.content && !this._hasContentSlot() ? b2`<div part="text" class="text">${this.content}</div>` : A}

        <slot name="content"></slot>
        <slot></slot>
      </div>`;
  }
};
UwcTooltip.styles = [styles_default];
__decorateClass([
  n4({ type: String })
], UwcTooltip.prototype, "triggerId", 2);
__decorateClass([
  n4({ type: String })
], UwcTooltip.prototype, "content", 2);
__decorateClass([
  n4({ type: String })
], UwcTooltip.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcTooltip.prototype, "offset", 2);
__decorateClass([
  n4({ type: Number, attribute: "show-delay" })
], UwcTooltip.prototype, "showDelay", 2);
__decorateClass([
  n4({ type: Number, attribute: "hide-delay" })
], UwcTooltip.prototype, "hideDelay", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcTooltip.prototype, "disabled", 2);
__decorateClass([
  n4({ type: Boolean })
], UwcTooltip.prototype, "arrow", 2);
__decorateClass([
  n4({ type: String, attribute: "trigger-mode" })
], UwcTooltip.prototype, "triggerMode", 2);
__decorateClass([
  n4({ type: String, attribute: "max-width" })
], UwcTooltip.prototype, "maxWidth", 2);
__decorateClass([
  e5("#panel")
], UwcTooltip.prototype, "_panel", 2);
__decorateClass([
  e5("#arrow")
], UwcTooltip.prototype, "_arrow", 2);

// src/tooltip/react.ts
var UwcTooltip2 = createComponent({
  tagName: "uwc-tooltip",
  elementClass: UwcTooltip,
  react: React,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide"
  }
});
export {
  UwcTooltip2 as UwcTooltip
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
*/
