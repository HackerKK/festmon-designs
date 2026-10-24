/* Содержимое второстепенных панелей — общая разметка для всех вариантов.
 * Каждый вариант сам стилизует классы .p-*. Логики нет: клики дают тост. */
(function () {
  "use strict";
  const { PROGRAM, FILES, BED, QUICK, REQUESTS, PLUGINS, mmss, cover } = FM;

  const PANELS = [
    { id: "inspector", title: "Инспектор номера", short: "Инспектор", icon: "◧", key: "F1" },
    { id: "files", title: "Файлы", short: "Файлы", icon: "▤", key: "F2" },
    { id: "bed", title: "Музыка фона", short: "Фон", icon: "♫", key: "F3" },
    { id: "quick", title: "Быстрые кнопки", short: "Кнопки", icon: "✦", key: "F4" },
    { id: "requests", title: "Заявки", short: "Заявки", icon: "✉", key: "F5", badge: REQUESTS.length },
    { id: "plugins", title: "Плагины", short: "Плагины", icon: "⚙", key: "F6" },
  ];

  function range(label, val, unit, max) {
    return `<label class="p-field"><span>${label}</span><input type="range" min="0" max="${max || 100}" value="${val}" oninput="this.nextElementSibling.textContent=this.value+'${unit}'"><b>${val}${unit}</b></label>`;
  }

  function inspector() {
    const sel = FM.state.sel != null ? FM.state.sel : FM.nextIdx();
    const item = PROGRAM[sel] || PROGRAM[0];
    return `
      <div class="p-insp-head">
        <img src="${cover(item)}" alt="">
        <div><div class="p-insp-n">${item.n} <span class="p-chip">${item.nom || "—"}</span></div>
        <div class="p-insp-t">${item.title}</div><div class="p-dim">${item.sub} · ${mmss(item.dur)} · ${item.kind.toUpperCase()}</div></div>
      </div>
      <div class="p-sec"><div class="p-sec-h">Аудио</div>
        ${range("Громкость", 0, " dB", 12)}${range("Нарастание", 3, "×0.1 с", 30)}${range("Затухание", 5, "×0.1 с", 30)}
      </div>
      <div class="p-sec"><div class="p-sec-h">Видео</div>
        ${range("Прозрачность", 100, "%")}
        <label class="p-field"><span>Размер</span><select><option>Вписать 1920×1080</option><option>Заполнить</option><option>Как есть</option></select></label>
      </div>
      <div class="p-sec"><div class="p-sec-h">Переход и закрытие</div>
        <label class="p-field"><span>Переход</span><select><option>Кроссфейд 0.8 с</option><option>Через чёрное</option><option>Резкий</option></select></label>
        <label class="p-field"><span>После номера</span><select><option>Картинка закрытия</option><option>Заставка</option><option>Сразу следующий</option></select></label>
      </div>
      <div class="p-sec"><div class="p-sec-h">Заметка ведущему</div><textarea rows="3">Участники выходят слева. Свет — синий.</textarea></div>`;
  }

  function files() {
    return `
      <input class="p-search" placeholder="Фильтр по имени…  (Ctrl+F)">
      ${FILES.map((d, i) => `
        <details class="p-tree" ${i < 2 ? "open" : ""}><summary>📁 ${d.dir} <span class="p-dim">${d.items.length}</span></summary>
          ${d.items.map((f) => `<div class="p-row p-file" draggable="true"><span class="p-ico">${/\.(mp4)$/.test(f) ? "🎬" : /\.(png)$/.test(f) ? "🖼" : "🎵"}</span><span class="p-grow">${f}</span><button class="p-mini" data-act="В программу">＋</button></div>`).join("")}
        </details>`).join("")}`;
  }

  function bed() {
    const cur = BED[1];
    return `
      <div class="p-now"><div class="p-dim">Сейчас в фоне</div><div class="p-now-t">${cur.t}</div>
        <div class="p-prog"><i style="width:42%"></i></div><div class="p-dim p-spread"><span>1:28</span><span>${mmss(cur.dur)}</span></div>
        <div class="p-btns"><button data-act="Фон: назад">⏮</button><button data-act="Фон: пауза">❚❚</button><button data-act="Фон: вперёд">⏭</button>
        <button class="on" data-act="Фон: по кругу">⟳ круг</button><button data-act="Фон: перемешать">⤮</button></div>
        <label class="p-field"><span>Уводить при номере</span><select><option>до 0% за 2 с</option><option>до 20%</option><option>не уводить</option></select></label>
      </div>
      <div class="p-sec-h">Плейлист фона</div>
      ${BED.map((b, i) => `<div class="p-row ${i === 1 ? "p-active" : ""}"><span class="p-ico">${i === 1 ? "▶" : i + 1}</span><span class="p-grow">${b.t}</span><span class="p-dim">${mmss(b.dur)}</span></div>`).join("")}`;
  }

  function quick() {
    return `<div class="p-quick-grid">${QUICK.map((q) => `
      <button class="p-quick p-q-${q.kind}" data-act="${q.label}"><span class="p-q-ico">${q.icon}</span><span>${q.label}</span><kbd>${q.key}</kbd></button>`).join("")}</div>
      <div class="p-dim p-hint">Клавиши Q–Y срабатывают, когда фокус не в поле ввода.</div>`;
  }

  function requests() {
    return REQUESTS.map((r) => `
      <div class="p-req"><div class="p-grow"><div class="p-req-t">${r.what} → <b>${r.to}</b></div><div class="p-dim">${r.who} · ${r.ago} назад</div></div>
        <button class="p-ok" data-act="Заявка принята">✓</button><button class="p-no" data-act="Заявка отклонена">✕</button></div>`).join("");
  }

  function plugins() {
    return PLUGINS.map((p) => `
      <div class="p-row p-plug"><span class="p-dot p-${p.state}"></span><div class="p-grow"><div>${p.name}</div><div class="p-dim">${p.note}</div></div>
        <label class="p-switch"><input type="checkbox" ${p.on ? "checked" : ""}><i></i></label></div>`).join("") +
      `<button class="p-wide" data-act="Окно «Плагины»">Настроить плагины…</button>`;
  }

  const RENDER = { inspector, files, bed, quick, requests, plugins };

  function render(id) { return RENDER[id](); }

  // клики по «пустым» кнопкам панелей — тост
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (b) FM.toast(b.dataset.act + " — только макет");
  });

  FM.PANELS = PANELS;
  FM.renderPanel = render;
})();
