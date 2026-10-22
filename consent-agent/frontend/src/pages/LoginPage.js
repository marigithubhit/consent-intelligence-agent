import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConsent } from '../context/ConsentContext';

const LoginPage = () => {
  const [username, setUsername] = useState('mariudhayakumar@intellect.com');
  const [password, setPassword] = useState('password123');
  const { setUser } = useConsent();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setUser({ userId: 'USR-9981', name: 'Mari UdhayaKumar', email: username });
      navigate('/consent');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Enterprise AI Fabric Portal</h2>
        <p style={styles.subtitle}> Open Banking Authentication</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username / Customer ID</label>
          <input
            style={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.button}>Authenticate</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f6f9' },
  card: { width: '380px', padding: '30px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  title: { margin: '0 0 5px 0', color: '#4A154B', textAlign: 'center' },
  subtitle: { margin: '0 0 20px 0', color: '#666', fontSize: '14px', textAlign: 'center' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { marginBottom: '5px', fontSize: '13px', fontWeight: 'bold' },
  input: { padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '12px', backgroundColor: '#4A154B', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }
};

export default LoginPage;