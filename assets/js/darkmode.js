(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var icon = btn.querySelector('i');

  function apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (icon) {
      icon.classList.toggle('fa-moon', t === 'light');
      icon.classList.toggle('fa-sun',  t === 'dark');
    }
  }

  /* Sync icon with whatever the inline script already applied. */
  apply(document.documentElement.getAttribute('data-theme') || 'light');

  btn.addEventListener('click', function () {
    apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();
