---
name: build-theme
description: >-
  Creates or updates a Siteglide Studio theme for the StudioKit library. Themes can be swapped out to create big visual changes in how pages look. Therefore they need to set Tailwind CSS variables and robust default CSS for typography etc. 
compatibility: >-
  Some rules in this skill are only relevant when the user intends to build using the framework of the StudioKit library. If it's not clear from context whether they are using the StudioKit library, prompt the user to clarify. Note that a library may have started as StudioKit and be renamed, but the user may still want to follow StudioKit guidance and use this skill.
---
# What is the job of a theme?

In Siteglide Studio version > 2.0.0, libraries provide a full kit for building a site with a particular workflow. Within a library is a folder of themes, of which one can be made the default theme that current pages will run off. Changing theme should be able to fully change the visuals of the page, meaning it's important that themes set Tailwind CSS variables and robust default CSS for typography, shadows, border radiuses etc. with sections themselves only containing structural CSS classes for example grid, flexbox, max-width etc. and colour classes which respect the variables defined in the theme.

# What is the Studio Kit?

The Studio Kit is Siteglide's flagship library. Assume this will be used unless the user says differently, or it is not present in the folder structure. 

It can be found at marketplace_builder\views\partials\library\studiokit

# TailwindCSS

StudioKit library uses Tailwind CSS via the Tailwind Play CDN v4. It uses TailwindCSS version > 4

Tailwind CSS code is written in separate Liquid partial files, and processed by the server at runtime to create a single <style type="text/tailwindcss"></style> element which is injected into the page. This can be read by the Tailwind Play CDN JS to generate a tree-shaken stylesheet for the page. 

So when validating, understand that the file will be created in this order:

- Colours and fonts variables
- Other variables
- Custom CSS

# Themes folder structure

marketplace_builder/views/partials/library/<library-name>/themes/

Each theme has a named folder of its own of <theme-name>/

Within that is:

- config.liquid (main settings for the theme as yml frontmatter)
  - metadata
    - name
    - version
    - tailwind
      - fonts (important)
        - href
        - type
        - font-family
      - colors (important)
        - steps
      - color_variants
- custom_css.liquid (main source for Tailwind CSS rules)
- variables.liquid (what would be inside @theme() in TailwindCSS other than colour and font variables, no need in explicitly write @theme() wrapper as the server will render that around both variables and font and colours.)
- variants.liquid (goes at end of text/tailwindcss file, to define variant color variable swaps when nested within the scope of a section with a class like `.variant-1`.)

# Examples

See examples of the files below if needed:

- [Theme config file](references/theme_config_file_example.md)
- [Theme custom CSS](references/theme_custom_css_example.md)
- [Theme variables](references/theme_variables_file_example.md)

# Variables

## When to use

Create Tailwind CSS 4 variables for as many design variables as possible. Then use those variables as much as possible within custom CSS. Minimize use of arbitrary classes if you can, but this is a guideline, not a rule.

## Required Fonts

You must create font variables, especially one suitable for headings and one suitable for body text. This is done in the theme config.liquid file's yaml frontmatter. The following is an example, please use the appropriate font-families according to context, although it's mandatory that there should an array item for a font with the name `Heading` and one with the name `Body`:

```
---
tailwind:
  fonts:
    - href: family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800
      name: Heading
      type: gfonts
      font_family: DM Sans
    - href: family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900
      name: Body
      type: gfonts
      font_family: Inter
---
```

Additional fonts may be added, in addition to heading and body, but sections can NOT rely on these being defined, so won't use utility classes directly. Instead the theme CSS should explicitly define CSS rules which apply these font-families to appropriate HTML element tag selectors.

If the `type` of the font in the config.liquid file is `gfonts` the server will automatically generate the loading of the font from Google fonts. The href is then a fragment of the link to google fonts which explains which family and weights to load. 

The *server* will render this to the following example before compilation (irrelevant lines have been skipped for the example, and lines may appear in a different order), so you don't need to do this, but it should be helpful to know what to expect when validating:

```
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Inter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<style type="text/tailwindcss">
@theme {
  --font-heading: 'DM Sans';
  --font-body: 'Inter';
}
</style>
```

## Required Color Variables

All themes within StudioKit MUST support these colours, with steps 50,100,200,300,400,500,600,700,800,900,950

| Token | Usage |
|---|---|
| `primary-50` … `primary-950` | Brand / CTA color — remapped by variants |
| `secondary-50` … `secondary-950` | Accent color — remapped by variants |
| `tertiary-50` … `tertiary-950` | Third accent |
| `neutral-50` … `neutral-950` | Text, borders, subtle surfaces. These should *usually* be true neutrals with a low saturation, though this is up to the designer. |
| `base-50` … `base-950` | Can be used for page backgrounds, card surfaces, dividers, especially where the design demands similar backgrounds across a collection of layouts. These are unlikely to be as high saturation as the primary / secondary / tertiary colours, but may be a little warmer than the strictly "neutral" color. |

