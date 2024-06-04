import { AppBar, Container, MenuItem, Select, Toolbar, Typography, createTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../CryptoContext";
import AuthModal from "../Authentication/AuthModal";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const Title = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: "silver",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
}));

function Header() {
  const { currency, setCurrency } = useCrypto();
  const navigate = useNavigate();

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Title onClick={() => navigate(`/`)} variant="h6">
              TRACKER CRYPTO 
            </Title>
            <Select
              variant="outlined"
              labelId="currency-select-label"
              id="currency-select"
              value={currency}
              sx={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}

            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            <AuthModal/>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
