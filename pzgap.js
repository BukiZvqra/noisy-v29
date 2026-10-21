/* 20.10 (Коста): блокът с добавките започваше 9 px НАД долния край на картата Solo/Together и тъмният му фон скриваше долната рамка и ъглите; затворената „домакинство“ лента вече не се тегли нагоре */
/* 19.10 (Коста): в цените между „Избери абонаментен план“, Solo/Together и лилавата карта има 16 px (общият ред остава 5 px) */
(function(){var h=document.getElementById('pzx');if(!h)return;var n=0;
 (function t(){var r=h.shadowRoot;if(!r){if(n++<60)return setTimeout(t,100);return}
  if(r.getElementById('pzgap'))return;var s=document.createElement('style');s.id='pzgap';
  s.textContent='#t-plan{margin-bottom:11px!important}#planSwitch{margin-bottom:11px!important}.panel{padding-bottom:0!important}.household{margin-top:9px!important}#hhWrap.is-closed{margin-top:0!important}';
  r.appendChild(s)})();
})();
