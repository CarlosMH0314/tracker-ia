import { onAuthStateChanged, doc, onSnapshot } from "firebase/firestore"; // Ensure all necessary imports are correct
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./firebase";
import axios from "axios"; // Make sure axios is imported if it's used in fetchCoins
import { CoinList } from "./config/api"; // Import your API endpoint or function for fetching coins

const CryptoContext = createContext();

// Componente proveedor del contexto
export const CryptoProvider = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });

  // Watchlist state should be defined
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchCoins = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCoins(data);
    } catch (error) {
      console.error("Error fetching coins: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currency === "INR") {
      setSymbol("₹");
    } else if (currency === "USD") {
      setSymbol("$");
    }
  }, [currency]);

  return (
    <CryptoContext.Provider
      value={{ 
        currency, 
        setCurrency, 
        symbol, 
        alert, 
        setAlert, 
        coins, 
        fetchCoins, 
        loading, 
        user, 
        watchlist 
      }} // Include all state and functions in context
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
