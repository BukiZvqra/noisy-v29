/* Страниците за избор: истинската главна на v21 в рамка, вариантът се сменя с ?fx= / ?rows= */
(function(){
 var V=window.V,bar=document.querySelector('.vs'),desc=document.querySelector('.vd'),fr=document.querySelector('iframe');
 var cur=(new URLSearchParams(location.search).get('v')||V.def).toUpperCase();
 if(!V.items.some(function(x){return x[0]===cur}))cur=V.def;
 V.items.forEach(function(x){var b=document.createElement('button');b.type='button';b.setAttribute('role','tab');b.dataset.v=x[0];
  b.innerHTML=(x[0]==='0'?'':x[0]+' · ')+x[1]+(x[3]?' <i>Препоръка</i>':'');b.addEventListener('click',function(){go(x[0])});bar.appendChild(b)});
 var full=document.createElement('a');full.className='full';full.target='_blank';full.rel='noopener';full.textContent='Отвори на цял екран ↗';bar.appendChild(full);
 function url(v){return 'index.html?'+V.param+'='+v}
 function go(v){cur=v;[].forEach.call(bar.querySelectorAll('button'),function(b){b.setAttribute('aria-selected',b.dataset.v===v)});
  var it=V.items.filter(function(x){return x[0]===v})[0];desc.textContent=it[2];full.href=url(v);
  history.replaceState(null,'','?v='+v);fr.src=url(v)}
 /* за редовете: превърти вътре до тях, след като N се разгъне */
 fr.addEventListener('load',function(){var w=fr.contentWindow,d=fr.contentDocument;if(!d)return;
  var sk=d.getElementById('skip');if(sk)sk.click();if(V.scroll!=='rows')return;var y=0,t=0;
  /* редовете са в закрепената сцена: в края ѝ са на мястото си */
  function to(){var sc=d.querySelector('.ag-scene');if(!sc)return;w.scrollTo(0,Math.max(0,sc.getBoundingClientRect().bottom+w.scrollY-w.innerHeight-4))}
  setTimeout(to,300);setTimeout(to,1200)});
 go(cur);
})();
