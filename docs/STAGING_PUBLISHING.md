# StudioKit cloud staging workflow

Production publishing is not authorized. The only approved Siteglide target is
`https://studiokit-themes-lw.staging-siteglide.com/`.

## Verified setup on 30 September 2026

- Node 24.19.0; official CLI 1.11.2 and MCP 0.1.0-alpha.0 installed.
- The stdio MCP responds to `envs_list`, `sync_status`, `git_status`, and
  `remote_check_status`. No configured environments or active syncs were found.
- Managed proxy DNS and TCP connectivity work with sandbox network access enabled.
  npm and GitHub reads work. A default sandbox command can report an unreachable
  proxy: run network commands with the supported sandbox network permission.
- The enforced cloud policy currently denies the Siteglide API and staging host.
  No authenticated connection, rendering verification, or deployment is established.
- All eight Basecoat files were submitted to the official MCP validator. It
  reported seven errors: six missing system/Studio module partials referenced by
  the template/page, and `MissingContentForLayout` on the template. There were
  three warnings (one sidebar, two page). Publishing remains blocked.

The repository has no installed `modules/` tree. The other existing Studio
templates use the same `render_shell` pattern; do not insert a second page body
or suppress checks just to clear the layout finding. Once staging auth works,
retrieve the installed system/Studio modules into a separate checkout using the
supported CLI pull path, reconcile them safely, and rerun local checks. Verify
the layout's runtime rendering and resolve or explicitly document any validator
incompatibility with the installed Studio version before publishing. Do not
overwrite the working project with a blind pull.

These are observed setup results, not a successful publishing record.

## Smallest secure environment configuration

In this chat's cloud environment settings, keep the package-manager network preset
and add these exact HTTPS hosts (no general Internet or TCP/VPN grant is needed):

| Host | Purpose |
| --- | --- |
| `api.siteglide.co.uk` | CLI login `/api/cli/auth`, authenticated operations `/api/cli/liquid`, code upload `/api/cli/deploy`, deployment polling `/api/cli/status/:id`, ping `/api/cli/ping` |
| `studiokit-themes-lw.staging-siteglide.com` | Rendered staging checks at `/basecoat` |
| `documentation.platformos.com` | Current Liquid documentation and GraphQL schema used by the official validator |
| `github.com` | Git fetch and push for `lukewakefield/test1` (already reachable through the package-manager preset in this session) |

Bind an existing Siteglide API key securely, without entering it in chat or a file:

- Runtime variable `MPKIT_URL` = `https://studiokit-themes-lw.staging-siteglide.com/`.
- Secure variable binding `MPKIT_TOKEN` = the API key generated in Siteglide Admin
  for an account authorized to access this staging site.
- Secure variable binding `MPKIT_EMAIL` = that account's developer email.

Both CLI and MCP natively accept this exact MPKIT variable trio. No agent needs
to read or generate `.siteglide-config`; do not commit it. Do not bind production
credentials. If a key must first be generated, use Siteglide Admin's secure UI.
The CLI's alternative `add` flow uses an interactive password and the auth API;
it is not needed for an existing secure API-key binding.

Apply the environment configuration through the supported settings review and
restart/reconnect if requested. Recheck `cloud_environment.environment_status`:
observations must be current, bindings ready, and policy enforced. A visible proxy
placeholder is not evidence of a missing credential. Preserve proxy and CA settings.

For visual testing, also allow `basecoatui.com` (reference), `cdn.jsdelivr.net`
(Basecoat and library assets), `fonts.googleapis.com`, `fonts.gstatic.com`, and
`api.fontshare.com` (existing StudioKit font stylesheet). Any additional asset
host must be taken from the actual rendered staging response/stylesheet; it has
not yet been discovered. This code-only workflow excludes `--with-assets`, so no
presigned storage hosts are required. Asset uploads/backups are a separate path
whose returned storage URLs must be inspected safely before adding exact hosts.

## Install and inspect

