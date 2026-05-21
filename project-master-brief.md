# 🧾 THEMEOYE — SHOPIFY CUSTOM THEME — MASTER PROJECT BRIEF
### ⚠️ READ THIS FIRST IN EVERY NEW CLAUDE SESSION BEFORE WRITING A SINGLE LINE OF CODE

---

## 📌 SESSION CONTINUITY NOTICE
If this is a new Claude chat session, paste this entire document and say:
> "Continue building the Themeoye Shopify theme. We are on **[PHASE X — STEP Y]**. Here is the master brief."

This document is the **single source of truth**. Do not start from scratch. Every decision is recorded here. Update the **Progress Tracker** section at the bottom after every session.

---

## 🧑‍💻 DEVELOPER PROFILE
- **Experience:** 5 years Shopify developer
- **Tool:** VS Code + Shopify CLI + Claude VS Code Extension
- **Workflow:** Shopify CLI native (no Webpack/Vite/build tools)
- **Goal:** Build a production-ready theme and submit to **Shopify Theme Store**

---

## 🎨 THEME IDENTITY

| Property | Value |
|---|---|
| **Theme Name** | `themeoye` |
| **Niche** | General + Cosmetic + Clothing |
| **Style** | Minimal / Clean / Bold-Editorial / Luxury / Playful |
| **Closest Reference** | Purity Theme (TOP PRIORITY reference) |
| **Dark Mode** | Yes — from Day 1, full support |
| **Accessibility** | WCAG 2.1 AA minimum |
| **RTL Support** | Yes (Shopify Theme Store requirement) |
| **Localization** | Full `locales/` support for all strings |

---

## 🖥️ REFERENCE THEMES — STRUCTURE & LESSONS

### 1. 🥇 PURITY (Top Priority Reference)
**URL:** https://themes.shopify.com/themes/purity/presets/purity
- Ultra-clean whitespace-first design
- Block-based architecture — every visual element is a draggable block
- Sections have rich presets with beautiful default layouts
- Heavy use of `color_background` gradients in schema for hero sections
- Smooth CSS transitions on hover states for product cards
- Sticky header with transparent-to-solid scroll behavior
- Mega menu with image columns support
- Full-width hero with overlay text, gradient overlay option
- Quick-add to cart directly from collection grid
- Announcement bar supports multiple messages with auto-rotate
- Product page: sticky product info column, media gallery with thumbnails below
- Typography: Large editorial headings, clean body, high contrast CTA buttons
- **Key lesson:** Presets are extremely well-configured so the theme looks great out of the box

### 2. HORIZON
**URL:** https://themes.shopify.com/themes/horizon/presets/horizon
- Strong grid-based collection layouts with multiple column options
- Color swatches on collection cards
- Image zoom on hover (scale transform)
- Promotional grid section (mixed size tiles)
- Video background support in hero
- Countdown timer section
- **Key lesson:** Schema provides layout selector (grid/list/masonry) per section

### 3. DAWN (Shopify Official — OS 2.0 Baseline)
**URL:** https://themes.shopify.com/themes/dawn/presets/dawn
- The Shopify OS 2.0 reference implementation
- JSON template architecture pattern to follow exactly
- Cart drawer with upsell support
- Predictive search built-in
- `component-` prefixed CSS files for each UI component
- `section-` prefixed CSS for each section
- `base.css` for global resets and tokens
- **Key lesson:** File naming conventions, accessibility patterns, focus-visible usage

### 4. IMPACT
**URL:** https://themes.shopify.com/themes/impact/presets/impact
- Bold editorial hero sections with split-screen layouts
- Heavy use of large typography as design element
- Lookbook section with hotspot products
- Full-screen video section
- Before/after image slider (ingredient reveal style — great for cosmetics)
- Image-reveal scroll animations
- **Key lesson:** Great for cosmetic/fashion crossover — use its section ideas for Phase 4

### 5. MADRID
**URL:** https://themes.shopify.com/themes/madrid/presets/madrid
- Fashion-forward layout sensibility
- Asymmetric grid sections
- Product page: sticky gallery + sticky form
- Infinite scroll option for collection pages
- Strong use of negative space
- **Key lesson:** Product image layout options — portrait, square, landscape — dynamic from schema

