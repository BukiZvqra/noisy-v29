/* варианти за края на Theatre/Arena: превключвател Arena/Theatre, видео в банера, сметката план + добавка */
(function(){
  var eur=function(x){return x.toFixed(2).replace('.',',')+' €'};
  [].forEach.call(document.querySelectorAll('.ad'),function(s){
    var bs=[].slice.call(s.querySelectorAll('.ad-sw button')),ms=[].slice.call(s.querySelectorAll('.ad-m'));
    function vids(){ms.forEach(function(m){[].forEach.call(m.querySelectorAll('.adn video'),function(v){if(m.classList.contains('on')&&s.offsetParent){if(!v.src)v.src=v.dataset.tv;v.play().catch(function(){})}else v.pause()})})}
    bs.forEach(function(b){b.addEventListener('click',function(){bs.forEach(function(x){x.classList.toggle('on',x===b)});ms.forEach(function(m){m.classList.toggle('on',m.dataset.m===b.dataset.m)});vids()})});
    new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)vids();else ms.forEach(function(m){[].forEach.call(m.querySelectorAll('video'),function(v){v.pause()})})})},{threshold:.2}).observe(s);
  });
  [].forEach.call(document.querySelectorAll('[data-ado]'),function(c){
    var add=+c.dataset.add,bs=[].slice.call(c.querySelectorAll('.ado-psw button')),pl=c.querySelector('[data-ado-pl]'),pp=c.querySelector('[data-ado-pp]'),t=c.querySelector('[data-ado-t]');
    function set(b){bs.forEach(function(x){x.classList.toggle('on',x===b)});var p=+b.dataset.p;pl.textContent=b.textContent;pp.textContent=eur(p);t.textContent=eur(Math.round((p+add)*100)/100)}
    bs.forEach(function(b){b.addEventListener('click',function(){set(b)})});set(c.querySelector('.ado-psw button.on'));
  });
})();
