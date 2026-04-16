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

// node_modules/@lit/reactive-element/css-tag.js
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = /* @__PURE__ */ Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t6, e8, o8) {
    if (this._$cssResult$ = true, o8 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t6, this.t = e8;
  }
  get styleSheet() {
    let t6 = this.o;
    const s4 = this.t;
    if (e && void 0 === t6) {
      const e8 = void 0 !== s4 && 1 === s4.length;
      e8 && (t6 = o.get(s4)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e8 && o.set(s4, t6));
    }
    return t6;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t6) => new n("string" == typeof t6 ? t6 : t6 + "", void 0, s);
var i = (t6, ...e8) => {
  const o8 = 1 === t6.length ? t6[0] : e8.reduce((e9, s4, o9) => e9 + ((t7) => {
    if (true === t7._$cssResult$) return t7.cssText;
    if ("number" == typeof t7) return t7;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t6[o9 + 1], t6[0]);
  return new n(o8, t6, s);
};
var S = (s4, o8) => {
  if (e) s4.adoptedStyleSheets = o8.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet);
  else for (const e8 of o8) {
    const o9 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o9.setAttribute("nonce", n5), o9.textContent = e8.cssText, s4.appendChild(o9);
  }
};
var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
  let e8 = "";
  for (const s4 of t7.cssRules) e8 += s4.cssText;
  return r(e8);
})(t6) : t6;

