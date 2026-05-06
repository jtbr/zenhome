document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.share-btn');
  if (!btn) return;

  // Native share sheet only on touch/mobile where it opens the OS UI.
  // Desktop implementations (Firefox, Chrome) are inconsistent, just copy to clipboard
  if (navigator.share && window.matchMedia('(pointer: coarse)').matches) {
    try {
      await navigator.share({ title: document.title, url: location.href });
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;
    }
  }

  await copyToClipboard(location.href);
  btn.innerHTML = '<i class="ri-check-line" aria-hidden="true"></i>';
  setTimeout(() => { btn.innerHTML = '<i class="ri-share-2-line" aria-hidden="true"></i>'; }, 1500);
});
