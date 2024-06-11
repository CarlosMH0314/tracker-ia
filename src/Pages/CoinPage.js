import {
  Button,
  LinearProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import htmlReactParser from "html-react-parser";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { useCrypto } from "../CryptoContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol, user, setAlert, watchlist } = useCrypto();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Added to the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed from the Watchlist!`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [`@media (min-width:600px)`]: {
      flexDirection: "row",
    },
  });

  const Sidebar = styled("div")({
    width: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
    [`@media (max-width:600px)`]: {
      width: "100%",
      borderRight: "none",
    },
  });

  const Heading = styled(Typography)({
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  });

  const Description = styled("div")({
    width: "100%",
    fontFamily: "Montserrat",
    padding: 25,
    paddingBottom: 15,
    paddingTop: 0,
    textAlign: "justify",
  });

  const MarketData = styled("div")({
    alignSelf: "start",
    padding: 25,
    paddingTop: 10,
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    [`@media (min-width:600px)`]: {
      flexDirection: "row",
    },
  });

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <Container>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Heading variant="h3">{coin?.name}</Heading>
        <Description>
          {htmlReactParser(coin?.description.en.split(". ")[0])}.
        </Description>
        <MarketData>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Rank:</Typography>
            <Typography variant="h5" style={{ marginLeft: 10 }}>
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Current Price:</Typography>
            <Typography variant="h5" style={{ marginLeft: 10 }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5">Market Cap:</Typography>
            <Typography variant="h5" style={{ marginLeft: 10 }}>
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                height: 40,
                backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                color: "black",
                marginTop: 2,
              }}
              onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}
            >
              {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </Button>
          )}
        </MarketData>
      </Sidebar>
      <CoinInfo coin={coin} />
    </Container>
  );
};

export default CoinPage;