// node_modules/@lit/reactive-element/reactive-element.js
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t6, s4) => t6;
var u = { toAttribute(t6, s4) {
  switch (s4) {
    case Boolean:
      t6 = t6 ? l : null;
      break;
    case Object:
    case Array:
      t6 = null == t6 ? t6 : JSON.stringify(t6);
  }
  return t6;
}, fromAttribute(t6, s4) {
  let i6 = t6;
  switch (s4) {
    case Boolean:
      i6 = null !== t6;
      break;
    case Number:
      i6 = null === t6 ? null : Number(t6);
      break;
    case Object:
    case Array:
      try {
        i6 = JSON.parse(t6);
      } catch (t7) {
        i6 = null;
      }
  }
  return i6;
} };
var f = (t6, s4) => !i2(t6, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ?? (Symbol.metadata = /* @__PURE__ */ Symbol("metadata")), a.litPropertyMetadata ?? (a.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(t6) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t6);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t6, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t6) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t6, s4), !s4.noAccessor) {
      const i6 = /* @__PURE__ */ Symbol(), h3 = this.getPropertyDescriptor(t6, i6, s4);
      void 0 !== h3 && e2(this.prototype, t6, h3);
    }
  }
  static getPropertyDescriptor(t6, s4, i6) {
    const { get: e8, set: r6 } = h(this.prototype, t6) ?? { get() {
      return this[s4];
    }, set(t7) {
      this[s4] = t7;
    } };
    return { get: e8, set(s5) {
      const h3 = e8?.call(this);
      r6?.call(this, s5), this.requestUpdate(t6, h3, i6);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t6) {
    return this.elementProperties.get(t6) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t6 = n2(this);
    t6.finalize(), void 0 !== t6.l && (this.l = [...t6.l]), this.elementProperties = new Map(t6.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t7 = this.properties, s4 = [...r2(t7), ...o2(t7)];
      for (const i6 of s4) this.createProperty(i6, t7[i6]);
    }
    const t6 = this[Symbol.metadata];
    if (null !== t6) {
      const s4 = litPropertyMetadata.get(t6);
      if (void 0 !== s4) for (const [t7, i6] of s4) this.elementProperties.set(t7, i6);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t7, s4] of this.elementProperties) {
      const i6 = this._$Eu(t7, s4);
      void 0 !== i6 && this._$Eh.set(i6, t7);
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
  static _$Eu(t6, s4) {
    const i6 = s4.attribute;
    return false === i6 ? void 0 : "string" == typeof i6 ? i6 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t6) => this.enableUpdating = t6), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t6) => t6(this));
  }
  addController(t6) {
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t6), void 0 !== this.renderRoot && this.isConnected && t6.hostConnected?.();
  }
  removeController(t6) {
    this._$EO?.delete(t6);
  }
  _$E_() {
    const t6 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i6 of s4.keys()) this.hasOwnProperty(i6) && (t6.set(i6, this[i6]), delete this[i6]);
    t6.size > 0 && (this._$Ep = t6);
  }
  createRenderRoot() {
    const t6 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t6, this.constructor.elementStyles), t6;
  }
  connectedCallback() {
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), this._$EO?.forEach((t6) => t6.hostConnected?.());
  }
  enableUpdating(t6) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t6) => t6.hostDisconnected?.());
  }
  attributeChangedCallback(t6, s4, i6) {
    this._$AK(t6, i6);
  }
  _$ET(t6, s4) {
    const i6 = this.constructor.elementProperties.get(t6), e8 = this.constructor._$Eu(t6, i6);
    if (void 0 !== e8 && true === i6.reflect) {
      const h3 = (void 0 !== i6.converter?.toAttribute ? i6.converter : u).toAttribute(s4, i6.type);
      this._$Em = t6, null == h3 ? this.removeAttribute(e8) : this.setAttribute(e8, h3), this._$Em = null;
    }
  }
  _$AK(t6, s4) {
    const i6 = this.constructor, e8 = i6._$Eh.get(t6);
    if (void 0 !== e8 && this._$Em !== e8) {
      const t7 = i6.getPropertyOptions(e8), h3 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== t7.converter?.fromAttribute ? t7.converter : u;
      this._$Em = e8;
      const r6 = h3.fromAttribute(s4, t7.type);
      this[e8] = r6 ?? this._$Ej?.get(e8) ?? r6, this._$Em = null;
    }
  }
  requestUpdate(t6, s4, i6, e8 = false, h3) {
    if (void 0 !== t6) {
      const r6 = this.constructor;
      if (false === e8 && (h3 = this[t6]), i6 ?? (i6 = r6.getPropertyOptions(t6)), !((i6.hasChanged ?? f)(h3, s4) || i6.useDefault && i6.reflect && h3 === this._$Ej?.get(t6) && !this.hasAttribute(r6._$Eu(t6, i6)))) return;
      this.C(t6, s4, i6);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t6, s4, { useDefault: i6, reflect: e8, wrapped: h3 }, r6) {
    i6 && !(this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Map())).has(t6) && (this._$Ej.set(t6, r6 ?? s4 ?? this[t6]), true !== h3 || void 0 !== r6) || (this._$AL.has(t6) || (this.hasUpdated || i6 || (s4 = void 0), this._$AL.set(t6, s4)), true === e8 && this._$Em !== t6 && (this._$Eq ?? (this._$Eq = /* @__PURE__ */ new Set())).add(t6));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t7) {
      Promise.reject(t7);
    }
    const t6 = this.scheduleUpdate();
    return null != t6 && await t6, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [t8, s5] of this._$Ep) this[t8] = s5;
        this._$Ep = void 0;
      }
      const t7 = this.constructor.elementProperties;
      if (t7.size > 0) for (const [s5, i6] of t7) {
        const { wrapped: t8 } = i6, e8 = this[s5];
        true !== t8 || this._$AL.has(s5) || void 0 === e8 || this.C(s5, void 0, i6, e8);
      }
    }
    let t6 = false;
    const s4 = this._$AL;
    try {
      t6 = this.shouldUpdate(s4), t6 ? (this.willUpdate(s4), this._$EO?.forEach((t7) => t7.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t6 = false, this._$EM(), s5;
    }
    t6 && this._$AE(s4);
  }
  willUpdate(t6) {
  }
  _$AE(t6) {
    this._$EO?.forEach((t7) => t7.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
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
  shouldUpdate(t6) {
    return true;
  }
  update(t6) {
    this._$Eq && (this._$Eq = this._$Eq.forEach((t7) => this._$ET(t7, this[t7]))), this._$EM();
  }
  updated(t6) {
  }
  firstUpdated(t6) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ?? (a.reactiveElementVersions = [])).push("2.1.2");

// node_modules/lit-html/lit-html.js
var t2 = globalThis;
var i3 = (t6) => t6;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
var u2 = Array.isArray;
var d2 = (t6) => u2(t6) || "function" == typeof t6?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t6) => (i6, ...s4) => ({ _$litType$: t6, strings: i6, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t6, i6) {
  if (!u2(t6) || !t6.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i6) : i6;
}
var N = (t6, i6) => {
  const s4 = t6.length - 1, e8 = [];
  let n5, l3 = 2 === i6 ? "<svg>" : 3 === i6 ? "<math>" : "", c4 = v;
  for (let i7 = 0; i7 < s4; i7++) {
    const s5 = t6[i7];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t6[i7 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e8.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i7 : x2);
  }
  return [V(t6, l3 + (t6[s4] || "<?>") + (2 === i6 ? "</svg>" : 3 === i6 ? "</math>" : "")), e8];
};
var S2 = class _S {
  constructor({ strings: t6, _$litType$: i6 }, e8) {
    let r6;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t6.length - 1, d3 = this.parts, [f3, v2] = N(t6, i6);
    if (this.el = _S.createElement(f3, e8), P.currentNode = this.el.content, 2 === i6 || 3 === i6) {
      const t7 = this.el.content.firstChild;
      t7.replaceWith(...t7.childNodes);
    }
    for (; null !== (r6 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r6.nodeType) {
        if (r6.hasAttributes()) for (const t7 of r6.getAttributeNames()) if (t7.endsWith(h2)) {
          const i7 = v2[a3++], s4 = r6.getAttribute(t7).split(o3), e9 = /([.?@])?(.*)/.exec(i7);
          d3.push({ type: 1, index: l3, name: e9[2], strings: s4, ctor: "." === e9[1] ? I : "?" === e9[1] ? L : "@" === e9[1] ? z : H }), r6.removeAttribute(t7);
        } else t7.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r6.removeAttribute(t7));
        if (y2.test(r6.tagName)) {
          const t7 = r6.textContent.split(o3), i7 = t7.length - 1;
          if (i7 > 0) {
            r6.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i7; s4++) r6.append(t7[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r6.append(t7[i7], c3());
          }
        }
      } else if (8 === r6.nodeType) if (r6.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t7 = -1;
        for (; -1 !== (t7 = r6.data.indexOf(o3, t7 + 1)); ) d3.push({ type: 7, index: l3 }), t7 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t6, i6) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t6, s4;
  }
};
function M(t6, i6, s4 = t6, e8) {
  if (i6 === E) return i6;
  let h3 = void 0 !== e8 ? s4._$Co?.[e8] : s4._$Cl;
  const o8 = a2(i6) ? void 0 : i6._$litDirective$;
  return h3?.constructor !== o8 && (h3?._$AO?.(false), void 0 === o8 ? h3 = void 0 : (h3 = new o8(t6), h3._$AT(t6, s4, e8)), void 0 !== e8 ? (s4._$Co ?? (s4._$Co = []))[e8] = h3 : s4._$Cl = h3), void 0 !== h3 && (i6 = M(t6, h3._$AS(t6, i6.values), h3, e8)), i6;
}
var R = class {
  constructor(t6, i6) {
    this._$AV = [], this._$AN = void 0, this._$AD = t6, this._$AM = i6;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t6) {
    const { el: { content: i6 }, parts: s4 } = this._$AD, e8 = (t6?.creationScope ?? l2).importNode(i6, true);
    P.currentNode = e8;
    let h3 = P.nextNode(), o8 = 0, n5 = 0, r6 = s4[0];
    for (; void 0 !== r6; ) {
      if (o8 === r6.index) {
        let i7;
        2 === r6.type ? i7 = new k(h3, h3.nextSibling, this, t6) : 1 === r6.type ? i7 = new r6.ctor(h3, r6.name, r6.strings, this, t6) : 6 === r6.type && (i7 = new Z(h3, this, t6)), this._$AV.push(i7), r6 = s4[++n5];
      }
      o8 !== r6?.index && (h3 = P.nextNode(), o8++);
    }
    return P.currentNode = l2, e8;
  }
  p(t6) {
    let i6 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t6, s4, i6), i6 += s4.strings.length - 2) : s4._$AI(t6[i6])), i6++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t6, i6, s4, e8) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t6, this._$AB = i6, this._$AM = s4, this.options = e8, this._$Cv = e8?.isConnected ?? true;
  }
  get parentNode() {
    let t6 = this._$AA.parentNode;
    const i6 = this._$AM;
    return void 0 !== i6 && 11 === t6?.nodeType && (t6 = i6.parentNode), t6;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t6, i6 = this) {
    t6 = M(this, t6, i6), a2(t6) ? t6 === A || null == t6 || "" === t6 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t6 !== this._$AH && t6 !== E && this._(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : d2(t6) ? this.k(t6) : this._(t6);
  }
  O(t6) {
    return this._$AA.parentNode.insertBefore(t6, this._$AB);
  }
  T(t6) {
    this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
  }
  _(t6) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(l2.createTextNode(t6)), this._$AH = t6;
  }
  $(t6) {
    const { values: i6, _$litType$: s4 } = t6, e8 = "number" == typeof s4 ? this._$AC(t6) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e8) this._$AH.p(i6);
    else {
      const t7 = new R(e8, this), s5 = t7.u(this.options);
      t7.p(i6), this.T(s5), this._$AH = t7;
    }
  }
  _$AC(t6) {
    let i6 = C.get(t6.strings);
    return void 0 === i6 && C.set(t6.strings, i6 = new S2(t6)), i6;
  }
  k(t6) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i6 = this._$AH;
    let s4, e8 = 0;
    for (const h3 of t6) e8 === i6.length ? i6.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i6[e8], s4._$AI(h3), e8++;
    e8 < i6.length && (this._$AR(s4 && s4._$AB.nextSibling, e8), i6.length = e8);
  }
  _$AR(t6 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t6 !== this._$AB; ) {
      const s5 = i3(t6).nextSibling;
      i3(t6).remove(), t6 = s5;
    }
  }
  setConnected(t6) {
    void 0 === this._$AM && (this._$Cv = t6, this._$AP?.(t6));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t6, i6, s4, e8, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t6, this.name = i6, this._$AM = e8, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t6, i6 = this, s4, e8) {
    const h3 = this.strings;
    let o8 = false;
    if (void 0 === h3) t6 = M(this, t6, i6, 0), o8 = !a2(t6) || t6 !== this._$AH && t6 !== E, o8 && (this._$AH = t6);
    else {
      const e9 = t6;
      let n5, r6;
      for (t6 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r6 = M(this, e9[s4 + n5], i6, n5), r6 === E && (r6 = this._$AH[n5]), o8 || (o8 = !a2(r6) || r6 !== this._$AH[n5]), r6 === A ? t6 = A : t6 !== A && (t6 += (r6 ?? "") + h3[n5 + 1]), this._$AH[n5] = r6;
    }
    o8 && !e8 && this.j(t6);
  }
  j(t6) {
    t6 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t6 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t6) {
    this.element[this.name] = t6 === A ? void 0 : t6;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t6) {
    this.element.toggleAttribute(this.name, !!t6 && t6 !== A);
  }
};
var z = class extends H {
  constructor(t6, i6, s4, e8, h3) {
    super(t6, i6, s4, e8, h3), this.type = 5;
  }
  _$AI(t6, i6 = this) {
    if ((t6 = M(this, t6, i6, 0) ?? A) === E) return;
    const s4 = this._$AH, e8 = t6 === A && s4 !== A || t6.capture !== s4.capture || t6.once !== s4.once || t6.passive !== s4.passive, h3 = t6 !== A && (s4 === A || e8);
    e8 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
  }
  handleEvent(t6) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t6) : this._$AH.handleEvent(t6);
  }
};
var Z = class {
  constructor(t6, i6, s4) {
    this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i6, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t6) {
    M(this, t6);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ?? (t2.litHtmlVersions = [])).push("3.3.2");
var D = (t6, i6, s4) => {
  const e8 = s4?.renderBefore ?? i6;
  let h3 = e8._$litPart$;
  if (void 0 === h3) {
    const t7 = s4?.renderBefore ?? null;
    e8._$litPart$ = h3 = new k(i6.insertBefore(c3(), t7), t7, void 0, s4 ?? {});
  }
  return h3._$AI(t6), h3;
};

// node_modules/lit-element/lit-element.js
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var _a;
    const t6 = super.createRenderRoot();
    return (_a = this.renderOptions).renderBefore ?? (_a.renderBefore = t6.firstChild), t6;
  }
  update(t6) {
    const r6 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = D(r6, this.renderRoot, this.renderOptions);
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
var t3 = (t6) => (e8, o8) => {
  void 0 !== o8 ? o8.addInitializer(() => {
    customElements.define(t6, e8);
  }) : customElements.define(t6, e8);
};

// node_modules/@lit/reactive-element/decorators/property.js
var o5 = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
var r4 = (t6 = o5, e8, r6) => {
  const { kind: n5, metadata: i6 } = r6;
  let s4 = globalThis.litPropertyMetadata.get(i6);
  if (void 0 === s4 && globalThis.litPropertyMetadata.set(i6, s4 = /* @__PURE__ */ new Map()), "setter" === n5 && ((t6 = Object.create(t6)).wrapped = true), s4.set(r6.name, t6), "accessor" === n5) {
    const { name: o8 } = r6;
    return { set(r7) {
      const n6 = e8.get.call(this);
      e8.set.call(this, r7), this.requestUpdate(o8, n6, t6, true, r7);
    }, init(e9) {
      return void 0 !== e9 && this.C(o8, void 0, t6, e9), e9;
    } };
  }
  if ("setter" === n5) {
    const { name: o8 } = r6;
    return function(r7) {
      const n6 = this[o8];
      e8.call(this, r7), this.requestUpdate(o8, n6, t6, true, r7);
    };
  }
  throw Error("Unsupported decorator location: " + n5);
};
function n4(t6) {
  return (e8, o8) => "object" == typeof o8 ? r4(t6, e8, o8) : ((t7, e9, o9) => {
    const r6 = e9.hasOwnProperty(o9);
    return e9.constructor.createProperty(o9, t7), r6 ? Object.getOwnPropertyDescriptor(e9, o9) : void 0;
  })(t6, e8, o8);
}

// node_modules/@lit/reactive-element/decorators/state.js
function r5(r6) {
  return n4({ ...r6, state: true, attribute: false });
}

// node_modules/lit-html/directive.js
var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e5 = (t6) => (...e8) => ({ _$litDirective$: t6, values: e8 });
var i5 = class {
  constructor(t6) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t6, e8, i6) {
    this._$Ct = t6, this._$AM = e8, this._$Ci = i6;
  }
  _$AS(t6, e8) {
    return this.update(t6, e8);
  }
  update(t6, e8) {
    return this.render(...e8);
  }
};

