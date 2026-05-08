(function () {
  var overlay, imgEl;

  function build() {
    overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Full-size image');
    imgEl = document.createElement('img');
    overlay.appendChild(imgEl);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.getAttribute('aria-hidden') === 'false') close();
    });
  }

  function open(src, alt) {
    if (!overlay) build();
    imgEl.src = src;
    imgEl.alt = alt || '';
    overlay.setAttribute('aria-hidden', 'false');
  }

  function close() {
    overlay.setAttribute('aria-hidden', 'true');
    imgEl.src = '';
  }

  function isLightboxTarget(img) {
    return !!img.closest('figure') ||
           (img.classList.contains('modal-image') && img.style.display !== 'none');
  }

  function isLargerThanDisplayed(img) {
    return img.naturalWidth > img.clientWidth * 1.1 || img.naturalHeight > img.clientHeight * 1.1;
  }

  function updateCursor(img) {
    if (!isLightboxTarget(img)) return;
    img.classList.toggle('zoomable', img.complete && isLargerThanDisplayed(img));
  }

  // Load events don't bubble, so use capture to catch them for any figure/modal img.
  document.addEventListener('load', function (e) {
    if (e.target.tagName === 'IMG') updateCursor(e.target);
  }, true);

  // Handle images already loaded from cache at page load.
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('figure img').forEach(function (img) {
      if (img.complete && img.naturalWidth) updateCursor(img);
    });
  });

  document.addEventListener('click', function (e) {
    if (e.target.tagName !== 'IMG') return;
    var img = e.target;
    if (img.closest('#lightbox')) return;
    if (isLightboxTarget(img) && img.naturalWidth && isLargerThanDisplayed(img)) {
      e.stopPropagation();
      open(img.src, img.alt);
    }
  });
})();
