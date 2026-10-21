/* вход в страницата като във v20: малка карта с бяла рамка и лого расте до целия екран, после влиза текстът */
(function(){
 if(scrollY>40||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var ar=/arena/.test(location.pathname),vid=ar?'vid/ar/trailer.mp4':'vid/th/trailer.mp4',pst=ar?'vid/ar/trailer.jpg':'vid/th/trailer.jpg',badge=ar?'assets/Arena.svg':'assets/Theatre.svg';
 var o=document.createElement('div');o.className='k26o';
 o.innerHTML='<div class="op"><video muted loop playsinline autoplay preload="auto" src="'+vid+'" poster="'+pst+'"></video></div>';
 document.body.appendChild(o);document.documentElement.classList.add('k26-intro');
 setTimeout(function(){o.classList.add('out')},1900);
 setTimeout(function(){o.remove();document.documentElement.classList.remove('k26-intro')},2700);
})();