// node_modules/lit-html/directives/class-map.js
var e6 = e5(class extends i5 {
  constructor(t6) {
    if (super(t6), t6.type !== t4.ATTRIBUTE || "class" !== t6.name || t6.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t6) {
    return " " + Object.keys(t6).filter((s4) => t6[s4]).join(" ") + " ";
  }
  update(s4, [i6]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t6) => "" !== t6)));
      for (const t6 in i6) i6[t6] && !this.nt?.has(t6) && this.st.add(t6);
      return this.render(i6);
    }
    const r6 = s4.element.classList;
    for (const t6 of this.st) t6 in i6 || (r6.remove(t6), this.st.delete(t6));
    for (const t6 in i6) {
      const s5 = !!i6[t6];
      s5 === this.st.has(t6) || this.nt?.has(t6) || (s5 ? (r6.add(t6), this.st.add(t6)) : (r6.remove(t6), this.st.delete(t6)));
    }
    return E;
  }
});

// node_modules/lit-html/directives/unsafe-html.js
var e7 = class extends i5 {
  constructor(i6) {
    if (super(i6), this.it = A, i6.type !== t4.CHILD) throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r6) {
    if (r6 === A || null == r6) return this._t = void 0, this.it = r6;
    if (r6 === E) return r6;
    if ("string" != typeof r6) throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r6 === this.it) return this._t;
    this.it = r6;
    const s4 = [r6];
    return s4.raw = s4, this._t = { _$litType$: this.constructor.resultType, strings: s4, values: [] };
  }
};
e7.directiveName = "unsafeHTML", e7.resultType = 1;
var o6 = e5(e7);

