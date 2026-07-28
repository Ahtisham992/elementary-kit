import { renderToHtml } from '@unlayer/react-elements';
import { WelcomeEmail } from '../src/surfaces/email/WelcomeEmail';
import { saasTheme } from '../src/theme/saas';
import { onboardingContent } from '../src/content/onboarding';
import React from 'react';

const html = renderToHtml(<WelcomeEmail theme={saasTheme} content={onboardingContent} />);
console.log(html);
