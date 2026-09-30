---
name: dynamic-sections
description: >-
  Information about how to use dynamic sections, and create and modify existing ones. Dynamic sections are most useful when you want to output database content and you want the end-user of the website or portal to be able to choose how they view data via: pagination, sort controls, filter controls. Many dynamic sections use Siteglide's Live Updates JS library to handle quick re-renders of a specific section when the state changes.
---
# Is a dynamic section suitable?

Dynamic section layouts are marked as providing a view for a specific module or use-case:
1) A module_id representing which Siteglide module they provide a layout for (or module_s<id> for Siteglide system module functionality without its own module and ID)
2) A sub_module_id for specific use cases within a module (or a default `0` sub_module)

A *schema* describes the behaviour of each combination of module and sub_module. We will refer to that throughout this skill.

2 ways to check schema, depending on available parameters:

- IF Siteglide MCP and user question can tell you the site's base URL: [Up to date schema for this site](<base_url>/modules/module_357/module_schema) - 
- Or if not available, use latest snapshot: [Snapshot of modules reference of module IDs and sub-modules](references/module_schema_20.08.2026.md)

## To find which module and sub_module ID you need:

1. Check the schema to see if the feature you're looking for is supported

If `<module_id>.<sub_module_id>.hide_on array` contains all 3 from `["pages","header","footer"]`, it's not currently supported (hidden from ui). Any other combination is supported, but recommended for only those contexts not included in the array. Lack of support may be temporary.

2. Check if there are enough examples of this module layout already built (see Layout locations below) - without enough good examples, you may not have enough context to build it.

3. Checking which modules are installed on the site / <env>

Using Siteglide MCP tool graphql_exec (with MCP, check which <env> if more than one available), you can check admin_tables for clues that a module like "module_3" is installed, since that will create a module_3.yml file, registering the table. A module like "module_14" will have at least one table with its module id as a prefix, in this case, `module_14/product`. 

You can infer exactly what table you're looking for from the schema's `<module_id>.required_modules.id` property, though this may not work for every module. Fallback to logic above.

If you think a module supported by the schema is not installed on the site, you can suggest the user install it by going to: `https://admin.siteglide.com/#/portal/sites/<siteglide-site-id>` => modules tab => search for module name (not ID) e.g. search "blog". 

Modules in the schema prefixed by "module_s" will always be available, as they refer to features built-in to the Siteglide System module.

If the module is not installed, the underlying data structure will not be ready yet.

# Interpreting file structure from the schema

Dynamic sections may contain between 1-any files. 

In the schema, once you know which module_id and sub_module_id you need, check "layouts_locations" array next.

## Layout locations

The schema's `<module_id>.<sub_module_id>.layouts_locations.pfp` == "physical file path" - a relative path to `marketplace_builder/views/` where that type of layout can be found in site file structure, if any examples already exist.

If the sub_module has no `layouts_locations` key, default to the `<module_id>.layouts_locations.pfp` (Whole module stores one type of layout in same place.)

If the user hasn't used `siteglide-cli pull <env>` recently, you might suggest they do that to see if any layouts exist on the remote site.

## Install Types 

### layouts_locations.install_type == "folder"

Usually has at bare minimum:

```
marketplace_builder/views/partials/layouts/modules/<module_id>/
└── <layout_name>/
    ├── list/
    │   ├── wrapper.liquid          # main file for list type
    │   └── item.liquid
    ├── detail/                     # optional; same layout name, detail type
    │   ├── wrapper.liquid          # main file for detail type
    │   └── item.liquid
    └── optional_partial.liquid     # e.g. sidebar.liquid — at layout level, not inside list/ or detail/
```

`<type>` under `<layout_name>/` is either `list` or `detail`. A layout folder may contain both. Optional partials (sidebar, search, archive, etc.) sit alongside `list/` and `detail/`, not inside them.

(Note for some layouts_locations, there may be exceptions to the `/module_id/` part of the structure.)

When `"install_type" == "folder"`, to understand more about the layout's purpose and dependencies beyond the current folder you only need to look at the yml frontmatter of the main file — `list/wrapper.liquid` or `detail/wrapper.liquid` depending on type. 

### layouts_locations.install_type == "file"

Only a single file:

```
marketplace_builder/views/partials/layouts/modules/<module_id>/
└── <layout_name>.liquid            # main file
```

Then look at yml frontmatter of main file `<layout_name>.liquid` for description and possible dependencies.

### install_type == form_layout

Forms are slightly different. All types of form layouts work if you put them in the specific folder for their form ID:

```
marketplace_builder/views/partials/layouts/forms/
└── <form_id>/
    ├── <layout_name>.liquid
    └── <layout_name>_components/
        └── string.liquid
```

