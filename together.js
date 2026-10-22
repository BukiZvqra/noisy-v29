/* NOISY Together: аватарите изскачат и „пръскат“ (по NYT), чекаут на 3 стъпки (демо, без плащане) */
(function(){
  var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var eur=function(x){return (Math.floor(x*100+1e-6)/100).toFixed(2).replace('.',',')+' €'};
  var COL=['#B61DFF','#CE13A8','#FF0000','#C9B6FF','#FFC2D4','#FFD9A8','#B7E3DA'];

  /* пръскане: при кацането на всеки аватар излитат малки точки и чертички в цветовете на бранда */
  function splash(av){
    if(rm)return;
    [].forEach.call(av.querySelectorAll('.av-i'),function(a){
      var d=+getComputedStyle(a).getPropertyValue('--d')||0,t=d*140+150+420;
      setTimeout(function(){var n=a.parentElement===av&&a.style.zIndex?14:10,big=a===av.children[2];
        for(var k=0;k<(big?16:10);k++){var s=document.createElement('i');s.className='sp'+(k%3===0?' l':'');
          var r=(360/(big?16:10))*k+Math.random()*16;s.style.setProperty('--r',r+'deg');s.style.setProperty('--dist',(big?80:58)+Math.random()*28+'px');
          s.style.setProperty('--c',COL[(k+d)%COL.length]);s.style.setProperty('--s',(k%3===0?10+Math.random()*8:4+Math.random()*5)+'px');
          s.style.left=(a.offsetLeft+a.offsetWidth/2)+'px';s.style.top=(a.offsetTop+a.offsetHeight/2)+'px';
          av.appendChild(s);void s.offsetWidth;s.classList.add('go');setTimeout(function(x){return function(){x.remove()}}(s),900)}},t);
    });
  }
  function play(av){av.classList.remove('go');void av.offsetWidth;av.classList.add('go');splash(av)}
  [].forEach.call(document.querySelectorAll('[data-av]'),function(av){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){play(av);io.disconnect()}})},{threshold:.5});io.observe(av);
    av.style.cursor='pointer';av.addEventListener('click',function(){play(av)});
  });

  /* чекаут */
  var co=document.getElementById('co');if(!co)return;
  var steps=[].slice.call(co.querySelectorAll('.co-s')),bars=[].slice.call(co.querySelectorAll('.co-st i')),nx=co.querySelector('[data-co-next]'),bk=co.querySelector('[data-co-back]'),
      cur=1,last=null,P={tog:24.90,solo:14.90},D={1:0,3:.10,12:.15},AD={sport:13.14,films:6.84},ADN={sport:'Arena Premium',films:'Premium Films'};
  function st(){var pl=co.querySelector('input[name=pl]:checked').value,per=+co.querySelector('input[name=per]:checked').value;return{pl:pl,per:per}}
  function prices(){var s=st(),b=P[s.pl];[1,3,12].forEach(function(m){var mo=Math.floor(b*(1-D[m])*100+1e-6)/100;co.querySelector('[data-pm="'+m+'"]').textContent=eur(mo);
      var t=co.querySelector('[data-pt="'+m+'"]');if(t)t.textContent=eur(mo*m)+(m===12?' на година':' на всеки 3 месеца')})}
  function inv(){return [].filter.call(co.querySelectorAll('.inv input'),function(i){return /.+@.+\..+/.test(i.value)}).length}
  function ads(){return [].filter.call(co.querySelectorAll('input[name=ad]'),function(i){return i.checked}).map(function(i){return i.value})}
  function summary(){var s=st(),mo=Math.floor(P[s.pl]*(1-D[s.per])*100+1e-6)/100,a=ads();a.forEach(function(k){mo+=AD[k]});mo=Math.round(mo*100)/100;var sa=co.querySelector('[data-sum-ad]');if(sa)sa.textContent=a.length?a.map(function(k){return ADN[k]}).join(', '):'няма';
    co.querySelector('[data-sum-pl]').textContent=s.pl==='tog'?'Together':'Solo';
    co.querySelector('[data-sum-per]').textContent=s.per===1?'всеки месец':s.per===3?'на 3 месеца':'на 12 месеца';
    co.querySelector('[data-sum-inv]').textContent=s.pl==='tog'?inv()+(inv()===1?' човек':' души'):'няма';
    co.querySelector('[data-sum-tot]').textContent=eur(mo*s.per)}
  function show(n){var s=st();if(n===2&&s.pl==='solo')n=cur<2?3:1;cur=n;
    steps.forEach(function(x){x.classList.toggle('on',+x.dataset.s===n)});bars.forEach(function(b,k){b.classList.toggle('on',k<Math.min(n,3))});
    bk.hidden=n===1||n===4;nx.textContent=n===3?'Абонирай се (демо)':n===4?'Готово':'Продължи';
    if(n===3)summary();if(n===4){var a=co.querySelector('[data-av2]');if(a)play(a)}
    co.querySelector('.co-p').scrollTop=0}
  function open(pl,btn,ad){last=btn;if(!co.parentElement.classList.contains('tgx-co')){var w=document.createElement('div');w.className='tgx tgx-co';document.body.appendChild(w);w.appendChild(co)}[].forEach.call(co.querySelectorAll('input[name=ad]'),function(i){i.checked=i.value===ad});co.hidden=false;void co.offsetWidth;co.classList.add('on');co.querySelector('input[name=pl][value='+pl+']').checked=true;prices();show(1);
    document.documentElement.style.overflow='hidden';setTimeout(function(){co.querySelector('.co-x').focus()},60)}
  function close(){co.classList.remove('on');document.documentElement.style.overflow='';setTimeout(function(){co.hidden=true},450);if(last)last.focus()}
  window.noisyCO=open;
  [].forEach.call(document.querySelectorAll('[data-co]'),function(b){b.addEventListener('click',function(){open(b.dataset.co,b)})});
  [].forEach.call(co.querySelectorAll('[data-co-x]'),function(b){b.addEventListener('click',close)});
  co.addEventListener('keydown',function(e){if(e.key==='Escape')close();
    if(e.key==='Tab'){var f=[].filter.call(co.querySelectorAll('button,input,a'),function(x){return x.offsetParent&&!x.hidden});if(!f.length)return;var a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}});
  co.addEventListener('change',function(e){if(e.target.name==='pl')prices()});
  nx.addEventListener('click',function(){if(cur===4){close();return}show(cur+1)});
  bk.addEventListener('click',function(){var s=st();show(cur===3&&s.pl==='solo'?1:cur-1)});
})();
