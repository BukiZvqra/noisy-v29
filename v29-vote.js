/* varianti.html: гласуване - харесва/не харесва за всеки вариант, пази се в този браузър; „Моят избор“ се копира за групата */
(function(){
  var K='noisy-v29-votes',N='noisy-v29-name',V={};
  try{V=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
  function save(){try{localStorage.setItem(K,JSON.stringify(V))}catch(e){}}
  var UP='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 7v7H2.5V7zM5 7l3-5c1.2 0 1.8.8 1.6 2L9.2 6H13a1.3 1.3 0 0 1 1.3 1.5l-.9 5.3A1.5 1.5 0 0 1 11.9 14H5"/></svg>';
  var DN='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M11 9V2h2.5v7zM11 9l-3 5c-1.2 0-1.8-.8-1.6-2L6.8 10H3a1.3 1.3 0 0 1-1.3-1.5l.9-5.3A1.5 1.5 0 0 1 4.1 2H11"/></svg>';
  var secs=[].slice.call(document.querySelectorAll('.vsec'));
  function cur(sec){var b=sec.querySelector('.vtabs button.on');return b?b.dataset.v:'A'}
  function desc(sec,c){var n=sec.querySelector('.vnote[data-v="'+c+'"]');return n?n.textContent.replace(/^\w\.\s*/,'').trim():''}
  function title(sec){return sec.querySelector('.vhead h2').textContent.trim()}
  function paint(sec){var s=V[sec.id]||{};[].forEach.call(sec.querySelectorAll('.vtabs button'),function(b){var v=s[b.dataset.v];b.classList.toggle('up',v===1);b.classList.toggle('down',v===-1);b.title=v===1?'Харесва ми':v===-1?'Не ми харесва':''});
    var c=cur(sec),v=s[c],bar=sec.querySelector('.vbar');bar.querySelector('.vu').classList.toggle('on',v===1);bar.querySelector('.vd').classList.toggle('on',v===-1);
    var up=0,dn=0;for(var k in s){if(s[k]===1)up++;if(s[k]===-1)dn++}var all=sec.querySelectorAll('.vtabs button').length;
    bar.querySelector('.vstat').textContent='Вариант '+c+' · харесани '+up+', отхвърлени '+dn+', неоценени '+(all-up-dn);count()}
  secs.forEach(function(sec){
    var bar=document.createElement('div');bar.className='vbar';
    bar.innerHTML='<button type="button" class="vu">'+UP+'Харесва ми</button><button type="button" class="vd">'+DN+'Не ми харесва</button><span class="vstat"></span>';
    var notes=sec.querySelectorAll('.vnote');notes[notes.length-1].after(bar);
    function vote(x){var c=cur(sec);V[sec.id]=V[sec.id]||{};if(V[sec.id][c]===x)delete V[sec.id][c];else V[sec.id][c]=x;save();paint(sec);
      if(x===-1&&document.body.classList.contains('hide-down')){var nx=[].filter.call(sec.querySelectorAll('.vtabs button'),function(b){return !b.classList.contains('down')})[0];if(nx)nx.click()}}
    bar.querySelector('.vu').addEventListener('click',function(){vote(1)});bar.querySelector('.vd').addEventListener('click',function(){vote(-1)});
    sec.querySelector('.vtabs').addEventListener('click',function(){setTimeout(function(){paint(sec)},0)});
    paint(sec);
  });
  /* горе: скрий отхвърлените + моят избор */
  var top=document.querySelector('.vtop nav'),tools=document.createElement('div');tools.className='vtools';
  tools.innerHTML='<button type="button" data-hd>Скрий отхвърлените</button><button type="button" data-my>Моят избор<b data-n>0</b></button>';
  top.parentNode.insertBefore(tools,top);
  var hd=tools.querySelector('[data-hd]');hd.addEventListener('click',function(){var on=document.body.classList.toggle('hide-down');hd.classList.toggle('on',on);hd.textContent=on?'Покажи всички':'Скрий отхвърлените'});
  var pan=document.createElement('div');pan.className='vpan';pan.hidden=true;pan.setAttribute('role','dialog');pan.setAttribute('aria-label','Моят избор');document.body.appendChild(pan);
  function count(){var n=0;for(var s in V)for(var c in V[s])n++;var b=document.querySelector('[data-n]');if(b)b.textContent=n}
  function text(){var name='';try{name=localStorage.getItem(N)||''}catch(e){}var L=['NOISY v29 варианти - '+(name||'оценка'),location.href.split('#')[0]];
    secs.forEach(function(sec){var s=V[sec.id]||{},u=[],d=[];for(var c in s)(s[c]===1?u:d).push(c);u.sort();d.sort();
      L.push('','■ '+title(sec));L.push('Харесвам: '+(u.length?u.map(function(c){return c+' ('+desc(sec,c).slice(0,60)+')'}).join('; '):'-'));L.push('Не: '+(d.length?d.join(', '):'-'))});return L.join('\n')}
  function render(){var name='';try{name=localStorage.getItem(N)||''}catch(e){}
    var h='<h3>Моят избор</h3><p>Пази се в този браузър. Копирай го и го прати в групата, за да съберем оценките.</p><label>Име<input type="text" data-nm value="'+name.replace(/"/g,'&quot;')+'" placeholder="напр. Лили"></label>';
    secs.forEach(function(sec){var s=V[sec.id]||{},u=[],d=[];for(var c in s)(s[c]===1?u:d).push(c);u.sort();d.sort();h+='<h4>'+title(sec)+'</h4>';
      if(!u.length&&!d.length){h+='<p class="vem">Още нищо оценено.</p>';return}
      h+='<ul>'+u.map(function(c){return '<li class="up"><a href="#'+sec.id+'-'+c.toLowerCase()+'"><b>'+c+' ✓</b>'+desc(sec,c)+'</a></li>'}).join('')+d.map(function(c){return '<li class="down"><a href="#'+sec.id+'-'+c.toLowerCase()+'"><b>'+c+' ✕</b>'+desc(sec,c)+'</a></li>'}).join('')+'</ul>'});
    h+='<div class="vact"><button type="button" data-cp>Копирай за групата</button><button type="button" class="sec" data-rs>Изчисти</button><button type="button" class="sec" data-cl>Затвори</button></div>';
    pan.innerHTML=h;
    pan.querySelector('[data-nm]').addEventListener('input',function(e){try{localStorage.setItem(N,e.target.value)}catch(x){}});
    pan.querySelector('[data-cp]').addEventListener('click',function(e){var t=text(),b=e.target;(navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){b.textContent='Копирано ✓'},function(){var ta=document.createElement('textarea');ta.value=t;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');b.textContent='Копирано ✓'}catch(x){}ta.remove()});setTimeout(function(){b.textContent='Копирай за групата'},2000)});
    pan.querySelector('[data-rs]').addEventListener('click',function(){if(!confirm('Да изчистя всички оценки в този браузър?'))return;V={};save();secs.forEach(paint);render()});
    pan.querySelector('[data-cl]').addEventListener('click',function(){pan.hidden=true;my.classList.remove('on')});
    [].forEach.call(pan.querySelectorAll('li a'),function(a){a.addEventListener('click',function(){var m=a.getAttribute('href').match(/^#(\w+)-(\w)$/),sec=document.getElementById(m[1]);var b=sec.querySelector('.vtabs button[data-v="'+m[2].toUpperCase()+'"]');if(b)b.click()})})}
  var my=tools.querySelector('[data-my]');my.addEventListener('click',function(){pan.hidden=!pan.hidden;my.classList.toggle('on',!pan.hidden);if(!pan.hidden)render()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!pan.hidden){pan.hidden=true;my.classList.remove('on')}});
  count();
})();