## Shadows

It's normally good practice to set Tailwind's shadow variables in the theme's variables.liquid file to match the design, then the sections use shadow utility classes to apply them. This helps theme's to apply consistent shadow styling to any section.

## Border Radius

Usually it's a good idea to set values for Tailwind's border-radius variables to match the design.

## Highlights

If a design contains highlighted text, consider: Does every element of this type in the page have a highlighted look? If so, this is best achieved by targeting the specific tag in the CSS. Or if necessary, modifying that selector for elements nested within a required class like card. In summary, if there is a consistent pattern, handle though targeting tags. This means the highlighs will potentially dissapear if the theme is swapped out, which is a good outcome.

Else, if highlighted text is applied inconsistently, but with the implied purpose of accents or emphasis, focus on setting styles targeting the <mark> tag, and add a CSS comment suggesting sections should employ <mark> to achieve that kind of effect. This means the highlights will remain, looking different, when the theme is switched, which is a good outcome if it preserves emphasis. If the highlight appears in the middle of text (but not around the first word), a rich text field should be considered, to allow the client to easily decide where that <mark> should go.

Either way, make sure variables exist which can be used in the CSS defining the properties of highlighted text.

# @apply

Use Tailwind CSS's `@apply` in theme `custom_css` where needed — it can help move utility classes from sections into the theme.

**Exception:** When working with **required classes** (see below), never `@apply` a required class *name* (e.g. `@apply container`) because apply only allows TailwindCSS utility classes. See **@apply and required classes** under Required CSS.

# Writing Theme CSS

Guidance: CSS should always target a semantic HTML element tag or a required class where possible. This is the golden rule for making sections work well when theme is switched.

Where possible, set TailwindCSS variables to match the theme design, as this will also help keep consistency when the developer changes the utility classes on the sections.

## Documentation

It may be helpful to write concise CSS comments throughout the custom_css file, to guide humans and AI agents to understand what doesn't need to be defined in sections because the theme CSS has it covered.

## Required CSS

### Required classes

You must write CSS rules for the following classes in the `custom_css` file. They must be inside `@layer components {}`.

#### @apply and required classes

**When writing rules for `.container`, `.card`, `.button-secondary`, `.eyebrow_text`, or any class in the table below:**

- **Allowed:** `@apply` Tailwind **utility** classes *inside* the required-class rule.
- **Forbidden:** `@apply` a **required class name** on any selector (e.g. `@apply container`, `@apply card`). Those names are custom component classes, not Tailwind utilities — Tailwind errors with an unknown utility.

**Wrong** (will error):

```css
section {
  @apply card;
}
```

**Right** (define the class with utilities):

```css
@layer components {
  .container {
    @apply mx-auto max-w-[96rem] px-8 py-20;
  }
}
```

**Also right** (plain CSS, no `@apply`):

```css
@layer components {
  .container {
    margin-inline: auto;
    max-width: 96rem;
  }
}
```

| Element / Class | Suggested utilities (use inside the class rule via `@apply`, or as plain CSS — not as `@apply` class names elsewhere) |
|---|---|

| `.container` | mx-auto max-w-[96rem] px-8 py-20 md:px-12 md:py-24 lg:px-16 |
| `.eyebrow_text` | text-sm font-semibold uppercase tracking-[0.12em] base-600 opacity-60 |
| `.button-secondary` | Transparent bg, border neutral-400, same padding/radius as button |
| `.card` | Use your judgement. For some designs, nth-of-type will be useful for centrally setting cards with a range of colours. |

`font-body` and `font-heading` should not need defining as classes if the rules around configuring font-variables are followed. These will mean that Tailwind will automatically create utility classes for these. 

### Required element styling

You must provide default styling for the following elements in the @layer base {} CSS layer. In the same selector, also target a class with the same name as the element tag name, to allow styling one element as if it were another: e.g. a selector could be p,.p {}

Shared styles between all headings should be handled with one rule e.g. h1,h2,h3,h4,h5,h6,.h1,.h2,.h3,.h4,.h5,.h6 {}

