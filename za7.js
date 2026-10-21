/* „За нас“ v7: табовете в „Технологично развитие“, появяване при скрол, логото при скрол */
(function(){
 var tabs=[].slice.call(document.querySelectorAll('.a7-tab')),panes=[].slice.call(document.querySelectorAll('.a7-pane'));
 tabs.forEach(function(t){t.addEventListener('click',function(){tabs.forEach(function(x){var on=x===t;x.classList.toggle('on',on);x.setAttribute('aria-selected',on)});panes.forEach(function(p){p.classList.toggle('on',p.dataset.t===t.dataset.t)})})});
 var mg=document.querySelector('.a7-mods');if(mg)mg.classList.add('ap');var els=[].slice.call(document.querySelectorAll('.ap'));
 if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)els.forEach(function(e){e.classList.add('in')});
 else{var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -8% 0px'});els.forEach(function(e){io.observe(e)})}
 var hd=document.querySelector('.hdr'),pr=document.getElementById('prog'),mn=false;
 addEventListener('scroll',function(){var m=scrollY>40;if(hd&&m!==mn){mn=m;hd.classList.toggle('mini',m)}if(pr){var h=document.documentElement.scrollHeight-innerHeight;pr.style.width=(h>0?scrollY/h*100:0)+'%'}},{passive:true});
})();
/* въпросите: отваря се по един */
(function(){var qs=[].slice.call(document.querySelectorAll('.nq'));qs.forEach(function(q){var b=q.querySelector('.nq-b');if(!b)return;b.addEventListener('click',function(){var on=!q.classList.contains('open');qs.forEach(function(o){o.classList.remove('open');o.querySelector('.nq-b').setAttribute('aria-expanded','false')});if(on){q.classList.add('open');b.setAttribute('aria-expanded','true')}})})})();
