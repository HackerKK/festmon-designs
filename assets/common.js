/* FestMon — макеты панели оператора. Общие фейковые данные и помощники.
 * Только UI: никакой связи с движком. Кнопки меняют лишь вид макета. */
(function () {
  "use strict";

  // ---------- фейковая программа ----------
  const PROGRAM = [
    { n: "1.1", nom: "ГД", title: "Куки, Сус", sub: "Кукольный вальс", dur: 222, kind: "mp4", hue: 330, status: "done" },
    { n: "1.2", nom: "ОРИДЖ", title: "Rinchyryn", sub: "Танец теней", dur: 195, kind: "mp3", hue: 200, status: "done" },
    { n: "1.3", nom: "ОВ", title: "Necrophagous", sub: "Ночная смена", dur: 248, kind: "mp4", hue: 0, status: "live" },
    { n: "1.4", nom: "ОВ", title: "Pook", sub: "Белый кролик", dur: 176, kind: "mp3", hue: 280, status: "next" },
    { n: "1.5", nom: "ОВ", title: "Мизучка", sub: "Сон в летнюю ночь", dur: 204, kind: "mp3", hue: 160, status: "queued" },
    { n: "1.6", nom: "ОВ", title: "Im star", sub: "Звезда", dur: 231, kind: "mp4", hue: 45, status: "queued" },
    { n: "", nom: "", title: "Антракт", sub: "15 минут · фоновая музыка", dur: 900, kind: "break", hue: 250, status: "queued" },
    { n: "1.9", nom: "ГД", title: "HIF, Minufe", sub: "Двое в городе", dur: 260, kind: "mp4", hue: 185, status: "queued" },
    { n: "2.1", nom: "ОЗ", title: "Нацумэ", sub: "Тетрадь дружбы", dur: 189, kind: "mp3", hue: 20, status: "queued" },
    { n: "2.2", nom: "ОЗ", title: "Беннет", sub: "Сумерки", dur: 213, kind: "mp4", hue: 215, status: "queued" },
    { n: "2.3", nom: "ОЗ", title: "Krevetka", sub: "Морской бриз", dur: 167, kind: "mp3", hue: 300, status: "queued" },
    { n: "2.4", nom: "ГД", title: "Сакура-тим", sub: "Ханами", dur: 242, kind: "mp4", hue: 345, status: "queued" },
    { n: "2.5", nom: "ОРИДЖ", title: "Лис и Ворон", sub: "Басня", dur: 201, kind: "mp3", hue: 95, status: "queued" },
  ];

  // Реквизиты номера: свет, что вынести на сцену, особые пожелания.
  const REQ = {
    "1.1": { light: "Тёплый общий, без стробо", props: ["2 стула"], wish: "" },
    "1.2": { light: "Контровой синий, дым", props: [], wish: "Начать в темноте, свет по первой ноте" },
    "1.3": { light: "Красный заливной, пушка на солиста", props: ["Стойка микрофона", "Бутафорский гроб"], wish: "Не включать заставку между частями" },
    "1.4": { light: "Холодный белый, мягкий", props: ["Кресло", "Плюшевый кролик (у участника)"], wish: "Выход слева, кресло поставить по центру до GO" },
    "1.5": { light: "Зелёный + звёзды гобо", props: ["Ширма"], wish: "" },
    "1.6": { light: "Полный свет, стробо на припеве", props: [], wish: "Участнику нужна радиосистема — проверить батарейки" },
    "1.9": { light: "Городской: жёлтый + синий", props: ["Скамейка", "Фонарь"], wish: "Двое выходят с разных сторон" },
    "2.1": { light: "Тёплый общий", props: ["Столик", "Тетрадь"], wish: "" },
    "2.2": { light: "Сине-фиолетовый, дым", props: [], wish: "Затемнение 3 с перед музыкой" },
    "2.3": { light: "Бирюзовый, волны", props: ["Сеть (декор)"], wish: "" },
    "2.4": { light: "Розовый, лепестки (конфетти-пушка)", props: ["Конфетти-пушка", "Ветка сакуры ×4"], wish: "После номера — уборка сцены 1 мин" },
    "2.5": { light: "Лесной зелёный", props: ["Пенёк"], wish: "" },
  };
  PROGRAM.forEach((p) => { p.req = REQ[p.n] || null; });

  const FILES = [
    { dir: "выступления", items: ["1.1 ГД Куки, Сус.mp4", "1.2 ОРИДЖ Rinchyryn.mp3", "1.3 ОВ Necrophagous.mp4", "1.4 ОВ Pook.mp3", "1.5 ОВ Мизучка.mp3", "1.6 ОВ Im star.mp4"] },
    { dir: "экран", items: ["заставка_фестиваль.png", "антракт_15мин.mp4", "спонсоры_loop.mp4", "закрытие_1.1.png"] },
    { dir: "звук", items: ["гонг.wav", "аплодисменты.wav", "тишина_5с.wav"] },
  ];

  const BED = [
    { t: "Lo-fi Lobby", a: "FestMon bed", dur: 184 },
    { t: "Sakura Breeze", a: "FestMon bed", dur: 211 },
    { t: "Neon Corridor", a: "FestMon bed", dur: 167 },
    { t: "Tea Ceremony", a: "FestMon bed", dur: 240 },
    { t: "Pixel Rain", a: "FestMon bed", dur: 198 },
  ];

  const QUICK = [
    { label: "Гонг", icon: "🔔", kind: "sfx", key: "Q" },
    { label: "Аплодисменты", icon: "👏", kind: "sfx", key: "W" },
    { label: "Спонсоры", icon: "🖼", kind: "img", key: "E" },
    { label: "QR-голосование", icon: "▦", kind: "img", key: "R" },
    { label: "Объявление", icon: "📣", kind: "text", key: "T" },
    { label: "Тишина", icon: "🔇", kind: "sfx", key: "Y" },
  ];

  const REQUESTS = [
    { what: "1.5 Мизучка", to: "перед 1.4", who: "закулисье", ago: "2 мин" },
    { what: "2.3 Krevetka", to: "перед 2.1", who: "жюри", ago: "6 мин" },
    { what: "1.6 Im star", to: "снять с программы", who: "участник", ago: "11 мин" },
  ];

  const PLUGINS = [
    { name: "VK — сообщество", state: "ok", note: "пост «Сейчас на сцене» · 2 мин назад", on: true },
    { name: "Webhook табло", state: "ok", note: "200 OK · 14 мс", on: true },
    { name: "Файл now_playing.txt", state: "ok", note: "для OBS", on: true },
    { name: "Telegram-канал", state: "warn", note: "токен не задан", on: false },
  ];

  // ---------- помощники ----------
  function mmss(s) {
    s = Math.max(0, Math.round(s));
    const m = Math.floor(s / 60), r = s % 60;
    return m + ":" + String(r).padStart(2, "0");
  }

  const coverCache = {};
  /** Фейковая обложка: SVG-градиент с номером и глифом (без внешних картинок). */
  function cover(item) {
    const key = item.n + item.title;
    if (coverCache[key]) return coverCache[key];
    const h = item.hue, h2 = (h + 50) % 360;
    const glyph = item.kind === "break" ? "☕" : item.kind === "mp3" ? "♪" : "▶";
    const label = item.n || "—";
    const svg =
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 90'>` +
      `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
      `<stop offset='0' stop-color='hsl(${h},70%,42%)'/><stop offset='1' stop-color='hsl(${h2},65%,18%)'/></linearGradient>` +
      `<radialGradient id='r' cx='.75' cy='.3' r='.6'><stop offset='0' stop-color='hsl(${h2},90%,70%)' stop-opacity='.55'/><stop offset='1' stop-color='hsl(${h2},90%,70%)' stop-opacity='0'/></radialGradient></defs>` +
      `<rect width='160' height='90' fill='url(#g)'/><rect width='160' height='90' fill='url(#r)'/>` +
      `<circle cx='128' cy='62' r='34' fill='none' stroke='rgba(255,255,255,.12)' stroke-width='10'/>` +
      `<text x='10' y='24' font-family='Segoe UI,Arial' font-weight='700' font-size='15' fill='rgba(255,255,255,.92)'>${label}</text>` +
      `<text x='10' y='78' font-family='Segoe UI Symbol,Arial' font-size='22' fill='rgba(255,255,255,.75)'>${glyph}</text>` +
      `</svg>`;
    return (coverCache[key] = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
  }

  // ---------- состояние «эфира» (чисто визуальное) ----------
  const state = {
    playing: true,
    paused: false,
    standby: false,
    liveIdx: PROGRAM.findIndex((p) => p.status === "live"),
    elapsed: 71,
    master: 78,
    bed: 35,
  };

  function nextIdx() {
    for (let i = state.liveIdx + 1; i < PROGRAM.length; i++) return i;
    return -1;
  }

  const listeners = [];
  function onChange(fn) { listeners.push(fn); fn(state); }
  function emit() { listeners.forEach((fn) => fn(state)); }

  /** Транспорт макета: меняет только картинку, движка нет. */
  function transport(action) {
    switch (action) {
      case "play":
        state.playing = true; state.paused = false; state.standby = false; break;
      case "pause":
        if (state.playing) state.paused = !state.paused; break;
      case "stop":
        state.playing = false; state.paused = false; state.elapsed = 0; break;
      case "next": {
        const n = nextIdx();
        if (n < 0) break;
        PROGRAM.forEach((p, i) => {
          if (i < n) p.status = "done";
          else if (i === n) p.status = "live";
          else if (i === n + 1) p.status = "next";
          else p.status = "queued";
        });
        state.liveIdx = n; state.elapsed = 0; state.playing = true; state.paused = false; state.standby = false;
        break;
      }
      case "standby":
        state.standby = !state.standby; break;
    }
    toast(LABELS[action] + " — только макет, движок не подключён");
    emit();
  }
  const LABELS = { play: "▶ Пуск", pause: "❚❚ Пауза", stop: "■ Стоп", next: "⏭ Следующий", standby: "▣ Заставка" };

  function setLevel(kind, v) { state[kind] = v; emit(); }

  // тик: время номера и метр уровня
  let meterEls = [];
  /** Регистрирует метр: el — контейнер, у которого есть .fill (и опц. .peak), orient 'h'|'v'. */
  function meter(el, orient) { meterEls.push({ el, orient: orient || "h", peak: 0, peakT: 0 }); }

  setInterval(() => {
    if (state.playing && !state.paused) {
      const live = PROGRAM[state.liveIdx];
      state.elapsed = Math.min(live ? live.dur : 0, state.elapsed + 1);
      emit();
    }
  }, 1000);

  let t = 0;
  setInterval(() => {
    t += 1;
    const on = state.playing && !state.paused;
    const base = on ? (0.55 + 0.25 * Math.sin(t / 7) + Math.random() * 0.2) * (state.master / 100) : 0;
    meterEls.forEach((m, i) => {
      const lvl = Math.max(0, Math.min(1, base + (on ? (Math.random() - 0.5) * 0.12 + (i % 2) * 0.03 : 0)));
      if (lvl > m.peak || Date.now() - m.peakT > 1500) { m.peak = lvl; m.peakT = Date.now(); }
      const fill = m.el.querySelector(".fill"), peak = m.el.querySelector(".peak");
      const prop = m.orient === "v" ? "height" : "width";
      if (fill) fill.style[prop] = (lvl * 100).toFixed(1) + "%";
      if (peak) peak.style[m.orient === "v" ? "bottom" : "left"] = (m.peak * 100).toFixed(1) + "%";
      const db = lvl > 0.01 ? (20 * Math.log10(lvl)).toFixed(1) : "−∞";
      const lab = m.el.querySelector(".db");
      if (lab) lab.textContent = db + " dB";
    });
  }, 90);

  function clock(el) {
    const tick = () => { el.textContent = new Date().toLocaleTimeString("ru-RU"); };
    tick(); setInterval(tick, 1000);
  }

  // ---------- сохранение раскладки ----------
  const store = {
    get(key, def) {
      try { const v = localStorage.getItem("festmon-mock:" + key); return v == null ? def : JSON.parse(v); }
      catch (e) { return def; }
    },
    set(key, v) {
      try { localStorage.setItem("festmon-mock:" + key, JSON.stringify(v)); } catch (e) { /* приватный режим */ }
    },
  };

  // ---------- горячие клавиши ----------
  /** map: { "Space": fn, "ctrl+KeyK": fn, "F1": fn } — ключ по e.code. */
  function hotkeys(map) {
    document.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if ((tag === "input" || tag === "textarea") && e.code !== "Escape") return;
      const k = (e.ctrlKey ? "ctrl+" : "") + (e.altKey ? "alt+" : "") + (e.shiftKey ? "shift+" : "") + e.code;
      const fn = map[k];
      if (fn) { e.preventDefault(); fn(e); }
    });
  }

  // ---------- тост ----------
  let toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "fm-toast";
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1600);
  }

  const css = document.createElement("style");
  css.textContent =
    ".fm-toast{position:fixed;left:50%;bottom:22px;transform:translate(-50%,20px);opacity:0;pointer-events:none;" +
    "background:rgba(10,10,14,.92);color:#fff;font:600 13px/1.3 'Segoe UI',system-ui,sans-serif;padding:9px 16px;" +
    "border-radius:10px;border:1px solid rgba(255,255,255,.14);transition:.2s;z-index:9999}" +
    ".fm-toast.show{opacity:1;transform:translate(-50%,0)}";
  document.head.appendChild(css);

  /** Центрирует el внутри его прокручиваемого контейнера box, не трогая окно
   *  (scrollIntoView прокручивал бы и страницу сравнения с iframe-превью). */
  function reveal(el, box, axis) {
    if (!el || !box) return;
    const e = el.getBoundingClientRect(), b = box.getBoundingClientRect();
    if (axis === "y") box.scrollTop += e.top - b.top - (b.height - e.height) / 2;
    else box.scrollLeft += e.left - b.left - (b.width - e.width) / 2;
  }

  window.FM = {
    PROGRAM, FILES, BED, QUICK, REQUESTS, PLUGINS,
    mmss, cover, state, nextIdx, onChange, transport, setLevel, meter, clock, store, hotkeys, toast, reveal,
  };
})();
