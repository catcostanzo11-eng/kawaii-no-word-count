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

  function burst() {
    const box = $('burst');
    const emojis = THEMES[state.theme].deco;
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.textContent = emojis[i % emojis.length];
      s.style.left = Math.random() * 100 + 'vw';
      s.style.animationDelay = Math.random() * 0.8 + 's';
      s.style.fontSize = 18 + Math.random() * 22 + 'px';
      box.appendChild(s);
      setTimeout(() => s.remove(), 3600);
    }
  }

  // ---------- theme & mode ----------
  function applyTheme() {
    const t = THEMES[state.theme];
    const palette = t[state.mode];
    const root = document.documentElement;
    for (const [k, v] of Object.entries(palette)) {
      root.style.setProperty('--' + k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase()), v);
    }
    root.style.setProperty('--font-display', `${t.display}, system-ui, sans-serif`);
    root.style.setProperty('--font-body', `${t.body}, system-ui, sans-serif`);
    root.dataset.mode = state.mode;
    root.dataset.palette = state.theme;

    $('mascot').textContent = t.mascot;
    $('tagline').textContent = t.tagline;
    $('modeBtn').textContent = state.mode === 'dark' ? '☀️' : '🌙';
    $('modeBtn').setAttribute('aria-label', state.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    $('nanoBtn').classList.toggle('active', state.theme === 'nanowrimo');
    $('nanoBtn').textContent = state.theme === 'nanowrimo' ? '🍂 NaNoWriMo: on' : '🍂 NaNoWriMo';

    document.querySelectorAll('.swatch').forEach((el) => {
      el.classList.toggle('selected', el.dataset.theme === state.theme);
    });
    renderDeco();
  }

  function renderDeco() {
    const box = $('deco');
    box.innerHTML = '';
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
      b.innerHTML = `<span class="emoji">${t.mascot}</span>
        <span class="dots"><i style="background:${p.accent}"></i><i style="background:${p.accent2}"></i><i style="background:${t.dark.bg}"></i></span>
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
  }

  function checkCelebrations(today, project) {
    const k = dateKey();
    if (today >= state.dailyGoal && state.celebrated.daily !== k) {
      state.celebrated.daily = k;
      burst();
      toast(`Daily goal reached! ${fmt(state.dailyGoal)} words 🎉`);
      save();
    }
    if (project >= state.projectGoal && !state.celebrated.project) {
      state.celebrated.project = true;
      burst();
      toast(`You hit your project goal of ${fmt(state.projectGoal)} words! 🏆`);
      save();
    } else if (project < state.projectGoal && state.celebrated.project) {
      state.celebrated.project = false;
    }
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
    document.title = pomo.running ? `${mm}:${ss} · ${pomo.phase === 'work' ? 'Focus' : 'Break'} · Kawaii Word Count` : 'Kawaii Word Count';

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

  function chime() {
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
    if (!CAN_EMBED) {
      const a = document.createElement('a');
      a.className = 'btn open-link';
      a.href = raw.trim();
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = embed.kind === 'spotify' ? '🎵 Open in Spotify ↗' : '▶ Open in YouTube ↗';
      const note = document.createElement('p');
      note.className = 'hint';
      note.textContent = 'Opens in a new tab. Keep it playing while you write here.';
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

  const panel = $('decorPanel');
  function togglePanel(open) {
    panel.hidden = !open;
    $('decorBtn').setAttribute('aria-expanded', String(open));
  }
  $('decorBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    togglePanel(panel.hidden);
  });
  document.addEventListener('click', (e) => {
    if (!panel.hidden && !panel.contains(e.target)) togglePanel(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') togglePanel(false);
  });

  // ---------- init ----------
  editor.value = state.text;
  $('title').value = state.title;
  state.lastCount = countWords(state.text);
  buildSwatches();
  applyTheme();
  syncGoalInputs();
  renderStats();
  renderGoals();
  renderPomo();
  if (state.music) {
    $('musicUrl').value = state.music;
    playMusic(state.music, false);
  }

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
