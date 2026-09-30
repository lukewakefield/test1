---
name: create-section
description: >-
  Creates or updates a Siteglide Studio StudioKit section — a Liquid partial clients
  can edit in the Siteglide CMS. Use when building Studio sites, adding page
  sections, or working with module_357 Studio v2+. Requires Studio module
  installed and theme migrated to a library-based theme.
compatibility: >-
  Some rules in this skill are only relevant when the user intends to build using the framework of the StudioKit library. If it's not clear from context whether they are using the StudioKit library, prompt the user to clarify. Note that a library may have started as StudioKit and be renamed, but the user may still want to follow StudioKit guidance and use this skill.
---

# Create Studio kit Section

Siteglide Studio lets clients manage website content while developers retain full build flexibility. Not all sites use Studio yet, but it is recommended for the best client experience.

## Prerequisites

Before creating sections, confirm:

1. **Studio module** (`module_357`) is installed and up to date. If missing or outdated, recommend updating first.
2. **Theme on a library** — after updating Studio, the main theme should use a library containing a theme. Migration guide: [Migrating from <2.0.0 themes to libraries](https://docs.siteglide.com/articles/9179626-migrating-from-less200-themes-to-libraries).
3. **Studio module version > 2.0.0** — this skill applies to StudioKit library sections on current Studio versions. A library may be following the StudioKit framework even if has been renamed locally.

For Studio or CMS documentation questions, use `search-docs` (include **Studio** in the search query).

Generate a new Siteglide Studio kit section (`.liquid` file) following every convention defined below. When invoked, ask for the section name and purpose if not provided in `$ARGUMENTS`, then produce the complete file.

Output the file to:
`marketplace_builder/views/partials/library/theme/sections/studio-kit-<slug>.liquid`

The library directory structure is:
```
marketplace_builder/views/partials/library/<library-name>/
├── theme/<theme-name>/
│   ├── sections/          ← section .liquid files live here
│   └── custom-css/        ← default global styles for elements not re-declared in sections
```

> **Note:** Global styles (typography, buttons, cards, `.container`, etc.) are defined in `library/theme/custom-css/`. Never re-declare these in sections with redundant Tailwind CSS styles — reference the tokens and semantic elements directly.

---

## Tech Stack

| Layer | Tool | Notes |
|---|---|---|
| Templating | Liquid | Siteglide flavour |
| Styling | Tailwind v4 only | Zero custom CSS, zero inline `style=""` except unavoidable keyframe `@keyframes` blocks |
| JS components | Flowbite | Accordions, dropdowns, modals via data-attribute API |
| Carousels | Swiper JS v8 | Loaded once per page via export guard |
| Video | `<lite-youtube>` web component | Lazy, privacy-friendly |
| Icons | Material Symbols Outlined | `<span class="material-symbols-outlined">icon_name</span>` |
| Alternate icons | Iconify | `<iconify-icon icon="solar:name-bold">` — use only when Material Symbols lacks the glyph |

---

## File Structure

Every section is a single `.liquid` file with two parts separated by `---`:

1. **YAML frontmatter** — the metadata block
2. **HTML template** — the rendered section markup

### 1. YAML Frontmatter

```yaml
---
metadata:
  name: Studio Kit <Human Readable Name>
  class: section
  category: <hero|content|features|pricing|social-proof|navigation|footer>
  lists:            # use for repeating items the editor can add/remove
    - name: <PascalCase>
      type: <slug>
      fields:
        - id: <snake_case>
          type: <text|textarea|image_picker|url|select>
          label: <Human Label>
          default: <value>
          is_title: true   # mark exactly ONE field per list as is_title
  fields:           # section-level fields — ordered by the hierarchy below
    - id: eyebrow
      type: text
      label: Eyebrow
      default: ''
    - id: heading
      type: textarea
      label: Heading
      default: ''
    - id: body
      type: textarea
      label: Body
      default: ''
    # ... other surface content fields
    # background / structural / settings fields last
    - id: variant
      type: select
      label: Variant
      default: variant-1
      options:
        - { label: Variant 1, value: variant-1 }
        - { label: Variant 2, value: variant-2 }
        - { label: Variant 3, value: variant-3 }
        - { label: Variant 4, value: variant-4 }
        - { label: Variant 5, value: variant-5 }
  hide_on: []
  requires: []
  settings: []
  components:       # use for CTAs and any item where add/remove flexibility is needed
    - name: Button
      type: cta_button
      fields:
        - { id: button_title, type: text,   label: Button Title, default: 'Get started', is_title: true }
        - { id: button_link,  type: text,   label: Button Link,  default: '#' }
        - id: button_type
          type: select
          label: Button Type
          default: button
          options:
            - { label: Button,           value: button }
            - { label: Button Secondary, value: button-secondary }
      availableOn: [fields]
---
```

#### Field ordering rules

1. Eyebrow / badge text
2. Headings in document order (H1 → H2 → H3 …)
3. Body / supporting copy
4. Image fields for foreground / featured content
5. Image alt text immediately after its image field
6. CTA text → CTA URL pairs together
7. List-level content fields (title, description, image, icon …)
8. Structural / layout selectors (columns, layout variant)
9. Background image / background colour fields
10. `variant` select — always last in the `fields` array

---

## HTML Template Conventions

### Section wrapper

```liquid
<section class="@container {{ this.variant }}" data-motion-group>
  <div class="container">
    <!-- content -->
  </div>
</section>
```

- `@container` goes on `<section>` — **always**, so container queries work throughout the section.
- `{{ this.variant }}` applies the active color variant.
- `data-motion-group` on the `<section>` is the animation scope root.
- Never add a `style=""` attribute to `<section>` for background colours — use a Tailwind utility or a variant class.
- The global CSS already applies `border border-base-400/40 bg-base-100 dark:bg-base-950 max-w-[120rem] mx-auto` to every `section` element. Do not repeat these on the section tag.

### Container

`.container` is globally defined — it supplies `mx-auto max-w-[96rem] px-8 py-20 md:px-12 md:py-24 lg:px-16`. Apply it as a class only; never override padding inline.

If a section needs a non-default vertical rhythm, add extra padding utility **on the inner div**, not on `.container`:

```liquid
<div class="container py-28 @md:py-32">
```

---

## Container Queries — Responsive Design

Use container query breakpoints throughout. **Never use viewport breakpoints** (`md:`, `lg:`) inside a section — always use the `@` prefixed container variants.

| Breakpoint | Approx viewport equivalent |
|---|---|
| `@sm:` | ~480 px |
| `@md:` | ~768 px |
| `@lg:` | ~1024 px |
| `@xl:` | ~1280 px |
| `@2xl:` | ~1536 px |

Example grid:

```liquid
<div class="grid grid-cols-1 gap-6 @md:grid-cols-2 @lg:grid-cols-3">
```

---

## Color System — Tokens Only

**Never hard-code hex values or Tailwind color names directly** (e.g. `text-blue-500`, `bg-gray-100`). Every color must reference a design token variable.

### Available token families

(For Tailwind classes)

| Token | Usage |
|---|---|
| `primary-50` … `primary-950` | Brand / CTA color |
| `secondary-50` … `secondary-950` | Accent color |
| `tertiary-50` … `tertiary-950` | Third accent |
| `neutral-50` … `neutral-950` | Text, borders, subtle surfaces. These should *usually* be true neutrals with a low saturation, though this is up to the designer. |
| `base-50` … `base-950` | Can be used for page backgrounds, card surfaces, dividers, especially where the design demands similar backgrounds across a collection of layouts. These are unlikely to be as high saturation as the primary / secondary / tertiary colours, but may be a little warmer than the strictly "neutral" color. |

Since steps are available for all colours, there may be some overlap between the interpreted roles of the 5 colours. While base should always be defined, a section does not have to use it if it prefers to makie heavier use of the primary / secondary / tertiary brand colours. 

### Usage patterns

```liquid
<!-- Tailwind color utility (preferred) -->
text-primary-500
bg-base-50
border-neutral-800
dark:bg-base-900/20

<!-- CSS variable (use only when a Tailwind utility isn't available for that token) -->
text-[var(--color-primary-500)]
bg-[var(--color-neutral-secondary)]
```

### Variant-aware color rules

The purpose of variants is to provide simple nested CSS which can re-map variables locally to allow users to swap around different colors on a section simply by changing the variant- prefixed class.

- **Overlapping foreground/background colours must be high-contrast.** When placing text on a coloured surface, pair light-family token against a dark-family token (e.g., `text-neutral-50` on `bg-primary-700`).
- **CTAs always use `.button`** (primary color). Use `.button-secondary` only for secondary actions placed alongside a primary CTA.
- When a section uses a non-default background (e.g. `bg-primary-500`), add `variant-2` or the appropriate variant class so all nested color tokens remap correctly.

### Dark mode

Pair every background and text utility with its `dark:` counterpart:

```liquid
bg-base-50 dark:bg-base-900/20
text-neutral-900 dark:text-neutral-50
```

---

## Global Styles — Do Not Re-Declare

These are already applied globally via the design system. Use the semantic elements or classes; never re-declare their styles with Tailwind utilities unless you need an intentional override, for example a section which intends to stand out with unique typography within the context of its page. 

Expect the following required classes to be defined as a minimum:

| Element / Class |
|---|
| `.container` |
| `.eyebrow_text` |
| `.button-secondary` |
| `.card` |

Expect the following elements to be given a default styling as a minimum:

| Element / Class |
|---|
| `section` |
| `h1` |
| `h2` |
| `h3` |
| `h4` |
| `h5` |
| `h6` |
| `p` |
| `button` / `.button` |
| `table`, `th`, `td` |
| `blockquote` |
| `ul` |
| `li`, `dt`, `dd` |
| `ol` |
| `dl` |
| `code` |
| `img` |
| `a` |
| `input`, `textarea`, `select` |
| `label` |
| `figure`, `figcaption` |
| `cite`, `q` |
| `mark`, `small` |
| `summary` |
| `fieldset`, `legend` |


Check the following files to understand the real values these have been set to, or if they are missing to add new rules for them:

marketplace_builder\views\partials\library\<library-name>\themes\<theme-name>\config.liquid - for available colours for bg- and text- Tailwind CSS classes.
marketplace_builder\views\partials\library\<library-name>\themes\<theme-name>\variables.liquid - to understand the other variables being set
marketplace_builder\views\partials\library\<library-name>\themes\<theme-name>\custom_css.liquid - to see the real CSS rules being set for required classes and element tags.

## Typography

- Headings use `font-heading` (configured in `config.liquid`, references the heading font variable — never hard-code the font family name).
- Body text uses `font-body` (likewise configured).
- Two fonts are always configured: **heading** and **body**. Reference only via the utilities `font-heading` / `font-body`.
- Override heading defaults only when semantically required (e.g., an oversized hero `<h2>` that visually reads as `<h1>`). Use explicit size utilities in that case: `class="@md:!text-8xl"`.
- If the design asks that a font be used other than `heading` and `body` you can NOT rely on it being defined in the theme as a variable, so do NOT use a utility class for font-family other than `font-heading` or `font-body`.

e.g. Don't do:

```
<section>
  <h2 class="font-custom">Example</h2>
</section>
```

Could error since a font with name `custom` is not defined in all themes, so the utility class will not always be generated.

Instead use the theme skill to target specific element tag selectors with the font family needed.

## Animation — Data Attributes

Add motion attributes to all key content. They are picked up by `animation-variants.liquid`.

| Attribute | Apply to |
|---|---|
| `data-motion-group` | Any wrapper whose children animate as a coordinated group |
| `data-motion-text` | Individual text nodes — headings, paragraphs, labels |
| `data-motion-card` | Card, article, or panel elements that animate in as a unit |

Pattern:

```liquid
<section class="@container {{ this.variant }}" data-motion-group>
  <div class="container" data-motion-group>
    <h2 data-motion-text>{{ this.heading }}</h2>
    <p data-motion-text>{{ this.body }}</p>
    <div class="grid …" data-motion-group>
      {% for item in lists.items %}
        <article class="card …" data-motion-card>
          <h3 data-motion-text>{{ item.title }}</h3>
        </article>
      {% endfor %}
    </div>
  </div>
</section>
```

---

## Components — CTA Buttons

Use `components` (not list fields) for CTAs so editors can add or remove buttons independently.

### Rendering pattern

```liquid
{% if components %}
  {% for component_item in components %}
    {% assign component = component_item %}
    {% if component_item[1] %}
      {% assign component = component_item[1] %}
    {% endif %}
    {% assign component_data = component.data | default: component %}
    {% if component_data.button_title != blank %}
      {% assign button_class = 'button' %}
      {% if component_data.button_type == 'button-secondary' %}
        {% assign button_class = 'button-secondary' %}
      {% endif %}
      <a href="{{ component_data.button_link }}" class="{{ button_class }}">
        {{ component_data.button_title }}
      </a>
    {% endif %}
  {% endfor %}
{% endif %}
```

---

## Lists — Repeating Content

Use `lists` for any repeating content block (cards, FAQs, features, testimonials, stats, plan rows).

```liquid
{% for item in lists.cards %}
  <article data-studio-list="{{ item._list }}" class="card …" data-motion-card>
    <h3 data-motion-text>{{ item.card_title }}</h3>
    {% if item.card_description != blank %}
      <p>{{ item.card_description }}</p>
    {% endif %}
  </article>
{% endfor %}
```

- Always pass `data-studio-list="{{ item._list }}"` on the repeating root element so Siteglide Studio can target it.
- Always guard optional fields with `{% if item.field != blank %}`.

---

## Image Handling

### Optimising images with Liquid functions to auto-generate srcsets

To optimise images, use the Liquid img include (for asset optimization and automatic srcset generation). This uses Liquid to generate a srcset with multiple versions of the asset, using differently constructed links to the Cloudflare CDN to generate alternative cached and transformed versions of the source image.

DO NOT generate the <img> tag at all for image fields. The Liquid img include tag offers different layout options based on use/size: 'default/lg' (full screen hero OR use this if you cannot predict image size), 'default/base' (max width 640px, width required), and 'default/sm' (fixed width, width required, responsiveness will be based on 1x, 2x, 3x). You can see the HTML output of these includes in the following directory: \marketplace_builder\views\partials\layouts\img\

Use `{% include 'img_url', ... %}` tag when you only want one image version (e.g., in a background-image style: url('...') on a div). 

For `{% include 'img' %}`, use 'classes' for tailwind styling and 'width' to specify size. Parameters for {% include 'img' %} (multiple versions) are: path (required), layout (required), attributes, classes, layout (optional), and custom parameters like width (required for 'default/sm', 'default/base', or 'default/sm_bg' layouts, where 'default/base' is max-width and others are fixed-width). layout is a mandatory parameter, and can be set to 'default/sm', 'default/base', 'default/lg' or 'default/sm_bg'. If it is not clear what to set the layout parameter to, use 'default/lg' as this ensures no blur, though may be sub-optimal.

You can also use a Liquid capture tag to create a string of additional HTML attributes and pass those in: 

```
{% capture attributes %}loading="lazy" width="170"{% endcapture %}
{% include 'img', layout: 'default/base', width: '170', attributes: attributes, alt: 'image description' %}
```

The `{% include 'img_url' %}` (single version) can be used for background images directly in the style attribute of an HTML element, it has 2 parameters: path (required) and options (optional, refers to Cloudflare's Image Transformation options: https://developers.cloudflare.com/images/transform-images/transform-via-url/#options).

Other image advice:

- Use `loading="eager"` only for above-the-fold hero images.
- Always include an `alt` field in the frontmatter for every image field and provide a fallback chain via `| default:`.
- For background images, use Tailwind classes for everything apart from setting the actual image src e.g. bg-no-repeat
---

## Flowbite — Interactive Components

Use Flowbite's data-attribute API. Do not write custom JS for interactions that Flowbite covers.

### Accordion

```liquid
<div id="accordion-{{ uniq_id }}" data-accordion="collapse" class="flex flex-col gap-4">
  {% for item in lists.items %}
    <button
      type="button"
      id="accordion-heading-{{ forloop.index0 }}"
      data-accordion-target="#accordion-body-{{ forloop.index0 }}"
      aria-expanded="false"
      aria-controls="accordion-body-{{ forloop.index0 }}"
      class="flex w-full items-center justify-between gap-6 rounded-2xl bg-base-50 px-8 py-8 text-left dark:bg-base-900/20 border-0"
      data-motion-text
      data-motion-card
    >
      <span class="font-sans text-lg @md:text-xl font-medium text-neutral-900 dark:text-neutral-50">{{ item.question }}</span>
      <span data-accordion-icon class="material-symbols-outlined flex-none text-neutral-500 shrink-0 transition-transform duration-300 text-[20px] leading-none" aria-hidden="true">expand_more</span>
    </button>
    <div
      id="accordion-body-{{ forloop.index0 }}"
      class="hidden"
      aria-labelledby="accordion-heading-{{ forloop.index0 }}"
    >
      <div class="py-5 px-8">
        <p data-motion-text>{{ item.answer }}</p>
      </div>
    </div>
  {% endfor %}
</div>
```

---

## Swiper JS — Carousels

### Unique instance ID

Every carousel needs a unique ID to allow multiple carousels per page:

```liquid
{% capture sitebuilder_uniq_component_id %}sitegurus_component_{% increment sitegurus_gen_uniq_component_id %}{% endcapture %}
```

### Carousel markup

```liquid
<div class="swiper" data-sitebuilder-swiper="{{ sitebuilder_uniq_component_id }}">
  <div class="swiper-wrapper">
    {% for item in lists.slides %}
      <article class="swiper-slide …" data-motion-card>
        <!-- slide content -->
      </article>
    {% endfor %}
  </div>

  <button type="button" class="swiper-button-prev … after:!content-none after:!hidden" aria-label="Previous slide">
    <span class="material-symbols-outlined text-base leading-none">arrow_back</span>
  </button>
  <button type="button" class="swiper-button-next … after:!content-none after:!hidden" aria-label="Next slide">
    <span class="material-symbols-outlined text-base leading-none">arrow_forward</span>
  </button>

  <div class="mx-auto mt-2 flex w-full items-center justify-center">
    <div class="swiper-pagination !relative !left-auto !right-auto !top-auto !bottom-auto !mt-20 !inline-flex !w-fit items-center justify-center gap-2 rounded-2xl bg-base-200 dark:bg-base-900 p-3"></div>
  </div>
</div>
```

### Swiper JS config block

Place this inline `<script>` immediately after the `</section>` tag:

```liquid
<script>
  if (!window.sitebuilderSwiperConfig) { window.sitebuilderSwiperConfig = {}; }
  window.sitebuilderSwiperConfig['{{ sitebuilder_uniq_component_id }}'] = {
    initiated: false,
    config: {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 32,
      slidesPerGroup: 1,
      speed: 360,
      grabCursor: true,
      navigation: {
        nextEl: `[data-sitebuilder-swiper='{{ sitebuilder_uniq_component_id }}'] .swiper-button-next`,
        prevEl: `[data-sitebuilder-swiper='{{ sitebuilder_uniq_component_id }}'] .swiper-button-prev`
      },
      pagination: {
        el: `[data-sitebuilder-swiper='{{ sitebuilder_uniq_component_id }}'] .swiper-pagination`,
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + ' !m-0 !block !h-2 !w-2 !min-h-0 !rounded-md !border-0 !p-0 !opacity-100 !bg-base-700 !transition-all !duration-300 [&.swiper-pagination-bullet-active]:!bg-primary-500"></span>';
        }
      }
    }
  };
  if (typeof window.sitebuilderSwiperInit === 'function') { window.sitebuilderSwiperInit(); }
</script>
{% if context.exports.sitebuilder.sliderJSLoaded == blank %}
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>
  <script async src="{{ 'modules/module_357/js/sitegurus_sliders_javascript_api.1.min.js' | asset_url }}"></script>
  {% assign sliderJSLoaded = true %}
  {% export sliderJSLoaded, namespace: sitebuilder %}
{% endif %}
```

---

## YouTube Lite Embed

For video sections use `<lite-youtube>`:

```liquid
<lite-youtube videoid="{{ item.youtube_id }}" class="rounded-2xl overflow-hidden w-full aspect-video"></lite-youtube>
```

Add the script once per page using the same export-guard pattern as Swiper:

```liquid
{% if context.exports.sitebuilder.youtubeJSLoaded == blank %}
  <script async defer src="https://cdn.jsdelivr.net/npm/lite-youtube-embed/src/lite-yt-embed.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lite-youtube-embed/src/lite-yt-embed.css"/>
  {% assign youtubeJSLoaded = true %}
  {% export youtubeJSLoaded, namespace: sitebuilder %}
{% endif %}
```

---

## Variant System

The five variant classes remap `--color-primary-*` and `--color-secondary-*` tokens:

| Class | Primary source | Secondary source |
|---|---|---|
| `variant-1` | Primary (default) | Secondary (default) |
| `variant-2` | Secondary | Primary (swapped) |
| `variant-3` | Primary | Primary (both same) |
| `variant-4` | Tertiary | Neutral |
| `variant-5` | Neutral | Neutral |

- Always include the `variant` select field so editors can switch per-section.
- Use variants when they solve a real visual problem (e.g. a dark hero section needing `variant-2` so the CTA button doesn't clash).
- Never add more than 5 variant options — if a new mapping is needed, update the global CSS, not the section.

---

## Eyebrow / Badge Pattern

For section eyebrows:

```liquid
{% if this.eyebrow != blank %}
  <p class="eyebrow_text" data-motion-text>{{ this.eyebrow }}</p>
{% endif %}
```

For pill/badge style eyebrows:

```liquid
{% if this.eyebrow != blank %}
  <div class="mb-6 inline-flex items-center gap-2 rounded-full bg-base-50 px-4 py-1.5 dark:bg-base-900/20" data-motion-text>
    <span class="eyebrow_text">{{ this.eyebrow }}</span>
  </div>
{% endif %}
```

---

## Section Architecture Patterns

### Two-column header (heading left, CTA right)

```liquid
<div class="flex flex-col gap-8 @md:flex-row @md:items-end @md:justify-between" data-motion-group>
  <h2 data-motion-text>{{ this.heading }}</h2>
  <!-- CTA component render -->
</div>
```

### Centered header block

```liquid
<div class="mx-auto max-w-3xl text-center" data-motion-group>
  <p class="eyebrow_text" data-motion-text>{{ this.eyebrow }}</p>
  <h2 data-motion-text>{{ this.heading }}</h2>
  <p data-motion-text>{{ this.body }}</p>
</div>
```

### Split header (eyebrow + heading left, body right)

```liquid
<div class="flex flex-col gap-6 @md:mb-16 @lg:flex-row @lg:items-end @lg:justify-between @lg:gap-16" data-motion-group>
  <div class="max-w-xl">
    <p class="eyebrow_text" data-motion-text>{{ this.eyebrow }}</p>
    <h2 data-motion-text>{{ this.heading }}</h2>
  </div>
  <div class="max-w-sm">
    <p data-motion-text>{{ this.body }}</p>
  </div>
</div>
```

### Card grids

```liquid
<!-- 3-column card grid -->
<div class="mt-8 grid grid-cols-1 gap-6 @md:grid-cols-2 @lg:grid-cols-3" data-motion-group>
  {% for item in lists.cards %}
    <article data-studio-list="{{ item._list }}" class="card rounded-2xl border border-base-100 bg-base-50 dark:border-base-800 dark:bg-base-900/20" data-motion-card>
      …
    </article>
  {% endfor %}
</div>
```

---

## Accessibility — WCAG AA

- Minimum body text: `text-sm` (14 px) against a surface — ensure color contrast ratio ≥ 4.5:1.
- Interactive elements must have visible focus via the global `:focus-visible` ring (do not suppress with `outline-none` on buttons without a replacement ring).
- All images require a meaningful `alt` attribute or `alt=""` if decorative.
- Use semantic HTML: `<article>` for cards, `<nav>` for navigation, `<header>` / `<footer>` where appropriate, `aria-label` on icon-only buttons.
- Carousel prev/next buttons need `aria-label="Previous slide"` / `aria-label="Next slide"`.
- Accordion triggers need `aria-expanded` and `aria-controls` (Flowbite handles state but the initial values must be in markup).

---

## What NOT to Do

- **No global snippets** (`{% include 'partials/…' %}`) — increases update-shipping difficulty when dependencies exist between files.
- **No hard-coded hex values** — always use token variables.
- **No hard-coded font family names** — always use `font-heading` / `font-body`.
- **No viewport breakpoints** (`sm:`, `md:`, `lg:`) inside sections — use container query equivalents (`@sm:`, `@md:`, `@lg:`).
- **No inline `style=""` attributes** for colours, spacing, or typography — use Tailwind utilities.
- **No unnecessary variants** — only add a variant option when it resolves a real visual or contrast issue.
- **No duplicate global styles** — do not add Tailwind utilities that re-declare what h1–h6, p, button, or .container already provide.
- **No half-finished feature lists** — if a feature (e.g., dark mode toggle, animation) is not fully implemented, omit it entirely.

---

## Full Section Template

```liquid
---
metadata:
  name: Studio Kit <Name>
  class: section
  category: content
  lists:
    - name: Items
      type: items
      fields:
        - { id: title,       type: text,         label: Title,       default: 'Item title', is_title: true }
        - { id: description, type: textarea,      label: Description, default: 'Supporting text.' }
        - { id: icon,        type: text,          label: Icon Name,   default: 'star' }
        - { id: image,       type: image_picker,  label: Image,       default: '' }
        - { id: image_alt,   type: text,          label: Image Alt,   default: '' }
  fields:
    - { id: eyebrow,  type: text,     label: Eyebrow,  default: 'Section label' }
    - { id: heading,  type: textarea, label: Heading,  default: 'Section heading' }
    - { id: body,     type: textarea, label: Body,     default: 'Supporting paragraph.' }
    - id: variant
      type: select
      label: Variant
      default: variant-1
      options:
        - { label: Variant 1, value: variant-1 }
        - { label: Variant 2, value: variant-2 }
        - { label: Variant 3, value: variant-3 }
        - { label: Variant 4, value: variant-4 }
        - { label: Variant 5, value: variant-5 }
  hide_on: []
  requires: []
  settings: []
  components:
    - name: Button
      type: cta_button
      fields:
        - { id: button_title, type: text,   label: Button Title, default: 'Get started', is_title: true }
        - { id: button_link,  type: text,   label: Button Link,  default: '#' }
        - id: button_type
          type: select
          label: Button Type
          default: button
          options:
            - { label: Button,           value: button }
            - { label: Button Secondary, value: button-secondary }
      availableOn:
        - fields
        - items
---
<section class="@container {{ this.variant }}" data-motion-group>
  <div class="container">

    <div class="max-w-3xl" data-motion-group>
      {% if this.eyebrow != blank %}
        <p class="eyebrow_text" data-motion-text>{{ this.eyebrow }}</p>
      {% endif %}
      <h2 data-motion-text>{{ this.heading }}</h2>
      {% if this.body != blank %}
        <p data-motion-text>{{ this.body }}</p>
      {% endif %}
    </div>

    <div class="mt-12 grid grid-cols-1 gap-6 @md:grid-cols-2 @lg:grid-cols-3" data-motion-group>
      {% for item in lists.items %}
        <article data-studio-list="{{ item._list }}" class="card rounded-2xl bg-base-50 p-6 dark:bg-base-900/20" data-motion-card>
          {% if item.image != blank %}
            <img
              src="{% if item.image contains 'http' %}{{ item.image }}{% else %}{{ item.image | asset_url }}{% endif %}"
              alt="{{ item.image_alt | default: item.title | default: '' }}"
              class="mb-4 h-48 w-full object-cover"
              loading="lazy"
            >
          {% elsif item.icon != blank %}
            <span class="material-symbols-outlined mb-4 block text-primary-500">{{ item.icon }}</span>
          {% endif %}
          <h3 data-motion-text>{{ item.title }}</h3>
          {% if item.description != blank %}
            <p data-motion-text>{{ item.description }}</p>
          {% endif %}
          {% if item.components %}
            <div class="mt-10 flex flex-wrap items-center gap-4" data-motion-group>
              {% for component_item in item.components %}
                {% assign component = component_item %}
                {% if component_item[1] %}{% assign component = component_item[1] %}{% endif %}
                {% assign component_data = component.data | default: component %}
                {% if component_data.button_title != blank %}
                  {% assign button_class = 'button' %}
                  {% if component_data.button_type == 'button-secondary' %}{% assign button_class = 'button-secondary' %}{% endif %}
                  <a href="{{ component_data.button_link }}" class="{{ button_class }}">{{ component_data.button_title }}</a>
                {% endif %}
              {% endfor %}
            </div>
          {% endif %}
        </article>
      {% endfor %}
    </div>

    {% if components %}
      <div class="mt-10 flex flex-wrap items-center gap-4" data-motion-group>
        {% for component_item in components %}
          {% assign component = component_item %}
          {% if component_item[1] %}{% assign component = component_item[1] %}{% endif %}
          {% assign component_data = component.data | default: component %}
          {% if component_data.button_title != blank %}
            {% assign button_class = 'button' %}
            {% if component_data.button_type == 'button-secondary' %}{% assign button_class = 'button-secondary' %}{% endif %}
            <a href="{{ component_data.button_link }}" class="{{ button_class }}">{{ component_data.button_title }}</a>
          {% endif %}
        {% endfor %}
      </div>
    {% endif %}

  </div>
</section>
```

## Final Pass

On a final pass:

- make sure no elements of the section are overflowing the section container.
- check accessibility good practice