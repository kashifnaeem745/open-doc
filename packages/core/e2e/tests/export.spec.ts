import { expect, test } from '@playwright/test';
import { openDoc } from './helpers.ts';

test.describe('export', () => {
  test('HTML export downloads a self-contained document', async ({ page }) => {
    await openDoc(page, 'alpha');
    const download = page.waitForEvent('download', { timeout: 60_000 });
    await page.getByRole('button', { name: 'Download' }).click();
    await page.getByRole('menuitem', { name: 'HTML' }).click();

    const file = await download;
    expect(file.suggestedFilename()).toBe('alpha.html');

    const stream = await file.createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk as Buffer);
    const html = Buffer.concat(chunks).toString('utf8');

    // Every sheet is serialized, and nothing points back at the dev server.
    expect(html).toContain('Alpha page one');
    expect(html).toContain('Alpha page three');
    expect(html).not.toContain('/@vite/client');
  });

  test('a flow document exports every packed page', async ({ page }) => {
    await openDoc(page, 'flow-report');
    const download = page.waitForEvent('download', { timeout: 60_000 });
    await page.getByRole('button', { name: 'Download' }).click();
    await page.getByRole('menuitem', { name: 'HTML' }).click();

    const stream = await (await download).createReadStream();
    const chunks: Buffer[] = [];
    for await (const chunk of stream) chunks.push(chunk as Buffer);
    const html = Buffer.concat(chunks).toString('utf8');

    expect(html).toContain('Flow paragraph 1.');
    expect(html).toContain('Flow paragraph 40.');
    // The running footer is resolved at export time, not left as a placeholder.
    expect(html).toMatch(/Flow Report — page \d+ of \d+/);
  });
});