### 6. FLUX
**URL:** https://themes.shopify.com/themes/flux/presets/flux
- Highly animated — scroll-triggered fade-ins and slides
- Floating cart button
- Side-drawer navigation on mobile
- Rich filtering sidebar for collections
- Bundle/frequently bought together section
- **Key lesson:** Animation timing tokens in CSS variables, Intersection Observer pattern for scroll animations

---

## 🏗️ THEME ARCHITECTURE — FILE STRUCTURE

```
themeoye/
├── assets/
│   ├── base.css                      ← Global reset, root variables, tokens
│   ├── theme.css                     ← Theme-wide utility classes
│   ├── component-button.css
│   ├── component-card.css
│   ├── component-badge.css
│   ├── component-modal.css
│   ├── component-drawer.css
│   ├── component-price.css
│   ├── component-rating.css
│   ├── component-media-gallery.css
│   ├── component-predictive-search.css
│   ├── component-cart-notification.css
│   ├── section-header.css
│   ├── section-footer.css
│   ├── section-hero.css
│   ├── section-featured-collection.css
│   ├── section-product-page.css
│   ├── section-cart.css
│   ├── section-collection-list.css
│   ├── section-blog.css
│   ├── theme.js                      ← Global JS utilities
│   ├── component-cart-drawer.js
│   ├── component-product-form.js
│   ├── component-predictive-search.js
│   ├── component-modal.js
│   ├── component-media-gallery.js
│   ├── component-quantity-input.js
│   ├── component-collapsible.js
│   ├── component-slider.js           ← Swiper wrapper
│   ├── swiper-bundle.min.css         ← Swiper library (saved in assets)
│   ├── swiper-bundle.min.js          ← Swiper library (saved in assets)
│   ├── dark-mode.js                  ← Dark mode toggle + system preference
│   ├── animations.js                 ← Intersection Observer scroll animations
│   └── [custom-font-files]           ← .woff2 files for custom fonts
│
├── config/
│   ├── settings_schema.json          ← Global theme settings (ALL customizer panels)
│   └── settings_data.json            ← Default values (auto-generated by Shopify)
│
├── layout/
│   ├── theme.liquid                  ← Root layout (all <head>, scripts, body wrappers)
│   └── password.liquid               ← Coming soon page layout
│
├── locales/
│   ├── en.default.json               ← English strings (all hardcoded text goes here)
│   ├── en.default.schema.json        ← Schema labels/infos in English
│   ├── fr.json
│   └── de.json
│
├── sections/
│   ├── header.liquid
│   ├── footer.liquid
│   ├── announcement-bar.liquid
│   ├── hero-banner.liquid
│   ├── slideshow.liquid
│   ├── featured-collection.liquid
│   ├── featured-product.liquid
│   ├── collection-list.liquid
│   ├── image-banner.liquid
│   ├── image-with-text.liquid
│   ├── multicolumn.liquid
│   ├── rich-text.liquid
│   ├── video.liquid
│   ├── testimonials.liquid
│   ├── blog-posts.liquid
│   ├── newsletter.liquid
│   ├── contact-form.liquid
│   ├── collapsible-content.liquid    ← FAQ
│   ├── countdown-timer.liquid
│   ├── lookbook.liquid
│   ├── before-after-slider.liquid    ← Cosmetic/impact reference
│   ├── promotional-grid.liquid
│   ├── logo-list.liquid
│   ├── icon-with-text.liquid
│   ├── cart-drawer.liquid
│   ├── popup.liquid
│   ├── age-verification.liquid
│   ├── main-product.liquid
│   ├── main-collection-product-grid.liquid
│   ├── main-collection-banner.liquid
│   ├── main-cart-items.liquid
│   ├── main-cart-footer.liquid
│   ├── main-search.liquid
│   ├── main-blog.liquid
│   ├── main-article.liquid
│   ├── main-page.liquid
│   ├── main-404.liquid
│   ├── main-list-collections.liquid
│   ├── main-account.liquid
│   ├── main-login.liquid
│   ├── main-register.liquid
│   ├── main-order.liquid
│   └── main-addresses.liquid
│
├── snippets/
│   ├── card-product.liquid           ← Reusable product card
│   ├── card-collection.liquid
│   ├── card-article.liquid
│   ├── product-media.liquid
│   ├── product-thumbnail.liquid
│   ├── price.liquid
│   ├── badge.liquid
│   ├── quantity-input.liquid
│   ├── share-button.liquid
│   ├── icon-[name].liquid            ← SVG icons as snippets
│   ├── header-search.liquid
│   ├── header-mega-menu.liquid
│   ├── cart-icon-bubble.liquid
│   ├── pagination.liquid
│   ├── facets.liquid                 ← Collection filters
│   ├── facets-vertical.liquid
│   ├── color-swatch.liquid
│   ├── quick-add.liquid
│   ├── quick-view-modal.liquid
│   ├── loading-spinner.liquid
│   ├── image.liquid                  ← Responsive image with lazy load wrapper
│   └── css-variables.liquid          ← Outputs dynamic :root {} from schema settings
│
└── templates/
    ├── index.json
    ├── product.json
    ├── product.quick-view.json       ← Alternate template for quick view
    ├── collection.json
    ├── collection.no-sidebar.json
    ├── cart.json
    ├── blog.json
    ├── article.json
    ├── page.json
    ├── page.contact.json
    ├── page.faq.json
    ├── search.json
    ├── 404.json
    ├── list-collections.json
    ├── customers/
    │   ├── account.json
    │   ├── login.json
    │   ├── register.json
    │   ├── order.json
    │   └── addresses.json
    └── password.json
```

