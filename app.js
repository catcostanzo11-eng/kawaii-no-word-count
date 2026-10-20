(() => {
  'use strict';

  const MAX_GOAL = 99000;
  const STORAGE_KEY = 'kawaii-word-count-v1';

  // ---------- themes ----------
  // Each theme has a light and dark palette. Keys map to CSS vars (onAccent -> --on-accent).
  const THEMES = {
    kawaii: {
      name: 'Kawaii', mascot: '🐰', tagline: 'one cozy word at a time',
      deco: ['🌸', '✨', '💖', '🎀', '🍡'],
      display: "'Fredoka'", body: "'Nunito'",
      light: { bg: '#fff0f6', bg2: '#ffe1ef', card: '#ffffff', text: '#5a3a4a', muted: '#9c7487', accent: '#f0609e', accent2: '#a78bfa', border: '#ffc8de', onAccent: '#ffffff' },
      dark:  { bg: '#241a25', bg2: '#36233a', card: '#33263a', text: '#ffe6f2', muted: '#c9a3b8', accent: '#ff8cc0', accent2: '#c4b0ff', border: '#563b52', onAccent: '#2a1020' },
    },
    darkAcademia: {
      name: 'Dark Academia', mascot: '🦉', tagline: 'ink, candlelight & old libraries',
      deco: ['📜', '🕯️', '🍂', '🖋️', '📚'],
      display: "'EB Garamond'", body: "'EB Garamond'",
      light: { bg: '#f3ead9', bg2: '#e2cfae', card: '#fbf6ec', text: '#3b2a1e', muted: '#7a6450', accent: '#7b3f2a', accent2: '#56643f', border: '#d4c0a0', onAccent: '#fbf6ec' },
      dark:  { bg: '#1a1410', bg2: '#2a2019', card: '#2a211b', text: '#eadbc3', muted: '#a8927a', accent: '#c99263', accent2: '#9aa572', border: '#4a3a2e', onAccent: '#1a1410' },
    },
    matcha: {
      name: 'Matcha', mascot: '🐸', tagline: 'whisked, warm & unhurried',
      deco: ['🍵', '🌿', '🍡', '🍃', '🌱'],
      display: "'Fredoka'", body: "'Nunito'",
      light: { bg: '#f1f6ea', bg2: '#dcebc9', card: '#fffffa', text: '#33452a', muted: '#6a7f5b', accent: '#5f8f42', accent2: '#c39a6b', border: '#cfe0bd', onAccent: '#ffffff' },
      dark:  { bg: '#161f17', bg2: '#213024', card: '#243326', text: '#e4f0da', muted: '#9fb592', accent: '#9cc77a', accent2: '#d9b48a', border: '#3a5040', onAccent: '#14200f' },
    },
    frutigerAero: {
      name: 'Frutiger Aero', mascot: '🐬', tagline: 'glossy skies & bubbly optimism',
      deco: ['🫧', '🐠', '🌍', '💧', '🌱'],
      display: "'Nunito'", body: "'Nunito'",
      light: { bg: '#d8f1ff', bg2: '#c4f0cf', card: 'rgba(255,255,255,0.72)', text: '#0f3b5a', muted: '#477694', accent: '#138fd0', accent2: '#3fb54a', border: '#a8dcf5', onAccent: '#ffffff' },
      dark:  { bg: '#06263a', bg2: '#0b3a2a', card: 'rgba(18,58,84,0.72)', text: '#dff6ff', muted: '#8fc2dc', accent: '#3ec0ff', accent2: '#7fe07f', border: '#1e5576', onAccent: '#032033' },
    },
    y2k: {
      name: 'Y2K', mascot: '👾', tagline: 'sparkly, chrome & totally online',
      deco: ['⭐', '💿', '🦋', '💅', '📟'],
      display: "'Orbitron'", body: "'Quicksand'",
      light: { bg: '#f4e9ff', bg2: '#d6f5ff', card: '#ffffff', text: '#3a1a5a', muted: '#86659f', accent: '#e620b0', accent2: '#13b8d8', border: '#e0c4ff', onAccent: '#ffffff' },
      dark:  { bg: '#12052a', bg2: '#05203a', card: '#20103a', text: '#f6e8ff', muted: '#b49ad0', accent: '#ff5ad2', accent2: '#5ae8ff', border: '#44206a', onAccent: '#1a0430' },
    },
    cottonCandy: {
      name: 'Cotton Candy', mascot: '🦄', tagline: 'soft, sweet & a little magical',
      deco: ['☁️', '🍭', '🦄', '💫', '🩵'],
      display: "'Quicksand'", body: "'Quicksand'",
      light: { bg: '#fdf0ff', bg2: '#dff3ff', card: '#ffffff', text: '#5a4570', muted: '#8e7ca6', accent: '#e57cc4', accent2: '#6cc4f5', border: '#f0d4f5', onAccent: '#ffffff' },
      dark:  { bg: '#221d33', bg2: '#1b2a3a', card: '#2d2640', text: '#f7ecff', muted: '#b8a8d0', accent: '#f7b3e0', accent2: '#9edcff', border: '#463c60', onAccent: '#2a1630' },
    },
    blueberry: {
      name: 'Blueberry Surprise', mascot: '🐳', tagline: 'berry calm with a twist',
      deco: ['🫐', '🥞', '💙', '✨', '🌀'],
      display: "'Fredoka'", body: "'Nunito'",
      light: { bg: '#eef1ff', bg2: '#dbe2ff', card: '#ffffff', text: '#2a2f6a', muted: '#666ea4', accent: '#5361e0', accent2: '#9a6ae8', border: '#cdd4ff', onAccent: '#ffffff' },
      dark:  { bg: '#12142e', bg2: '#1a1e44', card: '#1f2450', text: '#e6e9ff', muted: '#9aa2d8', accent: '#8b96ff', accent2: '#c19eff', border: '#343a78', onAccent: '#0f1230' },
    },
    nanowrimo: {
      name: 'NaNoWriMo', mascot: '🦊', tagline: '50,000 words · cozy fall mode',
      deco: ['🍂', '🎃', '🍁', '☕', '🧣'],
      display: "'Lora'", body: "'Nunito'",
      light: { bg: '#fbf0e2', bg2: '#f1d3ad', card: '#fffaf3', text: '#4a2c1a', muted: '#86603f', accent: '#c45d16', accent2: '#8b3a2a', border: '#ecc9a0', onAccent: '#fffaf3' },
      dark:  { bg: '#1f150e', bg2: '#2e1d12', card: '#2e2018', text: '#f6e2cc', muted: '#c09a7a', accent: '#e8833a', accent2: '#d8664a', border: '#4e3424', onAccent: '#1f120a' },
    },
    strawberry: {
      name: 'Strawberry Swirl', mascot: '🐹', tagline: 'berries & cream, swirled together',
      deco: ['🍓', '🍰', '🍦', '💗', '🌷'],
      display: "'Fredoka'", body: "'Nunito'",
      light: { bg: '#fff3f3', bg2: '#ffdde4', card: '#fffdfd', text: '#6a2a36', muted: '#a2646f', accent: '#e43e60', accent2: '#4fa356', border: '#ffccd5', onAccent: '#ffffff' },
      dark:  { bg: '#2a1418', bg2: '#3a1a22', card: '#3a1f26', text: '#ffe8ec', muted: '#d0a0aa', accent: '#ff7290', accent2: '#8fd893', border: '#5a2a36', onAccent: '#2a0a12' },
    },
    lavender: {
      name: 'Lavender Dreams', mascot: '🐱', tagline: 'sleepy, dreamy, moonlit pages',
      deco: ['💜', '🌙', '🪻', '✨', '☁️'],
      display: "'Quicksand'", body: "'Nunito'",
      light: { bg: '#f5f0ff', bg2: '#e6dbfa', card: '#ffffff', text: '#43355e', muted: '#85769f', accent: '#8a6ad4', accent2: '#d77fb2', border: '#ddd0f5', onAccent: '#ffffff' },
      dark:  { bg: '#1c1728', bg2: '#261e38', card: '#2a2240', text: '#efe8ff', muted: '#ab9cc8', accent: '#b79dff', accent2: '#f0b0d4', border: '#42365e', onAccent: '#1a1030' },
    },
  };

  const NANO = { dailyGoal: 1667, projectGoal: 50000 };

  // ---------- state ----------
  // An explicit host theme (data-theme on <html>) wins over the OS setting.
  const hostTheme = document.documentElement.getAttribute('data-theme');
  const prefersDark = hostTheme ? hostTheme === 'dark'
    : !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const DEFAULTS = {
    text: '', title: '',
    theme: 'kawaii', mode: prefersDark ? 'dark' : 'light',
    dailyGoal: 500, projectGoal: 10000, deadline: '',
    bonus: 0,            // words logged from elsewhere, counts toward the project goal
    days: {},            // { 'YYYY-MM-DD': wordsWrittenThatDay }
    lastCount: 0,
    prevGoals: null,     // goals to restore when leaving NaNoWriMo mode
    prevTheme: 'kawaii', // theme to return to when the NaNoWriMo button is switched off
    celebrated: { daily: '', project: false },
    work: 25, brk: 5,
    pomos: {},           // { 'YYYY-MM-DD': completedWorkSessions }
    music: '',
    grammarOk: false,    // agreed to send text to LanguageTool for grammar checks
    a11y: { easyRead: false, motion: null, spell: true, textSize: 'normal' }, // motion: null = follow the OS
  };

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
    } catch {
      return { ...DEFAULTS };
    }
  }

  const state = load();
  if (!THEMES[state.theme]) state.theme = 'kawaii';
  state.a11y = { ...DEFAULTS.a11y, ...state.a11y };
  // The old lofi preset pointed at a stream that has since ended; move it to the channel's live link.
  if (/jfKfPfyJRdk/.test(state.music)) state.music = 'https://www.youtube.com/channel/UCSJ4gkVC6NrvII8umztf0Ow/live';

  let saveTimer = null;
  function save(showIndicator) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        if (showIndicator) flashSaved();
      } catch { /* storage unavailable — app still works for this session */ }
    }, 300);
  }

  // ---------- helpers ----------
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Number(n).toLocaleString();
  const clampGoal = (v) => Math.min(MAX_GOAL, Math.max(1, Math.round(Number(v)) || 1));

  function dateKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // ---------- colour contrast ----------
  // Theme colours are adjusted at runtime so text and buttons stay readable (WCAG AA)
  // in every theme without hand-tuning each palette.
  function parseColor(c, under) {
    let m = c.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
    if (m) {
      const h = m[1].length === 3 ? m[1].replace(/./g, (x) => x + x) : m[1];
      return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
    }
    m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return [0, 0, 0];
    const [r, g, b, a = 1] = m[1].split(',').map(Number);
    if (a >= 1 || !under) return [r, g, b];
    const u = parseColor(under);
    return [r, g, b].map((v, i) => Math.round(v * a + u[i] * (1 - a)));
  }
  const toHex = (rgb) => '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t); // t = share of b

  function luminance(rgb) {
    const [r, g, b] = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function contrast(a, b) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  }

  // Nudge fg toward black (on light backgrounds) or white (on dark) until it reaches the ratio.
  function readable(fg, bgs, ratio) {
    const target = luminance(bgs[0]) > 0.4 ? [0, 0, 0] : [255, 255, 255];
    let c = fg;
    for (let t = 0.04; t <= 1 && !bgs.every((bg) => contrast(c, bg) >= ratio); t += 0.04) c = mix(fg, target, t);
    return c;
  }
  // Nudge a button colour until the text on it reaches the ratio.
  function readableBehind(bg, fg, ratio) {
    const target = luminance(fg) > 0.4 ? [0, 0, 0] : [255, 255, 255];
    let c = bg;
    for (let t = 0.04; t <= 1 && contrast(c, fg) < ratio; t += 0.04) c = mix(bg, target, t);
    return c;
  }

  function countWords(text) {
    const m = text.trim().match(/\S+/g);
    return m ? m.length : 0;
  }

  function addToday(n) {
    const k = dateKey();
    state.days[k] = Math.max(0, (state.days[k] || 0) + n);
  }

  let toastTimer = null;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  let savedTimer = null;
  function flashSaved() {
    const el = $('saved');
    el.classList.add('show');
    clearTimeout(savedTimer);
    savedTimer = setTimeout(() => el.classList.remove('show'), 1200);
  }

  const osReducedMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const reduceMotion = () => (state.a11y.motion === null ? osReducedMotion : state.a11y.motion);

  function burst(count = 40) {
    if (reduceMotion()) return;
    const box = $('burst');
    const emojis = THEMES[state.theme].deco;
    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.textContent = emojis[i % emojis.length];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * 0.8 + 's';
      s.style.fontSize = 18 + Math.random() * 22 + 'px';
      box.appendChild(s);
      setTimeout(() => s.remove(), 3600);
    }
  }

  // Paper confetti in the current theme's colors, fired up from both bottom corners.
  let confettiPieces = [];
  let confettiFrame = 0;
  function confetti(amount = 160) {
    if (reduceMotion()) return;
    const box = $('burst');
    let canvas = box.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      box.appendChild(canvas);
    }
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const css = getComputedStyle(document.documentElement);
    const colors = [
      css.getPropertyValue('--accent').trim(),
      css.getPropertyValue('--accent2').trim(),
      '#ffd166', '#ffffff', '#ffb3d1', '#9ee6c9',
    ].filter(Boolean);

    for (let i = 0; i < amount; i++) {
      const left = i % 2 === 0;
      const angle = (left ? -60 : -120) + (Math.random() - 0.5) * 40; // degrees, aimed up and inward
      const speed = 11 + Math.random() * 9;
      confettiPieces.push({
        x: left ? -10 : w + 10,
        y: h * 0.9,
        vx: Math.cos(angle * Math.PI / 180) * speed * (w / 1200 + 0.5),
        vy: Math.sin(angle * Math.PI / 180) * speed * (h / 900 + 0.4),
        size: 7 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: Math.random() < 0.18 ? 'circle' : 'rect',
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.35,
        wobble: Math.random() * Math.PI * 2,
        life: 0,
        delay: Math.floor(Math.random() * 12), // frames, so the pieces don't all leave at once
      });
    }

    if (confettiFrame) return; // already animating; the new pieces join in
    let last = performance.now();
    const step = (now) => {
      const dt = Math.min(2.5, (now - last) / 16.67); // 1 = one 60fps frame
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of confettiPieces) {
        if (p.delay > 0) { p.delay -= dt; continue; }
        p.life += dt;
        p.vy += 0.32 * dt;              // gravity
        p.vx *= Math.pow(0.985, dt);    // air drag
        p.vy *= Math.pow(0.985, dt);
        p.wobble += 0.12 * dt;
        p.x += (p.vx + Math.sin(p.wobble) * 0.8) * dt;
        p.y += p.vy * dt;
        p.rot += p.spin * dt;
        ctx.save();
        ctx.globalAlpha = p.life > 150 ? Math.max(0, 1 - (p.life - 150) / 40) : 1;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // scaling by cos(wobble) makes the paper look like it's flipping over
          ctx.scale(1, Math.cos(p.wobble));
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        }
        ctx.restore();
      }
      confettiPieces = confettiPieces.filter((p) => p.life < 190 && p.y < h + 40);
      if (confettiPieces.length) {
        confettiFrame = requestAnimationFrame(step);
      } else {
        confettiFrame = 0;
        ctx.clearRect(0, 0, w, h);
      }
    };
    confettiFrame = requestAnimationFrame(step);
  }

  // Goal reached: jingle + confetti. `big` is for the project goal.
  function celebrate(big = false) {
    unlockAudio(); // typing or clicking counts as a gesture, so sound is allowed here
    tada(big);
    confetti(big ? 260 : 160);
    burst(big ? 24 : 12);
  }

  // ---------- theme & mode ----------
  function applyTheme() {
    const t = THEMES[state.theme];
    const palette = t[state.mode];
    const root = document.documentElement;
    for (const [k, v] of Object.entries(palette)) {
      root.style.setProperty('--' + k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()), v);
    }

    // Readable versions of the palette (see "colour contrast"): text 4.5:1, outlines 3:1.
    const bg = parseColor(palette.bg);
    const card = parseColor(palette.card, palette.bg);
    const accent = parseColor(palette.accent);
    const surfaces = [card, bg, parseColor(palette.bg2), mix(card, accent, 0.12)];
    const set = (name, rgb) => root.style.setProperty(name, toHex(rgb));
    set('--text', readable(parseColor(palette.text), surfaces, 4.5));
    set('--muted', readable(parseColor(palette.muted), surfaces, 4.5));
    set('--accent-text', readable(accent, surfaces, 4.5));
    set('--btn-bg', readableBehind(accent, parseColor(palette.onAccent), 4.8)); // a little extra for the gloss
    set('--focus', readable(parseColor(palette.accent2), [card, bg], 3));
    set('--field-border', readable(parseColor(palette.border), [card], 3));

    const easy = state.a11y.easyRead ? "'Atkinson Hyperlegible', Verdana, " : '';
    root.style.setProperty('--font-display', `${easy || t.display + ', '}system-ui, sans-serif`);
    root.style.setProperty('--font-body', `${easy || t.body + ', '}system-ui, sans-serif`);
    root.dataset.mode = state.mode;
    root.dataset.palette = state.theme;

    $('mascot').textContent = t.mascot;
    $('tagline').textContent = t.tagline;
    $('modeBtn').textContent = state.mode === 'dark' ? '☀️' : '🌙';
    $('modeBtn').setAttribute('aria-label', state.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    const nanoOn = state.theme === 'nanowrimo';
    $('nanoBtn').classList.toggle('active', nanoOn);
    $('nanoBtn').setAttribute('aria-pressed', String(nanoOn));
    $('nanoBtn').innerHTML = `<span aria-hidden="true">🍂</span> NaNoWriMo${nanoOn ? ': on' : ''}`;

    document.querySelectorAll('.swatch').forEach((el) => {
      el.classList.toggle('selected', el.dataset.theme === state.theme);
      el.setAttribute('aria-pressed', String(el.dataset.theme === state.theme));
    });
    renderDeco();
  }

  function renderDeco() {
    const box = $('deco');
    box.innerHTML = '';
    if (reduceMotion()) return;
    const emojis = THEMES[state.theme].deco;
    for (let i = 0; i < 16; i++) {
      const s = document.createElement('span');
      s.textContent = emojis[i % emojis.length];
      s.style.left = Math.random() * 100 + '%';
      s.style.fontSize = 16 + Math.random() * 20 + 'px';
      s.style.animationDuration = 18 + Math.random() * 22 + 's';
      s.style.animationDelay = -Math.random() * 40 + 's';
      box.appendChild(s);
    }
  }

  function nanoDeadline() {
    const now = new Date();
    // After November, aim for next year's NaNoWriMo.
    const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear();
    return `${year}-11-30`;
  }

  function setTheme(key) {
    if (key === state.theme) return;
    const enteringNano = key === 'nanowrimo';
    const leavingNano = state.theme === 'nanowrimo';

    if (enteringNano) {
      state.prevTheme = state.theme;
      state.prevGoals = { dailyGoal: state.dailyGoal, projectGoal: state.projectGoal, deadline: state.deadline };
      state.dailyGoal = NANO.dailyGoal;
      state.projectGoal = NANO.projectGoal;
      state.deadline = nanoDeadline();
      state.celebrated.project = false;
      toast('🍂 NaNoWriMo mode! 1,667 words a day · 50,000 by Nov 30');
    } else if (leavingNano && state.prevGoals) {
      Object.assign(state, state.prevGoals);
      state.prevGoals = null;
      state.celebrated.project = false;
      toast('Your usual goals are back ✨');
    }

    state.theme = key;
    applyTheme();
    syncGoalInputs();
    renderGoals();
    save();
  }

  function buildSwatches() {
    const box = $('swatches');
    for (const [key, t] of Object.entries(THEMES)) {
      const p = t.light;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'swatch';
      b.dataset.theme = key;
      b.style.background = `linear-gradient(140deg, ${p.bg}, ${p.bg2})`;
      b.style.color = p.text;
      b.style.borderColor = p.border;
      b.innerHTML = `<span class="emoji" aria-hidden="true">${t.mascot}</span>
        <span class="dots" aria-hidden="true"><i style="background:${p.accent}"></i><i style="background:${p.accent2}"></i><i style="background:${t.dark.bg}"></i></span>
        <span class="name">${t.name}</span>`;
      b.addEventListener('click', () => setTheme(key));
      box.appendChild(b);
    }
  }

  // ---------- editor ----------
  const editor = $('editor');

  function renderStats() {
    const words = countWords(editor.value);
    $('wordCount').textContent = fmt(words);
    $('charCount').textContent = fmt(editor.value.length);
    $('readTime').textContent = fmt(Math.ceil(words / 200));
  }

  editor.addEventListener('input', () => {
    const c = countWords(editor.value);
    addToday(c - state.lastCount);
    state.lastCount = c;
    state.text = editor.value;
    renderStats();
    renderGoals();
    save(true);
  });

  $('title').addEventListener('input', (e) => {
    state.title = e.target.value;
    save(true);
  });

  $('copyBtn').addEventListener('click', () => {
    const text = (state.title ? state.title + '\n\n' : '') + editor.value;
    const fallback = () => {
      editor.focus();
      editor.select();
      toast('Text selected. Press Ctrl+C (or ⌘C) to copy.');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => toast('Copied to clipboard 📋'), fallback);
    } else {
      fallback();
    }
  });

  // Two-tap clear: confirm() dialogs don't work everywhere, so ask in the button itself.
  let clearArmed = null;
  $('clearBtn').addEventListener('click', () => {
    const btn = $('clearBtn');
    if (!editor.value) return;
    if (!clearArmed) {
      btn.textContent = '⚠️ Tap again to clear';
      toast('Press Clear again to erase all your writing');
      clearArmed = setTimeout(() => {
        clearArmed = null;
        btn.textContent = '🧹 Clear';
      }, 3000);
      return;
    }
    clearTimeout(clearArmed);
    clearArmed = null;
    btn.textContent = '🧹 Clear';
    editor.value = '';
    state.text = '';
    state.lastCount = 0; // reset baseline without subtracting from today's progress
    renderStats();
    renderGoals();
    save(true);
  });

  // ---------- goals ----------
  function streak() {
    let n = 0;
    const d = new Date();
    if ((state.days[dateKey(d)] || 0) < state.dailyGoal) d.setDate(d.getDate() - 1); // today still in progress
    while ((state.days[dateKey(d)] || 0) >= state.dailyGoal) {
      n++;
      d.setDate(d.getDate() - 1);
    }
    return n;
  }

  function renderGoals() {
    const today = state.days[dateKey()] || 0;
    const project = countWords(editor.value) + state.bonus;

    $('todayWords').textContent = fmt(today);
    $('dailyGoalLabel').textContent = fmt(state.dailyGoal);
    $('dailyFill').style.width = Math.min(100, (today / state.dailyGoal) * 100) + '%';

    $('projectWords').textContent = fmt(project);
    $('projectGoalLabel').textContent = fmt(state.projectGoal);
    $('projectFill').style.width = Math.min(100, (project / state.projectGoal) * 100) + '%';
    setProgress('dailyBar', today, state.dailyGoal);
    setProgress('projectBar', project, state.projectGoal);

    const remaining = Math.max(0, state.projectGoal - project);
    let info = remaining ? `${fmt(remaining)} words to go` : 'Project goal reached! 🎉';
    if (state.deadline && remaining) {
      const end = new Date(state.deadline + 'T23:59:59');
      const daysLeft = Math.ceil((end - new Date()) / 86400000);
      if (daysLeft > 0) {
        info += ` · ${daysLeft} day${daysLeft === 1 ? '' : 's'} left · ~${fmt(Math.ceil(remaining / daysLeft))}/day`;
      } else {
        info += ' · deadline passed — you’ve got this anyway!';
      }
    }
    $('deadlineInfo').textContent = info;

    $('streak').textContent = streak();
    $('bestDay').textContent = fmt(Math.max(0, ...Object.values(state.days)));

    renderChart();
    checkCelebrations(today, project);
  }

  function setProgress(id, words, goal) {
    const bar = $(id);
    bar.setAttribute('aria-valuenow', String(Math.min(100, Math.round((words / goal) * 100))));
    bar.setAttribute('aria-valuetext', `${fmt(words)} of ${fmt(goal)} words`);
  }

  function renderChart() {
    const chart = $('chart');
    const cols = [];
    const d = new Date();
    d.setDate(d.getDate() - 13);
    for (let i = 0; i < 14; i++) {
      const k = dateKey(d);
      cols.push({ k, words: state.days[k] || 0, label: d.toLocaleDateString(undefined, { weekday: 'narrow' }), date: d.toLocaleDateString() });
      d.setDate(d.getDate() + 1);
    }
    const max = Math.max(state.dailyGoal, ...cols.map((c) => c.words));
    const todayKey = dateKey();
    chart.innerHTML = '';
    for (const c of cols) {
      const col = document.createElement('div');
      col.className = 'col' + (c.k === todayKey ? ' today' : '');
      col.title = `${c.date}: ${fmt(c.words)} words`;
      const bar = document.createElement('div');
      bar.className = 'b' + (c.words >= state.dailyGoal ? ' met' : '');
      bar.style.height = (c.words / max) * 100 + '%';
      const lbl = document.createElement('span');
      lbl.className = 'lbl';
      lbl.textContent = c.label;
      col.append(bar, lbl);
      chart.appendChild(col);
    }
    const line = document.createElement('div');
    line.className = 'goal-line';
    // chart content area spans from top padding (6px) to bottom padding (18px)
    line.style.bottom = `calc(18px + (100% - 24px) * ${state.dailyGoal / max})`;
    line.title = `Daily goal: ${fmt(state.dailyGoal)}`;
    chart.appendChild(line);

    const met = cols.filter((c) => c.words >= state.dailyGoal).length;
    const total = cols.reduce((sum, c) => sum + c.words, 0);
    chart.setAttribute('aria-label',
      `Last 14 days: ${fmt(total)} words in total, daily goal met on ${met} of 14 days, ${fmt(cols[13].words)} words today.`);
  }

  function checkCelebrations(today, project) {
    const k = dateKey();
    const dailyHit = today >= state.dailyGoal && state.celebrated.daily !== k;
    const projectHit = project >= state.projectGoal && !state.celebrated.project;
    if (project < state.projectGoal) state.celebrated.project = false;
    if (!dailyHit && !projectHit) return;

    // Each goal celebrates once (daily: once per day). If both land together, one big party.
    if (dailyHit) state.celebrated.daily = k;
    if (projectHit) state.celebrated.project = true;
    celebrate(projectHit);
    toast(projectHit
      ? `You hit your project goal of ${fmt(state.projectGoal)} words! 🏆`
      : `Daily goal reached! ${fmt(state.dailyGoal)} words 🎉`);
    save();
  }

  function syncGoalInputs() {
    $('dailyGoal').value = state.dailyGoal;
    $('projectGoal').value = state.projectGoal;
    $('deadline').value = state.deadline;
  }

  $('dailyGoal').addEventListener('change', (e) => {
    state.dailyGoal = clampGoal(e.target.value);
    if ((state.days[dateKey()] || 0) < state.dailyGoal) state.celebrated.daily = '';
    syncGoalInputs();
    renderGoals();
    save(true);
  });

  $('projectGoal').addEventListener('change', (e) => {
    state.projectGoal = clampGoal(e.target.value);
    syncGoalInputs();
    renderGoals();
    save(true);
  });

  $('deadline').addEventListener('change', (e) => {
    state.deadline = e.target.value;
    renderGoals();
    save(true);
  });

  $('logBtn').addEventListener('click', () => {
    const input = $('logWords');
    const n = Math.min(MAX_GOAL, Math.max(0, Math.round(Number(input.value)) || 0));
    if (!n) return;
    state.bonus += n;
    addToday(n);
    input.value = '';
    toast(`+${fmt(n)} words logged ✍️`);
    renderGoals();
    save(true);
  });

  // ---------- pomodoro ----------
  const RING = 2 * Math.PI * 54;
  const pomo = { phase: 'work', running: false, endAt: 0, remaining: state.work * 60, timer: null };

  function phaseTotal() {
    return (pomo.phase === 'work' ? state.work : state.brk) * 60;
  }

  function renderPomo() {
    const secs = Math.ceil(pomo.remaining);
    const mm = String(Math.floor(secs / 60)).padStart(2, '0');
    const ss = String(secs % 60).padStart(2, '0');
    $('pomoTime').textContent = `${mm}:${ss}`;
    $('pomoPhase').textContent = pomo.phase === 'work' ? 'focus time 🌸' : 'break time 🍵';
    $('ringFill').style.strokeDashoffset = RING * (1 - pomo.remaining / phaseTotal());
    $('pomoStart').textContent = pomo.running ? '⏸ Pause' : '▶ Start';
    document.querySelector('.pomo-card').classList.toggle('break', pomo.phase === 'break');
    document.title = pomo.running ? `${mm}:${ss} · ${pomo.phase === 'work' ? 'Focus' : 'Break'} · Kawaii no Word Count!` : 'Kawaii no Word Count!';

    const n = state.pomos[dateKey()] || 0;
    $('pomoCount').textContent = n
      ? `${'🍅'.repeat(Math.min(n, 12))}${n > 12 ? ' +' + (n - 12) : ''} · ${n} today`
      : '0 tomatoes today';
  }

  function tick() {
    pomo.remaining = Math.max(0, (pomo.endAt - Date.now()) / 1000);
    if (pomo.remaining <= 0) finishPhase();
    renderPomo();
  }

  function startPomo() {
    pomo.running = true;
    pomo.endAt = Date.now() + pomo.remaining * 1000;
    clearInterval(pomo.timer);
    pomo.timer = setInterval(tick, 250);
    renderPomo();
  }

  function pausePomo() {
    pomo.running = false;
    clearInterval(pomo.timer);
    renderPomo();
  }

  function finishPhase(skipped) {
    if (!skipped) chime();
    if (pomo.phase === 'work') {
      if (!skipped) {
        const k = dateKey();
        state.pomos[k] = (state.pomos[k] || 0) + 1;
        save();
        toast('Focus session done! Time for a cozy break 🍵');
      }
      pomo.phase = 'break';
      pomo.remaining = state.brk * 60;
      if (pomo.running) startPomo(); // roll straight into the break
    } else {
      if (!skipped) toast('Break’s over — ready to write? 🌸');
      pomo.phase = 'work';
      pomo.remaining = state.work * 60;
      pausePomo();
    }
  }

  // Browsers only allow sound after a click, so the audio context is created on Start and reused.
  let audioCtx = null;
  function unlockAudio() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
    } catch { /* audio not available */ }
  }

  const soundOn = () => state.a11y.sound !== false;

  // One soft bell-like note: a sine plus a quieter octave above, fading out.
  function bell(ctx, freq, start, length, volume, out) {
    [[1, 1], [2, 0.3]].forEach(([mult, level]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = mult === 1 ? 'triangle' : 'sine';
      osc.frequency.value = freq * mult;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(volume * level, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + length);
      osc.connect(gain).connect(out);
      osc.start(start);
      osc.stop(start + length + 0.05);
    });
  }

  // The goal jingle: a quick rising "ta-da" arpeggio, a sparkly chord and a few twinkles.
  function tada(big = false) {
    if (!soundOn() || !audioCtx) return;
    try {
      const ctx = audioCtx;
      const out = ctx.createGain();
      out.gain.value = 0.9;
      out.connect(ctx.destination);
      const t = ctx.currentTime + 0.03;

      const run = big ? [784, 1047, 1319, 1568, 2093] : [784, 1047, 1319, 1568]; // G5 C6 E6 G6 (C7)
      run.forEach((f, i) => bell(ctx, f, t + i * 0.075, 0.35, 0.16, out));

      const chordAt = t + run.length * 0.075 + 0.04;
      [1047, 1319, 1568, 2093].forEach((f) => bell(ctx, f, chordAt, big ? 1.6 : 1.1, 0.07, out));
      if (big) bell(ctx, 523, chordAt, 1.6, 0.1, out); // a warm low C under the big one

      const twinkles = big ? 9 : 5;
      for (let i = 0; i < twinkles; i++) {
        const f = 2600 + Math.random() * 1800;
        bell(ctx, f, chordAt + 0.08 + i * 0.09 + Math.random() * 0.04, 0.18, 0.035, out);
      }
    } catch { /* audio not available */ }
  }

  function chime() {
    if (!soundOn()) return;
    try {
      const ctx = audioCtx;
      if (!ctx) return;
      [880, 1175, 1568].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const t = ctx.currentTime + i * 0.18;
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.18, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.65);
      });
    } catch { /* audio not available */ }
  }

  $('pomoStart').addEventListener('click', () => {
    unlockAudio();
    pomo.running ? pausePomo() : startPomo();
  });
  $('pomoReset').addEventListener('click', () => {
    pausePomo();
    pomo.remaining = phaseTotal();
    renderPomo();
  });
  $('pomoSkip').addEventListener('click', () => {
    finishPhase(true);
    renderPomo();
  });

  function bindMinutes(id, key, max) {
    const input = $(id);
    input.value = state[key];
    input.addEventListener('change', () => {
      state[key] = Math.min(max, Math.max(1, Math.round(Number(input.value)) || 1));
      input.value = state[key];
      const affectsPhase = (key === 'work') === (pomo.phase === 'work');
      if (!pomo.running && affectsPhase) pomo.remaining = phaseTotal();
      renderPomo();
      save(true);
    });
  }
  bindMinutes('workMin', 'work', 60);
  bindMinutes('breakMin', 'brk', 25);

  // ---------- music ----------
  const CAN_EMBED = (() => {
    try { return window.self === window.top; } catch { return false; }
  })();

  function toEmbed(raw) {
    const s = raw.trim();
    const uri = s.match(/^spotify:(track|album|playlist|episode|show|artist):([A-Za-z0-9]+)$/);
    if (uri) return { kind: 'spotify', type: uri[1], src: `https://open.spotify.com/embed/${uri[1]}/${uri[2]}` };

    let url;
    try { url = new URL(s); } catch { return null; }
    const host = url.hostname.replace(/^www\.|^m\.|^music\./, '');

    if (host === 'open.spotify.com') {
      const m = url.pathname.match(/^\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]+)/);
      return m ? { kind: 'spotify', type: m[1], src: `https://open.spotify.com/embed/${m[1]}/${m[2]}` } : null;
    }

    let id = null;
    if (host === 'youtu.be') id = url.pathname.slice(1).split('/')[0];
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      // A channel's live page (/channel/UC…/live) embeds whatever that channel is streaming now,
      // so it keeps working when a 24/7 stream restarts with a new video ID.
      const channel = url.pathname.match(/^\/channel\/(UC[\w-]{22})(?:\/live)?\/?$/);
      if (channel) {
        return { kind: 'youtube', src: `https://www.youtube.com/embed/live_stream?channel=${channel[1]}&rel=0` };
      }
      // @handle and /c/ links can't be turned into an embed without YouTube's API.
      if (/^\/(?:@[\w.-]+|c\/[\w.-]+|user\/[\w.-]+)(?:\/live)?\/?$/.test(url.pathname)) {
        return { kind: 'youtube', linkOnly: true };
      }
      id = url.searchParams.get('v');
      const m = url.pathname.match(/^\/(?:embed|live|shorts)\/([\w-]+)/);
      if (!id && m) id = m[1];
    } else {
      return null;
    }
    const list = url.searchParams.get('list');
    if (id && /^[\w-]{6,}$/.test(id)) {
      return { kind: 'youtube', src: `https://www.youtube.com/embed/${id}?${list ? 'list=' + encodeURIComponent(list) + '&' : ''}rel=0` };
    }
    if (list) return { kind: 'youtube', src: `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(list)}` };
    return null;
  }

  function playMusic(raw, persist = true) {
    const embed = toEmbed(raw);
    $('musicError').hidden = !!embed || !raw.trim();
    if (!embed) return;
    if (persist) {
      state.music = raw.trim();
      save();
    }

    // Inside an embedded frame (like a published artifact) players can't load, so link out instead.
    if (!CAN_EMBED || embed.linkOnly) {
      const a = document.createElement('a');
      a.className = 'btn open-link';
      a.href = raw.trim();
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = embed.kind === 'spotify' ? '🎵 Open in Spotify ↗' : '▶ Open in YouTube ↗';
      const note = document.createElement('p');
      note.className = 'hint';
      note.textContent = embed.linkOnly && CAN_EMBED
        ? 'Channel links can’t play here. Open the stream and paste its own link (youtube.com/watch?v=… or youtube.com/live/…) to play it inside the app.'
        : 'Opens in a new tab. Keep it playing while you write here.';
      $('player').replaceChildren(a, note);
      return;
    }

    const frame = document.createElement('iframe');
    frame.src = embed.src;
    frame.title = embed.kind === 'spotify' ? 'Spotify player' : 'YouTube player';
    frame.loading = 'lazy';
    frame.allow = 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    if (embed.kind === 'spotify') frame.height = embed.type === 'track' || embed.type === 'episode' ? 152 : 352;
    else frame.className = 'yt';
    $('player').replaceChildren(frame);
  }

  $('musicForm').addEventListener('submit', (e) => {
    e.preventDefault();
    playMusic($('musicUrl').value);
  });
  document.querySelectorAll('.presets [data-url]').forEach((b) => {
    b.addEventListener('click', () => {
      $('musicUrl').value = b.dataset.url;
      playMusic(b.dataset.url);
    });
  });
  $('musicClear').addEventListener('click', () => {
    $('player').replaceChildren();
    $('musicUrl').value = '';
    $('musicError').hidden = true;
    state.music = '';
    save();
  });

  // ---------- header controls ----------
  $('modeBtn').addEventListener('click', () => {
    state.mode = state.mode === 'dark' ? 'light' : 'dark';
    applyTheme();
    save();
  });

  $('nanoBtn').addEventListener('click', () => {
    setTheme(state.theme === 'nanowrimo' ? (state.prevTheme || 'kawaii') : 'nanowrimo');
  });

  // Drop-down panels (Decorate, Accessibility): one open at a time; Escape or clicking
  // outside closes them, and Escape returns keyboard focus to the button.
  const panels = [['decorBtn', 'decorPanel'], ['a11yBtn', 'a11yPanel']].map(([b, p]) => ({ btn: $(b), panel: $(p) }));
  function togglePanel(which, open) {
    which.panel.hidden = !open;
    which.btn.setAttribute('aria-expanded', String(open));
  }
  for (const which of panels) {
    which.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = which.panel.hidden;
      panels.forEach((p) => togglePanel(p, false));
      togglePanel(which, open);
    });
  }
  document.addEventListener('click', (e) => {
    for (const p of panels) if (!p.panel.hidden && !p.panel.contains(e.target)) togglePanel(p, false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    for (const p of panels) {
      if (p.panel.hidden) continue;
      const hadFocus = p.panel.contains(document.activeElement);
      togglePanel(p, false);
      if (hadFocus) p.btn.focus();
    }
  });

  // ---------- accessibility options ----------
  function applyA11y() {
    const root = document.documentElement;
    root.dataset.textSize = state.a11y.textSize;
    root.dataset.motion = reduceMotion() ? 'reduce' : 'full';
    root.toggleAttribute('data-easy-read', state.a11y.easyRead);
    editor.spellcheck = state.a11y.spell;
    $('title').spellcheck = state.a11y.spell;
    $('optEasyRead').checked = state.a11y.easyRead;
    $('optMotion').checked = reduceMotion();
    $('optSpell').checked = state.a11y.spell;
    $('optSound').checked = soundOn();
    document.querySelectorAll('input[name="textSize"]').forEach((r) => { r.checked = r.value === state.a11y.textSize; });
  }

  $('optEasyRead').addEventListener('change', (e) => {
    state.a11y.easyRead = e.target.checked;
    applyTheme(); // swaps the fonts
    applyA11y();
    save();
  });
  $('optMotion').addEventListener('change', (e) => {
    state.a11y.motion = e.target.checked;
    applyA11y();
    renderDeco();
    save();
  });
  $('optSpell').addEventListener('change', (e) => {
    state.a11y.spell = e.target.checked;
    applyA11y();
    save();
  });
  $('optSound').addEventListener('change', (e) => {
    state.a11y.sound = e.target.checked;
    if (e.target.checked) {
      unlockAudio();
      tada();
    }
    save();
  });
  $('celebrateTest').addEventListener('click', () => {
    celebrate();
    toast(reduceMotion() ? 'This is your goal jingle 🎉 (confetti is off with Reduce motion)' : 'This is how reaching a goal looks 🎉');
  });
  document.querySelectorAll('input[name="textSize"]').forEach((r) => {
    r.addEventListener('change', () => {
      state.a11y.textSize = r.value;
      applyA11y();
      save();
    });
  });

  // ---------- grammar check ----------
  // Spelling is handled offline by the browser/desktop spellchecker. Grammar suggestions come
  // from LanguageTool's free public API, only when the person presses "Check grammar" and has agreed.
  const LT_URL = 'https://api.languagetool.org/v2/check';
  const LT_MAX = 18000; // the free service accepts up to 20 KB per request
  let issues = [];      // { offset, length, original, message, replacements }

  const grammarPanel = $('grammarPanel');
  const grammarStatus = (msg) => { $('grammarStatus').textContent = msg; };

  function textToCheck() {
    const text = editor.value;
    let start = editor.selectionStart;
    let end = editor.selectionEnd;
    if (end > start) return { start, text: text.slice(start, Math.min(end, start + LT_MAX)), scope: 'selection' };
    if (text.length <= LT_MAX) return { start: 0, text, scope: 'all' };
    // Long drafts: check the most recent writing, starting at a paragraph break if there's one nearby.
    start = text.length - LT_MAX;
    const brk = text.indexOf('\n', start);
    if (brk !== -1 && brk < start + 2000) start = brk + 1;
    return { start, text: text.slice(start), scope: 'recent' };
  }

  function englishVariant() {
    const lang = (navigator.language || 'en-US').replace('_', '-');
    return /^en-(US|GB|AU|CA|NZ|ZA)$/i.test(lang) ? lang : 'en-US';
  }

  async function runGrammarCheck() {
    const { start, text, scope } = textToCheck();
    if (!text.trim()) {
      grammarStatus('Write something first, then check it ✨');
      return;
    }
    if (!navigator.onLine) {
      grammarStatus('You seem to be offline. Grammar check needs the internet (spelling squiggles still work).');
      return;
    }
    const btn = $('grammarBtn');
    btn.disabled = true;
    issues = [];
    $('grammarList').replaceChildren();
    grammarStatus('Checking your writing… 🔍');
    try {
      // Plain form data keeps this a "simple" request, which the public API allows from any app.
      const body = new URLSearchParams({ text, language: 'auto', preferredVariants: englishVariant() });
      const res = await fetch(LT_URL, { method: 'POST', body });
      if (res.status === 429) throw new Error('busy');
      if (!res.ok) throw new Error('http');
      const data = await res.json();
      issues = data.matches.map((m) => ({
        offset: start + m.offset,
        length: m.length,
        original: text.slice(m.offset, m.offset + m.length),
        message: m.message,
        replacements: m.replacements.slice(0, 3).map((r) => r.value),
      }));
      const where = { selection: 'in your selection', all: '', recent: 'in your most recent writing (about the last 3,000 words). Select text to check another part' }[scope];
      grammarStatus(issues.length
        ? `Found ${issues.length} suggestion${issues.length === 1 ? '' : 's'}${where ? ' ' + where : ''}.`
        : `All clear! No suggestions${where ? ' ' + where : ''} ✨`);
      renderIssues();
    } catch (err) {
      grammarStatus(err.message === 'busy'
        ? 'The grammar helper is busy right now. Wait a minute and try again.'
        : 'Couldn’t reach the grammar helper. Check your internet connection and try again.');
    } finally {
      btn.disabled = false;
    }
  }

  // Find where an issue's text is now, in case the writing changed since the check.
  function locate(issue) {
    const text = editor.value;
    if (text.slice(issue.offset, issue.offset + issue.length) === issue.original) return issue.offset;
    let best = -1;
    let from = Math.max(0, issue.offset - 500);
    for (;;) {
      const i = text.indexOf(issue.original, from);
      if (i === -1 || i > issue.offset + 500) break;
      if (best === -1 || Math.abs(i - issue.offset) < Math.abs(best - issue.offset)) best = i;
      from = i + 1;
    }
    return best;
  }

  function selectIssue(issue) {
    const at = locate(issue);
    if (at === -1) {
      toast('That text has changed. Press Check grammar again ✍️');
      return -1;
    }
    editor.focus();
    editor.setSelectionRange(at, at + issue.length);
    return at;
  }

  function applyFix(index, value) {
    const issue = issues[index];
    const at = selectIssue(issue);
    if (at === -1) return;
    // execCommand keeps Ctrl+Z working and fires the usual input event (word counts, saving).
    const ok = value
      ? document.execCommand('insertText', false, value)
      : document.execCommand('delete');
    if (!ok) {
      editor.setRangeText(value, at, at + issue.length, 'end');
      editor.dispatchEvent(new Event('input'));
    }
    const delta = value.length - issue.length;
    issues.splice(index, 1);
    issues = issues
      .filter((i) => i.offset >= at + issue.length || i.offset + i.length <= at) // drop overlapping ones
      .map((i) => (i.offset > at ? { ...i, offset: i.offset + delta } : i));
    renderIssues(index);
    grammarStatus(issues.length ? `Fixed! ${issues.length} suggestion${issues.length === 1 ? '' : 's'} left.` : 'All fixed! ✨');
  }

  function renderIssues(focusIndex) {
    const list = $('grammarList');
    list.replaceChildren();
    issues.forEach((issue, index) => {
      const li = document.createElement('li');
      li.className = 'issue';
      li.tabIndex = -1;

      const msg = document.createElement('p');
      msg.className = 'issue-msg';
      msg.textContent = issue.message;

      // a little context around the problem, with the problem highlighted
      const at = Math.max(0, locate(issue));
      const ctx = document.createElement('p');
      ctx.className = 'issue-context';
      const before = editor.value.slice(Math.max(0, at - 30), at);
      const after = editor.value.slice(at + issue.length, at + issue.length + 30);
      const mark = document.createElement('mark');
      mark.textContent = issue.original || '·';
      ctx.append((at > 30 ? '…' : '') + before, mark, after + (after.length === 30 ? '…' : ''));

      const actions = document.createElement('div');
      actions.className = 'issue-actions';
      for (const r of issue.replacements) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn small';
        b.textContent = r === '' ? 'Remove it' : r;
        b.setAttribute('aria-label', r === '' ? `Remove “${issue.original}”` : `Change “${issue.original}” to “${r}”`);
        b.addEventListener('click', () => applyFix(index, r));
        actions.appendChild(b);
      }
      const show = document.createElement('button');
      show.type = 'button';
      show.className = 'btn ghost small';
      show.textContent = 'Show me';
      show.addEventListener('click', () => selectIssue(issue));
      const ignore = document.createElement('button');
      ignore.type = 'button';
      ignore.className = 'btn ghost small';
      ignore.textContent = 'Ignore';
      ignore.addEventListener('click', () => {
        issues.splice(index, 1);
        renderIssues(index);
        grammarStatus(issues.length ? `${issues.length} suggestion${issues.length === 1 ? '' : 's'} left.` : 'All done! ✨');
      });
      actions.append(show, ignore);

      li.append(msg, ctx, actions);
      list.appendChild(li);
    });
    // after a fix or ignore, keep keyboard users in the list instead of losing their place
    if (focusIndex !== undefined) {
      const items = list.children;
      (items[Math.min(focusIndex, items.length - 1)] || $('grammarStatus')).focus?.();
    }
  }

  function openGrammar() {
    grammarPanel.hidden = false;
    if (!state.grammarOk) {
      $('grammarConsent').hidden = false;
      grammarStatus('');
      $('grammarAgree').focus();
      return;
    }
    runGrammarCheck();
  }

  $('grammarBtn').addEventListener('click', openGrammar);
  $('grammarAgree').addEventListener('click', () => {
    state.grammarOk = true;
    save();
    $('grammarConsent').hidden = true;
    runGrammarCheck();
  });
  $('grammarDecline').addEventListener('click', () => {
    grammarPanel.hidden = true;
    $('grammarBtn').focus();
  });
  $('grammarClose').addEventListener('click', () => {
    grammarPanel.hidden = true;
    issues = [];
    $('grammarList').replaceChildren();
    $('grammarBtn').focus();
  });

  // ---------- init ----------
  editor.value = state.text;
  $('title').value = state.title;
  state.lastCount = countWords(state.text);
  buildSwatches();
  applyTheme();
  applyA11y();
  syncGoalInputs();
  renderStats();
  renderGoals();
  renderPomo();
  if (state.music) {
    $('musicUrl').value = state.music;
    playMusic(state.music, false);
  }

  // ---------- installable app ----------
  // Offline support only on the hosted https site (not file://, the desktop app or embedded previews).
  if ('serviceWorker' in navigator && location.protocol === 'https:' && CAN_EMBED) {
    navigator.serviceWorker.register('sw.js').catch(() => { /* offline mode just won't be available */ });
  }

  // Chrome/Edge let the page offer its own Install button.
  let installPrompt = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    $('installBtn').hidden = false;
  });
  $('installBtn').addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice.catch(() => null);
    installPrompt = null;
    $('installBtn').hidden = true;
  });
  window.addEventListener('appinstalled', () => {
    $('installBtn').hidden = true;
    toast('Installed! Find Kawaii no Word Count with your other apps 🌸');
  });

  // roll the day over if the tab stays open past midnight
  let currentDay = dateKey();
  setInterval(() => {
    if (dateKey() !== currentDay) {
      currentDay = dateKey();
      renderGoals();
      renderPomo();
    }
  }, 60000);
})();