But dynamic type layouts, see below, can use global folder and be re-used DRYly, using shortcuts in each form ID folder:

```
marketplace_builder/views/partials/layouts/forms/
├── global/
│   ├── <layout_name>.liquid
│   └── <layout_name>_components/
│       └── string.liquid
└── <form_id>/
    └── <layout_name>.liquid        # shortcut include only
```
...where `<form_id>/<layout_name>.liquid` is a shortcut file which contains `{% include "layouts/forms/global/<layout_name>" %}` only in file body.

Main file frontmatter may say the file is `already_global_field`.

# Using Frontmatter of main file

The main file's yml frontmatter tells you:

1) Other dependency files, which may exist inside or outside the current folder!

 `metadata['studio_dynamic/files']` lists files which were installed alongside this one as dependencies. All paths are relative to the root `./marketplace_builder/` folder. Complex layouts may include "nested" modules as features, e.g. a menu (module_2) may include as a dependency login form files from module_5 (secure zones). Other files, depending on the dependency's layouts_locations.install_type, will exist in a folder `<layout_name>/` or themselves be a single file `<layout_name>.liquid` where the `layout_name` == reference file `layout_name` from folder or file name, even if relative to a different module folder.

It is normally okay to modify the code of dependency Liquid files of this sort, as it is rare for the exact files to be referenced in multiple places out of the box, but it can happen, so check.

2) Settings

`metadata.settings` behaves the same way as static studio sections; once referenced in section schema, a UI is generated for the client to set values for settings in the page, which get passed to section main file at runtime and are automatically inherited by all dependency files pulled in with "include" Liquid tag. 

[Example of layout with settings](references/settings.md)

For dynamic sections though, some extra settings will be added to the UI by the schema automatically in addition to those defined in layout frontmatter. Those are determined by schema's `allow_default_settings` and `define_new_settings`. Usually if `define_new_settings` is used, `allow_default_settings` is turned off. Since these settings are usually consumed before the layout is rendered, it's not usually useful to try and consume them inside the layout.

3) Library

`metadata.studio_library` defines which library the layout is intended for. Libraries have consistent styling rules, but Liquid behaves similarly across all, so if a useful example exists in a different library, you may copy it to the active library and change the styling to match the new library's rules.

The current library can be found by finding the page you're working on's `layout` in frontmatter, referencing the page template via the path `marketplace_builder/views/layouts/<layout>`, then checking that frontmatter and getting `studio_library` property. This should match `metadata.studio_library` above when the dynamic section is ready to use.

4) Theme

Studio theme might not be relevant, since a dynamic section for a library should work in any of that library's themes. But if useful it's under `studio_theme`.

5) List or Detail 

`studio_dynamic/type` tells you whether it was designed as:
- List layout - intended to loop over multiple database records
- Detail layout - intended to output a single loop iteration
- default - not applicable 

List and detail effectively have the same code, difference is mainly for categorization (and for manual including, it changes parameters: `type: list/detail` and detail requires `item_ids` or `slug`.)

6) Live Updates

Live Updates is a JS file which some layouts include to add smooth re-rendering behaviour when filters, search or sort change. 

Since this passes the burden to the end-website user to modify parameters more so than the client, when this frontmatter property `studio_dynamic/live_updates` is set to `"true"` (string not boolean), several "extra settings" (see above) are also hidden from the UI. (It is confusing to give client choice then ignore it in favour of website user).