---

## ⚙️ TECH STACK DECISIONS (LOCKED)

| Decision | Choice | Reason |
|---|---|---|
| JS Framework | Vanilla JS only | Theme Store requirement, performance |
| CSS Approach | CSS Custom Properties + Vanilla CSS | Dynamic from customizer via `css-variables.liquid` |
| Build Tool | Shopify CLI native | No Webpack/Vite |
| Slider | Swiper.js | `swiper-bundle.min.css` + `swiper-bundle.min.js` in `/assets` |
| Animations | Intersection Observer API | Vanilla, no library |
| Icons | Inline SVG snippets | Performance, styleable |
| Grid System | CSS Grid native | No utility framework |
| Custom Elements | Web Components (extends HTMLElement) | Dawn pattern, reusable |

---

## 🎨 CSS ROOT VARIABLES SYSTEM

### Color Tokens (All Dynamic from Customizer)
```css
:root {
  /* === BRAND COLORS === */
  --color-primary: #0F0F0F;
  --color-primary-hover: #333333;
  --color-secondary: #C9A96E;          /* Luxury gold accent — cosmetic touch */
  --color-accent: #E8D5B7;

  /* === BACKGROUND === */
  --color-background: #FFFFFF;
  --color-background-2: #F7F6F4;       /* Subtle off-white for section alternation */
  --color-background-3: #EDEBE7;

  /* === TEXT === */
  --color-foreground: #0F0F0F;
  --color-foreground-secondary: #6B6B6B;
  --color-foreground-tertiary: #9E9E9E;

  /* === BUTTON === */
  --color-button: #0F0F0F;
  --color-button-text: #FFFFFF;
  --color-button-hover: #333333;
  --color-button-text-hover: #FFFFFF;
  --color-button-outline: transparent;
  --color-button-outline-border: #0F0F0F;
  --color-button-outline-text: #0F0F0F;

  /* === BORDERS === */
  --color-border: #E0DDD8;
  --color-border-strong: #0F0F0F;

  /* === STATES === */
  --color-success: #2D8653;
  --color-error: #CC1D1D;
  --color-warning: #E09A00;
  --color-info: #1D62CC;

  /* === BADGES === */
  --color-badge-sale: #CC1D1D;
  --color-badge-new: #2D8653;
  --color-badge-text: #FFFFFF;

  /* === OVERLAY === */
  --color-overlay: rgba(0,0,0,0.5);
  --color-overlay-light: rgba(0,0,0,0.2);

  /* === DARK MODE (toggled via [data-theme="dark"] on <html>) === */
}

[data-theme="dark"] {
  --color-background: #0F0F0F;
  --color-background-2: #1A1A1A;
  --color-background-3: #242424;
  --color-foreground: #F5F4F0;
  --color-foreground-secondary: #A8A8A8;
  --color-foreground-tertiary: #6B6B6B;
  --color-border: #2A2A2A;
  --color-border-strong: #F5F4F0;
  --color-button: #F5F4F0;
  --color-button-text: #0F0F0F;
  --color-button-hover: #C9A96E;
  --color-button-text-hover: #0F0F0F;
  --color-button-outline-border: #F5F4F0;
  --color-button-outline-text: #F5F4F0;
}
```

