import { renderToHtml } from '@unlayer/react-elements';
import { LandingPage } from '../src/surfaces/web/LandingPage';
import { Receipt } from '../src/surfaces/pdf/Receipt';
import { darkTheme } from '../src/theme/dark';
import { onboardingContent } from '../src/content/onboarding';
import React from 'react';
import fs from 'fs';

console.log("THEME BACKGROUND IS:", darkTheme.colors.background);
const applyBgFix = (html: string, bg: string) => html.replace('background-color: #F7F8F9;', `background-color: ${bg};`);

const webHtml = applyBgFix(renderToHtml(<LandingPage theme={darkTheme} content={onboardingContent} />), darkTheme.colors.background);
const pdfHtml = applyBgFix(renderToHtml(<Receipt theme={darkTheme} content={onboardingContent} />), darkTheme.colors.background);

fs.writeFileSync('scratch/web.html', webHtml);
fs.writeFileSync('scratch/pdf.html', pdfHtml);
console.log("Done");
