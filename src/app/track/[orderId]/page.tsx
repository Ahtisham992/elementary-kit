import Link from 'next/link';
import React from 'react';

export default async function TrackPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params;
  return (
    <main style={{ padding: '4rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2.2rem', background: 'linear-gradient(90deg, #111, #555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>
          Tracking Order {orderId}
        </h1>
        
        <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', padding: '1.5rem', borderRadius: '16px', margin: '2rem 0', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, color: '#2d3748', fontSize: '1.1rem' }}>Carrier: FedEx</p>
          <p style={{ margin: 0, color: '#4a5568', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#48bb78' }}></span>
            Status: In Transit
          </p>
        </div>
        
        <p style={{ color: '#4a5568', marginBottom: '2.5rem', fontSize: '1.05rem', fontWeight: 500 }}>
          This is a placeholder tracking destination for the Elementary Kit demo.
        </p>
        
        <Link href="/" style={{ padding: '12px 28px', borderRadius: '50px', backgroundColor: '#111', color: '#fff', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s', display: 'inline-block' }}>
          &larr; Back to Homepage
        </Link>
      </div>
    </main>
  );
}