### Typography Tokens
```css
:root {
  /* === FONT FAMILIES (output from font_picker + custom font option) === */
  --font-heading-family: 'Playfair Display', Georgia, serif;
  --font-heading-style: normal;
  --font-heading-weight: 700;

  --font-body-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body-style: normal;
  --font-body-weight: 400;
  --font-body-weight-bold: 700;

  --font-button-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-button-style: normal;
  --font-button-weight: 600;
  --font-button-letter-spacing: 0.08em;
  --font-button-transform: uppercase;

  /* === FONT SIZES (scale from customizer range slider) === */
  --font-size-base: 16px;              /* body base — range: 14–18px */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 2rem;
  --font-size-4xl: 2.5rem;
  --font-size-5xl: 3.5rem;
  --font-size-6xl: 5rem;

  /* === LINE HEIGHTS === */
  --line-height-tight: 1.15;
  --line-height-normal: 1.6;
  --line-height-loose: 1.85;

  /* === LETTER SPACING === */
  --letter-spacing-tight: -0.03em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
  --letter-spacing-wider: 0.1em;
  --letter-spacing-widest: 0.2em;
}
```

### Spacing & Layout Tokens
```css
:root {
  /* === CONTAINER === */
  --container-max-width: 1400px;       /* Default — range select: 1200/1400/1600px */
  --container-max-width-narrow: 720px;
  --container-max-width-wide: 1600px;
  --container-padding-x: 2rem;         /* range: 1rem–4rem from customizer */
  --container-padding-x-mobile: 1rem;

  /* === SECTION SPACING === */
  --section-padding-top: 80px;         /* range: 0–160px */
  --section-padding-bottom: 80px;
  --section-padding-top-mobile: 48px;
  --section-padding-bottom-mobile: 48px;

  /* === GRID === */
  --grid-gap: 24px;                    /* range: 8–48px */
  --grid-gap-mobile: 16px;

  /* === BORDER RADIUS === */
  --border-radius-none: 0px;
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 16px;
  --border-radius-xl: 24px;
  --border-radius-full: 9999px;
  --border-radius-button: 4px;         /* dynamic from schema */
  --border-radius-card: 8px;           /* dynamic from schema */
  --border-radius-badge: 4px;
  --border-radius-input: 4px;

  /* === TRANSITIONS === */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 800ms;
  --easing-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --easing-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* === SHADOWS === */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.10);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.12);
  --shadow-xl: 0 16px 48px rgba(0,0,0,0.16);
  --shadow-card-hover: 0 8px 32px rgba(0,0,0,0.14);

  /* === Z-INDEX SCALE === */
  --z-below: -1;
  --z-base: 0;
  --z-raised: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-drawer: 400;
  --z-modal: 500;
  --z-notification: 600;
  --z-tooltip: 700;
}
```

---

## 🔤 FONT SYSTEM — 3 PICKERS + CUSTOM FONT