To add some business rules to what default filters must remain, while still giving the end-user some choice, a combination of settings (see above) and this document should be used: [Enforcing filters with live updates](https://docs.siteglide.com/articles/6300782-live-updates-example-enforcing-filters)

[Step by step to use Live Updates JS in code](https://docs.siteglide.com/articles/8536059-adding-live-updates-to-a-dynamic-section)

# Adding a dynamic section

## to a Studio Page (usually preferred)

[Dynamic sections on page example](references/dynamic_section_added_to_page)

## nesting it inside a static section's Liquid code (can allow more flexibility, but less easy to control without code in UI)

Each dynamic section has a different path needed to include them with the Liquid tag {% include %}, the schema explains with `<module_id>.<sub_module_id>.liquid_tag` (or default `<module_id>.liquid_tag`) which liquid tag is most relevant for each sub_module at:

{% include <liquid_tag>, layout: '<layout_name>', type: 'list' %}

Usually, the default `liquid_tag` will be 'module'. If so, the ID parameter will also be required. E.g. to include module_3, blog, you need:

{% include 'module', id: '3', layout: '<layout_name>', type: 'list' %}

A "default" layout is normally available, but tends to be basic with no Studio support and no styling. It's only relevant for this static section output method.

Type defaults to 'list', but should match the layout's frontmatter prop `studio_dynamic/type`. In some cases unwanted variable inheritance can mean it's worth explicitly setting the parameter despite the default.

# Writing layout code for a dynamic section

## Standard Modules

For most modules where the `<module_id>.sub_modules.<sub_module_id>.liquid_tag` is `module` or defaults to `module`, or where the `layouts_locations[0].install_type` == `folder`, the most important line in the `list/wrapper.liquid` file is:

`{%- include 'modules/siteglide_system/get/get_items', item_layout: 'item' -%}`

This line initiates the loop over the `item.liquid` file, and passes the important `this` object to that file, allowing iterating over the specific data from that database record.

The `settings` object is available in all files, initially through the `list/wrapper.liquid` or `detail/wrapper.liquid` file and then implicitly inherited by included dependency files.

See [Live Updates JS](https://docs.siteglide.com/en/articles/8536059-adding-live-updates-to-a-dynamic-section) for tracking the state of the section and changes to it based on form elements inside the section, then re-rendering based on changes of state. 

Prioritise up to date examples of dynamic layouts from the current project in the specific module_id and sub_module ID that you are working on. However, if the repository is missing relevant examples, check these:

```
marketplace_builder/views/partials/layouts/modules/module_3/
└── default-blog-card/              # list layout only (no detail/ folder in this example)
    ├── list/
    │   ├── wrapper.liquid          → [example](references/blog_module_example_wrapper.md)
    │   └── item.liquid             → [example](references/blog_module_example_item.md)
    ├── sidebar.liquid              → [example](references/blog_module_example_sidebar.md)
    ├── search.liquid               → [example](references/blog_module_example_search.md)
    └── archive.liquid              → [example](references/blog_module_example_archive.md)
```

Archive and search functionality is mainly for blog and events modules. Wrapper and item are the most applicable to other layouts. Sidebar is optional, but a good example of breaking a layout into abstracted files at the layout level (alongside `list/`, not inside it).

The most up to date reference of fields for each module config will be inside `marketplace_builder/views/partials/tables/modules/<module_id>.liquid` — in JSON format.

Note here module_id is just a number, without prefix `module_`.

## Forms

Disambiguation - dynamic v.s. static form layouts are two different ways of writing a dynamic section layout for a form. Even static form layouts are still dynamic sections. 

Prioritise real up-to-date examples in the codebase where possible, but if one is missing, especially for static form layouts, use the example in the references below.

Use static form layouts when the user is particular about changing which fields display on the form and in which order. 

[Example of Static Form Layout](references/static_form_layout_example.md)

Use a dynamic form layout if the user does not care which order form fields are output in, but wants a low-maintenance layout which automatically updates when the form configuration schema is changed by them in the UI.

[Example of Dynamic Form Layout](references/dynamic_form_layout_example.md)

A compromise between both is possible using a dynamic form layout, but using parameters like: `collection` and `defer_fields` to avoid automatic output of a field and to allow you to manually output that one elsewhere. `disable_fields` can be used to completely hide / remove a field from a dynamic form.

[Advice for building DRY form layouts](https://docs.siteglide.com/en/articles/3852623-static-and-dynamic-form-layouts)

Never use `default` named layouts for forms, without first copying and renaming them. The system will automatically update these files when config changes, so it's not safe to rely on any manual edits made to them.

The most up to date reference of fields for each form config will be inside `marketplace_builder/views/partials/tables/forms/<form_id>.liquid` — in JSON format. 

Note here form_id is just a number, without prefix `form_`.

The form sub_module "7" can be used for checkout forms, but so can form sub_module "1". Either needs payment settings adding in the forms' configuration (normally done in UI).

## Menus

Also useful for header, footer and sidebar (any nav)

[More reference](https://docs.siteglide.com/articles/5649569-about-menu-builder)

## Secure Zones

Different parts of this doc refer to different "sub_modules".

[Secure Zones Liquid Reference](https://docs.siteglide.com/en/help/articles/6833876-secure-zones-liquid-reference)

## Events

[Links for Events reference](https://docs.siteglide.com/en/help/collections/2723814-events)

## Sliders

[Sliders Liquid and JS reference](https://docs.siteglide.com/en/help/articles/1706857-about-slider)

# Additional documentation

Relevant Docs:
- Full reference of main file metadata: [Adding metadata to dynamic sections to allow Studio-support for settings](https://docs.siteglide.com/en/articles/5546650-dynamic-studio-sections-adding-required-metadata-to-module-layouts-to)
