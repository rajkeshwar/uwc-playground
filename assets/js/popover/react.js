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

// src/popover/react.ts
import { createComponent } from "@lit/react";
import React from "react";

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e6, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
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
  const o6 = 1 === t4.length ? t4[0] : e6.reduce((e7, s4, o7) => e7 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e6 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e6.cssText, s4.appendChild(o7);
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
  let i5 = t4;
  switch (s4) {
    case Boolean:
      i5 = null !== t4;
      break;
    case Number:
      i5 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i5 = JSON.parse(t4);
      } catch (t5) {
        i5 = null;
      }
  }
  return i5;
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
      const i5 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t4, i5, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i5) {
    const { get: e6, set: r5 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e6, set(s5) {
      const h3 = e6?.call(this);
      r5?.call(this, s5), this.requestUpdate(t4, h3, i5);
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
      for (const i5 of s4) this.createProperty(i5, t5[i5]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i5] of s4) this.elementProperties.set(t5, i5);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i5 = this._$Eu(t5, s4);
      void 0 !== i5 && this._$Eh.set(i5, t5);
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
  static _$Eu(t4, s4) {
    const i5 = s4.attribute;
    return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
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
    for (const i5 of s4.keys()) this.hasOwnProperty(i5) && (t4.set(i5, this[i5]), delete this[i5]);
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
  attributeChangedCallback(t4, s4, i5) {
    this._$AK(t4, i5);
  }
  _$ET(t4, s4) {
    const i5 = this.constructor.elementProperties.get(t4), e6 = this.constructor._$Eu(t4, i5);
    if (void 0 !== e6 && true === i5.reflect) {
      const h3 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s4, i5.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e6) : this.setAttribute(e6, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i5 = this.constructor, e6 = i5._$Eh.get(t4);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t5 = i5.getPropertyOptions(e6), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e6;
      const r5 = h3.fromAttribute(s4, t5.type);
      this[e6] = r5 ?? this._$Ej?.get(e6) ?? r5, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i5, e6 = false, h3) {
    if (void 0 !== t4) {
      const r5 = this.constructor;
      if (false === e6 && (h3 = this[t4]), i5 ?? (i5 = r5.getPropertyOptions(t4)), !((i5.hasChanged ?? f)(h3, s4) || i5.useDefault && i5.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r5._$Eu(t4, i5)))) return;
      this.C(t4, s4, i5);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i5, reflect: e6, wrapped: h3 }, r5) {
    i5 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t4) && (this._$Ej.set(t4, r5 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r5) || (this._$AL.has(t4) || (this.hasUpdated || i5 || (s4 = void 0), this._$AL.set(t4, s4)), true === e6 && this._$Em !== t4 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t4));
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
      if (t5.size > 0) for (const [s5, i5] of t5) {
        const { wrapped: t6 } = i5, e6 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e6 || this.C(s5, void 0, i5, e6);
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
var x = (t4) => (i5, ...s4) => ({ _$litType$: t4, strings: i5, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i5) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i5) : i5;
}
var N = (t4, i5) => {
  const s4 = t4.length - 1, e6 = [];
  let n5, l3 = 2 === i5 ? "<svg>" : 3 === i5 ? "<math>" : "", c4 = v;
  for (let i6 = 0; i6 < s4; i6++) {
    const s5 = t4[i6];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t4[i6 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e6.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i6 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i5 ? "</svg>" : 3 === i5 ? "</math>" : "")), e6];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i5 }, e6) {
    let r5;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i5);
    if (this.el = _S.createElement(f3, e6), P.currentNode = this.el.content, 2 === i5 || 3 === i5) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r5 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r5.nodeType) {
        if (r5.hasAttributes()) for (const t5 of r5.getAttributeNames()) if (t5.endsWith(h2)) {
          const i6 = v2[a3++], s4 = r5.getAttribute(t5).split(o3), e7 = /([.?@])?(.*)/.exec(i6);
          d3.push({ type: 1, index: l3, name: e7[2], strings: s4, ctor: "." === e7[1] ? I : "?" === e7[1] ? L : "@" === e7[1] ? z : H }), r5.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r5.removeAttribute(t5));
        if (y2.test(r5.tagName)) {
          const t5 = r5.textContent.split(o3), i6 = t5.length - 1;
          if (i6 > 0) {
            r5.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i6; s4++) r5.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r5.append(t5[i6], c3());
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
  static createElement(t4, i5) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i5, s4 = t4, e6) {
  if (i5 === E) return i5;
  let h3 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o6 = a2(i5) ? void 0 : i5._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e6)), void 0 !== e6 ? (s4._$Co ?? (s4._$Co = []))[e6] = h3 : s4._$Cl = h3), void 0 !== h3 && (i5 = M(t4, h3._$AS(t4, i5.values), h3, e6)), i5;
}
var R = class {
  constructor(t4, i5) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i5;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i5 }, parts: s4 } = this._$AD, e6 = (t4?.creationScope ?? l2).importNode(i5, true);
    P.currentNode = e6;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r5 = s4[0];
    for (; void 0 !== r5; ) {
      if (o6 === r5.index) {
        let i6;
        2 === r5.type ? i6 = new k(h3, h3.nextSibling, this, t4) : 1 === r5.type ? i6 = new r5.ctor(h3, r5.name, r5.strings, this, t4) : 6 === r5.type && (i6 = new Z(h3, this, t4)), this._$AV.push(i6), r5 = s4[++n5];
      }
      o6 !== r5?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e6;
  }
  p(t4) {
    let i5 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i5), i5 += s4.strings.length - 2) : s4._$AI(t4[i5])), i5++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i5, s4, e6) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i5, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i5 = this._$AM;
    return void 0 !== i5 && 11 === t4?.nodeType && (t4 = i5.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i5 = this) {
    t4 = M(this, t4, i5), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
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
    const { values: i5, _$litType$: s4 } = t4, e6 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e6) this._$AH.p(i5);
    else {
      const t5 = new R(e6, this), s5 = t5.u(this.options);
      t5.p(i5), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i5 = C.get(t4.strings);
    return void 0 === i5 && C.set(t4.strings, i5 = new S2(t4)), i5;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i5 = this._$AH;
    let s4, e6 = 0;
    for (const h3 of t4) e6 === i5.length ? i5.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i5[e6], s4._$AI(h3), e6++;
    e6 < i5.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i5.length = e6);
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
  constructor(t4, i5, s4, e6, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i5, this._$AM = e6, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i5 = this, s4, e6) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = M(this, t4, i5, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
    else {
      const e7 = t4;
      let n5, r5;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r5 = M(this, e7[s4 + n5], i5, n5), r5 === E && (r5 = this._$AH[n5]), o6 || (o6 = !a2(r5) || r5 !== this._$AH[n5]), r5 === A ? t4 = A : t4 !== A && (t4 += (r5 ?? "") + h3[n5 + 1]), this._$AH[n5] = r5;
    }
    o6 && !e6 && this.j(t4);
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
  constructor(t4, i5, s4, e6, h3) {
    super(t4, i5, s4, e6, h3), this.type = 5;
  }
  _$AI(t4, i5 = this) {
    if ((t4 = M(this, t4, i5, 0) ?? A) === E) return;
    const s4 = this._$AH, e6 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e6);
    e6 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i5, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s4;
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
var D = (t4, i5, s4) => {
  const e6 = s4?.renderBefore ?? i5;
  let h3 = e6._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e6._$litPart$ = h3 = new k(i5.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
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

// src/popover/styles.ts
var styles_default = [
  hostReset,
  floatingPanel(".panel", { durationVar: "--uwc-popover-duration", durationDefault: "160ms" }),
  placementOrigins,
  i`
    :host { display: contents; }
    slot[name="trigger"] { display: contents; }

    /* ── Panel (visual) ─────────────────────────────────────────────────────── */
    .panel {
      background:    var(--uwc-popover-bg,        ${surface});
      border:        var(--uwc-popover-border,     1px solid ${border});
      border-radius: var(--uwc-popover-radius,     ${radiusLg});
      box-shadow:    var(--uwc-popover-shadow,     ${shadowLg});
      min-width:     var(--uwc-popover-min-width,  180px);
      z-index:       var(--uwc-popover-z,          ${zFloat});
      overflow:      hidden;
    }

    /* ── Arrow ──────────────────────────────────────────────────────────────── */
    .arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      background: var(--uwc-popover-bg,     ${surface});
      border:     var(--uwc-popover-border, 1px solid ${border});
      transform: rotate(45deg);
      border-radius: ${radiusXs};
      z-index: -1;
    }

    /* ── Header ─────────────────────────────────────────────────────────────── */
    .header {
      display: flex;
      align-items: center;
      gap: ${space2};
      padding: ${space3} ${space4};
      border-bottom: 1px solid var(--uwc-popover-separator-color, ${borderSubtle});
      background: var(--uwc-popover-header-bg, transparent);
    }
    .header-content { flex: 1; min-width: 0; }
    .header-text {
      font-size:   ${fontSizeSm};
      font-weight: ${fontWeightSemibold};
      color:       var(--uwc-popover-header-color, ${text});
    }

    /* ── Close button ───────────────────────────────────────────────────────── */
    .close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border: none;
      border-radius: var(--uwc-radius-sm, ${radiusSm});
      background: transparent;
      font-size: ${fontSizeXs};
      color: ${textMuted};
      cursor: pointer;
      flex-shrink: 0;
      transition: background ${durationFast}, color ${durationFast};
    }
    .close-btn:hover { background: var(--uwc-hover-bg, ${hoverBg}); color: ${text}; }

    /* ── Body & footer ──────────────────────────────────────────────────────── */
    .body { padding: 0; }
    .footer { padding: 10px ${space4}; border-top: 1px solid var(--uwc-popover-separator-color, ${borderSubtle}); }
  `
];

// node_modules/@lit/reactive-element/decorators/custom-element.js
var t3 = (t4) => (e6, o6) => {
  void 0 !== o6 ? o6.addInitializer(() => {
    customElements.define(t4, e6);
  }) : customElements.define(t4, e6);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t4 = o5, e6, r5) => {
  const { kind: n5, metadata: i5 } = r5;
  let s4 = globalThis.litPropertyMetadata.get(i5);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i5, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t4 = Object.create(t4)).wrapped = true), s4.set(r5.name, t4), "accessor" === n5) {
    const { name: o6 } = r5;
    return { set(r6) {
      const n6 = e6.get.call(this);
      e6.set.call(this, r6), this.requestUpdate(o6, n6, t4, true, r6);
    }, init(e7) {
      return void 0 !== e7 && this.C(o6, void 0, t4, e7), e7;
    } };
  }
  if ("setter" === n5) {
    const { name: o6 } = r5;
    return function(r6) {
      const n6 = this[o6];
      e6.call(this, r6), this.requestUpdate(o6, n6, t4, true, r6);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t4) {
  return (e6, o6) => "object" == typeof o6 ? r4(t4, e6, o6) : ((t5, e7, o7) => {
    const r5 = e7.hasOwnProperty(o7);
    return e7.constructor.createProperty(o7, t5), r5 ? Object.getOwnPropertyDescriptor(e7, o7) : void 0;
  })(t4, e6, o6);
}

// node_modules/@lit/reactive-element/decorators/base.js
var e4 = (e6, t4, c4) => (c4.configurable = true, c4.enumerable = true, Reflect.decorate && "object" != typeof t4 && Object.defineProperty(e6, t4, c4), c4);

// node_modules/@lit/reactive-element/decorators/query.js
function e5(e6, r5) {
  return (n5, s4, i5) => {
    const o6 = (t4) => t4.renderRoot?.querySelector(e6) ?? null;
    if (r5) {
      const { get: e7, set: r6 } = "object" == typeof s4 ? n5 : i5 ?? /* @__PURE__ */ (() => {
        const t4 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t4];
        }, set(e8) {
          this[t4] = e8;
        } };
      })();
      return e4(n5, s4, { get() {
        let t4 = e7.call(this);
        return void 0 === t4 && (t4 = o6(this), (null !== t4 || this.hasUpdated) && r6.call(this, t4)), t4;
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

// src/popover/index.ts
var UwcPopover = class extends i4 {
  constructor() {
    super(...arguments);
    this.placement = "bottom";
    this.offset = 8;
    this.showCloseButton = false;
    this.closeOnEscape = true;
    this.closeOnOutsideClick = true;
    this.arrow = false;
    this._ARROW_HALF = 6;
    this._pc = new PlacementController(this, {
      getPanelEl: () => this._panel,
      onTriggerFound: (el) => {
        const handler = (e6) => {
          e6.stopPropagation();
          this._pc.toggle();
        };
        el.addEventListener("click", handler);
        return () => el.removeEventListener("click", handler);
      },
      dismissOnOutsideClick: true,
      dismissOnEscape: true,
      afterShow: () => emit(this, "uwc-show"),
      afterHide: () => emit(this, "uwc-hide"),
      afterPosition: ({ triggerRect, panelCoords, panelEl }) => {
        if (this.arrow) this._positionArrow(triggerRect, panelCoords, panelEl);
      }
    });
    this._hasHeaderSlot = () => Array.from(this.children).some((c4) => c4.slot === "header");
    this._hasFooterSlot = () => Array.from(this.children).some((c4) => c4.slot === "footer");
  }
  firstUpdated() {
    this._pc.firstUpdated(
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  updated(changed) {
    super.updated(changed);
    this._pc.updated(
      changed,
      this.triggerId ?? null,
      this.shadowRoot.querySelector('slot[name="trigger"]')
    );
  }
  _positionArrow(tRect, coords, panelEl) {
    const arrow = this._arrow;
    if (!arrow) return;
    const [side] = this.placement.split("-");
    const pRect = panelEl.getBoundingClientRect();
    const AH = this._ARROW_HALF;
    const MIN = 12;
    arrow.style.cssText = "";
    if (side === "top" || side === "bottom") {
      const cx = tRect.left + tRect.width / 2;
      const max = pRect.width - AH * 2 - MIN;
      const al = Math.max(MIN, Math.min(cx - coords.left - AH, max));
      arrow.style.left = `${al}px`;
      arrow.style[side === "bottom" ? "top" : "bottom"] = `${-AH}px`;
    } else {
      const cy = tRect.top + tRect.height / 2;
      const max = pRect.height - AH * 2 - MIN;
      const at = Math.max(MIN, Math.min(cy - coords.top - AH, max));
      arrow.style.top = `${at}px`;
      arrow.style[side === "right" ? "left" : "right"] = `${-AH}px`;
    }
  }
  _handleClose(e6) {
    this._pc.hide();
    emit(this, "uwc-close", { originalEvent: e6 });
  }
  show() {
    this._pc.show();
  }
  hide() {
    this._pc.hide();
  }
  toggle() {
    this._pc.toggle();
  }
  get isOpen() {
    return this._pc.open;
  }
  render() {
    const isExternal = Boolean(this.triggerId);
    const open = this._pc.open;
    const showHeader = this.header || this._hasHeaderSlot() || this.showCloseButton;
    const showFooter = this._hasFooterSlot();
    return b2`
      ${!isExternal ? b2`<slot name="trigger" part="trigger"></slot>` : A}

      <div
        id="panel"
        part="panel"
        popover="manual"
        class="panel ${open ? "is-open" : ""}"
        data-placement=${this.placement}
      >
        ${this.arrow ? b2`<div id="arrow" part="arrow" class="arrow"></div>` : A}

        ${showHeader ? b2`
          <div part="header" class="header">
            <div class="header-content">
              ${this.header ? b2`<span class="header-text">${this.header}</span>` : b2`<slot name="header"></slot>`}
            </div>
            ${this.showCloseButton ? b2`
              <button
                part="close-btn"
                class="close-btn"
                aria-label="Close"
                @click=${this._handleClose}
              >✕</button>` : A}
          </div>` : A}

        <div part="body" class="body">
          <slot name="content"></slot>
          <slot></slot>
        </div>

        ${showFooter ? b2`
          <div part="footer" class="footer">
            <slot name="footer"></slot>
          </div>` : A}
      </div>`;
  }
};
UwcPopover.styles = [styles_default];
__decorateClass([
  n4({ type: String, attribute: "trigger-id" })
], UwcPopover.prototype, "triggerId", 2);
__decorateClass([
  n4({ type: String })
], UwcPopover.prototype, "placement", 2);
__decorateClass([
  n4({ type: Number })
], UwcPopover.prototype, "offset", 2);
__decorateClass([
  n4({ type: String })
], UwcPopover.prototype, "header", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "show-close-button" })
], UwcPopover.prototype, "showCloseButton", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "close-on-escape" })
], UwcPopover.prototype, "closeOnEscape", 2);
__decorateClass([
  n4({ type: Boolean, attribute: "close-on-outside-click" })
], UwcPopover.prototype, "closeOnOutsideClick", 2);
__decorateClass([
  n4({ type: Boolean, reflect: true })
], UwcPopover.prototype, "arrow", 2);
__decorateClass([
  e5("#panel")
], UwcPopover.prototype, "_panel", 2);
__decorateClass([
  e5("#arrow")
], UwcPopover.prototype, "_arrow", 2);
UwcPopover = __decorateClass([
  t3("uwc-popover")
], UwcPopover);

// src/popover/react.ts
var UwcPopoverReact = createComponent({
  tagName: "uwc-popover",
  elementClass: UwcPopover,
  react: React,
  events: {
    onUwcShow: "uwc-show",
    onUwcHide: "uwc-hide",
    onUwcClose: "uwc-close"
  }
});
export {
  UwcPopoverReact
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
