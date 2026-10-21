/* 16.10 (Коста): в цените 4-5 px между секциите, без сивия фон */
(function(){var h=document.getElementById('pzx');if(!h)return;var n=0;
 (function t(){var r=h.shadowRoot;if(!r){if(n++<60)return setTimeout(t,100);return}
  if(r.getElementById('pzfix'))return;var s=document.createElement('style');s.id='pzfix';
  s.textContent='.wrap{gap:5px!important}.tz{margin-top:5px!important;border-radius:14px!important}.plan-card,#planCard{border-radius:14px!important}.household{border-radius:14px!important;margin-top:5px!important}.left-bg{display:none!important}.panel,.stage,.app{background:transparent!important}';
  r.appendChild(s)})();
})();
