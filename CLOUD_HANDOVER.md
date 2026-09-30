# StudioKit cloud handover

This repository contains the Siteglide StudioKit project. The current priority is to complete a new BasecoatUI theme, reusable sections, template and page based on https://basecoatui.com/ and https://basecoatui.com/installation/.

## Current implementation
- Theme: marketplace_builder/views/partials/library/studiokit/themes/basecoat/
- Sections: marketplace_builder/views/partials/library/studiokit/sections/basecoat-sidebar.liquid and basecoat-showcase.liquid
- Template: marketplace_builder/views/layouts/templates/basecoat.liquid
- Page: marketplace_builder/views/pages/basecoat.liquid
- Staging preview: https://studiokit-themes-lw.staging-siteglide.com/basecoat
- Basecoat 1.0.2 CDN stylesheet and runtime are included. The showcase only covers part of the component library and must be expanded for the requested full implementation.
- Latest local edits add semantic light/dark colors, an Appearance control, active sidebar navigation, and an accessible validation description. These edits have NOT been verified in a rendered preview or confirmed synced.
- Preserve the existing agency theme, content and library default. Follow the project Siteglide skills under .agents/skills/siteglide/.

## Cloud setup still required
See [the reusable staging publishing workflow](docs/STAGING_PUBLISHING.md) for the
verified CLI/MCP installation, exact network hosts, secure MPKIT bindings,
preflight commands, and separate GitHub/staging confirmation requirements.
The cloud proxy works with sandbox network access enabled. On 30 September 2026,
runtime revision 3 reported current unrestricted/enforced network policy. The
staging `/basecoat` page returned HTTP 200 with rendered Basecoat content, and the
Siteglide API host was reachable. No staging credentials are bound; MCP
`envs_list({details:true})` returned no environments, so authenticated access and
deployment remain unverified. This public page check is not an interaction test.

Install Siteglide CLI using its official documentation and configure authenticated staging access through supported secure environment setup. Credentials are deliberately excluded from this repository. Never read .siteglide-config; use the Siteglide MCP envs_list operation to identify environments. Prefer the Siteglide MCP for validation and platform operations.

Before declaring completion, verify Liquid rendering, responsive layout, light/dark themes, sidebar navigation and interactive Basecoat components. Confirm staging deployment separately from local edits. Do not publish to production without authorization.
