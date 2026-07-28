"use client";

import React, { useState } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { WelcomeEmail } from '../surfaces/email/WelcomeEmail';
import { LandingPage } from '../surfaces/web/LandingPage';
import { Receipt } from '../surfaces/pdf/Receipt';
import { saasTheme } from '../theme/saas';
import { ecommerceTheme } from '../theme/ecommerce';
import { darkTheme } from '../theme/dark';
import { onboardingContent } from '../content/onboarding';

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(saasTheme);

  const themes = [saasTheme, ecommerceTheme, darkTheme];

  // Render to HTML
  const emailHtml = renderToHtml(<WelcomeEmail theme={activeTheme} content={onboardingContent} />);
  const webHtml = renderToHtml(<LandingPage theme={activeTheme} content={onboardingContent} />);
  const pdfHtml = renderToHtml(<Receipt theme={activeTheme} content={onboardingContent} />);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1400px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>Elementary Kit</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '1.1rem' }}>One component tree. Every surface.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => setActiveTheme(t)}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: activeTheme.name === t.name ? `2px solid ${t.colors.primary}` : '1px solid #ccc',
                backgroundColor: activeTheme.name === t.name ? `${t.colors.primary}15` : '#fff',
                cursor: 'pointer',
                fontWeight: activeTheme.name === t.name ? 'bold' : 'normal',
                transition: 'all 0.2s'
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', height: '75vh', minHeight: '600px' }}>
        {/* Email Preview */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '1rem' }}>📧 Welcome Email</h2>
          <iframe 
            srcDoc={emailHtml} 
            style={{ flexGrow: 1, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            title="Email Preview"
          />
        </div>

        {/* Web Preview */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '1rem' }}>🌐 Landing Page</h2>
          <iframe 
            srcDoc={webHtml} 
            style={{ flexGrow: 1, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            title="Web Preview"
          />
        </div>

        {/* PDF Preview */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.2rem', textAlign: 'center', marginBottom: '1rem' }}>📄 PDF Receipt</h2>
          <iframe 
            srcDoc={pdfHtml} 
            style={{ flexGrow: 1, border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            title="PDF Preview"
          />
        </div>
      </div>
    </main>
  );
}
