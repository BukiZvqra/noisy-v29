(function(){
 if(!matchMedia('(hover:hover) and (pointer:fine)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 /* 16.10 (Коста): бутоните не бягат при хавър - магнитният ефект е махнат */
 /* сияние в героя, което следва мишката */
 var gl=document.querySelector('.nhero .nglow');if(gl){addEventListener('mousemove',function(e){gl.style.transform='translate('+((e.clientX/innerWidth-.5)*60).toFixed(1)+'px,'+((e.clientY/innerHeight-.5)*40).toFixed(1)+'px)'},{passive:true})}
})();