### Schema Settings (in settings_schema.json)
```json
[
  {
    "type": "header",
    "content": "Typography"
  },
  {
    "type": "font_picker",
    "id": "font_heading",
    "label": "Heading font",
    "info": "Used for all titles and headings across the theme.",
    "default": "playfair_display_n4"
  },
  {
    "type": "font_picker",
    "id": "font_body",
    "label": "Body font",
    "info": "Used for paragraphs, descriptions, and general content.",
    "default": "inter_n4"
  },
  {
    "type": "font_picker",
    "id": "font_button",
    "label": "Button font",
    "info": "Used for all button labels and CTAs.",
    "default": "inter_n6"
  },
  {
    "type": "header",
    "content": "Custom Font (Optional — overrides font pickers above)"
  },
  {
    "type": "checkbox",
    "id": "use_custom_heading_font",
    "label": "Use custom heading font",
    "default": false,
    "info": "Upload your custom font files into theme Assets folder and enter the font name below."
  },
  {
    "type": "text",
    "id": "custom_heading_font_name",
    "label": "Custom heading font name",
    "placeholder": "e.g. MyBrandFont",
    "info": "Must exactly match the font-family name in your uploaded .woff2 file."
  },
  {
    "type": "text",
    "id": "custom_heading_font_url",
    "label": "Custom heading font file name",
    "placeholder": "e.g. my-brand-font.woff2",
    "info": "Upload the .woff2 file to theme Assets. Enter the filename here."
  },
  {
    "type": "checkbox",
    "id": "use_custom_body_font",
    "label": "Use custom body font",
    "default": false
  },
  {
    "type": "text",
    "id": "custom_body_font_name",
    "label": "Custom body font name",
    "placeholder": "e.g. MyBodyFont"
  },
  {
    "type": "text",
    "id": "custom_body_font_url",
    "label": "Custom body font file name",
    "placeholder": "e.g. my-body-font.woff2"
  },
  {
    "type": "checkbox",
    "id": "use_custom_button_font",
    "label": "Use custom button font",
    "default": false
  },
  {
    "type": "text",
    "id": "custom_button_font_name",
    "label": "Custom button font name",
    "placeholder": "e.g. MyButtonFont"
  },
  {
    "type": "text",
    "id": "custom_button_font_url",
    "label": "Custom button font file name",
    "placeholder": "e.g. my-button-font.woff2"
  }
]
```

### Output in theme.liquid `<head>` (Liquid pattern)
```liquid
{%- liquid
  assign heading_font = settings.font_heading
  assign body_font = settings.font_body
  assign button_font = settings.font_button
-%}

{%- unless settings.use_custom_heading_font -%}
  {{ heading_font | font_face: font_display: 'swap' }}
{%- else -%}
  <style>
    @font-face {
      font-family: {{ settings.custom_heading_font_name | json }};
      src: url('{{ settings.custom_heading_font_url | asset_url }}') format('woff2');
      font-display: swap;
    }
  </style>
{%- endunless -%}

{%- unless settings.use_custom_body_font -%}
  {{ body_font | font_face: font_display: 'swap' }}
{%- else -%}
  <style>
    @font-face {
      font-family: {{ settings.custom_body_font_name | json }};
      src: url('{{ settings.custom_body_font_url | asset_url }}') format('woff2');
      font-display: swap;
    }
  </style>
{%- endunless -%}

{%- unless settings.use_custom_button_font -%}
  {{ button_font | font_face: font_display: 'swap' }}
{%- else -%}
  <style>
    @font-face {
      font-family: {{ settings.custom_button_font_name | json }};
      src: url('{{ settings.custom_button_font_url | asset_url }}') format('woff2');
      font-display: swap;
    }
  </style>
{%- endunless -%}
```

---

## 📐 CONTAINER WIDTH SYSTEM

```liquid
{%- comment -%} In settings_schema.json {%- endcomment -%}
{
  "type": "select",
  "id": "container_width",
  "label": "Content container width",
  "options": [
    { "value": "1200px", "label": "Narrow (1200px)" },
    { "value": "1400px", "label": "Default (1400px)" },
    { "value": "1600px", "label": "Wide (1600px)" },
    { "value": "100%",   "label": "Full width" }
  ],
  "default": "1400px",
  "info": "Maximum width of content containers across the theme."
}
```

