import { createTheme, CssBaseline } from "@material-ui/core";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import "./App.css";
import Header from "./Components/Header";
import SideBar from "./Components/SideBar";
import Employees from "./Pages/Employees/Employees";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: "3c44b126",
    },
    secondary: {
      main: "#f83245",
      light: "#f8324526",
    },
    background: {
      default: "#f3f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      transform: "translateZ(0)",
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "320px",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SideBar />

      <div className={classes.appMain}>
        <Header />
       
        <Employees />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
