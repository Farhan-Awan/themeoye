// Themeoye Global JS Utilities
// - Debounce, trapFocus, scrollLock, helpers

window.themeoye = window.themeoye || {};

// Debounce
window.themeoye.debounce = function (fn, wait = 200) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), wait);
  };
};

// Trap focus in modal/dialog
window.themeoye.trapFocus = function (element) {
  const focusable = element.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  element.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
};

// Scroll lock (for modals/drawers)
window.themeoye.scrollLock = {
  lock() {
    document.body.style.overflow = 'hidden';
  },
  unlock() {
    document.body.style.overflow = '';
  }
};

// Helper: get current theme mode
window.themeoye.getThemeMode = function () {
  return document.documentElement.dataset.theme;
};

// Helper: set theme mode
window.themeoye.setThemeMode = function (mode) {
  document.documentElement.dataset.theme = mode;
  localStorage.setItem('themeoye-color-scheme', mode);
};
