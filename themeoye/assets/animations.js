// Themeoye Animations.js
// Intersection Observer scroll animations
(function () {
  const animateEls = document.querySelectorAll('[data-animate]');
  if (!('IntersectionObserver' in window) || animateEls.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  animateEls.forEach(el => {
    observer.observe(el);
  });
})();
