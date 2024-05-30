import {
    AppBar,Container,MenuItem,Select,Toolbar,Typography,createTheme,ThemeProvider,} from "@mui/material";
  import { styled } from "@mui/system";
  import { useNavigate, useNavigation } from "react-router-dom";
  import { CryptoState } from "../CryptoContext";
  
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
    
    const navigate = useNavigate();
    
  
    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Title onClick={() => navigate(`/`)} variant="h6">
                Crypto Hunter
              </Title>
              {/* <Button color="inherit">Login</Button> */}
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: 100, height: 40, marginLeft: 15 }}
               
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default Header;
  