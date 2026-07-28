import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { renderToHtml } from '@unlayer/react-elements';
import React from 'react';

import { WelcomeEmail } from '../src/surfaces/email/WelcomeEmail';
import { LandingPage } from '../src/surfaces/web/LandingPage';
import { Receipt } from '../src/surfaces/pdf/Receipt';
import { saasTheme } from '../src/theme/saas';
import { onboardingContent, receiptContent, orderShippedContent, orderShippedReceiptContent } from '../src/content/onboarding';

const OUT_DIR = path.join(process.cwd(), 'output');

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  console.log('Rendering Welcome Flow surfaces to HTML strings...');
  const emailHtml = renderToHtml(<WelcomeEmail theme={saasTheme} content={onboardingContent} />);
  const webHtml = renderToHtml(<LandingPage theme={saasTheme} content={onboardingContent} />);
  const pdfHtml = renderToHtml(<Receipt theme={saasTheme} content={receiptContent} />);

  console.log('Rendering Order Shipped Flow surfaces to HTML strings...');
  const shippedEmailHtml = renderToHtml(<WelcomeEmail theme={saasTheme} content={orderShippedContent} />);
  const shippedWebHtml = renderToHtml(<LandingPage theme={saasTheme} content={orderShippedContent} />);
  const shippedPdfHtml = renderToHtml(<Receipt theme={saasTheme} content={orderShippedReceiptContent} />);

  console.log('Writing Welcome outputs...');
  fs.writeFileSync(path.join(OUT_DIR, 'email.html'), emailHtml);
  fs.writeFileSync(path.join(OUT_DIR, 'page.html'), webHtml);

  console.log('Writing Order Shipped outputs...');
  fs.writeFileSync(path.join(OUT_DIR, 'shipped-email.html'), shippedEmailHtml);
  fs.writeFileSync(path.join(OUT_DIR, 'shipped-page.html'), shippedWebHtml);

  console.log('Generating PDFs via Puppeteer...');
  const browser = await puppeteer.launch();
  
  // Welcome PDF
  const page1 = await browser.newPage();
  await page1.setContent(pdfHtml, { waitUntil: 'load' });
  await page1.pdf({ path: path.join(OUT_DIR, 'receipt.pdf'), format: 'A4', printBackground: true });
  
  // Shipped PDF
  const page2 = await browser.newPage();
  await page2.setContent(shippedPdfHtml, { waitUntil: 'load' });
  await page2.pdf({ path: path.join(OUT_DIR, 'shipped-receipt.pdf'), format: 'A4', printBackground: true });
  
  await browser.close();

  console.log('Done! All outputs are ready in the /output directory.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
