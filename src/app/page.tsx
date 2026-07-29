"use client";

import React, { useState } from 'react';
import { renderToHtml } from '@unlayer/react-elements';
import { WelcomeEmail } from '../surfaces/email/WelcomeEmail';
import { LandingPage } from '../surfaces/web/LandingPage';
import { Receipt } from '../surfaces/pdf/Receipt';
import { saasTheme } from '../theme/saas';
import { ecommerceTheme } from '../theme/ecommerce';
import { darkTheme } from '../theme/dark';
import { LayoutTemplate, Droplets, Palette, Code, X, Mail, Globe, FileText, Info, Check, Copy } from 'lucide-react';
import { onboardingContent, receiptContent, orderShippedContent, orderShippedReceiptContent, ContentPayload } from '../content/onboarding';
import { Theme } from '../theme/tokens';

interface SavedPreset {
  id: string;
  name: string;
  content: ContentPayload;
  receiptContent: ContentPayload;
  theme: Theme;
  timestamp: number;
}

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
  const [activeFlow, setActiveFlow] = useState<'welcome' | 'shipped' | 'custom'>('welcome');
  const [isClient, setIsClient] = useState(false);
  const [inspecting, setInspecting] = useState<'email' | 'web' | 'pdf' | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const [customContent, setCustomContent] = useState<ContentPayload>(onboardingContent);
  const [customReceiptContent, setCustomReceiptContent] = useState<ContentPayload>(receiptContent);

  const [customTheme, setCustomTheme] = useState<Theme>({
    name: 'Custom Theme',
    colors: { primary: '#6366f1', background: '#ffffff', text: '#1f2937' },
    fontFamily: 'Arial, sans-serif',
    spacing: { base: '1rem' },
    borderRadius: '6px'
  });

  const [draftContent, setDraftContent] = useState<ContentPayload>(onboardingContent);
  const [draftReceiptContent, setDraftReceiptContent] = useState<ContentPayload>(receiptContent);
  const [draftTheme, setDraftTheme] = useState<Theme>({
    name: 'Custom Theme',
    colors: { primary: '#6366f1', background: '#ffffff', text: '#1f2937' },
    fontFamily: 'Arial, sans-serif',
    spacing: { base: '1rem' },
    borderRadius: '6px'
  });

  const [presets, setPresets] = useState<SavedPreset[]>([]);

  React.useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem('elementary-kit-presets');
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const savePreset = () => {
    const name = window.prompt('Enter a name for this preset:');
    if (!name) return;
    const newPreset: SavedPreset = {
      id: Date.now().toString(),
      name,
      content: draftContent,
      receiptContent: draftReceiptContent,
      theme: draftTheme,
      timestamp: Date.now()
    };
    const updated = [...presets, newPreset];
    setPresets(updated);
    localStorage.setItem('elementary-kit-presets', JSON.stringify(updated));
  };

  const loadPreset = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const preset = presets.find(p => p.id === e.target.value);
    if (preset) {
      setDraftContent(preset.content);
      setDraftReceiptContent(preset.receiptContent);
      setDraftTheme(preset.theme);
      
      setCustomContent(preset.content);
      setCustomReceiptContent(preset.receiptContent);
      setCustomTheme(preset.theme);
      
      e.target.value = "";
    }
  };

  const resetPreset = () => {
    if (!window.confirm('Are you sure you want to reset all custom fields to their defaults?')) return;
    
    const defaultTheme = {
      name: 'Custom Theme',
      colors: { primary: '#6366f1', background: '#ffffff', text: '#1f2937' },
      fontFamily: 'Arial, sans-serif',
      spacing: { base: '1rem' },
      borderRadius: '6px'
    };

    setDraftContent(onboardingContent);
    setDraftReceiptContent(receiptContent);
    setDraftTheme(defaultTheme);
    
    setCustomContent(onboardingContent);
    setCustomReceiptContent(receiptContent);
    setCustomTheme(defaultTheme);
  };

  const themes = [saasTheme, ecommerceTheme, darkTheme];
  const flows = [
    { id: 'welcome', label: 'Welcome Flow' },
    { id: 'shipped', label: 'Order Shipped Flow' },
    { id: 'custom', label: 'Studio Mode' }
  ];

  const currentContent = activeFlow === 'custom' ? customContent : (activeFlow === 'welcome' ? onboardingContent : orderShippedContent);
  const currentReceiptContent = activeFlow === 'custom' ? customReceiptContent : (activeFlow === 'welcome' ? receiptContent : orderShippedReceiptContent);
  const currentTheme = activeFlow === 'custom' ? customTheme : activeTheme;

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
  const rawEmailHtml = isClient ? renderToHtml(<WelcomeEmail theme={currentTheme} content={currentContent} />) : '';
  const emailHtml = injectStyles(rawEmailHtml, currentTheme.colors.background);

  const rawWebHtml = isClient ? renderToHtml(<LandingPage theme={currentTheme} content={currentContent} />) : '';
  const webHtml = injectStyles(rawWebHtml, currentTheme.colors.background);

  const rawPdfHtml = isClient ? renderToHtml(<Receipt theme={currentTheme} content={currentReceiptContent} />) : '';
  const pdfHtml = injectStyles(rawPdfHtml, currentTheme.colors.background);

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
              <strong>Elementary Kit</strong> renders a single React component tree into 3 distinct surfaces: Email, Web, and PDF using Unlayer Elements.
            </p>
            <ul style={{ color: '#4a5568', lineHeight: 1.6, margin: '0 0 16px 0', paddingLeft: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>Preset Flows:</strong> Switch between default flows and themes to see how the responsive layout seamlessly adapts.</li>
              <li style={{ marginBottom: '8px' }}><strong>Studio Mode:</strong> Build your own custom template! Adjust the copy, tweak the receipt data, and configure the theme to match your brand.</li>
              <li style={{ marginBottom: '8px' }}><strong>Save Presets:</strong> Save your custom designs securely to your local browser storage and load them anytime.</li>
              <li><strong>Export Center:</strong> Download the raw, platform-ready HTML files or copy the React JSON props to drop directly into your production environment.</li>
            </ul>
            <p style={{ color: '#4a5568', lineHeight: 1.6, margin: 0, padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              Click <strong>Inspect Markup</strong> on any surface to view the final compiled HTML, perfectly optimized for its destination.
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

      {/* Studio Mode Editor */}
      {activeFlow === 'custom' && (
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Preset Management */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: '#1e293b' }}>Presets</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>Save and load your custom designs locally</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {presets.length > 0 && (
                <select onChange={loadPreset} defaultValue="" style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', backgroundColor: '#fff', minWidth: '150px' }}>
                  <option value="" disabled>Load a preset...</option>
                  {presets.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              )}
              <button onClick={savePreset} style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#334155', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#f1f5f9'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#fff'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg> Save as Preset
              </button>
              <button onClick={resetPreset} style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#fecaca'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#fee2e2'}>
                <X size={16} /> Reset
              </button>
            </div>
          </div>
          <div>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: 700, color: '#111' }}>Content Editor</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Headline</label>
                <input type="text" value={draftContent.headline} onChange={e => {
                  setDraftContent({ ...draftContent, headline: e.target.value });
                  setDraftReceiptContent({ ...draftReceiptContent, headline: e.target.value });
                }} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>CTA Text</label>
                <input type="text" value={draftContent.ctaText} onChange={e => {
                  setDraftContent({ ...draftContent, ctaText: e.target.value });
                  setDraftReceiptContent({ ...draftReceiptContent, ctaText: e.target.value });
                }} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>CTA URL</label>
                <input type="url" value={draftContent.ctaUrl} onChange={e => {
                  setDraftContent({ ...draftContent, ctaUrl: e.target.value });
                  setDraftReceiptContent({ ...draftReceiptContent, ctaUrl: e.target.value });
                }} onBlur={e => {
                  let val = e.target.value.trim();
                  if (!val) {
                    val = 'https://elementary-kit.vercel.app';
                  } else if (!/^https?:\/\//i.test(val)) {
                    val = 'https://' + val;
                  }
                  setDraftContent({ ...draftContent, ctaUrl: val });
                  setDraftReceiptContent({ ...draftReceiptContent, ctaUrl: val });
                }} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Body Copy</label>
                <textarea value={draftContent.bodyCopy} onChange={e => {
                  setDraftContent({ ...draftContent, bodyCopy: e.target.value });
                  setDraftReceiptContent({ ...draftReceiptContent, bodyCopy: e.target.value });
                }} style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '100px', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '12px' }}>Receipt Items</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {draftReceiptContent.receiptDetails?.items.map((item, i) => (
                    <div key={`item-${i}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input type="text" placeholder="Description (e.g. Pro Plan)" value={item.description} onChange={e => {
                        const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                        newDetails.items = [...newDetails.items];
                        newDetails.items[i] = { ...newDetails.items[i], description: e.target.value };
                        setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                      }} style={{ flex: 2, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
                      <input type="number" placeholder="Price (e.g. 49)" value={item.price} onChange={e => {
                        const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                        newDetails.items = [...newDetails.items];
                        newDetails.items[i] = { ...newDetails.items[i], price: parseFloat(e.target.value) || 0 };
                        setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                      }} style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
                      <button onClick={() => {
                        const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                        newDetails.items = newDetails.items.filter((_, idx) => idx !== i);
                        setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                      }} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#fecaca'} onMouseOut={e => e.currentTarget.style.background = '#fee2e2'}><X size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                    newDetails.items = [...newDetails.items, { description: 'New Item', price: 0 }];
                    setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                  }} style={{ alignSelf: 'flex-start', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600, color: '#4a5568', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#111'; }} onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#4a5568'; }}>+ Add Receipt Item</button>
                </div>
              </div>
              
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '12px' }}>Extra Charges (Shipping, etc.)</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {draftReceiptContent.receiptDetails?.extraCharges.map((charge, i) => (
                    <div key={`charge-${i}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input type="text" placeholder="Label (e.g. Shipping)" value={charge.label} onChange={e => {
                        const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                        newDetails.extraCharges = [...newDetails.extraCharges];
                        newDetails.extraCharges[i] = { ...newDetails.extraCharges[i], label: e.target.value };
                        setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                      }} style={{ flex: 2, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
                      <input type="number" placeholder="Amount (e.g. 15)" value={charge.amount} onChange={e => {
                        const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                        newDetails.extraCharges = [...newDetails.extraCharges];
                        newDetails.extraCharges[i] = { ...newDetails.extraCharges[i], amount: parseFloat(e.target.value) || 0 };
                        setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                      }} style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
                      <button onClick={() => {
                        const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                        newDetails.extraCharges = newDetails.extraCharges.filter((_, idx) => idx !== i);
                        setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                      }} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '8px', height: '40px', width: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#fecaca'} onMouseOut={e => e.currentTarget.style.background = '#fee2e2'}><X size={18} /></button>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                    newDetails.extraCharges = [...newDetails.extraCharges, { label: 'New Charge', amount: 0 }];
                    setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                  }} style={{ alignSelf: 'flex-start', background: '#f8fafc', border: '1px solid #e2e8f0', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600, color: '#4a5568', transition: 'all 0.2s' }} onMouseOver={e => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#111'; }} onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = '#4a5568'; }}>+ Add Extra Charge</button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Tax Rate (%)</label>
                <input type="number" value={draftReceiptContent.receiptDetails?.taxRate || 0} onChange={e => {
                  const newDetails = { items: [], taxRate: 0, extraCharges: [], ...draftReceiptContent.receiptDetails };
                  newDetails.taxRate = parseFloat(e.target.value) || 0;
                  setDraftReceiptContent({ ...draftReceiptContent, receiptDetails: newDetails });
                }} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem' }} />
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
            <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.4rem', fontWeight: 700, color: '#111' }}>Theme Editor</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Primary Color</label>
                <input type="color" value={draftTheme.colors.primary} onChange={e => setDraftTheme({ ...draftTheme, colors: { ...draftTheme.colors, primary: e.target.value } })} style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Background Color</label>
                <input type="color" value={draftTheme.colors.background} onChange={e => setDraftTheme({ ...draftTheme, colors: { ...draftTheme.colors, background: e.target.value } })} style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Text Color</label>
                <input type="color" value={draftTheme.colors.text} onChange={e => setDraftTheme({ ...draftTheme, colors: { ...draftTheme.colors, text: e.target.value } })} style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '8px', cursor: 'pointer' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Font Family</label>
                <select value={draftTheme.fontFamily} onChange={e => setDraftTheme({ ...draftTheme, fontFamily: e.target.value })} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', height: '40px', backgroundColor: '#fff' }}>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                  <option value="system-ui, sans-serif">System UI</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#4a5568', marginBottom: '8px' }}>Border Radius (px)</label>
                <input type="number" value={parseInt(draftTheme.borderRadius || '6')} onChange={e => setDraftTheme({ ...draftTheme, borderRadius: `${e.target.value}px` })} style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.95rem', height: '40px' }} min="0" max="40" />
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => {
              setCustomContent(draftContent);
              setCustomReceiptContent(draftReceiptContent);
              setCustomTheme(draftTheme);
            }} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }} onMouseOver={e => { e.currentTarget.style.background = '#4338ca'; e.currentTarget.style.transform = 'translateY(-1px)'; }} onMouseOut={e => { e.currentTarget.style.background = '#4f46e5'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <Check size={18} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
              Apply Changes
            </button>
          </div>
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 700, color: '#111' }}>Export Center</h2>
            <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: '#64748b' }}>Export your customized React payloads or download HTML for your own platform.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <button onClick={() => {
                const blob = new Blob([emailHtml], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `email_custom.html`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
              }} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '10px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
                <Mail size={16} /> Download Email HTML
              </button>

              <button onClick={() => {
                const blob = new Blob([webHtml], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `landing_page_custom.html`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
              }} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '10px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
                <Globe size={16} /> Download Web HTML
              </button>

              <button onClick={() => {
                const payload = {
                  theme: customTheme,
                  content: customContent,
                  receiptContent: customReceiptContent
                };
                navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
                alert('React Props copied to clipboard!');
              }} style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', padding: '10px 16px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor = '#e2e8f0'} onMouseOut={e => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
                <Copy size={16} /> Copy JSON Payload
              </button>
            </div>
          </div>
        </div>
      )}

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
                <a href={`/preview/web?flow=${activeFlow}&theme=${encodeURIComponent(activeTheme.name)}`} target="_blank" rel="noreferrer" style={{ color: '#007aff', textDecoration: 'none' }}>Open tab ↗</a>
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
              {activeFlow === 'custom' ? (
                <button onClick={() => {
                  const printWindow = window.open('', '', 'width=800,height=900');
                  if (printWindow) {
                    printWindow.document.write(pdfHtml);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => {
                      printWindow.print();
                      printWindow.close();
                    }, 250);
                  }
                }} style={{ backgroundColor: '#8ab4f8', color: '#202124', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} title="Vercel serverless doesn't support Puppeteer backend rendering. Click to Print -> Save as PDF.">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Print PDF
                </button>
              ) : (
                <a href={activeFlow === 'welcome' ? '/api/download/invoice/EK-9938' : '/api/download/invoice/EK-9939'} target="_blank" rel="noreferrer" style={{ backgroundColor: '#8ab4f8', color: '#202124', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Download
                </a>
              )}
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
        <div>
          Built for the <a href="https://unlayer.com" target="_blank" rel="noreferrer" style={{ color: '#111', fontWeight: 600, textDecoration: 'none' }}>Unlayer #BuiltWithElements Challenge</a>
          <span style={{ margin: '0 8px' }}>|</span>
          <span style={{ color: '#888' }}>Powered by React Server Components & Puppeteer</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://github.com/Ahtisham992/elementary-kit" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#111'} onMouseOut={e => e.currentTarget.style.color = '#666'}>GitHub Repo</a>
          <span>&bull;</span>
          <a href="https://github.com/unlayer/elements" target="_blank" rel="noreferrer" style={{ color: '#666', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#111'} onMouseOut={e => e.currentTarget.style.color = '#666'}>Unlayer Elements Documentation</a>
        </div>
      </footer>
    </main>
  );
}
