/* RSM Accountability Program, Level 1 engine.
   Tracks check-in, commitment, weekly logs, checkpoints, verification codes, strikes, and the Accountability Index.
   Progress lives on the student's device (with backup/restore). Every submission is also sent to Darrell. */
(function(){
  var KEY = 'rsm_acc1_v1';
  var FORM = 'https://formspree.io/f/xrpbgjbb';
  var KIT = '9981618';
  var SITE = 'https://dtrsm1990.github.io/rightsideofmoney/';
  var SALT = 'RSM|ACC1|Semper|2026';
  var DAY = 86400000, GRACE = 2 * DAY;
  var PROGRAM = 'RSM Accountability Program, Level 1';
  var A = window.ACC1 = {program: PROGRAM, site: SITE};

  /* ---------- storage ---------- */
  A.load = function(){ try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch(e){ return {}; } };
  A.save = function(d){ try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e){} };
  A.update = function(fn){ var d = A.load(); fn(d); A.save(d); return d; };
  A.esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  A.money = function(n){ n = Number(n) || 0; return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US'); };
  A.date = function(t){ return new Date(t).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'}); };

  /* ---------- verification codes ---------- */
  function cyrb53(str){
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0, ch; i < str.length; i++){ ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  A.code = function(email, tag){
    var raw = cyrb53(String(email).trim().toLowerCase() + '|' + tag + '|' + SALT).toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '');
    raw = (raw + 'X7Q9K2').replace(/[O0I1]/g, '7').slice(0, 6);
    return tag + '-' + raw; /* tags: V1..V4 verify checkpoints, R1.. reinstate after a pause */
  };
  A.checkCode = function(input, email, tag){ return String(input || '').trim().toUpperCase().replace(/\s+/g, '') === A.code(email, tag); };

  /* ---------- timeline, gates, strikes ---------- */
  A.deadlines = function(d){
    if (!d.me) return [];
    var s = new Date(d.me.start); s.setHours(23, 59, 0, 0); s = s.getTime();
    var list = [{id: 'intake', label: 'Commitment & Baseline', due: s + 3 * DAY, at: d.intake && d.intake.at}];
    for (var n = 1; n <= 4; n++) list.push({id: 'cp' + n, label: (n === 4 ? 'Final Checkpoint' : 'Checkpoint ' + n), due: s + 14 * n * DAY, at: d.cp && d.cp[n] && d.cp[n].at});
    /* After a reinstatement, everything still open gets a fresh schedule: 7 days for the first item, then every 14 days. */
    if (d.reset){
      var r = new Date(d.reset.at); r.setHours(23, 59, 0, 0); r = r.getTime(); var k = 0;
      list.forEach(function(x){ if (d.reset.open.indexOf(x.id) > -1){ x.due = Math.max(x.due, r + (7 + 14 * k) * DAY); x.rescheduled = true; k++; } });
    }
    return list;
  };
  function late(x, now){ return x.at ? (new Date(x.at).getTime() > x.due + GRACE) : (now > x.due + GRACE); }
  /* Returns every strike on record. Strikes from before a reinstatement stay on the record; only new misses count toward the next pause. */
  A.strikes = function(d){
    var now = Date.now();
    if (!d.reset) return A.deadlines(d).filter(function(x){ return late(x, now); });
    var fresh = A.deadlines(d).filter(function(x){ return x.rescheduled && late(x, now); });
    return d.reset.struck.concat(fresh);
  };
  A.paused = function(d){
    if (!d.me) return false;
    var s = A.strikes(d).length;
    return d.reset ? (s - d.reset.count) >= 1 : s >= 2;
  };
  A.reinstate = function(k){
    A.update(function(x){
      var st = A.strikes(x);
      x.rein = k;
      x.reset = {at: new Date().toISOString(), count: st.length, struck: st.map(function(s){ return {id: s.id, label: s.label}; }),
        open: A.deadlines(x).filter(function(i){ return !i.at; }).map(function(i){ return i.id; })};
    });
  };
  A.verified = function(d, n){ return !!(d.ver && d.ver[n]); };
  A.phaseOpen = function(d, p){
    if (!d.me || !d.intake) return false;
    if (A.paused(d)) return false;
    return p === 1 ? true : A.verified(d, p - 1);
  };
  A.weekDone = function(d, w){ return !!(d.wk && d.wk[w]); };
  A.cpReady = function(d, n){ return A.phaseOpen(d, n) && A.weekDone(d, 2 * n - 1) && A.weekDone(d, 2 * n); };
  A.cpSubmitted = function(d, n){ return !!(d.cp && d.cp[n]); };

  /* ---------- Accountability Index ---------- */
  A.MIND = [
    'I know exactly where my money went last month.',
    'I follow through on the financial decisions I make.',
    'I look at my accounts regularly instead of avoiding them.',
    'I can delay a purchase I want without feeling deprived.',
    'I take responsibility for my financial results instead of blaming circumstances.',
    'I have a written plan for my money.',
    'I keep the promises I make to myself.',
    'I feel in control of my financial future.'
  ];
  function clamp(x){ return Math.max(0, Math.min(100, x)); }
  A.score = function(m){
    if (!m) return null;
    var inc = +m.inc || 0, parts = [];
    var rate = inc > 0 ? (+m.sav || 0) / inc : 0;
    parts.push({k: 'sav', label: 'Savings Rate', w: 15, s: clamp(rate / 0.15 * 100), raw: Math.round(rate * 1000) / 10 + '% of take-home', target: '15% or more'});
    var months = (+m.ess || 0) > 0 ? (+m.ef || 0) / (+m.ess) : 0;
    parts.push({k: 'ef', label: 'Emergency Buffer', w: 15, s: clamp(months * 100), raw: (Math.round(months * 10) / 10) + (Math.round(months * 10) / 10 === 1 ? ' month covered' : ' months covered'), target: '1 month of essentials'});
    var dti = inc > 0 ? (+m.dpay || 0) / inc : ((+m.dpay || 0) > 0 ? 1 : 0);
    parts.push({k: 'dti', label: 'Debt Load', w: 15, s: clamp((0.5 - dti) / 0.4 * 100), raw: Math.round(dti * 100) + '% of take-home to debt', target: '10% or less'});
    var cs = +m.credit || 0;
    parts.push({k: 'credit', label: 'Credit Health', w: 10, s: cs ? clamp((cs - 500) / 260 * 100) : 0, raw: cs ? String(cs) : 'Not known', target: '760 or higher'});
    var miss = +m.miss || 0;
    parts.push({k: 'ontime', label: 'On-Time Payments', w: 10, s: miss === 0 ? 100 : miss === 1 ? 50 : 0, raw: miss === 0 ? 'No missed payments' : miss + (miss >= 2 ? '+' : '') + ' missed or late', target: 'Zero missed'});
    parts.push({k: 'track', label: 'Tracking Discipline', w: 15, s: clamp((+m.track || 0) / 14 * 100), raw: (+m.track || 0) + ' of last 14 days tracked', target: '14 of 14 days'});
    parts.push({k: 'budget', label: 'Plan Adherence', w: 10, s: clamp(+m.budget || 0), raw: (+m.budget || 0) + '% of categories on plan', target: '90% or more'});
    var mind = (m.mind || []).filter(function(v){ return v; }), avg = mind.length ? mind.reduce(function(a, b){ return a + (+b); }, 0) / mind.length : 1;
    parts.push({k: 'mind', label: 'Mindset & Discipline', w: 10, s: clamp((avg - 1) / 4 * 100), raw: (Math.round(avg * 10) / 10) + ' of 5 average', target: '4.5 or higher'});
    var total = parts.reduce(function(a, p){ return a + p.s * p.w / 100; }, 0);
    return {total: Math.round(total), parts: parts};
  };
  A.latest = function(d){
    var keys = ['cp4', 'cp3', 'cp2', 'cp1', 'cp0'];
    for (var i = 0; i < keys.length; i++) if (d.m && d.m[keys[i]]) return {key: keys[i], m: d.m[keys[i]]};
    return null;
  };

  /* metrics form <-> object (form markup is generated server-side with these ids) */
  A.readMetrics = function(root){
    var q = function(id){ var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; };
    var m = {inc: q('m_inc'), sav: q('m_sav'), ef: q('m_ef'), ess: q('m_ess'), debt: q('m_debt'), dpay: q('m_dpay'), credit: q('m_credit'), miss: q('m_miss'), track: q('m_track'), budget: q('m_budget'), mind: []};
    var need = ['inc', 'sav', 'ef', 'ess', 'debt', 'dpay', 'miss', 'track', 'budget'];
    for (var i = 0; i < need.length; i++) if (m[need[i]] === '' || isNaN(+m[need[i]])) return {err: 'Every number in the measurement section is required. Use 0 when the answer is zero.'};
    if (+m.inc <= 0) return {err: 'Enter your monthly take-home income so the Index can be calculated.'};
    if (m.credit !== '' && (+m.credit < 300 || +m.credit > 850)) return {err: 'Credit scores run from 300 to 850. Leave it blank only if you truly don\'t know it yet.'};
    if (+m.track < 0 || +m.track > 14) return {err: 'Days tracked must be between 0 and 14.'};
    if (+m.budget < 0 || +m.budget > 100) return {err: 'Plan adherence is a percentage from 0 to 100.'};
    for (var j = 0; j < A.MIND.length; j++){
      var r = root.querySelector('input[name="mind' + j + '"]:checked');
      if (!r) return {err: 'Rate all 8 Mindset & Discipline statements.'};
      m.mind.push(+r.value);
    }
    ['inc', 'sav', 'ef', 'ess', 'debt', 'dpay', 'miss', 'track', 'budget'].forEach(function(k){ m[k] = +m[k]; });
    m.credit = m.credit === '' ? '' : +m.credit;
    return {m: m};
  };
  A.metricsText = function(m){
    var s = A.score(m);
    return 'Take-home income: ' + A.money(m.inc) + '/mo\nSaved this month: ' + A.money(m.sav) + '\nEmergency fund: ' + A.money(m.ef) + '\nEssential expenses: ' + A.money(m.ess) + '/mo\nNon-mortgage debt balance: ' + A.money(m.debt) +
      '\nMinimum debt payments: ' + A.money(m.dpay) + '/mo\nCredit score: ' + (m.credit || 'Not known') + '\nMissed/late payments (30 days): ' + m.miss + '\nDays tracked (last 14): ' + m.track + '\nPlan adherence: ' + m.budget + '%\nMindset ratings: ' + m.mind.join(', ') +
      '\n\nACCOUNTABILITY INDEX: ' + s.total + '/100\n' + s.parts.map(function(p){ return '  ' + p.label + ': ' + Math.round(p.s) + ' (' + p.raw + ')'; }).join('\n');
  };

  /* ---------- sending ---------- */
  A.post = function(fields, files){
    var d = A.load(), fd = new FormData();
    if (d.me){ fd.append('student', d.me.first + ' ' + d.me.last); fd.append('email', d.me.email); fd.append('program', PROGRAM); fd.append('program_start', A.date(d.me.start)); }
    Object.keys(fields).forEach(function(k){ fd.append(k, fields[k]); });
    (files || []).forEach(function(f, i){ fd.append('evidence_' + (i + 1), f, f.name); });
    return fetch(FORM, {method: 'POST', body: fd, headers: {'Accept': 'application/json'}}).then(function(r){ if (!r.ok) throw new Error('send'); return r; });
  };
  A.kit = function(first, email){
    var k = new FormData(); k.append('email_address', email); k.append('fields[first_name]', first);
    try { fetch('https://app.kit.com/forms/' + KIT + '/subscriptions', {method: 'POST', body: k, mode: 'no-cors', keepalive: true}).catch(function(){}); } catch(e){}
  };
  A.accessEmail = function(first, email){
    var url = SITE + 'acc1-portal.html';
    var links = '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:4px 0 0"><tr><td style="background:#FBF7EE;border-left:4px solid #C9941A;padding:16px 18px">' +
      '<div style="font-family:Georgia,serif;font-size:18px;color:#0D1F3C;font-weight:bold;margin-bottom:10px">Level 1 Command Center</div>' +
      '<a href="' + url + '" style="display:inline-block;background:#C9941A;color:#0D1F3C;font-weight:bold;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:2px">Open Command Center &rarr;</a>' +
      '<div style="font-size:12px;color:#777;margin-top:10px;word-break:break-all">' + url + '</div></td></tr></table>';
    var body = JSON.stringify({service_id: 'service_65dy311', template_id: 'template_wor36wk', user_id: 'gkDCipr-1PUVhTb5X', template_params: {
      to_name: first, to_email: email,
      intro: "You're officially enrolled in Level 1 of the RSM Accountability Program. Your clock starts today. Your Commitment & Baseline is due within 3 days, and every deadline is posted in your Command Center. Use the backup tool there if you ever switch devices.",
      program_links: links}});
    try { fetch('https://api.emailjs.com/api/v1.0/email/send', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body, keepalive: true}).catch(function(){}); } catch(e){}
  };

  /* ---------- page guard + sidebar ---------- */
  A.lockCard = function(title, msg, href, btn){
    return '<section class="ac-lock"><div class="ac-lock-ico">&#128274;</div><h2>' + title + '</h2><p>' + msg + '</p><a class="btn-next" href="' + href + '">' + btn + '</a></section>';
  };
  /* req: {type:'checkin'} | {type:'intake'} | {type:'week', w} | {type:'cp', n} | {type:'grad'} */
  A.guard = function(req){
    var d = A.load(), main = document.querySelector('.lesson-main'), msg = null;
    if (!d.me) msg = ['Check In First', 'Every student checks in on the Command Center before starting. That\'s where your clock, deadlines, and Accountability Index live.', './acc1-portal.html', 'Go to Command Center'];
    else if (A.paused(d) && req.type !== 'intake') msg = ['Program Paused', 'You\'ve reached the strike limit. Your work is saved, but nothing moves forward until you recommit. Go to the Command Center to submit your recommitment.', './acc1-portal.html#acPause', 'Recommit Now'];
    else if (req.type === 'intake') msg = null;
    else if (!d.intake) msg = ['Commitment Comes First', 'Sign your Commitment Contract and record your baseline before any week opens. No baseline, no way to prove change.', './acc1-intake.html', 'Complete Commitment & Baseline'];
    else if (req.type === 'week'){
      var p = Math.ceil(req.w / 2);
      if (!A.phaseOpen(d, p)) msg = ['Phase ' + p + ' Is Locked', 'Phase ' + p + ' opens when Checkpoint ' + (p - 1) + ' is verified. Submit it, then enter the verification code Darrell sends you on the Command Center.', './acc1-portal.html#acRoad', 'View Your Roadmap'];
      else if (req.w % 2 === 0 && !A.weekDone(d, req.w - 1)) msg = ['Finish Week ' + (req.w - 1) + ' First', 'Weeks are done in order. Submit your Week ' + (req.w - 1) + ' Accountability Log to open this week.', './acc1-week' + (req.w - 1) + '.html', 'Go to Week ' + (req.w - 1)];
    } else if (req.type === 'cp'){
      if (!A.phaseOpen(d, req.n)) msg = ['Checkpoint Locked', 'This checkpoint opens with Phase ' + req.n + '.', './acc1-portal.html#acRoad', 'View Your Roadmap'];
      else if (!A.cpReady(d, req.n)) msg = ['Complete the Work First', 'Checkpoint ' + req.n + ' opens after you submit the Accountability Logs for Weeks ' + (2 * req.n - 1) + ' and ' + (2 * req.n) + '.', './acc1-week' + (A.weekDone(d, 2 * req.n - 1) ? 2 * req.n : 2 * req.n - 1) + '.html', 'Go to the Work'];
    } else if (req.type === 'grad'){
      if (!A.verified(d, 4)) msg = ['Graduation Is Earned', 'Your Results Report and certificate unlock when your Final Checkpoint is verified.', './acc1-portal.html#acRoad', 'View Your Roadmap'];
    }
    if (msg && main){
      Array.prototype.forEach.call(main.children, function(c){ if (!c.classList.contains('lesson-eyebrow') && c.tagName !== 'H1') c.style.display = 'none'; });
      main.insertAdjacentHTML('beforeend', A.lockCard(msg[0], msg[1], msg[2], msg[3]));
      return false;
    }
    return true;
  };
  A.sidebar = function(){
    var d = A.load();
    document.querySelectorAll('.sidebar nav a[data-g]').forEach(function(a){
      var g = a.getAttribute('data-g'), open = true, done = false;
      if (g === 'intake'){ open = !!d.me; done = !!d.intake; }
      else if (g.charAt(0) === 'w'){ var w = +g.slice(1); open = A.phaseOpen(d, Math.ceil(w / 2)); done = A.weekDone(d, w); }
      else if (g.charAt(0) === 'c'){ var n = +g.slice(1); open = A.phaseOpen(d, n); done = A.verified(d, n); }
      else if (g === 'grad'){ open = A.verified(d, 4); }
      if (done) a.classList.add('completed'); else if (!open) a.classList.add('locked');
    });
  };

  /* ---------- Index panel ---------- */
  A.renderIndex = function(el){
    var d = A.load(); if (!el) return;
    var base = d.m && d.m.cp0, last = A.latest(d);
    if (!base){ el.innerHTML = '<p class="ac-muted">Your Accountability Index appears here after you record your baseline.</p>'; return; }
    var b = A.score(base), l = A.score(last.m), delta = l.total - b.total;
    var lbl = {cp0: 'Baseline', cp1: 'Checkpoint 1', cp2: 'Checkpoint 2', cp3: 'Checkpoint 3', cp4: 'Final'}[last.key];
    var h = '<div class="ac-idx-top"><div class="ac-idx-num">' + l.total + '<span>/100</span></div><div><div class="ac-idx-lbl">Accountability Index &middot; ' + lbl + '</div>' +
      (last.key === 'cp0' ? '<div class="ac-idx-d">Baseline recorded ' + A.date(base.at || d.intake.at) + '</div>' : '<div class="ac-idx-d ' + (delta >= 0 ? 'up' : 'down') + '">' + (delta >= 0 ? '+' : '') + delta + ' points since baseline (' + b.total + ')</div>') + '</div></div>';
    h += '<div class="ac-legend"><span><i class="lb"></i>Baseline</span><span><i class="ll"></i>' + lbl + '</span></div>';
    l.parts.forEach(function(p, i){
      var bp = b.parts[i];
      h += '<div class="ac-bar-row"><div class="ac-bar-lbl"><strong>' + p.label + '</strong><span>' + A.esc(p.raw) + ' &middot; target ' + p.target + '</span></div>' +
        '<div class="ac-bars"><div class="ac-bar b" style="width:' + Math.max(2, bp.s) + '%"></div><div class="ac-bar l" style="width:' + Math.max(2, p.s) + '%"></div></div></div>';
    });
    if (last.key !== 'cp0'){
      var dd = (+base.debt) - (+last.m.debt), ef = (+last.m.ef) - (+base.ef);
      h += '<div class="ac-wins"><div><strong>' + A.money(dd) + '</strong><span>debt reduced since baseline</span></div><div><strong>' + A.money(ef) + '</strong><span>added to emergency fund</span></div></div>';
    }
    el.innerHTML = h;
  };

  /* ---------- verification code entry ---------- */
  A.mountCode = function(el, n, onOk){
    if (!el) return;
    var label = n === 4 ? 'Final Checkpoint' : 'Checkpoint ' + n;
    el.innerHTML = '<div class="ac-code"><label for="acCode' + n + '"><strong>' + label + ' verification code</strong><span>Darrell sends this after he reviews your evidence.</span></label>' +
      '<div class="ac-code-row"><input id="acCode' + n + '" type="text" placeholder="V' + n + '-XXXXXX" autocomplete="off" spellcheck="false"><button type="button" class="ac-btn">Unlock</button></div><p class="ac-msg" aria-live="polite"></p></div>';
    var inp = el.querySelector('input'), msg = el.querySelector('.ac-msg');
    el.querySelector('button').addEventListener('click', function(){
      var d = A.load();
      if (A.checkCode(inp.value, d.me.email, 'V' + n)){
        A.update(function(x){ x.ver = x.ver || {}; x.ver[n] = true; x.verAt = x.verAt || {}; x.verAt[n] = new Date().toISOString(); });
        msg.className = 'ac-msg ok'; msg.textContent = 'Verified. ' + (n === 4 ? 'Your Results Report is unlocked.' : 'Phase ' + (n + 1) + ' is unlocked.');
        if (onOk) setTimeout(onOk, 900);
      } else {
        msg.className = 'ac-msg err'; msg.textContent = 'That code doesn\'t match. Check it against Darrell\'s email, and make sure you checked in with the same email address.';
      }
    });
  };

  /* ---------- backup / restore ---------- */
  A.exportCode = function(){ try { return btoa(unescape(encodeURIComponent(JSON.stringify(A.load())))); } catch(e){ return ''; } };
  A.importCode = function(code){
    try { var d = JSON.parse(decodeURIComponent(escape(atob(String(code).trim())))); if (!d || !d.me || !d.me.email) return false; A.save(d); return true; } catch(e){ return false; }
  };

  document.addEventListener('DOMContentLoaded', A.sidebar);
})();