| Element / Class | optional guidance |
|---|---|
| `h1` | 5xl → 7xl, font-medium, tracking-[-0.06em], leading-[0.95], mb-8 |
| `h2` | 3xl → 5xl, font-medium, tracking-[-0.05em], leading-[1], mb-6 |
| `h3` | 2xl → 3xl, font-medium, tracking-[-0.04em], leading-[1.1], mb-4 |
| `h4` | lg → xl, font-medium, tracking-[-0.03em], mb-3 |
| `h5` | base → lg, font-medium, tracking-tight, mb-2 |
| `h6` | xs → sm, uppercase, tracking-[0.12em], neutral-500, mb-2 |
| `p` | neutral-700 dark:neutral-50, md:text-lg, max-w-md, leading-[28px], font-light |
| `button` / `.button` | Primary color bg, rounded-[2rem], px-8 py-5, text-sm font-medium |
| `table`, `th`, `td` | Collapse, neutral text, border-b on cells |
| `blockquote` | |
| `ul` ||
| `li`, `dt`, `dd` | These should be nested so that different list types style their children differently. Increasing list nesting be visually clear with list-style-type|
| `ol` ||
| `dl` ||
| `code` ||
| `img` | max-w-full, h-auto, rounded-[2rem] |
| `a` ||
| `input`, `textarea`, `select`  ||
| `label`||
| `figure`, `figcaption` ||
| `cite`, `q` ||
| `mark`, `small` ||
| `summary` ||
| `fieldset`, `legend` ||
| `section` | bg-base-100 dark:bg-base-950, w-full, mx-auto, min-[2560px]:max-w-[130rem] |

## Styling 3rd party components

Since the create-section skill recommends using certain javascript libraries, data-attribute (and other attribute e.g. aria) markup from those libraries should be targeted by a theme's CSS reliably. This is useful for allowing the theme to reliably style features like accordions which will be common components in sections.

| Feature | 3rd party | special rules |
| --- | --- | --- |
| Accordion | Flowbite | also target `aria-expanded` |
| Drawer | Flowbite ||
| Dropdowns | Flowbite ||
| Modal | Flowbite ||
| Popover | Flowbite ||
| Calendar | Full Calendar ||
| Slider / Carousel | Swiper JS | |
| Speed Dial | Flowbite | |
| Toast | Flowbite | |
| Tooltips | Flowbite | |
| Youtube Embed | lite-youtube | |
| Icons | Material Symbols font | Can target classes e.g. `.material-symbols-outlined` | 

## Validate `custom_css.liquid`

Before finishing `custom_css.liquid`, verify:

- [ ] Required classes (`.container`, `.card`, `.button-secondary`, `.eyebrow_text`) are defined in `@layer components {}`
- [ ] No selector uses `@apply` with a required class name (e.g. `@apply container`, `@apply card`)

## How to decide if classes should go in theme custom_css or in the section?

1. Is the class needed for structure? e.g. flexbox, grid, columns, padding? 
=> Put it in the section.
2. Is the class one of the required classes e.g. `.container`, or does it match a tagname e.g. `.h1`?
=> Put it in the theme custom_css
3. Are the classes to describe how a background image should be sized/ positioned?
=> Put in section unless there are many similar background images and it makes sense to create a new class.
4. Text size and colour? 
=> Make sure there are defaults in theme, but you can override if the section intends to stand out from the rest of the theme.
5. Other colours?
=> Goes in section, but make sure it matches one of the required colours generated by theme, and there is enough contrast between adjacent colours where appropriate for accessibility. 
6. Is the class needed for DRY best-practice, or is it helpful to achieve consistency across sections?
=> *Can* go in theme, but only as a last resort! Studio is designed so that you can change theme and sections still look good, so doing this will put you at a disadvantage as the class may not be defined when we switch to another theme. Consider, is there a way to target an HTML tagname, required class or a combined selector of these which could be used instead?

## Variants 

Variants allow nested CSS to scope alternative "swaps" of colour variables within a variant-1, variant-2, variant-3 etc. class in the <section> element.

CSS should be added in the theme's variants.liquid file. This is the last of the partials which will be included in the final <style type="text/tailwindcss"></style> tag.

In previous examples, this may be added at the end of custom_css, but it is better to move it. 

Variants should also be registered in the metadata.tailwind.color_variants.color_variants array in the config.liquid file, so the options appear to the user.

## Hover, active, focus etc. states

Design input will often not define how these should be but they are important for accessibility. Attempt to set in theme initially if possible, targeting the semantic HTML elements, though sections can also define them when this won't work. 

Attempt to validate if the hover / active / focus state will cause the text to risk losing constrast with the background, and correct for this. 

# Setting and Changing Default Theme

Whether you have just created a new theme, or modified an existing one, check if the theme is currently default. 

This is controlled in the marketplace_builder\views\partials\library\studiokit\config.liquid file using the metadata.default_theme key in the yml frontmatter. 

ASK the user if they'd like to switch the default library theme to the newly updated theme you worked on?

If they do, replace the value in the metadata.default_theme with the directory name of your theme e.g. <theme-name>

Currently changing the default-theme is the only way to make a theme truly "live" on the front-end of the website, but soon it will be supported to run a different theme from a specific page template in the views/partials/layouts/templates folder which in future will override the default theme for pages with that template.