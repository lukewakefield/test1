import { readFile, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const stagingHost = 'studiokit-themes-lw.staging-siteglide.com';
const validateOnly = process.argv.includes('--validate-only');
const accessOnly = process.argv.includes('--access-only');
if (validateOnly && accessOnly) throw new Error('Choose either --validate-only or --access-only.');
const client = new Client({ name: 'studiokit-staging-preflight', version: '1.0.0' });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [resolve(root, 'node_modules/@siteglide/siteglide-mcp/bin/siteglide-mcp.js'), '--project', root],
  cwd: root,
  // Node 24 fetch must use the managed proxy, including linter docs requests.
  env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  stderr: 'pipe'
});

async function call(name, args = {}) {
  const result = await client.callTool({ name, arguments: args });
  if (result.isError) {
    // Report the HTTP status without echoing server bodies or credential values.
    const detail = result.content.filter(item => item.type === 'text').map(item => item.text).join(' ');
    const status = detail.match(/Siteglide API (\d{3})/)?.[1];
    throw new Error(`${name} failed${status ? ` (HTTP ${status})` : ''}. Check secure bindings; MPKIT_TOKEN must allow api.siteglide.co.uk.`);
  }
  return JSON.parse(result.content.find(item => item.type === 'text').text);
}

try {
  await client.connect(transport);
  const environments = (await call('envs_list', { details: true })).environments;
  console.log('Configured environments:', environments.map(({ name, host, classification }) => ({ name, host, classification })));
  const staging = environments.find(env => env.classification === 'staging' && env.host === stagingHost);
  if (!validateOnly && (!staging || !URL.canParse(staging.url) || new URL(staging.url).protocol !== 'https:')) {
    throw new Error('Set MPKIT_URL to https://studiokit-themes-lw.staging-siteglide.com/ and configure secure MPKIT bindings.');
  }
  const sync = await call('sync_status');
  if (sync.treatAsProduction || sync.active) throw new Error('Stop live sync before validating a staging release.');
  const conflicts = await call('remote_check_status');
  if (conflicts.activeConflict || conflicts.stashConflict) throw new Error('Resolve recorded remote/merge conflicts first.');

  if (!validateOnly) {
    // Fixed, harmless Liquid proves authenticated server evaluation without mutations.
    const marker = 'studiokit-staging-access-ok';
    const result = await call('liquid_exec', { environment: staging.name, content: `{{ '${marker}' }}` });
    if (!JSON.stringify(result).includes(marker)) throw new Error('Authenticated Liquid probe did not return the expected marker.');
    console.log('Authenticated staging Liquid evaluation passed. No deployment occurred.');
  }
  if (!accessOnly) {
    const theme = 'marketplace_builder/views/partials/library/studiokit/themes/basecoat';
    const paths = [
      ...(await readdir(resolve(root, theme))).filter(name => name.endsWith('.liquid')).map(name => `${theme}/${name}`),
      'marketplace_builder/views/partials/library/studiokit/sections/basecoat-sidebar.liquid',
      'marketplace_builder/views/partials/library/studiokit/sections/basecoat-showcase.liquid',
      'marketplace_builder/views/layouts/templates/basecoat.liquid',
      'marketplace_builder/views/pages/basecoat.liquid'
    ];
    let errors = 0;
    for (const file_path of paths) {
      const result = await call('validate_code', { file_path, content: await readFile(resolve(root, file_path), 'utf8'), mode: 'full' });
      console.log(`${file_path}: ${result.status}; ${result.errors.length} errors, ${result.warnings.length} warnings`);
      for (const diagnostic of [...result.errors, ...result.warnings]) console.log(`  ${diagnostic.severity} ${diagnostic.line}: ${diagnostic.check}: ${diagnostic.message}`);
      errors += result.errors.length;
    }
    if (errors) throw new Error(`${errors} local validation errors; staging publishing is blocked.`);
    console.log('Local Basecoat validation passed. This does not verify server rendering.');
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
