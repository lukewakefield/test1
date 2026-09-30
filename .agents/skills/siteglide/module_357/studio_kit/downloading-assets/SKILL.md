---
name: downloading-assets
description: >-
  If the user has passed a design file, some instructions for where to persist assets and how to reference them from the code.
---
# Downloading Assets

## Use skills

If the user has passed in a design file, e.g. Figma, ask if they'd like to download assets into the project?

Use the relevant MCP or skill for the design website they're passing in to extract assets. 

## Where to save

Save the assets in the marketplace_builder/assets/ directory. We  recommend using an additional `library/<library-name>/` directory if the user intends to distribute this library / theme to others. If the user is building a single website for themselves or a client, it makes sense that they may wish to have a slightly different folder structure - organising files by logos v.s. photos or organising based on the page of the site they are relevant to. You may ask the user if there is a particular way they'd like to organise the assets, or if they'd like you the agent to make your own judgement. 

## How to reference

When referencing assets in Studio page metadata, or in an `{% include 'img' %}` tag's path parameter (I mean directly as a string, not relevant when passing in a variable), always reference the file via a relative path relative to the `marketplace_builder/assets` folder. E.g. to reference `marketplace_builder/assets/library/<library-name>/photos/front-of-building.jpg`, reference with `library/<library-name>/photos/front-of-building.jpg`.

# Instructions for exporting and downloading vectors (if you do)

When exporting vectors, the figma skill (or alternative) may suggest exporting a vector image to a raster format. If you do, consider scaling the image up to a higher quality, larger image as you do so, in order to avoid the image being too small when it is eventually used on the page. Since we will be using Cloudflare transformations at runtime, it's not necessary to be too strict about the size of images at this export and import stage. Instead just aim for a reasonable image size, avoiding excessive sizes. You can use your judgement a little depending on context of how large the image is expected to be when it is output.