/* Alternative presentations use the existing prototype for all state and checkout. */
window.mountSimplePricing = (host) => {
  const root = host.shadowRoot;
  const mode = host.dataset.v;
  if (!['vd', 've', 'vf'].includes(mode)) return;
  const sheet = document.createElement('link');
  sheet.rel = 'stylesheet'; sheet.href = 'pricing-simple.css?v=3'; root.append(sheet);
  const view = document.createElement('div');
  view.className = 'simple-view ' + mode;
  root.querySelector('#p1 > .wrap').setAttribute('aria-hidden', 'true');
  root.querySelector('#p1').removeAttribute('aria-labelledby');
  const periods = '<div class="simple-field"><span class="simple-label">Период</span><div class="simple-periods" role="radiogroup" aria-label="Период">' + [1,3,12].map(m => '<button type="button" role="radio" aria-checked="false" data-set-period="'+m+'"><span>'+m+(m===1?' месец':' месеца')+'</span>'+(m>1?'<small>−'+(m===3?10:15)+'%</small>':'')+'</button>').join('')+'</div></div>';
  const plans = '<div class="simple-plans" role="radiogroup" aria-label="План">' + [['ind','Solo','Един профил, само твой.'],['ff','Together','До 5 души. Всеки със свой профил.']].map(([id,name,desc]) => '<button type="button" role="radio" aria-checked="false" data-set-plan="'+id+'"><span class="simple-plan-top"><b>'+name+'</b><span class="simple-check" aria-hidden="true">✓</span></span><span class="simple-plan-desc">'+(mode==='vd'?desc:(id==='ff'?'До 5 души':'Един профил'))+'</span><span class="simple-plan-price" data-plan-price="'+id+'"></span><span class="simple-plan-unit">за '+(id==='ff'?'целия план':'плана')+' / месец</span></button>').join('')+'</div>';
  const people = '<div class="simple-people"><span class="simple-label">Колко сте?</span><div class="simple-counts" role="radiogroup" aria-label="Брой хора">'+[2,3,4,5].map(n=>'<button type="button" role="radio" aria-checked="false" data-set-n="'+n+'">'+n+'</button>').join('')+'</div><p class="simple-share"></p></div>';
  const stepper = '<div class="simple-people"><span class="simple-label">Колко сте?</span><div class="simple-stepper"><button type="button" data-step="-1" aria-label="Един човек по-малко">−</button><span class="simple-count-label" aria-live="polite"></span><button type="button" data-step="1" aria-label="Един човек повече">+</button></div></div>';
  const addons = '<details class="simple-addons"><summary>Още спорт и кино <span aria-hidden="true">+</span></summary><p><b>Premium Sport</b> и <b>Premium Films</b> можеш да добавиш отделно при завършване на абонамента.</p></details>';
  const summary = '<div class="simple-summary"><span class="simple-payment-label">Общо за плащане</span><div class="simple-summary-top"><span class="simple-selected-plan"></span><span class="simple-selected-period"></span></div><div class="simple-amount"><strong class="simple-total"></strong><span class="simple-total-caption"></span></div><p class="simple-monthly-note"></p><button type="button" class="simple-continue"></button></div>';
  if(mode==='vd') view.innerHTML = '<div class="simple-intro"><h3>Сам или с компания?</h3><p>Същият NOISY. Ти избираш с кого.</p></div>'+periods+plans+'<div class="simple-bottom">'+people+summary+'</div>'+addons;
  if(mode==='ve') view.innerHTML = '<div class="simple-intro"><h3>Твоят NOISY.</h3></div>'+plans+'<div class="simple-config"><div class="simple-feature-price"><div class="simple-month-price"><strong></strong><span></span></div><p class="simple-plan-explainer"></p>'+people+'</div><div class="simple-options">'+periods+summary+'</div></div>'+addons;
  if(mode==='vf') view.innerHTML = '<div class="simple-intro"><h3>Разделете си цената.</h3></div>'+plans+'<div class="simple-human-layout"><div class="simple-human-price"><div class="simple-human-amount"><strong></strong><span>на човек / месец</span></div><p class="simple-group-monthly"></p>'+stepper+'</div><div class="simple-human-options">'+periods+'</div></div>'+summary+addons;
  view.querySelector('.simple-addons').insertAdjacentHTML('beforebegin', '<div class="simple-included"><span>Във всеки план</span><div class="simple-worlds">'+['Theatre','Showtime','Arena','Newsroom'].map(name=>'<img src="assets/'+name+'.svg" alt="'+name+'" width="104" height="28">').join('')+'</div></div>');
  root.querySelector('#p1').append(view);
  const state = () => ({
    plan: root.querySelector('#planSwitch [aria-checked="true"]').dataset.plan,
    period: Number(root.querySelector('#periodSeg [aria-checked="true"]').dataset.period),
    people: Number(root.querySelector('#counts [aria-checked="true"]').dataset.n)
  });
  const money = n => n.toFixed(2).replace('.', ',') + '\u00a0€';
  const monthly = (plan,period) => Math.floor((plan==='ff'?24.9:14.9)*(period===3?.9:period===12?.85:1)*100+1e-6)/100;
  function update() {
    const s = state(), m = monthly(s.plan,s.period), total = Math.round(m*s.period*100)/100;
    view.querySelectorAll('[data-set-plan]').forEach(b=>{const active=b.dataset.setPlan===s.plan;b.setAttribute('aria-checked',String(active));b.tabIndex=active?0:-1});
    view.querySelectorAll('[data-set-period]').forEach(b=>{const active=Number(b.dataset.setPeriod)===s.period;b.setAttribute('aria-checked',String(active));b.tabIndex=active?0:-1});
    view.querySelectorAll('[data-set-n]').forEach(b=>{const active=Number(b.dataset.setN)===s.people;b.setAttribute('aria-checked',String(active));b.tabIndex=active?0:-1});
    view.querySelectorAll('[data-plan-price]').forEach(e=>e.textContent=money(monthly(e.dataset.planPrice,s.period)));
    view.querySelectorAll('.simple-people').forEach(e=>e.hidden=s.plan!=='ff');
    view.querySelector('.simple-selected-plan').textContent=s.plan==='ff'?'Together':'Solo';
    view.querySelector('.simple-selected-period').textContent=s.period===1?'1 месец':s.period+' месеца';
    view.querySelector('.simple-total').textContent=money(total);
    view.querySelector('.simple-total-caption').textContent=s.period===1?'общо за 1 месец':'общо за '+s.period+' месеца';
    view.querySelector('.simple-monthly-note').textContent=s.period===1?'Плащане за един месец.':'Плащаш '+s.period+' месеца наведнъж.';
    view.querySelector('.simple-continue').textContent='Избери '+(s.plan==='ff'?'Together':'Solo');
    const share=view.querySelector('.simple-share');
    if(share)share.textContent='По '+money(Math.floor(m/s.people*100+1e-6)/100)+' на човек / месец';
    if(mode==='ve'){
      view.querySelector('.simple-month-price strong').textContent=money(m);
      view.querySelector('.simple-month-price span').textContent=s.plan==='ff'?'за целия план / месец':'за Solo / месец';
      view.querySelector('.simple-plan-explainer').textContent=s.plan==='ff'?'До 5 души. Всеки със свой профил.':'Един профил, само твой.';
    }
    if(mode==='vf'){
      view.querySelector('h3').textContent=s.plan==='ff'?'Разделете си цената.':'Само за теб.';
      view.querySelector('.simple-human-amount strong').textContent=money(s.plan==='ff'?Math.floor(m/s.people*100+1e-6)/100:m);
      view.querySelector('.simple-human-amount > span').textContent=s.plan==='ff'?'на човек / месец':'за Solo / месец';
      view.querySelector('.simple-group-monthly').textContent=s.plan==='ff'?'Общо '+money(m)+' / месец за '+s.people+' души.':'Един профил, само твой.';
      view.querySelector('.simple-count-label').textContent=s.people+' души';
      view.querySelector('[data-step="-1"]').disabled=s.people===2;
      view.querySelector('[data-step="1"]').disabled=s.people===5;
    }
  }
  view.addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    for(const [key,attr]of[['setPlan','data-plan'],['setPeriod','data-period'],['setN','data-n']])if(b.dataset[key])root.querySelector('#p1 .wrap button['+attr+'="'+b.dataset[key]+'"]').click();
    if(b.dataset.step){const n=state().people+Number(b.dataset.step);if(n>=2&&n<=5)root.querySelector('#counts [data-n="'+n+'"]').click()}
    if(b.classList.contains('simple-continue'))root.querySelector('#ctaGo').click();
    update();
  });
  view.addEventListener('keydown',e=>{
    if(!e.target.matches('[role="radio"]')||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
    e.stopImmediatePropagation();e.preventDefault();const bs=[...e.target.parentElement.querySelectorAll('[role="radio"]')];const i=e.key==='Home'?0:e.key==='End'?bs.length-1:(bs.indexOf(e.target)+(['ArrowLeft','ArrowUp'].includes(e.key)?-1:1)+bs.length)%bs.length;bs[i].focus();bs[i].click();
  });
  const observer=new MutationObserver(update);
  ['#planSwitch','#periodSeg','#counts'].forEach(s=>observer.observe(root.querySelector(s),{subtree:true,attributes:true,attributeFilter:['aria-checked']}));
  update();
};
