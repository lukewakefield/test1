{
  "module_2": {
    "title": "Menu",
    "description": "Quickly and easily add a Menu to your site. Place inside a Header, Footer or straight in the Page Template.",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745424/modules/module_86/admin/library_thumbs/menu-headers.png",
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/menu-builder",
    "sub_modules": {
      "1": {
        "hide_on": ["footer", "pages"],
        "name": "Headers",
        "liquid_tag": "menu",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Menu ID",
            "type": "menu_id",
            "default": "",
            "required": true,
            "studio_type": "dynamic_datasource_single",
            "studio_datasource_id": "modules/siteglide_system/menu"
          }
        ],
        "siteglide_module_id": "2",
        "special_implementation_instructions": "The required files have been added to your site's file structure!<br><br>You can now use a Liquid tag like the one below to output your layout (remember to add a Menu ID):<br><br>"
      },
      "2": {
        "hide_on": ["header", "pages"],
        "name": "Footers",
        "liquid_tag": "menu",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Menu ID",
            "type": "menu_id",
            "default": "",
            "required": true,
            "studio_type": "dynamic_datasource_single",
            "studio_datasource_id": "modules/siteglide_system/menu"
          }
        ],
        "siteglide_module_id": "2"
      },
      "3": {
        "hide_on": ["header", "footer", "pages"],
        "name": "Sidebars",
        "liquid_tag": "menu",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Menu ID",
            "type": "menu_id",
            "default": "",
            "required": true,
            "studio_type": "dynamic_datasource_single",
            "studio_datasource_id": "modules/siteglide_system/menu"
          }
        ],
        "siteglide_module_id": "2"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_2/",
      "marketplace": false
    }],
    "admin_link": "/modules/2"
  },
  "module_3": {
    "title": "Blog",
    "description": "Create and manage Blog articles on your website with ready-made categories for filtering, searching and archiving",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745422/modules/module_86/admin/library_thumbs/blog.png",
    "required_modules": [
      {
        "name": "Siteglide Blog",
        "id": "module_3",
        "key": 3
      }
    ],
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/blog",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "siteglide_module_id": "3"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_3/",
      "marketplace": false
    }],
    "admin_link": "/modules/3",
    "hide_on": ["header"]
  },
  "module_12": {
    "title": "Events",
    "description": "Attract attendees for both online and physical Events. Display information with a range of views including list, calendar and map while managing tickets and orders",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745422/modules/module_86/admin/library_thumbs/events.png",
    "required_modules": [
      {
        "name": "Siteglide Events",
        "id": "module_12",
        "key": 12
      }
    ],
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/events",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "siteglide_module_id": "12"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_12/",
      "marketplace": false
    }],
    "admin_link": "/modules/12",
    "hide_on": ["header"]
  },
  "module_4": {
    "title": "Slider",
    "description": "Add images and content to your Slides in Admin and display on a Site",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745421/modules/module_86/admin/library_thumbs/slider.png",
    "required_modules": [
      {
        "name": "Siteglide Slider",
        "id": "module_4",
        "key": 4
      }
    ],
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/slider",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "siteglide_module_id": "4"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_4/",
      "marketplace": false
    }],
    "admin_link": "/modules/4",
    "hide_on": ["header"]
  },
  "module_10": {
    "title": "FAQ",
    "description": "Create an FAQ section for websites with ease, then customise as required",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745422/modules/module_86/admin/library_thumbs/faq.png",
    "required_modules": [
      {
        "name": "Siteglide FAQ",
        "id": "module_10",
        "key": 10
      }
    ],
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/vTdS-faq",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "siteglide_module_id": "10"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_10/",
      "marketplace": false
    }],
    "admin_link": "/modules/10",
    "hide_on": ["header"]
  },
  "module_8": {
    "title": "Testimonials",
    "description": "Quickly add client Testimonials to your sites.",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745423/modules/module_86/admin/library_thumbs/testimonials.png",
    "required_modules": [
      {
        "name": "Siteglide Testimonials",
        "id": "module_8",
        "key": 8
      }
    ],
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/testimonials",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "siteglide_module_id": "8"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_8/",
      "marketplace": false
    }],
    "admin_link": "/modules/8",
    "hide_on": ["header"]
  },
  "module_14": {
    "title": "eCommerce",
    "description": "Create an eCommerce shop with Product List & Detail Pages. Also includes Cart layouts, Orders List layouts (Secure Zone Required) & Order Detail layouts. See Forms module area for compatible Checkout layouts.",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745421/modules/module_86/admin/library_thumbs/ecommerce.png",
    "enabled": true,
    "coming_soon": false,
    "required_modules": [
      {
        "name": "Siteglide eCommerce",
        "id": "module_14/product",
        "siteglide_module_id": "14/product",
        "key": 14
      }
    ],
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/ecommerce",
    "sub_modules": {
      "1": {
        "name": "Product List",
        "liquid_tag": "ecommerce/products",
        "allow_default_settings": true,
        "siteglide_module_id": null,
        "layouts_locations": [{
          "install_type": "folder",
          "pfp": "/layouts/modules/module_14/product/",
          "marketplace": false
        }],
        "admin_link": "/ecommerce/products"
      },
      "2": {
        "name": "Product Detail",
        "liquid_tag": "ecommerce/products",
        "allow_default_settings": true,
        "siteglide_module_id": "14/product",
        "layouts_locations": [{
          "install_type": "folder",
          "pfp": "/layouts/modules/module_14/product/",
          "marketplace": false
        }],
        "admin_link": "/ecommerce/products"
      },
      "3": {
        "name": "Cart",
        "liquid_tag": "ecommerce/cart",
        "allow_default_settings": false,
        "siteglide_module_id": null,
        "layouts_locations": [{
          "install_type": "folder",
          "pfp": "/layouts/modules/module_14/product/",
          "marketplace": false
        }],
        "admin_link": "/ecommerce/products"
      },
      "4": {
        "name": "Order Detail",
        "liquid_tag": "ecommerce/order_details",
        "allow_default_settings": false,
        "siteglide_module_id": "14/order",
        "define_new_settings": [
          {
            "key": "slug",
            "name": "Order Slug",
            "type": "order_id",
            "default": "00000000000",
            "required": false
          }
        ],
  
        "special_implementation_instructions": "The required files have been added to your site's file structure!<br><br>The Settings link below will allow you to set this as the default Detail Layout for all Orders.<br><br>You could also use the Liquid example below to output a specific order within a User Account Area- make sure to pass in a valid Order slug.",
        "admin_link": "/ecommerce/orders"
      },
      "5": {
        "name": "Currency Changer",
        "liquid_tag": "currency_changer",
        "allow_default_settings": false,
        "siteglide_module_id": null
      },
      "6": {
        "name": "Tax Code Changer",
        "liquid_tag": "tax_code_changer",
        "allow_default_settings": false,
        "siteglide_module_id": null,
        "admin_link": "/ecommerce/tax-codes"
      },
      "7": {
        "hide_on": ["header", "footer", "pages"],
        "name": "Past Orders List",
        "liquid_tag": "user_orders",
        "allow_default_settings": false,
        "siteglide_module_id": null,
        "define_new_settings": [
          {
            "key": "sort_order",
            "name": "Sort Order",
            "type": "string",
            "studio_type": "select",
            "studio_options": [
              {
                "label": "Ascending",
                "value": "ASC"
              },
              {
                "label": "Descending",
                "value": "DESC"
              }
            ],
            "default": "created_at",
            "required": false
          },
          {
            "key": "sort_type",
            "name": "Sort Type",
            "type": "string",
            "studio_type": "select",
            "studio_options": [
              {
                "label": "Status",
                "value": "properties.module_field_14/order_3"
              },
              {
                "label": "Billing Address",
                "value": "properties.module_field_14/order_4"
              },
              {
                "label": "Shipping Address",
                "value": "properties.module_field_14/order_5"
              },
              {
                "label": "Shipping Method ID",
                "value": "properties.module_field_14/order_7"
              },
              {
                "label": "ID",
                "value": "id"
              }
            ],
            "default": "created_at",
            "required": false
          },
          {
            "key": "show_pagination",
            "name": "Show Pagination",
            "type": "boolean_string",
            "studio_type": "boolean",
            "default": "true",
            "required": false
          }
        ],
        "layouts_locations": [{
          "install_type": "file",
          "pfp": "/layouts/modules/module_5/user_orders/",
          "marketplace": false
        }],
        "admin_link": "/ecommerce/orders"
      },
      "8": {
        "name": "eCommerce Form Confirmation",
        "liquid_tag": "form_confirmation",
        "allow_default_settings": false,
        "define_new_settings": [],
        "siteglide_module_id": null,
        "special_implementation_instructions": "The required files have been added to your site's file structure!<br><br>You can use the Liquid example below to output this on a Page. It will generally only appear for Users who have just submitted a Form and have been redirected.",
        "layouts_locations": [{
          "install_type": "file",
          "pfp": "/layouts/form_confirmation/",
          "marketplace": false
        }]
      }
    },
    "hide_on": ["header"]
  },
  "module_s1": {
    "title": "Forms",
    "description": "Automatically build a Form layout from one of your forms with styling already applied.",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745422/modules/module_86/admin/library_thumbs/forms.png",
    "enabled": true,
    "coming_soon": false,
    "install_type": "form_layout",
    "siteglide_docs": "https://help.siteglide.com/en/article/forms-getting-started-4i929m/",
    "sub_modules": {
      "1": {
        "name": "CMS Forms",
        "liquid_tag": "form",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Form ID",
            "type": "form_id",
            "default": "",
            "required": true,
            "studio_type": "dynamic_datasource_single",
            "studio_datasource_id": "form_config"
          },
          {
            "key": "form_update_behaviour",
            "name": "Static or Dynamic",
            "type": "form_update_behaviour",
            "default": "static",
            "required": false,
            "virtual": true,
            "studio_type": "hidden"
          }
        ],
        "siteglide_module_id": null
      },
      "2": {
        "name": "WebApp Item Create Forms",
        "liquid_tag": "webapp_form",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "WebApp ID",
            "type": "webapp_id",
            "default": "",
            "required": true
          },
          {
            "key": "form_update_behaviour",
            "name": "Static or Dynamic",
            "type": "form_update_behaviour",
            "default": "static",
            "required": false,
            "virtual": true
          }
        ],
        "siteglide_module_id": null,
        "hide_on": ["header", "footer", "pages"]
      },
      "3": {
        "name": "WebApp Item Update Forms",
        "liquid_tag": "webapp_form_edit",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "WebApp ID",
            "type": "webapp_id",
            "default": "",
            "required": true
          },
          {
            "key": "form_update_behaviour",
            "name": "Static or Dynamic",
            "type": "form_update_behaviour",
            "default": "static",
            "required": false,
            "virtual": true
          }
        ],
        "siteglide_module_id": null,
        "special_implementation_instructions": "It's recommended that this tag be outputted inside a WebApp item layout. It will then inherit the WebApp's ID and creator ID.<br><br>The user must be logged in and have permission to edit the WebApp item (either they must be the creator or the WebApp must have 'anyone_can_edit setting' set to true) in order for the layout to render.",
        "hide_on": ["header", "footer", "pages"]
      },
      "4": {
        "name": "Module / WebApp Item Delete Forms",
        "liquid_tag": "webapp_delete",
        "allow_default_settings": false,
        "define_new_settings": [],
        "siteglide_module_id": null,
        "special_implementation_instructions": "It's recommended that this tag be outputted inside a WebApp item layout. It will then inherit the WebApp's ID and creator ID.<br><br>The user must be logged in and have permission to edit the WebApp item (either they must be the creator or the WebApp must have 'anyone_can_edit setting' set to true) in order for delete API call to be successful, but the layout will render either way.",
        "hide_on": ["header", "footer", "pages"]
      },
      "5": {
        "name": "Module Item Create Forms",
        "liquid_tag": "module_form",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Module ID",
            "type": "module_id",
            "default": "",
            "required": true
          },
          {
            "key": "form_update_behaviour",
            "name": "Static or Dynamic",
            "type": "form_update_behaviour",
            "default": "static",
            "required": false,
            "virtual": true
          }
        ],
        "siteglide_module_id": null,
        "hide_on": ["header", "footer", "pages"]
      },
      "6": {
        "name": "Module Item Update Forms",
        "liquid_tag": "module_form_edit",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Form ID",
            "type": "module_id",
            "default": "",
            "required": true
          },
          {
            "key": "form_update_behaviour",
            "name": "Static or Dynamic",
            "type": "form_update_behaviour",
            "default": "static",
            "required": false,
            "virtual": true
          }
        ],
        "siteglide_module_id": null,
        "hide_on": ["header", "footer", "pages"]
      },
      "7": {
        "name": "eCommerce Themed Forms",
        "liquid_tag": "ecommerce/checkout",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Form ID",
            "type": "form_id",
            "default": "",
            "required": true,
            "studio_type": "dynamic_datasource_single",
            "studio_datasource_id": "form_config",
            "dev_notes": "A bit of a time-saver was added here. The variable should be form_id key, but this didn't jump through the UI hopps very well, so we're making it ID and then adding a business rule on render to assign to form_id temp."
          },
          {
            "key": "form_update_behaviour",
            "name": "Static or Dynamic",
            "type": "form_update_behaviour",
            "default": "static",
            "required": false,
            "virtual": true,
            "studio_type": "hidden"
          }
        ],
        "siteglide_module_id": null
      }
    },
    "layouts_locations": [{
      "install_type": "form_layout",
      "pfp": "/layouts/forms/",
      "marketplace": false
    }],
    "admin_link": "/cms/forms",
    "hide_on": ["header"]
  },
  "module_5": {
    "title": "Secure Zones",
    "description": "Add a login form or logout button layout. See Forms module area for compatible sign up form layouts.",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745422/modules/module_86/admin/library_thumbs/secure-zones.png",
    "enabled": true,
    "coming_soon": false,
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/secure-zones",
    "sub_modules": {
      "1": {
        "name": "Login Forms",
        "liquid_tag": "login_form",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "redirect",
            "name": "Redirect",
            "type": "string",
            "default": "/my-account",
            "required": true
          }
        ],
        "siteglide_module_id": null,
        "layouts_locations": [{
          "install_type": "file",
          "pfp": "/layouts/modules/module_5/log_in/",
          "marketplace": false
        }],
        "admin_link": "/cms/forms"
      },
      "2": {
        "name": "Logout Buttons",
        "liquid_tag": "logout_button",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "redirect",
            "name": "Redirect",
            "type": "string",
            "default": "/",
            "required": true
          }
        ],
        "siteglide_module_id": null,
        "layouts_locations": [{
          "install_type": "file",
          "pfp": "/layouts/modules/module_5/log_out/",
          "marketplace": false
        }]
      },
      "3": {
        "name": "User Form Submissions",
        "liquid_tag": "user_form_submissions",
        "allow_default_settings": false,
        "define_new_settings": [],
        "siteglide_module_id": null,
        "layouts_locations": [{
          "install_type": "file",
          "pfp": "/layouts/modules/module_5/user_form_submissions/",
          "marketplace": false
        }],
        "admin_link": "/cms/forms"
      },
      "4": {
        "name": "User Details",
        "liquid_tag": "user_details",
        "allow_default_settings": false,
        "define_new_settings": [],
        "siteglide_module_id": null,
        "admin_link": "/crm/users"
      }
    },
    "hide_on": ["header"]
  },
  "module_s2": {
    "title": "Pagination",
    "hide_on": ["pages","header","footer"],
    "allow_install_without_adding": true,
    "description": "Add page numbers to your other modules or webapps to allow users to browse through more items.",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745421/modules/module_86/admin/library_thumbs/pagination.png",
    "enabled": true,
    "coming_soon": false,
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/pagination-layouts",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": null,
        "allow_default_settings": false,
        "define_new_settings": [],
        "siteglide_module_id": null,
        "special_implementation_instructions": "The required files have been added to your site's file structure!<br><br> To use a Pagination Layout, set the name of the layout as the \"pagination_layout\" parameter on the List view of a WebApp or Module Liquid tag.<br><br> Setting \"show_pagination\" parameter to \"false\" also allows the List Layout to change the Pagination's position."
      }
    },
    "layouts_locations": [{
      "install_type": "file",
      "pfp": "/layouts/pagination/",
      "marketplace": false
    }]
  },
  "module_s3": {
    "title": "Form Confirmation",
    "description": "Confirm form submissions. See https://developers.siteglide.com/form-confirmation-pages",
    "image": "https://res.cloudinary.com/sitegurus/image/upload/v1660745421/modules/module_86/admin/library_thumbs/form-confirmation.png",
    "enabled": true,
    "coming_soon": false,
    "install_type": "default",
    "siteglide_docs": "https://developers.siteglide.com/form-confirmation-pages",
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "form_confirmation",
        "allow_default_settings": false,
        "define_new_settings": [],
        "siteglide_module_id": null,
        "special_implementation_instructions": "The required files have been added to your site's file structure!<br><br>You can use the Liquid example below to output this on a Page. It will generally only appear for Users who have just submitted a Form and have been redirected."
      }
    },
    "layouts_locations": [{
      "install_type": "file",
      "pfp": "/layouts/form_confirmation/",
      "marketplace": false
    }],
    "hide_on": ["header"]
  },
  "webapp": {
    "hide_on": ["pages","header","footer"],
    "title": "WebApp",
    "description": "Map your custom WebApp fields to one of our multi-purpose layouts.",
    "image": "",
    "enabled": true,
    "coming_soon": false,
    "install_type": "webapp",
    "sub_modules": {
      "1": {
        "name": "Standard",
        "liquid_tag": "webapp",
        "allow_default_settings": true,
        "define_new_settings": [
          {
            "key": "id",
            "name": "WebApp ID",
            "type": "webapp_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null,
        "special_implementation_instructions": "WebApp Layout files installed successfully! If you wish to change the field mapping for this WebApp layout in future, this can be done in code editor at the top of the item.liquid file."
      },
      "2": {
        "name": "Swiper",
        "liquid_tag": "webapp",
        "allow_default_settings": true,
        "define_new_settings": [
          {
            "key": "id",
            "name": "WebApp ID",
            "type": "webapp_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null
      },
      "4": {
        "name": "Tables",
        "liquid_tag": "webapp",
        "allow_default_settings": true,
        "define_new_settings": [
          {
            "key": "id",
            "name": "WebApp ID",
            "type": "webapp_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null
      },
      "5": {
        "name": "WebApp with Update and Delete",
        "liquid_tag": "webapp",
        "allow_default_settings": true,
        "define_new_settings": [
          {
            "key": "id",
            "name": "WebApp ID",
            "type": "webapp_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null
      }
    }
  },
  "module_s4": {
    "hide_on": ["pages","header","footer"],
    "title": "Cookie Preferences",
    "description": "Add a popup or page section to capture user preferences when it comes to optional cookies. The popup versions will generally be designed to only show once until the cookie expires in a year.",
    "image": "",
    "enabled": true,
    "coming_soon": false,
    "install_type": "code_snippet",
    "siteglide_docs": null,
    "sub_modules": {
      "1": {
        "name": "Cookie Popup",
        "liquid_tag": "code_snippet",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Code Snippet ID",
            "type": "code_snippet_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null,
        "special_implementation_instructions": "This code_snippet would normally be added to a Page Template inside the body HTML tag. By default, it contains Google Analytics code (which will only run if you added Google Analytics information in the Siteglide Admin.) It allows users to toggle the optional tracking on or off. You can replace the Google Analytics code with any script or feature which you want the user to have a chance to disable."
      },
      "2": {
        "name": "Cookie Settings Page Section",
        "liquid_tag": "code_snippet",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Code Snippet ID",
            "type": "code_snippet_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null,
        "special_implementation_instructions": "This code_snippet would normally be added to a Page Template inside the body HTML tag. By default, it contains Google Analytics code (which will only run if you added Google Analytics information in the Siteglide Admin.) It allows users to toggle the optional tracking on or off. You can replace the Google Analytics code with any script or feature which you want the user to have a chance to disable."
      }
    }
  },
  "module_s5": {
    "hide_on": ["pages","header","footer"],
    "title": "Categories",
    "description": "",
    "image": "",
    "enabled": true,
    "coming_soon": false,
    "install_type": "code_snippet",
    "siteglide_docs": null,
    "sub_modules": {
      "1": {
        "name": "Full Categories List",
        "liquid_tag": "code_snippet",
        "allow_default_settings": false,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Code Snippet ID",
            "type": "code_snippet_id",
            "default": "",
            "required": true
          }
        ],
        "siteglide_module_id": null,
        "special_implementation_instructions": "The full list of categories is included in the site under context.exports. Use the category parent setting to only loop over categories that are a descendant of that chosen category."
      },
      "2": {
        "name": "Category Detail Layouts",
        "allow_default_settings": false,
        "define_new_settings": [
        ],
        "siteglide_module_id": null,
        "special_implementation_instructions": "This layout can only be selected as a category detail layout from within CMS categories."
      }
    },
    "admin_link": "/cms/categories"
  },
  "module_6": {
    "title": "Authors / Team",
    "description": "",
    "image": "",
    "enabled": true,
    "coming_soon": false,
    "install_type": "default",
    "siteglide_docs": null,
    "sub_modules": {
      "1": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "siteglide_module_id": "6"
      }
    },
    "layouts_locations": [{
      "install_type": "folder",
      "pfp": "/layouts/modules/module_6/",
      "marketplace": false
    }],
    "admin_link": "/modules/6",
    "hide_on": ["header"],
    "required_modules": [
      {
        "name": "Siteglide Authors",
        "id": "module_6",
        "key": 6
      }
    ]
  },
  "module_marketplace": {
    "title": "Marketplace Module",
    "description": "Any module from the marketplace with layouts installed.",
    "image": "",
    "enabled": true,
    "coming_soon": false,
    "install_type": "default",
    "siteglide_docs": null,
    "sub_modules": {
      "0": {
        "name": "default",
        "liquid_tag": "module",
        "allow_default_settings": true,
        "define_new_settings": [
          {
            "key": "id",
            "name": "Module ID",
            "type": "module_id",
            "default": "",
            "required": true
          }
        ]
      }
    }
  }
}