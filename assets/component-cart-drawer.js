/**
 * Themeoye - Cart Drawer Custom Element
 * Reactive slide-out cart container utilizing the Shopify Section Rendering API.
 */
if (!customElements.get('cart-drawer')) {
  class CartDrawer extends HTMLElement {
    constructor() {
      super();
      
      this.addEventListener('click', (event) => {
        if (event.target === this) this.close();
      });

      this.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') this.close();
      });

      this.setupDOM();
    }

    setupDOM() {
      this.closeButton = this.querySelector('.drawer__close-btn');
      this.itemsContainer = this.querySelector('.drawer__content');
      
      // Bind event listeners for quantity modifications and removals
      this.addEventListener('change', this.onInputChange.bind(this));
      this.addEventListener('click', this.onRemoveItemClick.bind(this));
    }

    open() {
      this.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      
      // Trap focus
      if (typeof window.themeoye.trapFocus === 'function') {
        window.themeoye.trapFocus(this);
      }
    }

    close() {
      this.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    onInputChange(event) {
      if (!event.target.classList.contains('quantity-selector__input')) return;
      
      const lineItemRow = event.target.closest('[data-line-item-key]');
      if (!lineItemRow) return;

      const quantity = parseInt(event.target.value, 10);
      const lineKey = lineItemRow.dataset.lineItemKey;

      this.updateQuantity(lineKey, quantity);
    }

    onRemoveItemClick(event) {
      if (!event.target.classList.contains('drawer__item-remove')) return;
      event.preventDefault();

      const lineItemRow = event.target.closest('[data-line-item-key]');
      if (!lineItemRow) return;

      const lineKey = lineItemRow.dataset.lineItemKey;
      this.updateQuantity(lineKey, 0);
    }

    updateQuantity(lineKey, quantity) {
      this.setLoadingState(true);

      const body = JSON.stringify({
        id: lineKey,
        quantity: quantity,
        sections: 'cart-drawer',
        sections_url: window.location.pathname
      });

      fetch(`${window.Shopify.routes.root}cart/change.js`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body
      })
      .then(response => response.json())
      .then(state => {
        if (state.sections && state.sections['cart-drawer']) {
          this.renderSection(state.sections['cart-drawer']);
        } else {
          this.refresh();
        }
      })
      .catch(error => {
        console.error('Cart mutation error:', error);
      })
      .finally(() => {
        this.setLoadingState(false);
      });
    }

    refresh() {
      fetch(`${window.location.pathname}?sections=cart-drawer`)
      .then(response => response.json())
      .then(sections => {
        if (sections['cart-drawer']) {
          this.renderSection(sections['cart-drawer']);
        }
      });
    }

    renderSection(html) {
      const parser = new DOMParser();
      const parsedHTML = parser.parseFromString(html, 'text/html');
      const newDrawerHTML = parsedHTML.querySelector('cart-drawer');

      if (newDrawerHTML) {
        this.innerHTML = newDrawerHTML.innerHTML;
        this.setupDOM();

        // Update body cart empty classes
        const isEmpty = newDrawerHTML.classList.contains('is-empty');
        this.classList.toggle('is-empty', isEmpty);
      }
    }

    setLoadingState(isLoading) {
      if (isLoading) {
        this.classList.add('is-loading');
      } else {
        this.classList.remove('is-loading');
      }
    }
  }

  customElements.define('cart-drawer', CartDrawer);
}
