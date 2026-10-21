/* „За нас“ v6: хирото сменя четирите свята на 4,5 сек; в картите елементът излиза от екрана на телефона при скрол. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  function load(v) { if (v.dataset.src && !v.getAttribute('src')) { v.src = v.dataset.src; } }
  function play(v) { load(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }

  /* ---------- 1 · хиро ---------- */
  var hero = $('#abHero'), vids = $$('.z6-hv'), hls = $$('.z6-hl'), chips = $$('.z6-chip'), cur = 0, tm = 0, DUR = 4500, live = true;
  function show(i) {
    cur = (i + vids.length) % vids.length;
    vids.forEach(function (v, j) { var on = j === cur; v.classList.toggle('on', on); if (on) { v.currentTime = 0; play(v); } else { setTimeout(function () { if (!v.classList.contains('on')) v.pause(); }, 1100); } });
    hls.forEach(function (h, j) { h.classList.toggle('on', j === cur); h.setAttribute('aria-hidden', j === cur ? 'false' : 'true'); });
    chips.forEach(function (c, j) { c.classList.remove('on'); if (j === cur) { void c.offsetWidth; c.classList.add('on'); } c.setAttribute('aria-pressed', j === cur); });
    load(vids[(cur + 1) % vids.length]);
    clearTimeout(tm); if (!reduce && live) tm = setTimeout(function () { show(cur + 1); }, DUR);
  }
  if (hero && vids.length) {
    document.documentElement.style.setProperty('--z6-dur', DUR + 'ms');
    chips.forEach(function (c, j) { c.addEventListener('click', function () { show(j); }); });
    if (reduce) { hls.forEach(function (h, j) { h.classList.toggle('on', j === 0); }); vids.forEach(function (v) { v.removeAttribute('autoplay'); }); }
    else {
      new IntersectionObserver(function (es) {
        live = es[0].isIntersecting && !document.hidden;
        if (live) show(cur); else { clearTimeout(tm); vids[cur].pause(); }
      }, { threshold: .15 }).observe(hero);
      document.addEventListener('visibilitychange', function () { live = !document.hidden; if (live) show(cur); else { clearTimeout(tm); vids[cur].pause(); } });
    }
  }

  /* ---------- 3 · елементът излиза от екрана (--p от 0 до 1 според мястото на картата) ---------- */
  var cards = $$('.z6-card'), raf = 0;
  function upd() {
    raf = 0; var vh = innerHeight;
    cards.forEach(function (c) {
      var r = c.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = (vh - r.top) / (vh * .62);           // 0, когато картата влиза отдолу; 1 около горната третина
      p = Math.max(0, Math.min(1, p)); p = p * p * (3 - 2 * p);
      c.style.setProperty('--p', p.toFixed(3));
    });
  }
  if (!reduce && cards.length) { addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true }); addEventListener('resize', upd); upd(); }

  /* видеото в телефона на Newsroom тече само когато се вижда */
  $$('.z6-screen video').forEach(function (v) {
    if (reduce) return;
    new IntersectionObserver(function (es) { if (es[0].isIntersecting) play(v); else v.pause(); }, { threshold: .2 }).observe(v);
  });

  /* ---------- плавно появяване ---------- */
  var els = $$('.ap');
  if (!('IntersectionObserver' in window) || reduce) els.forEach(function (e) { e.classList.add('in'); });
  else {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* при скрол надписът NOISY изчезва и остава само символът N (както на главната) */
  var hd=$('.hdr');if(hd){var mn=false;var mu=function(){var m=scrollY>40;if(m!==mn){mn=m;hd.classList.toggle('mini',m)}};addEventListener('scroll',mu,{passive:true});mu();}

  /* лентата за прогреса горе */
  var pr = $('#prog');
  if (pr) addEventListener('scroll', function () { var h = document.documentElement.scrollHeight - innerHeight; pr.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; }, { passive: true });
})();
