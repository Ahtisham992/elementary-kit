"use client";

import React, { useState } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { WelcomeEmail } from '../surfaces/email/WelcomeEmail';
import { LandingPage } from '../surfaces/web/LandingPage';
import { Receipt } from '../surfaces/pdf/Receipt';
import { saasTheme } from '../theme/saas';
import { ecommerceTheme } from '../theme/ecommerce';
import { darkTheme } from '../theme/dark';
import { Mail, Globe, FileText } from 'lucide-react';
import { onboardingContent, receiptContent } from '../content/onboarding';

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(saasTheme);
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const themes = [saasTheme, ecommerceTheme, darkTheme];

  const injectStyles = (html: string, bgColor: string) => {
    const css = `
      html, body, .u_body { background-color: ${bgColor} !important; }
      @media (max-width: 480px) {
        .u-row:not(.no-stack) .u-col.u-col-50 {
          flex: 0 0 50% !important;
          max-width: 50% !important;
        }
      }
    `;
    return html.replace('</head>', `<style>${css}</style></head>`);
  };

  // Render to HTML only on client to prevent hydration mismatch (Unlayer generates random IDs)
  const emailHtml = isClient ? injectStyles(renderToHtml(<WelcomeEmail theme={activeTheme} content={onboardingContent} />), activeTheme.colors.background) : '';
  const webHtml = isClient ? injectStyles(renderToHtml(<LandingPage theme={activeTheme} content={onboardingContent} />), activeTheme.colors.background) : '';
  const pdfHtml = isClient ? injectStyles(renderToHtml(<Receipt theme={activeTheme} content={receiptContent} />), activeTheme.colors.background) : '';

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Premium Header */}
      <header className="glass-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1.5rem 3rem',
        borderRadius: '100px', // pill shape
        position: 'sticky',
        top: '1rem',
        zIndex: 10
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #111, #555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Elementary Kit</h1>
          <p style={{ margin: '2px 0 0 0', color: '#4a5568', fontSize: '1rem', fontWeight: 500 }}>One component tree. Every surface.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.5)', padding: '6px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.8)' }}>
          {themes.map((t) => {
            const isActive = activeTheme.name === t.name;
            return (
              <button
                key={t.name}
                onClick={() => setActiveTheme(t)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '50px',
                  border: 'none',
                  backgroundColor: isActive ? t.colors.primary : 'transparent',
                  color: isActive ? '#fff' : '#4a5568',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? `0 4px 14px 0 ${t.colors.primary}66` : 'none',
                  transform: isActive ? 'scale(1.02)' : 'scale(1)'
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)';
                    e.currentTarget.style.color = '#111';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#4a5568';
                  }
                }}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </header>
      
      {/* Surfaces Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', height: '75vh', minHeight: '650px' }}>
        
        {/* Email Preview */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <Mail size={24} color={activeTheme.colors.primary} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>Welcome Email</h2>
          </div>
          <div style={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', backgroundColor: activeTheme.colors.background, boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
            <iframe key={`email-${activeTheme.name}`} srcDoc={emailHtml} style={{ width: '100%', height: '100%', border: 'none' }} title="Email Preview" />
          </div>
        </div>

        {/* Web Preview */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <Globe size={24} color={activeTheme.colors.primary} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>Landing Page</h2>
          </div>
          <div style={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', backgroundColor: activeTheme.colors.background, boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
            <iframe key={`web-${activeTheme.name}`} srcDoc={webHtml} style={{ width: '100%', height: '100%', border: 'none' }} title="Web Preview" />
          </div>
        </div>

        {/* PDF Preview */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <FileText size={24} color={activeTheme.colors.primary} />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>PDF Receipt</h2>
          </div>
          <div style={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', backgroundColor: activeTheme.colors.background, boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)' }}>
            <iframe key={`pdf-${activeTheme.name}`} srcDoc={pdfHtml} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF Preview" />
          </div>
        </div>
        
      </div>
    </main>
  );
}
