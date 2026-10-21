/* Choose a supported encoding before the carousel loads its lazy video. */
(()=>{
 document.querySelectorAll('video[data-webm]').forEach(video=>{
  if(!video.canPlayType('video/mp4; codecs="avc1.42E01E"'))video.dataset.src=video.dataset.webm;
 });
})();

