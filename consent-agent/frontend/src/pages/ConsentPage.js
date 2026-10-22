import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';

const ConsentPage = () => {
  const { user, updateConsent } = useConsent();
  const navigate = useNavigate();

  const [scopes, setScopes] = useState({
    readAccounts: true,
    readBalances: true,
    readTransactions: false,
  });

  const handleToggle = (key) => {
    setScopes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleConfirm = () => {
    const grantedPermissions = Object.keys(scopes).filter((key) => scopes[key]);
    const consentId = 'CNS-' + Math.floor(100000 + Math.random() * 900000);

    updateConsent(grantedPermissions, consentId);
    navigate('/dashboard');
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.heading}>Open Banking Data Sharing Authorization</h3>
        <p style={styles.sub}>Authenticated User: <strong>{user?.name || 'Customer'}</strong></p>
        <p style={styles.desc}>Select the Open Banking data permissions you wish to share with Enterprise AI Fabric Copilot:</p>

        <div style={styles.optionsGroup}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={scopes.readAccounts}
              onChange={() => handleToggle('readAccounts')}
            />
            <span>Account Profile Information (ReadAccounts)</span>
          </label>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={scopes.readBalances}
              onChange={() => handleToggle('readBalances')}
            />
            <span>Live Account Balances (ReadBalances)</span>
          </label>

          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={scopes.readTransactions}
              onChange={() => handleToggle('readTransactions')}
            />
            <span>Detailed Transaction Streams (ReadTransactions)</span>
          </label>
        </div>

        <button onClick={handleConfirm} style={styles.button}>
          Grant Consent & Continue
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f9' },
  card: { width: '460px', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  heading: { color: '#4A154B', marginTop: 0 },
  sub: { fontSize: '14px', color: '#333' },
  desc: { fontSize: '13px', color: '#666', marginBottom: '20px' },
  optionsGroup: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px' },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', cursor: 'pointer' },
  button: { width: '100%', padding: '12px', backgroundColor: '#008060', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default ConsentPage;