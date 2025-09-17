import React, { useState } from 'react';

export default function CustomFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! You\'ve been added to our pre-release list.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };
  return (
    <footer id="signup-section" style={{
      backgroundColor: '#E5E5E5',
      padding: '4rem 2rem',
      position: 'relative',
      minHeight: '80vh'
    }}>
      {/* Large background text */}
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(11.5rem, 27.6vw, 34.5rem)',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.4)',
        fontFamily: '"Coinbase Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: '0.8',
        textAlign: 'center',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        tachi
      </div>

      {/* Content overlay */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '0 auto',
        height: '100%'
      }}>
        {/* Left side - Pre-Release signup */}
        <div style={{
          maxWidth: '400px'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            fontWeight: '400',
            color: '#333',
            marginBottom: '2rem',
            fontFamily: '"Coinbase Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            letterSpacing: '-0.02em',
            lineHeight: '1.2'
          }}>
            Pre-Release Sign Up
          </h3>
          
          <form onSubmit={handleSubmit} style={{
            fontSize: '1.8rem',
            fontFamily: '"Coinbase Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '400',
            lineHeight: '1.2',
            color: '#333',
            letterSpacing: '-0.02em'
          }}>
            <input
              type="email"
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              style={{
                fontSize: 'inherit',
                lineHeight: 'inherit',
                fontFamily: 'inherit',
                fontWeight: 'inherit',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                borderBottom: '3px solid #FF7043',
                borderRadius: '0',
                transition: 'all 0.2s ease',
                padding: '0 0 4px 0',
                margin: '0',
                display: 'inline',
                verticalAlign: 'baseline',
                minWidth: '300px',
                color: '#FF7043',
                opacity: status === 'loading' ? 0.6 : 1,
              }}
              onFocus={(e) => {
                e.target.style.borderBottomWidth = '4px';
                e.target.style.borderBottomColor = '#E5633A';
              }}
              onBlur={(e) => {
                e.target.style.borderBottomWidth = '3px';
                e.target.style.borderBottomColor = '#FF7043';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
            {message && (
              <div style={{
                marginTop: '1rem',
                fontSize: '1rem',
                color: status === 'success' ? '#52796F' : '#E5633A',
                fontFamily: '"Coinbase Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Right side - Navigation links */}
        <div style={{
          display: 'flex',
          gap: '4rem'
        }}>
          <div>
            <span style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: '"Coinbase Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'default'
            }}>
              Docs
            </span>
          </div>

          <div>
            <span style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: '"Coinbase Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'default'
            }}>
              Terms
            </span>
          </div>

          <div>
            <span style={{
              color: '#333',
              textDecoration: 'none',
              fontSize: '1rem',
              fontFamily: '"Coinbase Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              cursor: 'default'
            }}>
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}