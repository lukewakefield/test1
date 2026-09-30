# StudioKit cloud handover

This repository contains the Siteglide StudioKit project. The current priority is to complete a new BasecoatUI theme, reusable sections, template and page based on https://basecoatui.com/ and https://basecoatui.com/installation/.

## Current implementation
- Theme: marketplace_builder/views/partials/library/studiokit/themes/basecoat/
- Sections: marketplace_builder/views/partials/library/studiokit/sections/basecoat-sidebar.liquid and basecoat-showcase.liquid
- Template: marketplace_builder/views/layouts/templates/basecoat.liquid
- Page: marketplace_builder/views/pages/basecoat.liquid
- Staging preview: https://studiokit-themes-lw.staging-siteglide.com/basecoat
- Basecoat 1.0.2 CDN stylesheet and runtime are included. The expanded showcase adds combobox, command, popover, tooltip, drawer, toast, radio, native select, range, skeleton, spinner, item, empty and scroll examples. A full library coverage audit, including Chart and remaining component variants, is still needed.
- Local Chromium checks verify appearance switching, responsive sidebar layout, navigation targets, keyboard selection/search, Escape dismissal, toast dismissal and range output. Screenshot review caught and fixed a mobile inner-nav overlay. These edits have NOT been deployed or verified through Studio server rendering.
- Preserve the existing agency theme, content and library default. Follow the project Siteglide skills under .agents/skills/siteglide/.

## Cloud setup still required
See [the reusable staging publishing workflow](docs/STAGING_PUBLISHING.md) for the
verified CLI/MCP installation, exact network hosts, secure MPKIT bindings,
preflight commands, and separate GitHub/staging confirmation requirements.
The cloud proxy works with sandbox network access enabled. Public staging returns
HTTP 200 and MCP recognizes the MPKIT staging bindings. Authentication is blocked:
set MPKIT_URL to the full HTTPS staging URL and add api.siteglide.co.uk to the
MPKIT_TOKEN network secret's allowed domains. A probe with the corrected URL
returned HTTP 401. Republish the corrected environment and rerun staging:access.
Seven existing module/layout validation errors still block publishing.

Install Siteglide CLI using its official documentation and configure authenticated staging access through supported secure environment setup. Credentials are deliberately excluded from this repository. Never read .siteglide-config; use the Siteglide MCP envs_list operation to identify environments. Prefer the Siteglide MCP for validation and platform operations.

Before declaring completion, verify Liquid rendering, responsive layout, light/dark themes, sidebar navigation and interactive Basecoat components. Confirm staging deployment separately from local edits. Do not publish to production without authorization.