// node_modules/lit-html/directives/unsafe-svg.js
var t5 = class extends e7 {
};
t5.directiveName = "unsafeSVG", t5.resultType = 2;
var o7 = e5(t5);

// src/icon-browser/index.ts
var CDN = "https://cdn.jsdelivr.net/npm/@iconify-json";
var BUNDLE_URLS = {
  bootstrap: `${CDN}/bi/icons.json`,
  mdi: `${CDN}/mdi/icons.json`,
  "fa-solid": `${CDN}/fa-solid/icons.json`,
  "fa-regular": `${CDN}/fa-regular/icons.json`,
  "fa-brands": `${CDN}/fa-brands/icons.json`
};
var PROVIDERS = [
  { id: "bootstrap", label: "Bootstrap" },
  { id: "mdi", label: "Material Icons" },
  { id: "fontawesome", label: "Font Awesome" }
];
function _wrapSvg(body, w2, h3) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w2} ${h3}">${body}</svg>`;
}
function _parseBundle(data, style) {
  const dw = data.width ?? 24;
  const dh = data.height ?? 24;
  const map = /* @__PURE__ */ new Map();
  for (const [name, icon] of Object.entries(data.icons)) {
    map.set(name, _wrapSvg(icon.body, icon.width ?? dw, icon.height ?? dh));
  }
  if (data.aliases) {
    for (const [alias, meta] of Object.entries(data.aliases)) {
      const parent = map.get(meta.parent);
      if (parent) map.set(alias, parent);
    }
  }
  const result = [];
  for (const [name, svg] of map) {
    result.push({ name, svg, style });
  }
  return result;
}
function _iconTag(provider, icon) {
  if (provider === "bootstrap") {
    return `<uwc-icon name="${icon.name}"></uwc-icon>`;
  }
  if (provider === "mdi") {
    return `<uwc-icon name="${icon.name}" library="mdi"></uwc-icon>`;
  }
  return `<uwc-icon name="${icon.name}" library="fontawesome-${icon.style}"></uwc-icon>`;
}
var IconBrowserDemo = class extends i4 {
  constructor() {
    super(...arguments);
    this._provider = "bootstrap";
    this._search = "";
    this._variant = "all";
    this._icons = [];
    this._loading = false;
    this._err = "";
    this._tip = null;
    this._copied = false;
    /** Per-provider cache — avoids re-fetching when switching tabs. */
    this._cache = /* @__PURE__ */ new Map();
  }
  // ── Lifecycle ───────────────────────────────────────────────────────────────
  async connectedCallback() {
    super.connectedCallback();
    await this._load("bootstrap");
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._copyTimer);
  }
  // ── Data loading ────────────────────────────────────────────────────────────
  async _load(provider) {
    if (this._cache.has(provider)) {
      this._icons = this._cache.get(provider);
      return;
    }
    this._loading = true;
    this._err = "";
    try {
      const icons = await this._fetchProvider(provider);
      this._cache.set(provider, icons);
      this._icons = icons;
    } catch {
      this._err = `Failed to load ${PROVIDERS.find((p3) => p3.id === provider)?.label} icons. Check your network.`;
    } finally {
      this._loading = false;
    }
  }
  async _fetchBundle(url) {
    const r6 = await fetch(url);
    if (!r6.ok) throw new Error(`HTTP ${r6.status}`);
    return r6.json();
  }
  async _fetchProvider(provider) {
    switch (provider) {
      case "bootstrap": {
        const data = await this._fetchBundle(BUNDLE_URLS.bootstrap);
        console.log("Bootstrap Icons bundle loaded:", data);
        return _parseBundle(data).sort((a3, b3) => a3.name.localeCompare(b3.name));
      }
      case "mdi": {
        const data = await this._fetchBundle(BUNDLE_URLS.mdi);
        return _parseBundle(data).sort((a3, b3) => a3.name.localeCompare(b3.name));
      }
      case "fontawesome": {
        const [solid, regular, brands] = await Promise.all([
          this._fetchBundle(BUNDLE_URLS["fa-solid"]),
          this._fetchBundle(BUNDLE_URLS["fa-regular"]),
          this._fetchBundle(BUNDLE_URLS["fa-brands"])
        ]);
        const icons = [
          ..._parseBundle(solid, "solid"),
          ..._parseBundle(regular, "regular"),
          ..._parseBundle(brands, "brands")
        ];
        return icons.sort(
          (a3, b3) => a3.name.localeCompare(b3.name) || (a3.style ?? "").localeCompare(b3.style ?? "")
        );
      }
    }
  }
  // ── Filtering ───────────────────────────────────────────────────────────────
  get _filtered() {
    const q = this._search.toLowerCase().trim();
    return this._icons.filter((icon) => {
      if (q && !icon.name.includes(q)) return false;
      if (this._variant !== "all") {
        switch (this._provider) {
          case "bootstrap":
            if (this._variant === "filled") return icon.name.endsWith("-fill");
            if (this._variant === "outlined") return !icon.name.endsWith("-fill");
            break;
          case "mdi":
            if (this._variant === "filled") return !icon.name.endsWith("-outline");
            if (this._variant === "outlined") return icon.name.endsWith("-outline");
            break;
          case "fontawesome":
            if (this._variant === "filled") return icon.style === "solid";
            if (this._variant === "outlined") return icon.style === "regular";
            break;
        }
      }
      return true;
    });
  }
  // ── Interactions ────────────────────────────────────────────────────────────
  _setProvider(p3) {
    if (p3 === this._provider) return;
    this._provider = p3;
    this._search = "";
    this._variant = "all";
    this._tip = null;
    this._icons = this._cache.get(p3) ?? [];
    this._load(p3);
  }
  _onEnter(e8, icon) {
    const elRect = e8.currentTarget.getBoundingClientRect();
    const hostRect = this.getBoundingClientRect();
    this._tip = {
      icon,
      x: elRect.left - hostRect.left + elRect.width / 2,
      y: elRect.top - hostRect.top
    };
  }
  _onLeave() {
    this._tip = null;
  }
  async _copy(icon) {
    const tag = _iconTag(this._provider, icon);
    try {
      await navigator.clipboard.writeText(tag);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = tag;
      ta.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    this._copied = true;
    clearTimeout(this._copyTimer);
    this._copyTimer = setTimeout(() => {
      this._copied = false;
    }, 1800);
  }
  // ── Render helpers ──────────────────────────────────────────────────────────
  _variantOptions() {
    if (this._provider === "fontawesome") {
      return b2`
        <option value="all">All styles</option>
        <option value="filled">Solid</option>
        <option value="outlined">Regular</option>
      `;
    }
    return b2`
      <option value="all">All icons</option>
      <option value="outlined">Outlined</option>
      <option value="filled">Filled</option>
    `;
  }
  // ── Render ──────────────────────────────────────────────────────────────────
  render() {
    const filtered = this._filtered;
    return b2`
      <!-- ── Provider tabs ────────────────────────────────────────────── -->
      <div class="tabs" role="tablist">
        ${PROVIDERS.map(({ id, label }) => b2`
          <button
            class=${e6({ tab: true, active: this._provider === id })}
            role="tab"
            aria-selected=${this._provider === id ? "true" : "false"}
            @click=${() => this._setProvider(id)}
          >${label}</button>
        `)}
      </div>

      <!-- ── Toolbar ──────────────────────────────────────────────────── -->
      <div class="toolbar">
        <div class="sw">
          <span class="si">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search icons…"
            .value=${this._search}
            @input=${(e8) => {
      this._search = e8.target.value;
      this._tip = null;
    }}
          />
        </div>
        <select
          @change=${(e8) => {
      this._variant = e8.target.value;
      this._tip = null;
    }}
        >${this._variantOptions()}</select>
      </div>

      <!-- ── Count ────────────────────────────────────────────────────── -->
      ${!this._loading ? b2`
        <p class="count">
          ${filtered.length.toLocaleString()} icon${filtered.length !== 1 ? "s" : ""}
        </p>
      ` : A}

      <!-- ── Icon grid ────────────────────────────────────────────────── -->
      <div class="wrap" @scroll=${() => {
      this._tip = null;
    }}>
        ${this._loading ? b2`
          <div class="state">
            <div class="spinner-ring" role="status" aria-label="Loading icons"></div>
            <span>Loading icons…</span>
          </div>
        ` : this._err ? b2`
          <div class="state err">${this._err}</div>
        ` : filtered.length === 0 ? b2`
          <div class="state">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            <span>No icons match &ldquo;${this._search}&rdquo;</span>
          </div>
        ` : b2`
          <div class="grid">
            ${filtered.map((icon) => b2`
              <button
                class="ic"
                tabindex="-1"
                @mouseenter=${(e8) => this._onEnter(e8, icon)}
                @mouseleave=${this._onLeave}
                @click=${() => this._copy(icon)}
              >
                <span class="ic-svg">${o7(icon.svg)}</span>
              </button>
            `)}
          </div>
        `}
      </div>

      <!-- ── Floating tooltip (outside .wrap — never clipped by overflow) ─ -->
      ${this._tip ? b2`
        <div
          class="tooltip"
          style="left:${this._tip.x}px;top:${this._tip.y}px"
          aria-hidden="true"
        >
          <span class="tip-name">
            ${this._tip.icon.name}${this._tip.icon.style ? b2` <span class="tip-variant">(${this._tip.icon.style})</span>` : A}
          </span>
          <span class="tip-tag">${_iconTag(this._provider, this._tip.icon)}</span>
          <span class=${e6({ "tip-action": true, copied: this._copied })}>
            ${this._copied ? "\u2713 Copied!" : "Click to copy tag"}
          </span>
        </div>
      ` : A}
    `;
  }
};
IconBrowserDemo.styles = i`
    :host {
      display: block;
      font-size: .875rem;
      font-family: inherit;
      position: relative; /* anchor for the JS-positioned tooltip */
    }

    /* ── Provider tabs ──────────────────────────────────────────────────── */
    .tabs {
      display: flex;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 1rem;
    }
    .tab {
      padding: .5rem 1.125rem;
      border: none;
      background: none;
      cursor: pointer;
      font-size: .875rem;
      color: #64748b;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      font-family: inherit;
      line-height: 1.5;
      white-space: nowrap;
      transition: color 120ms, border-color 120ms;
    }
    .tab:hover { color: #1e293b; }
    .tab.active {
      color: #6366f1;
      border-bottom-color: #6366f1;
      font-weight: 600;
    }

    /* ── Toolbar ────────────────────────────────────────────────────────── */
    .toolbar {
      display: flex;
      gap: .75rem;
      margin-bottom: .5rem;
      align-items: center;
    }
    .sw {
      flex: 1;
      position: relative;
      display: flex;
      align-items: center;
    }
    .si {
      position: absolute;
      left: .75rem;
      color: #94a3b8;
      pointer-events: none;
      display: flex;
      align-items: center;
    }
    input[type=search] {
      width: 100%;
      box-sizing: border-box;
      padding: .5rem .75rem .5rem 2.25rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: .875rem;
      outline: none;
      transition: border-color 120ms;
      font-family: inherit;
      background: #fff;
      -webkit-appearance: none;
    }
    input[type=search]:focus { border-color: #6366f1; }
    select {
      padding: .5rem .625rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: .875rem;
      background: #fff;
      cursor: pointer;
      min-width: 130px;
      font-family: inherit;
      outline: none;
      line-height: 1.4;
    }
    select:focus { border-color: #6366f1; }

    /* ── Icon count ─────────────────────────────────────────────────────── */
    .count { font-size: .75rem; color: #94a3b8; margin: 0 0 .5rem; }

    /* ── Scrollable grid container ──────────────────────────────────────── */
    .wrap {
      max-height: 60vh;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      scrollbar-width: thin;
      scrollbar-color: #cbd5e1 transparent;
    }
    .wrap::-webkit-scrollbar       { width: 6px; }
    .wrap::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }

    /* ── Grid ────────────────────────────────────────────────────────────── */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(52px, 1fr));
      gap: .25rem;
    }

    /* ── Icon cell — fixed 52×52 square, icon centred inside ────────────── */
    .ic {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 120ms;
      border: none;
      background: none;
      font-family: inherit;
      color: #374151;
      padding: 0;
    }
    .ic:hover { background: #f1f5f9; }

    /* Inline SVG — use display:contents so the SVG is a direct flex child
       of .ic, then size it explicitly. line-height:0 kills any inline gap. */
    .ic-svg {
      display: contents;
      line-height: 0;
    }
    .ic-svg svg {
      display: block;
      width: 28px;
      height: 28px;
      fill: currentColor;
      flex-shrink: 0;
      overflow: visible;
    }

    /* ── Loading / empty / error states ─────────────────────────────────── */
    .state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
      gap: .625rem;
      color: #94a3b8;
      font-size: .875rem;
      text-align: center;
    }
    .state.err { color: #ef4444; }

    /* Spinner ring for loading state (CSS-only, no uwc-icon dependency) */
    .spinner-ring {
      width: 28px;
      height: 28px;
      border: 3px solid #e2e8f0;
      border-top-color: #6366f1;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* ── Floating tooltip ─────────────────────────────────────────────────
       Sibling to .wrap — never clipped by the overflow-y container.
       Positioned via JS (getBoundingClientRect) relative to :host.
    ──────────────────────────────────────────────────────────────────────── */
    .tooltip {
      position: absolute;
      z-index: 100;
      background: #1e293b;
      color: #f8fafc;
      border-radius: 6px;
      padding: .5rem .75rem;
      font-size: .75rem;
      pointer-events: none;
      transform: translateX(-50%) translateY(calc(-100% - 10px));
      display: flex;
      flex-direction: column;
      gap: .2rem;
      max-width: 300px;
      box-shadow: 0 4px 16px rgba(0,0,0,.25);
      white-space: nowrap;
    }
    .tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 5px solid transparent;
      border-top-color: #1e293b;
    }
    .tip-name  { font-weight: 600; font-size: .8125rem; }
    .tip-variant { font-size: .6875rem; color: #a5b4fc; text-transform: capitalize; }
    .tip-tag   {
      font-size: .6875rem;
      color: #94a3b8;
      font-family: ui-monospace, 'Cascadia Code', 'Fira Code', monospace;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 280px;
    }
    .tip-action         { font-size: .6875rem; color: #64748b; }
    .tip-action.copied  { color: #4ade80; }

    @media (prefers-reduced-motion: reduce) {
      .tab, input[type=search], select, .ic, .spinner-ring { transition: none; animation: none; }
    }
  `;
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_provider", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_search", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_variant", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_icons", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_loading", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_err", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_tip", 2);
__decorateClass([
  r5()
], IconBrowserDemo.prototype, "_copied", 2);
IconBrowserDemo = __decorateClass([
  t3("icon-browser-demo")
], IconBrowserDemo);
export {
  IconBrowserDemo
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
lit-html/directives/unsafe-html.js:
lit-html/directives/unsafe-svg.js:
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
//# sourceMappingURL=icon-browser.js.map
