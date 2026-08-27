/**
 * Click-to-load video facade.
 * Replaces a lightweight poster <button class="video-facade"> with the real
 * Loom iframe only when the visitor chooses to play — keeps ~18MB of player
 * JS/video preloads off the initial page load.
 */
(function () {
  'use strict';

  function activate(btn) {
    var src = btn.getAttribute('data-embed');
    var title = btn.getAttribute('data-title') || 'Video';
    if (!src) return;

    var iframe = document.createElement('iframe');
    iframe.src = src + (src.indexOf('?') === -1 ? '?' : '&') + 'autoplay=1';
    iframe.title = title;
    iframe.setAttribute('allow', 'fullscreen; autoplay');
    iframe.setAttribute('frameborder', '0');
    iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';

    var wrapper = btn.parentNode;
    wrapper.replaceChild(iframe, btn);
    iframe.focus();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.video-facade');
    if (btn) activate(btn);
  });
})();
