/* само видеото на текущата карта се плейва, останалите са статични */
(function(){var f=document.getElementById('frame');if(!f)return;
 function sync(){f.querySelectorAll('.ag-slide').forEach(function(s){var on=s.classList.contains('is-current');s.querySelectorAll('video').forEach(function(v){if(on){var p=v.play();if(p&&p.catch)p.catch(function(){})}else if(!v.paused){v.pause()}})})}
 new MutationObserver(sync).observe(f,{subtree:true,attributes:true,attributeFilter:['class']});
 f.querySelectorAll('video').forEach(function(v){v.addEventListener('play',function(){var s=v.closest('.ag-slide');if(s&&!s.classList.contains('is-current'))v.pause()})});
 sync();setInterval(sync,1500);
})();
