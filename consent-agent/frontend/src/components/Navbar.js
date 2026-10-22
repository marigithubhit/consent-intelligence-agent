import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';

const Navbar = () => {
  const { user, consent, setUser, updateConsent } = useConsent();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    updateConsent([], null);
    navigate('/login');
  };

  return (
    <header style={styles.navbar}>
      <div style={styles.brand}>
        <span style={styles.logo}>Enterprise AI Fabric</span>
        <span style={styles.subLogo}>Open Banking Portal</span>
      </div>

      <div style={styles.statusGroup}>
        <div style={styles.userInfo}>
          <span>User: <strong>{user?.name || 'Customer'}</strong></span>
          <span style={styles.consentId}>Consent ID: <code>{consent.consentId || 'N/A'}</code></span>
        </div>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Revoke & Logout
        </button>
      </div>
    </header>
  );
};

const styles = {
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#4A154B', color: '#FFF' },
  brand: { display: 'flex', alignItems: 'center', gap: '10px' },
  logo: { fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.5px' },
  subLogo: { fontSize: '12px', opacity: 0.8, paddingLeft: '8px', borderLeft: '1px solid rgba(255,255,255,0.3)' },
  statusGroup: { display: 'flex', alignItems: 'center', gap: '20px' },
  userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '12px' },
  consentId: { fontSize: '11px', opacity: 0.85, marginTop: '2px' },
  logoutBtn: { backgroundColor: '#C70039', color: '#FFF', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }
};

export default Navbar;