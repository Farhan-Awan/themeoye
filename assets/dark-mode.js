// Themeoye Dark Mode Toggle
// Handles system preference, toggle, and localStorage
class DarkModeToggle {
  constructor() {
    this.html = document.documentElement;
    this.storageKey = 'themeoye-color-scheme';
    this.defaultScheme = this.html.dataset.theme;
    this.init();
  }
  init() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.html.dataset.theme = saved;
    } else if (this.defaultScheme === 'system') {
      this.applySystem();
    }
    this.bindToggle();
  }
  applySystem() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.html.dataset.theme = prefersDark ? 'dark' : 'light';
  }
  bindToggle() {
    document.querySelectorAll('[data-dark-mode-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const current = this.html.dataset.theme;
        const next = current === 'dark' ? 'light' : 'dark';
        this.html.dataset.theme = next;
        localStorage.setItem(this.storageKey, next);
      });
    });
  }
}
new DarkModeToggle();
