---
layout: templates/1
max_deep_level: 1
metadata:
  name: Agency Home
  studio:
    order:
    - live-updating-product-list
    - default-contact-form
    sections:
      default-contact-form:
        id: default-contact-form
        data: {}
        name: Default Contact Form
        type: legacy_dynamic
        title: default-contact-form
        system:
          id: '1'
          type: default
          layout: default-contact-form
          admin_link: "/cms/forms"
          liquid_tag: form
          live_updates: false
          section_name: Default Contact Form
          schema_selector:
            module_id: module_s1
            sub_module_id: '1'
          physical_file_path: views/partials/layouts/forms/form_1/default-contact-form.liquid
        mapping: {}
        settings:
          id: '1'
        components: {}
        component_order: []
      live-updating-product-list:
        id: live-updating-product-list
        data: {}
        name: Live-updating product list
        type: legacy_dynamic
        title: live-updating-product-list
        system:
          id:
          type: list
          layout: live-updating-product-list
          admin_link: "/ecommerce/products"
          liquid_tag: ecommerce/products
          live_updates: true
          section_name: Live-updating product list
          schema_selector:
            module_id: module_14
            sub_module_id: '1'
          physical_file_path: views/partials/layouts/modules/module_14/product/live-updating-product-list/list/wrapper.liquid
        mapping: {}
        settings:
          cart_url: "/cart"
          item_ids: []
          per_page: 20
          sort_type: properties.release_date
          sort_order: ASC
          use_search: false
          category_ids: []
          use_adv_search: false
          show_pagination: false
          sort_type_other: ''
          pagination_layout: default
          price_options_floor: 500
          price_options_number: 5
          filters_values_from_URL: false
          price_options_increment: 500
          product_category_parent: ''
          show_display_price_crossed_out: false
        components: {}
        component_order: []
  enabled: true
  file_type: page
  last_edit: 1782391680618
  is_homepage: true
redirect_code: 301
redirect_to: "/"
redirect_url: "/"
searchable: true
---
{% include 'modules/siteglide_system/constants' -%}