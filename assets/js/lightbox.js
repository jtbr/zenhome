(function () {
  var overlay, stageEl, imgEl;
  var state = 'closed'; // 'fill' | 'zoom'
  var canZoom = false;
  var panX = 0, panY = 0;
  var dragStart = null, dragMoved = false;
  var activePointerId = null;

  function build() {
    overlay = document.createElement('div');
    overlay.id = 'lightbox';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Full-size image');

    // stageEl is the clipping boundary — overflow:hidden here clips at the
    // padded content area rather than at the full viewport edge.
    stageEl = document.createElement('div');
    stageEl.className = 'lightbox-stage';

    imgEl = document.createElement('img');
    // Prevent native image drag-and-drop, which otherwise hijacks the pointer
    // mid-pan (browser starts a drag op after ~250ms of hold).
    imgEl.draggable = false;
    stageEl.appendChild(imgEl);
    overlay.appendChild(stageEl);
    document.body.appendChild(overlay);

    // Clicking the backdrop (overlay padding area or stage empty area) closes.
    overlay.addEventListener('click', function (e) {
      if (dragMoved) { dragMoved = false; return; }
      if (e.target === overlay || e.target === stageEl) close();
    });

    imgEl.addEventListener('click', function (e) {
      e.stopPropagation();
      if (dragMoved) { dragMoved = false; return; }
      if (state === 'fill') {
        if (canZoom) enterZoom(); else close();
      } else if (state === 'zoom') {
        enterFill();
      }
    });

    // Drag starts on the image; move/up tracked on the stage so the full
    // clipping area is the drag surface.
    imgEl.addEventListener('pointerdown', startDrag);
    stageEl.addEventListener('pointermove', moveDrag);
    stageEl.addEventListener('pointerup', endDrag);
    stageEl.addEventListener('pointercancel', endDrag);

    document.addEventListener('keydown', function (e) {
      if (overlay.getAttribute('aria-hidden') === 'true') return;
      if (e.key === 'Escape') close();
    });
  }

  function startDrag(e) {
    if (state !== 'zoom' || activePointerId !== null) return;
    e.preventDefault();
    activePointerId = e.pointerId;
    // Capture so pointermove/up keep firing even as the image translates out
    // from under the cursor or the cursor leaves the stage.
    imgEl.setPointerCapture(e.pointerId);
    dragStart = { x: e.clientX, y: e.clientY, panX: panX, panY: panY };
    dragMoved = false;
    imgEl.classList.add('is-grabbing');
  }

  function moveDrag(e) {
    if (!dragStart || e.pointerId !== activePointerId) return;
    var dx = e.clientX - dragStart.x;
    var dy = e.clientY - dragStart.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved = true;
    panX = dragStart.panX + dx;
    panY = dragStart.panY + dy;
    imgEl.style.transform = 'translate(' + panX + 'px, ' + panY + 'px)';
  }

  function endDrag(e) {
    if (e.pointerId !== activePointerId) return;
    if (imgEl.hasPointerCapture(e.pointerId)) imgEl.releasePointerCapture(e.pointerId);
    activePointerId = null;
    dragStart = null;
    imgEl.classList.remove('is-grabbing');
    // dragMoved left true so the click that always follows pointerup is ignored.
  }

  function checkCanZoom() {
    // clientWidth/Height are valid only once the overlay is visible and laid out.
    canZoom = imgEl.naturalWidth  > imgEl.clientWidth  * 1.01 ||
              imgEl.naturalHeight > imgEl.clientHeight * 1.01;
    imgEl.classList.toggle('can-zoom', canZoom);
  }

  function enterFill() {
    state = 'fill';
    panX = 0; panY = 0;
    imgEl.style.transform = '';
    overlay.classList.remove('is-zoomed');
    requestAnimationFrame(checkCanZoom);
  }

  function enterZoom() {
    state = 'zoom';
    panX = 0; panY = 0;
    imgEl.style.transform = '';
    overlay.classList.add('is-zoomed');
  }

  function open(src, alt) {
    if (!overlay) build();
    state = 'fill';
    canZoom = false;
    dragMoved = false;
    activePointerId = null;
    panX = 0; panY = 0;
    imgEl.style.transform = '';
    imgEl.classList.remove('can-zoom', 'is-grabbing');
    overlay.classList.remove('is-zoomed');
    imgEl.src = src;
    imgEl.alt = alt || '';
    // Overlay must be visible before checkCanZoom reads clientWidth/Height.
    overlay.setAttribute('aria-hidden', 'false');
    function scheduleCheck() { requestAnimationFrame(checkCanZoom); }
    if (imgEl.complete && imgEl.naturalWidth) {
      scheduleCheck();
    } else {
      imgEl.addEventListener('load', scheduleCheck, { once: true });
    }
  }

  function close() {
    state = 'closed';
    activePointerId = null;
    dragMoved = false;
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.remove('is-zoomed');
    imgEl.style.transform = '';
    imgEl.src = '';
  }

  /* ── Cursor management ─────────────────────────────────────────── */

  function isLightboxTarget(img) {
    return !!img.closest('figure') ||
           (img.classList.contains('modal-image') && img.style.display !== 'none');
  }

  function isLargerThanDisplayed(img) {
    return img.naturalWidth  > img.clientWidth  * 1.1 ||
           img.naturalHeight > img.clientHeight * 1.1;
  }

  function updateCursor(img) {
    if (!isLightboxTarget(img)) return;
    img.classList.toggle('zoomable', img.complete && isLargerThanDisplayed(img));
  }

  // Load events don't bubble — use capture to catch them for figure/modal images.
  document.addEventListener('load', function (e) {
    if (e.target.tagName === 'IMG') updateCursor(e.target);
  }, true);

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('figure img').forEach(function (img) {
      if (img.complete && img.naturalWidth) updateCursor(img);
    });
  });

  /* ── Open on click ─────────────────────────────────────────────── */

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
