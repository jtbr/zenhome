(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var icon = btn.querySelector('i');

  function rerenderTweets(theme) {
    if (!window.twttr || !window.twttr.widgets) return;
    document.querySelectorAll('.tweet-embed[data-tweet-id]').forEach(function (wrapper) {
      wrapper.innerHTML = '';
      window.twttr.widgets.createTweet(wrapper.dataset.tweetId, wrapper, {
        theme: theme,
        dnt: true,
      });
    });
  }

  function apply(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    if (icon) {
      icon.classList.toggle('fa-moon', t === 'light');
      icon.classList.toggle('fa-sun',  t === 'dark');
    }
    btn.title = t === 'light' ? 'dark mode' : 'light mode';
    btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    rerenderTweets(t);
  }

  apply(document.documentElement.getAttribute('data-theme') || 'light');

  btn.addEventListener('click', function () {
    apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
})();
