(() => {
  const root = document.getElementById('mods');
  if (!root || !document.getElementById('ag-data')) return;
  const data = JSON.parse(document.getElementById('ag-data').textContent);
  const scene = root.querySelector('.ag-scene');
  const stick = root.querySelector('.ag-stick');
  const slides = [...root.querySelectorAll('.ag-slide')];
  const pause = root.querySelector('.ag-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const preview = document.getElementById('ag-preview');
  const pv = preview.querySelector('video');
  let lastSent = 0, current = 0, paused = reduced.matches, progress = 0, timer = null, raf = 0, previousFocus;
  const clamp = n => Math.max(0, Math.min(1, n));
  const visible = () => { const r = stick.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
  function schedule() {
    clearTimeout(timer);
    if (false && !paused && !preview.open && !document.querySelector('#su.on') && progress >= 1 && visible() && !document.hidden) timer = setTimeout(() => go(current + 1), data.autoMs);
  }
  function draw() {
    raf = 0;
    const h = stick.clientHeight;const nlen = reduced.matches ? 0 : Math.round(innerHeight * 1.15);root.style.setProperty('--ag-nlen', nlen + 'px');
    const scrolled = Math.max(0, -scene.getBoundingClientRect().top);
    // без мъртва зона: свиването започва веднага щом картата се фиксира (преди това имаше цял екран, в който нищо не се движи)
    progress = reduced.matches ? 1 : clamp((scrolled - nlen) / 760);
    if (progress <= 0 && current !== 0 && typeof go === 'function') { go(0, true); }
    const cs = getComputedStyle(root);
    const w = parseFloat(cs.getPropertyValue('--ag-w'));
    const ch = parseFloat(cs.getPropertyValue('--ag-h'));
    const gap = parseFloat(cs.getPropertyValue('--ag-gap'));
    const radius = parseFloat(cs.getPropertyValue('--ag-radius'));
    root.style.setProperty('--ag-current-w', (innerWidth + (w - innerWidth) * progress) + 'px');
    root.style.setProperty('--ag-current-h', (h + (ch - h) * progress) + 'px');
    root.style.setProperty('--ag-round', (radius * progress) + 'px');
    root.style.setProperty('--ag-top', '0px');root.style.setProperty('--ag-p', progress.toFixed(4));root.classList.toggle('is-shrinking', progress < 1);
    root.style.setProperty('--ag-controls', progress >= 1 ? 1 : 0);
    root.style.setProperty('--ag-pointer', progress >= 1 ? 'auto' : 'none');
    root.style.setProperty('--ag-info', clamp(progress * 1.8));
    root.style.setProperty('--ag-shelf-opacity', progress >= 1 ? 1 : 0);
    root.style.setProperty('--ag-shelf-y', (progress >= 1 ? 0 : 50) + 'px');
    const small = innerWidth < 1069;
    const widths = (parseFloat(cs.getPropertyValue('--ag-tile-w')) + parseFloat(cs.getPropertyValue('--ag-tile-gap'))) * data.rows[0].length;
    if (current !== lastSent) { lastSent = current; root.dispatchEvent(new CustomEvent('agchange', {detail: current})); }
    root.querySelectorAll('.ag-flow').forEach((row, i) => {
      const speed = small ? (i ? 30 : 24) : (i ? 60 : 48);
      row.style.setProperty('--ag-marquee-ms', (widths / speed * 1000) + 'ms');
    });
    slides.forEach((slide, i) => {
      let offset = (i - current + slides.length) % slides.length;
      if (offset > slides.length / 2) offset -= slides.length;
      slide.style.setProperty('--ag-x', (offset * (w + gap)) + 'px');
      slide.style.setProperty('--ag-opacity', offset === 0 ? 1 : clamp((progress - .8) / .2));
      slide.classList.toggle('is-current', i === current);
      slide.setAttribute('aria-hidden', i === current ? 'false' : 'true');
      slide.querySelectorAll('button').forEach(b => b.tabIndex = i === current ? 0 : -1);
    });
    root.classList.toggle('is-paused', paused || !visible() || Boolean(document.querySelector('#su.on')));
    if (!visible() && preview.open) pv.pause();
    schedule();
  }
  function go(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach(s => s.style.transition = reduced.matches ? 'none' : 'transform 500ms cubic-bezier(.65,0,.35,1)');
    draw();
    if (announce) document.getElementById('ag-status').textContent = data.slides[current].title + ', ' + (current + 1) + ' от ' + slides.length;
  }
  window.agGo = i => go(i, true);
  slides.forEach((sl, i) => sl.addEventListener('click', () => { if (progress >= 1 && i !== current) go(i, true); }));
  root.querySelector('.ag-prev').addEventListener('click', () => go(current - 1, true));
  root.querySelector('.ag-next').addEventListener('click', () => go(current + 1, true));
  pause.setAttribute('aria-pressed',String(paused));
  if(paused){pause.textContent='▶';pause.setAttribute('aria-label','Пусни движението')}
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? '▶' : 'Ⅱ';
    pause.setAttribute('aria-label', paused ? 'Пусни движението' : 'Пауза на движението');
    pause.setAttribute('aria-pressed', String(paused)); draw();
  });
  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1, true); }
  });
  let start = null, dragged = false;
  stick.style.touchAction = 'pan-y';
  stick.addEventListener('pointerdown', e => { start = {x:e.clientX,y:e.clientY}; dragged = false; });
  stick.addEventListener('pointerup', e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (progress >= 1 && Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { dragged = true; go(current + (dx < 0 ? 1 : -1), true); }
    start = null;
  });
  stick.addEventListener('click', e => { if (dragged) { e.preventDefault(); e.stopPropagation(); dragged = false; } }, true);
  function openPreview(index, trigger) {
    const item = data.slides[index]; previousFocus = trigger;
    pv.src = item.video; pv.poster = item.landscape;
    preview.querySelector('h3').textContent = item.title;
    const link = preview.querySelector('[data-world-link]'); link.href = item.page; link.textContent = 'Всичко за ' + item.world[0].toUpperCase() + item.world.slice(1) + ' →';
    preview.showModal(); pv.play().catch(() => {}); clearTimeout(timer);
  }
  root.querySelectorAll('[data-ag-preview]').forEach(b => b.addEventListener('click', () => openPreview(+b.dataset.agPreview, b)));
  preview.querySelector('.ag-preview-close').addEventListener('click', () => preview.close());
  preview.addEventListener('close', () => { pv.pause(); previousFocus?.focus(); schedule(); });
  preview.querySelector('[data-su]').addEventListener('click', () => preview.close());
  window.tvTab = world => {
    const i = data.slides.findIndex(s => s.world === world);
    if (i >= 0) { current = i; root.scrollIntoView({block:'start'}); go(i); }
  };
  const queue = () => { if (!raf) raf = requestAnimationFrame(draw); };
  addEventListener('scroll', queue, {passive:true}); addEventListener('resize', queue);
  document.addEventListener('visibilitychange', queue); document.addEventListener('signupstate', queue); reduced.addEventListener('change', queue);
  const initialWorld = new URLSearchParams(location.search).get('tab');
  if (initialWorld) {
    const i = data.slides.findIndex(s => s.world === initialWorld);
    if (i >= 0) current = i;
  }
  draw();
})();
