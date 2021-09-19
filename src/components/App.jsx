import React from "react";
import RTL from "components/RTL";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { faIR } from "@material-ui/core/locale";
import Shabnam from "fonts/Shabnam.ttf";
import Main from "pages/Main";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import NotFound from "pages/NotFound";
import Categories from "pages/Categories";
import Cart from "pages/Cart";
import CartContextProvider from "helpers/CartContext";
import FilterContextProvider from "helpers/FilterContext";
import { PrivateRoute } from "./PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import "../styles/App.css";
import Checkout from "pages/Checkout";
import SizeGuide from "pages/SizeGuide";
import Header from "./Header";
import BackToTop from "./BackToTop";
import { AuthProvider } from "helpers/Auth";

const shabnam = {
  fontFamily: "Shabnam",
  fontStyle: "normal",
  src: `url(${Shabnam}) format('ttf')`,
};

const theme = createMuiTheme(
  {
    typography: {
      fontFamily: "Shabnam",
    },
    direction: "rtl",
    palette: {
      primary: {
        main: "rgb(70,70,70)",
      },
      secondary: {
        main: "rgb(218,31,61)",
      },
    },
  },
  faIR
);

export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <RTL>
        <CssBaseline />
        <AuthProvider>
          <FilterContextProvider>
            <CartContextProvider>
              <Router>
                <Header />
                <Switch>
                  <Route exact path="/signin" component={Signin} />
                  <Route exact path="/signup" component={Signup} />
                  <PrivateRoute exact path="/cart" component={Cart} />
                  <PrivateRoute exact path="/checkout" component={Checkout} />
                  <Route exact path="/size-guide" component={SizeGuide} />
                  <Route exact path="/" component={Main} />
                  <PrivateRoute
                    path="/categories/:key/:slug"
                    component={Categories}
                  />
                  <Route component={() => <NotFound />} />
                </Switch>
                <BackToTop />
              </Router>
            </CartContextProvider>
          </FilterContextProvider>
        </AuthProvider>
        <ToastContainer bodyClassName="rtl" />
      </RTL>
    </ThemeProvider>
  );
}
