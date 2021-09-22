import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useDocumentTitle from "hooks/useDocumentTitle";
import Avatar from "@material-ui/core/Avatar";
import { FilterContext } from "helpers/FilterContext";
import category from "services/crud/categories";

const specialBreakpoint = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1280,
      xl: 1920,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    width: "auto",
    margin: 0,
  },
  dFlex: {
    display: "flex",
    [specialBreakpoint.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  loading: {
    margin: "auto",
    marginTop: theme.spacing(5),
    display: "flex",
  },
  container: {
    width: "auto",
    margin: 0,
  },
  link: {
    width: "100%",
  },
  square: {
    width: "100%",
    height: "600px",
    objectFit: "cover",
    borderRadius: 0,
    [specialBreakpoint.breakpoints.down("xs")]: {
      height: "300px",
    },
  },
}));

export default function Main(props) {
  const classes = useStyles();
  useDocumentTitle("", false, true);
  const { setFilter } = React.useContext(FilterContext);

  const emptyFilter = () => {
    setFilter({
      materials: [],
      sizes: [],
      style: [],
      usage: [],
    });
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Grid container className={classes.container} spacing={2}>
          <Grid item xs={12} md={6} className={classes.dFlex}>
            <Link
              to="/categories/198/باکس فلزی"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <Avatar
                alt="logo"
                src="https://xohal.com/wp-content/uploads/2021/01/photo_2021-03-30_08-33-29.jpg"
                className={classes.square}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} className={classes.dFlex}>
            <Link
              to="/categories/188/تذهیب"
              className={classes.link}
              onClick={() => emptyFilter()}
            >
              <Avatar
                alt="logo"
                src="https://xohal.com/wp-content/uploads/2021/05/2041003309.jpg"
                className={classes.square}
              />
            </Link>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
