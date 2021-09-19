import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useForm } from "react-hook-form";
import Button from "components/Button";
import { toast } from "react-toastify";
import auth from "services/auth/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  const { register, handleSubmit, errors: fieldsErrors } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Zoom in={true}>
        <Paper className={classes.paper} elevation={5}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              inputRef={register({ required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="name"
              label="نام"
              name="name"
              autoComplete="current-name"
              autoFocus
              helperText={fieldsErrors.name ? "نام را وارد کنید" : null}
              error={fieldsErrors.name}
            />
            <TextField
              inputRef={register({ required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="نام کاربری"
              name="username"
              autoComplete="current-username"
              helperText={
                fieldsErrors.username ? "نام کاربری را وارد کنید" : null
              }
              error={fieldsErrors.username}
            />
            <TextField
              inputRef={register({ required: true })}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="گذرواژه"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={fieldsErrors.password ? "گذرواژه را وارد کنید" : null}
              error={fieldsErrors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              loading={loading}
            >
              ثبت نام
            </Button>
            <Grid container>
              <Grid item>
                <Link to="signin" variant="body2">
                  {"ورود"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Zoom>
    </Container>
  );
}
