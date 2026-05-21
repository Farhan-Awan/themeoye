/**
 * Themeoye - Product Form Custom Element
 * Handles asynchronous AJAX Add-to-Cart form submissions.
 */
if (!customElements.get('product-form')) {
  class ProductForm extends HTMLElement {
    constructor() {
      super();
      this.form = this.querySelector('form');
      if (!this.form) return;
      
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cartDrawer = document.querySelector('cart-drawer');
      this.submitButton = this.querySelector('[type="submit"]');
      this.errorWrapper = this.querySelector('.product-form__error-message-wrapper');
      this.errorMessage = this.querySelector('.product-form__error-message');
    }

    onSubmitHandler(e) {
      e.preventDefault();
      if (this.submitButton.classList.contains('is-loading')) return;

      this.handleLoading(true);
      if (this.errorWrapper) this.errorWrapper.hidden = true;

      const formData = new FormData(this.form);
      formData.append('sections', 'cart-drawer');
      formData.append('sections_url', window.location.pathname);

      fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/javascript'
        },
        body: formData
      })
      .then(response => response.json())
      .then(response => {
        if (response.status) {
          this.handleError(response.description || response.message);
          return;
        }

        // Add to cart successful - update cart drawer
        if (this.cartDrawer) {
          // If Section Rendering API returned HTML, parse and render
          if (response.sections && response.sections['cart-drawer']) {
            this.cartDrawer.renderSection(response.sections['cart-drawer']);
          } else {
            this.cartDrawer.refresh();
          }
          this.cartDrawer.open();
        }
      })
      .catch(error => {
        this.handleError(error.message);
      })
      .finally(() => {
        this.handleLoading(false);
      });
    }

    handleLoading(isLoading) {
      if (!this.submitButton) return;
      if (isLoading) {
        this.submitButton.classList.add('is-loading');
        this.submitButton.setAttribute('disabled', 'true');
      } else {
        this.submitButton.classList.remove('is-loading');
        this.submitButton.removeAttribute('disabled');
      }
    }

    handleError(message) {
      if (!this.errorWrapper || !this.errorMessage) return;
      this.errorMessage.textContent = message;
      this.errorWrapper.hidden = false;
    }
  }

  customElements.define('product-form', ProductForm);
}