```css
/* In base.css */
.container {
  width: 100%;
  max-width: var(--container-max-width);
  margin-inline: auto;
  padding-inline: var(--container-padding-x);
}

.container--narrow  { max-width: var(--container-max-width-narrow); }
.container--wide    { max-width: var(--container-max-width-wide); }
.container--full    { max-width: 100%; padding-inline: 0; }
```

---

## 🧩 SECTION SCHEMA PATTERNS (STANDARD TEMPLATE)

Every section follows this pattern — **always include section padding controls:**

```json
{
  "name": "Section Name",
  "settings": [
    {
      "type": "header",
      "content": "Layout"
    },
    {
      "type": "select",
      "id": "container_size",
      "label": "Container size",
      "options": [
        { "value": "default", "label": "Default" },
        { "value": "narrow",  "label": "Narrow" },
        { "value": "wide",    "label": "Wide" },
        { "value": "full",    "label": "Full width" }
      ],
      "default": "default"
    },
    {
      "type": "color_background",
      "id": "background",
      "label": "Section background"
    },
    {
      "type": "range",
      "id": "padding_top",
      "label": "Padding top",
      "min": 0, "max": 160, "step": 8, "unit": "px",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_bottom",
      "label": "Padding bottom",
      "min": 0, "max": 160, "step": 8, "unit": "px",
      "default": 80
    },
    {
      "type": "range",
      "id": "padding_top_mobile",
      "label": "Padding top (mobile)",
      "min": 0, "max": 100, "step": 4, "unit": "px",
      "default": 48
    },
    {
      "type": "range",
      "id": "padding_bottom_mobile",
      "label": "Padding bottom (mobile)",
      "min": 0, "max": 100, "step": 4, "unit": "px",
      "default": 48
    }
  ]
}
```

**Output pattern in every section:**
```liquid
{% style %}
  #shopify-section-{{ section.id }} {
    background: {{ section.settings.background }};
    padding-top: {{ section.settings.padding_top_mobile }}px;
    padding-bottom: {{ section.settings.padding_bottom_mobile }}px;
  }
  @media (min-width: 768px) {
    #shopify-section-{{ section.id }} {
      padding-top: {{ section.settings.padding_top }}px;
      padding-bottom: {{ section.settings.padding_bottom }}px;
    }
  }
{% endstyle %}
```

---

## 🖼️ IMAGE HANDLING — STANDARD PATTERN

```liquid
{%- comment -%} Always use this pattern for images in Themeoye {%- endcomment -%}
{%- if image != blank -%}
  {{
    image
    | image_url: width: 1500
    | image_tag:
      loading: lazy,
      widths: '375, 550, 750, 1100, 1500',
      sizes: '(min-width: 1400px) 700px, (min-width: 768px) 50vw, 100vw',
      class: 'themeoye-image',
      alt: image.alt | default: section.settings.heading | escape
  }}
{%- else -%}
  {{ 'collection-1' | placeholder_svg_tag: 'placeholder-svg' }}
{%- endif -%}
```

---

## 🌙 DARK MODE IMPLEMENTATION

```liquid
{%- comment -%} In settings_schema.json {%- endcomment -%}
{
  "type": "select",
  "id": "color_scheme_default",
  "label": "Default color mode",
  "options": [
    { "value": "light",  "label": "Light" },
    { "value": "dark",   "label": "Dark" },
    { "value": "system", "label": "Follow system preference" }
  ],
  "default": "light"
},
{
  "type": "checkbox",
  "id": "show_dark_mode_toggle",
  "label": "Show dark mode toggle in header",
  "default": true
}
```

```liquid
{%- comment -%} In theme.liquid <html> tag {%- endcomment -%}
<html lang="{{ request.locale.iso_code }}"
      data-theme="{{ settings.color_scheme_default }}"
      class="no-js">
```

```javascript
// dark-mode.js
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
```

---

## 🔄 SWIPER.JS INTEGRATION PATTERN

```liquid
{%- comment -%} Load Swiper only when needed — inline in sections that use it {%- endcomment -%}
{{ 'swiper-bundle.min.css' | asset_url | stylesheet_tag }}
<script src="{{ 'swiper-bundle.min.js' | asset_url }}" defer></script>
```

