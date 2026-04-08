```html
 <form id="f" method="post" action="https://uwc-playground.vercel.app/" target="_blank"></form>
  <button type="submit" form="f">Open in Playground →</button>
```


```js
{
    "framework": "lit",
    "view": "columns",
    "lit_typescript": "import { LitElement, html } from 'lit';\nimport { customElement, state } from 'lit/decorators.js';\n\n@customElement('my-counter')\nexport class MyCounter extends LitElement {\n  @state() on = false;\n\n  render() {\n    return html`\n      <div class=\"wrap\">\n        <h2>Lit — Rajkeshwar Prasad</h2>\n        <button\n          class=${this.on ? 'on' : 'off'}\n          @click=${() => { this.on = !this.on; }}\n        >${this.on ? 'ON' : 'OFF'}</button>\n      </div>\n    `;\n  }\n}",
    "lit_scss": "\nbody {\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #f5f5f5;\n  font-family: sans-serif;\n}\n\n:host { display: block; }\n\nh2 {\n  color: #c84b2f;\n  margin: 0 0 20px;\n}\n\n.wrap {\n  text-align: center;\n  padding: 40px;\n}\n\nbutton {\n  padding: 14px 48px;\n  font-size: 1.4rem;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  border-radius: 10px;\n  color: #fff;\n  transition: background 0.2s;\n}\n\n.on  { background: #4ade80; }\n.off { background: #f87171; }",
    "react_typescript": "import React, { useState } from 'react';\n\nexport default function App() {\n  const [on, setOn] = useState(false);\n  return (\n    <div className=\"wrap\">\n      <h2>React — Rajkeshwar Prasad</h2>\n      <button className={on ? 'on' : 'off'} onClick={() => setOn(v => !v)}>\n        {on ? 'ON' : 'OFF'}\n      </button>\n    </div>\n  );\n}",
    "react_scss": "\nbody {\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #f5f5f5;\n  font-family: sans-serif;\n}\n\nh2 {\n  color: #61dafb;\n  margin: 0 0 20px;\n}\n\n.wrap {\n  text-align: center;\n  padding: 40px;\n}\n\nbutton {\n  padding: 14px 48px;\n  font-size: 1.4rem;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  border-radius: 10px;\n  color: #fff;\n  transition: background 0.2s;\n}\n\n.on  { background: #4ade80; }\n.off { background: #f87171; }",
    "vue_typescript": "export default {\n  data() { return { on: false }; },\n  template: `\n    <div class=\"wrap\">\n      <h2>Vue — Ranjan Das</h2>\n      <button :class=\"on ? 'on' : 'off'\" @click=\"on = !on\">\n        {{ on ? 'ON' : 'OFF' }}\n      </button>\n    </div>\n  `\n};",
    "vue_scss": "\nbody {\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #f5f5f5;\n  font-family: sans-serif;\n}\n\nh2 {\n  color: #42b883;\n  margin: 0 0 20px;\n}\n\n.wrap {\n  text-align: center;\n  padding: 40px;\n}\n\nbutton {\n  padding: 14px 48px;\n  font-size: 1.4rem;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  border-radius: 10px;\n  color: #fff;\n  transition: background 0.2s;\n}\n\n.on  { background: #4ade80; }\n.off { background: #f87171; }",
    "angular_typescript": "import { Component, signal } from '@angular/core';\n\n@Component({\n  selector: 'app-root',\n  standalone: true,\n  template: `\n    <div class=\"wrap\">\n      <h2>Angular — Rakesh Kumar Ray</h2>\n      <button [class]=\"on() ? 'on' : 'off'\" (click)=\"on.set(!on())\">\n        {{ on() ? 'ON' : 'OFF' }}\n      </button>\n    </div>\n  `\n})\nexport class AppComponent {\n  on = signal(false);\n}",
    "angular_scss": "\nbody {\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  background: #f5f5f5;\n  font-family: sans-serif;\n}\n\nh2 {\n  color: #dd0031;\n  margin: 0 0 20px;\n}\n\n.wrap {\n  text-align: center;\n  padding: 40px;\n}\n\nbutton {\n  padding: 14px 48px;\n  font-size: 1.4rem;\n  font-weight: 700;\n  cursor: pointer;\n  border: none;\n  border-radius: 10px;\n  color: #fff;\n  transition: background 0.2s;\n}\n\n.on  { background: #4ade80; }\n.off { background: #f87171; }"
}
```

```js
{
    "framework": "lit",
    "view": "columns",
    "lit_typescript": "[String: Lit Component Code]",
    "lit_scss": "[String: Lit Styles]",
    "react_typescript": "[String: React Component Code]",
    "react_scss": "[String: React Styles]",
    "vue_typescript": "[String: Vue Component Code]",
    "vue_scss": "[String: Vue Styles]",
    "angular_typescript": "[String: Angular Component Code]",
    "angular_scss": "[String: Angular Styles]"
}
```