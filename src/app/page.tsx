import React from 'react';
import { WelcomeEmail } from '../surfaces/email/WelcomeEmail';
import { renderToHtml } from '@unlayer/react-elements';

export default function Home() {
  const emailHtml = renderToHtml(<WelcomeEmail />);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Elementary Kit - Phase 1 Preview</h1>
      <p>This is a preview of the Welcome Email component rendered directly.</p>
      
      <div style={{ border: '1px solid #ccc', marginTop: '2rem', height: '800px' }}>
        <iframe 
          srcDoc={emailHtml} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Email Preview"
        />
      </div>
    </main>
  );
}
