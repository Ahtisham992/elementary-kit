import Link from 'next/link';
import React from 'react';

export default function OnboardingPage() {
  return (
    <main style={{ padding: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2.2rem', background: 'linear-gradient(90deg, #111, #555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>Welcome Aboard!</h1>
        <p style={{ color: '#4a5568', marginBottom: '2.5rem', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 500 }}>
          This is a placeholder onboarding destination for the Elementary Kit demo. In a real application, this is where the user would configure their account.
        </p>
        <Link href="/" style={{ padding: '12px 28px', borderRadius: '50px', backgroundColor: '#111', color: '#fff', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s', display: 'inline-block' }}>
          &larr; Back to Homepage
        </Link>
      </div>
    </main>
  );
}