```javascript
// Standard Swiper init pattern in Themeoye
document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.themeoye-swiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: {
      delay: sectionEl.dataset.autoplayDelay || 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      768:  { slidesPerView: 2, spaceBetween: 20 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
      1400: { slidesPerView: 4, spaceBetween: 24 }
    },
    a11y: { prevSlideMessage: 'Previous', nextSlideMessage: 'Next' }
  });
});
```

---

## 📋 SETTINGS_SCHEMA.JSON — TOP LEVEL PANELS (Full Outline)

```
1. Theme Info (name, version, documentation link)
2. Colors
   - Primary / Secondary / Accent
   - Backgrounds (3 levels)
   - Text (3 levels)
   - Button (filled + outline variants)
   - Borders
   - Sale / New badge colors
3. Typography
   - Heading font picker + size scale (range)
   - Body font picker + size (range 14–18px)
   - Button font picker + letter spacing + transform
   - Custom font option (per font)
4. Layout & Spacing
   - Container width selector
   - Container horizontal padding (range)
   - Section vertical padding defaults (range)
   - Grid gap (range)
5. Buttons
   - Border radius (range)
   - Style (filled / outline / ghost) — select
   - Size (small / medium / large) — select
   - Hover animation (none / lift / fill / slide) — select
6. Cards
   - Border radius (range)
   - Shadow (none / sm / md / lg) — select
   - Border (checkbox + color)
   - Image ratio (select: portrait / square / landscape / natural)
   - Hover effect (none / zoom / lift / overlay) — select
7. Header
   - Sticky behavior (select)
   - Transparent on home (checkbox)
   - Header height desktop / mobile (range)
   - Logo max width (range)
8. Announcement Bar
   - Background + text color
   - Height (range)
9. Footer
   - Background + text color
   - Column layout
10. Dark Mode
    - Default mode
    - Show toggle
11. Favicon
12. Social Media Links (10+ platforms)
13. Cart
    - Cart type (drawer / page / notification) — select
    - Show estimated shipping (checkbox)
    - Cart note (checkbox)
14. Product
    - Show vendor (checkbox)
    - Show SKU (checkbox)
    - Show quantity selector (checkbox)
    - Enable zoom (checkbox)
    - Media layout (gallery / scrollable / sticky) — select
15. Collection
    - Products per page (range)
    - Columns desktop/mobile (range)
    - Enable filters sidebar (checkbox)
    - Filter position (select)
16. Search
    - Show predictive search (checkbox)
    - Predictive results count (range)
17. Animations & Transitions
    - Enable scroll animations (checkbox)
    - Animation style (select: fade / slide-up / scale)
    - Animation speed (select: fast / normal / slow)
    - Transition speed global (range)
18. Custom CSS
    - Textarea for merchant custom CSS
19. Custom JavaScript  
    - Textarea for merchant custom JS snippets
```

---

## 🚀 PHASE BUILD PLAN

### ✅ PHASE 1 — Foundation (START HERE)
Files to build in order:
1. `config/settings_schema.json` — Complete all 19 panels
2. `snippets/css-variables.liquid` — Outputs all `:root {}` from schema
3. `assets/base.css` — Reset, tokens, grid, container, utilities
4. `assets/theme.css` — Global component styles
5. `layout/theme.liquid` — Full HTML shell, head tags, font loading, dark mode, scripts
6. `layout/password.liquid`
7. `locales/en.default.json` — Scaffold all string keys
8. `locales/en.default.schema.json` — All schema labels
9. `assets/dark-mode.js` — Dark mode toggle logic
10. `assets/theme.js` — Global utilities (debounce, trapFocus, scroll lock, etc.)
11. `assets/animations.js` — Intersection Observer scroll animations

### PHASE 2 — Core Sections
- `sections/announcement-bar.liquid`
- `sections/header.liquid` + `snippets/header-mega-menu.liquid` + `snippets/header-search.liquid`
- `sections/footer.liquid`
- `sections/hero-banner.liquid`
- `sections/slideshow.liquid`

