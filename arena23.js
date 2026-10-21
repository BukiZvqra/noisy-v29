/* NOISY · Arena v2: хиро (видео или N като на главната), центриран карусел като на noisy.net, „Повече от мача“, Livescore, 5-секунден преглед. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = matchMedia('(hover:hover) and (pointer:fine)').matches;
  var D = window.AR || { sports: {}, order: [] };
  var playSafe = function (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); };

  /* ---------- видеото на хирото: хоризонтално на компютър, вертикално на телефон ---------- */
  $$('video[data-d]').forEach(function (v) {
    var port = matchMedia('(max-aspect-ratio: 1/1)').matches;
    v.poster = port ? v.dataset.pm : v.poster; v.src = port ? v.dataset.m : v.dataset.d; if (!reduce) playSafe(v); else v.removeAttribute("autoplay");
  });

  /* ---------- хедър, лента отгоре, хиро без N ---------- */
  var hdr = $('#hdr'), prog = $('#prog'), hero = $('.ar-hero'), raf = 0;
  function upd() {
    raf = 0;
    var y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (h > 0 ? y / h : 0) + ')';
    prog.classList.toggle('on', y > 60);
    hdr.classList.toggle('solid', y > 20);
    if (hero && !reduce) hero.style.setProperty('--hp', Math.min(1, Math.max(0, y / (innerHeight * .9))).toFixed(4));
    if (nx) nUpd();
  }
  addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
  addEventListener('resize', upd);

  /* ---------- хиро с N: същата математика като на главната (v15.js) ---------- */
  var nx = $('.ar-nx'), free = false;
  var ASP = 1.0452, KD = { w: .4497, h: .2814, fx: .5013, fy: .6394 }, KP = { w: .289, h: .623, fx: .4209, fy: .6827 };
  function ease(t) { return t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function nUpd() {
    var vw = innerWidth, vh = innerHeight, nlen = vh * 1.2; // Коста 15.10: видеото с текста -> N преход -> плавно в следващата секция, без спиране на N
    nx.style.setProperty('--nlen', (reduce ? 0 : nlen) + 'px');
    var r = nx.getBoundingClientRect(), progress = Math.max(0, Math.min(1, -r.top / nlen));
    var t = $('.ar-nx-t', nx), hd = hdr ? hdr.getBoundingClientRect().height : 88;
    var th = t.offsetHeight, tTop = vh - th - Math.max(vh * .08, 60);
    nx.style.setProperty('--nty', tTop + 'px');
    var top = hd + 16, bot = tTop - 24, av = Math.max(100, bot - top);
    var nb = Math.max(100, Math.min(vw * .6, 620, av / ASP)), y0 = top + av / 2;
    var k = (vw / vh < .9) ? KP : KD;
    var need = Math.max(vw / k.w, vh / (k.h * ASP)) * 1.3;
    // Видео на цял екран -> свива се в N със заглавието -> N остава, а спортовете се плъзгат върху него (без връщане към хирото).
    // текстът изчезва в началото; видеото се свива в N; после N избледнява и се изнася, докато спортовете влизат отдолу
    var e = progress < .04 ? 1 : progress < .52 ? 1 - ease((progress - .04) / .48) : 0;
    nx.style.setProperty('--ntx', Math.max(0, 1 - progress * 4.5).toFixed(3));
    nx.style.setProperty('--nout', Math.max(0, Math.min(1, (progress - .62) / .38)).toFixed(3));
    var ms = nb * Math.pow(need / nb, e), Y = lerp(y0, vh / 2, e), fx = lerp(.5, k.fx, e), fy = lerp(.5, k.fy, e);
    nx.style.setProperty('--nms', ms.toFixed(1) + 'px');
    nx.style.setProperty('--nml', (vw / 2 - fx * ms).toFixed(1) + 'px');
    nx.style.setProperty('--nmt', (Y - fy * ms * ASP).toFixed(1) + 'px');
    nx.style.setProperty('--np', e.toFixed(4));
    nx.style.setProperty('--nt', (reduce ? 1 : 1 - e).toFixed(4));
    var f = reduce || e > .999; if (f !== free) { free = f; nx.classList.toggle('nfree', f); }
    if (reduce) { var v = $('video', nx); v.pause(); v.removeAttribute('autoplay'); }

  }
  if (nx && document.fonts && document.fonts.ready) document.fonts.ready.then(upd);
  upd();

  /* ---------- плавно появяване ---------- */
  var els = $$('.ap');
  if (!('IntersectionObserver' in window) || reduce) els.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }
  $$('[data-store],[data-social]').forEach(function (a) { a.removeAttribute('target'); a.addEventListener('click', function (e) { e.preventDefault(); }); });

  /* ---------- лайтбокс: 5 секунди преглед, после „Гледай в NOISY“ ---------- */
  var lb = document.createElement('div');
  lb.className = 'ar-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Преглед');
  lb.innerHTML = '<div class="ar-lb-w"><button type="button" class="ar-lb-x" aria-label="Затвори">×</button><div class="ar-lb-m"><video playsinline muted></video><img class="ar-lb-i" alt="" hidden><div class="ar-lb-bar"><i></i></div><div class="ar-lb-end"><b>Гледай целия мач в NOISY.</b><a class="btn btn-p" href="#" data-su="">Пробвай NOISY</a><button type="button" class="ar-lb-re">Гледай прегледа пак</button></div></div><div class="ar-lb-b"><b></b></div></div>';
  document.body.appendChild(lb);
  var lv = $('video', lb), li = $('.ar-lb-i', lb), lt = 0, lastFocus = null, cur = null;
  function lbRun() {
    clearTimeout(lt); lb.classList.remove('run', 'done'); void lb.offsetWidth;
    if (cur.v) { lv.hidden = false; li.hidden = true; lv.currentTime = 0; playSafe(lv); } else { lv.hidden = true; li.hidden = false; }
    lb.classList.add('run');
    lt = setTimeout(function () { lv.pause(); lb.classList.add('done'); $('.ar-lb-end .btn', lb).focus(); }, cur.v ? 5000 : 2200);
  }
  function openLb(it) {
    cur = it; lastFocus = document.activeElement;
    $('.ar-lb-b b', lb).textContent = it.t;
    if (it.v) { lv.poster = it.img; lv.src = it.v + '.mp4'; } else { li.src = it.img; lv.removeAttribute('src'); }
    lb.classList.add('on'); document.documentElement.style.overflow = 'hidden'; lbRun(); $('.ar-lb-x', lb).focus();
  }
  window.arLb = function (it) { openLb(it); };
  function closeLb() { clearTimeout(lt); lb.classList.remove('on', 'run', 'done'); lv.pause(); lv.removeAttribute('src'); lv.load(); document.documentElement.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target.closest('.ar-lb-x')) closeLb();
    else if (e.target.closest('.ar-lb-re')) lbRun();
    else if (e.target.closest('[data-su]')) closeLb();
  });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb.classList.contains('on')) closeLb(); });

  /* ---------- 1 · спортове: центриран безкраен карусел (както на noisy.net) ---------- */
  var F = function (c) { return 'img/fl/' + c + '.svg'; };
  var PLAY = '<span class="pl" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>';
  function cardHTML(it, small) {
    var m = '';
    if (it.img) m = '<img class="ph" src="' + it.img + '" alt="" draggable="false" decoding="async">' + (it.v ? '<video muted loop playsinline preload="none"></video>' : '');
    else if (it.a) m = '<div class="ar-gn"><div class="t"><div class="tm"><img src="' + F(it.a[0]) + '" alt=""><b>' + it.a[1] + '</b></div><span class="vs">VS</span><div class="tm"><img src="' + F(it.b[0]) + '" alt=""><b>' + it.b[1] + '</b></div></div></div>';
    else if (it.x) m = '<div class="ar-gn"><div class="t"><div class="x"><b>' + it.x[0] + '</b><small>' + it.x[1] + '</small></div></div></div>';
    var st = '';
    if (it.st === 'live') st = '<span class="st lv">LIVE' + (it.m ? ' <span class="mn" data-m="' + it.m + '">' + (typeof it.m === 'number' ? it.m + '\'' : it.m) + '</span>' : '') + '</span>';
    else if (it.st) st = '<span class="st">' + it.st + '</span>';
    return m + st + (it.pm ? '<span class="ar-pm">Premium</span>' : '') + '<span class="cap">' + it.t + '</span>' + (it.v ? PLAY : '');
  }
  function Car(el, onMove) {
    this.el = el; this.trk = $('.ar-trk', el); this.items = []; this.n = 0; this.idx = 0; this.onMove = onMove; var me = this;
    this.trk.addEventListener('transitionend', function (e) { if (e.target === me.trk) me.norm(); });
    /* влачене и плъзгане */
    var sx = 0, dx = 0, down = false, moved = false;
    el.addEventListener('pointerdown', function (e) { if (e.button) return; down = true; moved = false; sx = e.clientX; dx = 0; });
    addEventListener('pointermove', function (e) { if (!down) return; dx = e.clientX - sx; if (Math.abs(dx) > 6) moved = true; });
    addEventListener('pointerup', function () { if (!down) return; down = false; if (Math.abs(dx) > 50) { me.go(me.idx + (dx < 0 ? 1 : -1)); kick(); } });
    el.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); return; }
      var c = e.target.closest('.ar-it'); if (!c) return;
      var i = +c.dataset.i;
      if (i !== me.idx) { me.go(i); kick(); } else openLb(me.items[i % me.n]);
    });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.classList.contains('ar-it')) { e.target.click(); } });
    var l = $('.ar-nav.l', el), r = $('.ar-nav.r', el);
    if (l) l.addEventListener('click', function (e) { e.stopPropagation(); me.go(me.idx - 1); kick(); });
    if (r) r.addEventListener('click', function (e) { e.stopPropagation(); me.go(me.idx + 1); kick(); });
    if (canHover) {
      el.addEventListener('mouseover', function (e) { var c = e.target.closest('.ar-it'); if (c) me.pv(c, true); });
      el.addEventListener('mouseout', function (e) { var c = e.target.closest('.ar-it'); if (c && !c.contains(e.relatedTarget)) me.pv(c, false); });
    }
  }
  Car.prototype.set = function (items, small) {
    this.items = items; this.n = items.length; this.el.hidden = !this.n;
    if (!this.n) return;
    var rep = this.n > 1 ? 3 : 1, h = '';
    for (var k = 0; k < rep; k++) items.forEach(function (it, j) { h += '<div class="ar-it" role="button" tabindex="' + (k === 1 || rep === 1 ? 0 : -1) + '" aria-label="' + it.t + '" data-i="' + (k * items.length + j) + '">' + cardHTML(it, small) + '</div>'; });
    this.trk.innerHTML = h;
    this.idx = rep === 3 ? this.n : 0;
    this.pos(false);
  };
  Car.prototype.pos = function (anim) {
    if (!this.n) return;
    var its = this.trk.children, c = its[this.idx]; if (!c) return;
    var gap = parseFloat(getComputedStyle(this.trk).columnGap) || 16, w = c.offsetWidth;
    var x = this.el.clientWidth / 2 - (this.idx * (w + gap) + w / 2);
    if (!anim) this.trk.classList.add('nt');
    this.trk.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)';
    for (var i = 0; i < its.length; i++) { its[i].classList.toggle('on', i === this.idx); its[i].classList.toggle('nb', Math.abs(i - this.idx) === 1); }
    if (!anim) { void this.trk.offsetWidth; this.trk.classList.remove('nt'); }
    if (this.onMove) this.onMove(this.idx % this.n, this.n);
  };
  Car.prototype.go = function (i) { if (this.n < 2) return; this.idx = i; this.pos(!reduce); if (reduce) this.norm(); };
  Car.prototype.norm = function () { if (this.n < 2) return; if (this.idx >= 2 * this.n) { this.idx -= this.n; this.pos(false); } else if (this.idx < this.n) { this.idx += this.n; this.pos(false); } };
  Car.prototype.pv = function (c, on) {
    var it = this.items[+c.dataset.i % this.n]; if (!it || !it.v) return; var v = $('video', c);
    if (on) { if (!v.src) v.src = it.v + '.mp4'; playSafe(v); c.classList.add('is-pv'); } else { v.pause(); c.classList.remove('is-pv'); }
  };

  var dots2 = $('#arDots2');
  function dotsSet(i, n) { if (dots2.children.length !== n) dots2.innerHTML = new Array(n + 1).join('<i></i>'); [].forEach.call(dots2.children, function (d, j) { d.classList.toggle('on', j === i); }); }
  var big = $('#arBig') && new Car($('#arBig'), dotsSet), sm = $('#arSm') && new Car($('#arSm'));
  var tabs = $$('.ar-tabs button');
  function setSport(sp) {
    tabs.forEach(function (t) { var on = t.dataset.sp === sp; t.classList.toggle('on', on); t.setAttribute('aria-selected', on); });
    var b = [], s = [];
    if (sp === 'all') {
      /* „Всички“: картите се редуват по спортове (футбол, волейбол, баскетбол, тенис, F1...), за да не изглежда като футболен модул */
      var lists = D.order.map(function (k) { return D.sports[k].big.slice(); }), more = true;
      while (more) { more = false; lists.forEach(function (l) { if (l.length) { b.push(l.shift()); more = true; } }); }
      var sl = D.order.map(function (k) { return D.sports[k].small.slice(); }); more = true;
      while (more) { more = false; sl.forEach(function (l) { if (l.length) { s.push(l.shift()); more = true; } }); }
    }
    else { b = D.sports[sp].big; s = D.sports[sp].small; }
    big.set(b); sm.set(s, true);
  }
  if (big) {
    tabs.forEach(function (t) { t.addEventListener('click', function () { setSport(t.dataset.sp); kick(); }); });
    setSport('all');
    addEventListener('resize', function () { big.pos(false); sm.pos(false); });
    /* автоматично, на всеки 4,5 секунди; спира при мишка отгоре, извън екрана и в скрит раздел */
    var hov = false, vis = false, tm = 0;
    var wt = $('#gledai');
    wt.addEventListener('mouseenter', function () { hov = true; }); wt.addEventListener('mouseleave', function () { hov = false; });
    new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { threshold: .25 }).observe(big.el);
    function tick() { if (!reduce && vis && !hov && !document.hidden && !lb.classList.contains('on')) { big.go(big.idx + 1); sm.go(sm.idx + 1); } }
    function kick() { clearInterval(tm); tm = setInterval(tick, 4500); }
    window.kick = kick; kick();
    /* минутите на мачовете на живо вървят */
    setInterval(function () { $$('.ar-it .mn').forEach(function (m) { var v = m.dataset.m; if (/^\d+$/.test(v)) { v = Math.min(90, +v + 1); m.dataset.m = v; m.textContent = v + '\''; } }); }, 20000);
  }
  function kick() { if (window.kick) window.kick(); }

  /* ---------- 2 · „Повече от мача“ ---------- */
  var cs = $('#arCs');
  if (cs) {
    var slides = $$('.ar-sl', cs), dots = $('#arDots'), ci = 0, paused = false, timer = 0, userPaused = false, inView = false, more = $('.ar-more');
    slides.forEach(function (s, i) { var b = document.createElement('button'); b.type = 'button'; b.setAttribute('aria-label', 'Слайд ' + (i + 1)); b.innerHTML = '<i></i>'; b.addEventListener('click', function () { go2(i, true); }); dots.appendChild(b); });
    var dbtn = $$('button', dots);
    var playIn = function (s, on) { $$('video', s).forEach(function (v) { if (on) { if (!v.src && v.dataset.src) v.src = v.dataset.src; playSafe(v); } else v.pause(); }); };
    var arm = function () {
      clearTimeout(timer); dbtn.forEach(function (b, i) { b.classList.toggle('on', i === ci); b.style.setProperty('--ms', slides[i].dataset.ms + 'ms'); var ii = $('i', b); ii.style.animation = 'none'; void ii.offsetWidth; ii.style.animation = ''; });
      if (paused || userPaused || !inView || reduce) return;
      timer = setTimeout(function () { go2((ci + 1) % slides.length, false); }, +slides[ci].dataset.ms);
    };
    var mark = function () { slides.forEach(function (s, j) { s.classList.toggle('on', j === ci); playIn(s, inView && j === ci); }); };
    var go2 = function (i, byUser) {
      ci = (i + slides.length) % slides.length; mark();
      cs.scrollTo({ left: slides[ci].offsetLeft - parseFloat(getComputedStyle(cs).paddingLeft), behavior: reduce ? 'auto' : 'smooth' });
      if (byUser) { userPaused = false; more.classList.remove('ar-paused'); }
      arm();
    };
    $('.ar-side.l').addEventListener('click', function () { go2(ci - 1, true); });
    $('.ar-side.r').addEventListener('click', function () { go2(ci + 1, true); });
    $('.ar-cb.p').addEventListener('click', function () { go2(ci - 1, true); });
    $('.ar-cb.n').addEventListener('click', function () { go2(ci + 1, true); });
    $('#arPp').addEventListener('click', function () { userPaused = !userPaused; more.classList.toggle('ar-paused', userPaused); this.setAttribute('aria-label', userPaused ? 'Пусни' : 'Пауза'); if (userPaused) clearTimeout(timer); else arm(); });
    var st;
    cs.addEventListener('scroll', function () { clearTimeout(st); st = setTimeout(function () { var m = 1e9, k = ci; slides.forEach(function (s, j) { var d = Math.abs(s.offsetLeft - parseFloat(getComputedStyle(cs).paddingLeft) - cs.scrollLeft); if (d < m) { m = d; k = j; } }); if (k !== ci) { ci = k; mark(); arm(); } }, 120); }, { passive: true });
    cs.addEventListener('mouseenter', function () { paused = true; clearTimeout(timer); more.classList.add('ar-paused'); });
    cs.addEventListener('mouseleave', function () { paused = false; if (!userPaused) more.classList.remove('ar-paused'); arm(); });
    new IntersectionObserver(function (es) { inView = es[0].isIntersecting; mark(); if (inView) arm(); else clearTimeout(timer); }, { threshold: .35 }).observe($('#arCar'));
    if (canHover && !reduce) slides.forEach(function (s) {
      s.addEventListener('mousemove', function (e) { var r = s.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; $$('.ar-ph:not(.ar-ph-img), .ar-tv', s).forEach(function (p) { p.style.setProperty('--ry', (x * 10) + 'deg'); p.style.setProperty('--rx', (-y * 8) + 'deg'); }); });
      s.addEventListener('mouseleave', function () { $$('.ar-ph, .ar-tv', s).forEach(function (p) { p.style.setProperty('--ry', '0deg'); p.style.setProperty('--rx', '0deg'); }); });
    });
    mark(); arm();
  }

  /* Figma 1:8167: exact supplied demo fixture, no invented live goals. */
  var DAYS = [
    { l: 'Sun, 25 Jan', rows: [['Germany','de',3,0,'FT','cw','Curaçao'],['Netherlands','nl',1,1,'FT','jp','Japan']] },
    { l: 'Mon, 26 Jan', rows: [['Mexico','mx',0,0,"3′",'za','South Africa'],['South Korea','kr',0,1,"5′",'cz','Czechia'],['Canada','ca',1,0,"10′",'ba','Bosnia and Herzegovina'],['USA','us',0,0,"13′",'py','Paraguay'],['Qatar','qa',0,0,'22:00','ch','Switzerland']] },
    { l: 'Tue, 27 Jan', rows: [['Brazil','br',0,0,'01:00','ma','Morocco'],['Haiti','ht',0,0,'04:00','gb-sct','Scotland'],['Australia','au',0,0,'07:00','tr','Türkiye']] }
  ];
  var rowsEl = $('#arRows');
  if (rowsEl) {
    var di = 1, expanded = false, dd = $$('#arDays .ar-dd button'), moreLs = $('.ar-ls-more');
    function renderDay() {
      dd.forEach(function (s, i) { s.textContent = DAYS[i].l; s.classList.toggle('on', i === di); s.setAttribute('aria-pressed', i === di); });
      rowsEl.innerHTML = DAYS[di].rows.map(function (r, i) {
        return '<div class="ar-row"' + (i > 3 && !expanded ? ' hidden' : '') + '><span class="a">' + r[0] + '<img src="' + F(r[1]) + '" alt=""></span><span class="ar-sc2"><b>' + r[2] + ' : ' + r[3] + '</b><small class="lv">' + r[4] + '</small></span><span class="b"><img src="' + F(r[5]) + '" alt="">' + r[6] + '</span></div>';
      }).join('');
      rowsEl.classList.toggle('expanded', expanded);
      $('#arDays .p').disabled = di === 0; $('#arDays .n').disabled = di === DAYS.length - 1;
      moreLs.hidden = DAYS[di].rows.length <= 4;
      moreLs.setAttribute('aria-expanded', expanded);
      moreLs.innerHTML = (expanded ? 'See less' : 'See more') + ' <span aria-hidden="true">' + (expanded ? '⌃' : '⌄') + '</span>';
    }
    dd.forEach(function (s, i) { s.addEventListener('click', function () { di = i; expanded = false; renderDay(); }); });
    $('#arDays .p').addEventListener('click', function () { if (di > 0) { di--; expanded = false; renderDay(); } });
    $('#arDays .n').addEventListener('click', function () { if (di < 2) { di++; expanded = false; renderDay(); } });
    moreLs.addEventListener('click', function () { expanded = !expanded; renderDay(); });
    renderDay();
  }

  /* ---------- другите модули: видеото тръгва при мишка отгоре ---------- */
  if (canHover) $$('.ar-om, .ar-md').forEach(function (a) {
    var v = $('.ar-om-v, .ar-md-v', a); if (!v) return;
    a.addEventListener('mouseenter', function () { if (!v.src) v.src = v.dataset.tv + '.mp4'; playSafe(v); a.classList.add('is-pv'); });
    a.addEventListener('mouseleave', function () { v.pause(); a.classList.remove('is-pv'); });
  });
})();
