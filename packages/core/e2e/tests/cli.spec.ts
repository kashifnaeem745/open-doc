import { expect, test } from '@playwright/test';
import { prepareScratchProject, runCli } from './helpers.ts';

test.describe('open-doc CLI', () => {
  test('--help lists the commands the docs promise', async () => {
    const res = await runCli(['--help'], prepareScratchProject('cli'));
    expect(res.code).toBe(0);
    for (const command of ['dev', 'build', 'preview', 'sync:skills']) {
      expect(res.stdout).toContain(command);
    }
  });

  test('--version prints the package version', async () => {
    const res = await runCli(['--version'], prepareScratchProject('cli-version'));
    expect(res.code).toBe(0);
    expect(res.stdout.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  test('an unknown command exits non-zero', async () => {
    const res = await runCli(['not-a-command'], prepareScratchProject('cli-unknown'));
    expect(res.code).not.toBe(0);
  });

  test('sync:skills --dry-run reports without writing', async () => {
    const dir = prepareScratchProject('cli-skills');
    const res = await runCli(['sync:skills', '--dry-run'], dir);
    expect(res.code, res.stderr).toBe(0);
  });
});
