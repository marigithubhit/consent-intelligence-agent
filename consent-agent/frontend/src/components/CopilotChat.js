import React, { useState } from 'react';
import { useConsent } from '../context/ConsentContext';
import { fetchAiInsights } from '../services/api';

const CopilotChat = ({ accountId }) => {
  const { consent } = useConsent();
  const [userQuery, setUserQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = async () => {
    if (!userQuery.trim() || isAsking) return;

    const query = userQuery.trim();
    setUserQuery('');
    setChatHistory((prev) => [...prev, { role: 'user', text: query }]);
    setIsAsking(true);

    try {
      const data = await fetchAiInsights(accountId, query, consent.permissions);
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', text: data.reply || data.insight || 'No response.' }
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'ai', text: '⚠️ Unable to reach Enterprise AI Fabric Copilot service.' }
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div style={styles.chatBox}>
      <div style={styles.header}>
        <h4>Enterprise AI Fabric Copilot</h4>
        <small style={styles.badge}>Consent ID: {consent.consentId || 'Active'}</small>
      </div>

      <div style={styles.messages}>
        {chatHistory.length === 0 && (
          <p style={styles.empty}>Ask me anything about your active accounts or spending patterns.</p>
        )}
        {chatHistory.map((msg, idx) => (
          <div key={idx} style={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            <strong>{msg.role === 'user' ? 'You' : 'Copilot'}:</strong>
            <p style={{ margin: '4px 0 0 0' }}>{msg.text}</p>
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Ask Copilot..."
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button style={styles.sendBtn} onClick={handleAsk} disabled={isAsking}>
          {isAsking ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatBox: { display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid #E1E4E8', borderRadius: '8px', backgroundColor: '#FFF' },
  header: { padding: '15px', backgroundColor: '#4A154B', color: '#FFF', borderRadius: '8px 8px 0 0' },
  badge: { fontSize: '11px', opacity: 0.8 },
  messages: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  empty: { fontSize: '13px', color: '#888', textAlign: 'center', marginTop: '20px' },
  userMsg: { alignSelf: 'flex-end', backgroundColor: '#E8F5E9', padding: '10px', borderRadius: '8px', maxWidth: '80%', fontSize: '13px' },
  aiMsg: { alignSelf: 'flex-start', backgroundColor: '#F1F3F4', padding: '10px', borderRadius: '8px', maxWidth: '80%', fontSize: '13px' },
  inputArea: { display: 'flex', padding: '10px', borderTop: '1px solid #DDD' },
  input: { flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #CCC' },
  sendBtn: { marginLeft: '8px', padding: '8px 12px', backgroundColor: '#4A154B', color: '#FFF', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default CopilotChat;