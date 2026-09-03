/* ============================================================
   Hermes Field Guide — app logic
   Tiny vanilla SPA: hash router, assessment, tailored plan,
   lesson reader, local progress. No dependencies.
   ============================================================ */

const LS_KEY = "hermes-field-guide-state-v2";

/* ---------------- state ---------------- */
function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const s = JSON.parse(raw);
      if (s && s.v === 2) return s;
    }
  } catch (e) { /* corrupt state -> fresh */ }
  return { v: 2, answers: null, done: {}, seenResults: false };
}
function saveState(s) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch (e) {}
}
const S = loadState();

/* ---------------- tiny dom helpers ---------------- */
function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html !== undefined) n.innerHTML = html;
  return n;
}
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
/* inline: **bold** and `code` */
function inline(s) {
  let out = esc(s);
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

const $view = document.getElementById("view");

function setView(html) {
  $view.innerHTML = html;
  $view.classList.remove("view-enter");
  void $view.offsetWidth; /* restart animation */
  $view.classList.add("view-enter");
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

/* ---------------- derived data ---------------- */
function getAnswers() { return S.answers; }

function statusOf(moduleId) {
  return moduleLevel(S.answers, moduleId);
}
function activeModules() {
  return MODULES.filter(m => statusOf(m.id) !== "done")
    .sort((a, b) => a.num - b.num);
}
function doneModules() {
  return MODULES.filter(m => statusOf(m.id) === "done");
}
function flatVisibleLessons() {
  const out = [];
  for (const m of activeModules()) {
    for (const l of visibleLessons(S.answers, m.id)) {
      l._modTitle = m.title; l._modNum = m.num;
      out.push(l);
    }
  }
  return out;
}
function doneCount() {
  return flatVisibleLessons().filter(l => S.done[l.id]).length;
}
function visibleTotal() { return flatVisibleLessons().length; }
function pctDone() {
  const t = visibleTotal();
  return t === 0 ? 0 : Math.round((doneCount() / t) * 100);
}
function courseComplete() {
  return S.answers && visibleTotal() > 0 && doneCount() === visibleTotal();
}

const STATUS_META = {
  full:  { label: "To learn",   cls: "status-full" },
  topup: { label: "Top-up",     cls: "status-topup" },
  done:  { label: "In your routine", cls: "status-done" }
};

function statusPill(moduleId) {
  const st = STATUS_META[statusOf(moduleId)];
  return `<span class="status-pill ${st.cls}">${st.label}</span>`;
}

function tagMeta(l) {
  if (l.tag === "new") return { label: "New ground", cls: "tag-topup" };
  if (l.tag === "action") return { label: "Do it now", cls: "tag-action" };
  return { label: "Core", cls: "tag-core" };
}

/* ---------------- masthead ---------------- */
function refreshMast() {
  const chip = document.getElementById("mastProgress");
  const reassess = document.getElementById("reassessBtn");
  if (!chip) return;
  if (S.answers) {
    chip.hidden = false;
    const t = visibleTotal();
    const txt = courseComplete()
      ? "Course complete"
      : (t === 0 ? "Plan ready" : `${doneCount()} of ${t} lessons done`);
    document.getElementById("mastProgressText").textContent = txt;
    chip.classList.toggle("is-complete", courseComplete());
    reassess.hidden = false;
  } else {
    chip.hidden = true;
    reassess.hidden = true;
  }
}

/* ---------------- blocks renderer ---------------- */
function renderBlocks(blocks) {
  let h = "";
  for (const b of blocks) {
    if (b.h) h += `<h3>${inline(b.h)}</h3>`;
    else if (b.p) h += `<p>${inline(b.p)}</p>`;
    else if (b.ul) {
      h += "<ul>";
      for (const item of b.ul) h += `<li>${inline(item)}</li>`;
      h += "</ul>";
    } else if (b.code) {
      h += `<pre><code>${esc(b.code)}</code></pre>`;
    } else if (b.callout) {
      const c = b.callout;
      h += `<div class="callout ${c.t}"><div class="c-label">${esc(c.label)}</div><p style="margin:0">${inline(c.text)}</p></div>`;
    }
  }
  return h;
}

/* signature progress block, styled like Hermes' own memory dump */
function memBlock() {
  const done = doneModules();
  const active = activeModules();
  const pct = pctDone();
  const used = S.answers ? `${pct}% — ${doneCount()}/${visibleTotal()} lessons done` : "no answers yet — take the assessment";
  let h = `<b>COURSE MEMORY</b> (your plan) <span class="${courseComplete() ? "m-good" : "m-dim"}">[${used}]</span>\n`;
  if (!S.answers) {
    h += `No assessment yet <span class="m-dim">§</span> answer 6 questions to tailor the course`;
  } else {
    const routine = done.map(m => m.label).join(" ");
    const toLearn = active.map(m => m.label).join(" ");
    h += `<span class="m-good">In your routine</span> § ${esc(routine || "— none yet")}\n`;
    h += `<span class="m-warn">Still to learn</span> § ${esc(toLearn || "— nothing!")}`;
  }
  return `<div class="mem-block">${h}</div>`;
}

/* ---------------- views ---------------- */
function viewHome() {
  const answered = !!S.answers;
  let hero;
  if (!answered) {
    hero = `
      <section class="hero">
        <div class="eyebrow">A course that starts where you are</div>
        <h1>Most of this you already do.<br><span class="u">Let's find the rest.</span></h1>
        <p class="lede">Hermes can do a lot more than you're using it for. Answer six quick questions about how you actually use it — pre-answered from what I know about your setup — and the course hides everything that's already routine and teaches only the gaps.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#/assess">Find my gaps</a>
          <a class="btn btn-secondary" href="#/modules">Preview the course</a>
        </div>
      </section>
      <div class="steps">
        <div class="step"><div class="step-n">Step 1</div><h3>Tell it what you do</h3><p>Six questions, one minute. Answers are pre-filled from your real setup — change anything.</p></div>
        <div class="step"><div class="step-n">Step 2</div><h3>Get your plan</h3><p>Modules you've mastered drop out of the course. What's left is your actual gap list.</p></div>
        <div class="step"><div class="step-n">Step 3</div><h3>Learn by doing</h3><p>Short plain-English lessons with real exercises you run against your own Hermes.</p></div>
      </div>
      <div class="bar-seg">
        <div class="b-label"><span>Everything stays on this device</span><span>No account · no tracking</span></div>
        <p style="margin:0;color:var(--muted);font-size:14.5px;line-height:1.55">Your answers and progress are saved in this browser only. Nothing is sent anywhere. The course is built around your real setup — your profiles, your jobs, your machines — because generic tutorials are why you're still reading them.</p>
      </div>`;
  } else {
    const first = flatVisibleLessons()[0];
    const firstLink = first ? `#/lesson/${first.id}` : "#/modules";
    hero = `
      <section class="hero">
        <div class="eyebrow">Your plan is ready</div>
        <h1>${courseComplete() ? "Course complete. <span class=\"u\">Nicely done.</span>" : "Here's what's actually left."}</h1>
        <p class="lede">${courseComplete()
          ? "Every lesson on your plan is done. The course will shrink as you grow — re-run the assessment in a couple of months and watch the gaps close."
          : doneModules().length
            ? `${visibleTotal()} lessons across ${activeModules().length} modules are worth your time. ${doneModules().length} area${doneModules().length === 1 ? "" : "s"} you already have locked in are tucked out of the way.`
            : `${visibleTotal()} lessons across ${activeModules().length} modules. You didn't mark anything as “already doing” — so everything below is fair game. If any of it feels familiar, re-run the assessment and be generous with yourself.`}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="${firstLink}">${courseComplete() ? "Review your modules" : "Continue learning"}</a>
          <a class="btn btn-ghost" href="#/assess">Adjust my answers</a>
        </div>
      </section>
      <div class="bar-seg">
        <div class="b-label"><span>Course progress</span><span>${doneCount()} / ${visibleTotal()} lessons</span></div>
        <div class="bar">
          <i class="b-green" style="width:${doneCount() > 0 ? Math.max(3, (doneCount() / Math.max(visibleTotal(), 1)) * 100) : 0}%"></i>
        </div>
      </div>
      ${memBlock()}`;
  }

  const modCards = (MODULES).map(m => moduleCardHtml(m, false)).join("");
  const doneCardSection = doneModules().length
    ? `<div class="done-wrap">
        <button class="done-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.setAttribute('aria-expanded', this.getAttribute('aria-expanded')==='true'?'false':'true')" aria-expanded="false">
          <span>Already in your routine — ${doneModules().length} module${doneModules().length === 1 ? "" : "s"} hidden</span>
          <span class="chev">▾</span>
        </button>
        <div class="done-list">${doneModules().map(m => moduleCardHtml(m, false)).join("")}</div>
      </div>` : "";

  const moduleList = activeModules().length
    ? `<div class="sec-head"><h2>${answered ? "Your plan" : "The course"}</h2><p>${answered ? "What's left, in order. Full lessons marked “New ground”, drills marked “Do it now”." : "Six modules, each a handful of short lessons. The assessment tailors which ones you see."}</p></div>
       <div class="mod-grid">${modCards}</div>`
    : (answered ? `<div class="sec-head"><h2>Nothing left to learn</h2><p>Every module is in your routine — either re-run the assessment with stricter honesty, or start applying the habits. That's the real course.</p></div>` : "");

  setView(`${hero}${moduleList}${doneCardSection}`);
  refreshMast();
}

function moduleCardHtml(m, minimal) {
  const lvl = statusOf(m.id);
  const vis = visibleLessons(S.answers, m.id);
  const doneIn = vis.filter(l => S.done[l.id]).length;
  const href = lvl === "done" ? "#/module/" + m.id : "#/module/" + m.id;
  return `
    <a class="mod-card" href="${href}">
      <div class="m-num">${m.num}</div>
      <div class="m-body">
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.sub)}</p>
      </div>
      <div class="m-meta">
        ${statusPill(m.id)}
        ${lvl !== "done" ? `<span>${doneIn}/${vis.length} lessons · ${esc(m.mins)}</span>` : ""}
      </div>
    </a>`;
}

function viewModules() {
  const doneCardSection = doneModules().length
    ? `<div class="done-wrap">
        <button class="done-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.setAttribute('aria-expanded', this.getAttribute('aria-expanded')==='true'?'false':'true')" aria-expanded="false">
          <span>In your routine — ${doneModules().length} module${doneModules().length === 1 ? "" : "s"} (${doneModules().map(m => m.label).join(", ")})</span>
          <span class="chev">▾</span>
        </button>
        <div class="done-list">${doneModules().map(m => moduleCardHtml(m)).join("")}</div>
      </div>` : "";

  let body;
  if (activeModules().length) {
    body = `
      <div class="sec-head" style="margin-top:6px"><h2>Your plan</h2>
      <p>${S.answers
        ? "What's left, in order. Tap a module to start. Re-run the assessment any time and the plan reshapes as you grow."
        : "Previewing with the default tailoring. Take the assessment to tune it to exactly what you do."}</p></div>
      <div class="mod-grid">${activeModules().map(m => moduleCardHtml(m)).join("")}</div>`;
  } else {
    body = `<div class="sec-head" style="margin-top:6px"><h2>Nothing left to learn</h2>
      <p>Every module is in your routine. Re-run the assessment with stricter honesty, or start living the habits — that's the real course.</p></div>`;
  }
  setView(body + doneCardSection);
  refreshMast();
}

/* ---------------- assessment ---------------- */
let qIdx = 0;
let draftAnswers = {};
const qModules = {}; QUESTIONS.forEach(q => { qModules[q.id] = q.moduleId; });

function viewAssess() {
  draftAnswers = Object.assign({}, DEFAULT_ANSWERS, S.answers || {});
  qIdx = 0;
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[qIdx];
  const prev = QUESTIONS[qIdx - 1];
  const curVal = draftAnswers[q.id] || null;
  const opts = q.options.map(o => `
    <button class="q-opt ${curVal === o.v ? "sel" : ""}" data-v="${o.v}">
      <span class="q-radio"></span>
      <span><span class="q-opt-t">${esc(o.label)}</span>
      ${o.d ? `<span class="q-opt-d">${esc(o.d)}</span>` : ""}</span>
    </button>`).join("");
  const pct = Math.round(((qIdx) / QUESTIONS.length) * 100);
  setView(`
    <div class="assess-progress">
      <div class="a-row"><span>Question ${qIdx + 1} of ${QUESTIONS.length}</span><span>${pct}%</span></div>
      <div class="assess-track"><i style="width:${pct}%"></i></div>
    </div>
    <div class="assess-pre-note">
      <span>✦</span>
      <span>These are pre-answered from what I know about your setup — trust them or change them, they're just starting points. Everything stays on this device.</span>
    </div>
    <div class="q-card">
      <div class="q-k">Module ${MODULES.find(m => m.id === q.moduleId).num} of 6 · ${esc(MODULES.find(m => m.id === q.moduleId).title)}</div>
      <h2>${esc(q.q)}</h2>
      ${q.hint ? `<p class="q-hint">${esc(q.hint)}</p>` : `<p class="q-hint">Be honest — the course is only as tailored as your answers.</p>`}
      <div class="q-opts">${opts}</div>
      <div class="q-nav">
        <div class="note">${prev ? "" : "No wrong answers."}</div>
        <div style="display:flex;gap:8px">
          ${qIdx > 0 ? `<button class="btn btn-secondary" id="qBack">Back</button>` : ""}
          <button class="btn btn-primary" id="qNext" ${curVal ? "" : "disabled"}>${qIdx === QUESTIONS.length - 1 ? "See my plan" : "Next"}</button>
        </div>
      </div>
    </div>`);
  document.getElementById("qNext").style.opacity = curVal ? 1 : .5;
  document.querySelectorAll(".q-opt").forEach(b => {
    b.addEventListener("click", () => {
      draftAnswers[q.id] = b.dataset.v;
      document.querySelectorAll(".q-opt").forEach(x => x.classList.toggle("sel", x === b));
      const n = document.getElementById("qNext");
      n.disabled = false; n.style.opacity = 1;
    });
  });
  const next = document.getElementById("qNext");
  if (next) next.addEventListener("click", () => {
    if (qIdx < QUESTIONS.length - 1) { qIdx++; renderQuestion(); }
    else finishAssessment();
  });
  const back = document.getElementById("qBack");
  if (back) back.addEventListener("click", () => { qIdx--; renderQuestion(); });
  refreshMast();
}

function finishAssessment() {
  S.answers = Object.assign({}, draftAnswers);
  S.seenResults = true;
  saveState(S);
  location.hash = "#/results";
}

/* ---------------- results ---------------- */
function viewResults() {
  const fullMods = activeModules().filter(m => statusOf(m.id) === "full");
  const topMods = activeModules().filter(m => statusOf(m.id) === "topup");
  const first = flatVisibleLessons()[0];
  const startHref = first ? `#/lesson/${first.id}` : "#/modules";
  const totalMins = flatVisibleLessons().reduce((acc, l) => acc + (parseInt(l.mins) || 5), 0);
  let summary = "";
  if (fullMods.length) summary += `<p><strong>${fullMods.length === activeModules().length ? "Start from scratch" : "Fresh ground"}:</strong> ${fullMods.map(m => esc(m.title)).join(" · ")} — full lessons, from the ground up.</p>`;
  if (topMods.length) summary += `<p><strong>Top-ups:</strong> ${topMods.map(m => esc(m.title)).join(" · ")} — you've got the basics; here's the missing 20%.</p>`;
  if (doneModules().length) summary += `<p><strong>Already yours:</strong> ${doneModules().map(m => esc(m.title)).join(" · ")} — hidden from the plan.</p>`;

  setView(`
    <section class="hero results-hero">
      <div class="big">🧭</div>
      <h1>Your custom plan is ready</h1>
      <p>${flatVisibleLessons().length} lessons across ${activeModules().length} modules — roughly ${Math.max(10, totalMins)} minutes of reading plus exercises you run against your own Hermes.</p>
      <div class="hero-actions" style="justify-content:center">
        <a class="btn btn-primary" href="${startHref}">Start the first lesson</a>
        <a class="btn btn-secondary" href="#/modules">Browse the plan</a>
      </div>
    </section>
    <div class="congrats-card">
      <h2>What changed</h2>
      ${summary}
    </div>
    ${memBlock()}
    <div class="bar-seg">
      <div class="b-label"><span>Where your time goes</span><span>${fullMods.length} to learn · ${topMods.length} top-ups</span></div>
      <div class="bar">
        <i class="b-amber" style="width:${activeModules().length ? (fullMods.length / activeModules().length) * 100 : 0}%"></i>
        <i class="b-petrol" style="width:${activeModules().length ? (topMods.length / activeModules().length) * 100 : 0}%"></i>
        <i class="b-green" style="width:${MODULES.length ? (doneModules().length / MODULES.length) * 100 : 0}%"></i>
      </div>
      <div class="b-legend">
        <span><i class="lg-amber"></i> Learn fresh</span>
        <span><i class="lg-petrol"></i> Top-up</span>
        <span><i class="lg-green"></i> Already yours</span>
      </div>
    </div>`);
  refreshMast();
}

/* ---------------- module page ---------------- */
function viewModule(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) { viewModules(); return; }
  const lvl = statusOf(m.id);
  const vis = visibleLessons(S.answers, m.id);
  const why = lvl === "full" ? m.whyFull : m.whyTop;
  const rows = vis.map(l => {
    const done = !!S.done[l.id];
    const tm = tagMeta(l);
    return `
      <a class="lesson-row ${done ? "done" : ""}" href="#/lesson/${l.id}">
        <span class="l-check">✓</span>
        <span class="l-body">
          <h3>${l.n}. ${esc(l.title)}</h3>
          <p>${esc(l.summary)}</p>
        </span>
        <span class="l-meta">
          <span class="tag ${tm.cls}">${tm.label}</span>
          <span>${esc(l.mins)}</span>
        </span>
      </a>`;
  }).join("");

  setView(`
    <div class="crumb"><a href="#/modules">← All modules</a></div>
    <section class="module-head">
      <span class="eyebrow">Module ${m.num} of 6</span>
      <h1>${esc(m.title)}</h1>
      <p class="m-why">${esc(why)}</p>
      <div class="m-chips">
        ${statusPill(m.id)}
        <span class="chip time">${esc(m.mins)}</span>
        <span class="chip lessons">${vis.length} lesson${vis.length === 1 ? "" : "s"} ${doneModules().includes(m) ? "" : `· ${vis.filter(l => S.done[l.id]).length} done`}</span>
      </div>
    </section>
    <div class="lesson-list">${rows}</div>
    ${lvl !== "done" ? `
    <p style="margin-top:18px;color:var(--muted);font-size:14px">Seeing too much or too little? <a href="#/assess">Re-run the assessment</a> — it reshapes this plan.</p>` : ""}
  `);
  refreshMast();
}

/* ---------------- lesson page ---------------- */
function viewLesson(lessonId) {
  const l = LESSONS[lessonId];
  if (!l) { viewHome(); return; }
  const m = MODULES.find(x => x.id === l.moduleId);
  const flat = flatVisibleLessons();
  const idx = flat.findIndex(x => x.id === lessonId);
  const prevL = idx > 0 ? flat[idx - 1] : null;
  const nextL = idx < flat.length - 1 ? flat[idx + 1] : null;
  const tm = tagMeta(l);
  const isDone = !!S.done[lessonId];

  const docsHtml = (l.docs && l.docs.length)
    ? `<div class="deep-links"><strong>Go deeper:</strong> ${l.docs.map(d => `<a href="${d.url}" target="_blank" rel="noopener">${esc(d.label)}</a>`).join(" · ")}</div>` : "";

  const exHtml = l.ex ? `
    <div class="ex-box">
      <h3>Over to you</h3>
      ${l.ex.p ? `<p>${inline(l.ex.p)}</p>` : ""}
      <ol style="margin:0 0 4px;padding-left:22px">
        ${l.ex.steps.map(s => `<li style="margin-bottom:8px">${inline(s)}</li>`).join("")}
      </ol>
      ${l.ex.note ? `<div class="ex-note">${inline(l.ex.note)}</div>` : ""}
    </div>` : "";

  const nav = `
    <nav class="lesson-nav">
      ${prevL ? `<a class="nav-btn prev" href="#/lesson/${prevL.id}"><small>← Previous</small><b>${esc(prevL.title)}</b></a>` : `<a class="nav-btn prev" href="#/module/${m.id}"><small>← Module ${m.num}</small><b>${esc(m.title)}</b></a>`}
      ${nextL ? `<a class="nav-btn next" href="#/lesson/${nextL.id}"><small>Next →</small><b>${esc(nextL.title)}</b></a>` : `<a class="nav-btn next" href="#/modules"><small>Finish →</small><b>Back to the plan</b></a>`}
    </nav>`;

  setView(`
    <div class="crumb"><a href="#/module/${m.id}">← Module ${m.num}: ${esc(m.title)}</a></div>
    <section class="lesson-head">
      <h1>${l.n}. ${esc(l.title)}</h1>
      <div class="m-chips">
        <span class="tag ${tm.cls}">${tm.label}</span>
        <span class="chip time">${esc(l.mins)}</span>
        ${isDone ? `<span class="status-pill status-done">Done</span>` : ""}
      </div>
    </section>
    <div class="prose">${renderBlocks(l.blocks)}</div>
    ${exHtml}
    <div class="lesson-foot">
      ${docsHtml}
      <button class="complete-btn ${isDone ? "done-state" : ""}" id="completeBtn" data-id="${lessonId}">
        ${isDone ? "✓ Completed — tap to undo" : "Mark as done"}
      </button>
      ${nav}
    </div>
  `);
  document.getElementById("completeBtn").addEventListener("click", () => {
    const id = lessonId;
    if (S.done[id]) delete S.done[id]; else S.done[id] = true;
    saveState(S);
    viewLesson(id);
    refreshMast();
  });
  refreshMast();
}

/* ---------------- router ---------------- */
function route() {
  const hash = location.hash || "#/home";
  if (hash.startsWith("#/lesson/")) {
    const id = hash.slice("#/lesson/".length);
    viewLesson(id);
  } else if (hash.startsWith("#/module/")) {
    viewModule(hash.slice("#/module/".length));
  } else {
    switch (hash) {
      case "#/assess": viewAssess(); break;
      case "#/results": S.answers ? viewResults() : viewHome(); break;
      case "#/modules": viewModules(); break;
      default: viewHome();
    }
  }
}

document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav) { location.hash = "#/" + nav.dataset.nav; }
});
window.addEventListener("hashchange", route);

/* init */
document.querySelector(".brand").addEventListener("click", (e) => {
  if (location.hash !== "#/home") e.preventDefault();
  location.hash = "#/home";
});
route();
