import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const CryptoContext = createContext();

// Componente proveedor del contexto
export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" }); // Estado para la alerta



  useEffect(() =>{
    onAuthStateChanged(auth,  user =>{
      if (user) setUser(user);
      else setUser(null);
    })

  }, []);


  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "INR")       setSymbol("₹");
     else if (currency === "USD")      setSymbol("$");
    
  }, [currency]);

  return (
    <CryptoContext.Provider 
      value={{ 
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
      }}
    >  
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
