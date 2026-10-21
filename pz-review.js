/* Review controls belong only to the variants page. Product state stays in pz-var.js. */
(() => {
  const hosts = [...document.querySelectorAll('[data-pz]')];
  const variants = hosts.map(h => h.closest('.pzv'));
  const ids = ['A', 'vb', 'vc', 'vd', 've', 'vf'];
  const names = ['Близо до оригинала', 'Отворена композиция', 'Избор по период', 'Два ясни плана', 'Всичко на място', 'На човек'];
  const nav = document.createElement('div');
  nav.className = 'pricing-review';
  const tab = i => '<button type="button" data-variant="' + ids[i] + '" aria-pressed="false"><b>' + String.fromCharCode(65 + i) + '</b><span>' + names[i] + '</span></button>';
  nav.innerHTML = '<div class="pricing-review-controls" role="group" aria-label="Нови версии на прайсинга">' + [3,4,5].map(tab).join('') + '</div><details class="review-previous"><summary>Предишните версии</summary><div class="pricing-review-controls" role="group" aria-label="Предишни версии">' + [0,1,2].map(tab).join('') + '</div></details><button type="button" class="review-all" aria-pressed="false">Всички един под друг</button>';
  variants[0].before(nav);
  let selected = ids.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'vd';
  let all = false;
  const show = () => {
    variants.forEach((v, i) => { v.hidden = !all && ids[i] !== selected; v.classList.toggle('is-comparison', all); });
    nav.querySelectorAll('[data-variant]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.variant === selected)));
    if (['A','vb','vc'].includes(selected)) nav.querySelector('.review-previous').open = true;
    nav.querySelector('.review-all').setAttribute('aria-pressed', String(all));
    nav.querySelector('.review-all').textContent = all ? 'Покажи само избрания' : 'Всички един под друг';
    window.dispatchEvent(new Event('resize'));
  };
  nav.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.variant) { selected = b.dataset.variant; all = false; history.replaceState(null, '', '#' + selected); }
    else all = !all;
    show();
  });
  window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (ids.includes(id)) { selected = id; all = false; show(); } });
  // Radio controls inside the prototype support arrows, Home and End as well as Tab.
  let syncing = false;
  hosts.forEach(h => {
    const root = h.shadowRoot;
    window.mountSimplePricing?.(h);
    {
      if (h.dataset.v === 'vc') {
        const price = root.querySelector('.price-col');
        const periods = root.querySelector('#periodSeg');
        const intro = document.createElement('p');
        intro.className = 'period-intro'; intro.textContent = 'Избери период';
        periods.before(intro); periods.after(price);
      }
      const caption = document.createElement('p');
      caption.className = 'billing-caption';
      root.querySelector('.price-main').after(caption);
      const updateCaption = () => {
        const selectedPeriod = root.querySelector('#periodSeg [aria-checked="true"]');
        const months = Number(selectedPeriod.dataset.period);
        caption.textContent = months === 1 ? 'Общо за 1 месец' : 'Общо за ' + months + ' месеца, платени наведнъж';
      };
      root.addEventListener('click', updateCaption);
      // The prototype animates monthly labels after a click; follow their final value too.
      new MutationObserver(updateCaption).observe(root.querySelector('#periodSeg'), {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['aria-checked']});
      updateCaption();
    }
    root.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b || syncing) return;
      const attr = ['data-plan', 'data-period', 'data-n'].find(a => b.hasAttribute(a));
      if (!attr) return;
      syncing = true;
      try { hosts.filter(other => other !== h).forEach(other => other.shadowRoot.querySelector('button[' + attr + '="' + b.getAttribute(attr) + '"]')?.click()); }
      finally { syncing = false; }
    });
    root.addEventListener('keydown', e => {
      if (!e.target.matches('button[role="radio"]') || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) return;
      const buttons = [...e.target.parentElement.querySelectorAll('button[role="radio"]')];
      const delta = ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 1;
      const i = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : (buttons.indexOf(e.target) + delta + buttons.length) % buttons.length;
      e.preventDefault(); buttons[i].focus(); buttons[i].click();
    });
  });
  show();
})();
