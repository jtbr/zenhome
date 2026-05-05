document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.highlight').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<i class="ri-file-copy-line"></i>';
    block.appendChild(btn);

    btn.addEventListener('click', async () => {
      /* Collect from .cl spans to naturally skip hidden .ln number spans.
       * Fall back to <code> text for blocks rendered without line wrappers. */
      const lines = block.querySelectorAll('.cl');
      const text = lines.length
        ? [...lines].map(l => l.textContent).join('')
        : (block.querySelector('code') ?? block.querySelector('pre')).textContent;

      await copyToClipboard(text);
      btn.innerHTML = '<i class="ri-check-line"></i>';
      setTimeout(() => { btn.innerHTML = '<i class="ri-file-copy-line"></i>'; }, 1500);
    });
  });
});
