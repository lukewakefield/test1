---
name: build-page
description: >-
  Creates or updates a Siteglide Studio page either using sections from the StudioKit library, or by using newly created StudioKit library sections.
compatibility: >-
  Some rules in this skill are only relevant when the user intends to build using the framework of the StudioKit library. If it's not clear from context whether they are using the StudioKit library, prompt the user to clarify. Note that a library may have started as StudioKit and be renamed, but the user may still want to follow StudioKit guidance and use this skill.
---
# Building a page

## Design Interpretation Skills

If you're being asked to work from a figma design, and you don't have access to the figma MCP, prompt the user whether they'd like to set that up. Similarly for any design source, check if you have either a skill or MCP for that source and search for possible ones to suggest to the user.

## Planning

It is useful to create a high-level plan for building a page and asking the user to confirm if the plan is a good one before proceeding. 

It's especially important to avoid the common AI agent mistake of over-generalising the way sections' structural HTML should be built. Each section should be treated as a separate task on the to-do list and its structure checked carefully. Meanwhile it's good to refer to the theme constantly and make sure the theme keeps sections consistently styled. 

## Examples

Use examples where building a page where possible, especially around adding metadata. Otherwise, check Siteglide docs.

Use an existing section if:
- The design file indicates a re-used section with different content
- You are creating multiple pages in the same chat context and come across similar sections
- An exact match section already exists in the same library you are working in (usually the StudioKit library)
- You have recently created an exact match section in your chat context

Create a brand new section if:
- The user asks you to
- No similar section exists inside the same library

If you are not sure, prompt the user and ask if you should create new sections or add existing sections to the page.

## Required Metadata

MUST set:

- metadata.file_type: 'page'

Otherwise the page will not appear for the client in the UI.

# Validate

To validate the rendered page, you should ask the user to tell you the domain for their website. 

Then you can generate the URL to check by one of two methods:
1. If the page has a slug defined in yml frontmatter, use that as a relative path from the domain
2. If no slug is defined in yml, look at the page file's filepath relative to `marketplace_builder/views/pages`, that will give you the URL.

You can use that URL to get the page source and validate that the server-side code rendered the end-result that was expected, and compare to the intended outcome.

When completing a long checklist for a page, it's worth doing an extra pass to check for performance, accessibility and SEO best practice. But where this may conflict with the user's wishes, ask them to confirm changes. A lack of contrast between text and background colours is a very common problem.

# Yml

The yaml format is used within Liquid files to provide frontmatter. A triple dash followed by a newline begins the frontmatter document and a 2nd triple dash starts the page body (which is usually minimal since dynamically injected later).

A common mistake is in using the wrong kind of scalars for strings. If you are using control characters e.g. colons or tabs, make sure a scalar type is used which supports these, or they are adequately escaped.