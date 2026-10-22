import React from 'react';

const ApiCard = ({ title, hasPermission, scopeName, children, wide }) => {
  return (
    <div style={wide ? (hasPermission ? styles.cardWide : styles.disabledWide) : (hasPermission ? styles.card : styles.disabled)}>
      <div style={styles.cardHeader}>
        <h3 style={styles.title}>{title}</h3>
        <span style={hasPermission ? styles.activeBadge : styles.lockedBadge}>
          {hasPermission ? 'Authorized' : 'Scope Locked'}
        </span>
      </div>

      {hasPermission ? (
        <div style={styles.content}>{children}</div>
      ) : (
        <div style={styles.lockedState}>
          <p style={styles.lockText}>🔒 Data hidden by Open Banking Consent policy.</p>
          <small style={styles.scopeHelp}>Requires <code>{scopeName}</code> permission scope.</small>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: { width: '300px', padding: '20px', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E1E4E8', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' },
  cardWide: { width: '620px', padding: '20px', backgroundColor: '#FFF', borderRadius: '8px', border: '1px solid #E1E4E8', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' },
  disabled: { width: '300px', padding: '20px', backgroundColor: '#F8F9FA', borderRadius: '8px', border: '1px dashed #CCC', opacity: 0.75 },
  disabledWide: { width: '620px', padding: '20px', backgroundColor: '#F8F9FA', borderRadius: '8px', border: '1px dashed #CCC', opacity: 0.75 },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
  title: { margin: 0, fontSize: '16px', color: '#333' },
  activeBadge: { fontSize: '10px', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' },
  lockedBadge: { fontSize: '10px', backgroundColor: '#FFEBEE', color: '#C62828', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' },
  content: { fontSize: '14px', color: '#444' },
  lockedState: { textAlign: 'center', padding: '15px 0' },
  lockText: { margin: '0 0 5px 0', fontSize: '13px', color: '#666' },
  scopeHelp: { fontSize: '11px', color: '#888' }
};

export default ApiCard;