// src/pages/DashboardPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useConsent } from '../context/ConsentContext';
import Navbar from '../components/Navbar';
import ApiCard from '../components/ApiCard';
import CopilotChat from '../components/CopilotChat';
import { fetchAccounts, fetchBalances, fetchTransactions } from '../services/api';

const DashboardPage = () => {
  const { consent } = useConsent();
  const accountId = 'ACC-AED-998811';

  const [accountData, setAccountData] = useState(null);
  const [balanceData, setBalanceData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasPermission = useCallback(
    (scope) => consent.permissions.includes(scope),
    [consent.permissions]
  );

  useEffect(() => {
    const loadApiData = async () => {
      setLoading(true);
      try {
        // Fetch Account Profile
        if (hasPermission('readAccounts')) {
          const accRes = await fetchAccounts();
          const accountsList = accRes?.Data?.Account || [];
          const activeAcc = accountsList.find((a) => a.accountId === accountId) || accountsList[0];
          setAccountData(activeAcc);
        }

        // Fetch Live Balances (Matches JSON structure: Data.Balance[0])
        if (hasPermission('readBalances')) {
          const balRes = await fetchBalances(accountId);
          const primaryBalance = balRes?.Data?.Balance?.[0] || null;
          setBalanceData(primaryBalance);
        }

        // Fetch Transactions
        if (hasPermission('readTransactions')) {
          const txnRes = await fetchTransactions(accountId);
          setTransactions(txnRes?.Data?.Transaction || []);
        }
      } catch (err) {
        console.error('Error fetching live Open Banking data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadApiData();
  }, [consent.permissions, hasPermission]);

  return (
    <div style={styles.layout}>
      <Navbar />

      <div style={styles.body}>
        <div style={styles.main}>
          <h2>Account Intelligence</h2>
          <p style={styles.subtitle}>
            Active permissions: <code>{consent.permissions.join(', ') || 'No Scopes Granted'}</code>
          </p>

          {loading ? (
            <p>Loading live Open Banking data...</p>
          ) : (
            <div style={styles.grid}>
              {/* Account Profile Card */}
              <ApiCard
                title="Account Profile"
                hasPermission={hasPermission('readAccounts')}
                scopeName="readAccounts"
              >
                {accountData ? (
                  <div>
                    <p><strong>Account ID:</strong> {accountData.accountId || accountId}</p>
                    <p><strong>Type:</strong> {accountData.accountType || 'Savings'}</p>
                    <p><strong>Status:</strong> {accountData.status || 'Enabled'}</p>
                  </div>
                ) : (
                  <p>No account details available.</p>
                )}
              </ApiCard>

              {/* Live Balance Card */}
              <ApiCard
                title="Live Balances"
                hasPermission={hasPermission('readBalances')}
                scopeName="readBalances"
              >
                {balanceData ? (
                  <div>
                    <p style={{ fontSize: '26px', color: '#008060', fontWeight: 'bold', margin: '10px 0 0 0' }}>
                      {balanceData.amount !== undefined ? `${balanceData.amount.toLocaleString()} ${balanceData.currency}` : 'N/A'}
                    </p>
                    <small style={{ color: '#666' }}>
                      Indicator: <strong>{balanceData.creditDebitIndicator}</strong>
                    </small>
                  </div>
                ) : (
                  <p>No balance data returned from backend.</p>
                )}
              </ApiCard>

              {/* Transaction Stream Card */}
              <ApiCard
                title="Recent Transaction Stream"
                hasPermission={hasPermission('readTransactions')}
                scopeName="readTransactions"
                wide
              >
                {transactions.length > 0 ? (
                  <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    {transactions.map((txn, index) => (
                      <li key={txn.id || index} style={{ marginBottom: '6px' }}>
                        <strong>{txn.merchantName || 'Transaction'}:</strong> {txn.amount} {txn.currency || 'AED'} ({txn.creditDebitIndicator})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No transactions available for this account.</p>
                )}
              </ApiCard>
            </div>
          )}
        </div>

        {/* AI Copilot Drawer */}
        <div style={styles.sidebar}>
          <CopilotChat accountId={accountId} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: { display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#F8F9FA' },
  body: { display: 'flex', flex: 1, overflow: 'hidden' },
  main: { flex: 1, padding: '30px', overflowY: 'auto' },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '20px' },
  sidebar: { width: '380px', padding: '20px', height: '100%', boxSizing: 'border-box' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '20px' }
};

export default DashboardPage;