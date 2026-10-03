/* RSM Accountability Program, Level 2 engine: Wealth System Accountability.
   Tracks check-in, commitment, weekly logs, scoreboards (checkpoints), verification codes, strikes, and the Wealth System Index.
   Progress lives on the student's device (with backup/restore). Every submission is also sent to Darrell. */
(function(){
  var KEY = 'rsm_acc2_v1';
  var FORM = 'https://formspree.io/f/xrpbgjbb';
  var KIT = '9981618';
  var SITE = 'https://dtrsm1990.github.io/rightsideofmoney/';
  var SALT = 'RSM|ACC2|Operator|2026';
  var DAY = 86400000, GRACE = 2 * DAY, WPP = 4, NCP = 3, CYCLE = 28;
  var PROGRAM = 'RSM Accountability Program, Level 2';
  var A = window.ACC2 = {program: PROGRAM, site: SITE, wpp: WPP, ncp: NCP};

  /* ---------- storage ---------- */
  A.load = function(){ try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch(e){ return {}; } };
  A.save = function(d){ try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e){} };
  A.update = function(fn){ var d = A.load(); fn(d); A.save(d); return d; };
  A.esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  A.money = function(n){ n = Number(n) || 0; return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US'); };
  A.date = function(t){ return new Date(t).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'}); };
  A.cpLabel = function(n){ return n === NCP ? 'Final Checkpoint' : 'Checkpoint ' + n; };

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
    raw = (raw + 'K4W8M3').replace(/[O0I1]/g, '8').slice(0, 6);
    return tag + '-' + raw; /* tags: V1..V3 verify scoreboards, R1.. reinstate after a pause */
  };
  A.checkCode = function(input, email, tag){ return String(input || '').trim().toUpperCase().replace(/\s+/g, '') === A.code(email, tag); };

  /* ---------- timeline, gates, strikes ---------- */
  A.deadlines = function(d){
    if (!d.me) return [];
    var s = new Date(d.me.start); s.setHours(23, 59, 0, 0); s = s.getTime();
    var list = [{id: 'intake', label: 'Commitment & Baseline', due: s + 3 * DAY, at: d.intake && d.intake.at}];
    for (var n = 1; n <= NCP; n++) list.push({id: 'cp' + n, label: A.cpLabel(n), due: s + CYCLE * n * DAY, at: d.cp && d.cp[n] && d.cp[n].at});
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
  A.phaseOf = function(w){ return Math.ceil(w / WPP); };
  A.cpReady = function(d, n){
    if (!A.phaseOpen(d, n)) return false;
    for (var w = WPP * (n - 1) + 1; w <= WPP * n; w++) if (!A.weekDone(d, w)) return false;
    return true;
  };
  A.cpSubmitted = function(d, n){ return !!(d.cp && d.cp[n]); };
  A.nextWeek = function(d, n){ for (var w = WPP * (n - 1) + 1; w <= WPP * n; w++) if (!A.weekDone(d, w)) return w; return WPP * n; };

  /* ---------- Wealth System Index ---------- */
  A.RULES = ['Lifestyle Lock Rule', 'Opportunity Filter and Default No Rule', 'Allocation Rules', 'Entry Criteria and Exit Rules', 'Leverage Boundaries and Reduction Triggers', 'Pause Triggers'];
  A.MIND = [
    'I make financial decisions using written rules, not feelings.',
    'I say no to opportunities that don\'t pass my filter, even when they sound good.',
    'When my income goes up, my lifestyle stays locked.',
    'I know how much loss I can survive without damaging my household.',
    'I can explain every asset I own and why I own it.',
    'I protect my time and focus for wealth-building work.',
    'I pause or scale back when my rules say stop, even when I don\'t want to.',
    'I review my numbers on a schedule, even when things are going well.'
  ];
  function clamp(x){ return Math.max(0, Math.min(100, x)); }
  function r1(x){ return Math.round(x * 10) / 10; }
  A.score = function(m){
    if (!m) return null;
    var inc = +m.inc || 0, parts = [];
    var rate = inc > 0 ? (+m.conv || 0) / inc : 0;
    parts.push({k: 'conv', label: 'Conversion Rate', w: 15, s: clamp(rate / 0.20 * 100), raw: r1(rate * 100) + '% of take-home converted', target: '20% or more'});
    var months = (+m.ess || 0) > 0 ? (+m.res || 0) / (+m.ess) : 0;
    parts.push({k: 'res', label: 'Reserve Strength', w: 15, s: clamp(months / 3 * 100), raw: r1(months) + (r1(months) === 1 ? ' month of essentials' : ' months of essentials'), target: '3 months or more'});
    var inv = +m.inv || 0;
    parts.push({k: 'inv', label: 'Investing Consistency', w: 10, s: clamp(inv / 3 * 100), raw: inv + ' of the last 3 months automated', target: '3 of 3 months'});
    var dti = inc > 0 ? (+m.dpay || 0) / inc : ((+m.dpay || 0) > 0 ? 1 : 0);
    parts.push({k: 'dti', label: 'Debt Load', w: 10, s: clamp((0.5 - dti) / 0.4 * 100), raw: Math.round(dti * 100) + '% of take-home to consumer debt', target: '10% or less'});
    var rules = (m.rules || []).filter(function(v){ return v; }).length;
    parts.push({k: 'rules', label: 'Rules Installed', w: 15, s: clamp(rules / 6 * 100), raw: rules + ' of 6 written rule sets in force', target: '6 of 6'});
    var hrs = +m.focus || 0;
    parts.push({k: 'focus', label: 'Protected Capacity', w: 10, s: clamp(hrs / 5 * 100), raw: hrs + (hrs === 1 ? ' protected hour' : ' protected hours') + ' a week', target: '5 hours a week'});
    var un = +m.unpl || 0;
    parts.push({k: 'unpl', label: 'Opportunity Discipline', w: 10, s: un === 0 ? 100 : un === 1 ? 50 : 0, raw: un === 0 ? 'No unfiltered commitments' : un + (un >= 2 ? '+' : '') + ' unfiltered commitment' + (un === 1 ? '' : 's'), target: 'Zero unfiltered'});
    var mind = (m.mind || []).filter(function(v){ return v; }), avg = mind.length ? mind.reduce(function(a, b){ return a + (+b); }, 0) / mind.length : 1;
    parts.push({k: 'mind', label: 'Operator Mindset', w: 15, s: clamp((avg - 1) / 4 * 100), raw: r1(avg) + ' of 5 average', target: '4.5 or higher'});
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
  var NUMS = ['inc', 'conv', 'res', 'ess', 'invbal', 'assets', 'liab', 'dpay', 'focus'];
  A.readMetrics = function(root){
    var q = function(id){ var el = root.querySelector('#' + id); return el ? el.value.trim() : ''; };
    var m = {mind: [], rules: []};
    NUMS.forEach(function(k){ m[k] = q('m_' + k); });
    m.inv = q('m_inv'); m.unpl = q('m_unpl');
    for (var i = 0; i < NUMS.length; i++) if (m[NUMS[i]] === '' || isNaN(+m[NUMS[i]]) || +m[NUMS[i]] < 0) return {err: 'Every number in the measurement section is required. Use 0 when the answer is zero.'};
    if (m.inv === '') return {err: 'Choose how many of the last 3 months your investing was automated.'};
    if (m.unpl === '') return {err: 'Choose how many unfiltered financial commitments you made in the last 30 days.'};
    if (+m.inc <= 0) return {err: 'Enter your monthly take-home income so the Index can be calculated.'};
    if (+m.ess <= 0) return {err: 'Enter your monthly essential expenses so your reserve can be measured.'};
    if (+m.focus > 80) return {err: 'Protected hours are per week. Enter a number from 0 to 80.'};
    for (var r = 0; r < A.RULES.length; r++){ var cb = root.querySelector('#m_rule' + r); m.rules.push(!!(cb && cb.checked)); }
    for (var j = 0; j < A.MIND.length; j++){
      var x = root.querySelector('input[name="mind' + j + '"]:checked');
      if (!x) return {err: 'Rate all 8 Operator Mindset statements.'};
      m.mind.push(+x.value);
    }
    NUMS.forEach(function(k){ m[k] = +m[k]; }); m.inv = +m.inv; m.unpl = +m.unpl;
    return {m: m};
  };
  A.metricsText = function(m){
    var s = A.score(m);
    return 'Take-home income: ' + A.money(m.inc) + '/mo\nConverted in the last 30 days (saved, invested, extra debt): ' + A.money(m.conv) + '\nCash reserves: ' + A.money(m.res) + '\nEssential expenses: ' + A.money(m.ess) + '/mo' +
      '\nMonths of automated investing (last 3): ' + m.inv + '\nInvested assets: ' + A.money(m.invbal) + '\nTotal assets: ' + A.money(m.assets) + '\nTotal liabilities: ' + A.money(m.liab) + '\nNet worth: ' + A.money(A.netWorth(m)) +
      '\nConsumer debt payments: ' + A.money(m.dpay) + '/mo\nRules in force: ' + A.RULES.filter(function(r, i){ return m.rules[i]; }).join(', ') + (m.rules.some(function(v){ return v; }) ? '' : 'None yet') +
      '\nProtected hours per week: ' + m.focus + '\nUnfiltered commitments (30 days): ' + (m.unpl >= 2 ? '2 or more' : m.unpl) + '\nMindset ratings: ' + m.mind.join(', ') +
      '\n\nWEALTH SYSTEM INDEX: ' + s.total + '/100\n' + s.parts.map(function(p){ return '  ' + p.label + ': ' + Math.round(p.s) + ' (' + p.raw + ')'; }).join('\n');
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
    var url = SITE + 'acc2-portal.html';
    var links = '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:4px 0 0"><tr><td style="background:#FBF7EE;border-left:4px solid #C9941A;padding:16px 18px">' +
      '<div style="font-family:Georgia,serif;font-size:18px;color:#0D1F3C;font-weight:bold;margin-bottom:10px">Level 2 Operations Center</div>' +
      '<a href="' + url + '" style="display:inline-block;background:#C9941A;color:#0D1F3C;font-weight:bold;font-size:14px;text-decoration:none;padding:12px 22px;border-radius:2px">Open Operations Center &rarr;</a>' +
      '<div style="font-size:12px;color:#777;margin-top:10px;word-break:break-all">' + url + '</div></td></tr></table>';
    var body = JSON.stringify({service_id: 'service_65dy311', template_id: 'template_wor36wk', user_id: 'gkDCipr-1PUVhTb5X', template_params: {
      to_name: first, to_email: email,
      intro: "You're officially enrolled in Level 2 of the RSM Accountability Program: Wealth System Accountability. Your 12-week clock starts today. Your Commitment & Baseline is due within 3 days, and every deadline is posted in your Operations Center. Use the backup tool there if you ever switch devices.",
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
    if (!d.me) msg = ['Check In First', 'Every operator checks in on the Operations Center before starting. That\'s where your clock, deadlines, and Wealth System Index live.', './acc2-portal.html', 'Go to Operations Center'];
    else if (A.paused(d) && req.type !== 'intake') msg = ['Program Paused', 'You\'ve reached the strike limit. Your work is saved, but nothing moves forward until you recommit. Go to the Operations Center to submit your recommitment.', './acc2-portal.html#acPause', 'Recommit Now'];
    else if (req.type === 'intake') msg = null;
    else if (!d.intake) msg = ['Commitment Comes First', 'Sign your Operator Contract and record your baseline before any week opens. No baseline, no way to prove change.', './acc2-intake.html', 'Complete Commitment & Baseline'];
    else if (req.type === 'week'){
      var p = A.phaseOf(req.w);
      if (!A.phaseOpen(d, p)) msg = ['Module ' + p + ' Is Locked', 'Module ' + p + ' opens when Checkpoint ' + (p - 1) + ' is verified. Submit your scoreboard, then enter the verification code Darrell sends you on the Operations Center.', './acc2-portal.html#acRoad', 'View Your Roadmap'];
      else if (req.w % WPP !== 1 && !A.weekDone(d, req.w - 1)) msg = ['Finish Week ' + (req.w - 1) + ' First', 'Weeks are done in order. Submit your Week ' + (req.w - 1) + ' Operator Log to open this week.', './acc2-week' + (req.w - 1) + '.html', 'Go to Week ' + (req.w - 1)];
    } else if (req.type === 'cp'){
      if (!A.phaseOpen(d, req.n)) msg = ['Scoreboard Locked', 'This scoreboard opens with Module ' + req.n + '.', './acc2-portal.html#acRoad', 'View Your Roadmap'];
      else if (!A.cpReady(d, req.n)){ var nw = A.nextWeek(d, req.n); msg = ['Complete the Work First', A.cpLabel(req.n) + ' opens after you submit the Operator Logs for Weeks ' + (WPP * (req.n - 1) + 1) + ' through ' + (WPP * req.n) + '.', './acc2-week' + nw + '.html', 'Go to Week ' + nw]; }
    } else if (req.type === 'grad'){
      if (!A.verified(d, NCP)) msg = ['Graduation Is Earned', 'Your Results Report and certificate unlock when your Final Checkpoint is verified.', './acc2-portal.html#acRoad', 'View Your Roadmap'];
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
    if (!base){ el.innerHTML = '<p class="ac-muted">Your Wealth System Index appears here after you record your baseline.</p>'; return; }
    var b = A.score(base), l = A.score(last.m), delta = l.total - b.total, lbl = A.keyLabel(last.key);
    var h = '<div class="ac-idx-top"><div class="ac-idx-num">' + l.total + '<span>/100</span></div><div><div class="ac-idx-lbl">Wealth System Index &middot; ' + lbl + '</div>' +
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

  /* ---------- Progress Report: numbers + execution record + patterns from the student's own logs ---------- */
  var REPORT_TPL = 'template_qmceg0h';
  var THEMES = [
    {k: 'Lifestyle creep', re: /\b(upgrad\w*|new car|bigger|nicer|raise|bonus|treat(ed)? myself|deserve|splurge\w*|vacation|trip)\b/i,
     fix: 'New money is reaching your lifestyle before it reaches your conversion system. Reread your Lifestyle Lock Rule, raise your automatic conversion, and route the next raise or bonus before it lands.'},
    {k: 'Shiny opportunities', re: /\b(crypto|coin|side hustle|opportunit\w*|course|program|mlm|network marketing|deal|flip\w*|trading|day trad\w*|stock tip|get in early)\b/i,
     fix: 'Opportunities keep reaching you, and your attention keeps going to them. Run every one through your written filter and the 72-hour wait, and log it, even the ones you reject in five seconds.'},
    {k: 'Fear and FOMO', re: /\b(fomo|miss(ed)? out|afraid|scared|fear|panic\w*|nervous|worried|hype|excited|everyone (is|was))\b/i,
     fix: 'Emotion is showing up around money decisions. Make your rules do the deciding: no financial decision the same day you feel strongly about it, and no decision after 9 p.m.'},
    {k: 'Time and focus', re: /\b(busy|no time|overtime|tired|exhausted|distract\w*|behind|forgot|schedule|procrastinat\w*|slipped)\b/i,
     fix: 'Your capacity is under pressure. Protect your wealth blocks like a work shift, cut one commitment this module, and keep your Operator Review at a fixed time.'},
    {k: 'Family and social pressure', re: /\b(family|kids|children|friends?|wife|husband|partner|spouse|relatives?|cousin|mom|dad|brother|sister|loan(ed)? (him|her|them))\b/i,
     fix: 'Other people\'s needs and expectations are pulling on your plan. Decide in advance what you will and won\'t fund, write it down, and give generosity its own line so it doesn\'t come out of your conversion.'},
    {k: 'Leverage and borrowing', re: /\b(borrow\w*|loan|financ\w*|credit card|heloc|margin|line of credit|interest rate|refinanc\w*|payment plan)\b/i,
     fix: 'Borrowing came up in your logs. Check every case against your Leverage Boundary Rules, and if any reduction trigger is close, act now instead of waiting for it to fire.'},
    {k: 'Market swings', re: /\b(market|dropped|crash\w*|down \d+|red|volatil\w*|lost value|went down|sell(ing)? off)\b/i,
     fix: 'Market movement is getting your attention. Reread your exit rules before you act, keep contributions on schedule, and remember your time horizon decides your risk, not the headline.'},
    {k: 'Income pressure', re: /\b(hours (got )?cut|laid off|lost (my )?job|paycheck|short on money|not enough|income dropped|slow month)\b/i,
     fix: 'Income pressure is real right now. Check your pause triggers, protect your reserve first, and don\'t add any new commitment until your scale signals are green.'}
  ];
  var FOCUS = {
    conv: 'Raise your automatic conversion by at least 2% of take-home pay this module, and route every new dollar before it reaches your spending account.',
    res: 'Feed your reserve first. It\'s the foundation every other rule stands on, and three months of essentials is the Level 2 standard.',
    inv: 'Automate a fixed investment contribution on a fixed schedule so consistency doesn\'t depend on how you feel about the market.',
    dti: 'Bring consumer debt payments under 10% of take-home pay. Every dollar of payment you eliminate is a dollar you can convert.',
    rules: 'Finish writing every rule set and post them where you\'ll see them during your Operator Review. A rule that isn\'t written down isn\'t in force.',
    focus: 'Put two protected wealth blocks on your calendar every week and treat them like a work shift you can\'t miss.',
    unpl: 'No new commitment without your filter and the 72-hour wait. Log every opportunity, including the ones you reject.',
    mind: 'Reread your Operator Contract before every Weekly Operator Review, and make one decision each week strictly by your written rules.'
  };
  function eh(t){ return '<div style="font-family:Georgia,serif;font-size:19px;font-weight:bold;color:#0D1F3C;margin:26px 0 10px;padding-top:14px;border-top:1px solid #EEE6D2">' + t + '</div>'; }
  function ep(t){ return '<p style="margin:0 0 12px;font-size:15px;line-height:1.65;color:#333">' + t + '</p>'; }
  function arrow(x){ return x > 0 ? '<span style="color:#1A6B3C;font-weight:bold">&#9650; +' + x + '</span>' : x < 0 ? '<span style="color:#9B1C1C;font-weight:bold">&#9660; ' + x + '</span>' : '<span style="color:#888">no change</span>'; }
  A.analysis = function(d, n){
    var base = d.m.cp0, cur = d.m['cp' + n], prev = n > 1 ? d.m['cp' + (n - 1)] : base;
    var sb = A.score(base), sc = A.score(cur), sp = A.score(prev), weeks = WPP * n;
    var title = n === NCP ? 'Final Results Report' : 'Checkpoint ' + n + ' Progress Report';
    var h = '';
    function cell(v, t, first){ return '<td style="background:#0D1F3C;padding:16px;text-align:center;width:33%' + (first ? '' : ';border-left:1px solid #24375a') + '"><div style="font-family:Georgia,serif;font-size:30px;color:#E8B84B;font-weight:bold">' + v + '</div><div style="font-size:11px;letter-spacing:1px;color:#ccc">' + t + '</div></td>'; }
    h += '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 6px"><tr>' +
      cell(sc.total, 'INDEX NOW', true) + cell((sc.total - sb.total >= 0 ? '+' : '') + (sc.total - sb.total), 'SINCE BASELINE') +
      cell(n > 1 ? ((sc.total - sp.total >= 0 ? '+' : '') + (sc.total - sp.total)) : sb.total, n > 1 ? 'SINCE LAST CHECKPOINT' : 'BASELINE INDEX') + '</tr></table>';
    h += eh('Measure by Measure');
    h += '<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:13px"><tr style="background:#0D1F3C;color:#E8B84B"><td style="padding:8px">Measure</td><td style="padding:8px">Baseline</td><td style="padding:8px">Now</td><td style="padding:8px">' + (n > 1 ? 'Since last' : 'Change') + '</td></tr>' +
      sc.parts.map(function(p, i){ return '<tr style="background:' + (i % 2 ? '#F7F5EF' : '#FFF') + '"><td style="padding:8px;font-weight:bold;color:#0D1F3C">' + p.label + '</td><td style="padding:8px;color:#555">' + A.esc(sb.parts[i].raw) + '</td><td style="padding:8px;color:#333">' + A.esc(p.raw) + '</td><td style="padding:8px">' + arrow(Math.round(p.s - sp.parts[i].s)) + '</td></tr>'; }).join('') + '</table>';
    var gains = sc.parts.map(function(p, i){ return {p: p, g: p.s - sb.parts[i].s}; }).sort(function(a, b){ return b.g - a.g; });
    var weakest = sc.parts.slice().sort(function(a, b){ return a.s - b.s; })[0];
    var nwd = A.netWorth(cur) - A.netWorth(base), invd = (+cur.invbal) - (+base.invbal), resd = (+cur.res) - (+base.res);
    h += eh('What the Numbers Say');
    h += ep('<strong>Biggest gain:</strong> ' + gains[0].p.label + ' (' + A.esc(gains[0].p.raw) + ').' + (gains[0].g <= 0 ? ' No measure has improved since baseline yet. That has to change in the next module.' : ''));
    h += ep('<strong>Weakest measure right now:</strong> ' + weakest.label + ' at ' + A.esc(weakest.raw) + '. The target is ' + weakest.target + '.');
    h += ep('<strong>Net worth:</strong> ' + A.money(A.netWorth(cur)) + ', ' + (nwd >= 0 ? 'up ' + A.money(nwd) : 'down ' + A.money(-nwd)) + ' since baseline. <strong>Invested assets:</strong> ' + (invd >= 0 ? 'up ' + A.money(invd) : 'down ' + A.money(-invd)) + '. <strong>Cash reserves:</strong> ' + (resd >= 0 ? 'up ' + A.money(resd) : 'down ' + A.money(-resd)) + '.' +
      (nwd < 0 ? ' Market moves can lower net worth even when your behavior is right. Judge yourself by your conversion rate and your rules, and keep the long view.' : ''));
    var st = {Done: 0, 'Partially done': 0, 'Not done': 0}, days = 0, revY = 0, revN = 0, brk = 0, logged = 0, brkW = [];
    for (var w = 1; w <= weeks; w++){ var L = d.wk && d.wk[w]; if (!L) continue; logged++; st[L.status] = (st[L.status] || 0) + 1; days += +L.days || 0; if (L.rev === 'Yes') revY++; else if (L.rev === 'No') revN++; if (L.brk === 'Yes'){ brk++; brkW.push(w); } }
    var doneRate = logged ? st.Done / logged : 0, logRate = logged ? days / (7 * logged) : 0, revRate = (revY + revN) ? revY / (revY + revN) : 0;
    var strikes = A.strikes(d).length;
    var rating = doneRate >= 0.75 && logRate >= 0.8 && revRate >= 0.75 && brk <= 1 ? 'Operator standard' : (doneRate < 0.5 || logRate < 0.5 || brk >= 3) ? 'Needs immediate correction' : 'Inconsistent';
    h += eh('Your Execution Record');
    h += ep('<strong>Execution rating: ' + rating + '.</strong> Field Assignments: ' + st.Done + ' done, ' + st['Partially done'] + ' partial, ' + st['Not done'] + ' not done, out of ' + weeks + ' weeks. Proof logs kept on ' + days + ' of ' + (7 * logged) + ' days (' + Math.round(logRate * 100) + '%). Weekly Operator Reviews held: ' + revY + ' of ' + (revY + revN) + '. Weeks with a broken rule: ' + brk + (brk ? ' (Week ' + brkW.join(', Week ') + ')' : '') + '. Strikes on record: ' + strikes + '.');
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
    for (var w3 = WPP * (n - 1) + 1; w3 <= weeks; w3++){ var L3 = d.wk && d.wk[w3]; if (L3 && L3.fix) fixes.push('Week ' + w3 + ': "' + A.esc(L3.fix) + '"'); }
    var cpn = d.cp && d.cp[n];
    h += eh(n === NCP ? 'Your Standard for the Next 12 Months' : 'The Standard You Set for Yourself');
    if (fixes.length) h += ep('<strong>Your corrections:</strong><br>' + fixes.join('<br>'));
    if (cpn && cpn.next) h += ep('<strong>Your standard going forward:</strong> "' + A.esc(cpn.next) + '"');
    h += ep('These are your words, not Darrell\'s. Hold yourself to them.');
    h += eh(n === NCP ? 'Your Focus After Graduation' : 'Your Focus for Module ' + (n + 1));
    h += '<ol style="margin:0 0 12px 18px;padding:0;font-size:15px;line-height:1.65;color:#333"><li style="margin-bottom:6px"><strong>' + weakest.label + ':</strong> ' + FOCUS[weakest.k] + '</li>' +
      (hits.length ? '<li style="margin-bottom:6px"><strong>' + hits[0].t.k + ':</strong> ' + hits[0].t.fix + '</li>' : '') +
      (brk ? '<li style="margin-bottom:6px"><strong>Rule integrity:</strong> you reported ' + brk + ' week' + (brk > 1 ? 's' : '') + ' with a broken rule. For every one, write what the rule should have stopped and the system that will enforce it next time.</li>' : '') +
      (rating !== 'Operator standard' ? '<li style="margin-bottom:6px"><strong>Execution:</strong> complete every Field Assignment fully, keep every proof log daily, and hold every Operator Review. Partial work produces partial results.</li>' : '<li style="margin-bottom:6px"><strong>Execution:</strong> you\'re operating at the standard. Protect it. Success is exactly when discipline starts to slip.</li>') + '</ol>';
    return {title: title, html: h};
  };
  A.sendReport = function(n){
    if (!REPORT_TPL) return;
    var d = A.load(); if (!d.me || !d.m || !d.m['cp' + n]) return;
    var r = A.analysis(d, n);
    var intro = n === NCP ? 'Here\'s your Final Results Report: twelve weeks of your numbers and your own words, side by side. Darrell is reviewing your final scoreboard now, and your verification decision will come in a separate email.'
      : 'Here\'s your Checkpoint ' + n + ' Progress Report, built from your measurements and your own weekly logs. Darrell is reviewing your scoreboard now, and your verification decision will come in a separate email.';
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
        msg.className = 'ac-msg ok'; msg.textContent = 'Verified. ' + (n === NCP ? 'Your Results Report is unlocked.' : 'Module ' + (n + 1) + ' is unlocked.');
        if (onOk) setTimeout(onOk, 900);
      } else {
        msg.className = 'ac-msg err'; msg.textContent = 'That code doesn\'t match. Check it against Darrell\'s email, and make sure you checked in with the same email address.';
      }
    });
  };

  /* ---------- backup / restore ---------- */
  A.exportCode = function(){ try { return btoa(unescape(encodeURIComponent(JSON.stringify(A.load())))); } catch(e){ return ''; } };
  A.importCode = function(code){
    try { var d = JSON.parse(decodeURIComponent(escape(atob(String(code).trim())))); if (!d || !d.me || !d.me.email || d.lvl !== 2) return false; A.save(d); return true; } catch(e){ return false; }
  };

  document.addEventListener('DOMContentLoaded', A.sidebar);
})();
