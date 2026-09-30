---
metadata:
  settings:
    - id: price_options_number
      type: number
      label: Price Options Number
      default: 5
    - id: show_display_price_crossed_out
      type: boolean
      label: Show Display Price Crossed Out
      default: true
    - id: product_category_parent
      type: text
      label: Product Category Parent
      default:
---
{% comment %}Frontmatter metadata.settings is schema for settings. To consume the settings in Liquid file body, see below:{% endcomment %}
{{price_options_number.filters_values_from_URL}}
{{show_display_price_crossed_out}}
{{product_category_parent}}