/* RSM Accountability Program: interactive worksheets and daily proof logs.
   Shared by Level 1 and Level 2. Everything saves on the student's device and travels with their checkpoint submissions. */
(function(){
  var W = window.RSMWS = {};
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function money(n){ n = Number(n) || 0; return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US'); }
  function num(v){ v = String(v == null ? '' : v).replace(/[$,%\s]/g, ''); return v === '' || isNaN(+v) ? null : +v; }
  W.esc = esc; W.money = money; W.num = num;
  var uid = 0;

  /* ---------- defaults ---------- */
  function initData(spec, data){
    data = data || {};
    spec.fields.forEach(function(f){
      if (!f.k || data[f.k] !== undefined) return;
      if (f.t === 'table'){ data[f.k] = []; for (var r = 0; r < f.rows; r++){ var row = f.cols.map(function(){ return ''; }); if (f.defaults && f.defaults[r]) row[0] = f.defaults[r]; data[f.k].push(row); } }
      else if (f.t === 'list'){ data[f.k] = []; for (var i = 0; i < f.n; i++) data[f.k].push(f.defaults && f.defaults[i] ? f.defaults[i] : ''); }
      else if (f.t === 'yn') data[f.k] = f.items.map(function(){ return ''; });
      else if (f.t === 'checks') data[f.k] = f.items.map(function(){ return false; });
      else if (f.t === 'ack') data[f.k] = false;
      else data[f.k] = '';
    });
    return data;
  }
  W.initData = initData;

  /* ---------- completeness ---------- */
  function filled(v){ return String(v == null ? '' : v).trim() !== ''; }
  W.missing = function(spec, data){
    data = initData(spec, data); var miss = [];
    spec.fields.forEach(function(f){
      var v = data[f.k];
      if (f.t === 'area' && String(v).trim().length < (f.min || 20)) miss.push(f.label);
      else if (f.t === 'text' && String(v).trim().length < (f.min || 3)) miss.push(f.label);
      else if ((f.t === 'money' || f.t === 'num') && num(v) === null) miss.push(f.label);
      else if (f.t === 'select' && !filled(v)) miss.push(f.label);
      else if (f.t === 'sig' && String(v).trim().split(/\s+/).length < 2) miss.push('Signature');
      else if (f.t === 'ack' && !v) miss.push('Acknowledgment');
      else if (f.t === 'yn' && v.some(function(x){ return !x; })) miss.push(f.label);
      else if (f.t === 'list' && v.filter(function(x){ return String(x).trim().length >= 6; }).length < f.min) miss.push(f.label + ' (at least ' + f.min + ')');
      else if (f.t === 'table'){
        var full = v.filter(function(row){ return row.every(function(c){ return filled(c); }); }).length;
        if (full < f.min) miss.push(f.label + ' (at least ' + f.min + ' complete row' + (f.min > 1 ? 's' : '') + ')');
      }
    });
    return miss;
  };
  W.complete = function(spec, data){ return W.missing(spec, data).length === 0; };

  /* ---------- calculators ---------- */
  var CALC = {
    lrc: function(d){ var y = (d.ans || []).filter(function(x){ return x === 'Yes'; }).length, a = (d.ans || []).filter(function(x){ return x; }).length;
      if (a < 8) return 'Answer all eight to see your score. ' + y + ' yes so far.';
      return '<strong>Your score: ' + y + ' of 8.</strong> ' + (y >= 7 ? 'You\'re ready to build.' : y >= 5 ? 'You\'ll tighten these gaps during Module 1. Bring them to your Launch Call.' : 'The foundation comes first. Tell Darrell on your Launch Call so you can set the right targets together.'); },
    iwg: function(d){ var t = num(d.then), n = num(d.now), c = num(d.conv); if (n === null || n <= 0) return 'Enter your income numbers to see your gap and your conversion rate.';
      var out = ''; if (t !== null){ var g = n - t; out += '<strong>Income change:</strong> ' + (g >= 0 ? '+' : '') + money(g) + ' a month' + (t > 0 ? ' (' + (g >= 0 ? '+' : '') + Math.round(g / t * 100) + '%)' : '') + ', or ' + money(g * 12) + ' a year. '; }
      if (c !== null){ var r = c / n * 100; out += '<strong>Conversion rate:</strong> ' + (Math.round(r * 10) / 10) + '%. ' + (r >= 20 ? 'You\'re at the Level 2 standard.' : 'To reach 20%, convert ' + money(n * 0.2 - c) + ' more a month.'); }
      return out; },
    tla: function(d){ var a = [num(d.obl), num(d.bld), num(d.rec), num(d.lk)]; if (a.some(function(x){ return x === null; })) return 'Enter all four totals to check your week.';
      var tot = a[0] + a[1] + a[2] + a[3];
      return '<strong>Total:</strong> ' + tot + ' of 168 hours' + (Math.abs(tot - 168) > 6 ? ' (check your audit, a week has 168)' : '') + '. <strong>Builders:</strong> ' + a[1] + ' hours. <strong>Leaks:</strong> ' + a[3] + ' hours. ' +
        (a[1] >= 5 ? 'You\'re already at the 5-hour standard. Protect it.' : 'Moving ' + Math.max(0, 5 - a[1]) + ' hours from leaks to builders gets you to the 5-hour standard.'); },
    amr: function(d){ var rows = (d.rows || []).filter(function(r){ return filled(r[0]); }); if (!rows.length) return 'Add your items to see how many are true assets.';
      var ok = rows.filter(function(r){ return r[3] === 'Pass' && r[4] === 'Pass' && r[5] === 'Pass' && r[6] === 'Pass'; }), cost = rows.reduce(function(s, r){ return s + (num(r[2]) || 0); }, 0);
      return '<strong>' + ok.length + ' of ' + rows.length + '</strong> items pass all four tests and earn the word asset. Total annual cost to hold everything listed: <strong>' + money(cost) + '</strong>.'; },
    cam: function(d){ var rows = (d.rows || []).filter(function(r){ return filled(r[0]) && num(r[2]) !== null; }); if (!rows.length) return 'Add your accounts and amounts to see your allocation.';
      var tot = rows.reduce(function(s, r){ return s + num(r[2]); }, 0); if (tot <= 0) return 'Enter amounts to see your allocation.';
      var b = {}; rows.forEach(function(r){ var k = r[1] || 'Unassigned'; b[k] = (b[k] || 0) + num(r[2]); });
      var big = rows.slice().sort(function(x, y){ return num(y[2]) - num(x[2]); })[0], bp = Math.round(num(big[2]) / tot * 100);
      return '<strong>Total:</strong> ' + money(tot) + '. ' + Object.keys(b).map(function(k){ return '<strong>' + esc(k) + ':</strong> ' + Math.round(b[k] / tot * 100) + '%'; }).join(' &middot; ') +
        '. <strong>Largest single holding:</strong> ' + esc(big[0]) + ' at ' + bp + '%' + (bp > 20 ? '. That\'s a concentration to examine in your Concentration Risk Check.' : '.'); },
    track: function(d){ var rows = (d.rows || []).filter(function(r){ return filled(r[0]) && num(r[1]) !== null; }); if (!rows.length) return 'Enter your category totals to see your true monthly picture.';
      var tot = rows.reduce(function(s, r){ return s + num(r[1]); }, 0);
      return '<strong>90-day total:</strong> ' + money(tot) + '. <strong>True monthly average:</strong> ' + money(tot / 3) + '. ' + rows.map(function(r){ return esc(r[0]) + ': ' + money(num(r[1]) / 3) + '/mo (' + Math.round(num(r[1]) / tot * 100) + '%)'; }).join(' &middot; '); },
    zbp: function(d){ var inc = num(d.inc), rows = (d.rows || []).filter(function(r){ return filled(r[0]) && num(r[1]) !== null; }); if (inc === null) return 'Enter your monthly take-home income.';
      var tot = rows.reduce(function(s, r){ return s + num(r[1]); }, 0), left = inc - tot;
      return '<strong>Planned:</strong> ' + money(tot) + ' of ' + money(inc) + '. <strong>Left unassigned:</strong> ' + money(left) + (left === 0 ? '. Every dollar has a job.' : left > 0 ? '. Give those dollars a job before the month starts.' : '. You\'ve planned more than you earn. Cut until this reaches $0.'); },
    leaks: function(d){ var rows = (d.rows || []).filter(function(r){ return filled(r[0]) && num(r[2]) !== null; }); var tot = rows.reduce(function(s, r){ return s + (r[3] === 'Cancelled' || r[3] === 'Lowered' ? num(r[2]) : 0); }, 0);
      return rows.length ? '<strong>Recovered so far:</strong> ' + money(tot) + ' a month, or ' + money(tot * 12) + ' a year. Redirect it in your plan today.' : 'List your recurring charges and fees to total what you recover.'; },
    debt: function(d){ var rows = (d.rows || []).filter(function(r){ return filled(r[0]) && num(r[1]) !== null; }); if (!rows.length) return 'List every debt to see your totals.';
      var bal = rows.reduce(function(s, r){ return s + num(r[1]); }, 0), min = rows.reduce(function(s, r){ return s + (num(r[3]) || 0); }, 0), hi = rows.slice().sort(function(a, b){ return (num(b[2]) || 0) - (num(a[2]) || 0); })[0], sm = rows.slice().sort(function(a, b){ return num(a[1]) - num(b[1]); })[0];
      return '<strong>Total owed:</strong> ' + money(bal) + '. <strong>Monthly minimums:</strong> ' + money(min) + '. <strong>Avalanche target</strong> (highest rate): ' + esc(hi[0]) + '. <strong>Snowball target</strong> (smallest balance): ' + esc(sm[0]) + '.'; },
    util: function(d){ var rows = (d.rows || []).filter(function(r){ return filled(r[0]) && num(r[1]) !== null && num(r[2]); }); if (!rows.length) return 'Enter each card\'s balance and limit.';
      var b = rows.reduce(function(s, r){ return s + num(r[1]); }, 0), l = rows.reduce(function(s, r){ return s + num(r[2]); }, 0);
      return '<strong>Overall utilization:</strong> ' + Math.round(b / l * 100) + '%. ' + rows.map(function(r){ var u = Math.round(num(r[1]) / num(r[2]) * 100); return esc(r[0]) + ': ' + u + '%' + (u > 30 ? ' (pay down ' + money(num(r[1]) - num(r[2]) * 0.3) + ' to reach 30%)' : ''); }).join(' &middot; '); }
  };
  W.calc = function(name, d){ try { return CALC[name] ? CALC[name](d || {}) : ''; } catch(e){ return ''; } };

  /* ---------- render ---------- */
  function inputFor(t, val, attrs, opts){
    if (t === 'select') return '<select ' + attrs + '><option value="">Choose</option>' + opts.map(function(o){ return '<option' + (o === val ? ' selected' : '') + '>' + esc(o) + '</option>'; }).join('') + '</select>';
    var ty = t === 'money' || t === 'num' ? 'text" inputmode="decimal' : 'text';
    return (t === 'money' ? '<div class="ac-money">' : '') + '<input type="' + ty + '" ' + attrs + ' value="' + esc(val) + '">' + (t === 'money' ? '</div>' : '');
  }
  W.render = function(el, spec, data, onChange, opts){
    opts = opts || {}; data = initData(spec, data); var id = 'ws' + (++uid);
    var h = '<div class="ws-head"><div><div class="ac-eyebrow">Worksheet</div><h2>' + esc(spec.title) + '</h2></div><span class="ws-chip" id="' + id + 'c"></span></div><p>' + esc(spec.intro) + '</p>';
    spec.fields.forEach(function(f, fi){
      var a = 'data-f="' + fi + '"';
      if (f.t === 'calc'){ h += '<div class="ws-calc" data-calc="' + f.name + '"></div>'; return; }
      h += '<div class="ac-field ws-f">';
      if (f.t !== 'ack') h += '<label>' + esc(f.label) + '</label>' + (f.help ? '<small>' + esc(f.help) + '</small>' : '');
      var v = data[f.k];
      if (f.t === 'area') h += '<textarea ' + a + '>' + esc(v) + '</textarea>';
      else if (f.t === 'text' || f.t === 'money' || f.t === 'num') h += f.suffix ? '<div class="ws-suf">' + inputFor(f.t, v, a) + '<span>' + esc(f.suffix) + '</span></div>' : inputFor(f.t, v, a);
      else if (f.t === 'select') h += inputFor('select', v, a, f.opts);
      else if (f.t === 'sig') h += '<input type="text" class="ws-sig" ' + a + ' value="' + esc(v) + '" placeholder="Full name">';
      else if (f.t === 'ack') h += '<label class="ac-check"><input type="checkbox" ' + a + (v ? ' checked' : '') + '> <span>' + esc(f.label) + '</span></label>';
      else if (f.t === 'list') h += '<ol class="ws-list">' + v.map(function(x, i){ return '<li><input type="text" ' + a + ' data-i="' + i + '" value="' + esc(x) + '"' + (i >= f.min ? ' placeholder="Optional"' : '') + '></li>'; }).join('') + '</ol>';
      else if (f.t === 'yn') h += '<div class="ws-yn">' + f.items.map(function(it, i){ return '<div class="ws-ynr"><p>' + (i + 1) + '. ' + esc(it) + '</p><div class="ac-radio">' + ['Yes', 'No'].map(function(o){ return '<label><input type="radio" name="' + id + 'y' + i + '" ' + a + ' data-i="' + i + '" value="' + o + '"' + (v[i] === o ? ' checked' : '') + '> ' + o + '</label>'; }).join('') + '</div></div>'; }).join('') + '</div>';
      else if (f.t === 'checks') h += f.items.map(function(it, i){ return '<label class="ac-check"><input type="checkbox" ' + a + ' data-i="' + i + '"' + (v[i] ? ' checked' : '') + '> <span>' + esc(it) + '</span></label>'; }).join('');
      else if (f.t === 'table'){
        h += '<div class="ws-tw"><table class="ws-t"><thead><tr>' + f.cols.map(function(c){ return '<th>' + esc(c.h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          v.map(function(row, r){ return '<tr>' + f.cols.map(function(c, ci){ return '<td data-h="' + esc(c.h) + '">' + inputFor(c.t, row[ci], a + ' data-r="' + r + '" data-c="' + ci + '" aria-label="' + esc(c.h) + ', row ' + (r + 1) + '"', c.opts) + '</td>'; }).join('') + '</tr>'; }).join('') +
          '</tbody></table></div><button type="button" class="ws-add" data-add="' + fi + '">+ Add a row</button>';
      }
      h += '</div>';
    });
    el.innerHTML = '<div class="ws-in">' + h + '</div>'; el.classList.add('ws-card');
    var root = el.firstChild, timer = null;
    function refresh(){
      root.querySelectorAll('[data-calc]').forEach(function(c){ c.innerHTML = W.calc(c.getAttribute('data-calc'), data); });
      var miss = W.missing(spec, data), chip = document.getElementById(id + 'c');
      chip.className = 'ws-chip ' + (miss.length ? 'open' : 'done'); chip.textContent = miss.length ? miss.length + ' to finish' : 'Complete';
      chip.title = miss.join(', ');
    }
    function change(e){
      var t = e.target, fi = t.getAttribute('data-f'); if (fi === null) return;
      var f = spec.fields[+fi], k = f.k;
      if (f.t === 'table') data[k][+t.getAttribute('data-r')][+t.getAttribute('data-c')] = t.value;
      else if (f.t === 'list') data[k][+t.getAttribute('data-i')] = t.value;
      else if (f.t === 'yn') data[k][+t.getAttribute('data-i')] = t.value;
      else if (f.t === 'checks') data[k][+t.getAttribute('data-i')] = t.checked;
      else if (f.t === 'ack') data[k] = t.checked;
      else data[k] = t.value;
      refresh(); clearTimeout(timer); timer = setTimeout(function(){ onChange && onChange(data); }, 250);
    }
    root.addEventListener('input', change); root.addEventListener('change', change);
    root.addEventListener('click', function(e){
      var b = e.target.closest && e.target.closest('[data-add]'); if (!b) return;
      var f = spec.fields[+b.getAttribute('data-add')]; data[f.k].push(f.cols.map(function(){ return ''; }));
      onChange && onChange(data); W.render(el, spec, data, onChange, opts);
    });
    refresh();
    return data;
  };

  /* ---------- export ---------- */
  W.text = function(spec, data){
    data = initData(spec, data);
    var out = ['== ' + spec.title.toUpperCase() + ' =='];
    spec.fields.forEach(function(f){
      var v = data[f.k];
      if (f.t === 'calc'){ var c = W.calc(f.name, data).replace(/<[^>]+>/g, '').replace(/&middot;/g, '|').replace(/&amp;/g, '&'); if (c) out.push('Result: ' + c); return; }
      if (f.t === 'table'){ out.push(f.label + ':'); v.filter(function(r){ return r.some(filled); }).forEach(function(r, i){ out.push('  ' + (i + 1) + '. ' + f.cols.map(function(c, ci){ return c.h + ': ' + (r[ci] || '-'); }).join(' | ')); }); }
      else if (f.t === 'list'){ out.push(f.label + ':'); v.filter(filled).forEach(function(x, i){ out.push('  ' + (i + 1) + '. ' + x); }); }
      else if (f.t === 'yn'){ out.push(f.label + ':'); f.items.forEach(function(it, i){ out.push('  [' + (v[i] || '?') + '] ' + it); }); }
      else if (f.t === 'checks'){ out.push(f.label + ':'); f.items.forEach(function(it, i){ out.push('  [' + (v[i] ? 'x' : ' ') + '] ' + it); }); }
      else if (f.t === 'ack') out.push((v ? '[x] ' : '[ ] ') + f.label);
      else if (f.t === 'sig') out.push('Signed: ' + (v || '(not signed)'));
      else out.push(f.label + ': ' + (f.t === 'money' && num(v) !== null ? money(num(v)) : (v || '-')) + (f.suffix && v ? f.suffix : ''));
    });
    return out.join('\n');
  };
  W.html = function(spec, data){
    data = initData(spec, data);
    var h = '<div class="wb-ws"><h3>' + esc(spec.title) + '</h3>';
    spec.fields.forEach(function(f){
      var v = data[f.k];
      if (f.t === 'calc'){ var c = W.calc(f.name, data); if (c) h += '<p class="wb-calc">' + c + '</p>'; return; }
      if (f.t === 'table'){
        var rows = v.filter(function(r){ return r.some(filled); });
        h += '<p class="wb-l">' + esc(f.label) + '</p><div class="ws-tw"><table class="rsm-table"><thead><tr>' + f.cols.map(function(c){ return '<th>' + esc(c.h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          (rows.length ? rows.map(function(r){ return '<tr>' + r.map(function(x, ci){ return '<td>' + esc(f.cols[ci].t === 'money' && num(x) !== null ? money(num(x)) : x) + '</td>'; }).join('') + '</tr>'; }).join('') : '<tr><td colspan="' + f.cols.length + '">Not started</td></tr>') + '</tbody></table></div>';
      }
      else if (f.t === 'list') h += '<p class="wb-l">' + esc(f.label) + '</p><ol>' + v.filter(filled).map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>';
      else if (f.t === 'yn' || f.t === 'checks') h += '<p class="wb-l">' + esc(f.label) + '</p><ul class="wb-yn">' + f.items.map(function(it, i){ return '<li><b>' + (f.t === 'yn' ? (v[i] || '?') : (v[i] ? '&#10003;' : '&ndash;')) + '</b> ' + esc(it) + '</li>'; }).join('') + '</ul>';
      else if (f.t === 'ack') h += '<p>' + (v ? '&#10003; ' : '&#9744; ') + esc(f.label) + '</p>';
      else if (f.t === 'sig') h += '<p class="wb-sig">Signed: <span>' + esc(v || 'Not signed') + '</span></p>';
      else h += '<p class="wb-l">' + esc(f.label) + '</p><p class="wb-v">' + esc(f.t === 'money' && num(v) !== null ? money(num(v)) : (v || 'Not answered')).replace(/\n/g, '<br>') + (f.suffix && v ? esc(f.suffix) : '') + '</p>';
    });
    return h + '</div>';
  };

  /* ---------- daily proof logs ---------- */
  function iso(t){ var d = new Date(t); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  W.iso = iso;
  function pretty(s){ var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'}); }
  W.renderLog = function(el, spec, entries, onChange, opt){
    opt = opt || {}; entries = entries || []; var id = 'lg' + (++uid), cols = spec.cols.slice(1);
    function draw(){
      entries.sort(function(a, b){ return a.date < b.date ? 1 : -1; });
      var h = '<div class="ws-head"><div><div class="ac-eyebrow">Daily Proof Log</div><h2>' + esc(spec.name) + '</h2></div><span class="ws-chip ' + (entries.length ? 'done' : 'open') + '">' + entries.length + ' day' + (entries.length === 1 ? '' : 's') + ' logged</span></div>' +
        '<p><strong>' + esc(spec.cadence) + '.</strong> One entry per day, right here. It saves on this device and goes to Darrell automatically with your scoreboard. ' + (opt.note || '') + '</p>' +
        '<div class="lg-form"><div class="ac-field"><label for="' + id + 'd">Date</label><input type="date" id="' + id + 'd" value="' + iso(Date.now()) + '" max="' + iso(Date.now()) + '"></div>' +
        cols.map(function(c, i){ return '<div class="ac-field"><label for="' + id + 'c' + i + '">' + esc(c) + '</label><input type="text" id="' + id + 'c' + i + '"></div>'; }).join('') +
        '<button type="button" class="ac-btn" id="' + id + 'b">Save Today\'s Entry</button><p class="ac-msg" id="' + id + 'm"></p></div>';
      if (entries.length){
        h += '<div class="ws-tw"><table class="ws-t lg-t"><thead><tr><th>' + esc(spec.cols[0]) + '</th>' + cols.map(function(c){ return '<th>' + esc(c) + '</th>'; }).join('') + '<th></th></tr></thead><tbody>' +
          entries.map(function(e, r){ return '<tr><td data-h="Date"><b>' + pretty(e.date) + '</b></td>' + e.v.map(function(x, i){ return '<td data-h="' + esc(cols[i]) + '">' + esc(x) + '</td>'; }).join('') + '<td><button type="button" class="lg-del" data-r="' + r + '" aria-label="Delete this entry">&times;</button></td></tr>'; }).join('') + '</tbody></table></div>';
      }
      el.innerHTML = '<div class="ws-in">' + h + '</div>'; el.classList.add('ws-card');
      document.getElementById(id + 'b').addEventListener('click', function(){
        var dt = document.getElementById(id + 'd').value, v = cols.map(function(c, i){ return document.getElementById(id + 'c' + i).value.trim(); }), m = document.getElementById(id + 'm');
        if (!dt){ m.className = 'ac-msg err'; m.textContent = 'Choose the date.'; return; }
        if (v.some(function(x){ return !x; })){ m.className = 'ac-msg err'; m.textContent = 'Fill in every column. Write "none" or "0" when that\'s the truth.'; return; }
        var ex = entries.filter(function(e){ return e.date === dt; })[0];
        if (ex && !confirm('You already logged ' + pretty(dt) + '. Replace that entry?')) return;
        entries = entries.filter(function(e){ return e.date !== dt; }); entries.push({date: dt, v: v, at: new Date().toISOString()});
        onChange && onChange(entries); draw();
        var m2 = document.getElementById(id + 'm'); m2.className = 'ac-msg ok'; m2.textContent = 'Saved ' + pretty(dt) + '.';
      });
      el.querySelectorAll('.lg-del').forEach(function(b){ b.addEventListener('click', function(){ var e = entries[+b.getAttribute('data-r')]; if (!confirm('Delete your entry for ' + pretty(e.date) + '?')) return; entries.splice(+b.getAttribute('data-r'), 1); onChange && onChange(entries); draw(); }); });
    }
    draw();
  };
  W.logText = function(spec, entries){
    entries = (entries || []).slice().sort(function(a, b){ return a.date < b.date ? -1 : 1; });
    return '== ' + spec.name.toUpperCase() + ' (' + entries.length + ' days) ==\n' + (entries.length ? entries.map(function(e){ return e.date + ' | ' + e.v.map(function(x, i){ return spec.cols[i + 1] + ': ' + x; }).join(' | '); }).join('\n') : 'No entries');
  };
  W.logHtml = function(spec, entries){
    entries = (entries || []).slice().sort(function(a, b){ return a.date < b.date ? -1 : 1; });
    return '<div class="wb-ws"><h3>' + esc(spec.name) + ' <small>(' + entries.length + ' days)</small></h3><div class="ws-tw"><table class="rsm-table"><thead><tr>' + spec.cols.map(function(c){ return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      (entries.length ? entries.map(function(e){ return '<tr><td>' + pretty(e.date) + '</td>' + e.v.map(function(x){ return '<td>' + esc(x) + '</td>'; }).join('') + '</tr>'; }).join('') : '<tr><td colspan="' + spec.cols.length + '">No entries yet</td></tr>') + '</tbody></table></div></div>';
  };
  /* distinct days with at least one entry in any of the given logs, between two dates (inclusive) */
  W.daysBetween = function(logs, from, to){
    var a = iso(from), b = iso(to), seen = {};
    (logs || []).forEach(function(list){ (list || []).forEach(function(e){ if (e.date >= a && e.date <= b) seen[e.date] = 1; }); });
    return Object.keys(seen).length;
  };

  W.CSS = '';
})();
