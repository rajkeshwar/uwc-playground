import type { FrameworkId } from '../types.js';

export interface Snippet { ts: string; scss: string; }

export const SNIPPETS: Record<FrameworkId, Snippet> = {

  // ── Lit ──────────────────────────────────────────────────────────────────
  lit: {
    ts: `import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number }) count = 0;
  @property({ type: String }) label = 'Clicks';

  increment() { this.count += 1; }
  reset()     { this.count = 0; }

  render() {
    return html\`
      <div class="card">
        <h1 class="title">\${this.label}</h1>
        <p class="count">\${this.count}</p>
        <div class="controls">
          <uwc-button icon="plus-lg"  @click=\${this.increment} label="Increment"></uwc-button>
          <uwc-button icon="dash-lg"  outline @click=\${this.reset} label="Reset"></uwc-button>
        </div>
      </div>
    \`;
  }
}`,
    scss: `// Global styles (body, backgrounds)
$primary: #c84b2f;
$bg:      #fffdf7;
$border:  #ddd8cd;

body {
  margin: 0;
  background: #f5f0e8;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}

:host { display: block; }

.card {
  background: $bg;
  border: 1px solid $border;
  border-radius: 10px;
  padding: 2.5rem;
  min-width: 280px;
  text-align: center;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  transition: box-shadow 0.2s;
  &:hover { box-shadow: 5px 5px 0 $primary; }
}

.count {
  font-size: 5rem;
  font-weight: 700;
  color: $primary;
  margin: 0 0 1.5rem;
  line-height: 1;
}

.controls { display: flex; gap: 0.5rem; justify-content: center; }`,
  },

  // ── React ────────────────────────────────────────────────────────────────
  react: {
    ts: `import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<'light'|'dark'>('light');

  return (
    <div className={\`card \${theme}\`}>
      <uwc-button className="theme-toggle" onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? '🌙' : '☀️'}
      </uwc-button>
      <h1>Hello React!</h1>
      <p>TypeScript + hooks demo</p>
      <uwc-button icon="plus-lg" onClick={() => setCount(c => c + 1)}>
        Clicked {count} {count === 1 ? 'time' : 'times'}
      </uwc-button>
    </div>
  );
}`,
    scss: `$primary: #61dafb;
$dark-bg: #1a1a2e;

body {
  margin: 0;
  background: #f0f8ff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: sans-serif;
  transition: background 0.3s;
}

.card {
  padding: 2.5rem;
  text-align: center;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
  min-width: 280px;
  position: relative;
  transition: background 0.3s, color 0.3s;

  &.dark {
    background: $dark-bg;
    color: #e0e0e0;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }

  h1 { color: $primary; margin-bottom: 0.5rem; }

  .theme-toggle {
    position: absolute;
    top: 12px; right: 12px;
    background: none; border: none;
    font-size: 1.2rem; cursor: pointer;
  }

  .count-btn {
    margin-top: 1.5rem;
    background: $primary;
    border: none;
    padding: 10px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: transform 0.15s, filter 0.15s;
    &:hover { transform: scale(1.05); filter: brightness(1.1); }
  }
}`,
  },

  // ── Vue ──────────────────────────────────────────────────────────────────
  vue: {
    ts: `export default {
  template: \`
    <div class="demo-box">
      <h1>{{ title }}</h1>
      <p :class="{ highlight: count > 4 }">
        Count is: <strong>{{ count }}</strong>
        <span v-if="count > 4"> 🎉 Over 4!</span>
      </p>
      <div class="actions">
        <uwc-button icon="plus-lg" @click="increment" label="Increment"></uwc-button>
        <uwc-button icon="arrow-counterclockwise" @click="reset" outline label="Reset"></uwc-button>
      </div>
    </div>
  \`,
  data() {
    return {
      title: 'Hello Vue 3!',
      count: 0,
    };
  },
  methods: {
    increment() { this.count++; },
    reset()     { this.count = 0; },
  },
};`,
    scss: `$brand: #42b883;
$secondary: #35495e;

body {
  margin: 0;
  background: #f4faf7;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: sans-serif;
}

.demo-box {
  padding: 2.5rem;
  background: white;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  text-align: center;
  min-width: 280px;

  h1 { color: $secondary; margin-bottom: 1rem; }

  p {
    font-size: 1.2rem;
    color: #555;
    transition: color 0.2s;
    &.highlight { color: $brand; font-weight: bold; }
  }

  .actions {
    margin-top: 1.5rem;
    display: flex;
    gap: 0.75rem;
    justify-content: center;
  }

  button {
    padding: 8px 20px;
    border: none;
    border-radius: 7px;
    font-size: 0.9rem;
    cursor: pointer;
    font-weight: 600;
    background: $brand;
    color: white;
    transition: filter 0.15s;
    &:hover { filter: brightness(1.15); }
    &.secondary {
      background: #eee; color: #555;
      &:hover { background: #ddd; }
    }
  }
}`,
  },

  // ── Angular ──────────────────────────────────────────────────────────────
  angular: {
    ts: `import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  template: \`
    <div class="card">
      <h1>{{ title() }}</h1>
      <p class="subtitle">Angular 18 · Signals · Zoneless</p>
      <div class="counter-display">{{ count() }}</div>
      <p class="status">{{ statusMessage() }}</p>
      <div class="btn-row">
        <uwc-button icon="plus-lg" (click)="increment()" label="Increment"></uwc-button>
        <uwc-button icon="arrow-counterclockwise" outline (click)="reset()" label="Reset"></uwc-button>
      </div>
    </div>
  \`
})
export class AppComponent {
  title   = signal('Angular Signals');
  count   = signal(0);
  statusMessage = computed(() =>
    this.count() === 0
      ? 'Click to start counting'
      : \`You clicked \${this.count()} time\${this.count() !== 1 ? 's' : ''}!\`
  );

  increment() { this.count.update(c => c + 1); }
  reset()     { this.count.set(0); }
}`,
    scss: `$primary: #dd0031;
$accent:  #1976d2;

body {
  margin: 0;
  background: linear-gradient(135deg, #fff5f5 0%, #fce4ec 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.card {
  padding: 2.5rem;
  border-radius: 14px;
  box-shadow: 0 6px 30px rgba(0,0,0,0.12);
  background: white;
  text-align: center;
  min-width: 300px;

  h1 { color: $primary; font-size: 1.6rem; margin-bottom: 4px; }
  .subtitle { color: #aaa; font-size: 0.75rem; letter-spacing: 0.08em; margin-bottom: 1.5rem; }

  .counter-display {
    font-size: 5rem;
    font-weight: 700;
    color: $primary;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .status { color: #666; font-size: 0.85rem; margin-bottom: 1.5rem; min-height: 1.2em; }

  .btn-row { display: flex; gap: 0.75rem; justify-content: center; }

  button {
    padding: 10px 24px;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    background: $primary;
    color: white;
    transition: filter 0.15s, transform 0.1s;
    &:hover { filter: brightness(1.15); transform: translateY(-1px); }
    &:active { transform: translateY(0); }
    &.secondary { background: #eee; color: #555; }
  }
}`,
  },
};
