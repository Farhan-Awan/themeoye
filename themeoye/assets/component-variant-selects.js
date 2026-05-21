/**
 * Themeoye - Variant Selects Custom Element
 * Handles dynamic variant switches, pricing, SKU updates, and history URL states.
 */
if (!customElements.get('variant-selects')) {
  class VariantSelects extends HTMLElement {
    constructor() {
      super();
      this.addEventListener('change', this.onVariantChange.bind(this));
    }

    onVariantChange() {
      this.updateOptions();
      this.updateMasterId();
      this.toggleAddButton(true, '', false);

      if (!this.currentVariant) {
        this.toggleAddButton(true, 'Unavailable', true);
        this.updatePrice(null);
      } else {
        this.updateURL();
        this.updateVariantInput();
        this.updatePrice(this.currentVariant);
        this.updateMedia();
        
        if (this.currentVariant.available) {
          this.toggleAddButton(false, 'Add to Cart', false);
        } else {
          this.toggleAddButton(true, 'Sold Out', true);
        }
      }
    }

    updateOptions() {
      const optionContainers = Array.from(this.querySelectorAll('.product-variant-option'));
      if (optionContainers.length > 0) {
        this.options = optionContainers.map(container => {
          const select = container.querySelector('.variant-select');
          if (select) return select.value;
          const checkedRadio = container.querySelector('input[type="radio"]:checked');
          if (checkedRadio) return checkedRadio.value;
          return null;
        }).filter(value => value !== null);
      } else {
        const selects = Array.from(this.querySelectorAll('.variant-select'));
        const radios = Array.from(this.querySelectorAll('input[type="radio"]:checked'));
        this.options = [
          ...selects.map(select => select.value),
          ...radios.map(radio => radio.value)
        ];
      }
    }

    updateMasterId() {
      this.currentVariant = this.getVariantData().find(variant => {
        return !variant.options.map((option, index) => {
          return this.options[index] === option;
        }).includes(false);
      });
    }

    updateVariantInput() {
      const productForm = document.querySelector(`product-form[class*="product-form"]`);
      if (!productForm) return;
      const input = productForm.querySelector('input[name="id"]');
      if (input) {
        input.value = this.currentVariant.id;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    updateURL() {
      if (!this.currentVariant || this.dataset.updateUrl === 'false') return;
      window.history.replaceState({ }, '', `${this.dataset.url}?variant=${this.currentVariant.id}`);
    }

    updatePrice(variant) {
      const priceContainer = document.getElementById(`price-${this.dataset.section}`);
      if (!priceContainer) return;

      if (!variant) {
        priceContainer.style.display = 'none';
        return;
      }
      priceContainer.style.display = 'block';

      // Format currency (Simple helper, in production standard Shopify filters exist)
      const formattedPrice = this.formatMoney(variant.price);
      
      const priceSpan = priceContainer.querySelector('.price');
      if (priceSpan) {
        priceSpan.textContent = formattedPrice;
        priceSpan.classList.toggle('price--sale', variant.compare_at_price > variant.price);
      }

      const compareSpan = priceContainer.querySelector('.price--compare');
      if (variant.compare_at_price > variant.price) {
        const formattedCompare = this.formatMoney(variant.compare_at_price);
        if (compareSpan) {
          compareSpan.textContent = formattedCompare;
          compareSpan.style.display = 'inline-block';
        } else {
          // If no compare element, create one
          const newCompare = document.createElement('span');
          newCompare.classList.add('price', 'price--compare');
          newCompare.textContent = formattedCompare;
          priceSpan.after(newCompare);
        }
      } else if (compareSpan) {
        compareSpan.style.display = 'none';
      }
    }

    updateMedia() {
      if (!this.currentVariant || !this.currentVariant.featured_media) return;
      const mediaId = this.currentVariant.featured_media.id;
      const swiperEl = document.querySelector('.themeoye-product-media-swiper');
      
      if (swiperEl && typeof Swiper !== 'undefined') {
        const swiperInstance = swiperEl.swiper || swiperEl.swiperInstance;
        if (!swiperInstance) return;
        
        const slides = Array.from(swiperEl.querySelectorAll('.swiper-slide'));
        const index = slides.findIndex(slide => slide.dataset.mediaId == mediaId);
        
        if (index !== -1) {
          swiperInstance.slideTo(index);
        }
      }
    }

    toggleAddButton(disable = true, text = '', modifyText = false) {
      const productForm = document.querySelector(`product-form[class*="product-form"]`);
      if (!productForm) return;
      const addButton = productForm.querySelector('[type="submit"]');
      const addButtonText = addButton ? addButton.querySelector('span') : null;

      if (!addButton) return;

      if (disable) {
        addButton.setAttribute('disabled', 'true');
        if (modifyText && addButtonText) addButtonText.textContent = text;
      } else {
        addButton.removeAttribute('disabled');
        if (modifyText && addButtonText) addButtonText.textContent = text;
      }
    }

    formatMoney(cents) {
      // Handles standard Shopify money format placeholder logic
      const dollars = (cents / 100).toFixed(2);
      return `$${dollars}`;
    }

    getVariantData() {
      this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
      return this.variantData;
    }
  }

  customElements.define('variant-selects', VariantSelects);
}
