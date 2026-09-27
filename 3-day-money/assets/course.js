/* =====================================================================
   Right Side of Money: 3-Day Introduction to Understanding Money
   Course engine: sign-up gate, progress, lesson flow, typed-answer
   scenario quizzes with an 80% pass rule, reflections, and tools.
   ===================================================================== */

/* ---------- SETTINGS: the only lines you need to edit ---------- */
const RSM_CONFIG = {
  // Your Formspree form ID (the part after /f/ in https://formspree.io/f/XXXXXXX)
  formspreeId: "xrpbgjbb",
  // Name and title printed on the completion certificate
  instructorName: "Darrell Thompson",
  instructorTitle: "Founder, Right Side of Money",
  // Logo file (put your logo at this path in the repository)
  logo: "assets/rsm-logo.png",
  siteUrl: "https://rightsideofmoney.com",
  bookUrl: "https://www.amazon.com/author/rightsideofmoney",
  courseName: "3-Day Introduction to Understanding Money",
  passMark: 0.8
};
/* ---------------------------------------------------------------- */

const RSM = (() => {
  const KEY = "rsm_3day_money_v1";
  const PAGES = [
    { key: "start", label: "Start", href: "index.html" },
    { key: "d1", label: "Day 1", href: "day-1.html", needs: null },
    { key: "d2", label: "Day 2", href: "day-2.html", needs: "d1" },
    { key: "d3", label: "Day 3", href: "day-3.html", needs: "d2" },
    { key: "final", label: "Final", href: "final.html", needs: "d3" },
    { key: "complete", label: "Certificate", href: "complete.html", needs: "final" }
  ];

  /* ---------- storage ---------- */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  let S = load();
  S.quiz = S.quiz || {}; S.reflect = S.reflect || {}; S.done = S.done || {};
  S.passed = S.passed || {}; S.scale = S.scale || {}; S.scores = S.scores || {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const norm = s => (s || "").toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").trim();
  const money = n => "$" + Math.round(n).toLocaleString("en-US");
  function toast(msg) {
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }

  /* ---------- Formspree ---------- */
  async function sendForm(payload) {
    if (!RSM_CONFIG.formspreeId) return true;
    try {
      const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 8000);
      const r = await fetch("https://formspree.io/f/" + RSM_CONFIG.formspreeId, {
        method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload), signal: ctrl.signal
      });
      clearTimeout(t); return r.ok;
    } catch (e) { return false; }
  }
  function retryPending() {
    if (S.pending && S.pending.length) {
      const list = S.pending; S.pending = [];
      list.forEach(async p => { if (!(await sendForm(p))) { S.pending.push(p); save(); } });
      save();
    }
  }
  async function queueSend(payload) {
    const ok = await sendForm(payload);
    if (!ok) { S.pending = S.pending || []; S.pending.push(payload); save(); }
    return ok;
  }

  /* ---------- header ---------- */
  function unlocked(key) {
    const p = PAGES.find(x => x.key === key);
    if (!p) return false;
    if (key === "start") return true;
    if (!S.student) return false;
    return !p.needs || !!S.passed[p.needs];
  }
  function header(current) {
    const h = $("#topbar"); if (!h) return;
    const tabs = PAGES.map(p => {
      const ok = unlocked(p.key);
      const done = p.key !== "start" && p.key !== "complete" && S.passed[p.key];
      return `<a class="daytab ${p.key === current ? "current" : ""} ${ok ? "" : "locked"}" href="${p.href}" ${ok ? "" : 'aria-disabled="true" tabindex="-1"'}>${done ? '<span class="tick">&#10003;</span>' : ""}${p.label}</a>`;
    }).join("");
    h.innerHTML = `<div class="topbar-in">
      <a class="brand" href="index.html" id="brand"><img src="${RSM_CONFIG.logo}" alt="Right Side of Money" onerror="this.parentNode.classList.add('nologo');this.remove()"><span class="wordmark">Right Side <em>of</em> Money</span></a>
      <span class="course-name">${RSM_CONFIG.courseName}</span>
      <nav class="daytabs" aria-label="Course days">${tabs}</nav></div>`;
  }

  /* ---------- gate ---------- */
  function lockScreen(msg, href, label) {
    const main = $("main") || document.body;
    main.innerHTML = `<div class="narrow"><div class="lockscreen"><p class="eyebrow">Not unlocked yet</p><h1>Almost there</h1><p>${msg}</p><a class="btn gold" href="${href}">${label}</a></div></div>`;
  }
  function guard(key) {
    header(key);
    if (!S.student) { lockScreen("Register with your name and email to open the course. It's free and takes ten seconds.", "index.html#signup", "Register to start"); return false; }
    const p = PAGES.find(x => x.key === key);
    if (p && p.needs && !S.passed[p.needs]) {
      const prev = PAGES.find(x => x.key === p.needs);
      lockScreen(`Finish ${prev.label} and score 80% or higher on its Knowledge Check to unlock this page.`, prev.href, "Go to " + prev.label);
      return false;
    }
    retryPending();
    return true;
  }

  /* ---------- grading ---------- */
  function grade(q, texts) {
    let allOk = true, anyHit = false; const nudges = [], wrongs = [];
    q.fields.forEach((f, k) => {
      const t = texts[k]; let hits = 0;
      f.groups.forEach(g => { if (g.re.some(r => r.test(t))) { hits++; anyHit = true; } else nudges.push(g.nudge); });
      if (hits < (f.need || f.groups.length)) {
        allOk = false;
        (f.wrong || []).forEach(w => { if (w.re.test(t)) wrongs.push(w.msg); });
      }
    });
    if (!allOk) (q.wrong || []).forEach(w => { if (w.re.test(texts.join(" "))) wrongs.push(w.msg); });
    if (allOk) return { status: "correct", nudges, wrongs: [] };
    return { status: anyHit ? "partial" : "miss", nudges, wrongs };
  }

  /* ---------- question cards ---------- */
  const LABEL = { new: "Not answered", correct: "Correct", partial: "Partly there", miss: "Try again", revealed: "Answer shown" };
  function modelHTML(q) {
    return `<div class="model"><h4>Model answer</h4><p>${q.model}</p>${q.why ? `<p class="why"><b>Why it matters:</b> ${q.why}</p>` : ""}</div>`;
  }
  function cardHTML(q, opts) {
    const st = S.quiz[q.id] || { status: "new", attempts: 0, answers: [] };
    const locked = st.status === "correct" || st.status === "revealed";
    const fields = q.fields.map((f, k) => {
      const id = `${q.id}_f${k}`; const val = esc((st.answers || [])[k] || "");
      const ro = locked ? "readonly" : "";
      return `<div class="field"><label for="${id}">${f.label || "Your answer"}</label>${f.multi === false
        ? `<input type="text" id="${id}" value="${val}" placeholder="${esc(f.placeholder || "")}" autocomplete="off" ${ro}>`
        : `<textarea id="${id}" placeholder="${esc(f.placeholder || "Type your answer in your own words...")}" ${ro}>${val}</textarea>`}</div>`;
    }).join("");
    return `<div class="qcard ${opts.mode === "apply" ? "apply" : ""} ${locked ? "locked" : ""}" id="card_${q.id}">
      <div class="q-head"><div><div class="q-num">${opts.label}</div><h3 class="q-title">${q.title}</h3></div>
      <span class="status ${st.status}" id="st_${q.id}">${LABEL[st.status]}</span></div>
      <div class="scenario">${q.scenario}</div>
      <p class="ask">${q.ask}</p>
      <div class="fields ${q.fields.length > 1 ? "two" : ""}">${fields}</div>
      <div class="q-actions" ${locked ? "hidden" : ""}>
        <button class="btn dark" type="button" data-act="check">Check answer</button>
        <button class="btn" type="button" data-act="hint">Hint</button>
        <button class="btn ghost" type="button" data-act="reveal" hidden>Show answer</button>
      </div>
      <p class="hintbox" hidden>${q.hint}</p>
      <div class="fbwrap" aria-live="polite">${st.status === "correct" ? `<div class="fb correct"><p class="v">You've got it.</p>${modelHTML(q)}</div>` : st.status === "revealed" ? `<div class="fb reveal">${modelHTML(q)}</div>` : ""}</div>
    </div>`;
  }
  function wireCard(q, opts, onChange) {
    const card = $("#card_" + q.id); if (!card) return;
    const fbw = $(".fbwrap", card), hint = $(".hintbox", card), rev = $('[data-act="reveal"]', card);
    const st = () => (S.quiz[q.id] = S.quiz[q.id] || { status: "new", attempts: 0, answers: [] });
    const inputs = q.fields.map((f, k) => $("#" + q.id + "_f" + k));
    inputs.forEach(el => {
      el.addEventListener("input", () => { st().answers = inputs.map(i => i.value); save(); });
      el.addEventListener("keydown", e => { if (e.key === "Enter" && (el.tagName === "INPUT" || e.metaKey || e.ctrlKey)) { e.preventDefault(); check(); } });
    });
    $('[data-act="hint"]', card).onclick = () => { hint.hidden = false; };
    rev.onclick = () => {
      const s = st(); s.status = "revealed"; save();
      fbw.innerHTML = `<div class="fb reveal">${modelHTML(q)}</div>`;
      finalize();
    };
    function finalize() {
      const s = st(); card.classList.add("locked"); inputs.forEach(i => i.readOnly = true);
      $(".q-actions", card).hidden = true; hint.hidden = true;
      const b = $("#st_" + q.id); b.textContent = LABEL[s.status]; b.className = "status " + s.status;
      onChange && onChange();
    }
    function check() {
      const s = st();
      const texts = inputs.map(i => norm(i.value));
      s.answers = inputs.map(i => i.value);
      if (texts.every(t => !t)) { fbw.innerHTML = `<div class="fb miss"><p class="v">Type an answer first.</p><p>Short is fine. Use your own words.</p></div>`; return; }
      s.attempts++;
      const r = grade(q, texts);
      if (r.status === "correct") {
        s.status = "correct"; save();
        fbw.innerHTML = `<div class="fb correct"><p class="v">${pick(["You've got it.", "That's it.", "Exactly right.", "Nailed it.", "Right on the money."], q.id)}</p>${modelHTML(q)}</div>`;
        finalize(); return;
      }
      s.status = r.status; save();
      let body = "";
      if (r.wrongs.length) body += `<p>${r.wrongs[0]}</p>`;
      if (r.status === "partial" && r.nudges.length) body += `<p>You're on the right track. Still missing:</p><ul>${r.nudges.map(n => `<li>${n}</li>`).join("")}</ul>`;
      if (r.status === "miss" && !r.wrongs.length) body += `<p>That doesn't match the key idea yet. ${s.attempts > 1 ? "Open the hint and give it one more try." : "Read the scenario again and try once more."}</p>`;
      if (opts.mode === "apply" && s.attempts >= 2) rev.hidden = false;
      if (opts.mode === "kc" && s.attempts >= 3 && q.review) body += `<p class="review-link">Stuck? <a href="${q.review.href}">Review: ${q.review.title}</a>, then come back. Your answers are saved.</p>`;
      if (s.attempts >= 2) hint.hidden = false;
      fbw.innerHTML = `<div class="fb ${r.status}"><p class="v">${r.status === "partial" ? "Partly there." : "Not yet."}</p>${body}</div>`;
      const b = $("#st_" + q.id); b.textContent = LABEL[s.status]; b.className = "status " + s.status;
      onChange && onChange();
    }
    $('[data-act="check"]', card).onclick = check;
  }
  function pick(arr, seed) { let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0; return arr[h % arr.length]; }

  /* ---------- Apply It slots (lesson-level practice) ---------- */
  function renderApply(QS) {
    $$(".apply-slot").forEach(slot => {
      const q = QS[slot.dataset.q]; if (!q) return;
      slot.innerHTML = cardHTML(q, { mode: "apply", label: "Apply it: real-life check" });
      wireCard(q, { mode: "apply" }, () => refreshNav());
    });
  }

  /* ---------- Knowledge checks (graded, 80% to pass) ---------- */
  function renderKC(QS, onPass) {
    $$(".kc").forEach(box => {
      const key = box.dataset.kc; const ids = box.dataset.questions.split(",").map(s => s.trim());
      const qs = ids.map(id => QS[id]);
      const need = Math.ceil(qs.length * RSM_CONFIG.passMark - 1e-9);
      box.innerHTML = `<div class="scoreboard" id="sb_${key}"></div>` +
        qs.map((q, i) => cardHTML(q, { mode: "kc", label: `Question ${i + 1} of ${qs.length}` })).join("") +
        `<div class="passbanner" id="pass_${key}" hidden></div>`;
      const update = () => {
        const n = qs.filter(q => (S.quiz[q.id] || {}).status === "correct").length;
        const pct = Math.round(100 * n / qs.length);
        S.scores[key] = { correct: n, total: qs.length, pct };
        const passedNow = n >= need;
        $("#sb_" + key).innerHTML = `<div><div class="big">${n} <small>of ${qs.length} correct &middot; ${pct}%</small></div>
          <div class="need">${passedNow ? "Passed. You've unlocked the next step." : `You need ${need} correct (80%) to move on. Retry any question as many times as you need.`}</div></div>
          <div class="pips">${qs.map(q => `<span class="pip ${(S.quiz[q.id] || {}).status || ""}"></span>`).join("")}</div>`;
        const pb = $("#pass_" + key);
        if (passedNow) {
          const first = !S.passed[key];
          S.passed[key] = true; save(); header(document.body.dataset.page);
          pb.hidden = false; pb.innerHTML = onPass(n, qs.length, pct);
          if (first) { toast("Knowledge Check passed"); if (key === "final") onFinalPass(n, qs.length, pct); }
        } else { save(); }
        refreshNav();
      };
      qs.forEach(q => wireCard(q, { mode: "kc" }, update));
      update();
    });
  }
  function onFinalPass(n, total, pct) {
    S.completedAt = S.completedAt || new Date().toISOString(); save();
    queueSend({
      _subject: "Course completed: " + RSM_CONFIG.courseName,
      event: "Completed course", name: S.student.name, email: S.student.email,
      course: RSM_CONFIG.courseName, final_score: `${n}/${total} (${pct}%)`,
      day1: S.scores.d1 ? S.scores.d1.pct + "%" : "", day2: S.scores.d2 ? S.scores.d2.pct + "%" : "", day3: S.scores.d3 ? S.scores.d3.pct + "%" : ""
    });
  }

  /* ---------- Reflections ---------- */
  function renderReflections() {
    $$(".reflect textarea").forEach(ta => {
      const id = ta.id; ta.value = S.reflect[id] || "";
      const flag = ta.parentNode.querySelector(".saved"); let t;
      ta.addEventListener("input", () => {
        S.reflect[id] = ta.value; save(); refreshNav();
        if (flag) { flag.textContent = ""; clearTimeout(t); t = setTimeout(() => flag.textContent = "Saved", 500); }
      });
    });
  }

  /* ---------- Self-rating scale ---------- */
  const SCALE = [
    "I can explain where money comes from and what gives it value.",
    "I understand how banks and the Federal Reserve affect my money.",
    "I know exactly how my debts work and have a plan to pay them down.",
    "I understand how inflation quietly shrinks my savings.",
    "I own assets that grow while I sleep, or I know how to start.",
    "I feel in control of my financial future."
  ];
  function renderScale(which) {
    $$(`.scale[data-scale="${which}"]`).forEach(box => {
      S.scale[which] = S.scale[which] || {};
      box.innerHTML = SCALE.map((s, i) => `<div class="scale-item"><p>${i + 1}. ${s}</p><div class="scale-opts" role="group" aria-label="Rate statement ${i + 1}">${[1, 2, 3, 4, 5].map(v => `<button type="button" data-i="${i}" data-v="${v}" aria-pressed="${S.scale[which][i] === v}">${v}</button>`).join("")}</div></div>`).join("") +
        `<div class="scale-legend"><span>1 = Not at all</span><span>5 = Absolutely</span></div>`;
      box.addEventListener("click", e => {
        const b = e.target.closest("button[data-v]"); if (!b) return;
        S.scale[which][b.dataset.i] = +b.dataset.v; save();
        $$(`button[data-i="${b.dataset.i}"]`, box).forEach(x => x.setAttribute("aria-pressed", x === b));
        refreshNav(); box.dispatchEvent(new CustomEvent("rated", { bubbles: true }));
      });
    });
  }
  const scaleDone = which => S.scale[which] && SCALE.every((_, i) => S.scale[which][i]);

  /* ---------- Lesson flow ---------- */
  let flow = null;
  function sectionReady(sec) {
    const why = [];
    $$(".apply-slot", sec).forEach(sl => { const s = (S.quiz[sl.dataset.q] || {}).status; if (s !== "correct" && s !== "revealed") why.push("Answer the real-life check above to continue."); });
    $$(".kc", sec).forEach(k => { if (!S.passed[k.dataset.kc]) why.push("Score 80% or higher on the Knowledge Check to continue."); });
    $$(".reflect textarea[data-required]", sec).forEach(t => { if ((S.reflect[t.id] || "").trim().length < 15) why.push("Write a few honest sentences for the first reflection prompt to continue."); });
    $$(".scale[data-scale]", sec).forEach(s => { if (!scaleDone(s.dataset.scale)) why.push("Rate all six statements to continue."); });
    return why;
  }
  function flowInit(dayKey, nextHref, nextLabel) {
    const secs = $$("section.lesson[data-id]");
    S.done[dayKey] = S.done[dayKey] || [];
    flow = { dayKey, secs, nextHref, nextLabel, idx: 0 };
    const side = $("#sidebar");
    if (side) {
      side.innerHTML = `<h2>${side.dataset.title}</h2><p class="sub">${side.dataset.sub}</p><div class="meter"><span id="meter"></span></div>
        <button class="toc-toggle" type="button" id="tocToggle">Show all lessons</button>
        <ol class="toc">${secs.map((s, i) => `<li><button type="button" data-i="${i}"><span class="mark">${i + 1}</span><span><span class="kind">${s.dataset.kind || "Lesson"}</span>${s.dataset.title}</span></button></li>`).join("")}</ol>`;
      side.addEventListener("click", e => { const b = e.target.closest("button[data-i]"); if (b && !b.disabled) show(+b.dataset.i); });
      $("#tocToggle").onclick = () => { side.classList.toggle("open"); $("#tocToggle").textContent = side.classList.contains("open") ? "Hide lessons" : "Show all lessons"; };
    }
    secs.forEach((s, i) => {
      const nav = document.createElement("div"); nav.className = "lesson-nav";
      const last = i === secs.length - 1;
      nav.innerHTML = `${i > 0 ? `<button class="btn" type="button" data-nav="back">&larr; Back</button>` : "<span></span>"}
        ${last ? `<a class="btn gold" data-nav="finish" href="${nextHref}">${nextLabel} &rarr;</a>` : `<button class="btn gold" type="button" data-nav="next">Next: ${secs[i + 1].dataset.title} &rarr;</button>`}
        <p class="why-locked" hidden></p>`;
      s.appendChild(nav);
      nav.addEventListener("click", e => {
        const b = e.target.closest("[data-nav]"); if (!b) return;
        if (b.dataset.nav === "back") show(i - 1);
        if (b.dataset.nav === "next" && !b.disabled) { markDone(i); show(i + 1); }
        if (b.dataset.nav === "finish") { markDone(i); }
      });
    });
    window.addEventListener("hashchange", () => {
      const k = secs.findIndex(s => "#" + s.dataset.id === location.hash);
      if (k >= 0 && k !== flow.idx && reachable(k)) show(k);
    });
    const hashIdx = secs.findIndex(s => "#" + s.dataset.id === location.hash);
    const firstOpen = secs.findIndex((s, i) => !S.done[dayKey].includes(s.dataset.id));
    show(hashIdx >= 0 && reachable(hashIdx) ? hashIdx : (firstOpen < 0 ? 0 : firstOpen), true);
  }
  function markDone(i) {
    const id = flow.secs[i].dataset.id;
    if (!S.done[flow.dayKey].includes(id)) { S.done[flow.dayKey].push(id); save(); }
  }
  function reachable(i) {
    for (let k = 0; k < i; k++) {
      if (!S.done[flow.dayKey].includes(flow.secs[k].dataset.id)) return false;
      if (sectionReady(flow.secs[k]).length) return false;
    }
    return true;
  }
  function show(i, initial) {
    if (!flow || i < 0 || i >= flow.secs.length) return;
    if (!reachable(i)) return;
    flow.idx = i;
    flow.secs.forEach((s, k) => s.hidden = k !== i);
    history.replaceState(null, "", "#" + flow.secs[i].dataset.id);
    refreshNav();
    if (!initial) window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    const side = $("#sidebar"); if (side) { side.classList.remove("open"); const tt = $("#tocToggle"); if (tt) tt.textContent = "Show all lessons"; }
  }
  function refreshNav() {
    if (!flow) return;
    const { secs, idx, dayKey } = flow;
    secs.forEach((s, i) => {
      const why = sectionReady(s);
      const nb = $('[data-nav="next"],[data-nav="finish"]', s.querySelector(".lesson-nav"));
      const w = $(".why-locked", s);
      if (nb) {
        if (nb.tagName === "BUTTON") nb.disabled = why.length > 0;
        else { nb.toggleAttribute("aria-disabled", why.length > 0); nb.style.pointerEvents = why.length ? "none" : ""; nb.style.opacity = why.length ? .45 : ""; }
      }
      if (w) { w.hidden = !why.length; w.textContent = why[0] || ""; }
    });
    $$("#sidebar .toc button").forEach((b, i) => {
      b.disabled = !reachable(i);
      b.classList.toggle("active", i === idx);
      b.parentNode.classList.toggle("done", S.done[dayKey].includes(secs[i].dataset.id) && !sectionReady(secs[i]).length);
      b.querySelector(".mark").innerHTML = b.parentNode.classList.contains("done") ? "&#10003;" : i + 1;
    });
    const m = $("#meter");
    if (m) m.style.width = Math.round(100 * S.done[dayKey].length / secs.length) + "%";
  }

  /* ---------- Tools ---------- */
  function toolInflation(el) {
    el.innerHTML = `<h3>Purchasing Power Calculator</h3><p class="hint-text">See what inflation does to money sitting still.</p>
      <div class="tool-grid"><label>Amount today<input type="number" id="inf_amt" value="10000" min="0" step="100"></label>
      <label>Yearly inflation (%)<input type="number" id="inf_rate" value="3" min="0" max="30" step="0.1"></label>
      <label>Years<input type="number" id="inf_yrs" value="20" min="1" max="60"></label></div><div class="tool-out" id="inf_out"></div>`;
    const run = () => {
      const a = +$("#inf_amt").value || 0, r = (+$("#inf_rate").value || 0) / 100, y = +$("#inf_yrs").value || 0;
      const real = a / Math.pow(1 + r, y), need = a * Math.pow(1 + r, y), half = r > 0 ? 72 / (r * 100) : 0;
      $("#inf_out").innerHTML = `In ${y} years, <b>${money(a)}</b> left in cash will only buy what <b>${money(real)}</b> buys today. To keep the same buying power, you'd need <b>${money(need)}</b>.${r > 0 ? ` At ${(r * 100).toFixed(1)}% inflation, prices double about every <b>${half.toFixed(1)} years</b> (Rule of 72).` : ""}`;
    };
    $$("input", el).forEach(i => i.addEventListener("input", run)); run();
  }
  function toolMinPay(el) {
    el.innerHTML = `<h3>The Minimum Payment Trap</h3><p class="hint-text">Enter a credit card balance and see what paying only a fixed small amount really costs.</p>
      <div class="tool-grid"><label>Balance<input type="number" id="mp_bal" value="5000" min="0" step="100"></label>
      <label>APR (%)<input type="number" id="mp_apr" value="22" min="0" max="40" step="0.1"></label>
      <label>Monthly payment<input type="number" id="mp_pay" value="125" min="1" step="5"></label></div><div class="tool-out" id="mp_out"></div>`;
    const run = () => {
      let b = +$("#mp_bal").value || 0; const r = (+$("#mp_apr").value || 0) / 1200, p = +$("#mp_pay").value || 0;
      if (b * r >= p) { $("#mp_out").innerHTML = `A payment of <b>${money(p)}</b> doesn't even cover the <b>${money(b * r)}</b> of interest charged each month. This balance will <b>never</b> be paid off at this rate.`; return; }
      let m = 0, interest = 0;
      while (b > 0.005 && m < 1200) { const i = b * r; interest += i; b = b + i - p; m++; }
      const yrs = Math.floor(m / 12), mo = m % 12;
      $("#mp_out").innerHTML = `Paying <b>${money(p)}</b> a month takes <b>${yrs} years${mo ? " and " + mo + " months" : ""}</b> and costs <b>${money(interest)}</b> in interest. You'd pay <b>${money(interest + (+$("#mp_bal").value || 0))}</b> in total for a <b>${money(+$("#mp_bal").value || 0)}</b> balance.`;
    };
    $$("input", el).forEach(i => i.addEventListener("input", run)); run();
  }
  function toolDebt(el) {
    const start = [
      { n: "Credit card", b: 4200, r: 24.9, m: 110 },
      { n: "Car loan", b: 11800, r: 8.5, m: 310 },
      { n: "Store card", b: 900, r: 29.9, m: 35 },
      { n: "Personal loan", b: 3500, r: 13, m: 120 }
    ];
    el.innerHTML = `<h3>Avalanche vs. Snowball Planner</h3><p class="hint-text">These are sample debts. Change them to match yours; nothing you type leaves your device.</p>
      <div class="debt-rows" id="dr"></div>
      <div class="q-actions" style="margin-bottom:14px"><button class="btn" type="button" id="dr_add">+ Add a debt</button>
      <label style="flex-direction:row;align-items:center;gap:8px;font-weight:600">Extra each month <input type="number" id="dr_extra" value="200" min="0" step="25" style="width:120px"></label></div>
      <div class="tool-out" id="dr_out"></div>`;
    const rows = $("#dr", el);
    const addRow = d => {
      const r = document.createElement("div"); r.className = "debt-row";
      r.innerHTML = `<label>Debt<input type="text" value="${esc(d.n)}" data-k="n"></label><label>Balance ($)<input type="number" value="${d.b}" min="0" data-k="b"></label>
        <label>APR (%)<input type="number" value="${d.r}" min="0" step="0.1" data-k="r"></label><label>Min. payment ($)<input type="number" value="${d.m}" min="0" data-k="m"></label>
        <button class="rm" type="button" aria-label="Remove this debt">&times;</button>`;
      r.querySelector(".rm").onclick = () => { r.remove(); run(); };
      $$("input", r).forEach(i => i.addEventListener("input", run));
      rows.appendChild(r);
    };
    const read = () => $$(".debt-row", rows).map(r => { const o = {}; $$("input", r).forEach(i => o[i.dataset.k] = i.dataset.k === "n" ? i.value : +i.value || 0); return o; }).filter(d => d.b > 0);
    function sim(debts, extra, order) {
      let ds = debts.map(d => ({ ...d })); let month = 0, interest = 0; const payoffOrder = [];
      while (ds.some(d => d.b > 0.01) && month < 600) {
        month++;
        ds.forEach(d => { if (d.b > 0) { const i = d.b * d.r / 1200; d.b += i; interest += i; } });
        let pool = extra + debts.reduce((s, d) => s + d.m, 0);
        ds.forEach(d => { if (d.b > 0) { const p = Math.min(d.m, d.b); d.b -= p; pool -= p; } });
        const live = ds.filter(d => d.b > 0.01).sort(order);
        for (const d of live) { if (pool <= 0) break; const p = Math.min(pool, d.b); d.b -= p; pool -= p; }
        ds.forEach(d => { if (d.b <= 0.01 && !payoffOrder.includes(d.n)) { d.b = 0; payoffOrder.push(d.n); } });
      }
      return { month, interest, payoffOrder, stuck: month >= 600 };
    }
    const fmt = m => `${Math.floor(m / 12)} yr ${m % 12} mo`;
    function run() {
      const debts = read(), extra = +$("#dr_extra", el).value || 0;
      if (!debts.length) { $("#dr_out", el).innerHTML = "Add at least one debt with a balance."; return; }
      const bad = debts.find(d => d.b * d.r / 1200 >= d.m && extra === 0);
      const av = sim(debts, extra, (a, b) => b.r - a.r), sn = sim(debts, extra, (a, b) => a.b - b.b);
      const total = debts.reduce((s, d) => s + d.b, 0);
      if (av.stuck) { $("#dr_out", el).innerHTML = `At these payments, the debt doesn't get paid off within 50 years. ${bad ? `The minimum on <b>${esc(bad.n)}</b> doesn't cover its interest.` : ""} Try adding an extra monthly amount.`; return; }
      const diff = sn.interest - av.interest;
      $("#dr_out", el).innerHTML = `Total owed: <b>${money(total)}</b>. Monthly budget for debt: <b>${money(debts.reduce((s, d) => s + d.m, 0) + extra)}</b>.
        <div class="cmp"><div><h4>Avalanche (highest rate first)</h4><p>Debt-free in <b>${fmt(av.month)}</b><br>Interest paid: <b>${money(av.interest)}</b><br>Order: ${av.payoffOrder.map(esc).join(" &rarr; ")}</p></div>
        <div><h4>Snowball (smallest balance first)</h4><p>Debt-free in <b>${fmt(sn.month)}</b><br>Interest paid: <b>${money(sn.interest)}</b><br>Order: ${sn.payoffOrder.map(esc).join(" &rarr; ")}</p></div></div>
        <p style="margin:12px 0 0">${diff > 1 ? `The avalanche saves you <b>${money(diff)}</b> in interest. The snowball gives you your first win sooner. Pick the one you'll actually stick with.` : `Both methods cost about the same here, so choose the one that keeps you motivated.`}</p>`;
    }
    start.forEach(addRow);
    $("#dr_add", el).onclick = () => { addRow({ n: "New debt", b: 1000, r: 18, m: 40 }); run(); };
    $("#dr_extra", el).addEventListener("input", run);
    run();
  }
  function toolCompound(el) {
    el.innerHTML = `<h3>Owner vs. Saver Calculator</h3><p class="hint-text">Compare the same monthly amount left in a savings account versus owning a diversified investment. Rates are examples, not promises.</p>
      <div class="tool-grid"><label>Monthly amount<input type="number" id="cp_m" value="200" min="0" step="10"></label>
      <label>Years<input type="number" id="cp_y" value="25" min="1" max="60"></label>
      <label>Savings rate (%)<input type="number" id="cp_s" value="0.5" min="0" step="0.1"></label>
      <label>Investment growth (%)<input type="number" id="cp_i" value="7" min="0" step="0.1"></label></div><div class="tool-out" id="cp_out"></div>`;
    const fv = (m, r, y) => { const n = y * 12, i = r / 1200; return i ? m * ((Math.pow(1 + i, n) - 1) / i) : m * n; };
    const run = () => {
      const m = +$("#cp_m").value || 0, y = +$("#cp_y").value || 0, s = +$("#cp_s").value || 0, g = +$("#cp_i").value || 0;
      const put = m * 12 * y, a = fv(m, s, y), b = fv(m, g, y);
      $("#cp_out").innerHTML = `You put in <b>${money(put)}</b> over ${y} years.<div class="cmp"><div><h4>Saver</h4><p>Ends with <b>${money(a)}</b></p></div><div><h4>Owner</h4><p>Ends with <b>${money(b)}</b></p></div></div><p style="margin:12px 0 0">Same money, same discipline. The difference of <b>${money(b - a)}</b> comes from owning something that grows. Real investments go up and down along the way, so this is an illustration, not a guarantee.</p>`;
    };
    $$("input", el).forEach(i => i.addEventListener("input", run)); run();
  }
  function toolTimeline(el) {
    const chips = $$(".chip", el), items = $$(".timeline li", el);
    chips.forEach(c => c.onclick = () => {
      chips.forEach(x => x.setAttribute("aria-pressed", x === c));
      const f = c.dataset.f; items.forEach(li => li.hidden = f !== "all" && !li.dataset.era.includes(f));
    });
  }
  function tools() {
    $$("[data-tool]").forEach(el => ({ inflation: toolInflation, minpay: toolMinPay, debt: toolDebt, compound: toolCompound, timeline: toolTimeline }[el.dataset.tool] || (() => {}))(el));
  }

  /* ---------- page boot ---------- */
  function initDay(opts) {
    document.body.dataset.page = opts.key;
    if (!guard(opts.key)) return;
    $$("[data-name]").forEach(e => e.textContent = S.student.name.split(" ")[0]);
    renderApply(opts.questions);
    renderKC(opts.questions, opts.onPass);
    renderReflections(); renderScale("baseline"); tools();
    flowInit(opts.key, opts.nextHref, opts.nextLabel);
  }

  return {
    grade, S, save, $, $$, esc, money, header, guard, initDay, renderScale, renderReflections, SCALE, scaleDone, queueSend, sendForm, toast,
    register: async (name, email) => {
      S.student = { name, email, registeredAt: new Date().toISOString() }; save();
      await queueSend({ _subject: "New student: " + RSM_CONFIG.courseName, event: "Registered", name, email, course: RSM_CONFIG.courseName });
    }
  };
})();
