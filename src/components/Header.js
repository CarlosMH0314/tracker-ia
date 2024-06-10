import { AppBar, Container, MenuItem, Select, Toolbar, Typography, createTheme, ThemeProvider } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useCrypto } from "../CryptoContext";
import AuthModal from "../Authentication/AuthModal";
import UserSidebar from "../Authentication/UserSidebar"; // Ensure you import UserSidebar correctly

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
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
}));

function Header() {
  const { currency, setCurrency, user } = useCrypto();
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
              Crypto Hunter
            </Title>
            <Select
              variant="outlined"
              labelId="currency-select-label"
              id="currency-select"
              value={currency}
              sx={{ width: 85, height: 40, marginLeft: 15 }}
              onChange={handleCurrencyChange}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>

            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
