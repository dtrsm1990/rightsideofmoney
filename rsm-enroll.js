/* RSM course access: enrollment codes for paid and free students, with launch-night guests protected.
   Loaded in the <head> of every page of the six courses. Codes are tied to the student's email. */
(function(){
  var SALT = 'RSM|Enroll|Courses|2026';
  var GIFT_END = new Date('2026-10-15T00:00:00-07:00').getTime();
  var SITE = 'https://rightsideofmoney.com/';
  var COURSES = {
    c3d: {tag: 'C3D', name: '3-Day Financial Clarity Challenge', portal: 'challenge-portal.html', prefix: 'challenge-', had: 'rsm_track_c3d', gift: '3-Day Financial Clarity Challenge', sales: 'course-3day.html'},
    inv: {tag: 'INV', name: '3-Day Introduction to Investing', portal: 'inv-portal.html', prefix: 'inv-', had: 'rsminv_participant', gift: '3-Day Introduction to Investing', sales: 'course-investing.html'},
    fdn: {tag: 'FDN', name: 'RSM Foundation Course', portal: 'foundation-portal.html', prefix: 'foundation-', had: 'rsm_track_fdn', sales: 'course-foundation.html'},
    c30: {tag: 'C30', name: '30-Day Mindset and Money Challenge', portal: 'c30-portal.html', prefix: 'c30-', had: 'rsmc30_participant', sales: 'course-challenge.html'},
    adv: {tag: 'ADV', name: 'RSM Advance Program', portal: 'advance-portal.html', prefix: 'advance-', had: 'rsmadv_participant', sales: 'course-advance.html'},
    cry: {tag: 'CRY', name: '5-Day Introduction to Cryptocurrency', portal: 'cry-portal.html', prefix: 'cry-', had: 'rsmcry_participant', sales: 'course-crypto.html'}
  };
  /* Launch-night guests, added after the gift window closes: hashed emails, one list per course. */
  var GIFT_HASHES = {c3d: [], inv: []};

  function cyrb53(str){
    var h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (var i = 0, ch; i < str.length; i++){ ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  function norm(e){ return String(e || '').trim().toLowerCase(); }
  var E = window.RSMENROLL = {courses: COURSES, site: SITE, giftEnd: GIFT_END};
  E.code = function(email, id){
    var c = COURSES[id]; if (!c) return '';
    var raw = cyrb53(norm(email) + '|' + c.tag + '|' + SALT).toString(36).toUpperCase().replace(/[^A-Z0-9]/g, '');
    raw = (raw + 'R7M2Q9').replace(/[O0I1]/g, '7').slice(0, 6);
    return c.tag + '-' + raw;
  };
  E.check = function(input, email, id){ return String(input || '').trim().toUpperCase().replace(/\s+/g, '') === E.code(email, id); };
  E.giftHash = function(email){ return cyrb53(norm(email) + '|RSM|launch-guest').toString(36); };

  function ls(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }
  function lsSet(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
  E.allowed = function(id){
    var c = COURSES[id];
    try { var en = JSON.parse(ls('rsm_enroll_' + id) || 'null'); if (en && E.check(en.code, en.email, id)) return true; } catch(e){}
    if (ls('rsm_guest_' + id) === '1') return true;
    if (ls(c.had)) return true; /* already started this course on this device */
    if (c.gift){ try { var g = JSON.parse(ls('rsm_launch_gift') || 'null'); if (g && g.programs && g.programs.indexOf(c.gift) > -1) return true; } catch(e){} }
    return false;
  };

  /* which course is this page? */
  var file = (location.pathname.split('/').pop() || '').toLowerCase(), ID = null;
  Object.keys(COURSES).forEach(function(k){ if (file.indexOf(COURSES[k].prefix) === 0) ID = k; });
  if (!ID || E.allowed(ID)) return;

  var C = COURSES[ID];
  document.documentElement.classList.add('re-lock');
  var css = document.createElement('style');
  css.textContent = 'html.re-lock .lesson-main>*:not(#reGate),html.re-lock main>*:not(#reGate){display:none!important}' +
    'html.re-lock .lesson-main>#reGate#reGate,html.re-lock main>#reGate#reGate{display:block!important}#reGate{opacity:1!important;filter:none!important;pointer-events:auto!important;user-select:auto!important;background:#0D1F3C;border-top:4px solid #C9941A;border-radius:4px;padding:28px 26px;margin:0 0 28px;box-shadow:0 14px 34px rgba(13,31,60,.22);font-family:inherit}' +
    '#reGate .re-eb{font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#C9941A;margin-bottom:8px}' +
    '#reGate h2{font-family:"Playfair Display",Georgia,serif;color:#fff!important;font-size:clamp(22px,3vw,30px);margin:0 0 10px!important;border:0!important;padding:0!important}' +
    '#reGate p{color:rgba(255,255,255,.8)!important;font-size:15px;line-height:1.65;margin:0 0 14px}' +
    '#reGate label{display:block;color:#fff;font-weight:600;font-size:14px;margin:0 0 6px}' +
    '#reGate input{width:100%;box-sizing:border-box;padding:13px 14px;background:rgba(255,255,255,.08);border:1px solid rgba(201,148,26,.45);border-radius:3px;color:#fff;font-size:15px;margin:0 0 14px;font-family:inherit}' +
    '#reGate input:focus{outline:none;border-color:#E8B84B}' +
    '#reGate button{background:#C9941A;color:#0D1F3C;border:0;font-weight:800;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:15px 24px;border-radius:3px;cursor:pointer;width:100%;font-family:inherit}' +
    '#reGate .re-msg{color:#ffb4b4;font-size:14px;min-height:1em;margin:10px 0 0;font-weight:600}' +
    '#reGate .re-alt{border-top:1px solid rgba(255,255,255,.15);margin-top:22px;padding-top:18px}' +
    '#reGate a{color:#E8B84B}';
  document.head.appendChild(css);

  function mount(){
    var main = document.querySelector('.lesson-main') || document.querySelector('main') || document.body;
    var giftOpen = !!C.gift && Date.now() < GIFT_END, guestList = !!C.gift && (GIFT_HASHES[ID] || []).length > 0;
    var box = document.createElement('section'); box.id = 'reGate';
    box.innerHTML = '<div class="re-eb">' + C.name + '</div><h2>Enter Your Enrollment Code</h2>' +
      '<p>This course is for enrolled students. Enter the email you enrolled with and the enrollment code from your welcome email from Darrell.</p>' +
      '<form id="reForm" novalidate><label for="reEmail">Email you enrolled with</label><input type="email" id="reEmail" autocomplete="email">' +
      '<label for="reCode">Enrollment code</label><input type="text" id="reCode" autocomplete="off" spellcheck="false" placeholder="' + C.tag + '-XXXXXX" style="text-transform:uppercase;letter-spacing:.06em;font-weight:700">' +
      '<button type="submit">Open My Course &rarr;</button><p class="re-msg" id="reMsg" aria-live="polite"></p></form>' +
      (giftOpen ? '<div class="re-alt"><p><strong style="color:#E8B84B">Were you at the book launch?</strong> Claim your free access on the <a href="./launch-gift.html">launch gift page</a>.</p></div>' : '') +
      (guestList ? '<div class="re-alt"><p><strong style="color:#E8B84B">Launch-night guest?</strong> Enter the email you claimed your gift with.</p><form id="reGuest" novalidate><input type="email" id="reGEmail" autocomplete="email" placeholder="Email you claimed your gift with"><button type="submit">Open My Gift &rarr;</button><p class="re-msg" id="reGMsg"></p></form></div>' : '') +
      '<div class="re-alt"><p>Not enrolled yet? <a href="./' + C.sales + '">See the course</a>. Questions? <a href="mailto:info@rightsideofmoney.com">Email Darrell</a>.</p></div>';
    main.insertBefore(box, main.firstChild);
    document.getElementById('reForm').addEventListener('submit', function(e){
      e.preventDefault();
      var em = document.getElementById('reEmail').value.trim(), cd = document.getElementById('reCode').value, m = document.getElementById('reMsg');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){ m.textContent = 'Enter the email address you enrolled with.'; return; }
      if (!E.check(cd, em, ID)){ m.textContent = 'That code doesn\'t match this email. Use the exact email address and code from your welcome email.'; return; }
      lsSet('rsm_enroll_' + ID, JSON.stringify({email: em, code: cd.trim().toUpperCase(), at: new Date().toISOString()}));
      location.reload();
    });
    var g = document.getElementById('reGuest');
    if (g) g.addEventListener('submit', function(e){
      e.preventDefault();
      var em = document.getElementById('reGEmail').value, m = document.getElementById('reGMsg');
      if (GIFT_HASHES[ID].indexOf(E.giftHash(em)) > -1){ lsSet('rsm_guest_' + ID, '1'); location.reload(); }
      else m.textContent = 'We couldn\'t find that email on the launch guest list. Try the email you used at the event, or email Darrell.';
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
