import { useState, useEffect } from 'react';
import Head from 'next/head';

interface Signup {
  email: string;
  timestamp: string;
}

export default function Admin() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const response = await fetch('/api/admin/signups');
      if (response.ok) {
        const data = await response.json();
        setSignups(data.signups || []);
      } else {
        setError('Failed to fetch signups');
      }
    } catch (err) {
      setError('Error loading signups');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
        Loading signups...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin - Signups</title>
      </Head>
      
      <div style={{ 
        padding: '2rem', 
        fontFamily: 'monospace',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>
          Pre-Release Signups ({signups.length})
        </h1>
        
        {error && (
          <div style={{ 
            color: 'red', 
            marginBottom: '1rem',
            padding: '1rem',
            border: '1px solid red',
            borderRadius: '4px'
          }}>
            {error}
          </div>
        )}
        
        {signups.length === 0 ? (
          <p>No signups yet.</p>
        ) : (
          <div style={{ 
            backgroundColor: 'white', 
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}>
            {signups.map((signup, index) => (
              <div 
                key={index}
                style={{ 
                  padding: '1rem',
                  borderBottom: index < signups.length - 1 ? '1px solid #eee' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontWeight: 'bold' }}>{signup.email}</span>
                <span style={{ color: '#666' }}>
                  {new Date(signup.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
        
        <button 
          onClick={fetchSignups}
          style={{
            marginTop: '2rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Refresh
        </button>
      </div>
    </>
  );
}