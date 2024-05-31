// CryptoContext.js

import React, { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto de Crypto
const CryptoContext = createContext();

// Componente proveedor del contexto
export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </CryptoContext.Provider>
  );
};

// Hook personalizado para usar el contexto de Crypto
export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto debe usarse dentro de un CryptoProvider");
  }
  return context;
};

export default CryptoContext;
