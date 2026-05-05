document.addEventListener('click', async (e) => {
  const a = e.target.closest('article .anchor-link');
  if (!a) return;
  e.preventDefault();
  const id = a.getAttribute('href').slice(1);
  const url = location.origin + location.pathname + '#' + id;
  await copyToClipboard(url);
  a.innerHTML = '<i class="ri-check-line" aria-hidden="true"></i>';
  setTimeout(() => { a.innerHTML = '<i class="ri-link" aria-hidden="true"></i>'; }, 1500);
});
