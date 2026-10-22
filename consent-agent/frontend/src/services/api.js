// src/services/api.js
const BASE_URL = 'http://localhost:8080/api/v1/open-banking';

// 1. Fetch Accounts & Balances
export const fetchAccounts = async () => {
  const response = await fetch(`${BASE_URL}/accounts`);
  if (!response.ok) {
    throw new Error('Failed to fetch accounts from backend');
  }
  return await response.json();
};

// 2. Fetch Account Transactions
export const fetchTransactions = async (accountId) => {
  const response = await fetch(`${BASE_URL}/accounts/${accountId}/transactions`);
  if (!response.ok) {
    throw new Error('Failed to fetch transactions from backend');
  }
  return await response.json();
};

// 3. Fetch Account Balances
export const fetchBalances = async (accountId) => {
  const response = await fetch(`${BASE_URL}/accounts/${accountId}/balances`);
  if (!response.ok) {
    throw new Error('Failed to fetch balance data');
  }
  return await response.json();
};


//4. Fetch AI Copilot Insights
export const fetchAiInsights = async (accountId, query, permissions) => {
  const scopes = permissions.join(',');
  const encodedQuery = encodeURIComponent(query || '');

  const response = await fetch(
    `${BASE_URL}/accounts/${accountId}/ai-insights?query=${encodedQuery}&scopes=${scopes}`
  );

  if (!response.ok) {
    throw new Error('API Connection error');
  }

  return await response.json();
};