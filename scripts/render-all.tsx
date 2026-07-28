import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { renderToHtml } from '@unlayer/react-elements';
import React from 'react';

import { WelcomeEmail } from '../src/surfaces/email/WelcomeEmail';
import { LandingPage } from '../src/surfaces/web/LandingPage';
import { Receipt } from '../src/surfaces/pdf/Receipt';
import { saasTheme } from '../src/theme/saas';
import { onboardingContent } from '../src/content/onboarding';

const OUT_DIR = path.join(process.cwd(), 'output');

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('Rendering surfaces to HTML strings...');
  const emailHtml = renderToHtml(<WelcomeEmail theme={saasTheme} content={onboardingContent} />);
  const webHtml = renderToHtml(<LandingPage theme={saasTheme} content={onboardingContent} />);
  const pdfHtml = renderToHtml(<Receipt theme={saasTheme} content={onboardingContent} />);

  console.log('Writing email.html...');
  fs.writeFileSync(path.join(OUT_DIR, 'email.html'), emailHtml);

  console.log('Writing page.html...');
  fs.writeFileSync(path.join(OUT_DIR, 'page.html'), webHtml);

  console.log('Generating receipt.pdf via Puppeteer...');
  // The 'new' headless mode is the default now in newer puppeteer versions.
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(pdfHtml, { waitUntil: 'networkidle0' });
  await page.pdf({ path: path.join(OUT_DIR, 'receipt.pdf'), format: 'A4', printBackground: true });
  await browser.close();

  console.log('Done! All outputs are ready in the /output directory.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