### PHASE 3 — Product Experience
- `snippets/card-product.liquid`
- `snippets/price.liquid`
- `snippets/badge.liquid`
- `snippets/quick-add.liquid`
- `snippets/quick-view-modal.liquid`
- `sections/main-product.liquid` (sticky layout, media gallery)
- `sections/main-collection-product-grid.liquid`
- `snippets/facets.liquid`
- `sections/cart-drawer.liquid`
- `assets/component-cart-drawer.js`
- `assets/component-product-form.js`
- `assets/component-media-gallery.js`
- `assets/component-quick-view.js`
- All product/collection/cart JSON templates

### PHASE 4 — Marketing Sections
- `sections/featured-collection.liquid`
- `sections/image-with-text.liquid`
- `sections/promotional-grid.liquid`
- `sections/testimonials.liquid`
- `sections/countdown-timer.liquid`
- `sections/before-after-slider.liquid`
- `sections/lookbook.liquid`
- `sections/blog-posts.liquid`
- `sections/newsletter.liquid`
- `sections/multicolumn.liquid`
- `sections/collapsible-content.liquid`
- `sections/logo-list.liquid`
- `sections/video.liquid`
- `sections/rich-text.liquid`
- `sections/icon-with-text.liquid`
- `sections/popup.liquid`
- All remaining templates

### PHASE 5 — Polish
- Full animation pass (`animations.js` + CSS transitions audit)
- Accessibility audit (focus trapping, aria labels, keyboard navigation)
- Performance audit (lazy loading, deferred scripts, image optimization)
- RTL support pass
- Localization completeness check
- Shopify Theme Store checklist review
- Theme previewer test across all templates

---

## 📦 SHOPIFY THEME STORE REQUIREMENTS CHECKLIST

- [ ] All required templates exist (product, collection, cart, search, 404, etc.)
- [ ] No external JS libraries except those in `/assets`
- [ ] All text strings are translatable via `locales/`
- [ ] No hardcoded colors — all from CSS variables
- [ ] Schema labels/infos are descriptive and in `en.default.schema.json`
- [ ] `presets` defined in every section schema
- [ ] Accessible: keyboard nav, focus-visible, aria attributes
- [ ] Images: always use `image_url` + `image_tag` with `widths` and `sizes`
- [ ] No jQuery
- [ ] Works without JavaScript enabled (progressive enhancement)
- [ ] Mobile responsive — tested at 320px, 375px, 768px, 1024px, 1440px
- [ ] Passes Shopify Theme Inspector performance checks
- [ ] Dark mode fully implemented
- [ ] RTL languages do not break layout

---

## 📍 PROGRESS TRACKER — UPDATE AFTER EVERY SESSION

| Phase | Step | File | Status | Notes |
|---|---|---|---|---|
| 1 | 1-11 | Foundation | ✅ Completed | All foundations files exist and are populated. |
| 2 | 1-5 | Core Sections | ✅ Completed | Header, Footer, Hero, Slideshow etc. implemented. |
| 3 | — | Product Experience | ✅ Completed | Product grid, main product, cart drawer etc. implemented. |
| 4 | — | Marketing Sections | ✅ Completed | Testimonials, countdown, promotional grid etc. implemented. |
| 5 | — | Polish pass | 🚧 In Progress | Completed entrance animations for Hero, Image with Text, Featured Collection, and Promotional Grid. |

---

## 🗣️ HOW TO RESUME IN A NEW CLAUDE SESSION

Copy and paste the following prompt:

```
I am building a Shopify custom theme called "Themeoye" for the Shopify Theme Store.
I am a 5-year Shopify developer working in VS Code + Shopify CLI + Claude extension.
Here is my full master brief — read it completely before writing any code:

[PASTE THIS ENTIRE DOCUMENT]

We are currently on: Phase [X], Step [Y], building: [FILENAME]
[If a file is partially done: paste the current code and say "continue from here"]
Please continue exactly where we left off.
```

---

*Document version: 1.1 | Updated: 2026-05-22 | Theme: Themeoye | Developer: Gemini CLI*
