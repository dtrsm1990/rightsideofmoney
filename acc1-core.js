/* RSM Accountability Program, Level 1 engine.
   Tracks check-in, commitment, weekly logs, checkpoints, verification codes, strikes, and the Accountability Index.
   Progress lives on the student's device (with backup/restore). Every submission is also sent to Darrell. */
(function(){
  var KEY = 'rsm_acc1_v1';
  var FORM = 'https://formspree.io/f/xrpbgjbb';
  var KIT = '9981618';
  var SITE = 'https://rightsideofmoney.com/';
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
    function send(body){ return fetch(FORM, {method: 'POST', body: body, headers: {'Accept': 'application/json'}}).then(function(r){ if (!r.ok) throw new Error('send'); return r; }); }
    if (!files || !files.length) return send(fd);
    /* If the files can't be attached, still deliver the submission and ask the student to email the evidence. */
    return send(fd).catch(function(){
      var fd2 = new FormData();
      if (d.me){ fd2.append('student', d.me.first + ' ' + d.me.last); fd2.append('email', d.me.email); fd2.append('program', PROGRAM); fd2.append('program_start', A.date(d.me.start)); }
      Object.keys(fields).forEach(function(k){ fd2.append(k, fields[k]); });
      fd2.append('evidence_status', 'FILES NOT ATTACHED. Student was asked to email ' + files.length + ' file(s): ' + files.map(function(f){ return f.name; }).join(', '));
      return send(fd2).then(function(r){ A.evidenceNotice(files); return r; });
    });
  };
  A.evidenceNotice = function(files){
    var el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.style.cssText = 'position:fixed;left:50%;top:16px;transform:translateX(-50%);z-index:10000;max-width:560px;width:calc(100% - 32px);background:#0D1F3C;color:#fff;border:2px solid #C9941A;border-radius:6px;padding:16px 18px;font-size:15px;line-height:1.55;box-shadow:0 16px 40px rgba(0,0,0,.35)';
    el.innerHTML = '<strong style="color:#E8B84B">Your submission was received, but your files didn\'t attach.</strong><br>Email your ' + files.length + ' evidence file' + (files.length > 1 ? 's' : '') + ' to <a href="mailto:info@rightsideofmoney.com" style="color:#E8B84B">info@rightsideofmoney.com</a> with your name in the subject line. Darrell needs them to verify your work.<br><button type="button" style="margin-top:10px;background:#C9941A;color:#0D1F3C;border:0;font-weight:800;padding:8px 14px;border-radius:4px;cursor:pointer">Got It</button>';
    el.querySelector('button').addEventListener('click', function(){ el.remove(); });
    document.body.appendChild(el);
  };
  /* Bring every error message into view so a problem never looks like "nothing happened." */
  document.addEventListener('DOMContentLoaded', function(){
    if (!window.MutationObserver) return;
    new MutationObserver(function(list){
      list.forEach(function(mu){
        var el = mu.target.nodeType === 1 ? mu.target : mu.target.parentNode;
        if (!el || !el.closest) return; el = el.closest('.ac-msg');
        if (!el || !el.textContent.trim() || /\bok\b/.test(el.className)) return;
        var r = el.getBoundingClientRect();
        if (r.top < 70 || r.bottom > window.innerHeight - 20) el.scrollIntoView({behavior: 'smooth', block: 'center'});
        el.style.outline = '2px solid #E8B84B'; el.style.outlineOffset = '4px'; el.style.borderRadius = '2px';
        setTimeout(function(){ el.style.outline = ''; }, 2500);
      });
    }).observe(document.body, {childList: true, characterData: true, subtree: true});
  });
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

  /* ---------- worksheets and logs (definitions in acc1-data.js) ---------- */
  var DATA = window.ACC1_DATA || {weeks: {}, logs: {}}, WPP = 2, NCP = 4;
  A.data = DATA; A.wpp = WPP; A.ncp = NCP;
  A.moduleWs = function(from, to){ var out = []; for (var w = WPP * (from - 1) + 1; w <= WPP * to; w++) (DATA.weeks[w] || []).forEach(function(sp){ out.push({w: w, spec: sp}); }); return out; };
  A.wsDone = function(d, n){ return A.moduleWs(1, n).filter(function(x){ return window.RSMWS && RSMWS.complete(x.spec, (d.ws || {})[x.spec.id]); }).length; };
  A.wsMissing = function(d, n){ return A.moduleWs(n, n).filter(function(x){ return !(window.RSMWS && RSMWS.complete(x.spec, (d.ws || {})[x.spec.id])); }).map(function(x){ return 'Week ' + x.w + ': ' + x.spec.title; }); };
  A.logKeys = function(){ return Object.keys(DATA.logs); };
  A.attach = function(d, n){
    var ws = A.moduleWs(n, n).map(function(x){ return 'WEEK ' + x.w + '\n' + RSMWS.text(x.spec, (d.ws || {})[x.spec.id]); }).join('\n\n');
    var lg = A.logKeys().map(function(k){ return RSMWS.logText(DATA.logs[k], (d.logs || {})[k]); }).join('\n\n');
    return {worksheets: ws, logs: lg};
  };

  /* ---------- written assessment (student) and Darrell's draft feedback ---------- */
  function facts(d, n){
    var base = d.m.cp0, cur = d.m['cp' + n], prev = n > 1 ? d.m['cp' + (n - 1)] : base;
    var sb = A.score(base), sc = A.score(cur), sp = A.score(prev), st = {done: 0, all: 0}, days = 0, lw = 0, mtg = 0, mtgAll = 0;
    for (var w = WPP * (n - 1) + 1; w <= WPP * n; w++){ var L = d.wk && d.wk[w]; if (!L) continue; st.all++; if (L.status === 'Done') st.done++; days += +L.days || 0; lw++; if (w > 1){ mtgAll++; if (L.mtg === 'Yes') mtg++; } }
    var gains = sc.parts.map(function(p, i){ return {p: p, g: p.s - sb.parts[i].s}; }).sort(function(a, b){ return b.g - a.g; });
    var weakest = sc.parts.slice().sort(function(a, b){ return a.s - b.s; })[0];
    return {base: base, cur: cur, sb: sb, sc: sc, sp: sp, st: st, trackRate: lw ? days / (7 * lw) : 0, mtgRate: mtgAll ? mtg / mtgAll : null, gains: gains, weakest: weakest,
      debt: (+base.debt) - (+cur.debt), ef: (+cur.ef) - (+base.ef), wsMiss: A.wsMissing(d, n)};
  }
  function target(f){
    var m = f.cur, k = f.weakest.k;
    if (f.weakest.s >= 95) return 'Every measure in your Index is at or near its target. Your job now is to hold it: same tracking, same meetings, same automation, especially when it feels like you don\'t need them anymore.';
    if (k === 'sav'){ var need = Math.max(0, 0.15 * m.inc - m.sav); return 'You saved ' + A.money(m.sav) + ' in the last 30 days, ' + Math.round(m.sav / m.inc * 100) + '% of your take-home pay. Saving ' + A.money(need) + ' more a month gets you to 15%. Raise your automatic payday transfer first.'; }
    if (k === 'ef'){ var r = Math.max(0, m.ess - m.ef); return 'Your emergency fund is ' + A.money(m.ef) + '. Adding ' + A.money(r) + ' gets you to one full month of essentials, the Level 1 target.'; }
    if (k === 'dti') return 'Minimum debt payments take ' + Math.round(m.dpay / m.inc * 100) + '% of your take-home pay. Every extra dollar goes to your target debt, and every paid-off debt rolls into the next one.';
    if (k === 'credit') return m.credit ? 'Your credit score is ' + m.credit + '. Keep every card under 30% utilization and every account on autopay, and the score follows.' : 'You don\'t know your credit score yet. Find it this week through your bank or card app. You can\'t improve what you won\'t look at.';
    if (k === 'ontime') return 'You had a missed or late payment. Put autopay on every minimum payment today. One missed payment can undo weeks of progress.';
    if (k === 'track') return 'You tracked ' + m.track + ' of the last 14 days. The standard is every day within 24 hours. Attach it to something you already do daily, and use the Daily Spending Log in your lessons.';
    if (k === 'budget') return 'You kept ' + m.budget + '% of your plan\'s categories on budget. Hold your Weekly Money Meeting without fail, and move money between categories on purpose, not by accident.';
    var low = 0; (m.mind || []).forEach(function(v, i){ if (v < m.mind[low]) low = i; });
    return 'Your lowest-rated statement is "' + A.MIND[low] + '" Make it the first thing you look at in every Weekly Money Meeting this phase.';
  }
  A.assessment = function(d, n){
    var f = facts(d, n), delta = f.sc.total - f.sb.total, g = f.gains[0], out = [];
    out.push('Your Accountability Index moved from ' + f.sb.total + ' to ' + f.sc.total + ' (' + (delta >= 0 ? '+' : '') + delta + ' points)' + (n > 1 ? ', ' + (f.sc.total - f.sp.total >= 0 ? 'up ' : 'down ') + Math.abs(f.sc.total - f.sp.total) + ' since your last checkpoint' : '') + '. ' +
      (g.g > 0 ? 'Your biggest gain is ' + g.p.label + ', now at ' + g.p.raw + '. ' : 'None of your eight measures has improved since baseline yet, and that has to change. ') +
      (f.debt >= 0 ? 'You\'ve paid down ' + A.money(f.debt) + ' in debt' : 'Your debt is up ' + A.money(-f.debt)) + ' and ' + (f.ef >= 0 ? 'added ' + A.money(f.ef) + ' to' : 'drawn ' + A.money(-f.ef) + ' from') + ' your emergency fund since baseline.');
    var strong = f.st.done >= f.st.all && f.trackRate >= 0.85 && (f.mtgRate === null || f.mtgRate >= 1);
    out.push('On execution, you completed ' + f.st.done + ' of ' + f.st.all + ' Field Assignments this phase and tracked spending on ' + Math.round(f.trackRate * 100) + '% of days' + (f.mtgRate !== null ? ', and you held ' + Math.round(f.mtgRate * 100) + '% of your Weekly Money Meetings' : '') + '. ' +
      (f.wsMiss.length ? 'Worksheets still incomplete: ' + f.wsMiss.join(', ') + '. ' : '') +
      (strong && delta > 0 ? 'Your habits and your numbers are moving together. That\'s what accountability looks like.' : strong ? 'Your habits are at the standard even though the numbers haven\'t caught up yet. Keep going. Results follow behavior.' : delta > 0 ? 'Your numbers improved, but your habits aren\'t consistent yet. Numbers without habits don\'t last.' : 'Your habits and your numbers both need correction. Start with the basics: track every day, and hold every meeting.'));
    out.push((f.weakest.s >= 95 ? '' : 'Your priority for ' + (n === NCP ? 'the next 90 days' : 'Phase ' + (n + 1)) + ' is ' + f.weakest.label + '. ') + target(f));
    return out;
  };
  A.coachDraft = function(d, n){
    var f = facts(d, n), delta = f.sc.total - f.sb.total, g = f.gains[0];
    var a = d.me.first + ', I reviewed your ' + (n === NCP ? 'Final Checkpoint' : 'Checkpoint ' + n) + '. Your Accountability Index is ' + f.sc.total + ', ' + (delta >= 0 ? 'up ' : 'down ') + Math.abs(delta) + ' points from your baseline of ' + f.sb.total + '. ' +
      (g.g > 0 ? 'What stands out most is your ' + g.p.label + ': ' + g.p.raw + '. ' : '') + (f.debt >= 0 ? 'You\'ve paid down ' + A.money(f.debt) + ' in debt' : 'Your debt is up ' + A.money(-f.debt)) + ', and your emergency fund is ' + (f.ef >= 0 ? 'up ' + A.money(f.ef) : 'down ' + A.money(-f.ef)) + '.';
    var b = 'Here\'s what I see in your execution. You completed ' + f.st.done + ' of ' + f.st.all + ' Field Assignments and tracked ' + Math.round(f.trackRate * 100) + '% of days' + (f.mtgRate !== null ? ', and you held ' + Math.round(f.mtgRate * 100) + '% of your Money Meetings' : '') + '. ' +
      (f.trackRate < 0.85 ? 'Tracking is the foundation of everything else in this program. I need to see every day logged. ' : 'Your tracking is solid. Don\'t let it slip now that it feels routine. ');
    var c = (f.weakest.s >= 95 ? '' : 'Your focus ' + (n === NCP ? 'from here' : 'for Phase ' + (n + 1)) + ' is ' + f.weakest.label + '. ') + target(f) + ' Stay on the standard.';
    return [a, b, c].join('\n\n');
  };

  /* ---------- Progress Report: numbers + execution record + patterns from the student's own logs ---------- */
  var REPORT_TPL = 'template_qmceg0h';
  var THEMES = [
    {k: 'Dining and food spending', re: /\b(eat(ing)? out|ate out|restaurants?|take ?out|door ?dash|uber ?eats|grubhub|fast food|lunch|dinner|coffee|starbucks|drive[- ]?thru|delivery)\b/i,
     fix: 'Plan the week\'s meals during your Money Meeting, set a written dining limit, and remove delivery apps for the next phase.'},
    {k: 'Shopping and impulse buys', re: /\b(amazon|shopping|shopped|impulse|online|sales?|clothes|shoes|target|walmart|cart)\b/i,
     fix: 'Apply the 24-hour rule to every unplanned purchase and delete saved cards from shopping apps.'},
    {k: 'Stress and emotions', re: /\b(stress(ed|ful)?|anxious|anxiety|overwhelm(ed|ing)?|tired|exhausted|bored|frustrat(ed|ing)|upset|emotional)\b/i,
     fix: 'Write one if-then rule for your stress trigger, and put a 24-hour pause between how you feel and what you spend.'},
    {k: 'Time and consistency', re: /\b(forgot|forget|busy|no time|schedule|behind|procrastinat\w*|missed|slipped)\b/i,
     fix: 'This needs a calendar, not more effort. Block a fixed daily time for tracking and a fixed weekly time for your Money Meeting, with reminders.'},
    {k: 'Family and social pressure', re: /\b(family|kids|children|friends?|wife|husband|partner|spouse|birthday|holidays?|party|wedding|relatives?|cousin|mom|dad)\b/i,
     fix: 'Decide in advance what you\'ll spend when other people are involved, give social spending its own category, and practice saying "that isn\'t in my plan this month."'},
    {k: 'Unexpected expenses', re: /\b(car|repair|medical|doctor|unexpected|emergency|tow|tires?|broke down|vet|dentist)\b/i,
     fix: 'Surprises keep hitting your plan. Make the emergency buffer the priority and open sinking funds for the expenses you can predict.'},
    {k: 'Avoidance', re: /\b(avoid(ed|ing)?|didn'?t (look|check)|ignor(e|ed|ing)|scared|afraid|didn'?t want to|put (it )?off)\b/i,
     fix: 'Avoidance is showing up in your own words. Look at your accounts for two minutes every day at the same time until it stops feeling like an event.'},
    {k: 'Income pressure', re: /\b(hours (got )?cut|overtime|paycheck|short on money|not enough money|laid off|lost (my )?job|income)\b/i,
     fix: 'Income is part of the pressure. Protect your minimums first, track honestly, and identify one income lever to pull this phase.'}
  ];
  var FOCUS = {
    sav: 'Raise your automatic payday transfer, even by $25, and redirect every recovered dollar the same day.',
    ef: 'Feed the emergency buffer first: one jumpstart deposit this week and a larger automatic transfer.',
    dti: 'Send every extra dollar to your target debt and ask at least one creditor for a lower rate.',
    credit: 'Bring each card under 30% utilization and keep every account on autopay.',
    ontime: 'Put autopay on every minimum payment today. One missed payment can undo weeks of progress.',
    track: 'Track every day within 24 hours. Attach it to something you already do daily.',
    budget: 'Hold your Weekly Money Meeting without fail and move money between categories on purpose.',
    mind: 'Reread your Commitment Contract every Sunday and keep one small promise to yourself every day.'
  };
  function eh(t){ return '<div style="font-family:Georgia,serif;font-size:19px;font-weight:bold;color:#0D1F3C;margin:26px 0 10px;padding-top:14px;border-top:1px solid #EEE6D2">' + t + '</div>'; }
  function ep(t){ return '<p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#333">' + t + '</p>'; }
  function arrow(x){ return x > 0 ? '<span style="color:#1A6B3C;font-weight:bold">&#9650; +' + x + '</span>' : x < 0 ? '<span style="color:#9B1C1C;font-weight:bold">&#9660; ' + x + '</span>' : '<span style="color:#888">no change</span>'; }
  A.analysis = function(d, n){
    var base = d.m.cp0, cur = d.m['cp' + n], prev = n > 1 ? d.m['cp' + (n - 1)] : base;
    var sb = A.score(base), sc = A.score(cur), sp = A.score(prev), weeks = 2 * n;
    var title = n === 4 ? 'Final Results Report' : 'Checkpoint ' + n + ' Progress Report';
    var h = '';
    /* headline */
    h += '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 6px"><tr>' +
      '<td style="background:#0D1F3C;padding:16px;text-align:center;width:33%"><div style="font-family:Georgia,serif;font-size:30px;color:#E8B84B;font-weight:bold">' + sc.total + '</div><div style="font-size:11px;letter-spacing:1px;color:#ccc">INDEX NOW</div></td>' +
      '<td style="background:#0D1F3C;padding:16px;text-align:center;width:33%;border-left:1px solid #24375a"><div style="font-family:Georgia,serif;font-size:30px;color:#E8B84B;font-weight:bold">' + (sc.total - sb.total >= 0 ? '+' : '') + (sc.total - sb.total) + '</div><div style="font-size:11px;letter-spacing:1px;color:#ccc">SINCE BASELINE</div></td>' +
      '<td style="background:#0D1F3C;padding:16px;text-align:center;border-left:1px solid #24375a"><div style="font-family:Georgia,serif;font-size:30px;color:#E8B84B;font-weight:bold">' + (n > 1 ? ((sc.total - sp.total >= 0 ? '+' : '') + (sc.total - sp.total)) : sb.total) + '</div><div style="font-size:11px;letter-spacing:1px;color:#ccc">' + (n > 1 ? 'SINCE LAST CHECKPOINT' : 'BASELINE INDEX') + '</div></td></tr></table>';
    h += eh('Your Assessment') + A.assessment(d, n).map(ep).join('');
    /* measures table */
    h += eh('Measure by Measure');
    h += '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:13px"><tr style="background:#0D1F3C;color:#E8B84B"><td style="padding:8px">Measure</td><td style="padding:8px">Baseline</td><td style="padding:8px">Now</td><td style="padding:8px">' + (n > 1 ? 'Since last' : 'Change') + '</td></tr>' +
      sc.parts.map(function(p, i){ return '<tr style="background:' + (i % 2 ? '#F7F5EF' : '#FFF') + '"><td style="padding:8px;font-weight:bold;color:#0D1F3C">' + p.label + '</td><td style="padding:8px;color:#555">' + A.esc(sb.parts[i].raw) + '</td><td style="padding:8px;color:#333">' + A.esc(p.raw) + '</td><td style="padding:8px">' + arrow(Math.round(p.s - sp.parts[i].s)) + '</td></tr>'; }).join('') + '</table>';
    /* what the numbers say */
    var gains = sc.parts.map(function(p, i){ return {p: p, g: p.s - sb.parts[i].s}; }).sort(function(a, b){ return b.g - a.g; });
    var weakest = sc.parts.slice().sort(function(a, b){ return a.s - b.s; })[0];
    var debt = (+base.debt) - (+cur.debt), ef = (+cur.ef) - (+base.ef);
    h += eh('What the Numbers Say');
    h += ep('<strong>Biggest gain:</strong> ' + gains[0].p.label + ' (' + A.esc(gains[0].p.raw) + ').' + (gains[0].g <= 0 ? ' No measure has improved since baseline yet. That has to change in the next phase.' : ''));
    h += ep('<strong>Weakest measure right now:</strong> ' + weakest.label + ' at ' + A.esc(weakest.raw) + '. The target is ' + weakest.target + '.');
    h += ep('<strong>Debt:</strong> ' + (debt >= 0 ? A.money(debt) + ' paid down since baseline.' : 'up ' + A.money(-debt) + ' since baseline. New debt breaks the rules of this program; address it in your next log.') +
      ' <strong>Emergency fund:</strong> ' + (ef >= 0 ? A.money(ef) + ' added.' : 'down ' + A.money(-ef) + '. If it was a true emergency, the fund did its job. Rebuild it now.'));
    /* execution record */
    var st = {Done: 0, 'Partially done': 0, 'Not done': 0}, days = 0, mtgY = 0, mtgN = 0, logged = 0;
    for (var w = 1; w <= weeks; w++){ var L = d.wk && d.wk[w]; if (!L) continue; logged++; st[L.status] = (st[L.status] || 0) + 1; days += +L.days || 0; if (w > 1){ if (L.mtg === 'Yes') mtgY++; else if (L.mtg === 'No') mtgN++; } }
    var doneRate = logged ? st.Done / logged : 0, trackRate = logged ? days / (7 * logged) : 0;
    var strikes = A.strikes(d).length;
    var rating = doneRate >= 0.75 && trackRate >= 0.8 ? 'Strong' : (doneRate < 0.5 || trackRate < 0.5) ? 'Needs immediate correction' : 'Inconsistent';
    h += eh('Your Execution Record');
    h += ep('<strong>Execution rating: ' + rating + '.</strong> Worksheets complete: ' + A.wsDone(d, n) + ' of ' + A.moduleWs(1, n).length + '. Field Assignments: ' + st.Done + ' done, ' + st['Partially done'] + ' partial, ' + st['Not done'] + ' not done, out of ' + weeks + ' weeks. Spending tracked on ' + days + ' of ' + (7 * logged) + ' days (' + Math.round(trackRate * 100) + '%). Money Meetings held: ' + mtgY + ' of ' + (mtgY + mtgN) + '. Strikes on record: ' + strikes + '.');
    /* patterns from their own words */
    var hits = THEMES.map(function(t){ var wk = []; for (var w = 1; w <= weeks; w++){ var L = d.wk && d.wk[w]; if (L && t.re.test([L.res, L.set, L.drill, L.did].join(' '))) wk.push(w); } return {t: t, wk: wk}; })
      .filter(function(x){ return x.wk.length; }).sort(function(a, b){ return b.wk.length - a.wk.length; }).slice(0, 3);
    h += eh('Patterns in Your Own Words');
    if (hits.length){
      h += ep('These themes came up in your weekly logs, in your own words:');
      h += hits.map(function(x){ return '<div style="background:#FBF7EE;border-left:4px solid #C9941A;padding:12px 14px;margin:0 0 10px"><div style="font-weight:bold;color:#0D1F3C;font-size:15px">' + x.t.k + (x.wk.length > 1 ? ' (recurring)' : '') + '</div><div style="font-size:13px;color:#777;margin:2px 0 6px">Mentioned in Week ' + x.wk.join(', Week ') + '</div><div style="font-size:14px;color:#333;line-height:1.6">' + x.t.fix + '</div></div>'; }).join('');
    } else ep('No recurring obstacle showed up in your logs. Either you\'re executing cleanly, or your logs are too general to show a pattern. Be specific: what happened, when, and what it cost.');
    var lens = [], nd = [];
    for (var w2 = 1; w2 <= weeks; w2++){ var L2 = d.wk && d.wk[w2]; if (!L2) continue; lens.push(((L2.res || '') + (L2.set || '')).length); if (L2.status !== 'Done' && L2.set) nd.push('Week ' + w2 + ': "' + A.esc(L2.set.slice(0, 220)) + '"'); }
    if (lens.length && lens.reduce(function(a, b){ return a + b; }, 0) / lens.length < 60) h += ep('<strong>Note:</strong> your Resistance and Setbacks answers are short. Vague logs hide patterns, and patterns are what you need to see.');
    if (nd.length) h += ep('<strong>Where you said you fell short:</strong><br>' + nd.join('<br>'));
    /* their own corrections */
    var fixes = [];
    for (var w3 = 2 * n - 1; w3 <= weeks; w3++){ var L3 = d.wk && d.wk[w3]; if (L3 && L3.fix) fixes.push('Week ' + w3 + ': "' + A.esc(L3.fix) + '"'); }
    var cpn = d.cp && d.cp[n];
    h += eh(n === 4 ? 'Your Standard for the Next 90 Days' : 'The Standard You Set for Yourself');
    if (fixes.length) h += ep('<strong>Your corrections:</strong><br>' + fixes.join('<br>'));
    if (cpn && cpn.next) h += ep('<strong>Your standard going forward:</strong> "' + A.esc(cpn.next) + '"');
    h += ep('These are your words, not Darrell\'s. Hold yourself to them.');
    /* focus */
    h += eh(n === 4 ? 'Your Focus After Graduation' : 'Your Focus for Phase ' + (n + 1));
    h += '<ol style="margin:0 0 12px 18px;padding:0;font-size:15px;line-height:1.65;color:#333"><li style="margin-bottom:6px"><strong>' + weakest.label + ':</strong> ' + FOCUS[weakest.k] + '</li>' +
      (hits.length ? '<li style="margin-bottom:6px"><strong>' + hits[0].t.k + ':</strong> ' + hits[0].t.fix + '</li>' : '') +
      (rating !== 'Strong' ? '<li style="margin-bottom:6px"><strong>Execution:</strong> complete every Field Assignment fully and track all 7 days, every week. Partial work produces partial results.</li>' : '<li style="margin-bottom:6px"><strong>Execution:</strong> your consistency is strong. Protect it. Don\'t let a good phase turn into a relaxed one.</li>') + '</ol>';
    return {title: title, html: h};
  };
  A.sendReport = function(n){
    if (!REPORT_TPL) return;
    var d = A.load(); if (!d.me || !d.m || !d.m['cp' + n]) return;
    var r = A.analysis(d, n);
    var intro = n === 4 ? 'Here\'s your Final Results Report: eight weeks of your numbers and your own words, side by side. Darrell is reviewing your final evidence now, and your verification decision will come in a separate email.'
      : 'Here\'s your Checkpoint ' + n + ' Progress Report, built from your measurements and your own weekly logs. Darrell is reviewing your evidence now, and your verification decision will come in a separate email.';
    var body = JSON.stringify({service_id: 'service_65dy311', template_id: REPORT_TPL, user_id: 'gkDCipr-1PUVhTb5X', template_params: {
      to_name: d.me.first, to_email: d.me.email, program: PROGRAM, report_title: r.title, intro: intro, report_html: r.html}});
    try { fetch('https://api.emailjs.com/api/v1.0/email/send', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body, keepalive: true}).catch(function(){}); } catch(e){}
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
    try { var d = JSON.parse(decodeURIComponent(escape(atob(String(code).trim())))); if (!d || !d.me || !d.me.email || !A.checkCode(d.enr, d.me.email, 'E1')) return false; A.save(d); return true; } catch(e){ return false; }
  };

  document.addEventListener('DOMContentLoaded', A.sidebar);
})();
