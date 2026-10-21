(() => {
  const sheet = document.getElementById('su');
  if (sheet) {
    let wasOpen = false;
    const sync = () => {
      const open = sheet.classList.contains('on');
      sheet.setAttribute('aria-hidden', String(!open));
      document.querySelectorAll('main,.hdr,.mobile-worlds,.fab').forEach(e => e.inert = open);
      if (!open && wasOpen && (document.activeElement === document.body || sheet.contains(document.activeElement))) {
        document.querySelector('#heroCta [data-su], header [data-su], main [data-su]')?.focus({preventScroll:true});
      }
      wasOpen = open; document.dispatchEvent(new CustomEvent('signupstate',{detail:open}));
    };
    new MutationObserver(sync).observe(sheet,{attributes:true,attributeFilter:['class']});
    document.addEventListener('keydown', e => {
      if (e.key !== 'Tab' || !sheet.classList.contains('on')) return;
      const controls = [...sheet.querySelectorAll('button,a,input')].filter(e => e.getBoundingClientRect().height > 0 && getComputedStyle(e).visibility !== 'hidden');
      if (!controls.length) return;
      const first=controls[0],last=controls.at(-1);
      if(e.shiftKey && document.activeElement===first){e.preventDefault();last.focus();}
      if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    });
    sync();
  }
  const current=location.pathname.split('/').at(-1)?.replace('.html','');
  document.querySelectorAll('.mobile-worlds a').forEach(a=>{if(a.getAttribute('href')===current+'.html')a.setAttribute('aria-current','page');});
})();
