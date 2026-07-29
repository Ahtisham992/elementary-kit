"use client";

import React, { useState } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { WelcomeEmail } from '../surfaces/email/WelcomeEmail';
import { LandingPage } from '../surfaces/web/LandingPage';
import { Receipt } from '../surfaces/pdf/Receipt';
import { saasTheme } from '../theme/saas';
import { ecommerceTheme } from '../theme/ecommerce';
import { darkTheme } from '../theme/dark';
import { Mail, Globe, FileText, Code, X, Copy, Check, Info } from 'lucide-react';
import { onboardingContent, receiptContent, orderShippedContent, orderShippedReceiptContent } from '../content/onboarding';

// Modal component for inspecting markup
function InspectModal({ 
  isOpen, 
  onClose, 
  html, 
  title, 
  badge 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  html: string, 
  title: string,
  badge: string
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
      zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: '#1e1e1e', color: '#fff',
        borderRadius: '16px', width: '100%', maxWidth: '900px',
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 48px rgba(0,0,0,0.4)',
        border: '1px solid #333'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '1px solid #333' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>{title} Raw Output</h2>
            <div style={{ 
              marginTop: '0.5rem', display: 'inline-block', padding: '4px 10px', 
              backgroundColor: '#2d2d2d', borderRadius: '4px', fontSize: '0.85rem', color: '#a0a0a0' 
            }}>
              {badge}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleCopy} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '8px 16px', borderRadius: '6px', border: '1px solid #444',
              backgroundColor: '#2d2d2d', color: '#fff', cursor: 'pointer', transition: 'all 0.2s'
            }}>
              {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy HTML'}
            </button>
            <button onClick={onClose} style={{
              background: 'transparent', border: 'none', color: '#888', cursor: 'pointer'
            }}>
              <X size={24} />
            </button>
          </div>
        </div>
        
        {/* Modal Body (Code) */}
        <div style={{ padding: '1.5rem', overflow: 'auto', flexGrow: 1 }}>
          <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.5', color: '#e4e4e4', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            <code>{html}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTheme, setActiveTheme] = useState(saasTheme);
  const [activeFlow, setActiveFlow] = useState<'welcome' | 'shipped'>('welcome');
  const [isClient, setIsClient] = useState(false);
  const [inspecting, setInspecting] = useState<'email' | 'web' | 'pdf' | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const themes = [saasTheme, ecommerceTheme, darkTheme];
  const flows = [
    { id: 'welcome', label: 'Welcome Flow' },
    { id: 'shipped', label: 'Order Shipped Flow' }
  ];

  const currentContent = activeFlow === 'welcome' ? onboardingContent : orderShippedContent;
  const currentReceiptContent = activeFlow === 'welcome' ? receiptContent : orderShippedReceiptContent;

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

  // Render to HTML only on client to prevent hydration mismatch
  const rawEmailHtml = isClient ? renderToHtml(<WelcomeEmail theme={activeTheme} content={currentContent} />) : '';
  const emailHtml = injectStyles(rawEmailHtml, activeTheme.colors.background);
  
  const rawWebHtml = isClient ? renderToHtml(<LandingPage theme={activeTheme} content={currentContent} />) : '';
  const webHtml = injectStyles(rawWebHtml, activeTheme.colors.background);
  
  const rawPdfHtml = isClient ? renderToHtml(<Receipt theme={activeTheme} content={currentReceiptContent} />) : '';
  const pdfHtml = injectStyles(rawPdfHtml, activeTheme.colors.background);

  const getInspectData = () => {
    switch (inspecting) {
      case 'email':
        return { html: rawEmailHtml, title: 'Welcome Email', badge: '📧 Output Mode: Outlook-Safe Table HTML (Nested <table> tags)' };
      case 'web':
        return { html: rawWebHtml, title: 'Landing Page', badge: '🌐 Output Mode: Responsive Flexbox HTML (Modern <div> & CSS Grid/Flex)' };
      case 'pdf':
        return { html: rawPdfHtml, title: 'PDF Receipt', badge: '📄 Output Mode: Print-Ready Document Layout (Standardized XHTML document)' };
      default:
        return { html: '', title: '', badge: '' };
    }
  };

  const inspectData = getInspectData();

  return (
    <main style={{ padding: '3rem 2rem', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Inspect Modal */}
      <InspectModal 
        isOpen={inspecting !== null} 
        onClose={() => setInspecting(null)} 
        html={inspectData.html} 
        title={inspectData.title}
        badge={inspectData.badge}
      />

      {/* Info Modal */}
      {showInfo && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }} onClick={() => setShowInfo(false)}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '450px', width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#111' }}>About Elementary Kit</h3>
              <button onClick={() => setShowInfo(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><X size={20} /></button>
            </div>
            <p style={{ color: '#4a5568', lineHeight: 1.6, margin: '0 0 12px 0' }}>
              This demo renders the same content from one React component tree into 3 formats: Email, Web, and PDF using Unlayer Elements.
            </p>
            <p style={{ color: '#4a5568', lineHeight: 1.6, margin: '0 0 12px 0' }}>
              Switch between themes and flows to see how the same tree adapts.
            </p>
            <p style={{ color: '#4a5568', lineHeight: 1.6, margin: 0 }}>
              Click <strong>Inspect Markup</strong> on any panel to see the actual generated HTML/output for that surface.
            </p>
          </div>
        </div>
      )}

      {/* Premium Header */}
      <header className="glass-panel app-header">
        <div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.02em', background: 'linear-gradient(90deg, #111, #555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Elementary Kit</h1>
          <p style={{ margin: '2px 0 0 0', color: '#4a5568', fontSize: '1rem', fontWeight: 500 }}>One component tree. Every surface.</p>
        </div>
        
        <div className="header-actions" style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Template Flow Switcher */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.05)', padding: '6px', borderRadius: '50px', border: '1px solid rgba(0,0,0,0.1)' }}>
            {flows.map((f) => {
              const isActive = activeFlow === f.id;
              return (
                <button
                  key={f.id}
                  className="switcher-btn"
                  onClick={() => setActiveFlow(f.id as any)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    backgroundColor: isActive ? '#fff' : 'transparent',
                    color: isActive ? '#111' : '#666',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    transition: 'all 0.2s',
                    boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.05)' : 'none'
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(0,0,0,0.1)' }}></div>

          {/* Theme Switcher */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.5)', padding: '6px', borderRadius: '50px', border: '1px solid rgba(255,255,255,0.8)' }}>
            {themes.map((t) => {
              const isActive = activeTheme.name === t.name;
              return (
                <button
                  key={t.name}
                  className="switcher-btn"
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

          <button onClick={() => setShowInfo(true)} style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.8)', borderRadius: '50px', padding: '0 16px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4a5568', transition: 'all 0.2s', fontWeight: 600, gap: '6px' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.color = '#111'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#4a5568'; }} title="About this demo">
            <Info size={18} /> Info
          </button>

        </div>
      </header>
      
      {/* Surfaces Grid */}
      <div className="surfaces-grid">
        
        {/* Email Preview */}
        <div className="glass-panel surface-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Mail size={24} color={activeTheme.colors.primary} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>Welcome Email</h2>
            </div>
            <button onClick={() => setInspecting('email')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.05)', border: 'none', padding: '6px 12px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, color: '#4a5568', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#111'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#4a5568'; }}>
              <Code size={16} /> Inspect Markup
            </button>
          </div>
          <div style={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', backgroundColor: activeTheme.colors.background, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb', padding: '12px 16px', fontSize: '0.85rem', color: '#4b5563' }}>
              <div style={{ display: 'flex', marginBottom: '6px' }}><span style={{ width: '60px', fontWeight: 600 }}>To:</span> <span>user@example.com</span></div>
              <div style={{ display: 'flex', marginBottom: '6px' }}><span style={{ width: '60px', fontWeight: 600 }}>From:</span> <span>hello@elementary-kit.com</span></div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex' }}><span style={{ width: '60px', fontWeight: 600 }}>Subject:</span> <span>{activeFlow === 'welcome' ? 'Welcome to Elementary Kit' : 'Your Order has Shipped'}</span></div>
                <button disabled style={{ backgroundColor: '#e5e7eb', color: '#9ca3af', border: 'none', padding: '4px 12px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, cursor: 'not-allowed' }}>Send Preview</button>
              </div>
            </div>
            <iframe key={`email-${activeTheme.name}-${activeFlow}`} srcDoc={emailHtml} style={{ width: '100%', flexGrow: 1, border: 'none' }} title="Email Preview" />
          </div>
        </div>

        {/* Web Preview */}
        <div className="glass-panel surface-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Globe size={24} color={activeTheme.colors.primary} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>Landing Page</h2>
            </div>
            <button onClick={() => setInspecting('web')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.05)', border: 'none', padding: '6px 12px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, color: '#4a5568', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#111'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#4a5568'; }}>
              <Code size={16} /> Inspect Markup
            </button>
          </div>
          <div style={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', backgroundColor: activeTheme.colors.background, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#e5e5ea', borderBottom: '1px solid #d1d1d6', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
              </div>
              <div style={{ flexGrow: 1, backgroundColor: '#ffffff', borderRadius: '6px', padding: '4px 12px', fontSize: '0.8rem', color: '#8e8e93', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
                <span>elementary-kit.vercel.app</span>
                <a href="https://elementary-kit.vercel.app/" target="_blank" rel="noreferrer" style={{ color: '#007aff', textDecoration: 'none' }}>Open tab ↗</a>
              </div>
            </div>
            <iframe key={`web-${activeTheme.name}-${activeFlow}`} srcDoc={webHtml} style={{ width: '100%', flexGrow: 1, border: 'none' }} title="Web Preview" />
          </div>
        </div>

        {/* PDF Preview */}
        <div className="glass-panel surface-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', transition: 'transform 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText size={24} color={activeTheme.colors.primary} />
              <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2d3748', margin: 0 }}>PDF Receipt</h2>
            </div>
            <button onClick={() => setInspecting('pdf')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.05)', border: 'none', padding: '6px 12px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600, color: '#4a5568', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.1)'; e.currentTarget.style.color = '#111'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#4a5568'; }}>
              <Code size={16} /> Inspect Markup
            </button>
          </div>
          <div style={{ flexGrow: 1, borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.8)', backgroundColor: '#323639', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ backgroundColor: '#202124', borderBottom: '1px solid #1a1a1c', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f1f3f4' }}>
              <span style={{ fontSize: '0.85rem' }}>receipt_{activeFlow}.pdf</span>
              <a href={activeFlow === 'welcome' ? '/api/download/invoice/EK-9938' : '/api/download/invoice/EK-9939'} target="_blank" rel="noreferrer" style={{ backgroundColor: '#8ab4f8', color: '#202124', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download
              </a>
            </div>
            <div style={{ padding: '20px', flexGrow: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', backgroundColor: activeTheme.colors.background, boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
                <iframe key={`pdf-${activeTheme.name}-${activeFlow}`} srcDoc={pdfHtml} style={{ width: '100%', height: '100%', minHeight: '600px', border: 'none' }} title="PDF Preview" />
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Page Footer */}
      <footer style={{ marginTop: '60px', padding: '24px', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', color: '#666', fontSize: '0.9rem' }}>
        <div>Built for the <a href="https://unlayer.com" target="_blank" rel="noreferrer" style={{ color: '#111', fontWeight: 600, textDecoration: 'none' }}>Unlayer #BuiltWithElements Challenge</a></div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://github.com/Ahtisham992/elementary-kit" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'none' }}>GitHub Repo</a>
          <span>&bull;</span>
          <a href="https://github.com/unlayer/elements" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'none' }}>Unlayer Elements</a>
        </div>
      </footer>
    </main>
  );
}
