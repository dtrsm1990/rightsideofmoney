/* RSM Accountability Program, Level 3 engine: Total Accountability.
   Tracks check-in, commitment, weekly logs, four scoreboards, verification codes, strikes, the Total Accountability Index, and automatic weekly reports.
   Progress lives on the student's device (with backup/restore). Every submission is also sent to Darrell. */
(function(){
  var KEY = 'rsm_acc3_v1';
  var FORM = 'https://formspree.io/f/xrpbgjbb';
  var KIT = '9981618';
  var SITE = 'https://dtrsm1990.github.io/rightsideofmoney/';
  var SALT = 'RSM|ACC3|Total|2026';
  var DAY = 86400000, GRACE = 2 * DAY, NCP = 4, CYCLE = 28, PH = [[1, 2], [3, 6], [7, 10], [11, 14]], PN = ['Foundation', 'Module 1', 'Module 2', 'Module 3'], NW = 14;
  function PS(n){ return PH[n - 1][0]; } function PE(n){ return PH[n - 1][1]; }
  var PROGRAM = 'RSM Accountability Program, Level 3';
  var A = window.ACC3 = {program: PROGRAM, site: SITE, ncp: NCP, ph: PH, pn: PN, nw: NW, ps: PS, pe: PE};

  /* ---------- storage ---------- */
  A.load = function(){ try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch(e){ return {}; } };
  A.save = function(d){ try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e){} };
  A.update = function(fn){ var d = A.load(); fn(d); A.save(d); return d; };
  A.esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  A.money = function(n){ n = Number(n) || 0; return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US'); };
  A.date = function(t){ return new Date(t).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'}); };
  A.cpLabel = function(n){ return ['Foundation Scoreboard', 'Architecture Scoreboard', 'Protection Scoreboard', 'Final Checkpoint'][n - 1] || ''; };

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
    raw = (raw + 'T3Q8W5').replace(/[O0I1]/g, '9').slice(0, 6);
    return tag + '-' + raw; /* tags: V1..V3 verify scoreboards, R1.. reinstate after a pause */
  };
  A.checkCode = function(input, email, tag){ return String(input || '').trim().toUpperCase().replace(/\s+/g, '') === A.code(email, tag); };

  /* ---------- timeline, gates, strikes ---------- */
  A.deadlines = function(d){
    if (!d.me) return [];
    var s = new Date(d.me.start); s.setHours(23, 59, 0, 0); s = s.getTime();
    var list = [{id: 'intake', label: 'Commitment & Baseline', due: s + 3 * DAY, at: d.intake && d.intake.at}];
    for (var n = 1; n <= NCP; n++) list.push({id: 'cp' + n, label: A.cpLabel(n), due: s + 7 * PE(n) * DAY, at: d.cp && d.cp[n] && d.cp[n].at});
    /* After a reinstatement, everything still open gets a fresh schedule: 7 days for the first item, then every 28 days. */
    if (d.reset){
      var r = new Date(d.reset.at); r.setHours(23, 59, 0, 0); r = r.getTime(); var k = 0;
      list.forEach(function(x){ if (d.reset.open.indexOf(x.id) > -1){ x.due = Math.max(x.due, r + (7 + CYCLE * k) * DAY); x.rescheduled = true; k++; } });
    }
    return list;
  };
  function late(x, now){ return x.at ? (new Date(x.at).getTime() > x.due + GRACE) : (now > x.due + GRACE); }
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
  A.phaseOf = function(w){ for (var p = 1; p <= NCP; p++) if (w <= PE(p)) return p; return NCP; };
  A.cpReady = function(d, n){
    if (!A.phaseOpen(d, n)) return false;
    for (var w = PS(n); w <= PE(n); w++) if (!A.weekDone(d, w)) return false;
    return true;
  };
  A.cpSubmitted = function(d, n){ return !!(d.cp && d.cp[n]); };
  A.nextWeek = function(d, n){ for (var w = PS(n); w <= PE(n); w++) if (!A.weekDone(d, w)) return w; return PE(n); };

  /* ---------- Total Accountability Index ---------- */
  A.PROT = ['A will or trust that is current', 'Beneficiaries reviewed on every account in the last 12 months', 'A durable financial power of attorney', 'A healthcare directive and healthcare power of attorney',
    'Life insurance reviewed against what my family would need', 'Disability income protection reviewed', 'Property and liability coverage reviewed, including umbrella coverage', 'A professional team in place (attorney, tax, insurance)'];
  A.GOV = ['A written Wealth Constitution', 'A Decision Authority Matrix', 'A Family Money Request Policy', 'A named and briefed backup decision-maker',
    'A Continuity Binder a trusted person can find', 'A family council meeting held in the last 90 days'];
  A.MIND = [
    'I know who controls every asset I own, and who would control it if I couldn\'t.',
    'My household money decisions follow written rules, even under pressure.',
    'I can say no to money requests that break our policy, without guilt.',
    'I know exactly what would happen to my family financially if I died or couldn\'t work.',
    'I\'ve faced the documents and decisions most people avoid.',
    'The people who will inherit from me are being prepared, not just provided for.',
    'I review my wealth on a schedule, even when nothing seems wrong.',
    'My wealth could keep working if I were gone.'
  ];
  function clamp(x){ return Math.max(0, Math.min(100, x)); }
  function r1(x){ return Math.round(x * 10) / 10; }
  function cnt(a){ return (a || []).filter(function(v){ return v; }).length; }
  A.score = function(m){
    if (!m) return null;
    var inc = +m.inc || 0, parts = [];
    var rate = inc > 0 ? (+m.conv || 0) / inc : 0;
    parts.push({k: 'conv', label: 'Conversion Rate', w: 10, s: clamp(rate / 0.20 * 100), raw: r1(rate * 100) + '% of take-home converted', target: '20% or more'});
    var months = (+m.ess || 0) > 0 ? (+m.res || 0) / (+m.ess) : 0;
    parts.push({k: 'res', label: 'Reserve Strength', w: 15, s: clamp(months / 6 * 100), raw: r1(months) + (r1(months) === 1 ? ' month of essentials' : ' months of essentials'), target: '6 months or more'});
    var dti = inc > 0 ? (+m.dpay || 0) / inc : ((+m.dpay || 0) > 0 ? 1 : 0);
    parts.push({k: 'dti', label: 'Debt Load', w: 10, s: clamp((0.5 - dti) / 0.4 * 100), raw: Math.round(dti * 100) + '% of take-home to consumer debt', target: '10% or less'});
    var pr = cnt(m.prot);
    parts.push({k: 'prot', label: 'Protection Coverage', w: 15, s: clamp(pr / A.PROT.length * 100), raw: pr + ' of ' + A.PROT.length + ' protections in place', target: A.PROT.length + ' of ' + A.PROT.length});
    var gv = cnt(m.gov);
    parts.push({k: 'gov', label: 'Governance and Continuity', w: 15, s: clamp(gv / A.GOV.length * 100), raw: gv + ' of ' + A.GOV.length + ' governance systems in place', target: A.GOV.length + ' of ' + A.GOV.length});
    var sp = +m.spf || 0;
    parts.push({k: 'spf', label: 'Single-Point Failures', w: 10, s: [100, 60, 30, 0][Math.min(3, sp)], raw: sp === 0 ? 'None remaining' : sp + (sp >= 3 ? ' or more' : '') + ' remaining', target: 'Zero'});
    var rv = +m.rev || 0;
    parts.push({k: 'rev', label: 'Review Discipline', w: 10, s: clamp(rv / 4 * 100), raw: rv + ' of the last 4 weekly reviews held', target: '4 of 4'});
    var mind = (m.mind || []).filter(function(v){ return v; }), avg = mind.length ? mind.reduce(function(a, b){ return a + (+b); }, 0) / mind.length : 1;
    parts.push({k: 'mind', label: 'Total Accountability Mindset', w: 15, s: clamp((avg - 1) / 4 * 100), raw: r1(avg) + ' of 5 average', target: '4.5 or higher'});
    var total = parts.reduce(function(a, p){ return a + p.s * p.w / 100; }, 0);
    return {total: Math.round(total), parts: parts};
  };
  A.netWorth = function(m){ return (+m.assets || 0) - (+m.liab || 0); };
  A.latest = function(d){
    for (var i = NCP; i >= 0; i--) if (d.m && d.m['cp' + i]) return {key: 'cp' + i, m: d.m['cp' + i]};
    return null;
  };
  A.keyLabel = function(k){ return k === 'cp0' ? 'Baseline' : A.cpLabel(+k.slice(2)); };

  /* metrics form <-> object (form markup is generated server-side with these ids) */
  var NUMS = ['inc', 'conv', 'res', 'ess', 'invbal', 'assets', 'liab', 'dpay'];
  A.readMetrics = function(root){
    var q = function(id){ var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; };
    var m = {mind: [], prot: [], gov: []};
    NUMS.forEach(function(k){ m[k] = q('m_' + k); });
    m.rev = q('m_rev'); m.spf = q('m_spf');
    for (var i = 0; i < NUMS.length; i++) if (m[NUMS[i]] === '' || isNaN(+m[NUMS[i]]) || +m[NUMS[i]] < 0) return {err: 'Every number in the measurement section is required. Use 0 when the answer is zero.'};
    if (m.rev === '') return {err: 'Choose how many of your last 4 Weekly Wealth Reviews you held.'};
    if (m.spf === '') return {err: 'Choose how many single-point failures remain in your financial life.'};
    if (+m.inc <= 0) return {err: 'Enter your monthly take-home income so the Index can be calculated.'};
    if (+m.ess <= 0) return {err: 'Enter your monthly essential expenses so your reserve can be measured.'};
    A.PROT.forEach(function(x, i){ var cb = root.querySelector('#m_prot' + i); m.prot.push(!!(cb && cb.checked)); });
    A.GOV.forEach(function(x, i){ var cb = root.querySelector('#m_gov' + i); m.gov.push(!!(cb && cb.checked)); });
    for (var j = 0; j < A.MIND.length; j++){
      var x = root.querySelector('input[name="mind' + j + '"]:checked');
      if (!x) return {err: 'Rate all 8 Total Accountability Mindset statements.'};
      m.mind.push(+x.value);
    }
    NUMS.forEach(function(k){ m[k] = +m[k]; }); m.rev = +m.rev; m.spf = +m.spf;
    return {m: m};
  };
  A.metricsText = function(m){
    var s = A.score(m);
    function list(names, flags){ var l = names.filter(function(n, i){ return flags && flags[i]; }); return l.length ? l.join('; ') : 'None yet'; }
    return 'Take-home income: ' + A.money(m.inc) + '/mo\nConverted in the last 30 days: ' + A.money(m.conv) + '\nCash reserves: ' + A.money(m.res) + '\nEssential expenses: ' + A.money(m.ess) + '/mo' +
      '\nConsumer debt payments: ' + A.money(m.dpay) + '/mo\nInvested assets: ' + A.money(m.invbal) + '\nTotal assets: ' + A.money(m.assets) + '\nTotal liabilities: ' + A.money(m.liab) + '\nNet worth: ' + A.money(A.netWorth(m)) +
      '\nProtections in place: ' + list(A.PROT, m.prot) + '\nGovernance in place: ' + list(A.GOV, m.gov) + '\nSingle-point failures remaining: ' + (m.spf >= 3 ? '3 or more' : m.spf) + '\nWeekly reviews held (last 4): ' + m.rev + '\nMindset ratings: ' + m.mind.join(', ') +
      '\n\nTOTAL ACCOUNTABILITY INDEX: ' + s.total + '/100\n' + s.parts.map(function(p){ return '  ' + p.label + ': ' + Math.round(p.s) + ' (' + p.raw + ')'; }).join('\n');
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
    var url = SITE + 'acc3-portal.html';
    var links = '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:4px 0 0"><tr><td style="background:#FBF7EE;border-left:4px solid #C9941A;padding:16px 18px">' +
      '<div style="font-family:Georgia,serif;font-size:18px;color:#0D1F3C;font-weight:bold;margin-bottom:10px">Level 3 Headquarters</div>' +
      '<a href="' + url + '" style="display:inline-block;background:#C9941A;color:#0D1F3C;font-weight:bold;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:2px">Open Headquarters &rarr;</a>' +
      '<div style="font-size:12px;color:#777;margin-top:10px;word-break:break-all">' + url + '</div></td></tr></table>';
    var body = JSON.stringify({service_id: 'service_65dy311', template_id: 'template_wor36wk', user_id: 'gkDCipr-1PUVhTb5X', template_params: {
      to_name: first, to_email: email,
      intro: "You're officially enrolled in Level 3 of the RSM Accountability Program: Total Accountability. Your 14-week clock starts today. Your Commitment & Baseline is due within 3 days, and every deadline is posted in your Headquarters. Use the backup tool there if you ever switch devices.",
      program_links: links}});
    try { fetch('https://api.emailjs.com/api/v1.0/email/send', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body, keepalive: true}).catch(function(){}); } catch(e){}
  };

  /* ---------- page guard + sidebar ---------- */
  A.lockCard = function(title, msg, href, btn){
    return '<section class="ac-lock"><div class="ac-lock-ico">&#128274;</div><h2>' + title + '</h2><p>' + msg + '</p><a class="btn-next" href="' + href + '">' + btn + '</a></section>';
  };
  /* req: {type:'intake'} | {type:'week', w} | {type:'cp', n} | {type:'grad'} */
  A.guard = function(req){
    var d = A.load(), main = document.querySelector('.lesson-main'), msg = null;
    if (!d.me) msg = ['Check In First', 'Every operator checks in on the Headquarters before starting. That\'s where your clock, deadlines, and Total Accountability Index live.', './acc3-portal.html', 'Go to Headquarters'];
    else if (A.paused(d) && req.type !== 'intake') msg = ['Program Paused', 'You\'ve reached the strike limit. Your work is saved, but nothing moves forward until you recommit. Go to the Headquarters to submit your recommitment.', './acc3-portal.html#acPause', 'Recommit Now'];
    else if (req.type === 'intake') msg = null;
    else if (!d.intake) msg = ['Commitment Comes First', 'Sign your Total Accountability Contract and record your baseline before any week opens. No baseline, no way to prove change.', './acc3-intake.html', 'Complete Commitment & Baseline'];
    else if (req.type === 'week'){
      var p = A.phaseOf(req.w);
      if (!A.phaseOpen(d, p)) msg = [PN[p - 1] + ' Is Locked', PN[p - 1] + ' opens when your ' + A.cpLabel(p - 1) + ' is verified. Submit your scoreboard, then enter the verification code Darrell sends you in your Headquarters.', './acc3-portal.html#acRoad', 'View Your Roadmap'];
      else if (req.w !== PS(p) && !A.weekDone(d, req.w - 1)) msg = ['Finish Week ' + (req.w - 1) + ' First', 'Weeks are done in order. Submit your Week ' + (req.w - 1) + ' Accountability Log to open this week.', './acc3-week' + (req.w - 1) + '.html', 'Go to Week ' + (req.w - 1)];
    } else if (req.type === 'cp'){
      if (!A.phaseOpen(d, req.n)) msg = ['Scoreboard Locked', 'This scoreboard opens with ' + PN[req.n - 1] + '.', './acc3-portal.html#acRoad', 'View Your Roadmap'];
      else if (!A.cpReady(d, req.n)){ var nw = A.nextWeek(d, req.n); msg = ['Complete the Work First', A.cpLabel(req.n) + ' opens after you submit the Accountability Logs for Weeks ' + PS(req.n) + ' through ' + PE(req.n) + '.', './acc3-week' + nw + '.html', 'Go to Week ' + nw]; }
    } else if (req.type === 'grad'){
      if (!A.verified(d, NCP)) msg = ['Graduation Is Earned', 'Your Results Report and certificate unlock when your Final Checkpoint is verified.', './acc3-portal.html#acRoad', 'View Your Roadmap'];
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
      else if (g.charAt(0) === 'w'){ var w = +g.slice(1); open = A.phaseOpen(d, A.phaseOf(w)); done = A.weekDone(d, w); }
      else if (g.charAt(0) === 'c'){ var n = +g.slice(1); open = A.phaseOpen(d, n); done = A.verified(d, n); }
      else if (g === 'grad'){ open = A.verified(d, NCP); }
      if (done) a.classList.add('completed'); else if (!open) a.classList.add('locked');
    });
  };

  /* ---------- Index panel ---------- */
  A.renderIndex = function(el){
    var d = A.load(); if (!el) return;
    var base = d.m && d.m.cp0, last = A.latest(d);
    if (!base){ el.innerHTML = '<p class="ac-muted">Your Total Accountability Index appears here after you record your baseline.</p>'; return; }
    var b = A.score(base), l = A.score(last.m), delta = l.total - b.total, lbl = A.keyLabel(last.key);
    var h = '<div class="ac-idx-top"><div class="ac-idx-num">' + l.total + '<span>/100</span></div><div><div class="ac-idx-lbl">Total Accountability Index &middot; ' + lbl + '</div>' +
      (last.key === 'cp0' ? '<div class="ac-idx-d">Baseline recorded ' + A.date(base.at || d.intake.at) + '</div>' : '<div class="ac-idx-d ' + (delta >= 0 ? 'up' : 'down') + '">' + (delta >= 0 ? '+' : '') + delta + ' points since baseline (' + b.total + ')</div>') + '</div></div>';
    h += '<div class="ac-legend"><span><i class="lb"></i>Baseline</span><span><i class="ll"></i>' + lbl + '</span></div>';
    l.parts.forEach(function(p, i){
      var bp = b.parts[i];
      h += '<div class="ac-bar-row"><div class="ac-bar-lbl"><strong>' + p.label + '</strong><span>' + A.esc(p.raw) + ' &middot; target ' + p.target + '</span></div>' +
        '<div class="ac-bars"><div class="ac-bar b" style="width:' + Math.max(2, bp.s) + '%"></div><div class="ac-bar l" style="width:' + Math.max(2, p.s) + '%"></div></div></div>';
    });
    var nw = A.netWorth(last.m);
    h += '<div class="ac-wins"><div><strong>' + A.money(nw) + '</strong><span>net worth' + (last.key === 'cp0' ? ' at baseline' : ' now') + '</span></div>' +
      (last.key === 'cp0' ? '<div><strong>' + A.money(base.invbal) + '</strong><span>invested assets at baseline</span></div>' :
      '<div><strong>' + (nw - A.netWorth(base) >= 0 ? '+' : '') + A.money(nw - A.netWorth(base)) + '</strong><span>net worth change since baseline</span></div>') + '</div>';
    el.innerHTML = h;
  };

  /* ---------- worksheets and logs (definitions in acc3-data.js) ---------- */
  var DATA = window.ACC3_DATA || {weeks: {}, logs: {}};
  A.data = DATA;
  A.moduleWs = function(from, to){ var out = []; for (var w = PS(from); w <= PE(to); w++) (DATA.weeks[w] || []).forEach(function(sp){ out.push({w: w, spec: sp}); }); return out; };
  A.wsDone = function(d, n){ return A.moduleWs(1, n).filter(function(x){ return window.RSMWS && RSMWS.complete(x.spec, (d.ws || {})[x.spec.id]); }).length; };
  A.wsMissing = function(d, n){ return A.moduleWs(n, n).filter(function(x){ return !(window.RSMWS && RSMWS.complete(x.spec, (d.ws || {})[x.spec.id])); }).map(function(x){ return 'Week ' + x.w + ': ' + x.spec.title; }); };
  A.logsFor = function(n){ return Object.keys(DATA.logs).filter(function(k){ return DATA.logs[k].cp === n; }).map(function(k){ return {key: k, spec: DATA.logs[k]}; }); };
  A.logsActive = function(w){ var p = A.phaseOf(w); return Object.keys(DATA.logs).filter(function(k){ return DATA.logs[k].cp === p && DATA.logs[k].start <= w; }); };
  A.attach = function(d, n){
    var ws = A.moduleWs(n, n).map(function(x){ return 'WEEK ' + x.w + '\n' + RSMWS.text(x.spec, (d.ws || {})[x.spec.id]); }).join('\n\n');
    var lg = A.logsFor(n).map(function(x){ return RSMWS.logText(x.spec, (d.logs || {})[x.key]); }).join('\n\n');
    return {worksheets: ws, logs: lg};
  };

  /* ---------- written assessment (student) and Darrell's draft feedback ---------- */
  function pct(x){ return Math.round(x * 1000) / 10; }
  function facts(d, n){
    var base = d.m.cp0, cur = d.m['cp' + n], prev = n > 1 ? d.m['cp' + (n - 1)] : base;
    var sb = A.score(base), sc = A.score(cur), sp = A.score(prev);
    var weeks = PE(n), st = {done: 0, all: 0}, days = 0, lw = 0, rev = 0, revAll = 0, brk = [];
    for (var w = PS(n); w <= weeks; w++){ var L = d.wk && d.wk[w]; if (!L) continue; st.all++; if (L.status === 'Done') st.done++; if (+L.days >= 0 && L.days !== '' && L.days !== null){ days += +L.days; lw++; } revAll++; if (L.rev === 'Yes') rev++; if (L.brk === 'Yes') brk.push(w); }
    var gains = sc.parts.map(function(p, i){ return {p: p, g: p.s - sb.parts[i].s}; }).sort(function(a, b){ return b.g - a.g; });
    var weakest = sc.parts.slice().sort(function(a, b){ return a.s - b.s; })[0];
    var cr0 = base.inc > 0 ? base.conv / base.inc : 0, cr = cur.inc > 0 ? cur.conv / cur.inc : 0;
    return {base: base, cur: cur, prev: prev, sb: sb, sc: sc, sp: sp, st: st, logRate: lw ? days / (7 * lw) : 1, revRate: revAll ? rev / revAll : 0, brk: brk, gains: gains, weakest: weakest,
      cr0: cr0, cr: cr, nwd: A.netWorth(cur) - A.netWorth(base), wsMiss: A.wsMissing(d, n), pcFail: (d.cp && d.cp[n] && d.cp[n].pcFail) || []};
  }
  function target(f){
    var m = f.cur, k = f.weakest.k;
    if (f.weakest.s >= 95) return 'Every measure in your Index is at or near the Level 3 standard. Your job now is to hold it: same reviews, same logs, same rules, especially when it feels like you don\'t need them anymore.';
    if (k === 'conv'){ var need = Math.max(0, 0.2 * m.inc - m.conv); return 'Your conversion rate is ' + pct(f.cr) + '%. Converting ' + A.money(need) + ' more a month gets you to 20%. Automate it on payday.'; }
    if (k === 'res'){ var r = Math.max(0, 6 * m.ess - m.res); return 'Your reserve covers ' + (Math.round(m.res / m.ess * 10) / 10) + ' months of essentials. Adding ' + A.money(r) + ' gets you to six months, the Level 3 standard for a household other people depend on.'; }
    if (k === 'dti'){ var cut = Math.max(0, m.dpay - 0.1 * m.inc); return 'Consumer debt payments take ' + Math.round(m.dpay / m.inc * 100) + '% of your take-home pay. Eliminating ' + A.money(cut) + ' a month in payments gets you under 10%.'; }
    if (k === 'prot'){ var mp = A.PROT.filter(function(x, i){ return !(m.prot && m.prot[i]); }); return 'Still missing: ' + mp.join('; ') + '. Every one of these needs a date on the calendar with a licensed professional.'; }
    if (k === 'gov'){ var mg = A.GOV.filter(function(x, i){ return !(m.gov && m.gov[i]); }); return 'Still missing: ' + mg.join('; ') + '. Governance is what lets your wealth work without you in the room.'; }
    if (k === 'spf') return 'You still have ' + (m.spf >= 3 ? 'three or more' : m.spf) + ' single-point failure' + (m.spf === 1 ? '' : 's') + '. Remove or back up one this month, starting with the one that would hurt your family most.';
    if (k === 'rev') return 'You held ' + m.rev + ' of your last 4 Weekly Wealth Reviews. Every system in Level 3 depends on that review. Put it on the calendar like a meeting you can\'t miss.';
    var low = 0; (m.mind || []).forEach(function(v, i){ if (v < m.mind[low]) low = i; });
    return 'Your lowest-rated statement is "' + A.MIND[low] + '" Make that sentence the first thing you look at in every Weekly Wealth Review.';
  }
  A.assessment = function(d, n){
    var f = facts(d, n), delta = f.sc.total - f.sb.total, g = f.gains[0], out = [];
    var p1 = 'Your Total Accountability Index moved from ' + f.sb.total + ' to ' + f.sc.total + ' (' + (delta >= 0 ? '+' : '') + delta + ' points)' + (n > 1 ? ', ' + (f.sc.total - f.sp.total >= 0 ? 'up ' : 'down ') + Math.abs(f.sc.total - f.sp.total) + ' since your last scoreboard' : '') + '. ';
    p1 += g.g > 0 ? 'Your biggest gain is ' + g.p.label + ', now at ' + g.p.raw + '. ' : 'None of your eight measures has improved since baseline yet, and that has to change. ';
    p1 += 'Your conversion rate went from ' + pct(f.cr0) + '% to ' + pct(f.cr) + '%' + (f.cr >= 0.2 ? ', which meets the standard' : '') + ', and your net worth is ' + (f.nwd >= 0 ? 'up ' : 'down ') + A.money(Math.abs(f.nwd)) + ' since baseline' + (f.nwd < 0 ? '. Markets can move net worth against you even when your behavior is right, so judge yourself on conversion and rules first.' : '.');
    out.push(p1);
    var strongB = f.st.done >= f.st.all * 0.75 && f.logRate >= 0.8 && f.revRate >= 0.75 && f.brk.length <= 1;
    var p2 = 'On execution, you completed ' + f.st.done + ' of ' + f.st.all + ' Field Assignments this module, kept your proof logs on ' + Math.round(f.logRate * 100) + '% of days, and held ' + Math.round(f.revRate * 100) + '% of your Weekly Wealth Reviews. ';
    if (f.brk.length) p2 += 'You reported a broken rule in Week ' + f.brk.join(' and Week ') + '. Reporting it was the right call; now the system that allowed it has to change. ';
    if (f.wsMiss.length) p2 += 'Worksheets still incomplete: ' + f.wsMiss.join(', ') + '. ';
    if (f.pcFail.length) p2 += 'You marked ' + f.pcFail.length + ' pass criteri' + (f.pcFail.length > 1 ? 'a' : 'on') + ' as not met: ' + f.pcFail.join('; ') + '. ';
    p2 += strongB && delta > 0 ? 'Your behavior and your numbers are moving together. That\'s what operating looks like.' : strongB ? 'Your behavior is at the standard even though the numbers haven\'t caught up. Keep going: results follow behavior, usually with a delay.' : delta > 0 ? 'Your numbers are moving faster than your habits. That\'s a warning, not a win, because results without discipline don\'t last.' : 'Your behavior and your numbers both need correction. The fix starts with the basics: every log, every review, every week.';
    out.push(p2);
    out.push((f.weakest.s >= 95 ? '' : 'Your priority for ' + (n === NCP ? 'the next 90 days' : PN[n]) + ' is ' + f.weakest.label + '. ') + target(f) + (n === NCP ? ' Keep your Weekly Wealth Review on the calendar. Graduation ends the program, not the standard.' : ''));
    return out;
  };
  A.coachDraft = function(d, n){
    var f = facts(d, n), delta = f.sc.total - f.sb.total, name = d.me.first, g = f.gains[0];
    var a = name + ', I reviewed your ' + A.cpLabel(n) + (n === NCP ? ' scoreboard' : '') + '. Your Total Accountability Index is ' + f.sc.total + ', ' + (delta >= 0 ? 'up ' : 'down ') + Math.abs(delta) + ' points from your baseline of ' + f.sb.total + '. ' +
      (g.g > 0 ? 'What stands out most is your ' + g.p.label + ': ' + g.p.raw + '. ' : '') + 'Your conversion rate moved from ' + pct(f.cr0) + '% to ' + pct(f.cr) + '%, and your net worth is ' + (f.nwd >= 0 ? 'up ' : 'down ') + A.money(Math.abs(f.nwd)) + '.';
    var b = 'Here\'s what I see in your execution. You completed ' + f.st.done + ' of ' + f.st.all + ' Field Assignments, kept your logs on ' + Math.round(f.logRate * 100) + '% of days, and held ' + Math.round(f.revRate * 100) + '% of your Weekly Wealth Reviews. ' +
      (f.brk.length ? 'You told me you broke a rule in Week ' + f.brk.join(' and Week ') + '. I respect that you reported it. Now show me what changed so it doesn\'t happen again. ' : 'You reported no broken rules. Keep it that way by keeping your filter in front of every decision. ') +
      (f.pcFail.length ? 'You were honest that ' + f.pcFail.length + ' pass criteri' + (f.pcFail.length > 1 ? 'a aren\'t' : 'on isn\'t') + ' met yet, and that\'s what we fix before you move on. ' : '');
    var c = (f.weakest.s >= 95 ? '' : 'Your focus ' + (n === NCP ? 'from here' : 'for ' + PN[n]) + ' is ' + f.weakest.label + '. ') + target(f) + ' We\'ll go over it on your next check-in. Stay on the standard.';
    return [a, b, c].join('\n\n');
  };

  /* ---------- Progress Report: numbers + execution record + patterns from the student's own logs ---------- */
  var REPORT_TPL = 'template_qmceg0h';
  var THEMES = [
    {k: 'Avoiding the hard documents', re: /\b(put(ting)? (it )?off|haven'?t (called|scheduled|started)|later|someday|procrastinat\w*|avoid\w*|attorney|lawyer|will|trust|paperwork)\b/i,
     fix: 'The documents and calls you keep postponing are exactly the ones your family will need most. Put one appointment on the calendar this week and log it.'},
    {k: 'Family pressure and requests', re: /\b(family|kids|children|son|daughter|mom|dad|mother|father|brother|sister|cousin|relatives?|asked (me )?for money|loan(ed)?|borrow\w*)\b/i,
     fix: 'Family is pulling on your plan. Use your Family Money Request Policy word for word, and bring every exception to your council instead of deciding alone.'},
    {k: 'Conflict and disagreement', re: /\b(argu\w*|fight\w*|disagree\w*|conflict|upset|tension|resent\w*|unfair)\b/i,
     fix: 'Disagreement is showing up. Run it through your Conflict Protocol instead of handling it in the moment, and put the issue on your next council agenda.'},
    {k: 'Fear and hard conversations', re: /\b(scared|afraid|fear|uncomfortable|awkward|death|dying|die|illness|sick|morbid|don'?t want to think)\b/i,
     fix: 'This work touches things nobody likes to think about. That discomfort is the signal you\'re doing the real work. Do it calmly now so your family never has to do it in a crisis.'},
    {k: 'Cost of protection', re: /\b(premium|expensive|cost|afford|price|quote|insurance)\b/i,
     fix: 'Protection costs money. Losing everything costs more. Compare every premium to the loss it prevents, and get quotes from licensed professionals who work for you.'},
    {k: 'Time and consistency', re: /\b(busy|no time|tired|exhausted|behind|forgot|schedule|slipped|overtime)\b/i,
     fix: 'Your systems are only as strong as your Weekly Wealth Review. Protect that time like a commitment to someone else, because it is one.'},
    {k: 'Business and income pressure', re: /\b(business|client|partner|payroll|income dropped|slow month|laid off|hours cut)\b/i,
     fix: 'Income or business pressure is in your logs. Check your single-point failures and your reserve first, and make sure your business and personal money stay separate.'}
  ];
  var FOCUS = {
    conv: 'Raise your automatic conversion and route new money before it reaches your spending account.',
    res: 'Build your reserve toward six months of essentials. It\'s the first layer of every protection plan.',
    dti: 'Bring consumer debt payments under 10% of take-home pay, then keep them there.',
    prot: 'Schedule the missing protections with licensed professionals, one appointment at a time, until all eight are in place.',
    gov: 'Finish your governance systems so your wealth can be managed and decided on without you in the room.',
    spf: 'Remove or back up your remaining single-point failures, starting with the one that would hurt most.',
    rev: 'Hold every Weekly Wealth Review. It\'s the heartbeat of every system you\'ve built.',
    mind: 'Reread your Legacy Statement and Wealth Constitution before every Weekly Wealth Review.'
  };
  function eh(t){ return '<div style="font-family:Georgia,serif;font-size:19px;font-weight:bold;color:#0D1F3C;margin:26px 0 10px;padding-top:14px;border-top:1px solid #EEE6D2">' + t + '</div>'; }
  function ep(t){ return '<p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#333">' + t + '</p>'; }
  function arrow(x){ return x > 0 ? '<span style="color:#1A6B3C;font-weight:bold">&#9650; +' + x + '</span>' : x < 0 ? '<span style="color:#9B1C1C;font-weight:bold">&#9660; ' + x + '</span>' : '<span style="color:#888">no change</span>'; }
  A.analysis = function(d, n){
    var base = d.m.cp0, cur = d.m['cp' + n], prev = n > 1 ? d.m['cp' + (n - 1)] : base;
    var sb = A.score(base), sc = A.score(cur), sp = A.score(prev), weeks = PE(n);
    var title = n === NCP ? 'Final Results Report' : A.cpLabel(n) + ' Progress Report';
    var h = '';
    function cell(v, t, first){ return '<td style="background:#0D1F3C;padding:16px;text-align:center;width:33%' + (first ? '' : ';border-left:1px solid #24375a') + '"><div style="font-family:Georgia,serif;font-size:30px;color:#E8B84B;font-weight:bold">' + v + '</div><div style="font-size:11px;letter-spacing:1px;color:#ccc">' + t + '</div></td>'; }
    h += '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 6px"><tr>' +
      cell(sc.total, 'INDEX NOW', true) + cell((sc.total - sb.total >= 0 ? '+' : '') + (sc.total - sb.total), 'SINCE BASELINE') +
      cell(n > 1 ? ((sc.total - sp.total >= 0 ? '+' : '') + (sc.total - sp.total)) : sb.total, n > 1 ? 'SINCE LAST CHECKPOINT' : 'BASELINE INDEX') + '</tr></table>';
    var asm = A.assessment(d, n);
    h += eh('Your Assessment') + asm.map(ep).join('');
    h += eh('Measure by Measure');
    h += '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:13px"><tr style="background:#0D1F3C;color:#E8B84B"><td style="padding:8px">Measure</td><td style="padding:8px">Baseline</td><td style="padding:8px">Now</td><td style="padding:8px">' + (n > 1 ? 'Since last' : 'Change') + '</td></tr>' +
      sc.parts.map(function(p, i){ return '<tr style="background:' + (i % 2 ? '#F7F5EF' : '#FFF') + '"><td style="padding:8px;font-weight:bold;color:#0D1F3C">' + p.label + '</td><td style="padding:8px;color:#555">' + A.esc(sb.parts[i].raw) + '</td><td style="padding:8px;color:#333">' + A.esc(p.raw) + '</td><td style="padding:8px">' + arrow(Math.round(p.s - sp.parts[i].s)) + '</td></tr>'; }).join('') + '</table>';
    var gains = sc.parts.map(function(p, i){ return {p: p, g: p.s - sb.parts[i].s}; }).sort(function(a, b){ return b.g - a.g; });
    var weakest = sc.parts.slice().sort(function(a, b){ return a.s - b.s; })[0];
    var nwd = A.netWorth(cur) - A.netWorth(base), invd = (+cur.invbal) - (+base.invbal), resd = (+cur.res) - (+base.res);
    h += eh('What the Numbers Say');
    h += ep('<strong>Biggest gain:</strong> ' + gains[0].p.label + ' (' + A.esc(gains[0].p.raw) + ').' + (gains[0].g <= 0 ? ' No measure has improved since baseline yet. That has to change in the next module.' : ''));
    h += ep(weakest.s >= 95 ? '<strong>Every measure is at or above its target.</strong> Hold the standard.' : '<strong>Weakest measure right now:</strong> ' + weakest.label + ' at ' + A.esc(weakest.raw) + '. The target is ' + weakest.target + '.');
    h += ep('<strong>Net worth:</strong> ' + A.money(A.netWorth(cur)) + ', ' + (nwd >= 0 ? 'up ' + A.money(nwd) : 'down ' + A.money(-nwd)) + ' since baseline. <strong>Invested assets:</strong> ' + (invd >= 0 ? 'up ' + A.money(invd) : 'down ' + A.money(-invd)) + '. <strong>Cash reserves:</strong> ' + (resd >= 0 ? 'up ' + A.money(resd) : 'down ' + A.money(-resd)) + '.' +
      (nwd < 0 ? ' Market moves can lower net worth even when your behavior is right. Judge yourself by your conversion rate and your rules, and keep the long view.' : ''));
    var st = {Done: 0, 'Partially done': 0, 'Not done': 0}, days = 0, lw = 0, revY = 0, revN = 0, brk = 0, logged = 0, brkW = [];
    for (var w = 1; w <= weeks; w++){ var L = d.wk && d.wk[w]; if (!L) continue; logged++; st[L.status] = (st[L.status] || 0) + 1; if (+L.days >= 0 && L.days !== '' && L.days !== null){ days += +L.days; lw++; } if (L.rev === 'Yes') revY++; else if (L.rev === 'No') revN++; if (L.brk === 'Yes'){ brk++; brkW.push(w); } }
    var doneRate = logged ? st.Done / logged : 0, logRate = lw ? days / (7 * lw) : 1, revRate = (revY + revN) ? revY / (revY + revN) : 0;
    var strikes = A.strikes(d).length;
    var rating = doneRate >= 0.75 && logRate >= 0.8 && revRate >= 0.75 && brk <= 1 ? 'Total Accountability standard' : (doneRate < 0.5 || logRate < 0.5 || brk >= 3) ? 'Needs immediate correction' : 'Inconsistent';
    h += eh('Your Execution Record');
    h += ep('<strong>Execution rating: ' + rating + '.</strong> Field Assignments: ' + st.Done + ' done, ' + st['Partially done'] + ' partial, ' + st['Not done'] + ' not done, out of ' + weeks + ' weeks. Proof logs kept on ' + days + ' of ' + (7 * lw) + ' days (' + Math.round(logRate * 100) + '%). Worksheets complete: ' + A.wsDone(d, n) + ' of ' + A.moduleWs(1, n).length + '. Weekly Wealth Reviews held: ' + revY + ' of ' + (revY + revN) + '. Weeks with a broken rule: ' + brk + (brk ? ' (Week ' + brkW.join(', Week ') + ')' : '') + '. Strikes on record: ' + strikes + '.');
    var hits = THEMES.map(function(t){ var wk = []; for (var w = 1; w <= weeks; w++){ var L = d.wk && d.wk[w]; if (L && t.re.test([L.res, L.set, L.drill, L.did, L.brkd].join(' '))) wk.push(w); } return {t: t, wk: wk}; })
      .filter(function(x){ return x.wk.length; }).sort(function(a, b){ return b.wk.length - a.wk.length; }).slice(0, 3);
    h += eh('Patterns in Your Own Words');
    if (hits.length){
      h += ep('These themes came up in your weekly logs, in your own words:');
      h += hits.map(function(x){ return '<div style="background:#FBF7EE;border-left:4px solid #C9941A;padding:12px 14px;margin:0 0 10px"><div style="font-weight:bold;color:#0D1F3C;font-size:15px">' + x.t.k + (x.wk.length > 1 ? ' (recurring)' : '') + '</div><div style="font-size:13px;color:#777;margin:2px 0 6px">Mentioned in Week ' + x.wk.join(', Week ') + '</div><div style="font-size:14px;color:#333;line-height:1.6">' + x.t.fix + '</div></div>'; }).join('');
    } else h += ep('No recurring obstacle showed up in your logs. Either you\'re executing cleanly, or your logs are too general to show a pattern. Be specific: what happened, when, and what it cost.');
    var lens = [], nd = [], br = [];
    for (var w2 = 1; w2 <= weeks; w2++){ var L2 = d.wk && d.wk[w2]; if (!L2) continue; lens.push(((L2.res || '') + (L2.set || '')).length); if (L2.status !== 'Done' && L2.set) nd.push('Week ' + w2 + ': "' + A.esc(L2.set.slice(0, 220)) + '"'); if (L2.brk === 'Yes' && L2.brkd) br.push('Week ' + w2 + ': "' + A.esc(L2.brkd.slice(0, 220)) + '"'); }
    if (lens.length && lens.reduce(function(a, b){ return a + b; }, 0) / lens.length < 60) h += ep('<strong>Note:</strong> your Resistance and Setbacks answers are short. Vague logs hide patterns, and patterns are what you need to see.');
    if (br.length) h += ep('<strong>Rules you reported breaking:</strong><br>' + br.join('<br>'));
    if (nd.length) h += ep('<strong>Where you said you fell short:</strong><br>' + nd.join('<br>'));
    var fixes = [];
    for (var w3 = PS(n); w3 <= weeks; w3++){ var L3 = d.wk && d.wk[w3]; if (L3 && L3.fix) fixes.push('Week ' + w3 + ': "' + A.esc(L3.fix) + '"'); }
    var cpn = d.cp && d.cp[n];
    h += eh(n === NCP ? 'Your Standard for the Next 12 Months' : 'The Standard You Set for Yourself');
    if (fixes.length) h += ep('<strong>Your corrections:</strong><br>' + fixes.join('<br>'));
    if (cpn && cpn.next) h += ep('<strong>Your standard going forward:</strong> "' + A.esc(cpn.next) + '"');
    h += ep('These are your words, not Darrell\'s. Hold yourself to them.');
    h += eh(n === NCP ? 'Your Focus After Graduation' : 'Your Focus for ' + PN[n]);
    h += '<ol style="margin:0 0 12px 18px;padding:0;font-size:15px;line-height:1.65;color:#333"><li style="margin-bottom:6px"><strong>' + weakest.label + ':</strong> ' + FOCUS[weakest.k] + '</li>' +
      (hits.length ? '<li style="margin-bottom:6px"><strong>' + hits[0].t.k + ':</strong> ' + hits[0].t.fix + '</li>' : '') +
      (brk ? '<li style="margin-bottom:6px"><strong>Rule integrity:</strong> you reported ' + brk + ' week' + (brk > 1 ? 's' : '') + ' with a broken rule. For every one, write what the rule should have stopped and the system that will enforce it next time.</li>' : '') +
      (rating !== 'Total Accountability standard' ? '<li style="margin-bottom:6px"><strong>Execution:</strong> complete every Field Assignment fully, keep every proof log daily, and hold every Weekly Wealth Review. Partial work produces partial results.</li>' : '<li style="margin-bottom:6px"><strong>Execution:</strong> you\'re operating at the standard. Protect it. Success is exactly when discipline starts to slip.</li>') + '</ol>';
    return {title: title, html: h};
  };
  /* ---------- automatic weekly report (student and Darrell) ---------- */
  A.weekReport = function(d, w, Lo){
    var L = Lo || (d.wk && d.wk[w]); if (!L) return null; var TX = [];
    var p = A.phaseOf(w), sp = (DATA.weeks[w] || []), done = sp.filter(function(x){ return window.RSMWS && RSMWS.complete(x, (d.ws || {})[x.id]); }).length;
    var start = new Date(d.me.start).getTime(), daysIn = Math.max(1, Math.floor((Date.now() - start) / DAY) + 1);
    var tot = {done: 0, all: 0, brk: 0, rev: 0}; for (var i = 1; i <= w; i++){ var x = (i === w) ? L : (d.wk && d.wk[i]); if (!x) continue; tot.all++; if (x.status === 'Done') tot.done++; if (x.brk === 'Yes') tot.brk++; if (x.rev === 'Yes') tot.rev++; }
    var dl = A.deadlines(d)[p], strikes = A.strikes(d).length;
    function row(a, b){ TX.push(a + ': ' + String(b).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&')); return '<tr><td style="padding:8px 10px;border-bottom:1px solid #EEE6D2;color:#0D1F3C;font-weight:bold;width:45%">' + a + '</td><td style="padding:8px 10px;border-bottom:1px solid #EEE6D2;color:#333">' + b + '</td></tr>'; }
    var h = '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">' +
      row('Field Assignment', A.esc(L.status)) + row('Worksheets this week', done + ' of ' + sp.length + ' complete') + row('Proof log', (+L.days >= 0 ? L.days + ' of 7 days' : 'No log this week')) +
      row('Weekly Wealth Review', L.rev === 'Yes' ? 'Held' : 'Not held') + row('Rules broken this week', L.brk === 'Yes' ? 'Yes: ' + A.esc(L.brkd) : 'None reported') +
      row('Program so far', tot.done + ' of ' + tot.all + ' assignments done, ' + tot.rev + ' reviews held, ' + tot.brk + ' week' + (tot.brk === 1 ? '' : 's') + ' with a broken rule') +
      row('Next deadline', A.cpLabel(p) + ', ' + A.date(dl.due)) + row('Strikes on record', String(strikes)) + '</table>';
    var notes = [];
    if (L.status !== 'Done') notes.push('This week\'s Field Assignment isn\'t complete. Finish it before your ' + A.cpLabel(p) + ', because every item is required.');
    if (done < sp.length) notes.push('Finish your remaining worksheets for Week ' + w + '. They\'re attached to your scoreboard automatically.');
    if (+L.days >= 0 && +L.days < 6) notes.push('Your proof log missed ' + (7 - L.days) + ' day' + (7 - L.days === 1 ? '' : 's') + '. One line a day is the standard.');
    if (L.rev !== 'Yes') notes.push('You missed your Weekly Wealth Review. Schedule it now, before anything else this week.');
    if (L.brk === 'Yes') notes.push('You reported a broken rule. Bring it to your check-in with Darrell, along with the change that keeps it from happening again.');
    if (!notes.length) notes.push('Clean week. Every item done and every system running. That\'s Total Accountability.');
    h += '<div style="font-family:Georgia,serif;font-size:17px;font-weight:bold;color:#0D1F3C;margin:20px 0 8px">What to Do Next</div><ul style="margin:0 0 12px 18px;padding:0;font-size:14px;line-height:1.6;color:#333">' + notes.map(function(n){ return '<li style="margin-bottom:6px">' + n + '</li>'; }).join('') + '</ul>' +
      '<div style="font-size:13px;color:#777">Your correction for next week: "' + A.esc(L.fix) + '"<br>Your check-in agenda: "' + A.esc(L.agenda || '') + '"<br>Day ' + Math.min(daysIn, 98) + ' of 98.</div>';
    var text = TX.join('\n') + '\n\nWhat to do next:\n' + notes.map(function(n){ return '- ' + n; }).join('\n') + '\n\nCorrection for next week: ' + (L.fix || '') + '\nCheck-in agenda: ' + (L.agenda || '') + '\nDay ' + Math.min(daysIn, 98) + ' of 98.';
    return {title: 'Week ' + w + ' Accountability Report', html: h, text: text};
  };
  A.sendWeekly = function(w){
    var d = A.load(); if (!d.me) return; var r = A.weekReport(d, w); if (!r) return;
    var body = JSON.stringify({service_id: 'service_65dy311', template_id: REPORT_TPL, user_id: 'gkDCipr-1PUVhTb5X', template_params: {
      to_name: d.me.first, to_email: d.me.email, program: PROGRAM, report_title: r.title, intro: 'Here\'s your automatic report for Week ' + w + ', built from the log you just submitted. Darrell receives a copy before your weekly check-in.', report_html: r.html}});
    try { fetch('https://api.emailjs.com/api/v1.0/email/send', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body, keepalive: true}).catch(function(){}); } catch(e){}
  };
  A.sendReport = function(n){
    if (!REPORT_TPL) return;
    var d = A.load(); if (!d.me || !d.m || !d.m['cp' + n]) return;
    var r = A.analysis(d, n);
    var intro = n === NCP ? 'Here\'s your Final Results Report: fourteen weeks of your numbers and your own words, side by side. Darrell is reviewing your final scoreboard now, and your verification decision will come in a separate email.'
      : 'Here\'s your ' + A.cpLabel(n) + ' Progress Report, built from your measurements and your own weekly logs. Darrell is reviewing your scoreboard now, and your verification decision will come in a separate email.';
    var body = JSON.stringify({service_id: 'service_65dy311', template_id: REPORT_TPL, user_id: 'gkDCipr-1PUVhTb5X', template_params: {
      to_name: d.me.first, to_email: d.me.email, program: PROGRAM, report_title: r.title, intro: intro, report_html: r.html}});
    try { fetch('https://api.emailjs.com/api/v1.0/email/send', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: body, keepalive: true}).catch(function(){}); } catch(e){}
  };

  /* ---------- verification code entry ---------- */
  A.mountCode = function(el, n, onOk){
    if (!el) return;
    var label = A.cpLabel(n);
    el.innerHTML = '<div class="ac-code"><label for="acCode' + n + '"><strong>' + label + ' verification code</strong><span>Darrell sends this after he reviews your scoreboard.</span></label>' +
      '<div class="ac-code-row"><input id="acCode' + n + '" type="text" placeholder="V' + n + '-XXXXXX" autocomplete="off" spellcheck="false"><button type="button" class="ac-btn">Unlock</button></div><p class="ac-msg" aria-live="polite"></p></div>';
    var inp = el.querySelector('input'), msg = el.querySelector('.ac-msg');
    el.querySelector('button').addEventListener('click', function(){
      var d = A.load();
      if (A.checkCode(inp.value, d.me.email, 'V' + n)){
        A.update(function(x){ x.ver = x.ver || {}; x.ver[n] = true; x.verAt = x.verAt || {}; x.verAt[n] = new Date().toISOString(); });
        msg.className = 'ac-msg ok'; msg.textContent = 'Verified. ' + (n === NCP ? 'Your Results Report is unlocked.' : PN[n] + ' is unlocked.');
        if (onOk) setTimeout(onOk, 900);
      } else {
        msg.className = 'ac-msg err'; msg.textContent = 'That code doesn\'t match. Check it against Darrell\'s email, and make sure you checked in with the same email address.';
      }
    });
  };

  /* ---------- backup / restore ---------- */
  A.exportCode = function(){ try { return btoa(unescape(encodeURIComponent(JSON.stringify(A.load())))); } catch(e){ return ''; } };
  A.importCode = function(code){
    try { var d = JSON.parse(decodeURIComponent(escape(atob(String(code).trim())))); if (!d || !d.me || !d.me.email || d.lvl !== 3 || !A.checkCode(d.enr, d.me.email, 'E1')) return false; A.save(d); return true; } catch(e){ return false; }
  };

  document.addEventListener('DOMContentLoaded', A.sidebar);
})();
