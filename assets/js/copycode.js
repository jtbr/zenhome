document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.highlight').forEach(block => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code');
    btn.innerHTML = '<i class="ri-file-copy-line"></i>';
    block.appendChild(btn);

    btn.addEventListener('click', async () => {
      /* Gist embeds use .js-file-line table cells.
       * Hugo highlights use .cl spans to naturally skip hidden .ln number spans.
       * Fall back to <code> text for blocks rendered without line wrappers. */
      const gistLines = block.querySelectorAll('.js-file-line');
      const clLines   = block.querySelectorAll('.cl');
      const text = gistLines.length
        ? [...gistLines].map(l => l.textContent).join('\n')
        : clLines.length
          ? [...clLines].map(l => l.textContent).join('')
          : (block.querySelector('code') ?? block.querySelector('pre')).textContent;

      await copyToClipboard(text);
      btn.innerHTML = '<i class="ri-check-line"></i>';
      setTimeout(() => { btn.innerHTML = '<i class="ri-file-copy-line"></i>'; }, 1500);
    });
  });
});