From the repository root, with sandbox network access enabled:

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/studiokit-npm-cache
npm run basecoat:check
npm run staging:preflight
```

Installation skips image optimizer setup because this workflow publishes Liquid
code, not binary assets. Node 24's native environment-proxy support is enabled in
the MCP child process. Current tools are pinned by `package-lock.json`.

`basecoat:check` calls the official MCP validator for all eight Basecoat theme,
section, template and page files. It reports errors and warning counts. It blocks
on errors, active syncs or recorded conflicts. Review warnings before publishing;
local lint is not proof of rendered correctness. The upstream validator can use
its bundled documentation if live documentation is unavailable.

`staging:preflight` additionally calls `envs_list({details:true})`, requires the
exact HTTPS staging host and `classification: staging`, and asks `liquid_exec`
to render a fixed harmless marker. This proves authenticated Liquid access when
it passes; it never deploys. With MPKIT bindings, MCP names the environment
`(MPKIT)`. An environment's key name alone is not proof that it is staging.

For a native MCP client, run `npm run siteglide:mcp` from this repository,
passing the same secure bindings and `NODE_USE_ENV_PROXY=1` in the client runtime.
The official server supports stdio; HTTP/SSE hosting is deferred upstream.

## Save code to GitHub before staging publishing

1. Confirm MCP `sync_status` has no active production/unknown sync, inspect
   `remote_check_status`, and resolve any conflicts. Fetch GitHub and reconcile
   remote changes without discarding local work. Do not blindly pull over edits.
2. Finish the scoped Basecoat edits. Preserve the existing agency theme, content
   and `metadata.default_theme` in the StudioKit library configuration.
3. Run local validation and the authenticated staging preflight. Review the diff,
   ensure generated archives and secrets are ignored, and commit only intended
   project/workflow files.
4. Push the reviewed feature branch to `origin`. Verify `git ls-remote origin
   refs/heads/<branch>` returns the commit from `git rev-parse HEAD`. Record that
   SHA and branch as **GitHub save confirmation**. A push does not deploy Siteglide.

## Publish validated code to staging

Only proceed after the exact target passed preflight and the committed code was
confirmed on GitHub. Re-run preflight if bindings/settings changed. Confirm the
working tree is clean. Review the full archive scope: CLI `deploy` sends the
site codebase, not only Basecoat. If staging has newer files, retrieve/reconcile
them into a separate working directory before deployment; do not overwrite them.

```sh
npm exec -- siteglide-cli deploy staging
```

The CLI natively takes URL, email and token from the MPKIT bindings; `staging`
is a command label here. Check that its confirmation prompt displays exactly
`https://studiokit-themes-lw.staging-siteglide.com/` before accepting it. Never
accept a different target. Do not pass secrets as command-line arguments. Omit
`--with-assets`. The deployment path and prompt were inspected in official CLI
source; authenticated end-to-end deployment remains untested.

The CLI uploads to Siteglide's API and polls a deployment job. Do not rely only
on the process exit code: capture the actual job outcome, then verify rendered
staging independently. Check `/basecoat` for Liquid errors and expected content,
desktop/mobile layout and overflow, light/dark appearance, sidebar navigation,
keyboard/focus behavior, and every interactive Basecoat component. Review logs
through MCP `logs_fetch` for the environment returned by `envs_list`. Record
job status, time, target URL, screenshots/check results, and Git commit as
**staging deployment confirmation**, separately from the GitHub save.

Do not mark the theme complete until this rendering and interaction checklist
passes. No production promotion command is part of this workflow.

## Source evidence

- Official packages: `@siteglide/siteglide-cli@1.11.2` and
  `@siteglide/siteglide-mcp@0.1.0-alpha.0` from `registry.npmjs.org`.
- CLI `lib/settings.js`: `MPKIT_URL`, `MPKIT_EMAIL`, `MPKIT_TOKEN`.
- CLI `lib/portal.js`: `https://api.siteglide.co.uk/api/cli/auth`.
- CLI `lib/proxy.js`, `siteglide-cli-deploy.js`, `siteglide-cli-push.js`:
  API upload, site header, and job polling; archives exclude assets by default.
- MCP `src/ops/client.js`, `src/ops/register.js`: environment classification,
  secure auth resolution and authenticated staging Liquid evaluation.
- [CLI documentation](https://docs.siteglide.com/articles/1541403-introduction-to-the-command-line-interface-cli)
  and [official source](https://github.com/siteglide/siteglide-cli).

No credentials, `.siteglide-config` contents, or presigned URLs belong in this document.
