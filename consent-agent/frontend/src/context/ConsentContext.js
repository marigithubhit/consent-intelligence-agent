// src/context/ConsentContext.js
import React, { createContext, useState, useContext } from 'react';

const ConsentContext = createContext();

export const ConsentProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [consent, setConsent] = useState({
    consentId: null,
    permissions: [], // e.g., ['readAccounts', 'readBalances', 'readTransactions']
    isAuthorized: false,
  });

  const updateConsent = (permissions, consentId) => {
    setConsent({
      consentId,
      permissions,
      isAuthorized: true,
    });
  };

  return (
    <ConsentContext.Provider value={{ user, setUser, consent, updateConsent }}>
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = () => useContext(ConsentContext);