/* Интерактивна демонстрация по Web Noisy Figma. Всички резултати са примерни. */
(function () {
  'use strict';
  var player = document.getElementById('afPlayer');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (player) {
  var captions = {
    moments: 'Гол, картон или смяна. Точно в минутата на събитието.',
    scores: 'Резултатите от другите мачове, докато гледаш своя.',
    lineups: 'Титулярите, формацията и цялата резервна скамейка.',
    stats: 'Владеене, удари, корнери и картони на един екран.',
    h2h: 'Как са завършили предишните срещи между двата отбора.'
  };
  var tabs = Array.from(player.querySelectorAll('[data-af-tab]'));
  function selectTab(tab, focus) {
    tabs.forEach(function (b) {
      var on = b === tab;
      b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
      document.getElementById(b.getAttribute('aria-controls')).hidden = !on;
    });
    document.getElementById('afCaption').textContent = captions[tab.dataset.afTab];
    if (focus) { tab.focus(); tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' }); }
  }
  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () { var pause = document.getElementById('arPp'); if (pause.getAttribute('aria-label') === 'Пауза') pause.click(); selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var n = e.key === 'ArrowRight' ? (index + 1) % tabs.length : e.key === 'ArrowLeft' ? (index + tabs.length - 1) % tabs.length : e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : -1;
      if (n >= 0) { e.preventDefault(); selectTab(tabs[n], true); }
    });
  });
  var positions = [[50,90],[16,73],[39,73],[62,73],[85,73],[26,49],[50,45],[74,49],[20,22],[50,16],[80,22]];
  var pitch = player.querySelector('.af-pitch');
  positions.forEach(function (p, i) { var s = document.createElement('span'); s.textContent = [1,2,4,5,3,6,8,10,7,9,11][i]; s.style.left = p[0] + '%'; s.style.top = p[1] + '%'; pitch.appendChild(s); });
  player.querySelectorAll('[data-af-team]').forEach(function (button) { button.addEventListener('click', function () {
    player.querySelectorAll('[data-af-team]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
    document.getElementById('afTeamName').textContent = button.dataset.afTeam + ' · 4-3-3';
    pitch.classList.toggle('af-away', button.dataset.afTeam === 'Левски');
    pitch.setAttribute('aria-label', button.dataset.afTeam + ' · Примерна формация 4-3-3');
  }); });

  }

  var first = document.querySelector('#arCs .ar-sl:first-child .ar-sl-t');
  /* 20.10 (Коста): бутонът „Изрежи своя момент“ е махнат от Arena (не работеше) */
  var dialog = document.createElement('dialog'); dialog.className = 'af-dialog'; dialog.setAttribute('aria-labelledby', 'afShareTitle');
  dialog.innerHTML = '<div class="af-dhead"><h2 id="afShareTitle">От мача в историята ти.</h2><button type="button" class="af-close" aria-label="Затвори споделянето">×</button></div>' +
    '<div class="af-editor"><div><div class="af-preview"><img src="assets/logo.svg" alt="NOISY"><video muted loop playsinline poster="img/levski-kairat.jpg"></video><p><span class="af-story-text">Голът, веднага.</span><small>Кайрат 0 : 1 Левски · 84′</small></p></div><p class="af-hint">Демонстрация на оформянето на клип по мокъпите на NOISY.</p></div>' +
    '<div class="af-controls"><label for="afFormat">Формат</label><select id="afFormat"><option value="9/16">9:16 · История</option><option value="4/5">4:5 · Публикация</option><option value="16/9">16:9 · Видео</option></select>' +
    '<label for="afText">Текст върху клипа</label><input id="afText" type="text" maxlength="48" value="Голът, веднага.">' +
    '<label>Изрязване на момента</label><div class="af-trim" aria-hidden="true"><span></span></div><div class="af-choice" role="group" aria-label="Дължина на клипа"><button type="button" aria-pressed="true" data-af-length="10">10 сек</button><button type="button" aria-pressed="false" data-af-length="30">30 сек</button><button type="button" aria-pressed="false" data-af-length="60">60 сек</button></div>' +
    '<label>Цвят на картата</label><div class="af-colors" role="group" aria-label="Цвят на картата"><button type="button" aria-label="Маслинен" aria-pressed="true" data-af-color="#29331c" style="--af-swatch:#29331c"></button><button type="button" aria-label="Тъмен" aria-pressed="false" data-af-color="#121317" style="--af-swatch:#121317"></button><button type="button" aria-label="Бордо" aria-pressed="false" data-af-color="#532033" style="--af-swatch:#532033"></button></div>' +
    '<button type="button" class="af-story-btn">Виж историята</button><div class="af-story-status" role="status" aria-live="polite"></div></div></div>';
  document.body.appendChild(dialog);
  var dv = dialog.querySelector('video'), preview = dialog.querySelector('.af-preview'), text = dialog.querySelector('#afText'), status = dialog.querySelector('.af-story-status');
  var origin = null, length = 10, oldOverflow = '', resumeCarousel = false;
  function play(v) { var p = v.play(); if (p) p.catch(function () {}); }
  function openShare(button) {
    origin = button; oldOverflow = document.documentElement.style.overflow;
    var pause = document.getElementById('arPp'); resumeCarousel = pause.getAttribute('aria-label') === 'Пауза'; if (resumeCarousel) pause.click();
    dialog.showModal(); document.documentElement.style.overflow = 'hidden';
    if (!dv.src) dv.src = 'vid/s/lev-goal.mp4'; dv.currentTime = 0; if (!reduce) play(dv);
    status.textContent = ''; dialog.querySelector('.af-close').focus();
  }
  function closeShare() { dialog.close(); }
  document.querySelectorAll('[data-af-share], [data-af-moment]').forEach(function (button) { button.addEventListener('click', function () { openShare(button); }); });
  dialog.querySelector('.af-close').addEventListener('click', closeShare);
  dialog.addEventListener('click', function (e) { if (e.target === dialog) { var r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeShare(); } });
  dialog.addEventListener('close', function () { dv.pause(); document.documentElement.style.overflow = oldOverflow; if (resumeCarousel) document.getElementById('arPp').click(); if (origin) origin.focus({ preventScroll: true }); });
  dialog.querySelector('#afFormat').addEventListener('change', function () { preview.style.aspectRatio = this.value; status.textContent = ''; });
  text.addEventListener('input', function () { dialog.querySelector('.af-story-text').textContent = text.value; status.textContent = ''; });
  dialog.querySelectorAll('[data-af-length]').forEach(function (button) { button.addEventListener('click', function () {
    length = +button.dataset.afLength;
    dialog.querySelectorAll('[data-af-length]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
    dialog.querySelector('.af-trim span').style.width = (length / 60 * 100) + '%'; status.textContent = '';
  }); });
  dv.addEventListener('timeupdate', function () { if (dv.currentTime > length) dv.currentTime = 0; });
  dialog.querySelectorAll('[data-af-color]').forEach(function (button) { button.addEventListener('click', function () {
    preview.style.setProperty('--af-color', button.dataset.afColor);
    dialog.querySelectorAll('[data-af-color]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); }); status.textContent = '';
  }); });
  dialog.querySelector('.af-story-btn').addEventListener('click', function () {
    status.textContent = 'Преглед на историята · ' + length + ' сек · ' + dialog.querySelector('#afFormat').selectedOptions[0].textContent + '. Нищо не се публикува.';
    dv.currentTime = 0; play(dv);
    preview.animate([{ opacity: .6 }, { opacity: 1 }], { duration: reduce ? 0 : 320 });
  });
})();
