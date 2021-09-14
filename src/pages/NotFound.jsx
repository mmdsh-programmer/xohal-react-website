import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import useDocumentTitle from "hooks/useDocumentTitle";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(13),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default function NotFound(props) {
  const classes = useStyles();
  useDocumentTitle("صفحه یافت نشد")

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            صفحه مورد نظر یافت نشد!
          </Typography>
        </div>
      </Container>
    </React.Fragment>
  );
}
