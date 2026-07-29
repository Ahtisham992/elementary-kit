import React from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { LandingPage } from '../../../surfaces/web/LandingPage';
import { saasTheme } from '../../../theme/saas';
import { ecommerceTheme } from '../../../theme/ecommerce';
import { darkTheme } from '../../../theme/dark';
import { onboardingContent, orderShippedContent } from '../../../content/onboarding';

export default async function PreviewWeb({ searchParams }: { searchParams: Promise<{ flow?: string, theme?: string }> }) {
  const params = await searchParams;
  
  let theme = saasTheme;
  if (params.theme === 'Ecommerce') theme = ecommerceTheme;
  else if (params.theme === 'Dark Mode') theme = darkTheme;

  let content = onboardingContent;
  if (params.flow === 'shipped') content = orderShippedContent;

  const htmlString = renderToHtml(<LandingPage theme={theme} content={content} />);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#fff', zIndex: 9999 }}>
      <iframe srcDoc={htmlString} style={{ width: '100%', height: '100%', border: 'none' }} title="Web Preview" />
    </div>
  );
}
