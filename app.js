/* Flexibility Lens · Fellipe Silva Martins and Lidiane da Silva Souza
   Data: Souza & Martins, Article 3 of L. S. Souza's doctoral thesis (N = 210, PAPRIKA / 1000minds). */
(function () {
"use strict";

/* ---------- Research data ---------- */
const ORDER = ["AA", "PA", "CS", "AD"];
const DIMS = {
  AA: { name: "Awareness of Alternatives", label: "Awareness of options", role: "the repertoire", q: "what", n: "01",
    lv: { h: "Before making a decision, this person considers several alternatives and compares different paths, including options that are not the most obvious.",
          m: "Before deciding, this person recognizes some alternatives but focuses on the best-known options.",
          l: "When making decisions, this person considers only one alternative or fails to assess other possibilities." },
    me: { h: "Before making a decision, I consider several alternatives and compare different paths, including options that are not the most obvious.",
          m: "Before deciding, I recognize some alternatives but focus on the best-known options.",
          l: "When making decisions, I usually consider only one alternative and rarely assess other possibilities." },
    short: "Sees that, in any situation, several options and paths are available.",
    tip: "Before closing a decision, ask for at least three genuinely different options, one of which is not the obvious one, and look for information outside the usual sources." },
  PA: { name: "Processing Agility", label: "Thinking agility", role: "the conversion mechanism", q: "how", n: "02",
    lv: { h: "This person adjusts their way of thinking to the situation, switching between intuition and analysis.",
          m: "This person can switch between ways of thinking, but with some difficulty or delay.",
          l: "This person always uses the same way of thinking, even when the situation calls for change." },
    me: { h: "I adjust my way of thinking to the situation, switching between intuition and analysis.",
          m: "I can switch between ways of thinking, but with some difficulty or delay.",
          l: "I tend to use the same way of thinking, even when the situation calls for change." },
    short: "Switches between intuition and analysis to match the problem.",
    tip: "Name the mode before deciding: is this a familiar problem that intuition can handle, or a new one that needs slow analysis? Set checkpoints where the team asks whether the approach should change." },
  CS: { name: "Context Sensitivity", label: "Situational diagnosis", role: "the signal", q: "where & when", n: "03",
    lv: { h: "This person identifies changes in the environment and quickly adjusts their interpretation.",
          m: "This person perceives changes but is slow to adjust their decisions.",
          l: "This person does not perceive changes or keeps the same interpretation even when the context changes." },
    me: { h: "I identify changes in the environment and quickly adjust my interpretation.",
          m: "I perceive changes but am slow to adjust my decisions.",
          l: "I often miss changes, or keep the same interpretation even when the context changes." },
    short: "Picks up the signals that the usual response no longer works.",
    tip: "Agree on the early-warning signals for the project and review them at every meeting. Ask, on a fixed rhythm, what has changed since the plan was made." },
  AD: { name: "Agentic Disposition", label: "Executive readiness", role: "the readiness to act", q: "who", n: "04",
    lv: { h: "When facing change, this person quickly starts adaptive actions.",
          m: "This person recognizes the need to act but is slow to start changes.",
          l: "This person avoids acting or keeps the same practices, even when change is needed." },
    me: { h: "When facing change, I quickly start adaptive actions.",
          m: "I recognize the need to act but am slow to start changes.",
          l: "I tend to avoid acting, or keep the same practices, even when change is needed." },
    short: "Believes they can adapt under pressure and is willing to act on it.",
    tip: "Shorten the gap between noticing and acting: run small, reversible experiments and agree in advance who acts when a warning signal appears." }
};
const SAMPLE = { AA: 26.4, PA: 26.3, CS: 24.9, AD: 22.3 };
// Profile averages: the two prioritized and the least valued weights are from Table 4.6; the fourth is the remainder to 100%.
const PROFILES = {
  OE: { name: "Option explorers", pair: ["AA", "PA"], n: 22, pct: 10.5, w: { AA: 44.6, PA: 29.1, CS: 11.8, AD: 14.5 },
    view: "sees many alternatives and knows how to think them through", qs: "what and how, led by what", opp: ["SE"], axis: 1,
    read: "You locate flexibility in the work of thinking, above all in the breadth of the repertoire. Being able to see many paths matters most to you; reading the situation and acting fast matter much less." },
  AT: { name: "Agile thinkers", pair: ["PA", "AA"], n: 18, pct: 8.6, w: { AA: 29.3, PA: 40.1, CS: 17.5, AD: 13.1 },
    view: "knows how to change the way of thinking when facing the alternatives", qs: "how and what, led by how", opp: ["SE"], axis: 1,
    read: "You locate flexibility in the work of thinking, led by the mechanism: switching between intuition and analysis as the problem demands. Readiness to act carries the least weight in your view." },
  SE: { name: "Situational executors", pair: ["AD", "CS"], n: 37, pct: 17.6, w: { AA: 17.2, PA: 18.3, CS: 31.6, AD: 32.9 },
    view: "perceives the signal of change and acts", qs: "where, when and who", opp: ["OE", "AT"], axis: 1,
    read: "You see flexibility as a response to the situation: catching the signal that something changed and moving. Having a wide menu of alternatives matters less to you than noticing and acting." },
  AJ: { name: "Agile adapters", pair: ["CS", "PA"], n: 32, pct: 15.2, w: { AA: 16.6, PA: 32.4, CS: 33.7, AD: 17.3 },
    view: "perceives change and adjusts thinking as it happens", qs: "where, when and how", opp: ["SX"], axis: 2,
    read: "You see flexibility as continuous adjustment: perceiving change and re-framing the problem while it unfolds. A wide repertoire and quick execution are secondary in your view." },
  SX: { name: "Strategic executors", pair: ["AA", "AD"], n: 22, pct: 10.5, w: { AA: 34.0, PA: 19.1, CS: 16.8, AD: 30.1 },
    view: "sees the options and commits to carrying them out", qs: "what and who", opp: ["AJ"], axis: 2,
    read: "You see flexibility as choice followed by execution: lay out the options, pick one and commit. Reading shifts in the environment carries the least weight for you." },
  CR: { name: "Context readers", pair: ["AA", "CS"], n: 41, pct: 19.5, w: { AA: 31.5, PA: 20.5, CS: 31.2, AD: 16.8 },
    view: "understands the situation and the options it offers", qs: "what, where and when", opp: ["AE"], axis: 3,
    read: "You see flexibility as reading: understanding the situation and the options it opens. This is the most common view in the study. Readiness to act carries the least weight for you." },
  AE: { name: "Agile executors", pair: ["PA", "AD"], n: 33, pct: 15.7, w: { AA: 20.8, PA: 32.6, CS: 20.2, AD: 26.4 },
    view: "changes the way of thinking and acts", qs: "how and who", opp: ["CR"], axis: 3,
    read: "You see flexibility as acting: shifting how you think and then moving. This profile is the least cohesive in the study, so expect your priorities to blend with neighbouring profiles." }
};
const AXES = [
  { id: 1, title: "Deliberation vs situated response", strength: "The strongest axis in the study.", a: ["OE", "AT"], b: ["SE"] },
  { id: 2, title: "Continuous adjustment vs choice and execution", strength: "A clear axis in the study.", a: ["AJ"], b: ["SX"] },
  { id: 3, title: "Reading vs acting", strength: "A weak axis: read it as a gradient.", a: ["CR"], b: ["AE"] }
];
const V = { h: 1, m: 0.5, l: 0 };   // value functions are practically linear (Fig. 4.2)
const LVL = { h: "High", m: "Medium", l: "Low" };

/* ---------- Utilities ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(arr, rnd = Math.random) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem("cflens:" + k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem("cflens:" + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};
function round100(w) {
  const raw = ORDER.map(d => w[d]), fl = raw.map(Math.floor); const rest = 100 - fl.reduce((a, b) => a + b, 0);
  const order = raw.map((v, i) => [v - fl[i], i]).sort((a, b) => b[0] - a[0]);
  for (let k = 0; k < rest; k++) fl[order[k % 4][1]]++;
  const o = {}; ORDER.forEach((d, i) => o[d] = fl[i]); return o;
}
const manhattan = (a, b) => ORDER.reduce((s, d) => s + Math.abs(a[d] - b[d]), 0);
const rankProfiles = w => Object.entries(PROFILES).map(([k, p]) => ({ k, d: manhattan(w, p.w) })).sort((a, b) => a.d - b.d);
const topTwo = w => ORDER.slice().sort((a, b) => w[b] - w[a]).slice(0, 2);
const codeOf = w => { const r = round100(w); return "CF-" + ORDER.map(d => r[d]).join("-"); };
function parseCode(s) {
  const m = /CF-(\d{1,3})-(\d{1,3})-(\d{1,3})-(\d{1,3})/i.exec(s); if (!m) return null;
  const v = [m[1], m[2], m[3], m[4]].map(Number); const t = v.reduce((a, b) => a + b, 0); if (t < 90 || t > 110) return null;
  const o = {}; ORDER.forEach((d, i) => o[d] = v[i] * 100 / t); return o;
}

/* ---------- Weight estimation ----------
   Each answer is a linear constraint on the four weights (low = 0, medium = half, high = full weight).
   We sample the weight simplex, keep the samples that break the fewest constraints and average them,
   in the spirit of PAPRIKA's feasible region. Same answers give the same weights. */
function estimate(answers) {
  const cons = answers.map(({ q, a }) => { const diff = [0, 0, 0, 0]; q.pair.forEach(d => { diff[ORDER.indexOf(d)] = V[q.X[d]] - V[q.Y[d]]; }); return { diff, a }; });
  let seed = 7; JSON.stringify(answers.map(x => [x.q.id, x.a])).split("").forEach(ch => seed = (seed * 31 + ch.charCodeAt(0)) | 0);
  const rnd = mulberry32(seed);
  let best = Infinity, cnt = 0; const sum = [0, 0, 0, 0], w = [0, 0, 0, 0];
  for (let n = 0; n < 60000; n++) {
    let t = 0; for (let i = 0; i < 4; i++) { w[i] = -Math.log(rnd() + 1e-12); t += w[i]; } for (let i = 0; i < 4; i++) w[i] /= t;
    let v = 0;
    for (const c of cons) {
      const s = c.diff[0] * w[0] + c.diff[1] * w[1] + c.diff[2] * w[2] + c.diff[3] * w[3];
      if (c.a === "X") { if (s <= 0.004) v++; } else if (c.a === "Y") { if (s >= -0.004) v++; } else if (Math.abs(s) > 0.035) v++;
      if (v > best) break;
    }
    if (v < best) { best = v; cnt = 1; for (let i = 0; i < 4; i++) sum[i] = w[i]; }
    else if (v === best) { cnt++; for (let i = 0; i < 4; i++) sum[i] += w[i]; }
  }
  const o = {}; ORDER.forEach((d, i) => o[d] = sum[i] / cnt * 100); return { w: o, violations: best };
}

/* ---------- State ---------- */
let S = null, history = [];
let result = (store.get("result") || {}).w ? store.get("result") : null;
let role = store.get("role") || "member";
let mode = result ? "result" : "intro";

function newRun() {
  const pairs = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push([ORDER[i], ORDER[j]]);
  const queue = shuffle(pairs).map((p, k) => { const [i, j] = Math.random() < .5 ? p : [p[1], p[0]];
    return { id: "s" + k, kind: "swap", pair: [i, j], X: { [i]: "h", [j]: "l" }, Y: { [i]: "l", [j]: "h" }, flip: Math.random() < .5 }; });
  S = { queue, answers: [], checked: false, self: {} }; history = [];
}
function maxTotal() {
  const swaps = S.answers.filter(x => x.q.kind === "swap");
  return 6 + swaps.filter(x => x.a !== "E").length + S.queue.filter(q => q.kind === "swap").length + 1;
}
function answer(a) {
  history.push(JSON.stringify(S));
  const q = S.queue.shift(); S.answers.push({ q, a });
  if (q.kind === "swap" && a !== "E") {      // follow-up: is the preferred dimension worth more than twice the other?
    const [i, j] = a === "X" ? q.pair : [q.pair[1], q.pair[0]];
    const dq = { id: "d" + q.id, kind: "double", pair: [i, j], X: { [i]: "m", [j]: "l" }, Y: { [i]: "l", [j]: "h" }, flip: Math.random() < .5 };
    S.queue.splice(Math.min(S.queue.length, 1 + Math.floor(Math.random() * Math.max(1, S.queue.length))), 0, dq);
  }
  if (!S.queue.length && !S.checked) {        // one repeated question to check consistency
    S.checked = true;
    const swaps = S.answers.filter(x => x.q.kind === "swap"); const pref = swaps.filter(x => x.a !== "E");
    const pool = pref.length ? pref : swaps; const base = pool[Math.floor(Math.random() * pool.length)];
    S.queue.push(Object.assign({}, base.q, { id: "c" + base.q.id, kind: "check", ref: base.q.id, flip: !base.q.flip }));
  }
  if (!S.queue.length) mode = "self";
  render(true);
}
function undo() { if (!history.length) return; S = JSON.parse(history.pop()); mode = "quiz"; render(true); }
function finish() {
  const est = estimate(S.answers);
  const chk = S.answers.find(x => x.q.kind === "check"); const ref = chk && S.answers.find(x => x.q.id === chk.q.ref);
  result = { w: est.w, consistent: chk && ref ? chk.a === ref.a : null, nq: S.answers.length, self: S.self, role, when: new Date().toISOString().slice(0, 10) };
  store.set("result", result); mode = "result"; render(true);
}

/* ---------- Square diagram (after Fig. 4.5) ---------- */
function square(opts = {}) {
  const P = { AA: [110, 96], PA: [350, 96], CS: [350, 286], AD: [110, 286] };
  const mine = opts.mine, opp = opts.opp || [], counts = opts.counts, shares = opts.shares;
  const state = k => !mine ? "normal" : k === mine ? "mine" : opp.includes(k) ? "opp" : "dim";
  const edges = { OE: ["AA", "PA", -7], AT: ["AA", "PA", 7], SE: ["AD", "CS", 0], AJ: ["PA", "CS", 0], SX: ["AA", "AD", 0], CR: ["AA", "CS", 0], AE: ["PA", "AD", 0] };
  let lines = "";
  for (const [k, [a, b, off]] of Object.entries(edges)) {
    const st = state(k); const [x1, y1] = P[a], [x2, y2] = P[b];
    let sw = st === "mine" ? 6 : st === "opp" ? 3 : 2.5, col = st === "mine" || st === "opp" ? "#EA0029" : "#C9C6C1";
    if (counts) { sw = counts[k] ? 2 + Math.min(9, counts[k] * 2.4) : 1.5; col = counts[k] ? "#EA0029" : "#C9C6C1"; }
    lines += `<line x1="${x1}" y1="${y1 + off}" x2="${x2}" y2="${y2 + off}" stroke="${col}" stroke-width="${sw}"${st === "opp" ? ' stroke-dasharray="8 6"' : ""}/>`;
  }
  const L = { OE: [230, 78, 0], AT: [230, 122, 0], SE: [230, 272, 0], AJ: [372, 191, 90], SX: [88, 191, -90], CR: [306, 256, 0], AE: [154, 256, 0] };
  let labels = "";
  for (const [k, [x, y, rot]] of Object.entries(L)) {
    const st = state(k); let t = PROFILES[k].name;
    if (shares) t += ` · ${Math.round(PROFILES[k].pct)}%`;
    if (counts && counts[k]) t += ` · ${counts[k]}`;
    const cls = st === "mine" ? "mine" : (st === "dim" || (counts && !counts[k])) ? "dim" : "";
    labels += `<text class="elab ${cls}" x="${x}" y="${y}" text-anchor="middle"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ""}>${esc(t)}</text>`;
  }
  const VL = { AA: [110, 44], PA: [350, 44], CS: [350, 322], AD: [110, 322] };
  let verts = "";
  for (const d of ORDER) { const [x, y] = P[d], [lx, ly] = VL[d];
    verts += `<rect x="${x - 10}" y="${y - 10}" width="20" height="20" fill="#1E1E1E"/>` +
      `<text class="vlab" x="${lx}" y="${ly}" text-anchor="middle">${DIMS[d].name}</text>` +
      `<text class="vq" x="${lx}" y="${ly + 15}" text-anchor="middle">${DIMS[d].q.toUpperCase()}</text>`; }
  return `<svg class="sq" viewBox="0 0 460 350" role="img" aria-label="${esc(opts.aria || "The four dimensions of cognitive flexibility at the corners of a square; each line is a profile that prioritizes the two dimensions it links.")}">${lines}${verts}${labels}</svg>`;
}

/* ---------- Views ---------- */
const VME = $("#view-me"), VTEAM = $("#view-team");
const callout = (title, body) => `<div class="callout"><h4>${title}</h4><p>${body}</p></div>`;
const DISCLAIMER = callout("Not legally binding", "This is a reflection tool, not a test. The diagnostic is not legally binding and must not be used for hiring, promotion, appraisal or any other employment decision. The authors and developers accept no responsibility for the results or how they are used.");

function renderIntro() {
  VME.innerHTML = `
  <section class="opening"><div class="wrap narrow opening-grid">
    <div>
      <p class="eyebrow">Cognitive flexibility · Project teams</p>
      <h1>Flexibility <strong>Lens</strong></h1>
      <p class="lead">What makes someone flexible, in your eyes? People in project teams judge it by different criteria. Answer a few trade-offs, about three minutes, and see which of seven views of flexibility yours is closest to, what it tends to overlook, and who would complement it.</p>
      <div class="actions"><a class="btn-red" href="#begin" id="go">Start the diagnostic</a><button class="btn-text" id="sample">See a sample diagnostic</button></div>
      <p class="about-line">Based on a study with 210 project professionals. <a href="about/">About this project →</a></p>
    </div>
    <div class="diagram">${square({ shares: true })}
      <p class="caption">The seven profiles found in the study. Each line links the two dimensions a profile values most; the percentage is its share of the participants. Lines that share no corner are opposite views.</p></div>
  </div></section>
  <section class="sec tint"><div class="wrap narrow stack">
    <p class="sec-title">Four dimensions of flexibility</p>
    <div class="fit">${ORDER.map(d => `<div style="background:#fff"><span class="n">${DIMS[d].n} · ${DIMS[d].q}</span><h3>${DIMS[d].name}</h3><p>${DIMS[d].short}</p></div>`).join("")}</div>
  </div></section>
  <section class="sec" id="begin" style="scroll-margin-top:70px"><div class="wrap narrow stack">
    <p class="sec-title">Before you start</p>
    <span class="label">I'm answering as</span>
    <div class="role" role="radiogroup">
      <label><input type="radio" name="role" id="role-member" value="member" ${role === "member" ? "checked" : ""}> a project team member</label>
      <label><input type="radio" name="role" id="role-manager" value="manager" ${role === "manager" ? "checked" : ""}> a project manager or leader</label>
    </div>
    <p class="soft">You will see two people at a time. They differ on two traits only; everything else about them is the same. Pick the one who is more flexible in the way they think, or say they are equal. There are no right answers.</p>
    ${DISCLAIMER}
    <div class="actions"><button class="btn-red" id="start">Start the trade-offs</button></div>
  </div></section>`;
  VME.querySelectorAll("input[name=role]").forEach(r => r.addEventListener("change", e => { role = e.target.value; store.set("role", role); }));
  $("#go").onclick = e => { e.preventDefault(); $("#begin").scrollIntoView({ behavior: "smooth" }); };
  $("#start").onclick = () => { newRun(); mode = "quiz"; render(true); };
  $("#sample").onclick = () => { showSample(); render(true); };
}

const traitHTML = (d, l) => `<div class="trait"><div class="lvl"><span class="badge ${l}">${LVL[l]}</span>${DIMS[d].label}</div><p>${esc(DIMS[d].lv[l])}</p></div>`;
function renderQuiz() {
  const q = S.queue[0], done = S.answers.length, tot = maxTotal();
  const card = (side, letter) => `<button class="person" id="pick-${letter}" data-a="${side}"><span class="who">Person ${letter}<span class="kbd">${letter}</span></span>${q.pair.map(d => traitHTML(d, q[side][d])).join("")}<span class="same">Same as the other person on everything else.</span></button>`;
  VME.innerHTML = `
  <section class="sec"><div class="wrap narrow stack">
    <div class="qmeta"><span>Trade-off ${done + 1}${q.kind === "check" ? " · the last one" : ""}</span><span>${done} of about ${tot}</span></div>
    <div class="progress"><i style="width:${Math.round(done / tot * 100)}%"></i></div>
    <h2 class="qprompt">Which of these two people has more <strong>flexibility</strong> in the way they think?</h2>
    <div class="choices">${card(q.flip ? "Y" : "X", "A")}${card(q.flip ? "X" : "Y", "B")}</div>
    <div class="actions" style="justify-content:space-between"><button class="btn-line" id="eq">They are equal</button><button class="btn-text" id="back" ${history.length ? "" : "disabled"}>Back</button></div>
    <p class="small soft">Judge the people, not yourself. If both seem flexible in different ways, choose the one you would trust more to change course when a project needs it. Keyboard: A, B or E.</p>
  </div></section>`;
  VME.querySelectorAll(".person").forEach(b => b.onclick = () => answer(b.dataset.a));
  $("#eq").onclick = () => answer("E"); $("#back").onclick = undo;
}

function renderSelf() {
  const rnd = mulberry32(42);
  VME.innerHTML = `
  <section class="sec"><div class="wrap narrow stack">
    <p class="eyebrow">Optional · four quick items</p>
    <h2 class="big">Now, how do <strong>you</strong> usually act?</h2>
    <p class="lead">The trade-offs captured what you value in a flexible decision-maker. This short self-check adds how you see your own behaviour in projects, so the diagnostic can point out gaps. Pick the sentence closest to you, or skip it.</p>
    ${ORDER.map(d => `<fieldset class="sc"><legend>${DIMS[d].label}<span>${DIMS[d].name}</span></legend>
      ${shuffle(["h", "m", "l"], rnd).map(l => `<label><input type="radio" name="sc-${d}" id="sc-${d}-${l}" value="${l}" ${S.self[d] === l ? "checked" : ""}><span>${esc(DIMS[d].me[l])}</span></label>`).join("")}</fieldset>`).join("")}
    <div class="actions"><button class="btn-red" id="see">See my diagnostic</button><button class="btn-line" id="skip">Skip the self-check</button><button class="btn-text" id="back">Back to the trade-offs</button></div>
  </div></section>`;
  VME.querySelectorAll(".sc input").forEach(r => r.addEventListener("change", e => { S.self[e.target.name.slice(3)] = e.target.value; }));
  $("#see").onclick = finish; $("#skip").onclick = () => { S.self = {}; finish(); }; $("#back").onclick = undo;
}

function barsHTML(w, prof) {
  const sc = v => Math.min(100, v / 60 * 100);
  return `<div class="bars">${ORDER.map(d => `<div class="bar"><div class="nm">${DIMS[d].name}<small>${DIMS[d].q}</small></div>
    <div class="track" aria-hidden="true"><div class="fill" style="width:${sc(w[d])}%"></div><div class="eq" style="left:${sc(25)}%"></div><div class="avg" style="left:${sc(SAMPLE[d])}%"></div><div class="cen" style="left:${sc(prof.w[d])}%"></div></div>
    <div class="val">${Math.round(w[d])}%</div></div>`).join("")}</div>
    <div class="legend"><span><i class="lg-avg"></i>Average of the 210 participants</span><span><i class="lg-cen"></i>${esc(prof.name)} average</span><span><i class="lg-eq"></i>Equal weight (25%)</span></div>`;
}
function selfHTML(w, self) {
  if (!self || !Object.keys(self).length) return "";
  const rows = ORDER.filter(d => self[d]).map(d => {
    const l = self[d], hi = w[d] >= 25; let tag, txt;
    if (hi && l === "h") { tag = '<span class="badge m">Aligned strength</span>'; txt = "You value it and see yourself acting this way. Others may not weigh it as you do, so make it visible when you explain your decisions."; }
    else if (hi) { tag = '<span class="badge h">Development priority</span>'; txt = `You value it highly but rate yourself ${LVL[l].toLowerCase()}. ${DIMS[d].tip}`; }
    else if (l === "l") { tag = '<span class="badge l">Possible blind spot</span>'; txt = `You give it little weight and rate yourself low. Colleagues with other profiles may judge your flexibility by exactly this. ${DIMS[d].tip}`; }
    else { tag = '<span class="badge l">Lower priority</span>'; txt = `You give it less weight than the others; your self-rating is ${LVL[l].toLowerCase()}.`; }
    return `<li><div><h3>${DIMS[d].name}</h3><span class="meta">Your weight ${Math.round(w[d])}% · self-rating ${LVL[l].toLowerCase()}</span></div>${tag}<p>${esc(txt)}</p></li>`;
  }).join("");
  return `<div class="block"><p class="sec-title">What you value vs how you see yourself</p>
    <p class="soft">The study recommends looking at flexibility dimension by dimension rather than as one global score, because a single number hides these differences. The self-ratings are a rough, unvalidated snapshot.</p>
    <ul class="rows">${rows}</ul></div>`;
}

function renderResult() {
  const w = result.w, ranked = rankProfiles(w), k = ranked[0].k, P = PROFILES[k], second = PROFILES[ranked[1].k], d = ranked[0].d;
  const spread = Math.max(...ORDER.map(x => w[x])) - Math.min(...ORDER.map(x => w[x]));
  const fit = spread < 10 ? "balanced" : d < 22 ? "close" : d < 38 ? "moderate" : "loose";
  const fitText = {
    balanced: `Your weights are close to equal (a spread of ${Math.round(spread)} points), much like the sample average. The study found that this balanced pattern describes almost none of the individual participants, so treat the profile as a light tendency.`,
    close: `Your weights sit close to the ${P.name} average (a distance of ${Math.round(d)} points; two profiles are typically 42 points apart).`,
    moderate: `Your weights resemble the ${P.name} average (distance ${Math.round(d)} points) but also share features with ${second.name} (distance ${Math.round(ranked[1].d)}).`,
    loose: `You sit between profiles: the nearest is ${P.name} (distance ${Math.round(d)} points), followed closely by ${second.name} (${Math.round(ranked[1].d)}). Read both descriptions.`
  }[fit];
  const mineTop = topTwo(w), least = ORDER.slice().sort((a, b) => w[a] - w[b])[0];
  const opp = P.opp.map(o => PROFILES[o]), oppNames = opp.map(o => o.name).join(" or "), ax = AXES.find(a => a.id === P.axis);
  const tips = result.role === "manager" ? [
    "Assess people dimension by dimension. Someone with a broad repertoire may struggle to turn options into decisions, and the reverse also happens.",
    `Your own lens shapes whom you call flexible. Check whether you under-rate people who are strong on ${DIMS[least].name}, the dimension you weigh least.`,
    `When composing a team, consider people from the opposite side of your axis (${oppNames}). Together, opposite profiles cover all four dimensions. This is a hypothesis from the study, not a tested rule.`,
    "Make the four dimensions an explicit shared language, so people who judge flexibility by different criteria can discuss it without friction."
  ] : [
    "Colleagues may judge flexibility by different criteria. When your choices are questioned, explain them in terms of the dimension the other person values.",
    `Pay attention to ${DIMS[least].name}, the dimension you weigh least. It may be the one others notice most.`,
    `Seek out people with the opposite profile (${oppNames}) when a project is stuck. They will see what your lens tends to skip.`,
    "In the study, Processing Agility was valued as much as the repertoire. Practising deliberate changes of strategy when the situation changes is worthwhile for everyone."
  ];
  const code = codeOf(w);
  VME.innerHTML = `
  <section class="sec"><div class="wrap narrow">
    ${result.example ? '<p class="example-flag" style="margin-bottom:20px">Example diagnostic with made-up answers</p>' : ""}
    <div class="result-head">
      <div class="stack">
        <p class="eyebrow">Your diagnostic${result.when ? ` · ${result.when}` : ""}</p>
        <h2 class="big">Your view of flexibility is closest to <strong>${esc(P.name)}</strong></h2>
        <p class="quote">For you, a flexible decision-maker is someone who ${esc(P.view)}.</p>
        <div class="figures"><div><b>${P.pct}%</b><span>of the 210 participants</span></div><div><b>${result.nq}</b><span>choices made</span></div></div>
      </div>
      <div class="diagram">${square({ mine: k, opp: P.opp, aria: `Your profile, ${P.name}, is highlighted; the dashed line marks the opposite profile.` })}
        <p class="caption">Solid red: your profile. Dashed: the opposite view, which shares no dimension with yours.</p></div>
    </div>
  </div></section>
  <section class="sec tint"><div class="wrap narrow">
    <div class="block">
      <p class="sec-title">How you weigh the four dimensions</p>
      <p class="soft">Each weight is the value you place on moving someone from low to high on that dimension; the four add up to 100%. Your profile prioritizes the questions <strong style="font-weight:500;color:var(--ink)">${esc(P.qs)}</strong>.</p>
      ${barsHTML(w, P)}
      <p>${esc(fitText)}</p>
      ${result.consistent === false ? callout("Less certain result", "Your repeated question got a different answer the second time. That is common (in the study, only half of the participants were consistent on both checks), but your weights are less certain. You may want to take it again.") : ""}
    </div>
  </div></section>
  <section class="sec"><div class="wrap narrow">
    <div class="block">
      <p class="sec-title">What this means</p>
      <p class="lead" style="color:var(--ink)">${esc(P.read)}</p>
      <div class="fit two">
        <div><span class="n">You value most</span><h3>${mineTop.map(x => DIMS[x].name).join(" + ")}</h3><p>The questions ${mineTop.map(x => DIMS[x].q).join(" and ")}.</p></div>
        <div><span class="n">You tend to overlook</span><h3>${DIMS[least].name}</h3><p>${esc(DIMS[least].tip)}</p></div>
        <div><span class="n">Opposite view</span><h3>${esc(opp.map(o => o.name).join(" · "))}</h3><p>${esc(opp.map(o => "For them, a flexible person " + o.view + ".").join(" "))}</p></div>
        <div><span class="n">Your axis</span><h3>${esc(ax.title)}</h3><p>${esc(ax.strength)}</p></div>
      </div>
    </div>
    ${selfHTML(w, result.self)}
    <div class="block">
      <p class="sec-title">${result.role === "manager" ? "For you as a manager" : "For you as a team member"}</p>
      <ul class="dash-list">${tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
    </div>
    <div class="block">
      <p class="sec-title">Compare with your team</p>
      <p class="soft">Share this code with your team and paste everyone's codes in the Team view to see which views of flexibility the team covers. The code holds only your four weights.</p>
      <div class="code-row"><span class="code" id="mycode">${code}</span><button class="btn-line" id="copy">Copy code</button><button class="btn-line" id="toTeam">Add to Team view</button></div>
      <span class="small soft" id="copymsg" aria-live="polite"></span>
    </div>
    <div class="block">
      ${callout("Not legally binding", "This diagnostic describes your <b>views</b> about what makes someone flexible, not how flexible you are. It is for reflection only, is not legally binding, and must not be used for hiring, promotion, appraisal or any other employment decision. The authors and developers accept no responsibility for these results or their use.")}
      <div class="actions"><button class="btn-red" id="again">Take it again</button>${result.example ? '<button class="btn-text" id="home">Back to the start</button>' : ""}</div>
    </div>
  </div></section>`;
  $("#copy").onclick = () => { const m = $("#copymsg");
    const sel = () => { const r = document.createRange(); r.selectNodeContents($("#mycode")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); m.textContent = "Selected. Press Ctrl+C or ⌘C to copy."; };
    try { navigator.clipboard.writeText(code).then(() => m.textContent = "Copied.", sel); } catch (e) { sel(); } };
  $("#toTeam").onclick = () => { const t = store.get("team") || ""; if (!t.includes(code)) store.set("team", (t ? t.trim() + "\n" : "") + "Me: " + code); showTab("team"); };
  $("#again").onclick = () => { newRun(); mode = "quiz"; render(true); };
  if ($("#home")) $("#home").onclick = () => { result = store.get("result"); mode = "intro"; render(true); };
}

/* ---------- Team view ---------- */
const EXAMPLE_TEAM = "Ana (example): CF-18-31-34-17\nBruno (example): CF-30-19-17-34\nCarla (example): CF-33-21-31-15\nDiego (example): CF-21-33-20-26\nEva (example): CF-17-18-32-33";
function renderTeam() {
  VTEAM.innerHTML = `
  <section class="sec"><div class="wrap narrow stack">
    <p class="eyebrow">Team view</p>
    <h2 class="big">Which views of flexibility does your <strong>team</strong> hold?</h2>
    <p class="lead">Each member takes the diagnostic and shares their code. Paste one code per line, with a name before it if you like. Nothing leaves this browser.</p>
    <div class="form-box">
      <label for="teamtxt" class="label">Team codes</label>
      <textarea id="teamtxt" placeholder="Ana: CF-18-31-34-17&#10;Bruno: CF-30-19-17-34">${esc(store.get("team") || "")}</textarea>
      <div class="actions"><button class="btn-red" id="analyse">Show the team map</button><button class="btn-line" id="exteam">Load an example team</button><button class="btn-text" id="clear">Clear</button></div>
    </div>
  </div></section>
  <div id="teamout"></div>`;
  $("#analyse").onclick = () => { store.set("team", $("#teamtxt").value); analyse(); };
  $("#exteam").onclick = () => { $("#teamtxt").value = EXAMPLE_TEAM; analyse(); };
  $("#clear").onclick = () => { $("#teamtxt").value = ""; store.set("team", ""); analyse(); };
  analyse();
}
function analyse() {
  const out = $("#teamout"), txt = $("#teamtxt").value; const members = [], bad = [];
  txt.split(/\n+/).map(s => s.trim()).filter(Boolean).forEach((ln, i) => {
    const w = parseCode(ln); if (!w) { bad.push(ln); return; }
    const name = ln.split(/CF-/i)[0].replace(/[:\-–\s]+$/, "").trim() || `Member ${i + 1}`;
    members.push({ name, w, k: rankProfiles(w)[0].k, top: topTwo(w) });
  });
  const badNote = bad.length ? `<p class="small" style="color:var(--red-deep)">Skipped lines without a valid code: ${esc(bad.join(" · "))}. A code looks like CF-26-26-25-23 (four numbers that add up to 100).</p>` : "";
  if (!members.length) { out.innerHTML = `<section class="sec" style="padding-top:0"><div class="wrap narrow stack"><div class="callout" style="background:var(--paper-2)"><h4>No team yet</h4><p>Paste at least two codes, or load the example team to see how the map works.</p></div>${badNote}</div></section>`; return; }
  const counts = {}; members.forEach(m => counts[m.k] = (counts[m.k] || 0) + 1);
  const cov = {}, mean = {}; ORDER.forEach(d => { cov[d] = members.filter(m => m.top.includes(d)).length; mean[d] = members.reduce((s, m) => s + m.w[d], 0) / members.length; });
  const missing = ORDER.filter(d => !cov[d]);
  const axes = AXES.map(a => { const ina = members.filter(m => a.a.includes(m.k)), inb = members.filter(m => a.b.includes(m.k));
    const pole = (ks, ms) => `<div class="pole ${ms.length ? "on" : "off"}"><b>${esc(ks.map(x => PROFILES[x].name).join(" / "))}</b><span>${ms.length ? esc(ms.map(m => m.name).join(", ")) : "Nobody"}</span></div>`;
    return `<div class="axis">${pole(a.a, ina)}<div class="mid"><b>${esc(a.title)}</b>${ina.length && inb.length ? "Both poles present" : "One-sided"}</div>${pole(a.b, inb)}</div>`; }).join("");
  out.innerHTML = `
  <section class="sec tint"><div class="wrap narrow">
    ${txt.includes("(example)") ? '<p class="example-flag" style="margin-bottom:20px">Example team with made-up members</p>' : ""}
    <div class="result-head">
      <div class="stack">
        <p class="sec-title">Team map · ${members.length} ${members.length === 1 ? "member" : "members"}</p>
        <p class="soft">How many members have each dimension among their two top priorities:</p>
        <div class="cov">${ORDER.map(d => `<div><b>${cov[d]}</b><span>${DIMS[d].name}</span></div>`).join("")}</div>
        <p>${missing.length ? `Nobody on this team prioritizes <strong>${esc(missing.map(d => DIMS[d].name).join(" or "))}</strong>. The team may under-rate people who are strong there, and miss the moments when it matters.` : "Between them, members prioritize all four dimensions, the coverage the study's team hypothesis points to."}</p>
      </div>
      <div class="diagram" style="background:#fff">${square({ counts, aria: "Number of team members in each profile, shown by line thickness." })}<p class="caption">Thicker red lines mean more members with that profile.</p></div>
    </div>
  </div></section>
  <section class="sec"><div class="wrap narrow">
    <div class="block">
      <p class="sec-title">Axes of opposition</p>
      <p class="soft">Opposite profiles judge flexibility by different criteria. Having both poles covers more of the system, but calls for a shared vocabulary.</p>
      <div style="border-top:1px solid var(--line)">${axes}</div>
    </div>
    <div class="block">
      <p class="sec-title">Members</p>
      <div class="tablewrap"><table><thead><tr><th>Name</th><th>Profile</th>${ORDER.map(d => `<th>${DIMS[d].name.split(" ")[0]}</th>`).join("")}</tr></thead>
      <tbody>${members.map(m => `<tr><td>${esc(m.name)}</td><td>${esc(PROFILES[m.k].name)}</td>${ORDER.map(d => `<td class="num">${Math.round(m.w[d])}%</td>`).join("")}</tr>`).join("")}
      <tr class="total"><td>Team mean</td><td></td>${ORDER.map(d => `<td class="num">${Math.round(mean[d])}%</td>`).join("")}</tr></tbody></table></div>
      ${badNote}
    </div>
    <div class="block">${callout("A conversation starter", "That teams mixing opposite profiles adapt better is a hypothesis from the study, not a tested finding. Do not use this map to select, rank or exclude people. It is not legally binding, and the authors and developers accept no responsibility for its use.")}</div>
  </div></section>`;
}

function showSample() { result = { w: { AA: 18, PA: 31, CS: 34, AD: 17 }, consistent: true, nq: 12, self: { AA: "m", PA: "h", CS: "m", AD: "l" }, role, example: true }; mode = "result"; }

/* ---------- Routing ---------- */
function render(scroll) {
  if (mode === "intro") renderIntro(); else if (mode === "quiz") renderQuiz(); else if (mode === "self") renderSelf(); else renderResult();
  if (scroll) window.scrollTo({ top: 0 });
}
function showTab(t) {
  $("#tab-me").setAttribute("aria-selected", t === "me"); $("#tab-team").setAttribute("aria-selected", t === "team");
  VME.hidden = t !== "me"; VTEAM.hidden = t !== "team";
  if (t === "team") renderTeam(); else render();
  window.scrollTo({ top: 0 });
}
$("#tab-me").onclick = () => showTab("me"); $("#tab-team").onclick = () => showTab("team");
document.addEventListener("keydown", e => {
  if (mode !== "quiz" || VME.hidden || e.target.matches("input,textarea") || e.metaKey || e.ctrlKey) return;
  const k = e.key.toLowerCase();
  if (k === "a" && $("#pick-A")) $("#pick-A").click(); else if (k === "b" && $("#pick-B")) $("#pick-B").click(); else if (k === "e" && $("#eq")) $("#eq").click();
});
if (location.hash === "#sample") showSample();
if (location.hash === "#team") showTab("team"); else render();
})();
